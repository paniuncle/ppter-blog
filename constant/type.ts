/**
 * @param id 随机ID
 * @param title 标题
 * @param tags 标签
 * @param createTime 发表时间
 * @param readNum 阅读数
 * @param commentNum 评论数
 * @param quoteNum 转载数
 * @param likeNum 收藏数
 * @param content 正文
 * @param url 正文URL
 */

interface Article {
    id: string;
    title: string;
    tags: string[];
    createTime: string;
    readNum: number;
    commentNum: number;
    quoteNum: number;
    likeNum: number;
    content: string;
    url: string;
}

export {
    Article,
}