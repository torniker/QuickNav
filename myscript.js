var input = {
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