/*
 * This program is licensed under the MIT License.
 * Copyright 2014, aike (@aike1000)
 *
 */
var verno = '3D Viewer Ver1.7';
var stType = 1;		//Default Stereo type:1 SBS
var ssint = 0;		//Default Slide show interval:0 Off
var swap = true;	//Default Swap status:True L/R
var menutime = 30;	//menu showing time 30x0.1=3.0Sec
var curmtime = 0;
var isHoveringControls = false;
var dltv = 0.2;		//Left/Right adjustment unit
var dltr = 0.1;		//Left/Right rotation adjustment unit
var dltx = 0.0;
var dlty = 0.0;
var rota = 0.0;
var crdltx = 0;
var crdlty = 0;
var nFull = 0;
var nPage = 0;
var start = 0;
var dist = 0;
var effect;
var video = null;
var audio = null;
var vw;
var vh;
var vc;
var wh = 0;
var canvasl = null;
var canvasr = null;
var canvast = null;
var canvas = null;
var ctxl = null;
var ctxr = null;
var ctxt = null;
var ctx = null;
var isVideo = true;
var ChangeCanvas = true;
var isStart = false;
var isiOS = false;
var file3d;
var timeall = 0;
var timecnt = 0;
var camera;
var deffile = true;
var files;
var showbtn = true;
var bTach = false;
var passiveSupported = false;
var distance = 0.0;
var zoomfac = 100.0;
var nRot = 0;
var plane;
var mousedown = false;
var onPointerDownPointerX0;
var onPointerDownPointerY0;
var curx = 0;
var cury = 0;
var curz = 0;
var zoom = 60;
var zoomtmp = 60;
var camposz = 70;
var imgrto = 1.0;
var imgw;
var imgh;
var bClear = false;
var timeout_id = null;
var is1st = true;
var Param = "";
var vmuted = false;
var vlevel = 1.0;
var bNoresetalign = true;
var message;
var stmov = "0,0,0,1,1,0,1,0,60";
var st180 = "0,0,0,1,1,1,0";
var st360 = "0,0,0,1,1,1,0";
var stream;
var recorder;
var blobUrl;
var recmode = 0;

document.write(
	"<style>",
	"    HTML{",
	"	margin:0px;",
	"	width:100%",
	"	height:100%",
	"    overflow: clip;",
	"    -ms-overflow-style: none;",
	"    overflow: -moz-scrollbars-none;",
	"	scrollbar-width: none;",
	"    }",
	"    body::-webkit-scrollbar {",
	"        display:none;",
	"    }",
	"	input{",
	"	  display: none;",
	"	  }",
	"	label{",
	"	  font-size:18px;",
	"	  background: #000;",
	"	  color:#fff;",
	"	  cursor:pointer;",
	"	  text-align: center;",
	"	  border: solid 2px #aaaaaa;",
	"	  display:inline-block;",
	"	  line-height:44px;",
	"	}",
	"	button{",
	"	  font-size:18px;",
	"	  width:70px;",
	"	  height:30px;",
	"	  background: rgba(0,0,0,0.6);",
	"	  border-color:#888888 #888888 #888888 #888888;",
	"	  color:#aaaaaa;",
	"	  margin-top:0px;",
	"	  margin-bottom:0px;",
	"	}",
	"	button:active{",
	"	  background-color:#444444;",
	"	  color:#00ffff;",
	"	}",
	"	#filename{",
	"	  display:inline-block;",
	"	  font-size:18px;",
	"	  height:20px;",
	"	  width:200px;",
	"	  background: rgba(0,0,0,0.6);",
	"	  color:#aaaaaa;",
	"		padding: 5px 5px;",
	"	  margin-top:0px;",
	"	  margin-left:1px;",
	"	}",
	"	#progtime{",
	"	  display:inline-block;",
	"	  font-size:18px;",
	"	  height:26px;",
	"	  width:180px;",
	"	  background: rgba(0,0,0,0.6);",
	"	  color:#aaaaaa;",
	"	  margin-top:0px;",
	"	}",
	"	#volumelevel{",
	"	  display:inline-block;",
	"	  font-size:18px;",
	"	  height:26px;",
	"	  width:150px;",
	"	  background: rgba(0,0,0,0.6);",
	"	  color:#aaaaaa;",
	"	  margin-top:0px;",
	"	margin-left:60px;",
	"	}",
	"	#dropmenu {",
	"	  list-style-type: none;",
	"	  width: 860px;",
	"	  height: 4px;",
	"	  margin-top:0px;",
	"	  background: transparent;",
	"	}",
	"	#dropmenu li {",
	"	  position: relative;",
	"	  float: left;",
	"	  margin: 0;",
	"	  padding: 0;",
	"	  text-align: center;",
	"	}",
	"	#dropmenu li ul {",
	"	  position: absolute;",
	"	  top: 100%;",
	"	  left: -50%;",
	"	  list-style: none;",
	"	  margin: 0;",
	"	  z-index: 2;",
	"	  border-radius: 0 0 3px 3px;",
	"	}",
	"	#dropmenu li ul li{",
	"	  overflow: hidden;",
	"	  width: 100%;",
	"	  height: 0px;",
	"	  -moz-transition: .2s;",
	"	  -webkit-transition: .2s;",
	"	  -o-transition: .2s;",
	"	  -ms-transition: .2s;",
	"	  transition: .2s;",
	"	}",
	"	#dropmenu li:hover ul li{",
	"	  overflow: visible;",
	"	  height: 100%;",
	"	}",
	"	#progress-wrap {",
	"	    width: 100%;",
	"	    height: 1rem;",
	"	}",
	"	 ",
	"	#progress-out {",
	"	    width: 100%;",
	"	    height: 100%;",
	"	    background-color: rgba(0, 0, 0, 0.2);",
	"	    border-radius: 3px;",
	"	    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);",
	"	    transform: scaleY(0.5);",
	"	    transition: 0.3s;",
	"	}",
	"	 ",
	"	#progress-out:hover {",
	"	    transform: scaleY(1.0);",
	"	    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);",
	"	    cursor: pointer;",
	"	}",
	"	 ",
	"	#progress-in {",
	"	    margin: 0 auto 0 0;",
	"	    width: 100%;",
	"	    height: 100%;",
	"	    background-color: #3F51B5;",
	"	    border-radius: 3px;",
	"	    transform-origin: top left;",
	"	    transition: 0.1s;",
	"	}",
	"	 ",
	"	#controller-box {",
	"	    text-align: center;",
	"	}",
	"</style>",
	"<div id='image1' style='position:absolute;top:0px;left:0px'></div>",
	"<div id='btn' class='top-bar'>",
	"<ul id='dropmenu'>",
	"<NOBR>",
	"  <li><button id='button9' class='btn-circle' title='Close'><i class='fa-solid fa-xmark'></i></button></li> ",
	"  <li><button id='button90' class='btn-circle' title='Record'><i class='fa-solid fa-video'></i></button></li> ",
	"  <li><button id='button6' class='btn-circle' title='Fullscreen'><i class='fa-solid fa-expand'></i></button></li>",
	"  <li><button id='button8' class='btn-circle' title='Fit'><svg fill='#ffffff' width='18px' height='18px' viewBox='0 0 32 32' id='icon' xmlns='http://www.w3.org/2000/svg'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'><title>Ajustável à tela</title><polygon points='22 16 24 16 24 8 16 8 16 10 22 10 22 16'></polygon><polygon points='8 24 16 24 16 22 10 22 10 16 8 16 8 24'></polygon><path d='M26,28H6a2.0023,2.0023,0,0,1-2-2V6A2.0023,2.0023,0,0,1,6,4H26a2.0023,2.0023,0,0,1,2,2V26A2.0023,2.0023,0,0,1,26,28ZM6,6V26H26.0012L26,6Z'></path></g></svg></button></li>",
	"  <li style='display:none !important;'><button id='button40' class='btn-circle' title='Slideshow'><i class='fa-solid fa-images'></i></button>",
	"    <ul>",
	"	  <li><button id='button41' style='height:40px;width:100px;'>Off</button></li>",
	"	  <li><button id='button42' style='height:40px;width:100px;'>3s</button></li>",
	"	  <li><button id='button43' style='height:40px;width:100px;'>5s</button></li>",
	"	  <li><button id='button44' style='height:40px;width:100px;'>7s</button></li>",
	"	  <li><button id='button45' style='height:40px;width:100px;'>10s</button></li>",
	"    </ul>",
	"  </li>",
	"  <li><button id='button1' class='btn-circle' title='Previous' style='display:none !important;'><i class='fa-solid fa-chevron-left'></i></button></li>",
	"  <li><button id='button2' class='btn-circle' title='Next' style='display:none !important;'><i class='fa-solid fa-chevron-right'></i></button></li>",
	"  <li><button id='button60' class='btn-circle' title='Files'><i class='fa-solid fa-folder-open'></i></button>",
	"	<ul>",
	"		<li><input class='test' type='file' id='files' name='files[]' multiple ><label for='files' style='height:44px; width:120px;'>Full SBS</label></li> ",
	"		<li><input class='test' type='file' id='files2' name='files[]' multiple ><label for='files2' style='height:44px; width:120px;'>Half SBS</label></li> ",
	"		<li><input class='test' type='file' id='files3' name='files[]' multiple ><label for='files3' style='height:44px; width:120px;'>Full T/B</label></li> ",
	"		<li><input class='test' type='file' id='files4' name='files[]' multiple ><label for='files4' style='height:44px; width:120px;'>Half T/B</label></li> ",
	"	</ul>",
	"  </li>",
	"  <li><button id='button50' class='btn-circle' title='Help'><i class='fa-solid fa-circle-question'></i></button>",
	"	<ul>",
	"		<li><button id='button52' style='height:40px;width:120px;'>English</button></li>",
	"		<li><button id='button51' style='height:40px;width:120px;'>Japanese</button></li>",
	"		<li><button id='button53' style='height:40px;width:120px;'>Version</button></li>",
	"		<li><button id='button54' style='height:40px;width:120px;'>Reset</button></li>",
	"	</ul>",
	"  </li>",
	"  <li><div id='filename' style='display:none;'></div><li>", // Hidden filename to clean up bar
	"</ul>",
	"</NOBR></div>",
	"<div id='controller-box' class='video-controls'>",
	"  <div class='controls-left'>",
	"    <button id='button4' class='btn-circle'><i id='icon-play' class='fa-solid fa-play'></i></button>",
	"    <button id='button31' class='btn-circle'><i class='fa-solid fa-stop'></i></button>",
	"  </div>",
	"  <div id='progress-wrap'><div id='progress-out'><div id='progress-in'></div></div><div id='progress-thumb'></div></div>",
	"  <div class='controls-right'>",
	"    <div class='time-display' id='time-display-container'>",
	"        <span class='current-time' id='curr-time-text'>0:00</span>",
	"        <span class='separator'>/</span>",
	"        <span class='total-time' id='total-time-text'>0:00</span>",
	"    </div>",
	"    <div id='volumelevel' style='display:none;'></div>",
	"    <div class='volume-container'>",
	"      <button id='button34' class='btn-circle'><i id='icon-mute' class='fa-solid fa-volume-high'></i></button>",
	"      <input type='range' id='vol-slider' min='0' max='1' step='0.05' value='1' onmousedown='event.stopPropagation()' ontouchstart='event.stopPropagation()' onclick='event.stopPropagation()' oninput='vlevel=this.value; if(window.video) video.volume=this.value;'>",
	"    </div>",
	"    <button id='button3' class='btn-circle' style='margin-right:10px;'><span style='font-weight:900; font-size: 12px;'>L/R</span></button>",
	"    <button id='btn-settings' onclick='toggleSettings()' class='btn-circle'><span style='font-weight:900; font-size: 14px;'>3D</span></button>",
	"  </div>",
	"</div>",
	"<div id='settings-menu'>",
	"  <div class='settings-group'>",
	"    <div style='padding:8px; font-weight:bold; color:#aaa; border-bottom:1px solid #444; margin-bottom:5px;'>3D Mode: <span id='button0'>Stereo</span></div>",
	"    <button id='button20'>SBS</button>",
	"    <button id='button29'>LR/RL</button>",
	"    <button id='button22'>Dubois</button>",
	"    <button id='button23'>Color</button>",
	"    <button id='button24'>Gray</button>",
	"    <button id='button25'>H_Int</button>",
	"    <button id='button27'>3DLCD</button>",
	"    <button id='button28'>HSBS</button>",
	"    <button id='button36'>Mirror</button>",
	"    <button id='button35'>2D</button>",
	"  </div>",

	"</div>",
	"<script>function toggleSettings(){ var m = document.getElementById('settings-menu'); if(m.style.display==='flex') { m.style.display='none'; m.classList.remove('active'); } else { m.style.display='flex'; setTimeout(function(){m.classList.add('active')}, 10); } }</script>"
);

