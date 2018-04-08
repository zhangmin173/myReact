// @desc   modal - 弹窗
+function(d){var b=function(e){this.options=e;window.modalLength=window.modalLength===undefined?0:window.modalLength;this.init();return this};b.VERSION="1.0.3";b.defaults={type:"alert",title:"未填写标题",section:"未填写内容",trueButton:"确定",falseButton:"取消",bodyClose:true,saveClose:true,filter:true,callback:{show:function(){console.log("you showed a modal")},close:function(){console.log("you removed a modal")},save:function(){console.log("you clicked save button")},cancel:function(){console.log("you clicked cancel button")}}};b.prototype={init:function(){if(this.options.filter){this.filter("add")}this.template();d("body").append(this.template);this.$modal=d('.modal[timestamp="'+this.timestamp+'"]');this.event().show();return this},show:function(){this.$modal.show();window.modalLength++;if(window.modalLength>1){this.$modal.css("background-color","rgba(0,0,0,0)")}document.ontouchmove=function(f){f.preventDefault()};if(window.parent!=window&&window.$parentHeight!==undefined&&window.$parentScrollY!==undefined){this.$modal.find(".modal-dialog").css({"top":window.$parentHeight/2+window.$parentScrollY})}var e=this.$modal.find(".modal-dialog").height();this.$modal.find(".modal-dialog").css({"margin-top":-e/2}).trigger("show");return this},close:function(){window.modalLength--;if(window.modalLength==0){this.filter("close");document.ontouchmove=null}this.$modal.remove();this.$modal.trigger("close");return this},filter:function(e){switch(e){case"add":d("#db-content").addClass("filter-blur");break;case"close":d("#db-content").removeClass("filter-blur");break;default:d("#db-content").toggleClass("filter-blur");break}return this},event:function(){var e=this;this.$modal.on("show",function(){e.options.callback.show&&e.options.callback.show(e)});this.$modal.on("close",function(){e.options.callback.close&&e.options.callback.close(e)});this.$modal.on("save",function(){e.options.callback.save&&e.options.callback.save(e)});this.$modal.on("cancel",function(){e.options.callback.cancel&&e.options.callback.cancel(e)});this.$modal.find(".modal-footer .modal-true").on("click",function(){if(e.options.saveClose){e.close()}e.$modal.trigger("save")});this.$modal.find(".modal-footer .modal-false").on("click",function(){e.close();e.$modal.trigger("cancel")});this.$modal.find(".modal-dialog").on("click",function(f){f=f||window.event;if(f.stopPropagation){f.stopPropagation()}else{f.cancelBubble=true}});this.$modal.on("click",function(){if(e.options.type!="loading"&&e.options.bodyHide){e.close()}});return this},template:function(){this.timestamp=new Date()*1;switch(this.options.type){case"loading":this.template='<div class="modal" timestamp="'+this.timestamp+'">'+'<div class="modal-dialog loading">'+'<img src="http://yun.tuisnake.com/webapp/img/loading.gif">'+"<p>"+this.options.title+"</p>"+"</div>"+"</div>";break;case"alert":this.template='<div class="modal" timestamp="'+this.timestamp+'">'+'<div class="modal-dialog">'+'<div class="modal-header">'+this.options.title+"</div>"+'<div class="modal-footer"><span class="modal-true percent-100">'+this.options.trueButton+"</span></div>"+"</div>"+"</div>";break;case"confirm":this.template='<div class="modal" timestamp="'+this.timestamp+'">'+'<div class="modal-dialog">'+'<div class="modal-header">'+this.options.title+"</div>"+'<div class="modal-section">'+this.options.section+"</div>"+'<div class="modal-footer">'+'<span class="modal-false">'+this.options.falseButton+"</span>"+'<span class="modal-true">'+this.options.trueButton+"</span>"+"</div>"+"</div>"+"</div>";break}return this}};function c(f){var e=d.extend({},b.defaults,f);return new b(e)}var a=d.modal;d.modal=c;d.modal.Constructor=b;d.modal.noConflict=function(){d.modal=a;return this}}(Zepto);
