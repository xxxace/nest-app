import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpiderService {
    async grabImage() {
        let current_page = 0;
        const urls: string[] = [];
        const baseUrl = 'https://www.jpmn5.com';

        const getCosplay = async (page?: number | string) => {
            const url = `${baseUrl}/Cosplay/Cosplay10772${page ? `_${page}` : ''}.html`
            console.log('开始抓取', url)
            const body = await axios.get(url).then(res => res.data)
            const $ = cheerio.load(body)

            $('.article-content p img').each(function () {
                urls.push(baseUrl + $(this).attr('src'))
            })

            const pagination = $('.pagination').eq(0).find('a');
            const pages = pagination.map(function () {
                return $(this).text()
            }).toArray()

            if (pages.includes('下一页')) {
                setTimeout(async () => {
                    current_page++;
                    await getCosplay(current_page);
                }, (Math.floor(Math.random() * 2)) * 1000);
            } else {
                console.log('抓取完毕：', urls)
                this.writeFile(urls)
            }
        }

        await getCosplay();
    }

    writeFile(urls: string[]) {
        urls.forEach(async url => {
            const buffer = await axios.get(url, { responseType: "arraybuffer" }).then(res => res.data)
            const ws = fs.createWriteStream(path.join(__dirname, '../cos' + new Date().getTime() + path.extname(url)))
            ws.write(buffer);
        })
    }
}
