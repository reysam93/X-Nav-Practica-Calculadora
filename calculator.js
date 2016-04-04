//CSS

var ans = 0;
var resutl = '';
var solved = false;
var display = null;
var mayusDown = false;

window.onload = function(){
	console.log("loading");
	setupLocalStorage();
	display = $("#display");
	$(".number").click(function(e){
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
	$("#decimals").click(function(){
		updateDisplay(this.value);
	});
	$("#openBrackets").click(function(){
		updateDisplay(this.value);
	});
	$("#closeBrackets").click(function(){
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
	});
	addEventListener("keydown", captureKeys, false);
	addEventListener("keyup", releaseKeys, false);

	$("#settings").on("input", setSettings);
}

function setSettings(){
	var bgColor = $("#calculatorBg").val();
	$("#calculator").css("background-color", bgColor);
	localStorage['bgColor'] = bgColor;

	var displayBg = $("#displayBg").val();
	$("#displayContainer").css("background-color", displayBg);
	localStorage['displayBg'] = displayBg;

	var buttonsColor = $("#buttonsColor").val();
	$("#buttons input").css("background-color", buttonsColor);
	localStorage['buttonsColor'] = buttonsColor;
}	

function setupLocalStorage(){
	if(Modernizr.localstorage){
		$("#localStorage").html("Your settings will be saved for other session!");
		setupSettings();
	}else{
		$("#localStorage").html("Your navigator do not support local storage");
	}
}

function setupSettings(){
	var bgColor = localStorage['bgColor'];
	$("#calculator").css("background-color", bgColor);

	var displayBg = localStorage['displayBg'];
	$("#displayContainer").css("background-color", displayBg);

	var buttonsColor = localStorage['buttonsColor'];
	$("#buttons input").css("background-color", buttonsColor);
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
	}else if((e.keyCode == 56 && !mayusDown) || e.keyCode == 104){
		value = 8;
	}else if((e.keyCode == 57 && !mayusDown) || e.keyCode == 105){
		value = 9;
	}else if((e.keyCode == 171 && !mayusDown) || e.keyCode == 107){
		value = '+';
	}else if(e.keyCode == 173 || e.keyCode == 109){
		value = '-';
	}else if(e.keyCode == 88 || e.keyCode == 106 || (e.keyCode == 171 && mayusDown)){
		value = '*';
	}else if((e.keyCode == 55 && mayusDown) || e.keyCode == 111){
		value = '/';
	}else if(e.keyCode == 190){
		value = ".";
	}else if(e.keyCode == 56 && mayusDown){
		value = "(";
	}else if(e.keyCode == 57 && mayusDown){
		value = ")";
	}else if(e.keyCode == 8){
		deleteLast();
	}else if(e.keyCode == 13){
		solve();
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
	return (value == '+' || value == '-' || value == '*' || value == '/');
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
	var result = eval(operation);
	display.html(result);
	ans = result;
	solved = true;
}