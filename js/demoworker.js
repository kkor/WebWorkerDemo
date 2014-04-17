//
// A simple way to find prime numbers
//
self.addEventListener('message', function(e) {
    var data = e.data;
    var shouldRun = true;

    switch (data.cmd) {
        case 'stop':
            postMessage('Worker stopped the prime calculation (Al Gore is happy now) ' +
                data.msg);
            shouldRun = false;
            self.close(); // Terminates the worker.
            break;
        case 'start':
            postMessage("Worker start calculating up to: " + data.upto + "<br/>");
            var number = isPrime(data.upto);
            postMessage(parseInt(number));
            break;
        default:
            postMessage('Dude, unknown cmd: ' + data.msg);
    };
}, false);

// simple calculation of primes (not the most efficiate - but works)
function isPrime(number) {
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