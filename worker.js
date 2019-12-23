onmessage = ({ data }) => {
    let result;
    console.log(`${new Date().getTime()} worker started:`, data);
    if (data.regex && data.value) {
        result = data.value.match(data.regex);
        if (result) {
            result = result.find(a => !isNaN(+a));
        }
    }
    postMessage(result);
};