var ThView = function (arg) {
	this.d2r = function (d) {
		return d * Math.PI / 180;
	};
	this.id = arg.id; // id of parent element *required*

	if (arg.file instanceof Array) {
		this.file = arg.file; // filename *required*
	} else {
		this.file = [arg.file];
	}
	this.oldPosition = {
		x: null,
		y: null
	};
	loadlocalStorage();

	this.imageNo = 0;
	Param = self.location.search;
	Param = Param.substring(1, Param.length);
	//	console.log("Param="+Param);
	if (parseInt(Param) > 0) this.imageNo = (parseInt(Param) - 1) * 2;
	//	for(i=0;i<this.file.length;i=i+2){
	//		if(this.file[i+1]==Param) this.imageNo=i;
	//		}

	this.mousedown = false;
	this.moving = false;
	this.element = document.getElementById(this.id);
	this.show();
}

// if(!Filenamedisplay) document.getElementById("filename").style.visibility = "hidden";

window.onunload = function (event) {
	event.preventDefault();
	if (bClear) return;
	var array = [];
	var obj = {
		'stType': stType,
		'Swap': swap,
		'Loop': ssint,
		'Vlevel': vlevel,
		'Vmuted': vmuted,
		'zoom': zoom,
		'dltx': dltx.toFixed(1),
		'dlty': dlty.toFixed(1),
		'rota': rota.toFixed(1)
	};
	array.push(obj);
	var setjson = JSON.stringify(obj);
	try {
		localStorage.setItem('3dmovie', setjson);
	}
	catch (err) {
		var expire = new Date();
		expire.setTime(expire.getTime() + 1000 * 3600 * 24);
		var nCok = "" + dltx.toFixed(1) + "," + dlty.toFixed(1) + "," + rota.toFixed(1) + "," + stType + "," + swap / 1 + "," + ssint + "," + vlevel + "," + vmuted / 1 + "," + zoom + "&" + st180 + "&" + st360;
		document.cookie = "" + nCok + "; expires=" + expire.toUTCString();
	}
}

function loadlocalStorage() {
	try {
		var getjson = localStorage.getItem('3dmovie');
		var obj = JSON.parse(getjson);
		if (obj != null) {
			stType = obj['stType'];
			swap = obj['Swap'];
			ssint = obj['Loop'];
			vmuted = obj['Vmuted'];
			if (vmuted == null) vmuted = false;
			vlevel = obj['Vlevel'];
			if (vlevel == null) vlevel = 1.0;
			zoom = obj['zoom'];
			if (zoom == null) zoom = 60;
			dltx = obj['dltx'];
			if (dltx == null) dltx = 0.0;
			dlty = obj['dlty'];
			if (dlty == null) dlty = 0.0;
			rota = obj['rota'];
			if (rota == null) rota = 0.0;
			bNoresetalign = true;
		}
	} catch (err) {
		if (document.cookie.length > 0) {
			var allcookies = document.cookie;
			if (allcookies != '') {
				var appcookies = allcookies.split('&');
				if (appcookies.length > 2) {
					st180 = appcookies[1];
					st360 = appcookies[2];
					var cookies = appcookies[0].split(',');
					dltx = parseFloat(cookies[0]);
					dlty = parseFloat(cookies[1]);
					rota = parseFloat(cookies[2]);
					stType = parseInt(cookies[3]);
					swap = Boolean(parseInt(cookies[4]));
					ssint = parseInt(cookies[5]);
					vlevel = parseFloat(cookies[6]);
					vmuted = Boolean(parseInt(cookies[7]));
					zoom = parseInt(cookies[8]);
				}
				bNoresetalign = true;
			}
		}
	}
	dltx = parseFloat(dltx);
	dlty = parseFloat(dlty);
	rota = parseFloat(rota);
}

