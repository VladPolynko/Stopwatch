var timer;
var minute = 0;
var second = 0;
var second_analog = 0;

var milliSecond = 0;
var circleNum = 0;

var second_Last = 0;
var milliSecond_Last = 0;
var minute_Last = 0;

var minuteHtml = document.getElementById('mm');
var secondHtml = document.getElementById('ss');
var milliSecondHtml = document.getElementById('ms');

var minuteHtml_small = document.getElementById('mm_last');
var secondHtml_small = document.getElementById('ss_last');
var milliSecondHtml_small = document.getElementById('ms_last');

var i = 0;
var CColor = "#383840";
var CBackground = "#FFF";
var CSeconds = "#D14";
var CSize = 300;
var CCenter = CSize / 2;
var CTSize = CCenter - 10;
var CMSize = CTSize * 0.7;
var CSSize = CTSize * 0.8;
var CHSize = CTSize * 0.6;
var example;

//-----------------------------

function last_start() {

    ++milliSecond_Last;

    milliSecondHtml_small.innerHTML = ((milliSecond_Last < 10) ? '0' : '') + milliSecond_Last;
    if (milliSecond_Last == 99) {
        ++second_Last;
        milliSecond_Last = 0;
        secondHtml_small.innerHTML = ((second_Last < 10) ? '0' : '') + second_Last;
    }
    if (second_Last >= 60) {
        console.log('60 second');
        ++minute_Last;
        second_Last = 0;
        minuteHtml_small.innerHTML = ((minute_Last < 10) ? '0' : '') + minute_Last;
    }
}

function start() {
    clearTimeout(timer);
    ++milliSecond;
    last_start();
    milliSecondHtml.innerHTML = ((milliSecond < 10) ? '0' : '') + milliSecond;
    if (milliSecond == 99) {
        ++second_analog;
        ++second;
        milliSecond = 0;
        secondHtml.innerHTML = ((second < 10) ? '0' : '') + second;
    }
    if (second == 60) {
        ++minute;
        second = 0;
        minuteHtml.innerHTML = ((minute < 10) ? '0' : '') + minute;
    }
    timer = setTimeout(start, 10);
}


function circle() {
    ++circleNum;
    var load_list = $("#load_list");

    second_Last = '00';
    milliSecond_Last = '00';
    minute_Last = '00';

    milliSecondHtml_small.innerHTML = milliSecond_Last;
    secondHtml_small.innerHTML = second_Last;
    minuteHtml_small.innerHTML = minute_Last;

    load_list.append(['<li><span class="circle">Круг ' + circleNum + '</span><span class="time">' + ((minute < 10) ? '0' : '') + minute + ':' + ((second < 10) ? '0' : '') + second + ',' + ((milliSecond < 10) ? '0' : '') + milliSecond + '</span></li>']);
    load_list.append(['<div class="clear_both"></div>']);

}


function pause() {
    clearTimeout(timer);
}

function reset() {
    clearTimeout(timer);

    milliSecond = '00';
    second = '00';
    minute = '00';

    second_Last = '00';
    milliSecond_Last = '00';
    minute_Last = '00';

    circleNum = 0;
    second_analog = 0;

    milliSecondHtml.innerHTML = milliSecond;
    secondHtml.innerHTML = second;
    minuteHtml.innerHTML = minute;

    milliSecondHtml_small.innerHTML = milliSecond_Last;
    secondHtml_small.innerHTML = second_Last;
    minuteHtml.innerHTML = minute_Last;

    milliSecond = 0;
    second = 0;
    minute = 0;

    second_Last = 0;
    milliSecond_Last = 0;
    minute_Last = 0;

    $('#load_list').html('');
}

//---------------------------------------------------------------------------

function ctxline(x1, y1, len, angle, color, wid) {
    var x2 = (CCenter + (len * Math.cos(angle)));
    var y2 = (CCenter + (len * Math.sin(angle)));
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = wid;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function ctxcircle(x, y, rd, color) {
    ctx.beginPath();
    ctx.arc(x, y, rd, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = color;
    ctx.stroke();
}

function tick() {
    ctxcircle(CCenter, CCenter, CSSize, CBackground);
    i = 360 / 3600 * (second_analog);
    ctxline(CCenter, CCenter, CMSize, ((i - 90) / 180 * Math.PI), CColor, 4);
    ctxcircle(CCenter, CCenter, 9, CColor);
    i = 360 / (60 * 1000) * ((second * 1000) + (milliSecond * 10));
    ctxline(CCenter, CCenter, CSSize, ((i - 90) / 180 * Math.PI), CSeconds, 3);
    ctxcircle(CCenter, CCenter, 6, CSeconds);
}

window.onload = function () {
    example = document.getElementById("example"), ctx = example.getContext('2d');
    ctx.fillStyle = CBackground;
    ctx.fillRect(0, 0, example.width, example.height);

    for (iv = 0; iv < 12; iv++) {
        i = 360 / 12 * iv;
        ctxcircle((CCenter + (CTSize * Math.cos((i - 90) / 180 * Math.PI))), (CCenter + (CTSize * Math.sin((i - 90) / 180 * Math.PI))), 5, CColor);
    }
    for (iv = 0; iv < 60; iv++) {
        i = 360 / 60 * iv;
        ctxcircle((CCenter + (CTSize * Math.cos((i - 90) / 180 * Math.PI))), (CCenter + (CTSize * Math.sin((i - 90) / 180 * Math.PI))), 2, CColor);
    }
    setInterval('tick(); ', 10);
}
//----------------------on
$('#start_stop').on('click', function () {
    var element = this;
    if ($(element).attr('class') == 'start') {
        $("#circle_reset").attr('class', 'circle');
        start();
    }
    if ($(element).attr('class') == 'stop') {
        pause();
        $("#circle_reset").attr('class', 'reset');
    }
    $(element).toggleClass('stop start');
});

$('#circle_reset').on('click', function () {
    var element = this;
    if ($(element).attr('class') == 'circle') {
        circle();
    }
    if ($(element).attr('class') == 'reset') {
        reset();
    }
});