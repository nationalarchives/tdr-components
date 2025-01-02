(self.webpackChunk_nationalarchives_tdr_components=self.webpackChunk_nationalarchives_tdr_components||[]).push([[73],{"./src/nationalarchives/components/header/header.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,SignInOnly:()=>SignInOnly,WithExtraServiceMenu:()=>WithExtraServiceMenu,WithMenuItemsInMainHeader:()=>WithMenuItemsInMainHeader,__namedExportsOrder:()=>__namedExportsOrder,default:()=>header_stories});var injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),_index=__webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!./src/nationalarchives/components/header/_index.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(_index.A,options);_index.A&&_index.A.locals&&_index.A.locals;var story=__webpack_require__("./src/nationalarchives/components/header/story.njk"),story_default=__webpack_require__.n(story),header_header=__webpack_require__("./node_modules/govuk-frontend/dist/govuk/components/header/header.mjs"),service_navigation=__webpack_require__("./node_modules/govuk-frontend/dist/govuk/components/service-navigation/service-navigation.mjs");const header_stories={title:"TDR/Header",parameters:{layout:"fullscreen"},args:{serviceName:"Transfer Digital Records",showSignIn:!1},argTypes:{showSignIn:{description:"Show or hide the 'Sign in' link"}},decorators:[storyFn=>{const wrapper=document.createElement("div"),doc=(new DOMParser).parseFromString(storyFn(),"text/html");wrapper.append(...doc.body.children);const header=wrapper.querySelector('[data-module="govuk-header"]');null!==header&&setTimeout((()=>{new header_header.Y(header)}),0);const serviceNavigation=wrapper.querySelector('[data-module="govuk-service-navigation"]');return null!==serviceNavigation&&setTimeout((()=>{new service_navigation.Y(serviceNavigation)}),0),wrapper}]},Template=({label,...args})=>(args=>story_default()({params:{...args}}))({label,...args}),Default=Template.bind({}),SignInOnly=Template.bind({});SignInOnly.args={showSignIn:!0};const WithMenuItemsInMainHeader=Template.bind({});WithMenuItemsInMainHeader.args={showSignIn:!0,showMenu:!0,menuItems:["Account","Transfers"]},WithMenuItemsInMainHeader.argTypes={menuItems:{description:"If there is any menu items, we hide the menu on smaller viewports",control:"array"}};const WithExtraServiceMenu=Template.bind({});WithExtraServiceMenu.args={showSignIn:!0,showMenu:!1,showExtraServiceMenu:!0,menuItems:["Account","Transfers","Guidance"]};const __namedExportsOrder=["Default","SignInOnly","WithMenuItemsInMainHeader","WithExtraServiceMenu"];Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...Default.parameters?.docs?.source}}},SignInOnly.parameters={...SignInOnly.parameters,docs:{...SignInOnly.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...SignInOnly.parameters?.docs?.source}}},WithMenuItemsInMainHeader.parameters={...WithMenuItemsInMainHeader.parameters,docs:{...WithMenuItemsInMainHeader.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...WithMenuItemsInMainHeader.parameters?.docs?.source}}},WithExtraServiceMenu.parameters={...WithExtraServiceMenu.parameters,docs:{...WithExtraServiceMenu.parameters?.docs,source:{originalSource:"({\n  label,\n  ...args\n}): string => {\n  return createHeader({\n    label,\n    ...args\n  });\n}",...WithExtraServiceMenu.parameters?.docs?.source}}}},"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[14].use[2]!./src/nationalarchives/components/header/_index.scss":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".govuk-header__logo{margin-bottom:0;padding:0;flex:none;float:none;height:5rem;width:5rem}.govuk-header__link{display:block;padding-right:0;align-self:flex-start}.govuk-header__link--homepage:focus,.govuk-header__link--homepage:hover,.govuk-header__link--homepage:active{text-decoration:none;outline:.3125rem #fff solid;outline-offset:2px;border-radius:.1px;border:0}.govuk-header__link svg{font-size:0;width:100%;height:100%}.govuk-header__content{width:100%;float:none;justify-content:space-between;align-self:flex-end}.govuk-header__navigation{align-self:flex-end}.govuk-header__navigation--top-right{position:absolute;right:0;top:0}@media(min-width: 48.0625em){.govuk-header__container{display:flex}.govuk-header__content{display:flex}}","",{version:3,sources:["webpack://./src/nationalarchives/components/header/_index.scss","webpack://./node_modules/govuk-frontend/dist/govuk/vendor/_sass-mq.scss"],names:[],mappings:"AAMA,oBACE,eAAA,CACA,SAAA,CACA,SAAA,CACA,UAAA,CACA,WAAA,CACA,UAAA,CAGF,oBACE,aAAA,CACA,eAAA,CACA,qBAAA,CAGF,6GAGE,oBAAA,CACA,2BAAA,CACA,kBAAA,CACA,kBAAA,CACA,QAAA,CAGF,wBACE,WAAA,CACA,UAAA,CACA,WAAA,CAGF,uBACE,UAAA,CACA,UAAA,CACA,6BAAA,CACA,mBAAA,CAGF,0BACE,mBAAA,CAGF,qCACE,iBAAA,CACA,OAAA,CACA,KAAA,CCiLM,6BD7KN,yBACE,YAAA,CAGF,uBACE,YAAA,CAAA",sourcesContent:['\n              @import "govuk-frontend/dist/govuk/base";\n              @import "govuk-frontend/dist/govuk/settings/all";\n              @import "govuk-frontend/dist/govuk/tools/all";\n              @import "govuk-frontend/dist/govuk/helpers/all";\n            \n.govuk-header__logo {\n  margin-bottom: 0;\n  padding: 0;\n  flex: none;\n  float: none;\n  height: 5rem;\n  width: 5rem;\n}\n\n.govuk-header__link {\n  display: block;\n  padding-right: 0;\n  align-self: flex-start;\n}\n\n.govuk-header__link--homepage:focus,\n.govuk-header__link--homepage:hover,\n.govuk-header__link--homepage:active {\n  text-decoration: none;\n  outline: 0.3125rem #fff solid;\n  outline-offset: 2px;\n  border-radius: 0.1px;\n  border: 0;\n}\n\n.govuk-header__link svg {\n  font-size: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.govuk-header__content {\n  width: 100%;\n  float: none;\n  justify-content: space-between;\n  align-self: flex-end;\n}\n\n.govuk-header__navigation {\n  align-self: flex-end;\n}\n\n.govuk-header__navigation--top-right {\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n@include govuk-media-query($from: desktop) {\n  .govuk-header__container {\n    display: flex;\n  }\n\n  .govuk-header__content {\n    display: flex;\n  }\n}\n',"// mq() v4.0.2\n// sass-mq/sass-mq\n\n@charset \"UTF-8\"; // Fixes an issue where Ruby locale is not set properly\n                  // See https://github.com/sass-mq/sass-mq/pull/10\n\n/// Base font size on the `<body>` element\n/// @type Number (unit)\n$mq-base-font-size: 16px !default;\n\n/// Responsive mode\n///\n/// Set to `false` to enable support for browsers that do not support @media queries,\n/// (IE <= 8, Firefox <= 3, Opera <= 9)\n///\n/// You could create a stylesheet served exclusively to older browsers,\n/// where @media queries are rasterized\n///\n/// @example scss\n///  // old-ie.scss\n///  $mq-responsive: false;\n///  @import 'main'; // @media queries in this file will be rasterized up to $mq-static-breakpoint\n///                   // larger breakpoints will be ignored\n///\n/// @type Boolean\n/// @link https://github.com/sass-mq/sass-mq#responsive-mode-off Disabled responsive mode documentation\n$mq-responsive: true !default;\n\n/// Breakpoint list\n///\n/// Name your breakpoints in a way that creates a ubiquitous language\n/// across team members. It will improve communication between\n/// stakeholders, designers, developers, and testers.\n///\n/// @type Map\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint Full documentation and examples\n$mq-breakpoints: (\n    mobile:  320px,\n    tablet:  740px,\n    desktop: 980px,\n    wide:    1300px\n) !default;\n\n/// Static breakpoint (for fixed-width layouts)\n///\n/// Define the breakpoint from $mq-breakpoints that should\n/// be used as the target width for the fixed-width layout\n/// (i.e. when $mq-responsive is set to 'false') in a old-ie.scss\n///\n/// @example scss\n///  // tablet-only.scss\n///  //\n///  // Ignore all styles above tablet breakpoint,\n///  // and fix the styles (e.g. layout) at tablet width\n///  $mq-responsive: false;\n///  $mq-static-breakpoint: tablet;\n///  @import 'main'; // @media queries in this file will be rasterized up to tablet\n///                   // larger breakpoints will be ignored\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#adding-custom-breakpoints Full documentation and examples\n$mq-static-breakpoint: desktop !default;\n\n/// Show breakpoints in the top right corner\n///\n/// If you want to display the currently active breakpoint in the top\n/// right corner of your site during development, add the breakpoints\n/// to this list, ordered by width, e.g. (mobile, tablet, desktop).\n///\n/// @type map\n$mq-show-breakpoints: () !default;\n\n/// Customize the media type (e.g. `@media screen` or `@media print`)\n/// By default sass-mq uses an \"all\" media type (`@media all and …`)\n///\n/// @type String\n/// @link https://github.com/sass-mq/sass-mq#changing-media-type Full documentation and examples\n$mq-media-type: all !default;\n\n/// Convert pixels to ems\n///\n/// @param {Number} $px - value to convert\n/// @param {Number} $base-font-size ($mq-base-font-size) - `<body>` font size\n///\n/// @example scss\n///  $font-size-in-ems: mq-px2em(16px);\n///  p { font-size: mq-px2em(16px); }\n///\n/// @requires $mq-base-font-size\n/// @returns {Number}\n@function mq-px2em($px, $base-font-size: $mq-base-font-size) {\n    @if unitless($px) {\n        @warn \"Assuming #{$px} to be in pixels, attempting to convert it into pixels.\";\n        @return mq-px2em($px * 1px, $base-font-size);\n    } @else if unit($px) == em {\n        @return $px;\n    }\n    @return ($px / $base-font-size) * 1em;\n}\n\n/// Get a breakpoint's width\n///\n/// @param {String} $name - Name of the breakpoint. One of $mq-breakpoints\n///\n/// @example scss\n///  $tablet-width: mq-get-breakpoint-width(tablet);\n///  @media (min-width: mq-get-breakpoint-width(desktop)) {}\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @returns {Number} Value in pixels\n@function mq-get-breakpoint-width($name, $breakpoints: $mq-breakpoints) {\n    @if map-has-key($breakpoints, $name) {\n        @return map-get($breakpoints, $name);\n    } @else {\n        @warn \"Breakpoint #{$name} wasn't found in $breakpoints.\";\n    }\n}\n\n/// Media Query mixin\n///\n/// @param {String | Boolean} $from (false) - One of $mq-breakpoints\n/// @param {String | Boolean} $until (false) - One of $mq-breakpoints\n/// @param {String | Boolean} $and (false) - Additional media query parameters\n/// @param {String} $media-type ($mq-media-type) - Media type: screen, print…\n///\n/// @ignore Undocumented API, for advanced use only:\n/// @ignore @param {Map} $breakpoints ($mq-breakpoints)\n/// @ignore @param {String} $static-breakpoint ($mq-static-breakpoint)\n///\n/// @content styling rules, wrapped into a @media query when $responsive is true\n///\n/// @requires {Variable} $mq-media-type\n/// @requires {Variable} $mq-breakpoints\n/// @requires {Variable} $mq-static-breakpoint\n/// @requires {function} mq-px2em\n/// @requires {function} mq-get-breakpoint-width\n///\n/// @link https://github.com/sass-mq/sass-mq#responsive-mode-on-default Full documentation and examples\n///\n/// @example scss\n///  .element {\n///    @include mq($from: mobile) {\n///      color: red;\n///    }\n///    @include mq($until: tablet) {\n///      color: blue;\n///    }\n///    @include mq(mobile, tablet) {\n///      color: green;\n///    }\n///    @include mq($from: tablet, $and: '(orientation: landscape)') {\n///      color: teal;\n///    }\n///    @include mq(950px) {\n///      color: hotpink;\n///    }\n///    @include mq(tablet, $media-type: screen) {\n///      color: hotpink;\n///    }\n///    // Advanced use:\n///    $my-breakpoints: (L: 900px, XL: 1200px);\n///    @include mq(L, $breakpoints: $my-breakpoints, $static-breakpoint: L) {\n///      color: hotpink;\n///    }\n///  }\n@mixin mq(\n    $from: false,\n    $until: false,\n    $and: false,\n    $media-type: $mq-media-type,\n    $breakpoints: $mq-breakpoints,\n    $responsive: $mq-responsive,\n    $static-breakpoint: $mq-static-breakpoint\n) {\n    $min-width: 0;\n    $max-width: 0;\n    $media-query: '';\n\n    // From: this breakpoint (inclusive)\n    @if $from {\n        @if type-of($from) == number {\n            $min-width: mq-px2em($from);\n        } @else {\n            $min-width: mq-px2em(mq-get-breakpoint-width($from, $breakpoints));\n        }\n    }\n\n    // Until: that breakpoint (exclusive)\n    @if $until {\n        @if type-of($until) == number {\n            $max-width: mq-px2em($until);\n        } @else {\n            $max-width: mq-px2em(mq-get-breakpoint-width($until, $breakpoints)) - .01em;\n        }\n    }\n\n    // Responsive support is disabled, rasterize the output outside @media blocks\n    // The browser will rely on the cascade itself.\n    @if $responsive == false {\n        $static-breakpoint-width: mq-get-breakpoint-width($static-breakpoint, $breakpoints);\n        $target-width: mq-px2em($static-breakpoint-width);\n\n        // Output only rules that start at or span our target width\n        @if (\n            $and == false\n            and $min-width <= $target-width\n            and (\n                $until == false or $max-width >= $target-width\n            )\n            and $media-type != 'print'\n        ) {\n            @content;\n        }\n    }\n\n    // Responsive support is enabled, output rules inside @media queries\n    @else {\n        @if $min-width != 0 { $media-query: '#{$media-query} and (min-width: #{$min-width})'; }\n        @if $max-width != 0 { $media-query: '#{$media-query} and (max-width: #{$max-width})'; }\n        @if $and            { $media-query: '#{$media-query} and #{$and}'; }\n\n        // Remove unnecessary media query prefix 'all and '\n        @if ($media-type == 'all' and $media-query != '') {\n            $media-type: '';\n            $media-query: str-slice(unquote($media-query), 6);\n        }\n\n        @media #{$media-type + $media-query} {\n            @content;\n        }\n    }\n}\n\n/// Quick sort\n///\n/// @author Sam Richards\n/// @access private\n/// @param {List} $list - List to sort\n/// @returns {List} Sorted List\n@function _mq-quick-sort($list) {\n    $less:  ();\n    $equal: ();\n    $large: ();\n\n    @if length($list) > 1 {\n        $seed: nth($list, ceil(length($list) / 2));\n\n        @each $item in $list {\n            @if ($item == $seed) {\n                $equal: append($equal, $item);\n            } @else if ($item < $seed) {\n                $less: append($less, $item);\n            } @else if ($item > $seed) {\n                $large: append($large, $item);\n            }\n        }\n\n        @return join(join(_mq-quick-sort($less), $equal), _mq-quick-sort($large));\n    }\n\n    @return $list;\n}\n\n/// Sort a map by values (works with numbers only)\n///\n/// @access private\n/// @param {Map} $map - Map to sort\n/// @returns {Map} Map sorted by value\n@function _mq-map-sort-by-value($map) {\n    $map-sorted: ();\n    $map-keys: map-keys($map);\n    $map-values: map-values($map);\n    $map-values-sorted: _mq-quick-sort($map-values);\n\n    // Reorder key/value pairs based on key values\n    @each $value in $map-values-sorted {\n        $index: index($map-values, $value);\n        $key: nth($map-keys, $index);\n        $map-sorted: map-merge($map-sorted, ($key: $value));\n\n        // Unset the value in $map-values to prevent the loop\n        // from finding the same index twice\n        $map-values: set-nth($map-values, $index, 0);\n    }\n\n    @return $map-sorted;\n}\n\n/// Add a breakpoint\n///\n/// @param {String} $name - Name of the breakpoint\n/// @param {Number} $width - Width of the breakpoint\n///\n/// @requires {Variable} $mq-breakpoints\n///\n/// @example scss\n///  @include mq-add-breakpoint(tvscreen, 1920px);\n///  @include mq(tvscreen) {}\n@mixin mq-add-breakpoint($name, $width) {\n    $new-breakpoint: ($name: $width);\n    $mq-breakpoints: map-merge($mq-breakpoints, $new-breakpoint) !global;\n    $mq-breakpoints: _mq-map-sort-by-value($mq-breakpoints) !global;\n}\n\n/// Show the active breakpoint in the top right corner of the viewport\n/// @link https://github.com/sass-mq/sass-mq#seeing-the-currently-active-breakpoint\n///\n/// @param {List} $show-breakpoints ($mq-show-breakpoints) - List of breakpoints to show in the top right corner\n/// @param {Map} $breakpoints ($mq-breakpoints) - Breakpoint names and sizes\n///\n/// @requires {Variable} $mq-breakpoints\n/// @requires {Variable} $mq-show-breakpoints\n///\n/// @example scss\n///  // Show breakpoints using global settings\n///  @include mq-show-breakpoints;\n///\n///  // Show breakpoints using custom settings\n///  @include mq-show-breakpoints((L, XL), (S: 300px, L: 800px, XL: 1200px));\n@mixin mq-show-breakpoints($show-breakpoints: $mq-show-breakpoints, $breakpoints: $mq-breakpoints) {\n    body::before {\n        background-color: #FCF8E3;\n        border-bottom: 1px solid #FBEED5;\n        border-left: 1px solid #FBEED5;\n        color: #C09853;\n        font: small-caption;\n        padding: 3px 6px;\n        pointer-events: none;\n        position: fixed;\n        right: 0;\n        top: 0;\n        z-index: 100;\n\n        // Loop through the breakpoints that should be shown\n        @each $show-breakpoint in $show-breakpoints {\n            $width: mq-get-breakpoint-width($show-breakpoint, $breakpoints);\n            @include mq($show-breakpoint, $breakpoints: $breakpoints) {\n                content: \"#{$show-breakpoint} ≥ #{$width} (#{mq-px2em($width)})\";\n            }\n        }\n    }\n}\n\n@if length($mq-show-breakpoints) > 0 {\n    @include mq-show-breakpoints;\n}\n\n/*# sourceMappingURL=_sass-mq.scss.map */\n"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./src/nationalarchives/components/header/story.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={},__nunjucks_template_import__dep_0=__webpack_require__("./src/nationalarchives/components/header/template.njk");function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/header/story.njk",templateContext):nunjucks.render("src/nationalarchives/components/header/story.njk",templateContext)}__nunjucks_module_dependencies__.templates={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.templates},__nunjucks_module_dependencies__.globals={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.globals},__nunjucks_module_dependencies__.extensions={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.extensions},__nunjucks_module_dependencies__.filters={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.filters},__nunjucks_module_dependencies__.assets={...__nunjucks_template_import__dep_0.__nunjucks_module_dependencies__.assets},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/story.njk"]={root:function root(env,context,frame,runtime,cb){var lineno=0,colno=0,output="";try{var macro_t_1=runtime.makeMacro(["params"],[],(function(l_params,kwargs){var callerFrame=frame;frame=new runtime.Frame,kwargs=kwargs||{},Object.prototype.hasOwnProperty.call(kwargs,"caller")&&frame.set("caller",kwargs.caller),frame.set("params",l_params);var t_2="",tasks=[];return tasks.push((function(callback){env.getTemplate("src/nationalarchives/components/header/template.njk",!1,"src/nationalarchives/components/header/story.njk",!1,(function(t_4,t_3){t_4?cb(t_4):callback(null,t_3)}))})),tasks.push((function(template,callback){template.render(context.getVariables(),frame,(function(t_6,t_5){t_6?cb(t_6):callback(null,t_5)}))})),tasks.push((function(result,callback){t_2+=result,callback(null)})),env.waterfall(tasks,(function(){})),frame=callerFrame,new runtime.SafeString(t_2)}));context.addExport("header"),context.setVariable("header",macro_t_1),output+="\n\n",output+=runtime.suppressValue((lineno=4,colno=9,runtime.callWrap(macro_t_1,"header",context,[runtime.contextOrFrameLookup(context,frame,"params")])),env.opts.autoescape),cb(null,output+="\n")}catch(e){cb(runtime.handleError(e,lineno,colno))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/story.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate},"./src/nationalarchives/components/header/template.njk":(module,exports,__webpack_require__)=>{const runtime=__webpack_require__("./node_modules/simple-nunjucks-loader/lib/cjs/runtime.js"),__nunjucks_module_dependencies__={};function nunjucksTemplate(ctx={}){const templateContext={__nunjucks_loader_assets__:__nunjucks_module_dependencies__.assets,...ctx};var nunjucks=(runtime&&runtime.default||runtime)({dev:!1,jinjaCompat:!1,isAsyncTemplate:!1},__nunjucks_module_dependencies__);return nunjucks.isAsync()?nunjucks.renderAsync("src/nationalarchives/components/header/template.njk",templateContext):nunjucks.render("src/nationalarchives/components/header/template.njk",templateContext)}__nunjucks_module_dependencies__.templates={},__nunjucks_module_dependencies__.globals={},__nunjucks_module_dependencies__.extensions={},__nunjucks_module_dependencies__.filters={},__nunjucks_module_dependencies__.assets={},__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/template.njk"]={root:function root(env,context,frame,runtime,cb){var output="";try{if(output+='<header class="govuk-header ',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"showExtraServiceMenu")&&(output+="govuk-header--full-width-border"),output+='" role="banner" ',1==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"showMenu")&&(output+='data-module="govuk-header"'),output+='>\n  <div class="govuk-header__container govuk-width-container">\n    <div class="govuk-header__logo">\n      <a href="/" class="govuk-header__link govuk-header__link--homepage">\n        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" class="tna-logo" viewBox="0 0 160 160" style="pointer-events: auto;">\n            <title>The National Archives</title>\n            <path fill="transparent" d="M0 0h160v160H0z" class="tna-logo__background" style="pointer-events: auto;"></path>\n            <g class="tna-logo__foreground" fill="currentColor">\n            <path d="M1.9 107.2h156.3V158H1.9v-50.8zm0-52.7h156.3v50.8H1.9V54.5zm0-52.6h77.2v50.8H1.9V1.9zm79 0h77.2v50.8H80.9V1.9zm0-1.9H0v160h160V0H80.9z"></path>\n            <path d="M21.3 19.5h-5.4v-3h14.3v3h-5.4v18.4h-3.5zM31.6 16.5H35v9h8.4v-9h3.4v21.4h-3.4v-9.3H35v9.3h-3.4zM50.9 16.5h12.2v3h-8.8v6.1h7.4v3h-7.4v6.3h8.8v3H50.9zM19.7 69.2h3.8l6.4 12.5c.6 1.1 1.1 2.7 1.6 4h.2c-.2-1.7-.3-3.6-.3-4.8V69.2h3.5v21.4h-3.7l-6.3-12.3c-.7-1.4-1.2-2.7-1.7-4.2H23c.2 1.4.3 3.3.3 5v11.5h-3.5c-.1 0-.1-21.4-.1-21.4zM47.8 82.6l-1.7-6.3c-.3-1.1-.6-2.2-.9-3.8H45c-.3 1.6-.5 2.6-.8 3.8l-1.7 6.3h5.3zM43 69.2h4.2l6.2 21.4h-3.5l-1.5-5.2h-6.6l-1.4 5.2h-3.6L43 69.2zM57.2 72.3h-5.4v-3.1H66v3.1h-5.4v18.4h-3.4zM67.8 69.2h3.5v21.4h-3.5zM87.5 80c0-5.3-1.7-8-4.8-8-3.2 0-4.8 2.7-4.8 8 0 5.2 1.6 7.9 4.8 7.9 3.2 0 4.8-2.7 4.8-7.9m-13.3 0c0-7 3-11.1 8.5-11.1 5.4 0 8.4 4.1 8.4 11.1 0 6.9-3 11-8.4 11s-8.5-4.1-8.5-11M94.3 69.2H98l6.4 12.5c.6 1.1 1.2 2.7 1.7 4h.2c-.2-1.7-.3-3.6-.3-4.8V69.2h3.4v21.4h-3.7l-6.3-12.3c-.7-1.4-1.2-2.7-1.7-4.2h-.2c.2 1.4.3 3.3.3 5v11.5h-3.5V69.2zM122.4 82.6l-1.7-6.3c-.3-1.1-.6-2.2-.9-3.8h-.2c-.3 1.6-.5 2.6-.8 3.8l-1.7 6.3h5.3zm-4.8-13.4h4.2l6.2 21.4h-3.5l-1.5-5.2h-6.6l-1.4 5.2h-3.6l6.2-21.4zM129.9 69.2h3.5v18.4h8.4v3.1h-11.9zM26.9 135.2l-1.7-6.3c-.3-1.1-.6-2.2-.9-3.8h-.2c-.3 1.6-.5 2.6-.8 3.8l-1.7 6.3h5.3zm-4.8-13.4h4.2l6.2 21.4H29l-1.5-5.2h-6.6l-1.4 5.2h-3.6l6.2-21.4zM39.9 132.5c2.5 0 3.4-1.6 3.4-3.9 0-2.2-1-3.8-3.4-3.8h-2.7v7.7h2.7zm-6.1-10.7h6.4c4.5 0 6.7 2.4 6.7 6.6 0 3.1-1.5 5.6-3.7 6.3v.2c1 1.1 4 7.5 4.8 7.9v.5h-3.8c-1-.6-3.6-7.2-4.4-7.8h-2.5v7.8h-3.5v-21.5zM52.9 132.5c0 5.3 1.9 8 4.8 8s4-2 4-5.2l3.5.1c0 .2.1.4.1.6 0 4.4-2.1 7.5-7.5 7.5-5.2 0-8.5-3.9-8.5-11.1 0-7.1 3.3-11 8.5-11 6.4 0 7.5 4.6 7.5 7.2 0 .3 0 .7-.1.9l-3.5.1c0-3.3-1.2-5.2-4-5.2-2.9.2-4.8 2.9-4.8 8.1M68 121.8h3.5v9.1h8.3v-9.1h3.5v21.5h-3.5v-9.4h-8.3v9.4H68zM87.9 121.8h3.5v21.4h-3.5zM94.2 121.8h3.6l3.2 12.3c.5 1.9.8 3.6 1.1 5.6h.2c.3-2 .6-3.7 1.1-5.6l3.2-12.3h3.6l-6.1 21.4H100l-5.8-21.4zM112.7 121.8H125v3.1h-8.8v6h7.4v3h-7.4v6.3h8.8v3.1h-12.3zM130.4 136c0 .2-.1.5-.1.8 0 1.9.8 3.7 3.4 3.7 2.1 0 3.3-1.2 3.3-2.9 0-1.6-.7-2.4-2.2-3l-3.4-1.3c-2.4-.9-4.2-2.4-4.2-5.7 0-3.5 2.3-6.1 6.6-6.1 5.5 0 6.4 3.6 6.4 5.9 0 .3 0 .7-.1 1.1l-3.4.1c0-.2.1-.5.1-.7 0-1.7-.6-3.2-3-3.2-2.1 0-3 1.2-3 2.8 0 1.7.9 2.5 2.2 2.9l3.5 1.3c2.6 1 4.3 2.6 4.3 5.8 0 3.6-2.4 6.1-7 6.1-5.9 0-6.8-3.9-6.8-6.5 0-.3 0-.6.1-1l3.3-.1z"></path>\n            </g>\n        </svg>\n        <span class="govuk-visually-hidden">\n          The National Archives\n        </span>\n      </a>\n    </div>\n    <div class="govuk-header__content',0==runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"withHiddenMenu")&&(output+=" govuk-header__content--nav-right"),output+='">\n      <a href="/" class="govuk-header__link govuk-header__service-name">\n          ',output+=runtime.suppressValue(runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"serviceName"),env.opts.autoescape),output+='\n      </a>\n      <nav aria-label="Menu" class="govuk-header__navigation govuk-header__navigation--end">\n        <button type="button" class="govuk-header__menu-button govuk-js-header-toggle" aria-controls="navigation" aria-label="Show or hide menu" hidden>Menu</button>\n        <ul id="navigation" class="govuk-header__navigation-list">\n            ',runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"showMenu")){output+="\n              ",frame=frame.push();var t_3=runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"menuItems");if(t_3)for(var t_2=(t_3=runtime.fromIterator(t_3)).length,t_1=0;t_1<t_3.length;t_1++){var t_4=t_3[t_1];frame.set("menuItem",t_4),frame.set("loop.index",t_1+1),frame.set("loop.index0",t_1),frame.set("loop.revindex",t_2-t_1),frame.set("loop.revindex0",t_2-t_1-1),frame.set("loop.first",0===t_1),frame.set("loop.last",t_1===t_2-1),frame.set("loop.length",t_2),output+='\n              <li class="govuk-header__navigation-item">\n                <a class="govuk-header__link" href="#">\n                ',output+=runtime.suppressValue(t_4,env.opts.autoescape),output+="\n              </a>\n              </li>\n              "}frame=frame.pop(),output+="\n            "}if(output+="\n          ",runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"showSignIn")&&(output+='\n            <li class="govuk-header__navigation-item">\n              <a class="govuk-header__link" href="#">\n                Sign in\n              </a>\n            </li>\n          '),output+="\n        </ul>\n      </nav>\n    </div>\n  </div>\n</header>\n",runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"showExtraServiceMenu")){output+='\n<div class="govuk-service-navigation"\n  data-module="govuk-service-navigation">\n  <div class="govuk-width-container">\n    <div class="govuk-service-navigation__container">\n      <nav aria-label="service-menu" class="govuk-service-navigation__wrapper">\n        <button type="button" class="govuk-service-navigation__toggle govuk-js-service-navigation-toggle" aria-controls="service-navigation" hidden>\n          Menu\n        </button>\n        <ul class="govuk-service-navigation__list" id="service-navigation">\n          ',frame=frame.push();var t_7=runtime.memberLookup(runtime.contextOrFrameLookup(context,frame,"params"),"menuItems");if(t_7)for(var t_6=(t_7=runtime.fromIterator(t_7)).length,t_5=0;t_5<t_7.length;t_5++){var t_8=t_7[t_5];frame.set("menuItem",t_8),frame.set("loop.index",t_5+1),frame.set("loop.index0",t_5),frame.set("loop.revindex",t_6-t_5),frame.set("loop.revindex0",t_6-t_5-1),frame.set("loop.first",0===t_5),frame.set("loop.last",t_5===t_6-1),frame.set("loop.length",t_6),output+='\n            <li class="govuk-service-navigation__item">\n              <a class="govuk-service-navigation__link" href="#">\n                ',output+=runtime.suppressValue(t_8,env.opts.autoescape),output+="\n              </a>\n            </li>\n          "}frame=frame.pop(),output+="\n        </ul>\n      </nav>\n    </div>\n  </div>\n</div>\n"}cb(null,output+="\n")}catch(e){cb(runtime.handleError(e,0,0))}}},nunjucksTemplate.__nunjucks_precompiled_template__=__nunjucks_module_dependencies__.templates["src/nationalarchives/components/header/template.njk"],nunjucksTemplate.__nunjucks_module_dependencies__=__nunjucks_module_dependencies__,module.exports=nunjucksTemplate}}]);