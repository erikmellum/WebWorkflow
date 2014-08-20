!function(t,e){"use strict";Foundation.libs.dropdown={name:"dropdown",version:"5.3.3",settings:{active_class:"open",align:"bottom",is_hover:!1,opened:function(){},closed:function(){}},init:function(t,e,n){Foundation.inherit(this,"throttle"),this.bindings(e,n)},events:function(){var n=this,i=n.S;i(this.scope).off(".dropdown").on("click.fndtn.dropdown","["+this.attr_name()+"]",function(e){var s=i(this).data(n.attr_name(!0)+"-init")||n.settings;(!s.is_hover||Modernizr.touch)&&(e.preventDefault(),n.toggle(t(this)))}).on("mouseenter.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(t){var e,s,a=i(this);clearTimeout(n.timeout),a.data(n.data_attr())?(e=i("#"+a.data(n.data_attr())),s=a):(e=a,s=i("["+n.attr_name()+"='"+e.attr("id")+"']"));var o=s.data(n.attr_name(!0)+"-init")||n.settings;i(t.target).data(n.data_attr())&&o.is_hover&&n.closeall.call(n),o.is_hover&&n.open.apply(n,[e,s])}).on("mouseleave.fndtn.dropdown","["+this.attr_name()+"], ["+this.attr_name()+"-content]",function(){var t=i(this);n.timeout=setTimeout(function(){if(t.data(n.data_attr())){var e=t.data(n.data_attr(!0)+"-init")||n.settings;e.is_hover&&n.close.call(n,i("#"+t.data(n.data_attr())))}else{var s=i("["+n.attr_name()+'="'+i(this).attr("id")+'"]'),e=s.data(n.attr_name(!0)+"-init")||n.settings;e.is_hover&&n.close.call(n,t)}}.bind(this),150)}).on("click.fndtn.dropdown",function(e){var s=i(e.target).closest("["+n.attr_name()+"-content]");if(!(i(e.target).closest("["+n.attr_name()+"]").length>0))return!i(e.target).data("revealId")&&s.length>0&&(i(e.target).is("["+n.attr_name()+"-content]")||t.contains(s.first()[0],e.target))?void e.stopPropagation():void n.close.call(n,i("["+n.attr_name()+"-content]"))}).on("opened.fndtn.dropdown","["+n.attr_name()+"-content]",function(){n.settings.opened.call(this)}).on("closed.fndtn.dropdown","["+n.attr_name()+"-content]",function(){n.settings.closed.call(this)}),i(e).off(".dropdown").on("resize.fndtn.dropdown",n.throttle(function(){n.resize.call(n)},50)),this.resize()},close:function(t){var e=this;t.each(function(){e.S(this).hasClass(e.settings.active_class)&&(e.S(this).css(Foundation.rtl?"right":"left","-99999px").removeClass(e.settings.active_class).prev("["+e.attr_name()+"]").removeClass(e.settings.active_class).removeData("target"),e.S(this).trigger("closed").trigger("closed.fndtn.dropdown",[t]))})},closeall:function(){var e=this;t.each(e.S("["+this.attr_name()+"-content]"),function(){e.close.call(e,e.S(this))})},open:function(t,e){this.css(t.addClass(this.settings.active_class),e),t.prev("["+this.attr_name()+"]").addClass(this.settings.active_class),t.data("target",e.get(0)).trigger("opened").trigger("opened.fndtn.dropdown",[t,e])},data_attr:function(){return this.namespace.length>0?this.namespace+"-"+this.name:this.name},toggle:function(t){var e=this.S("#"+t.data(this.data_attr()));0!==e.length&&(this.close.call(this,this.S("["+this.attr_name()+"-content]").not(e)),e.hasClass(this.settings.active_class)?(this.close.call(this,e),e.data("target")!==t.get(0)&&this.open.call(this,e,t)):this.open.call(this,e,t))},resize:function(){var t=this.S("["+this.attr_name()+"-content].open"),e=this.S("["+this.attr_name()+"='"+t.attr("id")+"']");t.length&&e.length&&this.css(t,e)},css:function(t,e){var n=Math.max((e.width()-t.width())/2,8);if(this.clear_idx(),this.small()){var i=this.dirs.bottom.call(t,e);t.attr("style","").removeClass("drop-left drop-right drop-top").css({position:"absolute",width:"95%","max-width":"none",top:i.top}),t.css(Foundation.rtl?"right":"left",n)}else{var s=e.data(this.attr_name(!0)+"-init")||this.settings;this.style(t,e,s)}return t},style:function(e,n,i){var s=t.extend({position:"absolute"},this.dirs[i.align].call(e,n,i));e.attr("style","").css(s)},dirs:{_base:function(t){var e=this.offsetParent(),n=e.offset(),i=t.offset();return i.top-=n.top,i.left-=n.left,i},top:function(t){var e=Foundation.libs.dropdown,n=e.dirs._base.call(this,t),i=8;return this.addClass("drop-top"),(t.outerWidth()<this.outerWidth()||e.small())&&e.adjust_pip(i,n),Foundation.rtl?{left:n.left-this.outerWidth()+t.outerWidth(),top:n.top-this.outerHeight()}:{left:n.left,top:n.top-this.outerHeight()}},bottom:function(t){var e=Foundation.libs.dropdown,n=e.dirs._base.call(this,t),i=8;return(t.outerWidth()<this.outerWidth()||e.small())&&e.adjust_pip(i,n),e.rtl?{left:n.left-this.outerWidth()+t.outerWidth(),top:n.top+t.outerHeight()}:{left:n.left,top:n.top+t.outerHeight()}},left:function(t){var e=Foundation.libs.dropdown.dirs._base.call(this,t);return this.addClass("drop-left"),{left:e.left-this.outerWidth(),top:e.top}},right:function(t){var e=Foundation.libs.dropdown.dirs._base.call(this,t);return this.addClass("drop-right"),{left:e.left+t.outerWidth(),top:e.top}}},adjust_pip:function(t,e){var n=Foundation.stylesheet;this.small()&&(t+=e.left-8),this.rule_idx=n.cssRules.length;var i=".f-dropdown.open:before",s=".f-dropdown.open:after",a="left: "+t+"px;",o="left: "+(t-1)+"px;";n.insertRule?(n.insertRule([i,"{",a,"}"].join(" "),this.rule_idx),n.insertRule([s,"{",o,"}"].join(" "),this.rule_idx+1)):(n.addRule(i,a,this.rule_idx),n.addRule(s,o,this.rule_idx+1))},clear_idx:function(){var t=Foundation.stylesheet;this.rule_idx&&(t.deleteRule(this.rule_idx),t.deleteRule(this.rule_idx),delete this.rule_idx)},small:function(){return matchMedia(Foundation.media_queries.small).matches&&!matchMedia(Foundation.media_queries.medium).matches},off:function(){this.S(this.scope).off(".fndtn.dropdown"),this.S("html, body").off(".fndtn.dropdown"),this.S(e).off(".fndtn.dropdown"),this.S("[data-dropdown-content]").off(".fndtn.dropdown")},reflow:function(){}}}(jQuery,window,window.document);