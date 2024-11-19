function mlog(i){
	log(i);
	message(i);
}
function slice(input,start,end) {
	// Check Input
	if(!input) { return ''; }
	if(input.length==0) { return []; }
	
	var isString = (typeof input == "string");
	var ilen = input.length;
	
	// Set Start
	start =
		(-ilen <= start && start<0) ? start + ilen :
		(!start || start < -ilen) ? 0 :
		start;
	if(start >= ilen) { return isString ? '' : []; }
		
	// Set End
	end =
		(-ilen <= end && end<0) ? end + ilen :
		(end < -ilen) ? 0 :
		(!end || end>=ilen) ? ilen :
		end;
	if(end <= start) { return isString ? '' : []; }
	
	var arr = [];
	for(var i = start; i < end; i++){
		arr[arr.length] = input[i];
	}
	
	return !isString ? arr : arr.join('');
}