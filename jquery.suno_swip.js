/**
 * Created by yuyou on 14-10-15.
 */
(function($){
    $.fn.extend({
        fnLeft:null,
        fnRight:null,
        fnTop:null,
        fnBottom:null,
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
            if(config.left != null){
                this.swipLeft(config.left);
            }
            if(config.right != null){
                this.swipRight(config.right);
            }
            if(config.top != null){
                this.swipTop(config.top);
            }
            if(config.bottom != null){
                this.swipBottom(config.bottom);
            }
            return $(this);
        },
        swipBind:function(_fn,type){
            if(!this.swipConfig.canTouch){
                //绑定touch系列事件
                this.swipConfig.canTouch = true;
                this.addHandler($(this)[0],"touchstart",this.bind_fn(this,this.touch_start));
                this.addHandler($(this)[0],"touchmove",this.bind_fn(this,this.touch_move));
                this.addHandler($(this)[0],"touchend",this.bind_fn(this,this.touch_end));
            }
            switch(type){
                case "left":
                    this.fnLeft = _fn;
                    break;
                case "right":
                    this.fnRight = _fn;
                    break;
                case "top":
                    this.fnTop = _fn;
                    break;
                case "bottom":
                    this.fnBottom = _fn;
                    break;
                default :break;
            }
        },
        swipLeft: function (callback) {
            //此处应该绑定事件，或者传递callback
            this.swipBind(callback,"left");
        },
        swipRight:function(callback){
            this.swipBind(callback,"right");
        },
        swipTop:function(callback){
            this.swipBind(callback,"top");
        },
        swipBottom:function(callback){
            this.swipBind(callback,"bottom");
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
            e.preventDefault();
        },
        touch_end : function(){
            //此处做swip分流
            var absX = Math.abs(this.swipConfig.transX);
            var absY = Math.abs(this.swipConfig.transY);
            if(absX > 20 && absX > absY){
                //分流到left和right方向
                if(this.swipConfig.transX < 0){
                    if(this.fnRight != null){
                        this.fnRight.apply(this,arguments);
                    }
                }else{
                    if(this.fnLeft != null){
                        this.fnLeft.apply(this,arguments);
                    }
                }
            }else if(absY > 20 && absY > absX){
                //分流到top和bottom方向
                if(this.swipConfig.transY < 0){
                    if(this.fnBottom != null){
                        this.fnBottom.apply(this,arguments);
                    }
                }else{
                    if(this.fnTop != null){
                        this.fnTop.apply(this,arguments);
                    }
                }
            }
        }
    });
})(jQuery);