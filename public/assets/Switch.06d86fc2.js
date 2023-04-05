import{al as e,am as n,an as a,a8 as t,ae as o,ao as i,aa as r,a9 as l,ap as s,d,A as c,U as u,aq as h,r as b,D as v,g,ah as p,ar as f,y as w,aj as m,X as x,x as y,Z as k,as as C,at as $,au as B}from"./index.dd3a459e.js";import{u as S}from"./Popover.86cf4588.js";var _={name:"Switch",common:e,self:e=>{const{primaryColor:t,opacityDisabled:o,borderRadius:i,textColor3:r}=e;return Object.assign(Object.assign({},n),{iconColor:r,textColor:"white",loadingColor:t,opacityDisabled:o,railColor:"rgba(0, 0, 0, .14)",railColorActive:t,buttonBoxShadow:"0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)",buttonColor:"#FFF",railBorderRadiusSmall:i,railBorderRadiusMedium:i,railBorderRadiusLarge:i,buttonBorderRadiusSmall:i,buttonBorderRadiusMedium:i,buttonBorderRadiusLarge:i,boxShadowFocus:`0 0 0 2px ${a(t,{alpha:.2})}`})}},z=t("switch","\n height: var(--n-height);\n min-width: var(--n-width);\n vertical-align: middle;\n user-select: none;\n -webkit-user-select: none;\n display: inline-flex;\n outline: none;\n justify-content: center;\n align-items: center;\n",[o("children-placeholder","\n height: var(--n-rail-height);\n display: flex;\n flex-direction: column;\n overflow: hidden;\n pointer-events: none;\n visibility: hidden;\n "),o("rail-placeholder","\n display: flex;\n flex-wrap: none;\n "),o("button-placeholder","\n width: calc(1.75 * var(--n-rail-height));\n height: var(--n-rail-height);\n "),t("base-loading","\n position: absolute;\n top: 50%;\n left: 50%;\n transform: translateX(-50%) translateY(-50%);\n font-size: calc(var(--n-button-width) - 4px);\n color: var(--n-loading-color);\n transition: color .3s var(--n-bezier);\n ",[i({left:"50%",top:"50%",originalTransform:"translateX(-50%) translateY(-50%)"})]),o("checked, unchecked","\n transition: color .3s var(--n-bezier);\n color: var(--n-text-color);\n box-sizing: border-box;\n position: absolute;\n white-space: nowrap;\n top: 0;\n bottom: 0;\n display: flex;\n align-items: center;\n line-height: 1;\n "),o("checked","\n right: 0;\n padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));\n "),o("unchecked","\n left: 0;\n justify-content: flex-end;\n padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));\n "),r("&:focus",[o("rail","\n box-shadow: var(--n-box-shadow-focus);\n ")]),l("round",[o("rail","border-radius: calc(var(--n-rail-height) / 2);",[o("button","border-radius: calc(var(--n-button-height) / 2);")])]),s("disabled",[s("icon",[l("rubber-band",[l("pressed",[o("rail",[o("button","max-width: var(--n-button-width-pressed);")])]),o("rail",[r("&:active",[o("button","max-width: var(--n-button-width-pressed);")])]),l("active",[l("pressed",[o("rail",[o("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]),o("rail",[r("&:active",[o("button","left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]),l("active",[o("rail",[o("button","left: calc(100% - var(--n-button-width) - var(--n-offset))")])]),o("rail","\n overflow: hidden;\n height: var(--n-rail-height);\n min-width: var(--n-rail-width);\n border-radius: var(--n-rail-border-radius);\n cursor: pointer;\n position: relative;\n transition:\n opacity .3s var(--n-bezier),\n background .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier);\n background-color: var(--n-rail-color);\n ",[o("button-icon","\n color: var(--n-icon-color);\n transition: color .3s var(--n-bezier);\n font-size: calc(var(--n-button-height) - 4px);\n position: absolute;\n left: 0;\n right: 0;\n top: 0;\n bottom: 0;\n display: flex;\n justify-content: center;\n align-items: center;\n line-height: 1;\n ",[i()]),o("button",'\n align-items: center; \n top: var(--n-offset);\n left: var(--n-offset);\n height: var(--n-button-height);\n width: var(--n-button-width-pressed);\n max-width: var(--n-button-width);\n border-radius: var(--n-button-border-radius);\n background-color: var(--n-button-color);\n box-shadow: var(--n-button-box-shadow);\n box-sizing: border-box;\n cursor: inherit;\n content: "";\n position: absolute;\n transition:\n background-color .3s var(--n-bezier),\n left .3s var(--n-bezier),\n opacity .3s var(--n-bezier),\n max-width .3s var(--n-bezier),\n box-shadow .3s var(--n-bezier);\n ')]),l("active",[o("rail","background-color: var(--n-rail-color-active);")]),l("loading",[o("rail","\n cursor: wait;\n ")]),l("disabled",[o("rail","\n cursor: not-allowed;\n opacity: .5;\n ")])]);let F;var R=d({name:"Switch",props:Object.assign(Object.assign({},u.props),{size:{type:String,default:"medium"},value:{type:[String,Number,Boolean],default:void 0},loading:Boolean,defaultValue:{type:[String,Number,Boolean],default:!1},disabled:{type:Boolean,default:void 0},round:{type:Boolean,default:!0},"onUpdate:value":[Function,Array],onUpdateValue:[Function,Array],checkedValue:{type:[String,Number,Boolean],default:!0},uncheckedValue:{type:[String,Number,Boolean],default:!1},railStyle:Function,rubberBand:{type:Boolean,default:!0},onChange:[Function,Array]}),setup(e){void 0===F&&(F="undefined"==typeof CSS||void 0!==CSS.supports&&CSS.supports("width","max(1px)"));const{mergedClsPrefixRef:n,inlineThemeDisabled:a}=c(e),t=u("Switch","-switch",z,_,e,n),o=h(e),{mergedSizeRef:i,mergedDisabledRef:r}=o,l=b(e.defaultValue),s=v(e,"value"),d=S(s,l),f=g((()=>d.value===e.checkedValue)),w=b(!1),m=b(!1),C=g((()=>{const{railStyle:n}=e;if(n)return n({focused:m.value,checked:f.value})}));function $(n){const{"onUpdate:value":a,onChange:t,onUpdateValue:i}=e,{nTriggerFormInput:r,nTriggerFormChange:s}=o;a&&B(a,n),i&&B(i,n),t&&B(t,n),l.value=n,r(),s()}const R=g((()=>{const{value:e}=i,{self:{opacityDisabled:n,railColor:a,railColorActive:o,buttonBoxShadow:r,buttonColor:l,boxShadowFocus:s,loadingColor:d,textColor:c,iconColor:u,[x("buttonHeight",e)]:h,[x("buttonWidth",e)]:b,[x("buttonWidthPressed",e)]:v,[x("railHeight",e)]:g,[x("railWidth",e)]:p,[x("railBorderRadius",e)]:f,[x("buttonBorderRadius",e)]:w},common:{cubicBezierEaseInOut:m}}=t.value;let C,$,B;return F?(C=`calc((${g} - ${h}) / 2)`,$=`max(${g}, ${h})`,B=`max(${p}, calc(${p} + ${h} - ${g}))`):(C=y((k(g)-k(h))/2),$=y(Math.max(k(g),k(h))),B=k(g)>k(h)?p:y(k(p)+k(h)-k(g))),{"--n-bezier":m,"--n-button-border-radius":w,"--n-button-box-shadow":r,"--n-button-color":l,"--n-button-width":b,"--n-button-width-pressed":v,"--n-button-height":h,"--n-height":$,"--n-offset":C,"--n-opacity-disabled":n,"--n-rail-border-radius":f,"--n-rail-color":a,"--n-rail-color-active":o,"--n-rail-height":g,"--n-rail-width":p,"--n-width":B,"--n-box-shadow-focus":s,"--n-loading-color":d,"--n-text-color":c,"--n-icon-color":u}})),V=a?p("switch",g((()=>i.value[0])),R,e):void 0;return{handleClick:function(){e.loading||r.value||(d.value!==e.checkedValue?$(e.checkedValue):$(e.uncheckedValue))},handleBlur:function(){m.value=!1,function(){const{nTriggerFormBlur:e}=o;e()}(),w.value=!1},handleFocus:function(){m.value=!0,function(){const{nTriggerFormFocus:e}=o;e()}()},handleKeyup:function(n){e.loading||r.value||" "===n.key&&(d.value!==e.checkedValue?$(e.checkedValue):$(e.uncheckedValue),w.value=!1)},handleKeydown:function(n){e.loading||r.value||" "===n.key&&(n.preventDefault(),w.value=!0)},mergedRailStyle:C,pressed:w,mergedClsPrefix:n,mergedValue:d,checked:f,mergedDisabled:r,cssVars:a?void 0:R,themeClass:null==V?void 0:V.themeClass,onRender:null==V?void 0:V.onRender}},render(){const{mergedClsPrefix:e,mergedDisabled:n,checked:a,mergedRailStyle:t,onRender:o,$slots:i}=this;null==o||o();const{checked:r,unchecked:l,icon:s,"checked-icon":d,"unchecked-icon":c}=i,u=!(f(s)&&f(d)&&f(c));return w("div",{role:"switch","aria-checked":a,class:[`${e}-switch`,this.themeClass,u&&`${e}-switch--icon`,a&&`${e}-switch--active`,n&&`${e}-switch--disabled`,this.round&&`${e}-switch--round`,this.loading&&`${e}-switch--loading`,this.pressed&&`${e}-switch--pressed`,this.rubberBand&&`${e}-switch--rubber-band`],tabindex:this.mergedDisabled?void 0:0,style:this.cssVars,onClick:this.handleClick,onFocus:this.handleFocus,onBlur:this.handleBlur,onKeyup:this.handleKeyup,onKeydown:this.handleKeydown},w("div",{class:`${e}-switch__rail`,"aria-hidden":"true",style:t},m(r,(n=>m(l,(a=>n||a?w("div",{"aria-hidden":!0,class:`${e}-switch__children-placeholder`},w("div",{class:`${e}-switch__rail-placeholder`},w("div",{class:`${e}-switch__button-placeholder`}),n),w("div",{class:`${e}-switch__rail-placeholder`},w("div",{class:`${e}-switch__button-placeholder`}),a)):null)))),w("div",{class:`${e}-switch__button`},m(s,(n=>m(d,(a=>m(c,(t=>w(C,null,{default:()=>this.loading?w($,{key:"loading",clsPrefix:e,strokeWidth:20}):this.checked&&(a||n)?w("div",{class:`${e}-switch__button-icon`,key:a?"checked-icon":"icon"},a||n):this.checked||!t&&!n?null:w("div",{class:`${e}-switch__button-icon`,key:t?"unchecked-icon":"icon"},t||n)}))))))),m(r,(n=>n&&w("div",{key:"checked",class:`${e}-switch__checked`},n))),m(l,(n=>n&&w("div",{key:"unchecked",class:`${e}-switch__unchecked`},n))))))}});export{R as N};
