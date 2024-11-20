/*
=====================================================================
	Field2Object - Create/update embedded objects with data from fields
	e    = Entry Object
	o    = Object Field Name
	args = Prop/Field Names Array
	opt  = Additional Options Object
	opt.delim = Delimiter Str // Default: |
	opt.clear = Clear Src Bool // Default: false
	opt.index = Target Index // Default: 0
=====================================================================
*/

function object2field(e,o,args,opt) {
	if(!e || !o) { exit(); }
	if(!args || args.length==0) { exit(); }
	
	var f = e.field(o);
	var d = opt.delim || "|";
	var c = (opt.clear===undefined) ? false : opt.clear;
	var i = (!!opt.index && opt.index<f.length) ? opt.index : e.field(o).length-1;
	
	var obj = f[i];
	var arg, chk, key, val;
	var reg = new RegExp("(.*) *["+d+"] *(.*)");
	for(var x=2; x<arguments.length; x++){
		arg = arguments[x];
		chk = !!arg.match(reg);
		if(chk) {
			[chk, key, val] = arg.match(reg);
		} else {
			key = arg;
			val = arg;
		}
		e.set(val, obj[key] || '');
	}
	if(c) { e.set(o,f.filter((x,y) => y!=i )); }
	e.recalc();
}