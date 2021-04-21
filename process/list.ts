const puppeteer = require('puppeteer');
import { Article } from "../constant/type";
import { Page } from "puppeteer";
const md5 = require('js-md5');

export const selectList = async (page: Page) => {
    const list = await page.evaluate(() => {
        // 属性获取函数定义区域
        const urlHandler = (el: Element) => {
            const titleEl = (el.querySelector('.atc_title') as Element).querySelector('a');
            return {
                url: (titleEl as Element).getAttribute('href'),
            }
        }
        // END

        let processedList: Article[] = [];
        const listElement: NodeListOf<Element> = document.querySelectorAll('.articleCell');
        listElement.forEach((el) => {
            let article = {};
            const title = urlHandler(el);
            article = {
                url: title.url
            };

            processedList.push(article as Article);
        })
        return processedList;
    });
    // ID handler
    list.map((el) => {
        el.id = md5(el.url);
    })
    return list;
}