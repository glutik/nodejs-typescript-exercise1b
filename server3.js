const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
    var workersNum = 4;
    for (let i = 0; i < workersNum; i++) {
        cluster.fork({workerId: i});
    }
    console.log('MASTER Created ' + workersNum + ' workers');
} else {
    http.Server((req, res) => {
        var child_process = require('child_process');
        var forkedCalc = child_process.fork(__dirname + '/calcsum.js');
        var num1 = Math.floor(Math.random() * 100);
        var num2 = Math.floor(Math.random() * 100);
        forkedCalc.on('message', (result) => {
            res.end(result);
            console.log('Worker #' + process.env.workerId + ' ended work with the result: ' + result)
        });
        console.log("Calculating " + num1 + "+" + num2)
        forkedCalc.send({num1, num2});
    }).listen(3000);
}
