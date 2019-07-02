function init() {
    function sleep(timeInMs) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, timeInMs);
    }

    var http = require('http');

    http.Server((req, res) => {
        sleep(2000);
        res.end('This is the end!');
    }).listen(3000);
}

init();