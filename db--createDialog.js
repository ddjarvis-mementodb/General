function createDialog_dialogButton(input) {
	// Early exit for falsy/zero inputs
	if (input === false || input === 0 || input === "0") { return false; }
	
	var type, text, fn, args;
	var output = {};
	
	if (typeof input === "string" || typeof input === "number" || typeof input === "undefined") {
		type = typeof input;
		switch(type) {
			case "string":
				switch(input) {
					case "Y" : case "y" : text = "Yes"; break;
					case "N" : case "n" : text = "No"; break;
					case "C" : case "c" : text = "Cancel"; break;
					case "" : text = "btn"; break;
					default: text = input;
				}
				break;
			case "number":
				text = "btn" + input;
				break;
			case "undefined":
				text = "btn";
				break;
		}
		output.text = text;
		output.fn = function() { message("Button [" + text + "] was triggered."); };
		return output;
	}
	
	if (typeof input === "object") {
		output.text = (!!input.text) ? input.text : "btn";
		
		// Capture args if provided, default to empty array
		args = Array.isArray(input.args) ? input.args : [];
		
		if (typeof input.fn === "function") {
			// CRITICAL FIX: Wrap the custom function so it receives the arguments
			output.fn = function() {
				let ret = input.fn.apply(null, args);
log(`fn ret: ${ret}`);
			};
		} else {
			// Fallback if no function was provided
			output.fn = function() { message("Button [" + output.text + "] was triggered."); };
		}
		return output;
	}
}

function createDialog(title, text, posi, nega, neut) {
	title = title || "MementoDB Dialog";
	text = text || "MementoDB dialog text.";
	posi = createDialog_dialogButton(posi);
	nega = createDialog_dialogButton(nega);
	neut = createDialog_dialogButton(neut);
	
	var myDialog = dialog().title(title).text(text);
	if(!!posi){ myDialog.positiveButton(posi.text, posi.fn); }
	if(!!nega){ myDialog.negativeButton(nega.text, nega.fn); }
	if(!!neut){ myDialog.neutralButton(neut.text, neut.fn); }
	let ret = myDialog.show();
	return {myDialog, ret};
}
