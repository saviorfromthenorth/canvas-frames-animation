/*author: saviorfromthenorth@yahoo.com.ph*/

var CanvasVideo = function() {
    if (argument.length > 0) {
        console.console.log(1);
    } else {
        console.error('Missing arguments');
    }
};

var klingen      = document.getElementById('klingen');
var leinwand     = document.getElementById('leinwand');
var zusammenhang = leinwand.getContext('2d');
var frame        = 2001;
var endFrame     = 2412;
var queue        = new Array();
var i            = 0;
var lastLoaded   = '';
var pause        = false;

klingen.addEventListener('play', draw);
klingen.addEventListener('canplay', function() {zusammenhang.drawImage(queue[0],0,0);});

function loadFrame() {
    if (frame == 2002) {
        klingen.style.display = 'block';
    }

    if (frame <= endFrame) {
        var img = new Image();
        queue.push(img);
        queue[queue.length-1].src = 'images/Ina'+frame+'.jpg';
        queue[queue.length-1].addEventListener('load', loadFrame);
        lastLoaded = 'images/Ina'+frame+'.jpg';
        frame++;
    }
}

function draw() {
    if (!klingen.paused && !klingen.ended) {
        if (queue[i].src == lastLoaded) {
            pause = true;
            loading();
        } else if (queue[i] === undefined) {
            klingen.pause();
        } else {
            zusammenhang.drawImage(queue[i],0,0);
            i++;
            window.requestAnimationFrame(draw);
        }
    } else if (klingen.ended) {
        i = 0;
    }
    console.log(i);
}

function loading() {
    if (pause && queue[i].src == lastLoaded && !klingen.paused) {
        klingen.pause();
        window.requestAnimationFrame(loading);
    } else {
        klingen.play();
        window.requestAnimationFrame(draw);
    }
}

loadFrame();
