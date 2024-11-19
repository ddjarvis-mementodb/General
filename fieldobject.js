function field2object() {
	var e = arguments[0];
	var o = arguments[1];
	var arr = [], obj = {};
	var arg, chk, key, val;
	var i, j, d = "|";
	var reg = new RegExp("(.*)["+d+"](.*)");
	for(var i=2; i<arguments.length; i++){
		arg = arguments[i];
		chk = !!arg.match(reg);
		if(chk) {
			[chk, val, key] = arg.match(reg);
		} else {
			key = arg;
			val = arg;
		}
		obj[key] = e.field(val);
	}
	arr = [obj];
	e.set(o, arr);
	e.recalc();
}
function object2field() {
	var e = arguments[0];
	var o = arguments[1];
	var obj = e.field(o)[0];
	var arg, chk, key, val;
	var i, j, d = "|";
	var reg = new RegExp("(.*)["+d+"](.*)");
	for(var i=2; i<arguments.length; i++){
		arg = arguments[i];
		chk = !!arg.match(reg);
		if(chk) {
			[chk, key, val] = arg.match(reg);
		} else {
			key = arg;
			val = arg;
		}
		e.set(val, obj[key] || '');
	}
	e.recalc();
}
var e = entry();