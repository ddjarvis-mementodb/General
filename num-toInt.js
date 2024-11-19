function toInt(i) {
	if(!isNaN(i)){ return i; }
	var m = !!i.match(/^ *[-+]? *\d+(?:,\d+)*(?:\.\d+)? */);
	if(!m){ return ''; }
	var o = i.replace(/[^\d\.-]/g,"");
	return o.replace(/\.+/,'');;
}