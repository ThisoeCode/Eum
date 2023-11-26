class Eum {

//CONSTS
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
        this.l = E.length
        this.$.push({
            pitch: null,
            time:  1000,
        })
        const recognize = i=>{
            switch (E[i]) {
                case value:
                    
                    break;
            
                default:
                    break;
            }
        }

    }}

}