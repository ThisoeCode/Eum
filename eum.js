class Eum {

//CONSTS
    #AudioContext = new (window.AudioContext || window.webkitAudioContext)()
    #A4 = 440
    #itv = Math.pow(2, 1/12)

    // Config Definition Regexs
    #isNote =/^([A-Ga-g])(#|b)?(\d+)$/
    #isSigna=/^(2|3|4|5|6|7|8|9|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[0-9]|9[0-9]|1[0-5][0-9])(\/)(1|2|4|8|16|32|64)$/

    // Cipher Regexs
    #isDef  =/^\[$/
    #isSound=/^0-6$/
    #isBar  =/^\/$/

//CONSTRUCT
    constructor(EUM){
        
        /**
         * @name Eson
         * @description Compiled stuff.
         */
        this.$=[]

     // compile(E) config
        this.note  = 'c'
        this.signa = '4/4'
        this.tempo = 120
        this.currNote  = this.note
        this.currSigna = this.signa
        this.currTempo = this.tempo
        this.currCursor= 0

        /** Length of inputted string */
        this.l=0

        this.newSound = null
        this.newLength= 0

        compile(EUM)
    }

//FUNCS
    /**
     * Compile from Eum to Eson
     * @param {string} E - Eum content
     * @returns {undefined | false | null | string}
     */
    compile(E){if(typeof E !== 'string'){
        return false;
    }else{
        // init
        this.l = E.length
        const positionOf = i=>{

        }
        const ermsg = (i,msg='unknown error')=>{return `[Eum] SYNTAX ERROR: ${msg} - AT ${positionOf(i)}`}

        // funcs
        const recognize = i=>{
            const x=E[i]
            if(x==='['){
                const close = E.indexOf(']',i)
                if(close === -1){
                    return ermsg(i,'square bracket not closed')
                }
            }else if(1){

            }else{
                return ermsg(i,`unexpected "${x}"`)
            }
        }

        // run compile
        this.$.push({
            pitch: null,
            time:  1000,
        })
        if(this.currCursor<this.l){
            recognize(E(this.currCursor))
            this.currCursor++
        }

    }}

}