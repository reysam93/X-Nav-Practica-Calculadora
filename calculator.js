var ans = 0;
var resutl = '';
var solved = false;
var display = null;
var mayusDown = false;

window.onload = function(){
	console.log("loading");
	display = $("#display");
	$(".number").click(function(){
		updateDisplay(this.value);
	});
	$("#add").click(function(){
		updateDisplay(this.value);
	});
	$("#subs").click(function(){
		updateDisplay(this.value);
	});
	$("#mult").click(function(){
		updateDisplay(this.value);
	});
	$("#divide").click(function(){
		updateDisplay(this.value);
	});
	$("#del").click(function(){
		deleteLast();
	});
	$("#ac").click(function(){
		reset();
	});
	$('#equal').click(function(){
		solve();
	});
	$('#ans').click(function(){
		updateDisplay(ans);
	})
	addEventListener("keydown", captureKeys, false);
	addEventListener("keyup", releaseKeys, false);
}

function captureKeys(e){

	if (e.keyCode == 16){
		mayusDown = true;	
	}

	var value = null;
	if (e.keyCode == 48 || e.keyCode == 96){
		value = 0;
	}else if(e.keyCode == 49 || e.keyCode == 97){
		value = 1;
	}else if(e.keyCode == 50 || e.keyCode == 98){
		value = 2;
	}else if(e.keyCode == 51 || e.keyCode == 99){
		value = 3;
	}else if(e.keyCode == 52 || e.keyCode == 100){
		value = 4;
	}else if(e.keyCode == 53 || e.keyCode == 101){
		value = 5;
	}else if(e.keyCode == 54 || e.keyCode == 102){
		value = 6;
	}else if((e.keyCode == 55 && !mayusDown) || e.keyCode == 103){
		value = 7;
	}else if(e.keyCode == 56 || e.keyCode == 104){
		value = 8;
	}else if(e.keyCode == 57 || e.keyCode == 105){
		value = 9;
	}else if((e.keyCode == 171 && !mayusDown) || e.keyCode == 107){
		value = '+';
	}else if(e.keyCode == 173 || e.keyCode == 109){
		value = '-';
	}else if(e.keyCode == 88 || e.keyCode == 106 || (e.keyCode == 171 && mayusDown)){
		value = 'x';
	}else if((e.keyCode == 57 && mayusDown) || e.keyCode == 111){
		value = '/';
	}else if(e.keyCode == 8){
		deleteLast();
	}
	if (value != null){
		updateDisplay(value);
	}
}

function releaseKeys(e){
	if (e.keyCode == 16){
		mayusDown = false;
	}
}

function deleteLast(){
	var html = display.html();
	if (html == ""){
		return;
	}

	var newhtml = "";
	for(var i = 0; i < html.length-1; i++){
		newhtml += html[i];
	}
	display.html(newhtml);
}

function reset(){
	display.html("");
}

function isSymbol(value){
	return (value == '+' || value == '-' || value == 'x' || value == '/');
}

function updateDisplay(value){
	if (solved){
		if (isSymbol(value)){
			display.html(ans);
		}else{
			display.html("");
		}
		solved = false;
	}

	var html = display.html();
	display.html(html + value)
}

function solve(){
	var operation = display.html();
	var result = add(operation);
	display.html(result);
	ans = result;
	solved = true;
}

function add(operation){
	console.log("adding");
	var operands = operation.split("+");
	var result = 0;
	for (var i = 0; i < operands.length; i++){
		console.log("OP: " + operands[i])
		result += substract(operands[i]);
	}
	return result;
}

function substract(operation){
	console.log("substracting")
	var result = 0;


	var index = operation.indexOf("-")
	if (index < 0){
		result = multiply(operation);
		return result;
	}

	var operands = operation.split("-");
	var op1 = 0;

	for (var i = 0; i < operands.length; i++){
		if (i == 0){
			if (index == 0){
				op1 = -multiply(operands[i])
			}else{
				op1 = multiply(operands[i])
			}
			resutl = op1;
		}else{
			result = op1 - multiply(operands[i]);
			op1 = result;
		}
		
	}
	return result;
}

function multiply(operation){
	console.log("multiplying");
	var operands = operation.split("x");
	var result = 1;

	for (var i = 0; i < operands.length; i++){
		result = result * divide(operands[i]);
	}
	return result;
}

function divide(operation){
	console.log("dividing");

	var operands = operation.split("/");
	var result = null;
	var op1 = null;

	for (var i = 0; i < operands.length; i++){
		if (i == 0){
			op1 = parseInt(operands[i]);
			result = op1;
		}else{
			result = op1 / parseInt(operands[i]);
			op1 = result;
		}
	}
	return result;
}