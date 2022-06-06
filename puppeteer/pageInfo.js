// 凤凰网安徽 中安在线 安徽财经网 安徽网
module.export = website = [
  {
    name: '凤凰网安徽',
    url: 'https://ah.ifeng.com/'
  },
  {
    name: '中安在线',
    url: 'http://ah.anhuinews.com/'
  },
  {
    name: '安徽财经网',
    url: 'http://www.ahcaijing.com/'
  },
  {
    name: '安徽网',
    url: 'http://www.ahwang.cn/'
  },
  {
    name: '人民网安徽',
    url: 'http://ah.people.com.cn/'
  }
]

module.export = linkList = [
  {
    url: 'https://ah.ifeng.com/shanklist/200-214-216353-/',
    selector: '.news-stream-basic-news-list li h2 a'
  },
  {
    url: 'http://ah.anhuinews.com/szxw/',
    selector: '.title a'
  },
  {
    url: 'http://www.ahcaijing.com/html/anhui/',
    selector: '.dy-list a'
  },
  {
    url: 'http://www.ahwang.cn/anhui/index.html',
    selector: '.news_list a'
  },
  {
    url: 'http://ah.people.com.cn/GB/358073/358428/index.html',
    selector: '.list_16 a'
  },
  {
    url: 'http://ah.people.com.cn/GB/227131/index.html',
    selector: '.list_16 a'
  }
]
let a = {
  titleSelect: '',
  contentSelector: '',
  timeSelector: ''
}
module.export = contentSelector = [
  {
    url: 'https://ah.ifeng.com/',
    // 凤凰新闻
    titleSelect1:
      '#root > div > div.content-sJClyCFf > div.leftContent-2AkcRO0i > div.artical-2SZ_lo5f > div:nth-child(1) > h1',
    contentSelector1:
      '#root > div > div.content-sJClyCFf > div.leftContent-2AkcRO0i > div.artical-2SZ_lo5f > div.main_content-SbBudI2N',
    timeSelector1:
      '.artical-2SZ_lo5f > div:nth-child(1) > div.info-2hWZO0K7.clearfix > div.infoboxLink-3PABcAq- > div.textTitle-2UNWoQxt > div.timeBref-nubNWei4 > a'
  },
  {
    // 中安在线
    url: 'http://ah.anhuinews.com/',
    titleSelect: '#wm_xl_title',
    contentSelector: '.box-left > div.zt-box > div.zt-right .zt-txt',
    timeSelector: '#title_part2'
  },
  {
    // 安徽财经网
    url: 'http://www.ahcaijing.com/',
    titleSelect:
      'body > div.dy-layout > div.dy-bd > div.dy-content > div.dy-article > div.article-hd > h1',
    contentSelector: '#text_content',
    timeSelector:
      'body > div.dy-layout > div.dy-bd > div.dy-content > div.dy-article > div.article-hd > div > div.article-time-source > span.time'
  },
  {
    url: 'http://www.ahwang.cn/',
    // 安徽网
    titleSelect:
      'body > div.column.clearfix.article.pos-r.ov_v.js-returntop > article > h1',
    contentSelector:
      'body > div.column.clearfix.article.pos-r.ov_v.js-returntop > article > div.left-cont > div.article-content.mar-t-20',
    timeSelector:
      'body > div.column.clearfix.article.pos-r.ov_v.js-returntop > article > div.share.clearfix > div.f-l > div > span'
  },
  {
    // 人民网 安徽
    url: 'http://ah.people.com.cn/',
    titleSelect: '#newstit',
    contentSelector:
      'body > div.main > div.layout.rm_txt.cf > div.col.col-1.fl > div.rm_txt_con.cf',
    timeSelector:
      'body > div.main > div.layout.rm_txt.cf > div.col.col-1.fl > div.channel.cf > div.col-1-1.fl'
  }
]
module.exports = { website, linkList, contentSelector }
