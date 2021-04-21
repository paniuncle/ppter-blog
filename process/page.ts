import { Page } from 'puppeteer';

export const pageHandler = async (page: Page) => {
    const pageInfo = await page.evaluate(() => {
        // defined var
        let countPages = 1;
        countPages = parseInt(((document.querySelector('.SG_pages') as Element).lastElementChild as Element).innerHTML.replace('共', '').replace('页', ''), 10);
        return countPages;
    })

    return pageInfo;
}