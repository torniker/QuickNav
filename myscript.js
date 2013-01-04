(function() { 

	var val = '';
	var input;
	var a = document.getElementsByTagName('a');
	var found = false;
	var index = 0;
	var num;

	window.onkeyup = function(e) {
		if(e.ctrlKey == true && e.keyCode == 190) {
			if(typeof input == 'undefined') {
				input = document.createElement("input");
				input.type='text';
				input.style.cssText = 'position: fixed; top: 20px; left:20px; width:200px; border:1px #eee solid;';
				input.onkeyup = changeListener;
				document.body.appendChild(input);
				input.focus();
			}
		}
		
		inputControls(e);
	}

	var changeListener = function(e) {
		findNext(input.value);
		inputControls(e);
	}

	var inputControls = function (e) {
		if(typeof input != 'undefined') {
			switch(e.keyCode) {
				case 13 : goToURL(); break;
				case 27 : disableQuickNav(); break;
				case 40 : 
					index++; 
					if(index>num) { index = 0; }
					findNext(); 
					break;
				case 38 : 
					if(index==0) { index = num; }
					if(index>0) { index--; } 
					findNext(); 
					break;
			}
		}
	}

	var findNext = function(str) {
		var re = new RegExp(str,"gi");
		var n;
		var j = 0;
		found = false;
		
		for(i=0;i<a.length;i++) {
			str = a[i].text;
			n = str.match(re);
			if(n) {
				if(index == j) {

					found = a[i];
					console.log(typeof a[i]);
					found.style.cssText = 'background:#444; color:#fff ';

					console.log(found);
					var pos = found.offset();
					var from = scrollTop();
					var to = from + docHeight();
					if(pos.top < from || pos.top > to) {
						speed = Math.abs(pos.top - from);
						$('html, body').animate({
					         scrollTop: pos.top - 100
					     }, speed);
					}
				} else {
					$(a[i]).css('background','none');
				}
				j++;
			} else {
				$(a[i]).css('background','none');
			}
		}
		num = j;
	}

	var goToURL = function() {
		if(found) {
			if(found.attr('href')) {
				document.location.href = found.attr('href');
			}
		}
	}

	var disableQuickNav = function() {
		found = false;
		index = 0;
		if(typeof input != 'undefined') {
			document.body.removeChild(input.obj);
			delete input;
		}
		findNext('');
	}

	var docHeight = function() {
	    var e = window, a = 'inner';
		if ( !( 'innerWidth' in window )) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		obj = { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		return obj.height;
	}

	var scrollTop = function(){
	    if(typeof pageYOffset!= 'undefined') {
	        return pageYOffset;
	    } else {
	        var B = document.body; //IE 'quirks'
	        var D = document.documentElement; //IE with doctype
	        D= (D.clientHeight)? D: B;
	        return D.scrollTop;
	    }
	}

}());




/*var input = {
		visible : false,
		show : function() {
			if(input.visible) {
				input.focus();
			} else {
				input.obj = document.createElement("input");
				input.obj.type = 'text';
				input.obj.style.cssText = 'position:fixed; top:100px; left:100px; width:200px; border:1px solid #ddd;';
				input.obj.onkeyup = input.inputChangeListener;
				document.body.appendChild(input.obj);
				input.focus();
				input.visible = true;
			}
		},
		hide : function() {
			input.visible = false;
			if(typeof input.obj != 'undefined') {
				document.body.removeChild(input.obj);
				delete input.obj;
			}
			
		},
		focus : function() {
			input.obj.focus();
		},

		inputChangeListener : function () {
			searchLinks(input.obj.value);
		}
	};

	var searchLinks = function(str) {
		if(typeof str == 'undefined') {
			return ;
		}
		var a = document.getElementsByTagName('a');
		for(i=0;i<a.length; i++) {
			if(a[i].text.match(str)) {
				selectA(a[i]);
				return ;
			}
		}
	}

	function selectA(a) {
		a.style.cssText = 'background: #3300cc;';
	}

	window.onkeyup = function(e) {
		if(e.ctrlKey == true && e.keyCode == 191) {
			input.show();
		} else if(e.keyCode == 27) {
			input.hide();
		}
	}
*/






/*$(document).ready(function() {
	var val = '';
	var input;
	var a = $('a');
	var found = false;
	var index = 0;
	var num;

	
	$(document).keypress(function(e) {
		if(e.ctrlKey == true && e.charCode == 113 || e.charCode == 17) {
			console.log('asdas');
			if(typeof input == 'undefined') {
				console.log('das');
				var newInput = document.createElement("input");
				newInput.type='text';
				newInput.id = 'quicknav';
				newInput.style.cssText = 'position: fixed; top: 20px; left:20px; width:150px';
				console.log(newInput);
				$('body').append(newInput);
				input = $('#quicknav');
				input.keyup(changeListener);
				input.focus();
				//input.val(String.fromCharCode(e.charCode));
			}
		}
		
		inputControls(e);
	});

	var inputControls = function (e) {
		if(input) {
			switch(e.keyCode) {
				case 13 : goToURL(); break;
				case 27 : disableQuickNav(); break;
				case 40 : 
					index++; 
					if(index>num) { index = 0; }
					findNext(); 
					break;
				case 38 : 
				console.log(num);
					if(index==0) { index = num; }
					if(index>0) { index--; } 
					findNext(); 
					break;
			}
		}
	}

	var changeListener = function(e) {
		findNext(input.val());
		inputControls(e);
	}


	var findNext = function(str) {
		var re = new RegExp(str,"gi");
		var n;
		var j = 0;
		found = false;
		
		for(i=0;i<a.length;i++) {
			str = $(a[i]).html();
			n = str.match(re);
			if(n) {
				if(index == j) {
					found = $(a[i]);
					found.css('backgroundColor','#444');
					found.css('color','#FFF');
					var pos = found.offset();
					var from = scrollTop();
					var to = from + docHeight();
					if(pos.top < from || pos.top > to) {
						speed = Math.abs(pos.top - from);
						$('html, body').animate({
					         scrollTop: pos.top - 100
					     }, speed);
					}
				} else {
					$(a[i]).css('background','none');
				}
				j++;
			} else {
				$(a[i]).css('background','none');
			}
		}
		num = j;
	}

	var goToURL = function() {
		if(found) {
			if(found.attr('href')) {
				document.location.href = found.attr('href');
			}
		}
	}

	var disableQuickNav = function() {
		input.remove();
		input = false;
		found = false;
		index = 0;
		findNext('');
	}

	var docHeight = function() {
	    var e = window, a = 'inner';
		if ( !( 'innerWidth' in window )){
			a = 'client';
			e = document.documentElement || document.body;
		}
		obj = { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
		return obj.height;
	}

	var scrollTop = function(){
	    if(typeof pageYOffset!= 'undefined'){
	        return pageYOffset;
	    } else {
	        var B = document.body; //IE 'quirks'
	        var D = document.documentElement; //IE with doctype
	        D= (D.clientHeight)? D: B;
	        return D.scrollTop;
	    }
	}

});*/