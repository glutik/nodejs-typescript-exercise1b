function sleep(timeInMs) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, timeInMs);
}

process.on("message", (nums) => {
    sleep(2000);
    var {num1, num2} = nums;
    process.send(num1 + num2);
})