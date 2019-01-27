/*
http://marcgg.com/blog/2016/11/01/javascript-audio/
http://marcgg.com/assets/js/posts/music.js

http://bl.ocks.org/andresin87/e59f757019dee7fcbf36/

https://stackoverflow.com/questions/879152/how-do-i-make-javascript-beep
https://jsbin.com/tupoyi/4/edit?html,js,output
*/

var context, o=null, g=null;
var $target;
function loadAudio() {
/*  PENDING MODIFICATION LIKE THIS:
    https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11/46534088#46534088
*/

	context=new AudioContext();
	o=null;
	g=null;
	document.addEventListener('DOMContentLoaded',function(){
		$(".js_play_sound").on("click",function(e){
			e.preventDefault();
			$target=$(e.target);
			eval($target.data("source"));
		});
		$(".js_stop_sound").on("click",function(e){
			e.preventDefault();
			o.stop();
		});
	}
	,false);
}

function example1(){
	o=context.createOscillator()
	o.type="sine"
	o.connect(context.destination)
	o.start()
}
function example2(){
	o=context.createOscillator()
	g=context.createGain()
	o.connect(g)
	g.connect(context.destination)
	o.start(0)
}
function example2Stop(decreaseTime){
	g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+decreaseTime)
}
function example3(type,x){
	o=context.createOscillator()
	g=context.createGain()
	o.connect(g)
	o.type=type
	g.connect(context.destination)
	o.start(0)
	g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+x)
}
function example4(frequency,type){ 
return; //audio non running on ipad iOS 5, and not audible on iOS 10
	if(o===null) loadAudio();
	o=context.createOscillator()
	g=context.createGain()
	o.type=type
	o.connect(g)
	o.frequency.value=frequency
	g.connect(context.destination)
	o.start(0)
	g.gain.exponentialRampToValueAtTime(0.00001,context.currentTime+1)
}