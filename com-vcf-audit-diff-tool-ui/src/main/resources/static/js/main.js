var a = document.getElementById('left');
var b = document.getElementById('right');
var result = document.getElementById('result');
var fileLeft = document.getElementById('fileLeft');
var fileRight = document.getElementById('fileRight');

function changed() {
	var diff = JsDiff[window.diffType](a.textContent, b.textContent);
	var fragment = document.createDocumentFragment();
	for (var i=0; i < diff.length; i++) {

		if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
			var swap = diff[i];
			diff[i] = diff[i + 1];
			diff[i + 1] = swap;
		}

		var node;
		if (diff[i].removed) {
			node = document.createElement('del');
			node.appendChild(document.createTextNode(diff[i].value));
		} else if (diff[i].added) {
			node = document.createElement('ins');
			node.appendChild(document.createTextNode(diff[i].value));
		} else {
			node = document.createTextNode(diff[i].value);
		}
		fragment.appendChild(node);
	}

	result.textContent = '';
	result.appendChild(fragment);
}

window.onload = function() {
	window.diffType = "diffJson";
	changed();
};

a.onpaste = a.onchange =
b.onpaste = b.onchange = changed;

if ('oninput' in a) {
	a.oninput = b.oninput = changed;
} else {
	a.onkeyup = b.onkeyup = changed;
}

function onDiffTypeChange(radio) {
	window.diffType = "diffJson";
}

function clearFunction() {
    a.innerHTML = "";
    b.innerHTML = "";
    result.innerHTML="";
    fileLeft.value='';
    fileRight.value='';
}

var preTemplate = '<html lang="en">'+
'<head>'+

'<style>'+

'html, body {'+
	'background: #EEE;'+
	'font: 12px sans-serif;'+
'}'+

'body {'+
	'padding-top: 1.1em;'+
	'-webkit-box-sizing: border-box;'+
	'-moz-box-sizing: border-box;'+
	'box-sizing: border-box;'+
'}'+

'html, body, table, tbody, tr, td {'+
	'height: 100%'+
'}'+

'del {'+
	'text-decoration: none;'+
	'color: #f9f9f9;'+
	'background: #e41212;'+
'}'+

'ins {'+
	'background: #aece10;'+
	'color: #141513;'+
	'text-decoration: none;'+
'}'+

'</style>'+

'</head>'+
'<body>';

var postTemplate = '</body>'+
	'</html>';

function saveFunction() {
	//var textToSave = result.outerHTML;
	var resultText = result.outerHTML;
	var textToSave = preTemplate + resultText + postTemplate;
    var textToSaveAsBlob = new Blob([textToSave], {type: "text/html;charset=utf-8"});
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = "audit-diff";
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    
    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

function handleFiles(files, side) {
    var reader = new FileReader();

    reader.onload = (function(theFile) {
        return function(e) {
        	if (side === 'left') {
                a.innerHTML = e.target.result;
                changed();
            } else {
            	b.innerHTML = e.target.result;
            	changed();
            }
        };
    })(files[0]);
    
    reader.readAsText(files[0]);
}
