jquery轻量级插件：suno_swip
=========
#### 作者：余悠

### 示例代码
    $("#wrap").swip({
        left:function(){
            alert("left");
        },
        top:function(){
            alert("top");
        },
        bottom:function(){
            alert("bottom");
        },
        right:function(){
            alert("right");
        },
        moving:function(x,y){
            //x和y为移动中的偏移像素
            $("#wrap").html("dx:" + x + ",dy:" + y);
        }
    });