///////// main process
ThView.prototype.show = function () {
	var self = this;
	var onPointerDownPointerX0;
	var onPointerDownPointerY0;
	var texturel;
	var texturer;
	var _animationID = null;
	if (navigator.userAgent.indexOf("iPhone") > 0 || navigator.userAgent.indexOf(
		"iPod") > 0 || navigator.userAgent.indexOf("iPad") > 0) {
		isiOS = true;
	}
	var renderer;
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0x000000, 1);
	this.element.appendChild(renderer.domElement); // append to <DIV>
	document.getElementById('files').addEventListener('change',
		handleFileSelect, false);
	document.getElementById('files2').addEventListener('change',
		handleFileSelect2, false);
	document.getElementById('files3').addEventListener('change',
		handleFileSelect3, false);
	document.getElementById('files4').addEventListener('change',
		handleFileSelect4, false);
	document.getElementById('files').addEventListener('click',
		handleFileClear, false);
	document.getElementById('files2').addEventListener('click',
		handleFileClear2, false);
	document.getElementById('files3').addEventListener('click',
		handleFileClear3, false);
	document.getElementById('files4').addEventListener('click',
		handleFileClear4, false);

	function handleFileClear(evt) {
		document.getElementById('files').value = '';
	}
	function handleFileClear2(evt) {
		document.getElementById('files2').value = '';
	}
	function handleFileClear3(evt) {
		document.getElementById('files3').value = '';
	}
	function handleFileClear4(evt) {
		document.getElementById('files4').value = '';
	}
	function handleFileSelect(evt) {
		files = evt.target.files; // FileList object
		if (files.length > 0) {
			deffile = false;
			self.imageNo = 0;
			wh = 0;
			loadfiletotex(self.imageNo);
		}
	}
	function handleFileSelect2(evt) {
		files = evt.target.files; // FileList object
		if (files.length > 0) {
			deffile = false;
			self.imageNo = 0;
			wh = 1;
			loadfiletotex(self.imageNo);
		}
	}
	function handleFileSelect3(evt) {
		files = evt.target.files; // FileList object
		if (files.length > 0) {
			deffile = false;
			self.imageNo = 0;
			wh = 2;
			loadfiletotex(self.imageNo);
		}
	}
	function handleFileSelect4(evt) {
		files = evt.target.files; // FileList object
		if (files.length > 0) {
			deffile = false;
			self.imageNo = 0;
			wh = 3;
			loadfiletotex(self.imageNo);
		}
	}
	var onmouseupOrg = document.onmouseup;
	document.onmouseup = function () {
		if (onmouseupOrg) onmouseupOrg();
		self.mousedown = false;
	};

	try {
		document.addEventListener("test", null, Object.defineProperty({}, "passive", {
			get: function () {
				passiveSupported = true;
			}
		}));
	} catch (err) { }

	document.addEventListener('touchstart', function (e) {
		this.className = "hover";
		start = e.touches[0].pageX;
		dist = 0;
		if (showbtn) curmtime = menutime;
		else showmenu();
		if (e.touches.length == 1) {
			var wx = window.innerWidth;
			var wy = window.innerHeight;
			var dx = e.touches[0].pageX;
			var dy = e.touches[0].pageY;
			self.mousedown = true;
			self.oldPosition = {
				x: dx,
				y: dy
			};
			onPointerDownPointerX0 = dx;
			onPointerDownPointerY0 = dy;
		}
		else {
			var x1 = e.touches[0].pageX;
			var y1 = e.touches[0].pageY;
			var x2 = e.touches[1].pageX;
			var y2 = e.touches[1].pageY;
			curz = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
			curc = 0;
		}
		return true;
	}, { passive: false });
	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
		if (showbtn) curmtime = menutime;
		else showmenu();
		if (e.touches.length == 1) {
			var dx = onPointerDownPointerX0 - e.touches[0].pageX;
			var dy = onPointerDownPointerY0 - e.touches[0].pageY;
			curx = curx + dx * 0.07;
			cury = cury - dy * 0.07;
			camera.position.set(curx, cury, camposz);
			onPointerDownPointerX0 = e.touches[0].pageX;
			onPointerDownPointerY0 = e.touches[0].pageY;
		}
		else if (e.touches.length == 2) {
			var x1 = e.touches[0].pageX;
			var y1 = e.touches[0].pageY;
			var x2 = e.touches[1].pageX;
			var y2 = e.touches[1].pageY;
			var curz1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
			zoomCamera((curz - curz1) * 10);
			curz = curz1;

		}
	}, { passive: false });
	document.addEventListener('touchend', function (e) {
		var dx;
		if (!isiOS) {
			dx = e.changedTouches[0].pageX;
			//  dx = e.changedTouches[1].pageX;
		}
		dx = onPointerDownPointerX0 - e.changedTouches[0].pageX;
		var dy = onPointerDownPointerY0 - e.changedTouches[0].pageY;
		var wx = window.innerWidth;
		var wy = window.innerHeight;
		/*
			   if ((dx * dx + dy * dy) < 50 && e.changedTouches[0].pageY <
				   (wy - 70)) {
					if (showbtn) {
						document.getElementById("btn").style.visibility =
							"hidden";
						showbtn = false;
					} else {
						document.getElementById("btn").style.visibility =
							"visible";
						showbtn = true;
					}
		
				}
		*/
	}, { passive: false });
	document.addEventListener('mousedown', function (e) {
		e.preventDefault();
		if (showbtn) curmtime = menutime;
		else showmenu();
		mousedown = true;
		onPointerDownPointerX0 = e.clientX;
		onPointerDownPointerY0 = e.clientY;
	});
	document.addEventListener('mousemove', function (e) {
		e.preventDefault();
		if (showbtn) curmtime = menutime;
		else showmenu();
		if (mousedown && e.clientY < (window.innerHeight - 80)) {
			var dx = onPointerDownPointerX0 - e.clientX;
			var dy = onPointerDownPointerY0 - e.clientY;
			curx = curx + dx * 0.07;
			cury = cury - dy * 0.07;
			camera.position.set(curx, cury, camposz);
			onPointerDownPointerX0 = e.clientX;
			onPointerDownPointerY0 = e.clientY;
		}
	});
	document.addEventListener('mouseup', function (e) {
		e.preventDefault();
		mousedown = false;
	});

	zoomCamera = function (val) {
		zoom += val * 0.02;
		if (zoom < 5) zoom = 5;
		if (zoom > 150) zoom = 150;
		if ((stType == 1 || stType == 2 || stType == 9) && zoom > 60) {
			zoomfac = 100 - (zoom - 60);
			camera.fov = 60;
		}
		else {
			zoomfac = 100;
			camera.fov = zoom;
		}
		camera.updateProjectionMatrix();
	}

	// chrome / safari / IE
	this.element.onmousewheel = function (e) {
		e.preventDefault();
		var delta = e.deltaY ? e.deltaY : e.wheelDelta ? -e.wheelDelta :
			-e.wheelDeltaY * 0.2;
		zoomCamera(delta);

	};
	btn.onmousewheel = function (e) {
		e.preventDefault();
	};

	// firefox
	window.addEventListener("DOMMouseScroll", function (e) {
		zoomCamera(e.detail * 30);
		e.preventDefault();
	});

	this.element.addEventListener("dblclick", function (e) {
		if (showbtn) {
			hidemenu();
		} else {
			showmenu();
		}
	}, false);

	document.addEventListener('fullscreenchange', changeFullScreenHandler);
	document.addEventListener('mozfullscreenchange', changeFullScreenHandler);
	document.addEventListener('webkitfullscreenchange', changeFullScreenHandler);

	function changeFullScreenHandler(event) {
		if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
			// Attempt to lock orientation to landscape
			if (screen.orientation && screen.orientation.lock) {
				screen.orientation.lock("landscape").catch(function (err) {
					console.warn("Orientation lock failed:", err);
				});
			}
			nFull = 0;
			// button6.innerHTML = "Full"; // Legacy text
			var icon = button6.querySelector('i');
			if (icon) {
				icon.className = "fa-solid fa-expand";
			}
			button6.title = "Fullscreen";
		}
		else {
			nFull = 1;
			// button6.innerHTML = "Window"; // Legacy text
			var icon = button6.querySelector('i');
			if (icon) {
				icon.className = "fa-solid fa-compress";
			}
			button6.title = "Exit Fullscreen";
		}
	}
	function menutimer() {
		setTimeout(menutimer, 100);
		if (isHoveringControls) {
			curmtime = menutime; // Keep timer full while hovering
			return;
		}
		if (curmtime <= 0) return;
		curmtime--;
		if (curmtime <= 0) hidemenu();
	}

	function showmenu() {
		document.body.style.cursor = 'default';
		var btn = document.getElementById("btn");
		var box = document.getElementById("controller-box");

		// Remove hidden class to trigger fade in
		if (btn) btn.classList.remove("ui-hidden");
		if (box) box.classList.remove("ui-hidden");

		// Ensure visibility properties are reset (legacy cleanup)
		if (btn) btn.style.removeProperty("visibility");
		if (box) box.style.removeProperty("visibility");

		curmtime = menutime;
		showbtn = true;
	}

	function hidemenu() {
		document.body.style.cursor = 'none';

		// Add hidden class to trigger slow fade out
		var btn = document.getElementById("btn");
		var box = document.getElementById("controller-box");

		if (btn) btn.classList.add("ui-hidden");
		if (box) box.classList.add("ui-hidden");

		// Removed direct visibility setting to allow transition
		showbtn = false;
	}

	function toggleFullScreen() {

		nFull = (nFull + 1) % 2;
		if (nFull == 1) {
			fullscreenon();

		}
		else {

			fullscreenoff();

		}

	}

	function fullscreenon() {
		nFS = 0;
		var docElm = document.getElementById(document.body);
		if (document.body.webkitRequestFullscreen) {
			document.body.webkitRequestFullscreen(); //Chrome15+, Safari5.1+, Opera15+
		} else if (document.body.mozRequestFullScreen) {
			document.body.mozRequestFullScreen(); //FF10+
		} else if (document.body.msRequestFullscreen) {
			document.body.msRequestFullscreen(); //IE11+
		} else if (document.body.requestFullscreen) {
			document.body.requestFullscreen(); // HTML5 Fullscreen API仕様
		} else {
			alert('Your browser does not support full screen operation');
			return;
		}
	}

	function fullscreenoff() {
		if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen(); //Chrome15+, Safari5.1+, Opera15+
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen(); //FF10+
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen(); //IE11+
		} else if (document.cancelFullScreen) {
			document.cancelFullScreen(); //Gecko:FullScreenAPI仕様
		} else if (document.exitFullscreen) {
			document.exitFullscreen(); // HTML5 Fullscreen API仕様
		}
	}

	function KeyDownFunc(e) {
		//	e.preventDefault();
		var Keynum;
		if (window.event) Keynum = e.keyCode; // IE
		else if (e.which) Keynum = e.which;
		//    button6.innerHTML=""+Keynum;
		if (Keynum == 32 || Keynum == 220 || Keynum == 176 || Keynum == 227) { //Next image
			settimer(0);
			next();
		} else if (Keynum == 8 || Keynum == 186 || Keynum == 222 || Keynum == 177 ||
			Keynum == 228) { //Previous image
			settimer(0);
			prev();
		} else if (Keynum == 80 || Keynum == 189 || Keynum == 179 || Keynum == 219) { //Effect
			if (video.paused) {
				video.play();
				timeall = 0;
				timecnt = 0;
			} else {
				video.pause();
				timeall = 0;
				timecnt = 0;
			}
		} else if (Keynum == 0 || Keynum == 83) { //Stereo
			stType++;
			if (stType > 9) stType = 0;
			setstereomode(stType);
		} else if (Keynum > 95 && Keynum < 106) {
			settimer(Keynum - 96);
		} else if (Keynum == 37) { //←
			dltx += dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 39) { //→
			dltx -= dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 38) { //↑
			dlty -= dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 40) { //↓
			dlty += dltv;
			showmenu();
			e.preventDefault();
		} else if (Keynum == 75) { //K:rot+
			rota += dltr;
			showmenu();
		} else if (Keynum == 76) { //L:rot-
			rota -= dltr;
			showmenu();
		} else if (Keynum == 36 || Keynum == 67) { //Home or C
			dltx = 0;
			dlty = 0;
			rota = 0;
			showmenu();
		} else if (Keynum == 81) { //Q:quit
			history.go(-1);
		} else if (Keynum == 70) { //Fit
			fitimage();
		} else if (Keynum == 72) { //h
			if (wh < 2) wh = (wh + 1) % 2;
			else if (wh == 2) wh = 3;
			else wh = 2;
			if (wh == 0) imgrto = imgh * 2 / imgw;
			else if (wh == 2) imgrto = imgh / (imgw * 2);
			else imgrto = imgh / imgw;
			plane.scale.set(1, imgrto, 1);
			zoomtmp = zoom;
			fitimage();
			zoomset(zoomtmp);
		} else if (Keynum == 88) { //Swap
			swap = !swap;
		} else if (Keynum == 13) {	//Enter : Full screen ON/OFF
			toggleFullScreen();
		} else if (Keynum == 77) { //Menu Hide
			if (showbtn) {
				hidemenu();
			} else {
				showmenu();
			}
		}
	}

	window.focus();
	if (window.addEventListener) {

		// キーボードを押したときに実行されるイベント
		window.addEventListener("keydown", KeyDownFunc);

		// アタッチイベントに対応している
	} else if (document.attachEvent) {

		// キーボードを押したときに実行されるイベント
		document.attachEvent("onkeydown", KeyDownFunc);

	}


	window.addEventListener('resize', function (e) {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		if (stType == 1 || stType == 9) camera.aspect = window.innerWidth / (window.innerHeight * 2);
		else camera.aspect = window.innerWidth / (window.innerHeight * 1);
		camera.updateProjectionMatrix();
		effect.setSize(window.innerWidth, window.innerHeight);
		zoomtmp = zoom;
		fitimage();
		zoomset(zoomtmp);
	});

	window.addEventListener("orientationchange", function (e) {
		setTimeout(function () {
			doresize();
		}, 100);
	});

	function videoend() {
		if (ssint == 0) { video.currentTime = 0; video.play(); }
		else next();
	}

	function prev() {
		if (deffile) {
			self.imageNo = self.imageNo - 2;
			if (self.imageNo < 0) self.imageNo = self.file.length -
				2;
		} else {
			self.imageNo = self.imageNo - 1;
			if (self.imageNo < 0) self.imageNo = files.length -
				1;
		}
		loadfiletotex(self.imageNo);
	}

	function next() {
		if (timeout_id !== null) {
			clearTimeout(timeout_id);
			timeout_id = null;
		}
		if (deffile) {
			self.imageNo = self.imageNo + 2;
			if (self.imageNo > self.file.length - 1) self.imageNo = 0;
		} else {
			self.imageNo = self.imageNo + 1;
			if (self.imageNo > files.length - 1) self.imageNo = 0;
		}
		loadfiletotex(self.imageNo);
	}

	function doresize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		if (stType == 1 || stType == 9) camera.aspect = window.innerWidth / (
			window.innerHeight * 2);
		else camera.aspect = window.innerWidth / (
			window.innerHeight * 1);
		camera.updateProjectionMatrix();
		effect.setSize(window.innerWidth, window.innerHeight);
	}
	window.onpagehide = function () {
		if (video != null) {
			if (!video.paused) {
				video.pause();
				video.currentTime = 0;
			}
		}
	}
	this.element.addEventListener('dragover', function (event) {
		event.preventDefault();
	}, false);
	this.element.addEventListener('drop', function (event) {
		event.preventDefault();
		files = event.dataTransfer.files; // FileList object
		if (files.length > 0) {
			deffile = false;
			self.imageNo = 0;
			loadfiletotex(self.imageNo);
		}
	}, false);
	button1.onclick = function () { //Previous
		settimer(0);
		prev();
	}
	button2.onclick = function () { //Next
		settimer(0);
		next();
	}
	button3.onclick = function () { //Swap
		swap = !swap;
	}
	button4.onclick = function () { //PLAY
		if (isVideo) {
			if (video.paused) {
				video.play();
				timeall = 0;
				timecnt = 0;
			} else {
				video.pause();
				timeall = 0;
				timecnt = 0;
			}
		}
		else {
			//		location.reload(false);
		}
	}
	button6.onclick = function () {
		//        location.reload(false);
		toggleFullScreen();
	}
	button8.onclick = function () {
		fitimage();
	}
	button9.onclick = function () {
		history.go(-1);
	}
	button90.onclick = function () { //rec
		if (recmode == 0) {
			stream = renderer.domElement.captureStream(30);
			if (video != null) {
				var astream = video.captureStream(30);
				var audioTrack = astream.getAudioTracks()[0];
				if (audioTrack != null) stream.addTrack(audioTrack);
			}
			recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });
			recorder.start();
			recorder.ondataavailable = e => {
				const blob = new Blob([e.data], { type: e.data.type });
				blobUrl = URL.createObjectURL(blob);
			};
			recmode = 1;
			button90.innerHTML = "Stop";
			var element = document.getElementById('button90');
			element.style.color = "#ff8888";
		}
		else if (recmode == 1) {
			recorder.stop();
			recmode = 2;
			button90.innerHTML = "DL";
			var element = document.getElementById('button90');
			element.style.color = "#00ffff";
		}
		else if (recmode == 2) {
			const a = document.createElement('a')
			document.body.appendChild(a)
			a.style = 'display: none'
			a.href = blobUrl
			a.download = (new Date).toISOString().replace(/[^\d]/g, "").slice(0, 14) + ".webm"
			a.click()
			window.URL.revokeObjectURL(blobUrl)
			document.body.removeChild(a)
			recmode = 0;
			button90.innerHTML = "Rec";
			var element = document.getElementById('button90');
			element.style.color = "#aaaaaa";
		}
	}
	button0.onclick = function () {
	}
	button20.onclick = function () {
		setstereomode(1);
	}
	button29.onclick = function () {
		setstereomode(2);
	}
	button22.onclick = function () {
		setstereomode(3);
	}
	button23.onclick = function () {
		setstereomode(4);
	}
	button24.onclick = function () {
		setstereomode(5);
	}
	button25.onclick = function () {
		setstereomode(6);
	}
	button27.onclick = function () {
		setstereomode(7);
	}
	button28.onclick = function () {
		setstereomode(8);
	}
	button36.onclick = function () {
		setstereomode(9);
	}
	button35.onclick = function () {
		setstereomode(0);
	}
	button41.onclick = function () {
		settimer(0);
	}
	button42.onclick = function () {
		settimer(3);
	}
	button43.onclick = function () {
		settimer(5);
	}
	button44.onclick = function () {
		settimer(7);
	}
	button45.onclick = function () {
		settimer(10);
	}
	button51.onclick = function () {
		window.open("https://suto.bex.jp/html5/help/jpn/3dviewer/index.html");
	}

	button52.onclick = function () {
		window.open("https://suto.bex.jp/html5/help/eng/3dviewer/index.html");
	}

	button53.onclick = function () {
		alert(verno);
	}
	button54.onclick = function () {
		bClear = true;
		try {
			localStorage.clear();
		} catch (err) {
			var expire = new Date();
			expire.setTime(expire.getTime() + 1000 * 3600 * 24);
			var nCok = "" + stmov + "&" + st180 + "&" + st360;
			document.cookie = "" + nCok + "; expires=" + expire.toUTCString();
		}
		location.reload();
	}
	button31.onclick = function () {
		video.pause();
		video.currentTime = 0.0;
	}
	// Volume Slider Logic
	var volSlider = document.getElementById('vol-slider');
	if (volSlider) {
		volSlider.value = vlevel;
		volSlider.addEventListener('input', function () {
			vlevel = parseFloat(this.value);
			if (video) {
				video.volume = vlevel;
				video.muted = false;
				vmuted = false;
			}
			showstatus();
		});

		// Add Mouse Wheel Support
		volSlider.addEventListener('wheel', function (e) {
			e.preventDefault();
			e.stopPropagation();

			// Determine direction (negative deltaY is scrolling up/increasing)
			const delta = e.deltaY < 0 ? 0.05 : -0.05;
			let newVol = parseFloat(this.value) + delta;

			// Clamp between 0 and 1
			if (newVol > 1) newVol = 1;
			if (newVol < 0) newVol = 0;

			// Update slider and video
			this.value = newVol;
			vlevel = newVol;

			if (video) {
				video.volume = vlevel;
				video.muted = false; // Unmute if volume changes
				vmuted = false;
			}
			showstatus();
		});
	}
	button34.onclick = function () {
		video.muted = video.muted ? false : true;
		vmuted = video.muted;
	}

	// プログレスバー長さ更新
	const progressWrap = document.getElementById("progress-wrap");

	// Prevent auto-hide when hovering controls
	const controllerBox = document.getElementById("controller-box");
	if (controllerBox) {
		controllerBox.addEventListener('mouseenter', function () { isHoveringControls = true; });
		controllerBox.addEventListener('mouseleave', function () { isHoveringControls = false; });
	}
	const progressOut = document.getElementById("progress-out");
	const progressIn = document.getElementById("progress-in");
	const progressThumb = document.getElementById("progress-thumb");

	var geometry;
	var material;
	var scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(zoom, window.innerWidth / window.innerHeight, 1, 1000);
	//   camera = new THREE.OrthographicCamera(-960, +960, 540, -540, 1, 1000);
	camera.position.set(curx, cury, camposz);
	scene.add(camera);
	//   var light = new THREE.AmbientLight(0xffffff);
	//   scene.add(light);
	this.texture = new Array(this.file.length * 2);
	var canvas = document.createElement('canvas');
	canvas.height = 1024;
	canvas.width = 1024;

	texturel = new THREE.Texture(canvas);
	texturer = new THREE.Texture(canvas);
	loadfiletotex(self.imageNo);

	function zoomset(nZ) {
		zoom = nZ;
		if ((stType == 1 || stType == 2 || stType == 9) && zoom > 60) {
			zoomfac = 100 - (zoom - 60);
			camera.fov = 60;
		}
		else {
			zoomfac = 100;
			camera.fov = zoom;
		}
		camera.updateProjectionMatrix();
	}

	function fitimage() {
		zoom = 60;
		zoomfac = 100;
		camera.fov = zoom;
		camera.updateProjectionMatrix();
		var fovRad = (zoom / 2) * (Math.PI / 180);// 視野角をラジアンに変換
		var fitrto = imgrto;
		if (stType == 1 || stType == 9) {
			if ((window.innerHeight * 2) / window.innerWidth > imgrto) fitrto = (window.innerHeight * 2) / window.innerWidth;
		}
		else {
			if (window.innerHeight / window.innerWidth > imgrto) fitrto = window.innerHeight / window.innerWidth;
		}
		camposz = ((100 * fitrto) / 2) / Math.tan(fovRad);// ウィンドウぴったりのカメラ距離
		curx = 0;
		cury = 0;
		camera.position.set(curx, cury, camposz);
	}

	function showstatus() {
		document.getElementById("progtime").innerHTML = "Time: " + video.currentTime.toFixed(1) + "/" + video.duration.toFixed(1);
		if (video.muted) document.getElementById("volumelevel").innerHTML = "Volume: muted";
		else document.getElementById("volumelevel").innerHTML = "Volume:" + (video.volume * 100).toFixed(0) + "%";
	}

	function settimer(nint) {
		ssint = nint;
		if (timeout_id !== null) {
			clearTimeout(timeout_id);
			timeout_id = null;
		}
		if (!isVideo && ssint > 0) timeout_id = setTimeout(next, ssint * 1000);
	}

	function loadfiletotex(ncnt) {
		if (!deffile) {
			loadfiletotex2(ncnt);
			return;
		}
		if (isStart) {
			cancelAnimationFrame(_animationID);
			texturel.dispose();
			texturel = null;
			texturer.dispose();
			texturer = null;
			if (video) {
				video.pause();
				video.currentTime = 0;
				video = null;
			}
		}
		if (Filenamedisplay) message = "(" + ((ncnt / 2) + 1) + "/" + (self.file.length / 2) + ") " + self.file[ncnt + 1];
		else message = "" + ((ncnt / 2) + 1) + "/" + (self.file.length / 2);
		if (self.file[ncnt] == 'm' || self.file[ncnt] == 'mh' || self.file[ncnt] == 'mv' || self.file[ncnt] == 'mvh') {
			if (self.file[ncnt] == 'mvh') wh = 3;
			else if (self.file[ncnt] == 'mv') wh = 2;
			else if (self.file[ncnt] == 'mh') wh = 1;
			else wh = 0;
			ChangeCanvas = true;
			video = document.createElement('video');

			video.addEventListener('timeupdate', function () {
				if (video != null) {
					progressIn.style.transform = "scaleX(" + video.currentTime / video.duration + ")";
					showstatus();
				}
			});

			if (!window.progressListenersAttachedOld) {
				window.progressListenersAttachedOld = true;
				progressOut.addEventListener('click', function (e) {
					if (video && video.duration) {
						const percent = (e.pageX - (progressOut.getBoundingClientRect().left + window.pageXOffset)) / progressOut.clientWidth;
						video.currentTime = video.duration * percent;
					}
				});

				progressOut.addEventListener('mousemove', function (e) {
					if (mousedown && video && video.duration) {
						const percent = (e.pageX - (progressOut.getBoundingClientRect().left + window.pageXOffset)) / progressOut.clientWidth;
						video.currentTime = video.duration * percent;
						progressIn.style.transform = "scaleX(" + video.currentTime / video.duration + ")";
						showstatus();
					}
				});
			}

			video.addEventListener('ended', function () {
				videoend();
			}, true);
			video.src = self.file[ncnt + 1];
			video.setAttribute('playsinline', '');
			//	window.makeVideoPlayableInline(video);
			video.play();
			isVideo = true;
			video.volume = vlevel;
			video.muted = vmuted;
			document.getElementById("progtime").innerHTML = "Push Play button!";
			timeall = 0;
			timecnt = 0;
			if (showbtn) showmenu();
			isStart = true;
			render();
		} else if (self.file[ncnt] == 'p' || self.file[ncnt] == 'ph' || self.file[ncnt] == 'pv' || self.file[ncnt] == 'pvh') {
			var img;
			if (self.file[ncnt] == 'pvh') wh = 3;
			else if (self.file[ncnt] == 'pv') wh = 2;
			else if (self.file[ncnt] == 'ph') wh = 1;
			else wh = 0;
			img = document.createElement('img');
			var imgload = false;
			img.onload = (function (e) {
				if (canvas == null) canvas = document.createElement(
					'canvas');
				canvas.height = img.height;
				canvas.width = img.width;
				if (ctx == null) ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				if (canvasl == null) canvasl = document.createElement(
					'canvas');
				imgh = img.height;
				imgw = img.width;
				if (wh < 2) {
					canvasl.height = imgh;
					canvasl.width = imgw / 2;
				}
				else {
					canvasl.height = imgh / 2;
					canvasl.width = imgw;
				}

				if (ctxl == null) ctxl = canvasl.getContext('2d');
				//	ctxl.imageSmoothingEnabled = true;
				ctxl.drawImage(canvas, 0, 0, canvasl.width, canvasl.height, 0, 0, canvasl.width, canvasl.height);
				texturel = new THREE.Texture(canvasl);
				texturel.flipY = true;
				texturel.needsUpdate = true;
				if (canvasr == null) canvasr = document.createElement(
					'canvas');
				if (wh < 2) {
					canvasr.height = imgh;
					canvasr.width = imgw / 2;
				}
				else {
					canvasr.height = imgh / 2;
					canvasr.width = imgw;
				}
				if (ctxr == null) ctxr = canvasr.getContext('2d');
				//	ctxr.imageSmoothingEnabled = true;
				if (wh < 2) ctxr.drawImage(canvas, imgw / 2, 0, imgw / 2, imgh, 0, 0, canvasr.width, canvasr.height);
				else ctxr.drawImage(canvas, 0, imgh / 2, imgw, imgh / 2, 0, 0, canvasr.width, canvasr.height);
				texturer = new THREE.Texture(canvasr);
				texturer.flipY = true;
				texturer.wrapS = THREE.RepeatWrapping;
				if (stType == 9) texturer.repeat.x = - 1;
				else texturer.repeat.x = 1;
				texturer.needsUpdate = true;
				isVideo = false;
				isStart = true;
				if (showbtn) showmenu();
				if (wh == 0) imgrto = imgh * 2 / imgw;
				else if (wh == 2) imgrto = imgh / (imgw * 2);
				else imgrto = imgh / imgw;
				plane.scale.set(1, imgrto, 1);
				zoomtmp = zoom;
				fitimage();
				resetalign();
				zoomset(zoomtmp);
				settimer(ssint);
				render();
			});
			img.src = self.file[ncnt + 1];
		}
	}

	function loadfiletotex2(ncnt) {
		cancelAnimationFrame(_animationID);
		texturel.dispose();
		texturel = null;
		texturer.dispose();
		texturer = null;
		if (video) {
			video.pause();
			video.currentTime = 0;
			video = null;
		}
		var file = files[ncnt];
		if (Filenamedisplay) message = "(" + (ncnt + 1) + "/" + (files.length) + ") " + file.name;
		else message = "" + (ncnt + 1) + "/" + (files.length);
		var createObjectURL = window.URL && window.URL.createObjectURL ?
			function (file) {
				return window.URL.createObjectURL(file);
			} : window.webkitURL && window.webkitURL.createObjectURL ?
				function (file) {
					return window.webkitURL.createObjectURL(file);
				} : undefined;
		if (file.type.substring(0, 5) === 'video') {
			ChangeCanvas = true;
			video = document.createElement('video');

			function formatTime(seconds) {
				if (isNaN(seconds)) return "0:00";
				var minutes = Math.floor(seconds / 60);
				var secs = Math.floor(seconds % 60);
				if (secs < 10) secs = "0" + secs;
				return minutes + ":" + secs;
			}

			video.addEventListener('timeupdate', function () {
				if (video != null) {
					var pct = (video.currentTime / video.duration * 100);
					progressIn.style.width = pct + "%";
					if (progressThumb) progressThumb.style.left = pct + "%";

					// Update Time Display
					document.getElementById("curr-time-text").innerText = formatTime(video.currentTime);
					document.getElementById("total-time-text").innerText = formatTime(video.duration);

					showstatus();
				}
			});

			if (!window.progressListenersAttached) {
				window.progressListenersAttached = true;
				const stopProp = function (e) { e.stopPropagation(); mousedown = true; };
				progressWrap.addEventListener('mousedown', stopProp);
				progressWrap.addEventListener('touchstart', stopProp);

				progressWrap.addEventListener('click', function (e) {
					e.stopPropagation();
					if (video && video.duration) {
						const percent = (e.pageX - (progressWrap.getBoundingClientRect().left + window.pageXOffset)) / progressWrap.clientWidth;
						video.currentTime = video.duration * percent;
					}
				});

				progressWrap.addEventListener('mousemove', function (e) {
					if (mousedown && video && video.duration) {
						e.stopPropagation();
						const percent = (e.pageX - (progressWrap.getBoundingClientRect().left + window.pageXOffset)) / progressWrap.clientWidth;
						video.currentTime = video.duration * percent;
						var pct = (video.currentTime / video.duration * 100);
						progressIn.style.width = pct + "%";
						if (progressThumb) progressThumb.style.left = pct + "%";
						showstatus();
					}
				});
			}

			video.addEventListener('ended', function () {
				videoend();
			}, true);
			video.src = createObjectURL(file);
			video.setAttribute('playsinline', '');
			//	window.makeVideoPlayableInline(video);
			video.play();
			isVideo = true;
			video.volume = vlevel;
			video.muted = vmuted;
			document.getElementById("progtime").innerHTML = "Push Play button!";
			if (showbtn) showmenu();
			render();
		} else {
			var img;
			img = document.createElement('img');
			var imgload = false;
			img.onload = (function (e) {
				if (canvas == null) canvas = document.createElement(
					'canvas');
				canvas.height = img.height;
				canvas.width = img.width;
				if (ctx == null) ctx = canvas.getContext('2d');
				ctx.drawImage(img, 0, 0);
				if (canvasl == null) canvasl = document.createElement(
					'canvas');
				imgh = img.height;
				imgw = img.width;
				if (wh < 2) {
					canvasl.height = imgh;
					canvasl.width = imgw / 2;
				}
				else {
					canvasl.height = imgh / 2;
					canvasl.width = imgw;
				}

				if (ctxl == null) ctxl = canvasl.getContext('2d');
				ctxl.drawImage(canvas, 0, 0, canvasl.width, canvasl.height, 0, 0, canvasl.width, canvasl.height);
				texturel = new THREE.Texture(canvasl);
				texturel.flipY = true;
				texturel.needsUpdate = true;
				if (canvasr == null) canvasr = document.createElement(
					'canvas');
				if (wh < 2) {
					canvasr.height = imgh;
					canvasr.width = imgw / 2;
				}
				else {
					canvasr.height = imgh / 2;
					canvasr.width = imgw;
				}
				if (ctxr == null) ctxr = canvasr.getContext('2d');
				if (wh < 2) ctxr.drawImage(canvas, imgw / 2, 0, imgw / 2, imgh, 0, 0, canvasr.width, canvasr.height);
				else ctxr.drawImage(canvas, 0, imgh / 2, imgw, imgh / 2, 0, 0, canvasr.width, canvasr.height);
				texturer = new THREE.Texture(canvasr);
				texturer.flipY = true;
				texturer.wrapS = THREE.RepeatWrapping;
				if (stType == 9) texturer.repeat.x = - 1;
				else texturer.repeat.x = 1;
				texturer.needsUpdate = true;
				isVideo = false;
				isStart = true;
				if (showbtn) showmenu();
				if (wh == 0) imgrto = imgh * 2 / imgw;
				else if (wh == 2) imgrto = imgh / (imgw * 2);
				else imgrto = imgh / imgw;
				plane.scale.set(1, imgrto, 1);
				zoomtmp = zoom;
				fitimage();
				resetalign();
				zoomset(zoomtmp);
				settimer(ssint);
				render();
			});
			img.src = createObjectURL(file);
		}
	}
	geometry = new THREE.PlaneGeometry(100, 100, 256, 256);
	material = new THREE.MeshBasicMaterial({
		side: THREE.DoubleSide,
		map: texturel
	});
	material.map.minFilter = THREE.LinearFilter;
	///////// MESH
	plane = new THREE.Mesh(geometry, material);
	scene.add(plane);

	function setstereomode(stn) {
		if (effect != null) {
			effect.dispose();
			effect = null;
		}
		stType = stn;
		var width = window.innerWidth;
		var height = window.innerHeight;
		if (stType == 3 || stType == 4 || stType == 5) effect = new THREE.AnaglyphEffect(renderer,
			stType - 3);
		else if (stType < 3 || stType > 7) effect = new THREE.StereoEffect(renderer,
			stType);
		else if (stType == 7) effect = new THREE.ParallaxBarrierEffect2(renderer);
		else effect = new THREE.ParallaxBarrierEffect(renderer);
		effect.setSize(width, height);
		if (stType == 1 || stType == 9) camera.aspect = window.innerWidth / (window.innerHeight * 2);
		else camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		zoomtmp = zoom;
		fitimage();
		zoomset(zoomtmp);
		align();
	};
	setstereomode(stType);

	function makeframe() {
		if (video == null) return;
		if (video.paused) return;
		vw = video.videoWidth;
		vh = video.videoHeight;
		if (vw / 2 < 600) vc = 512;
		else if (vw / 2 < 1200) vc = 1024;
		else vc = 2048;

		// One-time icon setup (ensure it runs once)
		if (!video.hasAttachedIcons) {
			video.hasAttachedIcons = true;
			video.addEventListener('play', function () {
				var icon = document.getElementById('icon-play');
				if (icon) { icon.classList.remove('fa-play'); icon.classList.add('fa-pause'); }
			});
			video.addEventListener('pause', function () {
				var icon = document.getElementById('icon-play');
				if (icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-play'); }
			});
			video.addEventListener('ended', function () {
				var icon = document.getElementById('icon-play');
				if (icon) { icon.classList.remove('fa-pause'); icon.classList.add('fa-play'); }
			});
		}

		if (vw > 0 && vh > 0 && ChangeCanvas) {
			ChangeCanvas = false;
			if (canvas == null) canvas = document.createElement(
				'canvas');
			canvas.height = vh;
			canvas.width = vw;
			if (ctx == null) ctx = canvas.getContext('2d');
			if (canvasl == null) canvasl = document.createElement(
				'canvas');
			canvasl.height = vc;
			canvasl.width = vc;
			if (ctxl == null) ctxl = canvasl.getContext('2d');
			texturel = new THREE.Texture(canvasl);
			texturel.flipY = true;
			if (canvasr == null) canvasr = document.createElement(
				'canvas');
			canvasr.height = vc;
			canvasr.width = vc;
			if (ctxr == null) ctxr = canvasr.getContext('2d');
			texturer = new THREE.Texture(canvasr);
			texturer.flipY = true;
			texturer.wrapS = THREE.RepeatWrapping;
			if (stType == 9) texturer.repeat.x = - 1;
			else texturer.repeat.x = 1;
			imgw = vw;
			imgh = vh;
			if (wh == 0) imgrto = imgh * 2 / imgw;
			else if (wh == 2) imgrto = imgh / (imgw * 2);
			else imgrto = imgh / imgw;
			plane.scale.set(1, imgrto, 1);
			zoomtmp = zoom;
			fitimage();
			resetalign();
			zoomset(zoomtmp);
		}
		if (video != null && ctx != null) {
			ctx.drawImage(video, 0, 0);
			align();
		}
	}

	function makeframeios() {
		if (video == null) return;
		if (video.paused) return;
		vw = video.videoWidth;
		vh = video.videoHeight;
		if (vw > 0 && vh > 0 && ChangeCanvas) {
			ChangeCanvas = false;
			if (canvas == null) canvas = document.createElement(
				'canvas');
			canvas.height = vh;
			canvas.width = vw;
			if (ctx == null) ctx = canvas.getContext('2d');
			if (canvasl == null) canvasl = document.createElement(
				'canvas');
			if (wh < 2) {
				canvasl.height = vh;
				canvasl.width = vw / 2;
			}
			else {
				canvasl.height = vh / 2;
				canvasl.width = vw;
			}
			if (ctxl == null) ctxl = canvasl.getContext('2d');
			texturel = new THREE.Texture(canvasl);
			texturel.flipY = true;
			if (canvasr == null) canvasr = document.createElement(
				'canvas');
			if (wh < 2) {
				canvasr.height = vh;
				canvasr.width = vw / 2;
			}
			else {
				canvasr.height = vh / 2;
				canvasr.width = vw;
			}
			if (ctxr == null) ctxr = canvasr.getContext('2d');
			texturer = new THREE.Texture(canvasr);
			texturer.flipY = true;
			texturer.wrapS = THREE.RepeatWrapping;
			if (stType == 9) texturer.repeat.x = - 1;
			else texturer.repeat.x = 1;
			imgw = vw;
			imgh = vh;
			if (wh == 0) imgrto = imgh * 2 / imgw;
			else if (wh == 2) imgrto = imgh / (imgw * 2);
			else imgrto = imgh / imgw;
			plane.scale.set(1, imgrto, 1);
			zoomtmp = zoom;
			fitimage();
			resetalign();
			zoomset(zoomtmp);
		}
		if (video != null) {
			ctx.drawImage(video, 0, 0);
			align();
		}
	}

	function resetalign() {
		if (bNoresetalign) return;
		dltx = 0;
		dlty = 0;
		rota = 0;
		crdltx = 0;
		crdlty = 0;
	}

	function align2() {
		var sx, sy, dxl, dyl, dxr, dyr, dltxs, dltys;
		crdltx = dltx;
		crdlty = dlty;
		if (wh < 2) {
			sy = imgh;
			sx = imgw / 2;
		}
		else {
			sy = imgh / 2;
			sx = imgw;
		}
		dltxs = dltx;
		dltys = dlty;
		if (!swap) {
			dltxs = -dltx;
			dltys = -dlty;
		}
		if (dltxs > 0) { dxl = sx * dltxs / 100; dxr = 0; }
		else { dxr = -sx * dltxs / 100; dxl = 0; }
		if (dltys > 0) { dyl = sy * dltys / 100; dyr = 0; }
		else { dyr = -sy * dltys / 100; dyl = 0; }
		ctxl.drawImage(canvas, dxl, dyl, sx - (dxl + dxr), sy - (dyl + dyr), 0, 0, canvasl.width, canvasl.height);
		if (texturel != null) texturel.needsUpdate = true;
		if (wh < 2) ctxr.drawImage(canvas, sx + dxr, dyr, sx - (dxl + dxr), sy - (dyl + dyr), 0, 0, canvasr.width, canvasr.height);
		else ctxr.drawImage(canvas, dxr, sy + dyr, sx - (dxl + dxr), sy - (dyl + dyr), 0, 0, canvasr.width, canvasr.height);
		if (texturer != null) texturer.needsUpdate = true;
		if (wh == 1) imgrto = (sy - (dyl + dyr)) / ((sx - (dxl + dxr)) * 2);
		else if (wh == 3) imgrto = ((sy - (dyl + dyr)) * 2) / (sx - (dxl + dxr));
		else imgrto = (sy - (dyl + dyr)) / (sx - (dxl + dxr));
		plane.scale.set(1, imgrto, 1);
	}


	function align() {
		var sx, sy, dxl, dyl, dxr, dyr, dltxs, dltys;
		if (canvas == null || canvasl == null || canvasr == null || texturel == null || texturer == null) return;
		crdltx = dltx;
		crdlty = dlty;
		if (wh < 2) {
			sy = imgh;
			sx = imgw / 2;
		}
		else {
			sy = imgh / 2;
			sx = imgw;
		}
		dltxs = dltx;
		dltys = dlty;
		if (!swap) {
			dltxs = -dltx;
			dltys = -dlty;
		}
		if (dltxs > 0) { dxl = sx * dltxs / 100; dxr = 0; }
		else { dxr = -sx * dltxs / 100; dxl = 0; }
		if (dltys > 0) { dyl = sy * dltys / 100; dyr = 0; }
		else { dyr = -sy * dltys / 100; dyl = 0; }
		ctxl.drawImage(canvas, dxl, dyl, sx - (dxl + dxr), sy - (dyl + dyr), 0, 0, canvasl.width, canvasl.height);
		if (texturel != null) texturel.needsUpdate = true;
		if (wh < 2) ctxr.drawImage(canvas, sx + dxr, dyr, sx - (dxl + dxr), sy - (dyl + dyr), 0, 0, canvasr.width, canvasr.height);
		else ctxr.drawImage(canvas, dxr, sy + dyr, sx - (dxl + dxr), sy - (dyl + dyr), 0, 0, canvasr.width, canvasr.height);

		if (texturer != null) texturer.needsUpdate = true;

		if (stType == 9) texturer.repeat.x = - 1;
		else texturer.repeat.x = 1;
		if (wh == 1) imgrto = (sy - (dyl + dyr)) / ((sx - (dxl + dxr)) * 2);
		else if (wh == 3) imgrto = ((sy - (dyl + dyr)) * 2) / (sx - (dxl + dxr));
		else imgrto = (sy - (dyl + dyr)) / (sx - (dxl + dxr));
		plane.scale.set(1, imgrto, 1);
	}

	function render() {
		_animationID = requestAnimationFrame(render);
		if (effect != null && isStart) {
			var time1;
			var time2;
			var startT = new Date();
			time1 = startT.getTime();
			if (is1st) {
				showmenu();
				setTimeout(menutimer, 100);
				is1st = false;
			}
			if (isVideo && isStart) {
				if (isiOS) makeframeios();
				else makeframe();
			}
			if (dltx != crdltx || dlty != crdlty) align();
			if (texturel != null && texturer != null) {
				texturel.anisotropy = renderer.getMaxAnisotropy();
				texturer.anisotropy = renderer.getMaxAnisotropy();
			}
			if (swap) {
				material.map = texturel;
				plane.rotation.set(0, 0, rota * Math.PI / 180);
			}
			else {
				material.map = texturer;
				plane.rotation.set(0, 0, -rota * Math.PI / 180);
			}
			effect.render0(scene, camera);
			if (swap) {
				material.map = texturer;
				plane.rotation.set(0, 0, -rota * Math.PI / 180);
			}
			else {
				material.map = texturel;
				plane.rotation.set(0, 0, rota * Math.PI / 180);
			}
			effect.render(scene, camera);
			var endT = new Date();
			time2 = endT.getTime();
			var dtime = time2 - time1;
			timecnt++;
			timeall = timeall + dtime;
			dtime = timeall / timecnt;
			dtime = (parseInt(dtime * 100)) / 100;
			var stname = " ";
			var swpname = " ";
			if (stType == 0) stname = "2D ";
			else if (stType == 1) stname = "SBS ";
			else if (stType == 2) stname = "LR/RL ";
			else if (stType == 3) stname = "Dubois ";
			else if (stType == 4) stname = "Color ";
			else if (stType == 5) stname = "Gray ";
			else if (stType == 6) stname = "H_Int ";
			else if (stType == 7) stname = "3DLCD ";
			else if (stType == 8) stname = "HSBS ";
			else if (stType == 9) stname = "Mirror ";
			if (swap) swpname = "L/R ";
			else swpname = "R/L ";
			button0.innerHTML = "" + stname;
			button3.innerHTML = " " + swpname;
			if (dltx != 0 || dlty != 0 || rota != 0) document.getElementById("filename").innerHTML = "X=" + dltx.toFixed(1) + ",Y=" + dlty.toFixed(1) + ",R=" + rota.toFixed(1);
			else document.getElementById("filename").innerHTML = message;
			if (isVideo && video != null) {
				var iconPlay = document.getElementById('icon-play');
				if (iconPlay) {
					if (video.paused) {
						iconPlay.className = 'fa-solid fa-play';
					} else {
						iconPlay.className = 'fa-solid fa-pause';
					}
				}
				if (ssint == 0) button40.innerHTML = "Loop";
				else button40.innerHTML = "Cont";
			}
			else {
				// button4.innerHTML = " Still";
				if (ssint == 0) button40.innerHTML = "Off";
				else button40.innerHTML = "" + ssint + " Sec.";
			}
		}
	};
	render();
}

