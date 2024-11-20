/*
=====================================================================
	Field2Object - Create/update embedded objects with data from fields
	e    = Entry Object
	o    = Object Field Name
	args = Prop/Field Names Array
	opt  = Additional Options Object
	opt.delim = Delimiter Str // Default: |
	opt.clear = Clear Src Bool // Default: false
	opt.extra = Extra Props Obj // Default: {}
	opt.index = Target Index // Default: object length
=====================================================================
*/

function field2object(e,o,args,opt) {
	if(!e || !o) { exit(); }
	if(!args || args.length==0) { exit(); }
	
	var f = e.field(o);
	var d = opt.delim || "|";
	var c = (opt.clear===undefined) ? false : opt.clear;
	var i = (!!opt.index && opt.index<f.length) ? opt.index : f.length;
	var ex = opt.extra || {};
	
	var obj = {};
	var arg, chk, key, val;
	var reg = new RegExp("(.*) *["+d+"] *(.*)");
	for(var x=0; x<args.length; x++){
		arg = args[x];
		chk = !!arg.match(reg);
		if(chk) {
			[chk, val, key] = arg.match(reg);
		} else {
			key = arg;
			val = arg;
		}
		obj[key] = e.field(val);
		if(c) { e.set(val,''); }
	}
	var keys = Object.keys(ex);
	if(keys.length>0) {
		keys.forEach(k => obj[k] = ex[k]);
	}
	f[i] = obj;
	e.set(o, f);
	e.recalc();
}