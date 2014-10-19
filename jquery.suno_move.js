/**
 * Created by yuyou on 14-10-18.
 */
(function($){
    $.fn.extend({
        callback:null,
        wrap:null,
        move:function(type,config,callback){
            this.callback = callback;
            switch(type){
                case "left":
                    $(this).animate({top:config.y,left:-$(this).width()},0);
                    break;
                case "right":
                    this.wrap = config.wrap || window;
                    $(this).animate({top:config.y,left:$(this.wrap).width()},0);
                    break;
                case "bottom":
                    this.wrap = config.wrap || window;
                    $(this).animate({top:$(this.wrap).height(),left:config.x},0);
                    break;
                case "top":
                    $(this).animate({top:-$(this).height(),left:config.x},0);
                    break;

                default:moveTo(config);break;
            }
            this.moveTo(config,this.callback);
            return $(this);
        },
        moveTo: function (config,callback) {
            var x = config.x;
            var y = config.y;
            var time = config.time || 300;
            var opacity = config.opacity || 1;
            callback = callback || this.callback;
            $(this).animate({left:x,top:y,opacity:opacity},time,callback);
        },
        steps:function(configs,index){
            var config = configs[index];
            var that = this;
            this.moveTo(config,function(){
                if(index < configs.length - 1){
                    that.steps(configs,index + 1);
                }
            })
        }
    });
})(jQuery);