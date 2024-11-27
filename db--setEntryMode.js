function setEntryMode(e,f,mode) {
	if(!f){ message("Error: Field name not given for EntryMode"); exit(); }
	mode = (typeof mode == "number") ? mode
			: (typeof mode == "boolean") ? mode*1
			: 0;
	var v = mode ? "Edit" : "View";
	var m = e.field(f);
	if(m!==v) { e.set(f,v); }
}