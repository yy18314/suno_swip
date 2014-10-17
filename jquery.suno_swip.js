/**
 * Created by yuyou on 14-10-15.
 */
(function($){
    $.fn.extend({
        config:{},
        swipConfig:{
            canTouch:false,
            startX:0,
            startY:0,
            transX:0,
            transY:0
        },
        addHandler : function(elem,evtype,fn){
            if(elem.attachEvent){
                elem.attachEvent('on'+evtype,fn);
            }else if(elem.addEventListener){
                elem.addEventListener(evtype,fn,false);
            }else{
                elem["on"+evtype] = fn;
            }
        },
        bind_fn : function(obj,func){
            return function(){
                func.apply(obj,arguments);
            }
        },
        swip: function (config) {
            this.config = config;
            if(!this.swipConfig.canTouch){
                this.swipConfig.canTouch = true;
                this.addHandler($(this)[0],"touchstart",this.bind_fn(this,this.touch_start));
                this.addHandler($(this)[0],"touchmove",this.bind_fn(this,this.touch_move));
                this.addHandler($(this)[0],"touchend",this.bind_fn(this,this.touch_end));
            }
            return $(this);
        },
        touch_start : function(e){
            if(!event.touches.length) return;
            var touch = event.touches[0];
            this.swipConfig.startX = touch.pageX;
            this.swipConfig.startY = touch.pageY;
            this.swipConfig.transX = 0;
            this.swipConfig.transY = 0;
        },
        touch_move : function(e){
            if(!event.touches.length) return;
            var touch = event.touches[0];
            this.swipConfig.transX = this.swipConfig.startX-touch.pageX;
            this.swipConfig.transY = this.swipConfig.startY-touch.pageY;
            if(this.config.moving != null)this.config.moving(this.swipConfig.transX,this.swipConfig.transY);
            e.preventDefault();
        },
        touch_end : function(){
            //此处做swip分流
            var absX = Math.abs(this.swipConfig.transX);
            var absY = Math.abs(this.swipConfig.transY);
            if(absX > 20 && absX > absY){
                //分流到left和right方向
                if(this.swipConfig.transX < 0){
                    if(this.config.right != null)this.config.right.apply(this,arguments);
                }else{
                    if(this.config.left != null)this.config.left.apply(this,arguments);
                }
            }else if(absY > 20 && absY > absX){
                //分流到top和bottom方向
                if(this.swipConfig.transY < 0){
                    if(this.config.bottom != null)this.config.bottom.apply(this,arguments);
                }else{
                    if(this.config.top != null)this.config.top.apply(this,arguments);
                }
            }
        }
    });
})(jQuery);