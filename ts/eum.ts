/** Song "GOM SE MARI" */
const example = `
[1 = C] [v = 75]
1 (11) 1 1 / 3 (55) 3 1 /
5530 / 5530 / 1-1- / 1--0 //
[*Song End*]
`

// TYPES

type EumSound = {
  // Note lasts in ms
  t: number
  // Frequency in Hz
  f: number
}

type EumSheet = EumSound[]

// CORE

class Eum {
  input:string

  /** Standard Frequency */
  #A4 = 440

  // Syntax Regexs in `[]`
  #isNote = /^\s*1\s*=\s*([A-Ga-g])(#|[b|♭])?(m)?([0-9]|1[0-2])?\s*$/
  #isTempo = /^\s*(V|v|T|t)\s*=\s*(\d+)\s*$/
  #isSigna = /^\s*(0|[2-9]|[1-9][0-9]|1[0-9][0-9])\s*\/\s*(0|1|2|4|8|16|32|64)\s*$/
  #isComment = /^\*.*\*$/

  Note:string
  /** BPM */
  Tempo:number
  /** Signature */
  Signa:string
  /** Time duration of one beat (ms) */
  Whole:number
  output:EumSheet = []

  constructor(input:string) {
    this.input = input

    // defaults
    this.Note = 'C'
    this.Tempo = 120
    this.Signa = '4/4'
    this.Whole = 60000 / this.Tempo
  }

  compile(): EumSheet {
    const matches = [...this.input.matchAll(/\[([^\]]+)\]/g)]
    for (const match of matches) {
      const content = match[1].trim()
      if (this.#isComment.test(content)) {
        // Skip comments
        continue
      } else if (this.#isTempo.test(content)) {
        const [, val] = content.split('=')
        this.Tempo = parseInt(val)
        this.Whole = 60000 / this.Tempo
      } else if (this.#isSigna.test(content)) {
        this.Signa = content
      } else if (this.#isNote.test(content)) {
        const [, note] = content.split('=')
        this.Note = note
      }
    }

    const baseFreq = this.#noteToFreq(this.Note)
    const scaleRatio = [1, 9/8, 5/4, 4/3, 3/2, 5/3, 15/8] // major scale

    const stripped = this.input.replace(/\[[^\]]+\]/g, '').replace(/\s+/g, '')
    let i = 0
    while (i < stripped.length) {
      const ch = stripped[i]

      if (ch === '0') {
        // Rest note
        this.output.push({ f: 0, t: this.Whole })
        i++
      } else if (ch === '-') {
        // Extend last note by 1 beat
        const last = this.output[this.output.length - 1]
        if (last) last.t += this.Whole
        i++
      } else if (ch === '(') {
        // Parse until ')', each is half beat
        const end = stripped.indexOf(')', i)
        const inside = stripped.slice(i + 1, end)
        for (const c of inside) {
          const digit = parseInt(c)
          if (!isNaN(digit) && digit >= 1 && digit <= 7) {
            const f = baseFreq * scaleRatio[digit - 1]
            const t = this.Whole / 2
            this.output.push({ f, t })
          }
        }
        i = end + 1
      } else {
        const digit = parseInt(ch)
        if (!isNaN(digit) && digit >= 1 && digit <= 7) {
          const f = baseFreq * scaleRatio[digit - 1]
          const t = this.Whole
          this.output.push({ f, t })
        }
        i++
      }
    }

    console.log(this.output)
    return this.output
  }

  #noteToFreq(note: string):number {
    const semitones: Record<string, number> = {
      'C': -9,
      'D': -7,
      'E': -5,
      'F': -4,
      'G': -2,
      'A': 0,
      'B': 2
    }
    const n = semitones[note.toUpperCase()] ?? 0
    return this.#A4 * Math.pow(2, n / 12)
  }

  error(message:string){
    console.error("[Eum Error] "+message)
  }
}

// EASY-TO-USE FUNCTIONS

const
compileEum = (val:string) => {
  const eum = new Eum(val)
  return eum.compile()
},

testPlay = (sheet: EumSheet): void => {
  const audioContext = new (window.AudioContext || window.AudioContext)()

  sheet.forEach((sound, index) => {
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    // Set the frequency of the oscillator
    oscillator.frequency.setValueAtTime(sound.f, audioContext.currentTime + (index * sound.t / 1000))
    // volume
    gainNode.gain.setValueAtTime(1, audioContext.currentTime + (index * sound.t / 1000))
    // Connect the oscillator to the gain node and then to the destination
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    // Start and stop the oscillator
    oscillator.start(audioContext.currentTime + (index * sound.t / 1000))
    oscillator.stop(audioContext.currentTime + ((index + 1) * sound.t / 1000))
  })
}
