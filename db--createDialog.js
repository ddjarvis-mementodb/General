function dialogButton(input) {
	if(input===false) { return false; }
	if(input===0) { return false; }
	if(input==="0") { return false; }
	
	var type, text, fn;
	var output = {};
	if(typeof input === "string" || typeof input === "number" || typeof input === "undefined") {
		type = typeof input;
		switch(type) {
			case "string":
				switch(input) {
					case "Y" :
					case "y" :
						text = "Yes"; break;
					case "N" :
					case "n" :
						text = "No"; break;
					case "C" :
					case "c" :
						text = "Cancel"; break;
					case "" :
						text = "btn"; break;
					default:
						text = input;
				}
				break;
			case "number":
				text = "btn"+input;
				break;
			case "undefined":
				text = "btn";
				break;
		}
		output.text = text;
		output.fn = function() { message("Button ["+text+"] was triggered."); };
		return output;
	}
	if(typeof input === "object") {
		output.text = (!!input.text) ? input.text : "btn";
		output.fn = (typeof input.fn==="function") ? input.fn
			: function() { message("Button ["+text+"] was triggered."); };
		return output;
	}
}
function createDialog(title,text,posi,nega,neut) {
	title = title || "MementoDB Dialog";
	text = text || "MementoDB dialog text.";
	posi = dialogButton(posi);
	nega = dialogButton(nega);
	neut = dialogButton(neut);
	
	var myDialog = dialog().title(title).text(text);
	if(!!posi){ myDialog.positiveButton(posi.text, posi.fn); }
	if(!!nega){ myDialog.negativeButton(nega.text, nega.fn); }
	if(!!neut){ myDialog.neutralButton(neut.text, neut.fn); }
	myDialog.show();
}