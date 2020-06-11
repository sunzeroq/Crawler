const fs = require('fs')
const wait = (ms) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
async function writeA() {
    for (let i = 0; i < 4; i++) {
        await wait(console.log('ok'), 2000)
    }

}
const main = () => {
    writeA().then(res => {
        console.log('1');
    })

    for (let i = 1; i < 3; i++) {
        let path = 'test/' + i + '.json'
        // setTimeout(function timer() {
        //     fs.writeFile(path, {
        //         a: 1
        //     }, () => {
        //         console.log('ok');

        //     })
        // }, i * 3000);
    }

}
main()