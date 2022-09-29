// const { chromium } = require('playwright')
// ;(async () => {
//   const browser = await chromium.launch()
//   const page = await browser.newPage()
//   await page.goto('http://ah.anhuinews.com/szxw/')
//   const titles = await page.$$eval('#wrap .left .item .title a', a =>
//     a.map(el => [el.innerText, el.href])
//   )
//   const time = await page.$$eval('#wrap .left .item .title .time', a =>
//     a.map(el => el.innerText.trim())
//   )
//   // console.log(titles[0][2]);
//   const page1 = await page.goto(titles[0][1])
//   const tit = await page1.$eval(container, el => {
//     console.log(el)
//     el.innerText.trim()
//   })
//   console.log(tit)
//   await browser.close()
// })()