THREE.StereoEffect = function (renderer, stType) {
	this.setSize = function (width, height) {
		renderer.setSize(width, height);
	};
	this.render0 = function (scene, camera, eyemode) {
		scene.updateMatrixWorld();
		if (camera.parent === null) camera.updateMatrixWorld();
		var size = renderer.getSize();
		var sw = size.width * 98 / 200;
		var sh = size.height * 98 / 200;
		var sw0 = size.width * 15 / 2000;
		var sh0 = size.height * 15 / 2000;
		renderer.setScissorTest(true);
		renderer.clear();
		var sw;
		if (stType == 0) {
			renderer.setScissor(0, 0, size.width, size.height);
			renderer.setViewport(0, 0, size.width, size.height);
		}
		else if (stType == 2) {
			renderer.setScissor(size.width - sw - sw0, sh0, sw, sh);
			renderer.setViewport(size.width - sw - sw0, sh0 + size.height / 2 - size.height * zoomfac / 200, sw * zoomfac / 100, sh * zoomfac / 100);
			renderer.render(scene, camera);
			renderer.setScissor(sw0, size.height - sh - sh0, sw, sh);
			renderer.setViewport(sw0 + size.width / 2 - size.width * zoomfac / 200, size.height - sh - sh0, sw * zoomfac / 100, sh * zoomfac / 100);
		}
		else if (stType == 9) {
			renderer.setScissor(0, 0, size.width / 2, size.height);
			renderer.setViewport(size.width / 2 - size.width * zoomfac / 200, size.height - size.height * zoomfac / 100, (size.width * zoomfac / 200) * 98 / 100, (size.height * zoomfac / 100) * 98 / 100);
		}
		else {
			renderer.setScissor(0, 0, size.width / 2, size.height);
			renderer.setViewport(size.width / 2 - size.width * zoomfac / 200, size.height - size.height * zoomfac / 100, size.width * zoomfac / 200, size.height * zoomfac / 100);
		}
		renderer.render(scene, camera);
	};
	this.render = function (scene, camera, eyemode) {
		if (stType == 0) return;
		var size = renderer.getSize();
		var sw = size.width * 98 / 200;
		var sh = size.height * 98 / 200;
		var sw0 = size.width * 15 / 2000;
		var sh0 = size.height * 15 / 2000;
		if (stType == 2) {
			renderer.setScissor(sw0, sh0, sw, sh);
			renderer.setViewport(sw0 + size.width / 2 - size.width * zoomfac / 200, sh0 + size.height / 2 - size.height * zoomfac / 200, sw * zoomfac / 100, sh * zoomfac / 100);
			renderer.render(scene, camera);
			renderer.setScissor(size.width - sw - sw0, size.height - sh - sh0, sw, sh);
			renderer.setViewport(size.width - sw - sw0, size.height - sh - sh0, sw * zoomfac / 100, sh * zoomfac / 100);
		}
		else if (stType == 9) {
			renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
			renderer.setViewport(size.width / 2 + (size.width * zoomfac / 200) * 2 / 100, size.height - size.height * zoomfac / 100, (size.width * zoomfac / 200) * 98 / 100, (size.height * zoomfac / 100) * 98 / 100);
		}
		else {
			renderer.setScissor(size.width / 2, 0, size.width / 2, size.height);
			renderer.setViewport(size.width / 2, size.height - size.height * zoomfac / 100, size.width * zoomfac / 200, size.height * zoomfac / 100);
		}
		renderer.render(scene, camera);
		renderer.setScissorTest(false);
	};
	this.dispose = function () { };
};
THREE.ParallaxBarrierEffect = function (renderer, width, height) {
	var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	var _scene = new THREE.Scene();
	var _params = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat
	};
	var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
	var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);
	var _material = new THREE.ShaderMaterial({
		uniforms: {
			"mapLeft": {
				type: "t",
				value: _renderTargetL
			},
			"mapRight": {
				type: "t",
				value: _renderTargetR
			}
		},
		vertexShader: ["varying vec2 vUv;", "void main() {",
			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),
		fragmentShader: ["uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;", "varying vec2 vUv;",
			"void main() {", "	vec2 uv = vUv;",
			"	if ( ( mod( gl_FragCoord.y, 2.0 ) ) > 1.00 ) {",
			"		gl_FragColor = texture2D( mapLeft, uv );",
			"	} else {",
			"		gl_FragColor = texture2D( mapRight, uv );", "	}",
			"}"
		].join("\n")
	});
	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2),
		_material);
	_scene.add(mesh);
	this.setSize = function (width, height) {
		renderer.setSize(width, height);
		var pixelRatio = renderer.getPixelRatio();
		_renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
		_renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
	};
	this.render0 = function (scene, camera, bSwap) {
		scene.updateMatrixWorld();
		if (camera.parent === null) camera.updateMatrixWorld();
		renderer.render(scene, camera, _renderTargetL, true);
	};
	this.render = function (scene, camera, bSwap) {
		renderer.render(scene, camera, _renderTargetR, true);
		renderer.render(_scene, _camera);
	};
	this.dispose = function () {
		if (_renderTargetL) _renderTargetL.dispose();
		if (_renderTargetR) _renderTargetR.dispose();
		_scene.remove(mesh);
		_material.dispose();
	};
};
THREE.ParallaxBarrierEffect2 = function (renderer, width, height) {
	var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	var _scene = new THREE.Scene();
	var _params = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat
	};
	var _renderTargetL = new THREE.WebGLRenderTarget(width, height, _params);
	var _renderTargetR = new THREE.WebGLRenderTarget(width, height, _params);
	var _material = new THREE.ShaderMaterial({
		uniforms: {
			"mapLeft": {
				type: "t",
				value: _renderTargetL
			},
			"mapRight": {
				type: "t",
				value: _renderTargetR
			}
		},
		vertexShader: ["varying vec2 vUv;", "void main() {",
			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),
		fragmentShader: ["uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;", "varying vec2 vUv;",
			"void main() {", "	vec2 uv = vUv;",
			"	if ( ( mod( gl_FragCoord.x, 2.0 ) ) > 0.80 ) {",
			"		gl_FragColor = texture2D( mapRight, uv );",
			"	} else {",
			"		gl_FragColor = texture2D( mapLeft, uv );", "	}",
			"}"
		].join("\n")
	});
	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2),
		_material);
	_scene.add(mesh);
	this.setSize = function (width, height) {
		renderer.setSize(width, height);
		var pixelRatio = renderer.getPixelRatio();
		_renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
		_renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
	};
	this.render0 = function (scene, camera, bSwap) {
		scene.updateMatrixWorld();
		if (camera.parent === null) camera.updateMatrixWorld();
		renderer.render(scene, camera, _renderTargetL, true);
	};
	this.render = function (scene, camera, bSwap) {
		renderer.render(scene, camera, _renderTargetR, true);
		renderer.render(_scene, _camera);
	};
	this.dispose = function () {
		if (_renderTargetL) _renderTargetL.dispose();
		if (_renderTargetR) _renderTargetR.dispose();
		_scene.remove(mesh);
		_material.dispose();
	};
};
THREE.AnaglyphEffect = function (renderer, stType) {
	// Matrices generated with angler.js https://github.com/tschw/angler.js/
	// (in column-major element order, as accepted by WebGL)
	if (stType == 2) {
		this.colorMatrixLeft = new THREE.Matrix3().fromArray([
			0.299, 0, 0, // r out
			0.587, 0, 0, // g out
			0.114, 0, 0 // b out
		]);
		//		red						green 						blue  						in
		this.colorMatrixRight = new THREE.Matrix3().fromArray([
			0, 0.299, 0.299, // r out
			0, 0.587, 0.587, // g out
			0, 0.114, 0.114 // b out
		]);
	} else if (stType == 1) {
		this.colorMatrixLeft = new THREE.Matrix3().fromArray([
			1, 0, 0, // r out
			0, 0, 0, // g out
			0, 0, 0 // b out
		]);
		//		red						green 						blue  						in
		this.colorMatrixRight = new THREE.Matrix3().fromArray([
			0, 0, 0, // r out
			0, 1, 0, // g out
			0, 0, 1 // b out
		]);
	} else {
		this.colorMatrixLeft = new THREE.Matrix3().fromArray([
			0.456100, -0.0400822, -0.0152161, // r out
			0.500484, -0.0378246, -0.0205971, // g out
			0.176381, -0.0157589, -0.00546856 // b out
		]);
		//		red						green 						blue  						in
		this.colorMatrixRight = new THREE.Matrix3().fromArray([-0.0434706,
			0.378476, -0.0721527, // r out
		-0.0879388, 0.73364, -0.112961, // g out
		-0.00155529, -0.0184503, 1.2264 // b out
		]);
	}
	var _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
	var _scene = new THREE.Scene();
	var _params = {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBAFormat
	};
	var _renderTargetL = new THREE.WebGLRenderTarget(512, 512, _params);
	var _renderTargetR = new THREE.WebGLRenderTarget(512, 512, _params);
	var _material = new THREE.ShaderMaterial({
		uniforms: {
			"mapLeft": {
				type: "t",
				value: _renderTargetL
			},
			"mapRight": {
				type: "t",
				value: _renderTargetR
			},
			"colorMatrixLeft": {
				type: "m3",
				value: this.colorMatrixLeft
			},
			"colorMatrixRight": {
				type: "m3",
				value: this.colorMatrixRight
			}
		},
		vertexShader: ["varying vec2 vUv;", "void main() {",
			"	vUv = vec2( uv.x, uv.y );",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),
		fragmentShader: ["uniform sampler2D mapLeft;",
			"uniform sampler2D mapRight;", "varying vec2 vUv;",
			"uniform mat3 colorMatrixLeft;",
			"uniform mat3 colorMatrixRight;",
			// These functions implement sRGB linearization and gamma correction
			"float lin( float c ) {",
			"	return c <= 0.04045 ? c * 0.0773993808 :",
			"			pow( c * 0.9478672986 + 0.0521327014, 2.4 );",
			"}", "vec4 lin( vec4 c ) {",
			"	return vec4(  c.r ,  c.g ,  c.b , c.a );", "}",
			"float dev( float c ) {",
			"	return c <= 0.0031308 ? c * 12.92",
			"			: pow( c, 0.41666 ) * 1.055 - 0.055;", "}",
			"void main() {", "	vec2 uv = vUv;",
			"	vec4 colorL = lin( texture2D( mapLeft, uv ) );",
			"	vec4 colorR = lin( texture2D( mapRight, uv ) );",
			"	vec3 color = clamp(",
			"			colorMatrixLeft * colorL.rgb +",
			"			colorMatrixRight * colorR.rgb, 0., 1. );",
			"	gl_FragColor = vec4(",
			"			 color.r ,  color.g ,  color.b ,",
			"			max( colorL.a, colorR.a ) );", "}"
		].join("\n")
	});
	var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2),
		_material);
	_scene.add(mesh);
	this.setSize = function (width, height) {
		renderer.setSize(width, height);
		var pixelRatio = renderer.getPixelRatio();
		_renderTargetL.setSize(width * pixelRatio, height * pixelRatio);
		_renderTargetR.setSize(width * pixelRatio, height * pixelRatio);
	};
	this.render0 = function (scene, camera, bSwap) {
		scene.updateMatrixWorld();
		if (camera.parent === null) camera.updateMatrixWorld();
		renderer.render(scene, camera, _renderTargetL, true);
	};
	this.render = function (scene, camera, bSwap) {
		renderer.render(scene, camera, _renderTargetR, true);
		renderer.render(_scene, _camera);
	};
	this.dispose = function () {
		if (_renderTargetL) _renderTargetL.dispose();
		if (_renderTargetR) _renderTargetR.dispose();
		_scene.remove(mesh);
		_material.dispose();
	};
};

