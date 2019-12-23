const worker = new Worker('worker.js');

let result;
const killer = true;

if (killer) {
    // killer combination
    worker.postMessage({
        regex: /(x+x+x+)+y/,
        value: 'x'.repeat(10000000)
    });
} else {
    // legit combination
    worker.postMessage({
        regex: /(?:\D*(\d+)){3}/,
        value: "Product name feature 4.2 kW, 750 x 410 x 460mm"
    });
}

worker.onmessage = event => {
    console.log(`${new Date().getTime()} message from worker:`, event);
    if (event.data) {
        result = event.data;
    }
};

worker.onerror = error => {
    console.log(`${new Date().getTime()} error from worker:`, error);
};

setTimeout(() => {
    console.log(`${new Date().getTime()} timeout!`);
    if (result) {
        console.log("result", result);
    } else {
        console.log("no result - worker terminated");
        worker.terminate();
    }
}, 3000);
