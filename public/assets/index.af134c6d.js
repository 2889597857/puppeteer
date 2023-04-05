import{d as e,r as a,g as n,P as t,Q as r,D as o,y as s,aa as l,ad as i,a8 as u,bP as d,a9 as c,ae as p,bE as m,bQ as f,bR as v,al as b,aB as h,A as g,U as w,ar as y,m as x,W as _,X as $,ah as k,aI as z,ai as N,aE as I,bS as C,bT as O,o as S,c as P,aw as Y,bU as A,u as B,R as j,w as E,a as R,bV as H,e as D,bO as F,J as L,L as M,bW as W,M as X,K as Z,aL as q,_ as T,bX as U,bY as V,a5 as Q}from"./index.dd3a459e.js";import{u as J,a as K,b as G,_ as ee,c as ae}from"./news.a047f24e.js";import{_ as ne}from"./svg-icon.d63d8434.js";import{g as te,a as re}from"./Pagination.876e8d2c.js";import{_ as oe}from"./plugin-vue_export-helper.21dcd24c.js";import{N as se}from"./Divider.aac57dfe.js";import{_ as le}from"./Input.7c0904de.js";import{_ as ie,a as ue}from"./FormItem.bbd1df9d.js";import"./use-locale.b971594d.js";import"./Popover.86cf4588.js";import"./next-frame-once.e5ee25e8.js";var de=e({name:"SlotMachineNumber",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){const l=a(null),i=a(e.value),u=a(e.value),d=a("up"),c=a(!1),p=n((()=>c.value?`${e.clsPrefix}-base-slot-machine-current-number--${d.value}-scroll`:null)),m=n((()=>c.value?`${e.clsPrefix}-base-slot-machine-old-number--${d.value}-scroll`:null));function f(){const a=e.newOriginalNumber,n=e.oldOriginalNumber;void 0!==n&&void 0!==a&&(a>n?v("up"):n>a&&v("down"))}function v(e){d.value=e,c.value=!1,r((()=>{var e;null===(e=l.value)||void 0===e||e.offsetWidth,c.value=!0}))}return t(o(e,"value"),((e,a)=>{i.value=a,u.value=e,r(f)})),()=>{const{clsPrefix:a}=e;return s("span",{ref:l,class:`${a}-base-slot-machine-number`},null!==i.value?s("span",{class:[`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--top`,m.value]},i.value):null,s("span",{class:[`${a}-base-slot-machine-current-number`,p.value]},s("span",{ref:"numberWrapper",class:[`${a}-base-slot-machine-current-number__inner`,"number"!=typeof e.value&&`${a}-base-slot-machine-current-number__inner--not-number`]},u.value)),null!==i.value?s("span",{class:[`${a}-base-slot-machine-old-number ${a}-base-slot-machine-old-number--bottom`,m.value]},i.value):null)}}});const{cubicBezierEaseOut:ce}=i;var pe=l([l("@keyframes n-base-slot-machine-fade-up-in","\n from {\n transform: translateY(60%);\n opacity: 0;\n }\n to {\n transform: translateY(0);\n opacity: 1;\n }\n "),l("@keyframes n-base-slot-machine-fade-down-in","\n from {\n transform: translateY(-60%);\n opacity: 0;\n }\n to {\n transform: translateY(0);\n opacity: 1;\n }\n "),l("@keyframes n-base-slot-machine-fade-up-out","\n from {\n transform: translateY(0%);\n opacity: 1;\n }\n to {\n transform: translateY(-60%);\n opacity: 0;\n }\n "),l("@keyframes n-base-slot-machine-fade-down-out","\n from {\n transform: translateY(0%);\n opacity: 1;\n }\n to {\n transform: translateY(60%);\n opacity: 0;\n }\n "),u("base-slot-machine","\n overflow: hidden;\n white-space: nowrap;\n display: inline-block;\n height: 18px;\n line-height: 18px;\n ",[u("base-slot-machine-number","\n display: inline-block;\n position: relative;\n height: 18px;\n width: .6em;\n max-width: .6em;\n ",[function({duration:e=".2s"}={}){return[l("&.fade-up-width-expand-transition-leave-active",{transition:`\n opacity ${e} ${ce},\n max-width ${e} ${ce},\n transform ${e} ${ce}\n `}),l("&.fade-up-width-expand-transition-enter-active",{transition:`\n opacity ${e} ${ce},\n max-width ${e} ${ce},\n transform ${e} ${ce}\n `}),l("&.fade-up-width-expand-transition-enter-to",{opacity:1,transform:"translateX(0) translateY(0)"}),l("&.fade-up-width-expand-transition-enter-from",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"}),l("&.fade-up-width-expand-transition-leave-from",{opacity:1,transform:"translateY(0)"}),l("&.fade-up-width-expand-transition-leave-to",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"})]}({duration:".2s"}),d({duration:".2s",delay:"0s"}),u("base-slot-machine-old-number","\n display: inline-block;\n opacity: 0;\n position: absolute;\n left: 0;\n right: 0;\n ",[c("top",{transform:"translateY(-100%)"}),c("bottom",{transform:"translateY(100%)"}),c("down-scroll",{animation:"n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),c("up-scroll",{animation:"n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1})]),u("base-slot-machine-current-number","\n display: inline-block;\n position: absolute;\n left: 0;\n top: 0;\n bottom: 0;\n right: 0;\n opacity: 1;\n transform: translateY(0);\n width: .6em;\n ",[c("down-scroll",{animation:"n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),c("up-scroll",{animation:"n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),p("inner","\n display: inline-block;\n position: absolute;\n right: 0;\n top: 0;\n width: .6em;\n ",[c("not-number","\n right: unset;\n left: 0;\n ")])])])])]),me=e({name:"BaseSlotMachine",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){m("-base-slot-machine",pe,o(e,"clsPrefix"));const r=a(),l=a(),i=n((()=>{if("string"==typeof e.value)return[];if(e.value<1)return[0];const a=[];let n=e.value;for(void 0!==e.max&&(n=Math.min(e.max,n));n>=1;)a.push(n%10),n/=10,n=Math.floor(n);return a.reverse(),a}));return t(o(e,"value"),((e,a)=>{"string"==typeof e?(l.value=void 0,r.value=void 0):"string"==typeof a?(l.value=e,r.value=void 0):(l.value=e,r.value=a)})),()=>{const{value:a,clsPrefix:n}=e;return"number"==typeof a?s("span",{class:`${n}-base-slot-machine`},s(v,{name:"fade-up-width-expand-transition",tag:"span"},{default:()=>i.value.map(((e,a)=>s(de,{clsPrefix:n,key:i.value.length-a-1,oldOriginalNumber:r.value,newOriginalNumber:l.value,value:e})))}),s(f,{key:"+",width:!0},{default:()=>void 0!==e.max&&e.max<a?s(de,{clsPrefix:n,value:"+"}):null})):s("span",{class:`${n}-base-slot-machine`},a)}}});var fe={name:"Badge",common:b,self:e=>{const{errorColor:a,infoColor:n,successColor:t,warningColor:r,fontFamily:o}=e;return{color:a,colorInfo:n,colorSuccess:t,colorError:a,colorWarning:r,fontSize:"12px",fontFamily:o}}},ve=l([l("@keyframes badge-wave-spread",{from:{boxShadow:"0 0 0.5px 0px var(--n-ripple-color)",opacity:.6},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)",opacity:0}}),u("badge","\n display: inline-flex;\n position: relative;\n vertical-align: middle;\n color: var(--n-color);\n font-family: var(--n-font-family);\n ",[c("as-is",[u("badge-sup",{position:"static",transform:"translateX(0)"},[h({transformOrigin:"left bottom",originalTransform:"translateX(0)"})])]),c("dot",[u("badge-sup","\n height: 8px;\n width: 8px;\n padding: 0;\n min-width: 8px;\n left: 100%;\n bottom: calc(100% - 4px);\n ",[l("::before","border-radius: 4px;")])]),u("badge-sup","\n background: var(--n-color);\n transition:\n background-color .3s var(--n-bezier),\n color .3s var(--n-bezier);\n color: #FFF;\n position: absolute;\n height: 18px;\n line-height: 18px;\n border-radius: 9px;\n padding: 0 6px;\n text-align: center;\n font-size: var(--n-font-size);\n transform: translateX(-50%);\n left: 100%;\n bottom: calc(100% - 9px);\n font-variant-numeric: tabular-nums;\n z-index: 1;\n display: flex;\n align-items: center;\n ",[h({transformOrigin:"left bottom",originalTransform:"translateX(-50%)"}),u("base-wave",{zIndex:1,animationDuration:"2s",animationIterationCount:"infinite",animationDelay:"1s",animationTimingFunction:"var(--n-ripple-bezier)",animationName:"badge-wave-spread"}),l("&::before",'\n opacity: 0;\n transform: scale(1);\n border-radius: 9px;\n content: "";\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n ')])])]);var be=e({name:"Badge",props:Object.assign(Object.assign({},w.props),{value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:"default"},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array}),setup(e,{slots:t}){const{mergedClsPrefixRef:r,inlineThemeDisabled:o,mergedRtlRef:s}=g(e),l=w("Badge","-badge",ve,fe,e,r),i=a(!1),u=n((()=>e.show&&(e.dot||void 0!==e.value&&!(!e.showZero&&e.value<=0)||!y(t.value))));x((()=>{u.value&&(i.value=!0)}));const d=_("Badge",s,r),c=n((()=>{const{type:a,color:n}=e,{common:{cubicBezierEaseInOut:t,cubicBezierEaseOut:r},self:{[$("color",a)]:o,fontFamily:s,fontSize:i}}=l.value;return{"--n-font-size":i,"--n-font-family":s,"--n-color":n||o,"--n-ripple-color":n||o,"--n-bezier":t,"--n-ripple-bezier":r}})),p=o?k("badge",n((()=>{let a="";const{type:n,color:t}=e;return n&&(a+=n[0]),t&&(a+=z(t)),a})),c,e):void 0,m=n((()=>{const{offset:a}=e;if(!a)return;const[n,t]=a,r="number"==typeof n?`${n}px`:n,o="number"==typeof t?`${t}px`:t;return{transform:`translate(calc(${(null==d?void 0:d.value)?"50%":"-50%"} + ${r}), ${o})`}}));return{rtlEnabled:d,mergedClsPrefix:r,appeared:i,showBadge:u,handleAfterEnter:()=>{i.value=!0},handleAfterLeave:()=>{i.value=!1},cssVars:o?void 0:c,themeClass:null==p?void 0:p.themeClass,onRender:null==p?void 0:p.onRender,offsetStyle:m}},render(){var e;const{mergedClsPrefix:a,onRender:n,themeClass:t,$slots:r}=this;null==n||n();const o=null===(e=r.default)||void 0===e?void 0:e.call(r);return s("div",{class:[`${a}-badge`,this.rtlEnabled&&`${a}-badge--rtl`,t,{[`${a}-badge--dot`]:this.dot,[`${a}-badge--as-is`]:!o}],style:this.cssVars},o,s(N,{name:"fade-in-scale-up-transition",onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?s("sup",{class:`${a}-badge-sup`,title:te(this.value),style:this.offsetStyle},I(r.value,(()=>[this.dot?null:s(me,{clsPrefix:a,appeared:this.appeared,max:this.max,value:this.value})])),this.processing?s(C,{clsPrefix:a}):null):null}))}});const he=e({__name:"DragBox",setup(e){const n=a(null),{innerWidth:t}=window,{style:r}=O(n,{initialValue:{x:t/1.2,y:300}});return(e,a)=>(S(),P("div",{ref_key:"el",ref:n,class:"cursor-move fixed z-50",style:A(B(r))},[Y(e.$slots,"default")],4))}}),ge={class:"text-50px"},we=e({__name:"dragCount",setup:e=>(e,a)=>{const n=ne,t=be,r=he;return S(),j(r,null,{default:E((()=>[R(t,{"show-zero":"",value:B(H)().count,max:99},{default:E((()=>[D("div",ge,[B(H)().count>0?(S(),j(n,{key:0,icon:"vscode-icons:default-root-folder-opened"})):(S(),j(n,{key:1,icon:"vscode-icons:default-root-folder"}))])])),_:1},8,["value"])])),_:1})}});const ye={class:"news-item"},xe={key:0,class:"mb-1"},_e={class:"news-content"},$e={style:{"word-wrap":"break-word"}},ke=["href"];var ze=oe(e({__name:"newsItem",props:{newsInfo:null,id:null,menu:{type:Boolean}},emits:["reportNews"],setup(e,{emit:n}){const t=e,r=H(),{changeNewsState:o}=function(e,n){const t=a(!1),r=e,o=F();async function s(){const e=await K();e&&r.addReport(e),n&&(n.value=!1)}return{changeLoading:t,changeNewsState:async function(e,a=1){if(!t.value){switch(t.value=!0,(await J({_id:e._id,state:a})).state){case 1:await s(),o.success("添加成功",{keepAliveOnHover:!0});break;case 2:o.error("已删除",{keepAliveOnHover:!0});break;case 3:await s(),o.success("已报送",{keepAliveOnHover:!0}),e.state=1}t.value=!1}}}}(r),s=L({content:!1,report:!1,delete:!1}),l=async()=>{s.report||(s.report=!0,await o(t.newsInfo),n("reportNews"),s.report=!1)},i=async()=>{s.delete||(s.delete=!0,await o(t.newsInfo,2),n("reportNews"),s.delete=!1)};return(a,n)=>{const t=T,r=se;return S(),P(q,null,[D("div",ye,[e.menu?(S(),P("div",xe,[R(t,{class:"mr-2",loading:B(s).report,size:"small",type:"primary",onClick:l},{default:E((()=>[M("报送")])),_:1},8,["loading"]),R(t,{loading:B(s).delete,size:"small",type:"error",onClick:i},{default:E((()=>[M("删除")])),_:1},8,["loading"])])):W("",!0),D("ul",_e,[D("li",null,X(e.id+1)+"、标题："+X(e.newsInfo.title),1),D("li",$e,[M(" 链接： "),D("a",{href:e.newsInfo.url,target:"_blank",class:"news-url"},X(e.newsInfo.url),9,ke)]),D("li",null,"摘要："+X(e.newsInfo.report),1),D("li",null,"时间："+X(B(Z)(e.newsInfo.time).format("YYYY-MM-DD HH:mm")),1)])]),R(r)],64)}}}),[["__scopeId","data-v-740a808d"]]);const Ne={class:"modal-news"};var Ie=oe(e({__name:"getNews",setup(e){const n=F(),t=H(),r=a(null),o=a({url:""}),s=/^((https|http|ftp|rtsp|mms)?:\/\/)(([A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]{2,6})(:\d+)?(\/.*)?(\?.*)?(#.*)?$/,l={url:[{required:!0,validator:(e,a)=>a?!!s.test(a.trim())||new Error("请输入合法链接"):new Error("请输入链接"),trigger:["blur"]}]},i=()=>{var e;null==(e=r.value)||e.validate((e=>{e||function(){d.value||(d.value=!0,o.value.url&&G(o.value.url.trim()).then((e=>{u.value=e,c.value=!0,d.value=!1,o.value.url=""})).catch((()=>{n.error("获取失败",{keepAliveOnHover:!0}),d.value=!1})))}()}))},u=a(),d=a(!1),c=a(!1);const{reportLoading:p,changeNewsState:m}=function(e,n){const t=a(!1),r=e,o=F();return{reportLoading:t,changeNewsState:async function(e,a=1){if(!t.value){switch(t.value=!0,(await J({_id:e._id,state:a})).state){case 1:r.addReport({title:e.title,url:e.url,report:e.report}),n&&(n.value=!1),o.success("添加成功",{keepAliveOnHover:!0});break;case 2:o.error("已删除",{keepAliveOnHover:!0});break;case 3:o.success("已报送",{keepAliveOnHover:!0}),e.state=1}t.value=!1}}}}(t,c);return(e,a)=>{const n=le,t=ie,s=T,f=ee,v=ue,b=U;return S(),P(q,null,[R(v,{ref_key:"formRef",ref:r,model:o.value,rules:l},{default:E((()=>[R(f,null,{default:E((()=>[R(t,{path:"url"},{default:E((()=>[R(n,{value:o.value.url,"onUpdate:value":a[0]||(a[0]=e=>o.value.url=e),valueModifiers:{trim:!0},clearable:"",autocomplete:"“off”",placeholder:"请输入链接"},null,8,["value"])])),_:1}),R(s,{loading:d.value,onClick:i},{default:E((()=>[M("获取新闻")])),_:1},8,["loading"])])),_:1})])),_:1},8,["model"]),R(b,{show:c.value,"onUpdate:show":a[3]||(a[3]=e=>c.value=e)},{default:E((()=>[D("div",Ne,[R(f,{vertical:""},{default:E((()=>[R(ze,{id:0,menu:!1,"news-info":u.value},null,8,["news-info"]),R(f,{size:"small"},{default:E((()=>[R(s,{loading:B(p),disabled:1==u.value.state,type:"primary",onClick:a[1]||(a[1]=e=>B(m)(u.value))},{default:E((()=>[M("报送")])),_:1},8,["loading","disabled"]),R(s,{type:"error",onClick:a[2]||(a[2]=e=>c.value=!1)},{default:E((()=>[M("关闭")])),_:1})])),_:1})])),_:1})])])),_:1},8,["show"])],64)}}}),[["__scopeId","data-v-9128665a"]]);const Ce={class:"news"},Oe={class:"get-news"},Se={class:"pagination"};var Pe=oe(e({__name:"index",setup(e){const n=H(),r=a(1),o=a(1),s=a([]),l=async e=>{const a=await ae(e);a&&(r.value=a.currentPage,o.value=a.totalPages,s.value=a.data)},i=()=>l(r.value);return x((()=>{l(r.value),K().then((e=>{e&&(n.count=e)}))})),t((()=>r.value),(e=>l(e))),(e,a)=>{const n=re;return S(),P("div",null,[R(we),D("div",Ce,[D("div",Oe,[R(Ie)]),(S(!0),P(q,null,V(B(s),((e,a)=>(S(),j(ze,{id:a,key:e._id,menu:!0,"news-info":e,onReportNews:i},null,8,["id","news-info"])))),128)),D("div",Se,[R(n,{page:B(r),"onUpdate:page":a[0]||(a[0]=e=>Q(r)?r.value=e:null),size:"large","page-count":B(o),"page-slot":4},null,8,["page","page-count"])])])])}}}),[["__scopeId","data-v-4b5e94ee"]]);export{Pe as default};
