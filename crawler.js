// 系统标准库放在前面
const fs = require('fs')

// 接着放第三方库
const syncrequest = require('syncrequest')
const cheerio = require('cheerio')
const request = require('request')
var read = require('node-readability');


const cacheFiles = (url) => {
    let cacheFile = "cached_html/" + url.split('/').pop()
    let existFile = fs.existsSync(cacheFile)
    if (existFile) {
        console.log('exist');
        let data = fs.readFileSync(cacheFile)
        // console.log(data);

        return data
    } else {
        let r = syncrequest.get.sync(url)
        // console.log(r);
        let body = r.bodynpm

        fs.writeFileSync(cacheFile, body)
        return body
    }
}
const __main = () => {
    // 主函数
    //todo网站缓存乱码
    let url = 'http://www.hetu2.com/toplist/6_11_3.html'
    // read(url, function (err, article, meta) {
    //     let cacheFile = "cached_html/" + url.split('/').pop()
    //     fs.writeFileSync(cacheFile, article.html)
    // });
    let body = cacheFiles(url)
    //cheerio加载html
    let e = cheerio.load(body)

    let arr = []
    let list = e('.list').children('.listable')
    list.each(function (item) {
        var div = e(this);


        var textDiv = div.find('.dysx')
        var href = e(textDiv.find('a')[1]).attr('href')
        var text = e(textDiv.find('a')[1]).attr('title')
        var des = textDiv.text()
        arr.push({
            src: href,
            t: text,
            des: des,
        })
    })

    let s = JSON.stringify(arr, null, 2)
    // 把 json 格式字符串写入到 文件 中
    let path = 'douban.json'
    fs.writeFileSync(path, s)
    console.log(s)


    // let movies = moviesFromUrl(url)
    // saveMovie(movies)
    // cacheFiles(url)
    // console.log('抓取成功, 数据已经写入到 douban.json 中')
}

__main()