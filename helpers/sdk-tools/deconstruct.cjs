function deconstructArguments(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].includes("=")) {
            let [key, value] = arr[i].split("=");
            obj[key] = value;
        }
    }
    return obj;
}

module.exports = { deconstructArguments };
