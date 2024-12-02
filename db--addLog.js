function addLog(entry,histField,logTitle,fields) {
	// entry (object)
	// histField (string) = history field name
	// logTitle (string) =  history entry description
	// fields (array) = [entry field name, log field name]
	// Required Fields: Title, Description
	
	const _mlog = function(arg) {
		log(arg);
		message(arg);
	}
	const _copyField = function(arg) {
		var eValue = entry.field(arg[0]);
		var hName = arg[1] || arg[0];
		newlog[hName] = eValue;
	}

	var logs = [], newlog = {};
	var date = moment().format("MM/DD/YYYY hh:mm:ss A");
	var history = entry.field(histField);
	var histLength = history.length;
	var title = (histLength+1)+". "+logTitle;
	var desc = date;
	
	if(history[history.length-1]["Description"]==desc){ exit(); }
	
	newlog = {};
	newlog["Title"] = title;
	newlog["Description"] = desc;
	fields.forEach(arr => _copyField(arr));
	
	for(var i=0; i<history.length; i++) {
		var obj = {}
		Object.keys(history[i]).forEach(k => {
			obj[k] = history[i][k];
		});
		logs[logs.length] = obj;
	}
	logs[logs.length] = newlog;
	
	entry.set(histField,logs);
}