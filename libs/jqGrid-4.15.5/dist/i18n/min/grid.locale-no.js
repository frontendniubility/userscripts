!function(r){"use strict";"function"==typeof define&&define.amd?define(["jquery"],r):"object"==typeof module&&module.exports?module.exports=function(e,t){return void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e||window)),r(t),t}:r(jQuery)}(function(e){"use strict";e.jgrid=e.jgrid||{},e.extend(!0,e.jgrid,{defaults:{locale:"no"},locales:{no:{name:"norsk",nameEnglish:"Norwegian",isRTL:!1,defaults:{recordtext:"Rad {0} - {1}, totalt {2}",emptyrecords:"Ingen poster funnet",loadtext:"Laster...",pgtext:"Side {0} av {1}",pgfirst:"First Page",pglast:"Last Page",pgnext:"Next Page",pgprev:"Previous Page",pgrecs:"Records per Page",showhide:"Toggle Expand Collapse Grid",savetext:"Lagrar..."},search:{caption:"Søk...",Find:"Finn",Reset:"Nullstill",odata:[{oper:"eq",text:"lik"},{oper:"ne",text:"forskjellig fra"},{oper:"lt",text:"mindre enn"},{oper:"le",text:"mindre eller lik"},{oper:"gt",text:"større enn"},{oper:"ge",text:"større eller lik"},{oper:"bw",text:"starter med"},{oper:"ew",text:"slutter med"},{oper:"cn",text:"inneholder"},{oper:"nu",text:"is null"},{oper:"nn",text:"is not null"}],addGroupTitle:"Add subgroup",deleteGroupTitle:"Delete group",addRuleTitle:"Add rule",deleteRuleTitle:"Delete rule",operandTitle:"Click to select search operation.",resetTitle:"Reset Search Value"},edit:{addCaption:"Ny rad",editCaption:"Rediger",bSubmit:"Send",bCancel:"Avbryt",bClose:"Lukk",processData:"Laster...",msg:{required:"Felt er obligatorisk",number:"Legg inn et gyldig tall",minValue:"verdi må være større enn eller lik",maxValue:"verdi må være mindre enn eller lik",email:"er ikke en gyldig e-post adresse",integer:"Legg inn et gyldig heltall",date:"Legg inn en gyldig dato",url:"er ikke en gyldig URL. Prefiks påkrevd ('http://' eller 'https://')",nodefined:" er ikke definert!",novalue:" returverdi er påkrevd!",customarray:"Tilpasset funksjon må returnere en tabell!",customfcheck:"Tilpasset funksjon må eksistere!"}},view:{caption:"Åpne post",bClose:"Lukk"},del:{caption:"Slett",msg:"Slett valgte rad(er)?",bSubmit:"Slett",bCancel:"Avbryt",processData:"Behandler..."},nav:{edittext:"",edittitle:"Rediger valgte rad(er)",addtext:"",addtitle:"Legg til ny rad",deltext:"",deltitle:"Slett valgte rad(er)",searchtext:"",searchtitle:"Søk",refreshtext:"",refreshtitle:"Oppdater tabell",alertcap:"Advarsel",alerttext:"Velg rad",viewtext:"",viewtitle:"Åpne valgt rad",savetext:"",savetitle:"Save row",canceltext:"",canceltitle:"Cancel row editing"},col:{caption:"Vis/skjul kolonner",bSubmit:"Utfør",bCancel:"Avbryt"},errors:{errcap:"Feil",nourl:"Ingen url er satt",norecords:"Ingen poster å behandle",model:"colNames og colModel har forskjellig lengde!"},formatter:{integer:{thousandsSeparator:" ",defaultValue:0},number:{decimalSeparator:",",thousandsSeparator:" ",decimalPlaces:2,defaulValue:0},currency:{decimalSeparator:",",thousandsSeparator:" ",decimalPlaces:2,prefix:"",suffix:"",defaulValue:0},date:{dayNames:["sø.","ma.","ti.","on.","to.","fr.","lø.","Søndag","Mandag","Tirsdag","Onsdag","Torsdag","Fredag","Lørdag"],monthNames:["jan.","feb.","mars","apr.","mai","juni","juli","aug.","sep.","okt.","nov.","des.","januar","februar","mars","april","mai","juni","juli","august","september","oktober","november","desember"],AmPm:["","","",""],S:function(){return"."},srcformat:"Y-m-d H:i:s",newformat:"Y-m-d H:i:s",masks:{ShortDate:"j.n.Y",LongDate:"l j. F Y",FullDateTime:"l j. F Y kl. G.i.s",MonthDay:"j. F",ShortTime:"H:i",LongTime:"H:i:s",YearMonth:"F Y"}}}}}})});
//# sourceMappingURL=grid.locale-no.js.map