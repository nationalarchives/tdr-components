(self.webpackChunk_nationalarchives_tdr_components=self.webpackChunk_nationalarchives_tdr_components||[]).push([[73],{"./src/nationalarchives/components/header/header.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,SignedIn:()=>SignedIn,WithHiddenMenu:()=>WithHiddenMenu,__namedExportsOrder:()=>__namedExportsOrder,default:()=>header_stories});var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),_index=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!./src/nationalarchives/components/header/_index.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(_index.A,options);_index.A&&_index.A.locals&&_index.A.locals;var story=__webpack_require__("./src/nationalarchives/components/header/story.njk"),story_default=__webpack_require__.n(story);__webpack_require__("./node_modules/govuk-frontend/govuk-esm/vendor/polyfills/Window.mjs"),__webpack_require__("./node_modules/govuk-frontend/govuk-esm/vendor/polyfills/Document.mjs");(function(undefined){"Element"in this&&"HTMLElement"in this||function(){if(!window.Element||window.HTMLElement){window.Element=window.HTMLElement=new Function("return function Element() {}")();var interval,vbody=document.appendChild(document.createElement("body")),frameDocument=vbody.appendChild(document.createElement("iframe")).contentWindow.document,prototype=Element.prototype=frameDocument.appendChild(frameDocument.createElement("*")),cache={},shiv=function(element,deep){var key,value,childNode,childNodes=element.childNodes||[],index=-1;if(1===element.nodeType&&element.constructor!==Element)for(key in element.constructor=Element,cache)value=cache[key],element[key]=value;for(;childNode=deep&&childNodes[++index];)shiv(childNode,deep);return element},elements=document.getElementsByTagName("*"),nativeCreateElement=document.createElement,loopLimit=100;prototype.attachEvent("onpropertychange",(function(event){for(var element,propertyName=event.propertyName,nonValue=!cache.hasOwnProperty(propertyName),newValue=prototype[propertyName],oldValue=cache[propertyName],index=-1;element=elements[++index];)1===element.nodeType&&(nonValue||element[propertyName]===oldValue)&&(element[propertyName]=newValue);cache[propertyName]=newValue})),prototype.constructor=Element,prototype.hasAttribute||(prototype.hasAttribute=function hasAttribute(name){return null!==this.getAttribute(name)}),bodyCheck()||(document.onreadystatechange=bodyCheck,interval=setInterval(bodyCheck,25)),document.createElement=function createElement(nodeName){var element=nativeCreateElement(String(nodeName).toLowerCase());return shiv(element)},document.removeChild(vbody)}else window.HTMLElement=window.Element;function bodyCheck(){return loopLimit--||clearTimeout(interval),!(!document.body||document.body.prototype||!/(complete|interactive)/.test(document.readyState))&&(shiv(document,!0),interval&&document.body.prototype&&clearTimeout(interval),!!document.body.prototype)}}()}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{});__webpack_require__("./node_modules/govuk-frontend/govuk-esm/vendor/polyfills/Object/defineProperty.mjs");function Header($module){if(!($module instanceof HTMLElement))return this;this.$module=$module,this.$menuButton=$module.querySelector(".govuk-js-header-toggle"),this.$menu=this.$menuButton&&$module.querySelector("#"+this.$menuButton.getAttribute("aria-controls")),this.menuIsOpen=!1,this.mql=null}(function(undefined){(function(global){if(!("Event"in global))return!1;if("function"==typeof global.Event)return!0;try{return new Event("click"),!0}catch(e){return!1}})(this)||function(){var unlistenableWindowEvents={click:1,dblclick:1,keyup:1,keypress:1,keydown:1,mousedown:1,mouseup:1,mousemove:1,mouseover:1,mouseenter:1,mouseleave:1,mouseout:1,storage:1,storagecommit:1,textinput:1};if("undefined"!=typeof document&&"undefined"!=typeof window){var existingProto=window.Event&&window.Event.prototype||null;window.Event=Window.prototype.Event=function Event(type,eventInitDict){if(!type)throw new Error("Not enough arguments");var event;if("createEvent"in document){event=document.createEvent("Event");var bubbles=!(!eventInitDict||eventInitDict.bubbles===undefined)&&eventInitDict.bubbles,cancelable=!(!eventInitDict||eventInitDict.cancelable===undefined)&&eventInitDict.cancelable;return event.initEvent(type,bubbles,cancelable),event}return(event=document.createEventObject()).type=type,event.bubbles=!(!eventInitDict||eventInitDict.bubbles===undefined)&&eventInitDict.bubbles,event.cancelable=!(!eventInitDict||eventInitDict.cancelable===undefined)&&eventInitDict.cancelable,event},existingProto&&Object.defineProperty(window.Event,"prototype",{configurable:!1,enumerable:!1,writable:!0,value:existingProto}),"createEvent"in document||(window.addEventListener=Window.prototype.addEventListener=Document.prototype.addEventListener=Element.prototype.addEventListener=function addEventListener(){var element=this,type=arguments[0],listener=arguments[1];if(element===window&&type in unlistenableWindowEvents)throw new Error("In IE8 the event: "+type+" is not available on the window object. Please see https://github.com/Financial-Times/polyfill-service/issues/317 for more information.");element._events||(element._events={}),element._events[type]||(element._events[type]=function(event){var eventElement,list=element._events[event.type].list,events=list.slice(),index=-1,length=events.length;for(event.preventDefault=function preventDefault(){!1!==event.cancelable&&(event.returnValue=!1)},event.stopPropagation=function stopPropagation(){event.cancelBubble=!0},event.stopImmediatePropagation=function stopImmediatePropagation(){event.cancelBubble=!0,event.cancelImmediate=!0},event.currentTarget=element,event.relatedTarget=event.fromElement||null,event.target=event.target||event.srcElement||element,event.timeStamp=(new Date).getTime(),event.clientX&&(event.pageX=event.clientX+document.documentElement.scrollLeft,event.pageY=event.clientY+document.documentElement.scrollTop);++index<length&&!event.cancelImmediate;)index in events&&-1!==indexOf(list,eventElement=events[index])&&"function"==typeof eventElement&&eventElement.call(element,event)},element._events[type].list=[],element.attachEvent&&element.attachEvent("on"+type,element._events[type])),element._events[type].list.push(listener)},window.removeEventListener=Window.prototype.removeEventListener=Document.prototype.removeEventListener=Element.prototype.removeEventListener=function removeEventListener(){var index,type=arguments[0],listener=arguments[1];this._events&&this._events[type]&&this._events[type].list&&-1!==(index=indexOf(this._events[type].list,listener))&&(this._events[type].list.splice(index,1),this._events[type].list.length||(this.detachEvent&&this.detachEvent("on"+type,this._events[type]),delete this._events[type]))},window.dispatchEvent=Window.prototype.dispatchEvent=Document.prototype.dispatchEvent=Element.prototype.dispatchEvent=function dispatchEvent(event){if(!arguments.length)throw new Error("Not enough arguments");if(!event||"string"!=typeof event.type)throw new Error("DOM Events Exception 0");var element=this,type=event.type;try{if(!event.bubbles){event.cancelBubble=!0;var cancelBubbleEvent=function(event){event.cancelBubble=!0,(element||window).detachEvent("on"+type,cancelBubbleEvent)};this.attachEvent("on"+type,cancelBubbleEvent)}this.fireEvent("on"+type,event)}catch(error){event.target=element;do{event.currentTarget=element,"_events"in element&&"function"==typeof element._events[type]&&element._events[type].call(element,event),"function"==typeof element["on"+type]&&element["on"+type].call(element,event),element=9===element.nodeType?element.parentWindow:element.parentNode}while(element&&!event.cancelBubble)}return!0},document.attachEvent("onreadystatechange",(function(){"complete"===document.readyState&&document.dispatchEvent(new Event("DOMContentLoaded",{bubbles:!0}))})))}function indexOf(array,element){for(var index=-1,length=array.length;++index<length;)if(index in array&&array[index]===element)return index;return-1}}()}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),function(undefined){"bind"in Function.prototype||Object.defineProperty(Function.prototype,"bind",{value:function bind(that){var isCallable,$Array=Array,$Object=Object,ObjectPrototype=$Object.prototype,ArrayPrototype=$Array.prototype,Empty=function Empty(){},to_string=ObjectPrototype.toString,hasToStringTag="function"==typeof Symbol&&"symbol"==typeof Symbol.toStringTag,fnToStr=Function.prototype.toString;isCallable=function isCallable(value){if("function"!=typeof value)return!1;if(hasToStringTag)return function tryFunctionObject(value){try{return fnToStr.call(value),!0}catch(e){return!1}}(value);var strClass=to_string.call(value);return"[object Function]"===strClass||"[object GeneratorFunction]"===strClass};var array_slice=ArrayPrototype.slice,array_concat=ArrayPrototype.concat,array_push=ArrayPrototype.push,max=Math.max,target=this;if(!isCallable(target))throw new TypeError("Function.prototype.bind called on incompatible "+target);for(var bound,args=array_slice.call(arguments,1),boundLength=max(0,target.length-args.length),boundArgs=[],i=0;i<boundLength;i++)array_push.call(boundArgs,"$"+i);return bound=Function("binder","return function ("+boundArgs.join(",")+"){ return binder.apply(this, arguments); }")((function(){if(this instanceof bound){var result=target.apply(this,array_concat.call(args,array_slice.call(arguments)));return $Object(result)===result?result:this}return target.apply(that,array_concat.call(args,array_slice.call(arguments)))})),target.prototype&&(Empty.prototype=target.prototype,bound.prototype=new Empty,Empty.prototype=null),bound}})}.call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{}),Header.prototype.init=function(){this.$module&&this.$menuButton&&this.$menu&&("matchMedia"in window?(this.mql=window.matchMedia("(min-width: 48.0625em)"),"addEventListener"in this.mql?this.mql.addEventListener("change",this.syncState.bind(this)):this.mql.addListener(this.syncState.bind(this)),this.syncState(),this.$menuButton.addEventListener("click",this.handleMenuButtonClick.bind(this))):this.$menuButton.setAttribute("hidden",""))},Header.prototype.syncState=function(){this.mql.matches?(this.$menu.removeAttribute("hidden"),this.$menuButton.setAttribute("hidden","")):(this.$menuButton.removeAttribute("hidden"),this.$menuButton.setAttribute("aria-expanded",this.menuIsOpen.toString()),this.menuIsOpen?this.$menu.removeAttribute("hidden"):this.$menu.setAttribute("hidden",""))},Header.prototype.handleMenuButtonClick=function(){this.menuIsOpen=!this.menuIsOpen,this.syncState()};const header_header=Header,header_stories={title:"TDR/Header",parameters:{layout:"fullscreen"},args:{isSignedIn:!1},argTypes:{isSignedIn:{description:"Is the header showing the signed-in menu items?"}},decorators:[storyFn=>{const wrapper=document.createElement("div");wrapper.classList.add("js-enabled");const doc=(new DOMParser).parseFromString(storyFn(),"text/html");wrapper.append(...doc.body.children);const header=wrapper.querySelector('[data-module="govuk-header"]');return null!==header&&new header_header(header).init(),wrapper}]},Template=({label,...args})=>(args=>story_default()({params:{...args}}))({label,...args}),Default=Template.bind({}),SignedIn=Template.bind({});SignedIn.args={isSignedIn:!0};const WithHiddenMenu=Template.bind({});WithHiddenMenu.args={isSignedIn:!0,withHiddenMenu:!0},WithHiddenMenu.argTypes={withHiddenMenu:{description:"If there is more than one menu item, use the hidden menu feature"}};const __namedExportsOrder=["Default","SignedIn","WithHiddenMenu"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...Default.parameters?.docs?.source}}},SignedIn.parameters={...SignedIn.parameters,docs:{...SignedIn.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...SignedIn.parameters?.docs?.source}}},WithHiddenMenu.parameters={...WithHiddenMenu.parameters,docs:{...WithHiddenMenu.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...WithHiddenMenu.parameters?.docs?.source}}}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!./src/nationalarchives/components/header/_index.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".govuk-header__link svg{vertical-align:top}.govuk-header__content--nav-right nav{float:right}","",{version:3,sources:["webpack://./src/nationalarchives/components/header/_index.scss"],names:[],mappings:"AAMA,wBACE,kBAAA,CAGF,sCACE,WAAA",sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{"use strict";module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/govuk-frontend/govuk-esm/vendor/polyfills/Document.mjs":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{(function(undefined){"Document"in this||"undefined"==typeof WorkerGlobalScope&&"function"!=typeof importScripts&&(this.HTMLDocument?this.Document=this.HTMLDocument:(this.Document=this.HTMLDocument=document.constructor=new Function("return function Document() {}")(),this.Document.prototype=document))}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{})},"./node_modules/govuk-frontend/govuk-esm/vendor/polyfills/Object/defineProperty.mjs":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{(function(undefined){var nativeDefineProperty,supportsAccessors,ERR_VALUE_ACCESSORS;"defineProperty"in Object&&function(){try{return Object.defineProperty({},"test",{value:42}),!0}catch(e){return!1}}()||(nativeDefineProperty=Object.defineProperty,supportsAccessors=Object.prototype.hasOwnProperty("__defineGetter__"),ERR_VALUE_ACCESSORS="A property cannot both have accessors and be writable or have a value",Object.defineProperty=function defineProperty(object,property,descriptor){if(nativeDefineProperty&&(object===window||object===document||object===Element.prototype||object instanceof Element))return nativeDefineProperty(object,property,descriptor);if(null===object||!(object instanceof Object||"object"==typeof object))throw new TypeError("Object.defineProperty called on non-object");if(!(descriptor instanceof Object))throw new TypeError("Property description must be an object");var propertyString=String(property),hasValueOrWritable="value"in descriptor||"writable"in descriptor,getterType="get"in descriptor&&typeof descriptor.get,setterType="set"in descriptor&&typeof descriptor.set;if(getterType){if("function"!==getterType)throw new TypeError("Getter must be a function");if(!supportsAccessors)throw new TypeError("Getters & setters cannot be defined on this javascript engine");if(hasValueOrWritable)throw new TypeError(ERR_VALUE_ACCESSORS);Object.__defineGetter__.call(object,propertyString,descriptor.get)}else object[propertyString]=descriptor.value;if(setterType){if("function"!==setterType)throw new TypeError("Setter must be a function");if(!supportsAccessors)throw new TypeError("Getters & setters cannot be defined on this javascript engine");if(hasValueOrWritable)throw new TypeError(ERR_VALUE_ACCESSORS);Object.__defineSetter__.call(object,propertyString,descriptor.set)}return"value"in descriptor&&(object[propertyString]=descriptor.value),object})}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{})},"./node_modules/govuk-frontend/govuk-esm/vendor/polyfills/Window.mjs":(__unused_webpack_module,__unused_webpack_exports,__webpack_require__)=>{(function(undefined){"Window"in this||"undefined"==typeof WorkerGlobalScope&&"function"!=typeof importScripts&&function(global){global.constructor?global.Window=global.constructor:(global.Window=global.constructor=new Function("return function Window() {}")()).prototype=this}(this)}).call("object"==typeof window&&window||"object"==typeof self&&self||"object"==typeof __webpack_require__.g&&__webpack_require__.g||{})},"./src/nationalarchives/components/header/story.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={},__nunjucks_template_import__dep_0=__webpack_require__("./src/nationalarchives/components/header/template.njk");function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/header/story.njk",templateContext):nunjucks.render("src/nationalarchives/components/header/story.njk",templateContext)}__nunjucks_module_dependencies__.templates={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.templates},__nunjucks_module_dependencies__.globals={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.globals},__nunjucks_module_dependencies__.extensions={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.extensions},__nunjucks_module_dependencies__.filters={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.filters},__nunjucks_module_dependencies__.assets={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.assets},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/story.njk"]={root:function root(env,context,frame,runtime,cb){var lineno=0,colno=0,output="";try{var macro_t_1=runtime.makeMacro(["params"],[],(function(l_params,kwargs){var callerFrame=frame;frame=new runtime.Frame,kwargs=kwargs||{},Object.prototype.hasOwnProperty.call(kwargs,"caller")&&frame.set("caller",kwargs.caller),frame.set("params",l_params);var t_2="",tasks=[];return tasks.push((function(callback){env.getTemplate("src/nationalarchives/components/header/template.njk",!1,"src/nationalarchives/components/header/story.njk",!1,(function(t_4,t_3){t_4?cb(t_4):callback(null,t_3)}))})),tasks.push((function(template,callback){template.render(context.getVariables(),frame,(function(t_6,t_5){t_6?cb(t_6):callback(null,t_5)}))})),tasks.push((function(result,callback){t_2+=result,callback(null)})),env.waterfall(tasks,(function(){})),frame=callerFrame,new runtime.SafeString(t_2)}));context.addExport("header"),context.setVariable("header",macro_t_1),output+="\n\n",output+=runtime.suppressValue((lineno=4,colno=9,runtime.callWrap(macro_t_1,"header",context,[runtime.contextOrFrameLookup(context,frame,"params")])),env.opts.autoescape),cb(null,output+="\n")}catch(e){cb(runtime.handleError(e,lineno,colno))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/story.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate},"./src/nationalarchives/components/header/template.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={};function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/header/template.njk",templateContext):nunjucks.render("src/nationalarchives/components/header/template.njk",templateContext)}__nunjucks_module_dependencies__.templates={},__nunjucks_module_dependencies__.globals={},__nunjucks_module_dependencies__.extensions={},__nunjucks_module_dependencies__.filters={},__nunjucks_module_dependencies__.assets={},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/template.njk"]={root:function root(env,context,frame,runtime,cb){var output="";try{output+='<header class="govuk-header" role="banner" ',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"withHiddenMenu")&&(output+='data-module="govuk-header"'),output+='>\n  <div class="govuk-header__container govuk-width-container">\n    <div class="govuk-header__logo">\n      <a href="/" class="govuk-header__link govuk-header__link--homepage">\n        <svg xmlns="http://www.w3.org/2000/svg" width="220" viewBox="0 0 250 35">\n          <title>The National Archives</title>\n          <g clip-path="url(#a)">\n            <path fill="currentColor" d="M1.17 1.17h48.58v31.97H1.17V1.17ZM0 0v34.31h50.92V0H0Z"/>\n            <path fill="currentColor" d="M13.41 12.33h-3.4v-1.91H19v1.91h-3.4V23.9h-2.19V12.33ZM19.86 10.42h2.19v5.68h5.24v-5.68h2.19V23.9h-2.19v-5.86h-5.24v5.86h-2.19V10.42ZM32 10.42h7.72v1.89h-5.53v3.81h4.63v1.9h-4.63v3.96h5.53v1.92H32V10.42ZM50.91 1.17h98.33v31.97H50.91V1.17ZM49.74 0v34.31h100.67V0H49.74Z"/>\n            <path fill="currentColor" d="M62.14 10.42h2.36l4.03 7.89c.35.68.72 1.72 1.04 2.54h.14c-.14-1.09-.21-2.25-.21-3.01v-7.42h2.17V23.9h-2.35l-3.97-7.75c-.43-.86-.74-1.68-1.09-2.64h-.14c.1.86.21 2.11.21 3.14v7.25h-2.19V10.42ZM79.78 18.8l-1.06-3.95c-.2-.7-.35-1.39-.55-2.38h-.12c-.19.98-.31 1.62-.53 2.38l-1.07 3.95h3.33Zm-2.99-8.38h2.66l3.89 13.48h-2.23l-.92-3.28h-4.14l-.9 3.28h-2.27l3.91-13.48ZM85.7 12.33h-3.4v-1.91h8.99v1.91h-3.4V23.9H85.7V12.33ZM94.59 10.42H92.4V23.9h2.19V10.42ZM104.8 17.18c0-3.32-1.04-5.04-3.03-5.04-2.01 0-3.03 1.72-3.03 5.04 0 3.3 1.02 5 3.03 5 2 0 3.03-1.7 3.03-5Zm-8.36 0c0-4.39 1.92-6.95 5.34-6.95 3.4 0 5.32 2.56 5.32 6.95 0 4.37-1.92 6.91-5.32 6.91-3.43 0-5.34-2.54-5.34-6.91ZM109.06 10.42h2.36l4.03 7.89c.35.68.72 1.72 1.04 2.54h.14c-.14-1.09-.21-2.25-.21-3.01v-7.42h2.17V23.9h-2.35l-3.97-7.75c-.43-.86-.74-1.68-1.09-2.64h-.14c.1.86.21 2.11.21 3.14v7.25h-2.19V10.42ZM126.75 18.8l-1.06-3.95c-.2-.7-.35-1.39-.55-2.38h-.12c-.2.98-.31 1.62-.53 2.38l-1.07 3.95h3.33Zm-2.99-8.38h2.66l3.89 13.48h-2.23l-.92-3.28h-4.14l-.9 3.28h-2.27l3.91-13.48ZM131.49 10.42h2.19v11.56h5.26v1.92h-7.45V10.42ZM150.43 1.17h98.33v31.97h-98.33V1.17Zm-1.18 33.15h100.67V0H149.25v34.32Z"/>\n            <path fill="currentColor" d="m166.17 18.76-1.06-3.95c-.2-.7-.35-1.39-.55-2.38h-.12c-.2.98-.31 1.62-.53 2.38l-1.07 3.95h3.33Zm-2.99-8.38h2.66l3.89 13.48h-2.23l-.92-3.28h-4.14l-.9 3.28h-2.27l3.91-13.48ZM174.38 17.08c1.58 0 2.13-1.02 2.13-2.42 0-1.37-.61-2.42-2.13-2.42h-1.68v4.84h1.68Zm-3.85-6.7h4.03c2.85 0 4.22 1.54 4.22 4.14 0 1.95-.94 3.52-2.33 3.94v.12c.64.72 2.5 4.75 3.01 4.96v.31h-2.36c-.63-.35-2.29-4.53-2.8-4.88h-1.58v4.88h-2.19V10.38ZM182.52 17.08c0 3.36 1.17 5.06 2.99 5.06 1.8 0 2.52-1.27 2.5-3.26l2.19.08c.02.1.04.27.04.37 0 2.77-1.35 4.73-4.71 4.73-3.24 0-5.34-2.44-5.34-6.97 0-4.43 2.09-6.89 5.34-6.89 4.05 0 4.73 2.91 4.73 4.53 0 .2-.02.45-.04.57l-2.21.08c.02-2.07-.72-3.26-2.5-3.26-1.8-.02-2.99 1.72-2.99 4.96ZM192.03 10.38h2.19v5.68h5.23v-5.68h2.19v13.48h-2.19V18h-5.23v5.86h-2.19V10.38ZM206.73 10.38h-2.19v13.48h2.19V10.38ZM208.5 10.38h2.29l2.03 7.75c.31 1.21.49 2.28.7 3.53h.16c.22-1.27.39-2.32.7-3.53l2.01-7.75h2.29l-3.81 13.48h-2.56l-3.81-13.48Z"/>\n            <path fill="currentColor" d="M220.18 10.38h7.72v1.9h-5.53v3.8H227v1.9h-4.63v3.96h5.53v1.92h-7.72V10.38ZM231.32 19.29c-.02.16-.04.33-.04.49 0 1.21.49 2.34 2.15 2.34 1.35 0 2.07-.74 2.07-1.82 0-.98-.43-1.54-1.41-1.89l-2.17-.8c-1.52-.57-2.66-1.54-2.66-3.61 0-2.23 1.47-3.81 4.16-3.81 3.44 0 4.05 2.27 4.05 3.69 0 .21-.02.45-.06.66l-2.15.04c.02-.14.04-.33.04-.47 0-1.05-.37-1.99-1.92-1.99-1.31 0-1.9.78-1.9 1.78 0 1.09.59 1.56 1.39 1.86l2.21.8c1.66.61 2.68 1.66 2.68 3.63 0 2.27-1.5 3.87-4.4 3.87-3.69 0-4.3-2.46-4.3-4.06 0-.19.02-.41.06-.62l2.2-.09Z"/>\n          </g>\n          <defs>\n            <clipPath id="a">\n              <path fill="currentColor" d="M0 0h249.93v34.48H0z"/>\n            </clipPath>\n          </defs>\n        </svg>\n        <span class="govuk-visually-hidden">\n          The National Archives\n        </span>\n      </a>\n    </div>\n    <div class="govuk-header__content',0==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"withHiddenMenu")&&(output+=" govuk-header__content--nav-right"),output+='">\n      <a href="/" class="govuk-header__link govuk-header__service-name">\n          Transfer Digital Records\n      </a>\n      ',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"isSignedIn")&&(output+='\n        <nav aria-label="Menu" class="govuk-header__navigation govuk-header__navigation--end">\n          <button type="button" class="govuk-header__menu-button govuk-js-header-toggle" aria-controls="navigation" aria-label="Show or hide menu" hidden>Menu</button>\n          <ul id="navigation" class="govuk-header__navigation-list">\n            ',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"withHiddenMenu")&&(output+='\n              <li class="govuk-header__navigation-item">\n                <a class="govuk-header__link" href="#">\n                View transfers\n              </a>\n              </li>\n            '),output+='\n            <li class="govuk-header__navigation-item">\n              <a class="govuk-header__link" href="#">\n              Sign out\n            </a>\n            </li>\n          </ul>\n        </nav>\n      '),cb(null,output+="\n    </div>\n  </div>\n</header>\n")}catch(e){cb(runtime.handleError(e,0,0))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/template.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{"use strict";var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{"use strict";var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{"use strict";module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{"use strict";module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{"use strict";module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}}}]);