(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{643:function(t,n,e){"use strict";e.r(n);var l={name:"Passport",data:function(){return{tip:!0,auth:{bot_id:1298318153,scope:{data:[{type:"id_document",selfie:!0},{type:"personal_details"}],v:1},public_key:"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwWy51e0FR98/z1ORRH0T\nPi2RXEhYeT/+5Qit8buUsbp494jLouWNrnpblXAa73V+dKrmN+NUYf3WuAgjiE3+\nn+k0twqngVDhVZq8p2laKJMCezulFc/DE69JUxSOU5sP7a/5JkK64Hw3Mp4UnlgV\n2UmJ4+ohZk+EsaNlfmkQVolByZ5pTJE8lXUh6HV1w4ujuWarOXBn0Z4/GnrCz0mJ\nJJm2fhDnVZY7dhCs/SaNNlbuSN3EjIdgyOUs4l1Cj8OpQgJsVyoVMsragONp/HTR\nMYoD/xNYjUYNcfH0sp7NQr5phlvbubjbhKoGetFdmiQfXZabnrRVeCKZWyqekHs8\nYwIDAQAB\n-----END PUBLIC KEY-----",nonce:"1",callback_url:"http://ididntknowwhatyouheardaboutme.tk/create/"}}},methods:{start:function(){var t=this;Telegram.Passport.auth(this.auth,(function(n){t.cl(n)}))},cl:function(t){t||window.close()}}},r=e(78),c=e(113),o=e.n(c),h=e(594),component=Object(r.a)(l,(function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"text-center mt-10"},[n("v-btn",{staticClass:"primary",attrs:{rounded:""},on:{click:this.start}},[this._v("\n    Подтвердить личность\n  ")])],1)}),[],!1,null,null,null);n.default=component.exports;o()(component,{VBtn:h.a})}}]);