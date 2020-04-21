// 系统标准库放在前面
const fs = require('fs')

// 接着放第三方库
const syncrequest = require('syncrequest')
const cheerio = require('cheerio')
const request = require('request')

//node-readability 支持GBK格式
var read = require('node-readability');


const cacheFiles = (url) => {
    let cacheFile = "cached_html/" + url.split('/').pop()

    let isFlieExist = fs.existsSync(cacheFile)
    if (isFlieExist) {
        console.log('exist');
        let data = fs.readFileSync(cacheFile)
        return data
    } else {
        let data = null
        read(url, function (err, article, meta) {
            fs.writeFileSync(cacheFile, article.html)
            data = article.html
        });
        return data
    }
}

const parseHtml = (html) => {
    let arr = []
    let e = cheerio.load(html)
    let list = e('.list').children('.listable')

    list.each(function (item) {
        let div = e(this);

        let textDiv = div.find('.dysx')
        let href = e(textDiv.find('a')[1]).attr('href')
        let text = e(textDiv.find('a')[1]).attr('title').split('TXT')[0]

        let des = textDiv.text().split("\n")

        arr.push({
            src: href,
            t: text,
            hot: des[1],
            size: des[2],
            updataTime: des[3],
        })
    })

    return arr
}
const saveAsJson = (arr, path) => {
    let s = JSON.stringify(arr, null, 2)
    // 把 json 格式字符串写入到 文件 中
    fs.writeFileSync(path, s)
}

//todo promise
const wait = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });
}


async function write() {
    for (let i = 0; i < 15; i++) {
        let url = 'http://www.hetu2.com/toplist/6_11_' + i + '.html'
        // urlArr.push(url)
        let html = cacheFiles(url)
        console.log(url)
        await wait(console.log('ok'))
    }

}

const __main = () => {
    let r = []
    let urlArr = []
    // for (let i = 1; i < 4; i++) {
    //     let url = 'http://www.hetu2.com/toplist/6_11_' + i + '.html'
    //     urlArr.push(url)
    //     let html = cacheFiles(url)
    //     console.log(url)

    // }
    write()
    // for (let i = 0; i < urlArr.length; i++) {
    //     //加载 解析 html
    //     let html = cacheFiles(urlArr[i])
    //     if (html) {
    //         let arr = parseHtml(html)
    //         r = r.concat(arr)
    //     }

    // }

    let path = 'result.json'
    // saveAsJson(r, path)
}

__main()