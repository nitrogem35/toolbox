const actions = [];
const expireAfter = 60;
let loop;
let running = false;

let init = () => { 
    document.write("Press any key to begin test");
    document.onkeydown = function(evt) {
        if (evt.keyCode == 16 && running) {
            clearInterval(loop);
            running = false;
            document.write("<br> Press any key to resume test");
        }
        else if (!running) {
            generateLoop();
            running = true;
        }
        actions.push(Date.now());
        while ((Date.now() - actions[0]) / 1000 > expireAfter) actions.shift();
    }
}

function generateLoop() {
    loop = setInterval(() => {
        document.body.innerHTML = null;
        let res = [calcAPM(0.5), calcAPM(2), calcAPM(5)]
        document.write(`
            Keys per minute (0.5s): ${res[0].toFixed(2)} (${(res[0] / 60).toFixed(2)} KPS) <br>
            Keys per minute (2s): ${res[1].toFixed(2)} (${(res[1] / 60).toFixed(2)} KPS) <br>
            Keys per minute (5s): ${res[2].toFixed(2)} (${(res[2] / 60).toFixed(2)} KPS) <br>
            Hit SHIFT to pause updates
        `);
    }, 33);
}

function calcAPM(intervalSeconds) {
    let res = actions.filter(t => Date.now() - t <= intervalSeconds * 1000);
    return (res.length * (60 / intervalSeconds));
}

init();
