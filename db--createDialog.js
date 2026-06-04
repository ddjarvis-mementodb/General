function createDialog_dialogButton(input) {
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
		args = Array.isArray(input.args) ? input.args : [];
		
		if (typeof input.fn === "function") {
			output.fn = function() {
				// Capture what the custom button function returns (e.g., true)
				return input.fn.apply(null, args); 
			};
		} else {
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
	
	// Because Memento dialogs block execution, 'ret' will capture 
	// whatever the clicked button's function returns!
	let ret = myDialog.show(); 
	return ret; 
}