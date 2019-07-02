const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster){
    var workersNum = 4;
    for (let i = 0; i < workersNum; i++) {
        cluster.fork({workerId: i});
    }
    console.log('MASTER Created ' + workersNum + ' workers');
} else {
    http.Server((req, res) => {
        console.log('Worker #' + process.env.workerId + ' processing request to ' + req.url);
        sleep(2000);
        res.end('Worker #' + process.env.workerId + 'ended work');
    }).listen(3000);
}

function sleep(timeInMs) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, timeInMs);
}