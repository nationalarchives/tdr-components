(self.webpackChunk_nationalarchives_tdr_components=self.webpackChunk_nationalarchives_tdr_components||[]).push([[297],{"./src/nationalarchives/components/icon/icon.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});__webpack_require__("./src/nationalarchives/components/icon/_index.scss");var _story_njk__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/nationalarchives/components/icon/story.njk"),_story_njk__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_story_njk__WEBPACK_IMPORTED_MODULE_1__);const __WEBPACK_DEFAULT_EXPORT__={title:"TDR/Icon",args:{iconType:"cross",iconSize:"xl",fill:"#174E75"},argTypes:{iconType:{control:"select",options:["cross","check","chevron","download","exit","external-link","info","lock","person","quote","search","warning"]},iconSize:{control:"select",options:{Small:"s",Medium:"m",Large:"l","X Large":"xl","XX Large":"xxl","XXX Large":"xxxl"}}}},Default=(({...args})=>(args=>_story_njk__WEBPACK_IMPORTED_MODULE_1___default()({params:{...args}}))({...args})).bind({}),__namedExportsOrder=["Default"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  ...args\n}): string => {\n  return createCard({\n    ...args\n  });\n}",...Default.parameters?.docs?.source}}}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!./src/nationalarchives/components/icon/_index.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,"span.da-icon{display:inline-block}.da-icon{height:1rem;vertical-align:middle;width:1rem}.da-icon--xxxl{height:1.7rem;width:1.7rem}@media(min-width: 40.0625em){.da-icon--xxxl{height:2.6rem;width:2.6rem}}.da-icon--xxl{height:1.5rem;width:1.5rem}@media(min-width: 40.0625em){.da-icon--xxl{height:2rem;width:2rem}}.da-icon--xl{height:1.4rem;width:1.4rem}@media(min-width: 40.0625em){.da-icon--xl{height:1.6rem;width:1.6rem}}.da-icon--l{height:1.3rem;width:1.3rem}@media(min-width: 40.0625em){.da-icon--l{height:1.4rem;width:1.4rem}}.da-icon--m{height:1.1rem;width:1.1rem}@media(min-width: 40.0625em){.da-icon--m{height:1.2rem;width:1.2rem}}.da-icon--s{height:.7rem;width:.7rem}.da-icon--success{fill:green}","",{version:3,sources:["webpack://./src/nationalarchives/components/icon/_index.scss","webpack://./node_modules/govuk-frontend/dist/govuk/vendor/_sass-mq.scss"],names:[],mappings:"AAWA,aACE,oBAAA,CAGF,SACE,WAAA,CACA,qBAAA,CACA,UAAA,CAEA,eACE,aAAA,CACA,YAAA,CC8MI,6BDhNN,eAKI,aAAA,CACA,YAAA,CAAA,CAIJ,cACE,aAAA,CACA,YAAA,CCoMI,6BDtMN,cAKI,WAAA,CACA,UAAA,CAAA,CAIJ,aACE,aAAA,CACA,YAAA,CC0LI,6BD5LN,aAKI,aAAA,CACA,YAAA,CAAA,CAIJ,YACE,aAAA,CACA,YAAA,CCgLI,6BDlLN,YAKI,aAAA,CACA,YAAA,CAAA,CAIJ,YACE,aAAA,CACA,YAAA,CCsKI,6BDxKN,YAKI,aAAA,CACA,YAAA,CAAA,CAIJ,YACE,YAAA,CACA,WAAA,CAGF,kBACE,UAAA",sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{"use strict";module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./src/nationalarchives/components/icon/story.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={},__nunjucks_template_import__dep_0=__webpack_require__("./src/nationalarchives/components/icon/template.njk");function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/icon/story.njk",templateContext):nunjucks.render("src/nationalarchives/components/icon/story.njk",templateContext)}__nunjucks_module_dependencies__.templates={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.templates},__nunjucks_module_dependencies__.globals={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.globals},__nunjucks_module_dependencies__.extensions={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.extensions},__nunjucks_module_dependencies__.filters={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.filters},__nunjucks_module_dependencies__.assets={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.assets},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/icon/story.njk"]={root:function root(env,context,frame,runtime,cb){var lineno=0,colno=0,output="";try{var macro_t_1=runtime.makeMacro(["params"],[],(function(l_params,kwargs){var callerFrame=frame;frame=new runtime.Frame,kwargs=kwargs||{},Object.prototype.hasOwnProperty.call(kwargs,"caller")&&frame.set("caller",kwargs.caller),frame.set("params",l_params);var t_2="",tasks=[];return tasks.push((function(callback){env.getTemplate("src/nationalarchives/components/icon/template.njk",!1,"src/nationalarchives/components/icon/story.njk",!1,(function(t_4,t_3){t_4?cb(t_4):callback(null,t_3)}))})),tasks.push((function(template,callback){template.render(context.getVariables(),frame,(function(t_6,t_5){t_6?cb(t_6):callback(null,t_5)}))})),tasks.push((function(result,callback){t_2+=result,callback(null)})),env.waterfall(tasks,(function(){})),frame=callerFrame,new runtime.SafeString(t_2)}));context.addExport("icon"),context.setVariable("icon",macro_t_1),output+="\n\n",output+=runtime.suppressValue((lineno=4,colno=7,runtime.callWrap(macro_t_1,"icon",context,[runtime.contextOrFrameLookup(context,frame,"params")])),env.opts.autoescape),cb(null,output+="\n")}catch(e){cb(runtime.handleError(e,lineno,colno))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/icon/story.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate},"./src/nationalarchives/components/icon/template.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={};function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/icon/template.njk",templateContext):nunjucks.render("src/nationalarchives/components/icon/template.njk",templateContext)}__nunjucks_module_dependencies__.templates={},__nunjucks_module_dependencies__.globals={},__nunjucks_module_dependencies__.extensions={},__nunjucks_module_dependencies__.filters={},__nunjucks_module_dependencies__.assets={},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/icon/template.njk"]={root:function root(env,context,frame,runtime,cb){var output="";try{var t_1;runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"classes")&&(t_1=" "+runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"classes"),frame.set("iconClasses",t_1,!0),frame.topLevel&&context.setVariable("iconClasses",t_1),frame.topLevel&&context.addExport("iconClasses",t_1)),"cross"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M15.854 12.854 11 8l4.854-4.854a.503.503 0 0 0 0-.707L13.561.146a.499.499 0 0 0-.707 0L8 5 3.146.146a.5.5 0 0 0-.707 0L.146 2.439a.499.499 0 0 0 0 .707L5 8 .146 12.854a.5.5 0 0 0 0 .707l2.293 2.293a.499.499 0 0 0 .707 0L8 11l4.854 4.854a.5.5 0 0 0 .707 0l2.293-2.293a.499.499 0 0 0 0-.707"/>\n  </svg>'):"check"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 13 10" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M14.35,3.9l-.71-.71a.5.5,0,0,0-.71,0h0L5.79,10.34,3.07,7.61a.51.51,0,0,0-.71,0l-.71.71a.51.51,0,0,0,0,.71l3.78,3.78a.5.5,0,0,0,.71,0h0L14.35,4.6A.5.5,0,0,0,14.35,3.9Z" transform="translate(-1.51 -3.04)"/>\n  </svg>'):"chevron"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 8 13" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M5.74,14.28l-.57-.56a.5.5,0,0,1,0-.71h0l5-5-5-5a.5.5,0,0,1,0-.71h0l.57-.56a.5.5,0,0,1,.71,0h0l5.93,5.93a.5.5,0,0,1,0,.7L6.45,14.28a.5.5,0,0,1-.71,0Z" transform="translate(-5.02 -1.59)"/>\n  </svg>'):"download"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M5.6 9a.48.48 0 0 0 .7 0l3-3.2a.48.48 0 0 0 0-.7C9.3 5 9.2 5 9 5H7.5V.5A.47.47 0 0 0 7 0H5a.47.47 0 0 0-.5.5V5H3a.47.47 0 0 0-.5.5.37.37 0 0 0 .1.3Z" />\n    <path d="M11.5 9H11a.47.47 0 0 0-.5.5v1h-9v-1A.47.47 0 0 0 1 9H.5a.47.47 0 0 0-.5.5v2a.47.47 0 0 0 .5.5h11a.47.47 0 0 0 .5-.5v-2a.47.47 0 0 0-.5-.5Z" />\n  </svg>'):"exit"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M13.85,7.65l-2.5-2.5a.5.5,0,0,0-.71,0,.48.48,0,0,0-.15.36V7h-3a.5.5,0,0,0-.5.5v1a.5.5,0,0,0,.5.5h3v1.5A.49.49,0,0,0,11,11a.48.48,0,0,0,.34-.14l2.51-2.5a.49.49,0,0,0,0-.68Z" transform="translate(-2 -2)"/>\n    <path d="M8.5,14h-6a.5.5,0,0,1-.5-.5V2.5A.5.5,0,0,1,2.5,2h6a.5.5,0,0,1,.5.5V3a.5.5,0,0,1-.5.5h-5v9h5A.5.5,0,0,1,9,13v.5A.5.5,0,0,1,8.5,14Z" transform="translate(-2 -2)"/>\n  </svg>'):"external-link"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" focusable="false" aria-hidden=true role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M13.5,9H13a.5.5,0,0,0-.5.5v3h-9v-9h3A.5.5,0,0,0,7,3V2.5A.5.5,0,0,0,6.5,2h-4a.5.5,0,0,0-.5.5v11a.5.5,0,0,0,.5.5h11a.5.5,0,0,0,.5-.5v-4A.5.5,0,0,0,13.5,9Z" transform="translate(-2 -1.99)"/>\n    <path d="M8.83,7.88a.51.51,0,0,0,.71,0l2.31-2.32,1.28,1.28A.51.51,0,0,0,14,6.49v-4a.52.52,0,0,0-.5-.5h-4A.51.51,0,0,0,9,2.52a.58.58,0,0,0,.14.33l1.28,1.28L8.12,6.46a.51.51,0,0,0,0,.71Z" transform="translate(-2 -1.99)"/>\n  </svg>'):"info"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9 2 12t.788-3.9 2.137-3.175T8.1 2.788 12 2t3.9.788 3.175 2.137T21.213 8.1 22 12t-.788 3.9-2.137 3.175-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4 6.325 6.325 4 12t2.325 5.675T12 20m0-8"/>\n  </svg>'):"lock"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 10 13" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M12.25,6h-.72V4.49a3.5,3.5,0,0,0-7,0V6H3.75A.77.77,0,0,0,3,6.75v6.5a.77.77,0,0,0,.75.75h8.5a.77.77,0,0,0,.75-.75V6.75A.77.77,0,0,0,12.25,6ZM5.54,4.49a2.5,2.5,0,1,1,5,0V6h-5ZM9,11.66a.3.3,0,0,1-.26.34H7.29A.29.29,0,0,1,7,11.69v0l.39-1.82a1,1,0,1,1,1.4-.18.77.77,0,0,1-.18.18Z" transform="translate(-3 -0.99)"/>\n  </svg>'):"person"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M7,9H9a5,5,0,0,1,5,5H2A5,5,0,0,1,7,9Z" transform="translate(-2 -2)"/>\n    <circle cx="6" cy="3" r="3"/>\n  </svg>'):"quote"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='" id="da-icon-',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType"),env.opts.autoescape),output+='">\n    <path d="M13.44.77h-3l-2 4v6h6v-6h-3l2-4zm-8 0h-3l-2 4v6h6v-6h-3l2-4z" transform="translate(-0.44 -0.77)"/>\n  </svg>'):"search"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-search">\n    <path d="M11.86 10.23 8.62 6.99a4.63 4.63 0 1 0-6.34 1.64 4.55 4.55 0 0 0 2.36.64 4.65 4.65 0 0 0 2.33-.65l3.24 3.23a.46.46 0 0 0 .65 0l1-1a.48.48 0 0 0 0-.62Zm-5-3.32a3.28 3.28 0 0 1-2.31.93 3.22 3.22 0 1 1 2.35-.93Z"/>\n  </svg>'):"sort-sprite"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")?(output+='<svg id="sort-sprite',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"id")&&(output+="-",output+=runtime.suppressValue(env.getFilter("lower").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"id")),env.opts.autoescape)),output+='" class="da-icon',output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 12 19" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-sort-sprite">\n    <path d="M6 0l6 7.2H0L6 0zm0 18.6l6-7.2H0l6 7.2zm0 3.6l6 7.2H0l6-7.2z"/>\n    <path d="M6 18.6l6-7.2H0l6 7.2zm0 3.6l6 7.2H0l6-7.2z"/>\n  </svg>'):"warning"==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconType")&&(output+='<svg class="',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize")?(output+="da-icon da-icon--",output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"iconSize"),env.opts.autoescape)):output+="da-icon",output+=runtime.suppressValue(runtime.contextOrFrameLookup(context,frame,"iconClasses"),env.opts.autoescape),output+='" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg" focusable="false" fill="',output+=runtime.suppressValue(env.getFilter("d").call(context,runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"fill"),"currentColor",!0),env.opts.autoescape),output+='" role="img" title="da-icon-warning">\n    <g clip-path="url(#a)">\n      <path d="M11.5 0C17.851 0 23 5.149 23 11.5S17.851 23 11.5 23 0 17.851 0 11.5 5.149 0 11.5 0Zm0 2.3a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4Z"/>\n      <path d="M11.5 4c-.208 0-.414.046-.605.135-.19.09-.362.221-.502.385-.141.164-.248.358-.315.568-.066.21-.09.434-.072.655l.6 7.01a.982.982 0 0 0 .293.613.87.87 0 0 0 .602.246.87.87 0 0 0 .602-.246.982.982 0 0 0 .293-.612l.598-7.011a1.697 1.697 0 0 0-.072-.654 1.623 1.623 0 0 0-.314-.568 1.506 1.506 0 0 0-.502-.385A1.421 1.421 0 0 0 11.5 4Zm0 14c.35 0 .684-.148.93-.41.246-.263.385-.619.385-.99s-.139-.727-.385-.99a1.274 1.274 0 0 0-.93-.41c-.348 0-.682.148-.928.41a1.448 1.448 0 0 0-.385.99c0 .371.138.727.385.99.246.262.58.41.929.41Z"/>\n    </g>\n    <defs>\n      <clipPath>\n        <path fill="#fff" d="M0 0h23v23H0z"/>\n      </clipPath>\n    </defs>\n  </svg>\n'),cb(null,output)}catch(e){cb(runtime.handleError(e,0,0))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/icon/template.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate},"./src/nationalarchives/components/icon/_index.scss":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__),_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__),_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__),_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__),_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default=__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__),_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!./src/nationalarchives/components/icon/_index.scss"),options={};options.styleTagTransform=_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default(),options.setAttributes=_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default(),options.insert=_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null,"head"),options.domAPI=_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default(),options.insertStyleElement=_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default();_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__.A,options),_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__.A&&_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__.A.locals&&_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_14_use_2_index_scss__WEBPACK_IMPORTED_MODULE_6__.A.locals},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{"use strict";var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{"use strict";var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{"use strict";module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{"use strict";module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{"use strict";module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{"use strict";module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}}}]);