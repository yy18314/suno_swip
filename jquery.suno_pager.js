/**
 * Created by yuyou on 14-10-18.
 */
(function($){
    $.fn.extend({
        pages:new Array(),
        init:function(type){
            this.pages = $(this).find(".suno_page"); //初始化页面
            $(this).css("position","relative");
            if(this.pages.length > 1){
                for(var i = 0 ; i < this.pages.length ; i ++) {
                    var page = this.pages[i];
                    $(page).swip({
                        top:function(){
                            //上翻一页
                        },
                        bottom:function(){
                            //下翻一页
                        },
                        moving:function(x,y){
                            //移动中
                        }
                    });
                }
            }else{
                //只有不足一页，别翻页了
            }
        }
    });
})(jQuery);