 const p = (...args) => args.forEach((arg, index, all) => console.log(arg))

 var buildtime = new Date();

 p(buildtime)

 p('dwws223');

 p(3)


 var a = Date.now();

 var sa = a + "";
 p(sa)
 var ai = Number(sa);
 p(a)
 p(ai == a)

 p(new Date(a).getHours())