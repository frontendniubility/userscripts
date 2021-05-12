const extend = require("extend");

 

const p = (...args) => args.forEach((arg, index, all) => console.log(arg))

var buildtime = new Date();
 
p(buildtime)
 
p('ds');