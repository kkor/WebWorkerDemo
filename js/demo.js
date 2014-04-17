$(function() {
    //newton

    TweenLite.ticker.fps(60);

    TweenLite.set(["#ball-2"], {
        position: "absolute",
        left: "+=20"
    });
    TweenLite.set(["#ball-3"], {
        position: "absolute",
        left: "+=40"
    });
    TweenLite.set(["#ball-4"], {
        position: "absolute",
        left: "+=60"
    });
    TweenLite.set(["#ball-5"], {
        position: "absolute",
        left: 220,
        top: 115
    });
    TweenLite.set(["#str-b5"], {
        position: "absolute",
        left: 208,
        top: 58,
        rotation: -40,
        height: 72
    });
    TweenLite.set(["#str-b2"], {
        position: "absolute",
        left: "+=20",
        top: 68,
        height: 68
    });
    TweenLite.set(["#str-b3"], {
        position: "absolute",
        left: "+=40",
        top: 68,
        height: 68
    });
    TweenLite.set(["#str-b4"], {
        position: "absolute",
        left: "+=60",
        top: 68,
        height: 68
    });


    var tl = new TimelineMax({
        repeat: -1,
        yoyo: true
    });

    tl.add(TweenLite.to("#ball-5", .25, {
        bezier: [{
            left: 220,
            top: 115
        }, {
            left: 200,
            top: 130
        }, {
            left: 178,
            top: 130
        }],
        ease: "Sine.easeIn"
    }), "last-ball");
    tl.add(TweenLite.to("#str-b5", .25, {
        left: "-=20",
        rotation: "+=40",
        top: "+=10",
        height: "-=10",
        ease: "Sine.easeIn"
    }), "last-ball");
    tl.add(TweenLite.to("#ball-4", .0, {
        left: "-=2"
    }), "fourth-ball");
    tl.add(TweenLite.to("#str-b4", .0, {
        left: "-=1",
        rotation: "+=1",
        top: "-=0",
        height: "+=0"
    }), "fourth-ball");
    tl.add(TweenLite.to("#ball-3", .0, {
        left: "-=2"
    }), "third-ball");
    tl.add(TweenLite.to("#str-b3", .0, {
        left: "-=1",
        rotation: "+=1",
        top: "-=0",
        height: "+=0"
    }), "third-ball");
    tl.add(TweenLite.to("#ball-2", .0, {
        left: "-=2"
    }), "second-ball");
    tl.add(TweenLite.to("#str-b2", .25, {
        left: "-=1",
        rotation: "+=1",
        top: "-=0",
        height: "+=0"
    }), "second-ball");
    tl.add(TweenLite.to("#ball-1", .25, {
        bezier: [{
            left: 95,
            top: 130
        }, {
            left: 75,
            top: 130
        }, {
            left: 55,
            top: 115
        }],
        ease: "Sine.easeOut"
    }), "-=.23");
    tl.add(TweenLite.to("#str-b1", .25, {
        left: "-=20",
        rotation: "+=40",
        top: "-=10",
        height: "+=10"
    }), "-=.23");
});

var myWorker;



function getPrime(number) {

    console.log("no Worker: Starting", number);
    var numArray = "";
    var this_number, divisor, not_prime;
    var this_number = 3;
    var lastNumber;
    while (this_number < number) {
        var divisor = parseInt(this_number / 2);
        var not_prime = 0;
        while (divisor > 1) {
            if (this_number % divisor == 0) {
                not_prime = 1;
                divisor = 0;
            } else {
                divisor = divisor - 1;
            }
        }
        if (not_prime == 0) {
            numArray += (this_number + " ");
            lastNumber = this_number;
        }
        this_number = this_number + 1;
    }
    return lastNumber;
}

var workerStartTime;

function startWith() {
    workerStartTime = new Date().getTime();
    console.log("WebWorker: Starting");
    myWorker = new Worker("js/demoworker.js");
    myWorker.addEventListener("message", primeHandler, false);
    var maxNum = $('#upto').val();
    myWorker.postMessage({
        'cmd': 'start',
        'upto': maxNum
    });
}

function startWithout() {
    $('#resultWithout').append("Start calculating up to: " + $('#upto').val() + "<br/>");
    var startTime = new Date().getTime();
    console.log("pressed", $('#upto').val());
    var result = getPrime($('#upto').val());
    $('#resultWithout').append("Highest prime: " + result + "<br/>");
    var currentTime = new Date().getTime();
    var time = currentTime - startTime;
    $('#resultWithout').append("Time taken: " + time + "ms<br/><br/>");
}


function primeHandler(event) {
    console.log("result", event.data);
    console.log('got e:' + event.data);
    if (is_numeric(event.data)) {
        console.log("result", event.data);
        $('#resultWith').append("Highest prime: " + event.data + "<br/>");
        var currentTime = new Date().getTime();
        var time = currentTime - workerStartTime;
        console.log("time", currentTime);
        $('#resultWith').append("Time taken: " + time + "ms<br/><br/>");
    } else {
        $('#resultWith').append(event.data);
    }
}

function is_numeric(input) {
    return typeof(input) == 'number';
}