// Ensure Settings Menu is positioned relative to the control bar
window.addEventListener('load', function () {
	var menu = document.getElementById('settings-menu');
	var box = document.getElementById('controller-box');
	if (menu && box) {
		box.appendChild(menu);
	}
});

// Close settings menu when clicking outside
document.addEventListener('click', function (e) {
	var menu = document.getElementById('settings-menu');
	var btn = document.getElementById('btn-settings');

	// If menu is open (we assume 'active' class or display block checks, 
	// but toggling usually sets display directly. Let's check display style)
	if (menu && menu.style.display !== 'none' && menu.style.display !== '') {
		// If click is NOT inside menu AND NOT inside the button
		if (!menu.contains(e.target) && (!btn || !btn.contains(e.target))) {
			// Close it (toggleSettings logic usually handles this, or we force hide)
			// Fix: Clear inline opacity so CSS .active class works next time
			menu.classList.remove('active');
			menu.style.display = 'none';
			menu.style.removeProperty('opacity');
		}
	}
});



// Reload app when Close (X) button is clicked
window.addEventListener('load', function () {
	var btnClose = document.getElementById('button9');
	if (btnClose) {
		btnClose.addEventListener('click', function (e) {
			e.preventDefault();
			// Optional: Ask for confirmation? User said "recarregar o app", implying direct action.
			// But reload is destructive. Let's just do it as requested.
			window.location.reload();
		});
	}
});

