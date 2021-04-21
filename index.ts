const puppeteer = require('puppeteer');
import { Article } from './constant/type';
import { selectList } from './process/list';
import { pageHandler } from './process/page';
import { getArticle } from './process/article';
import fs from 'fs';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    let articleList: Article[] = [];
    await page.goto(`http://blog.sina.com.cn/s/articlelist_1197161814_0_1.html`);
    await page.waitFor(2000);

    // 先处理分页的情况
    const countPage = await pageHandler(page);

    // 先爬取所有文章URL
    for (let nowPage = 1; nowPage <= countPage; nowPage++) {
        await page.goto(`http://blog.sina.com.cn/s/articlelist_1197161814_0_${nowPage}.html`);
        const list = await selectList(page);
        articleList = articleList.concat(list);
    }

    // 然后分别爬取相应的主题内容
    for (let i = 0; i < articleList.length; i++) {
        try {
            await page.goto(articleList[i].url);
            await page.waitFor(2000);
            let article = await getArticle(page);
            articleList[i] = { ...articleList[i], ...article };
            console.log(articleList[i]);
        } catch (e) {
            console.error(e);
        }
    }

    fs.writeFileSync('./article.json', JSON.stringify(articleList));

    await browser.close();
})();