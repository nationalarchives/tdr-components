(self.webpackChunk_nationalarchives_tdr_components=self.webpackChunk_nationalarchives_tdr_components||[]).push([[553],{"./src/nationalarchives/components/button-disabled/button-disabled.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>button_disabled_stories});var story=__webpack_require__("./src/nationalarchives/components/button-disabled/story.njk"),story_default=__webpack_require__.n(story);function _defineProperty(e,r,t){return(r=function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}(r))in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}class ButtonDisabled{constructor(button){_defineProperty(this,"initialiseListeners",(()=>{this.button.addEventListener("click",this.handleClick)})),_defineProperty(this,"handleClick",(ev=>{"true"===this.button.getAttribute("aria-disabled")&&ev.preventDefault()})),this.button=button}}const button_disabled_stories={title:"TDR/Button (disabled)",args:{label:"Continue",reasonDisabled:"Your files are currently being checked. Once completed you can continue with your transfer"},decorators:[storyFn=>{const wrapper=document.createElement("div"),doc=(new DOMParser).parseFromString(storyFn(),"text/html");return wrapper.append(...doc.body.children),document.addEventListener("DOMContentLoaded",(event=>{console.log("Dom content loaded, init");wrapper.querySelectorAll('[data-tdr-module="button-disabled"]').forEach((button=>{new ButtonDisabled(button).initialiseListeners()}))}),{once:!0}),wrapper}]},Default=(({label,...args})=>(args=>story_default()({params:{...args}}))({label,...args})).bind({});Default.args={};const __namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createButton({\n    label,\n    ...args\n  });\n}",...Default.parameters?.docs?.source}}}},"./src/nationalarchives/components/button-disabled/story.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={},__nunjucks_template_import__dep_0=__webpack_require__("./src/nationalarchives/components/button-disabled/template.njk");function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/button-disabled/story.njk",templateContext):nunjucks.render("src/nationalarchives/components/button-disabled/story.njk",templateContext)}__nunjucks_module_dependencies__.templates={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.templates},__nunjucks_module_dependencies__.globals={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.globals},__nunjucks_module_dependencies__.extensions={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.extensions},__nunjucks_module_dependencies__.filters={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.filters},__nunjucks_module_dependencies__.assets={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.assets},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/button-disabled/story.njk"]={root:function root(env,context,frame,runtime,cb){var lineno=0,colno=0,output="";try{var macro_t_1=runtime.makeMacro(["params"],[],(function(l_params,kwargs){var callerFrame=frame;frame=new runtime.Frame,kwargs=kwargs||{},Object.prototype.hasOwnProperty.call(kwargs,"caller")&&frame.set("caller",kwargs.caller),frame.set("params",l_params);var t_2="";t_2+="\n  ";var tasks=[];return tasks.push((function(callback){env.getTemplate("src/nationalarchives/components/button-disabled/template.njk",!1,"src/nationalarchives/components/button-disabled/story.njk",!1,(function(t_4,t_3){t_4?cb(t_4):callback(null,t_3)}))})),tasks.push((function(template,callback){template.render(context.getVariables(),frame,(function(t_6,t_5){t_6?cb(t_6):callback(null,t_5)}))})),tasks.push((function(result,callback){t_2+=result,callback(null)})),env.waterfall(tasks,(function(){t_2+="\n"})),frame=callerFrame,new runtime.SafeString(t_2)}));context.addExport("button"),context.setVariable("button",macro_t_1),output+="\n\n",output+=runtime.suppressValue((lineno=4,colno=9,runtime.callWrap(macro_t_1,"button",context,[runtime.contextOrFrameLookup(context,frame,"params")])),env.opts.autoescape),cb(null,output+="\n")}catch(e){cb(runtime.handleError(e,lineno,colno))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/button-disabled/story.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate},"./src/nationalarchives/components/button-disabled/template.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={};function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/button-disabled/template.njk",templateContext):nunjucks.render("src/nationalarchives/components/button-disabled/template.njk",templateContext)}__nunjucks_module_dependencies__.templates={},__nunjucks_module_dependencies__.globals={},__nunjucks_module_dependencies__.extensions={},__nunjucks_module_dependencies__.filters={},__nunjucks_module_dependencies__.assets={},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/button-disabled/template.njk"]={root:function root(env,context,frame,runtime,cb){var output="";try{output+='<button class="govuk-button govuk-button--disabled" data-tdr-module="button-disabled" data-module="govuk-button" aria-describedby="disabled-reason" aria-disabled="true">\n  ',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"label"),env.opts.autoescape),output+='\n</button>\n\n<p id="disabled-reason">',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"reasonDisabled"),env.opts.autoescape),cb(null,output+="</p>\n")}catch(e){cb(runtime.handleError(e,0,0))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/button-disabled/template.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate}}]);