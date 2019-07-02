function makeSomeRequests(requestsNum = 10) {
    var request = require('request');
    var count = 0;

    for (var i = 0; i < requestsNum; i++) {
        console.log("Calling makeRequest for value: " + i);

        makeRequest(i,function (url, waitTime, i) {
            var req = request('http://localhost:3000/' + url);
            req.on('end', function () {
                console.log("request #" + i +" for http://localhost:3000/" + url + " finished in " + waitTime + "ms");
                if (++count === requestsNum) {
                    console.log("Completed processing all requests!");
                }
            });
        });
    }
    ;
}

function makeRequest(i, callback) {
    var waitTime = Math.floor(Math.random() * 1000);
    var url = 'url-' + Math.floor(Math.random() * 100);
    setTimeout(function () {
        callback(url, waitTime, i);
    }, waitTime);
};

makeSomeRequests();