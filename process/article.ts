import { Page } from 'puppeteer';

export const getArticle = async (page: Page) => {
    const article = await page.evaluate(() => {
        // 标题handler
        const titleHandler = (el: Element) => {
            let title = (el.querySelector('.titName') as Element).innerHTML;
            return title;
        }

        // 时间handler
        const timeHanlder = (el: Element) => {
            let time = (el.querySelector('.time.SG_txtc') as Element).innerHTML.replace('(', '').replace(')', '');
            return time;
        }

        // 标签handler
        const tagHandler = (el: Element) => {
            let tags: string[] = [];
            let originTags = el.querySelectorAll('.blog_tag > h3');
            originTags.forEach((t) => {
                tags.push(t.innerHTML);
            })
            return tags;
        }

        // 内容handler
        const contentHandler = (el: Element) => {
            let content = (el.querySelector('.articalContent') as Element).innerHTML;
            return content;
        }

        // 其他附加信息（除转载）
        const moreHandler = (el: Element) => {
            let moreInfo = {
                readNum: 0,
                commentNum: 0,
                likeNum: 0,
            };
            let mores = el.querySelectorAll('.articalInfo > div > span.SG_txtb');

            mores.forEach((n, index) => {
                switch (index) {
                    case 0:
                        moreInfo.readNum = parseInt(n.innerHTML.replace('(', '').replace(')', ''), 10);
                        break;
                    case 1:
                        moreInfo.commentNum = parseInt(n.innerHTML.replace('(', '').replace(')', ''), 10);
                        break;
                    case 2:
                        moreInfo.likeNum = parseInt(n.innerHTML.replace('(', '').replace(')', ''), 10);
                        break;
                }
            })

            return moreInfo;
        }

        // 转载
        const quoteHandler = (el: Element) => {
            let quoteNum = parseInt((el.querySelector('.zznum') as Element).innerHTML.replace('(', '').replace(')', ''), 10);
            return quoteNum;
        }


        // process
        const els = document.querySelector('body') as Element;
        const more = moreHandler(els);

        console.log(more);
        let article = {
            title: titleHandler(els),
            tags: tagHandler(els),
            createTime: timeHanlder(els),
            readNum: more.readNum,
            commentNum: more.commentNum,
            likeNum: more.likeNum,
            quoteNum: quoteHandler(els),
            content: contentHandler(els),
        };
        return article;
    })

    return article;
}