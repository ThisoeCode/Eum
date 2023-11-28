const log = (m = 'TEST!!!!!!!') => { console.log(m) }

class Eum {

  //CONSTS
  #AudioContext = new (window.AudioContext || window.webkitAudioContext)()
  #A4 = 440.0
  #itv = Math.pow(2, 1 / 12)

  // Config Definition Regexs
  // 1. `[]` Brackets
  #isNote = /^( +)?1( +)?=( +)?([A-Ga-g])(#|b)?(m)?([0-9]|1[0-2])?( +)?$/
  #isTempo = /^( +)?(V|v|T|t)( +)?=( +)?(\d+)( +)?$/
  #isSigna = /^( +)?(0|[2-9]|[1-9][0-9]|1[0-9][0-9])( +)?(\/)( +)?(0|1|2|4|8|16|32|64)( +)?$/
  #isTriplets = /^( +)?3( +)?$/

  // Cipher Regexs
  #isDef = /^\[$/
  #isSound = /^0-6$/
  #isBar = /^\/$/

  //CONSTRUCT
  constructor(EUM) {

    /**
     * Compiled Eum
     * @type {Object[]} Eson Objects
     * @name Eson
     * @description Compiled stuff.
     */
    this.$ = []

    // defaults
    this.defaultNote = 'C4'
    this.defaultTempo = 120 // Beat per Min
    this.defaultSigna = '4/4'
    this.defaultWhole = 60000 / this.defaultTempo

    // compile(E) config
    this.cursor = 0
    this.compileNote = this.defaultNote
    this.compileTempo = this.defaultTempo
    this.compileSigna = this.defaultSigna
    this.compileWhole =  60000 / this.compileTempo
    /** Length of inputted string of Eum */
    this.eumLength = 0

    this.newSound = null
    this.newLength = 0

    compile(EUM)
  }

  //METHODS

  /**
   * Calculate note
   * @param {string} n Note name
   * @returns {number} Frequency (Hz)
   * @throws Not a note
   */
  calcNote(n, msg = '') {
    if (!this.#isNote.test(n)) {
      const err = `Eum error:\n"${n}" is not a note`
      if (msg !== '') { err += `\n${msg}` }
      throw new Error(err)
    } else {
      return 0// ???????????????
    }
  }

  /**
   * Calculate tempo
   * @param {number | string} t Tempo
   * @returns {number} Delay time (ms)
   * @throws Not a tempo
   */
  calcTempo(t, msg = '') {
    if (t < 0) {
      const err = `Eum error:\n"${t}" is not a tempo`
      if (msg !== '') { err += `\n${msg}` }
      throw new Error(err)
    } else {
      return 0// ???????????????
    }
  }

  /**
   * Compile from Eum to Eson
   * @param {string} E - Eum content
   * @returns {undefined}
   * @throws Compile errors
   */
  compile(E) {
    // error handler
    const positionOf = i => {
      const lines = E.split('\n')
      for (let m = 0; m < lines.length; m++) {
        const line = lines[m]
        const charIndex = line.indexOf(E[i])
        if (charIndex !== -1) {
          return `${i + 1}:${charIndex + 1}`
        }
      }
    }
    const syntaxError = (i, msg = 'unknown error') => {
      throw new Error(`Eum compiler error:\nBAD SYNTAX: ${msg}\n    AT [EumString]:${positionOf(i)}`)
    }

    // main
    if (typeof E !== 'string') {
      throw new Error('[Eum] Eum compiler expects a string type parameter')
    } else {
      // init constructor
      this.eumLength = E.length

      // funcs
      const recognize = i => {
        const x = E[i]
        if (x === '[') {
          const close = E.indexOf(']', i)
          this.cursor = close
          const ctt = x.slice(i + 1, close)
          switch (true) {
            case this.#isNote.test(x):
              this.compileNote = x.replace(/ /g, '').slice(2)
              break
            case this.#isTempo.test(x):
              this.compileTempo = Number(x.replace(/ /g, '').slice(2))
              break
            case this.#isSigna.test(x):
              this.compileSigna = x
              break
            case this.#isTriplets.test(x):
              // ?????????????
              break
          }
          if (close === -1) { syntaxError(i, '"]" expected') }
        } else if (x === '1') {

        } else { syntaxError(i, `Unexpected token "${x}"`) }
      }

      // run compile
      this.$.push({
        pitch: null,
        time: 1000,
      })
      while (this.currCursor < this.eumLength) {
        recognize(E[this.currCursor])
        this.currCursor++
      }
      return this.$
    }
  }

  /**
   * Use Eson to play audio
   * @param {string} [instrument] Instruments name. If is not in ['sine', 'square', 'sawtooth', or 'triangle'] , the second param is needed.
   * @param {string} [src] Audio file path for custom instrument.
   * @returns {undefined}
   * @throws Compile errors
   */
  play(instrument = 'sine', src = '') {
    for (const e of this.$) {
      const a = this.#AudioContext
      const o = a.createOscillator()
      const gain = a.createGain()
      const source = audioContext.createBufferSource()

      // prepare instrument
      switch (instrument) {
        case 'sine':
        case 'square':
        case 'sawtooth':
        case 'triangle':

        default:
          // get src sound file
          const request = new XMLHttpRequest()
          request.open('GET', src, true)
          request.responseType = 'arraybuffer'
          request.onload = _ => {
            a.decodeAudioData(request.response, buffer => { source.buffer = buffer })
          }
        // play Custom Instrument
      }
      // PLAY WITH o
      // this.#AudioContext
      // e.pitch
      // e.time
    }
  }

}

export default Eum