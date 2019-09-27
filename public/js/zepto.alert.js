;(function($, window, undefined) {
    var win = $(window),
        doc = $(document),
        count = 1,
        isLock = false;
    var Dialog = function(options) {
        this.settings = $.extend({}, Dialog.defaults, options);
        this.init();
    }

    Dialog.prototype = {
        /**
         * 初始化
         */
        init : function() {
            this.create();
            if (this.settings.lock) {
                this.lock();
            }
            if (!isNaN(this.settings.time)&&this.settings.time!=null) {
                this.time();
            }
        },

        /**
         * 创建
         */
        create : function() {
			var divHeader = (this.settings.title==null || this.settings.title=='')?'':'<div class="Dialog-header-title">'+ this.settings.title +'</div>';
            var divHeaderIcon = (this.settings.titleIcon==null || this.settings.titleIcon=='')?'':'<div class="Dialog-icon-'+ this.settings.titleIcon +'"></div>';
            // HTML模板
            var templates = '<div class="Dialog-wrap">' +
                                divHeader + divHeaderIcon +
                                '<div class="Dialog-content">'+ this.settings.content +'</div>' +
                                '<div class="Dialog-footer"></div>' +
                            '</div>';
            // 追回到body
            this.dialog = $('<div>').addClass('Dialog').css({ zIndex : this.settings.zIndex + (count++) }).html(templates).prependTo('body');
            // console.log(this.dialog.width());
            // 设置ok按钮
            if ($.isFunction(this.settings.ok)) {
                this.ok();
            }
            // 设置cancel按钮
            if ($.isFunction(this.settings.cancel)) {
               this.cancel();
            }
            // 设置大小
            this.size();
            // 设置位置
            this.position();
        },

        /**
         * ok
         */
        ok : function() {
            var _this = this,
                footer = this.dialog.find('.Dialog-footer');
            $('<a>', {
                href : 'javascript:;',
                text : this.settings.okText
            }).on("click", function() {
				var okCallback = _this.settings.ok();
				if (okCallback == undefined || okCallback) {
                    clearTimeout(this.closeTimer);
					_this.close();
				}
            }).addClass('Dialog-ok').prependTo(footer);
        },

        /**
         * cancel
         */
        cancel : function() {
            var _this = this,
                footer = this.dialog.find('.Dialog-footer');
            $('<a>', {
                href : 'javascript:;',
                text : this.settings.cancelText
            }).on("click",function() {
				var cancelCallback = _this.settings.cancel();
				if (cancelCallback == undefined || cancelCallback) {
					_this.close();
				}
            }).addClass('Dialog-cancel').appendTo(footer);
        },

        /**
         * 设置大小
         */
        size : function() {
            var content = this.dialog.find('.Dialog-content'),
            	wrap = this.dialog.find('.Dialog-wrap');
            content.css({
                width : this.settings.width,
                height : this.settings.height
            });
            //wrap.width(content.width());
        },

        /**
         * 设置位置
         */
        position : function() {
            var _this = this,
                winWidth = win.width(),
                winHeight = win.height(),
                scrollTop = 0;
            this.dialog.css({
                left : (winWidth - _this.dialog.width()) / 2,
                top : (winHeight - _this.dialog.height()) / 2 + scrollTop
            });
        },

        /**
         * 设置锁屏
         */
        lock : function() {
            if (isLock) return;
            this.lock = $('<div>').css({ zIndex : this.settings.zIndex }).addClass('Dialog-mask');
            this.lock.appendTo('body');
            isLock = true;
        },

        /**
         * 关闭锁屏
         */
        unLock : function() {
    		if (this.settings.lock) {
    			if (isLock) {
	                this.lock.remove();
	                isLock = false;
                }
            }
        },

        /**
         * 关闭方法
         */
        close : function() {
            this.dialog.remove();
            this.unLock();
        },

        /**
         * 定时关闭
         */
        time : function() {

            var _this = this;

            if(!this.settings.ok ){
                this.closeTimer = setTimeout(function() {
                    _this.close();
                }, this.settings.time);
            }else{
                this.settings.ok;
            }
        }
    }

    /**
     * 默认配置
     */
    Dialog.defaults = {
		//标题
		title:'',
		// 图标		标题Dialog-icon-load
        titleIcon: '',
        // 内容
        content: '加载中...',
        // 宽度
        width: 'auto',
        // 高度
        height: 'auto',
        // 确定按钮回调函数
        ok: null,
        // 取消按钮回调函数    函数中加return false  这不关闭遮罩层
        cancel: null,
        // 确定按钮文字   函数中加return false  这不关闭遮罩层
        okText: '确定',
        // 取消按钮文字
        cancelText: '取消',
        // 自动关闭时间(毫秒)
        time: null,
        // 是否锁屏   遮罩层
        lock: true,
        // z-index值
        zIndex: 999
    }

    var newDialog = function(options) {
        return new Dialog(options);
    }

    window.newDialog = $.newDialog = $.dialog = newDialog;

})(window.jQuery || window.Zepto, window);