// --- Mobile/Touch Dropdown Support ---
window.addEventListener('load', function () {
	var menuContainer = document.querySelector('#dropmenu');
	if (menuContainer) {
		// Toggle menu on click (essential for mobile)
		menuContainer.addEventListener('click', function (e) {
			// Find the button that was clicked
			var button = e.target.closest('button');
			if (!button) return; // Clicked on empty space in container

			var li = button.closest('li');
			// Check if this Li has a UL (dropdown)
			if (li && li.querySelector('ul')) {
				e.stopPropagation(); // Prevent document click from closing it immediately
				e.preventDefault();  // Prevent default button behavior (focus/submit)

				// Close other open dropdowns
				var allLis = menuContainer.querySelectorAll('li.dropdown-open');
				allLis.forEach(function (otherLi) {
					if (otherLi !== li) otherLi.classList.remove('dropdown-open');
				});

				// Toggle current one
				li.classList.toggle('dropdown-open');
			}
		});
	}

	// Close menus when clicking anywhere else on the document
	document.addEventListener('click', function (e) {
		// If click is NOT inside #dropmenu
		if (!e.target.closest('#dropmenu')) {
			var allOpen = document.querySelectorAll('#dropmenu li.dropdown-open');
			allOpen.forEach(function (li) {
				li.classList.remove('dropdown-open');
			});
		}
	});
});
