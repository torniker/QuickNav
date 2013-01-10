(function() { 

	var val = '';
	var input = null;
	var div = null;
	var a = document.getElementsByTagName('a');
	var found = [];
	var index = 0;
	var num;
	var prev = {};

	var suggestionsUl = null;

	window.onkeyup = function(e) {
		if(e.ctrlKey == true && e.keyCode == 190) {
			if(div == null) {
				div = document.createElement("div");
				div.className = '_quicknav_container';
				input = document.createElement("input");
				input.type='text';
				input.onkeyup = changeListener;
				div.appendChild(input);
				
				suggestionsUl = document.createElement("ul");
				div.appendChild(suggestionsUl);
				document.body.appendChild(div);
				input.focus();
			}
		}
		
		inputControls(e);
	}

	var changeListener = function(e) {
		if(e.keyCode != 40 && e.keyCode != 38  && e.keyCode != 27 && e.keyCode != 13) {
			removeSelection();
			findAll(input.value);
			inputControls(e);
		}
	}

	var inputControls = function (e) {
		if(typeof input != 'undefined') {
			switch(e.keyCode) {
				case 13 : goToURL(); break;
				case 27 : disableQuickNav(); break;
				case 40 : 
					removeSelection();
					index++; 
					if(index>=num) { index = 0; }
					selectFound(); 
					break;
				case 38 : 
					removeSelection();
					if(index==0) { index = num; }
					if(index>0) { index--; } 
					selectFound(); 
					break;
			}
		}
	}

	var findAll = function(str) {
		$(suggestionsUl).find('li').remove();
		var re = new RegExp(str,"gi");
		var n;
		var j = 0;
		found = [];
		for(i=0;i<a.length;i++) {
			str = a[i].text;
			n = str.match(re);
			if(n && str != '') {
				found[j] = a[i];
				j++;
			}
		}
		num = j;
		showSuggestions();
		selectFound();
	}

	var showSuggestions = function() {		
		for(i=0;i<found.length;i++) {
			var li = $('<li>');
			var lia = $('<a>');
			var liaspan = $('<span>');
			var text = $(found[i]).text();
			var title = $(found[i]).attr('title');
			var href = $(found[i]).attr('href');

			lia.attr('href',href);

			if(text == 'About') {
				console.log(title);
			}
			if(title == '' || typeof title == 'undefined' || text == title) {
				liaspan.text(href);
			} else {
				liaspan.text(title);
			}	
			lia.text(text);
			lia.append(liaspan);
			li.append(lia);
			$(suggestionsUl).append(li);
		}
		suggestionsUl.style.cssText = 'max-height: '+ (docHeight()-100) +'px;';

		//console.log(suggestionsUl);
		
	}

	var ObjectPosition = function(obj) {
		var curleft = 0;
		var curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return curtop;
	}

	var selectFound = function() {
		if(!found[index]) {
			removeSelection();
			return;
		}
	
		prev.bg 			= found[index].style.background;
		prev.color 			= found[index].style.color;
		prev.textDecoration = found[index].style.textDecoration;
		found[index].style.background 		= '#444';
		found[index].style.color 			= '#fff';
		found[index].style.textDecoration 	= 'none';
		prev.display = found[index].style.display;

		//console.log(found[index]);
		$(suggestionsUl).find('li').removeClass('_quick_selected');
		
		var li = $(suggestionsUl).find('li:eq('+index+')');
		li.addClass('_quick_selected');

		var top = 100;
		var bot = docHeight()-100;
		var litop = li.offset().top;

		console.log(litop);
		if(litop > bot) {
			suggestionsUl.scrollTop = suggestionsUl.scrollTop + li.height();
		} 
		if(litop < top) {
			suggestionsUl.scrollTop = suggestionsUl.scrollTop - li.height();
		}


		if(!found[index].style.display.match('block')) {
			found[index].style.display = 'inline-block';
		}

		var pos = ObjectPosition(found[index]);
		var from = scrollTop();
		var to = from + docHeight();
		if(pos < from || pos > to) {
			speed = Math.abs(pos - from);
			$('html, body').animate({
		         scrollTop: pos - 100
		     }, speed);
		}
	}

	var removeSelection = function() {
		if(typeof found[index] == 'object') {
			found[index].style.background 		= prev.bg;
			found[index].style.display 			= prev.display;
			found[index].style.color 			= prev.color;
			found[index].style.textDecoration 	= prev.textDecoration;
			//inset 0 0 15px -1px black
		}
	}

	var goToURL = function() {
		if(typeof found != 'undefined' && div != null) {
			if(found[index].href) {
				document.location.href = found[index].href;
			}
		}
	}

	var disableQuickNav = function() {
		removeSelection();
		found = [];
		index = 0;
		if(div != null) {
			document.body.removeChild(div);
			div = null;
		}
		//findAll('');
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
	        var B = document.body;
	        var D = document.documentElement;
	        D = (D.clientHeight)? D: B;
	        return D.scrollTop;
	    }
	}

}());
