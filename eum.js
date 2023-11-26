const log = (m = 'TEST!!!!!!!') => { console.log(m) }

class Eum {

  //CONSTS
  #AudioContext = new (window.AudioContext || window.webkitAudioContext)()
  #A4 = 440
  #itv = Math.pow(2, 1 / 12)

  // Config Definition Regexs
  #isNote = /^([A-Ga-g])(#|b)?(\d+)$/
  #isSigna = /^(2|3|4|5|6|7|8|9|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]|1[0-5][0-9])(\/)(1|2|4|8|16|32|64)$/

  // Cipher Regexs
  #isDef = /^\[$/
  #isSound = /^0-6$/
  #isBar = /^\/$/

  //CONSTRUCT
  constructor(EUM) {

    /**
     * @name Eson
     * @description Compiled stuff.
     */
    this.$ = []

    // compile(E) config
    this.defaultNote = 'c'
    this.defaultSigna = '4/4'
    this.defaultTempo = 120
    this.note = this.defaultNote
    this.signa = this.defaultSigna
    this.tempo = this.defaultTempo
    this.cursor = 0

    /** Length of inputted string of Eum */
    this.eumLength = 0

    this.newSound = null
    this.newLength = 0

    compile(EUM)
  }

  //FUNCS
  /**
   * Compile from Eum to Eson
   * @param {string} E - Eum content
   * @returns {undefined | Error}
   */
  compile(E) {
    const positionOf = i => {
      const lines = E.split('\n')
      for (let m = 0; m < lines.length; m++) {
        const line = lines[m]
        const charIndex = line.indexOf(E[i])
        if (charIndex !== -1) {
          return `${i + 1}:${charIndex + 1}`;
        }
      }
    }
    const syntaxError = (i, msg = 'unknown error') => {
      return new Error(`[Eum] BAD SYNTAX: ${msg} - AT ${positionOf(i)}`);
    }
    if (typeof E !== 'string') {
      return new Error('Eum compiler expects a string type parameter.');
    } else {
      // init
      this.eumLength = E.length

      // funcs
      const recognize = i => {
        const x = E[i]
        if (x === '[') {
          const close = E.indexOf(']', i)
          if (close === -1) {
            return syntaxError(i, '"]" expected')
          }
        } else if (1) {

        } else {
          return syntaxError(i, `unexpected token "${x}"`)
        }
      }

      // run compile
      this.$.push({
        pitch: null,
        time: 1000,
      })
      if (this.currCursor < this.eumLength) {
        recognize(E[this.currCursor])
        this.currCursor++
      }
    }
  }

  /**
   * Use Eson to play audio
   * @param {string} [instrument] - Instruments name. If is not in ['sine', 'square', 'sawtooth', or 'triangle'] , the second param is needed.
   * @returns {undefined | false}
   */
  playAudio(instrument='sine',src='') {
    for(const e of this.$){
      const a = this.#AudioContext
      const o = a.createOscillator()
      const gain = a.createGain()
      switch (instrument) {
        case sine:
          
          break;
      
        default:
          break;
      }
      // PLAY WITH o
      // this.#AudioContext
      // e.pitch
      // e.time
    }
  }

}

export default Eum