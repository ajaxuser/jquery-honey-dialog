jQuery(function($){
    var Honey = window.Honey || {};
    
    //获取鼠标位置
    function getMousePoint(event) {
        var e = event || window.event;  
        if(e.pageX || e.pageY){  
            return {x:e.pageX, y:e.pageY};  
        }  
        return {  
            x:e.clientX + document.documentElement.scrollLeft - document.documentElement.clientLeft,  
            y:e.clientY + document.documentElement.scrollTop  - document.documentElement.clientTop  
        };  
    };
    
    //原型是引用原型,而不是复制原型
    Honey.prototype = $.fn = $.prototype = jQuery.fn = jQuery.prototype;
    
    //dialog
    Honey.prototype.dialog = function(msg) {
        if(window.navigator.userAgent.indexOf('Chrome') !== -1) {
            var shadow_height = document.body.scrollHeight+'px';
            var dialog_top = document.body.scrollTop+150+'px';
        } else {
            var shadow_height = document.documentElement.scrollHeight+'px';
            var dialog_top = document.documentElement.scrollTop+150+'px';
        }
        
        $(this).append('<div class="shadow" style="height:'+shadow_height+';"></div>');
        
        var dialog = 
        '<div class="dialog" style="top:'+dialog_top+';">'+
        '<div class="notice">'+'<div class="msg">'+msg+'</div>'+'<div class="buttons"><a class="button confirm_button">确定</a>&#160;<a class="button cancel_button">取消</a></div>'+'</div>'+
        '<div class="dialog_close"></div>'+
        '</div>';
        
        $(this).append(dialog);
        
        //鼠标拖动弹层
        $('div.dialog').mouseover(function(e){
            $(this).mousedown(function(e){
                $(this).css({cursor:"move"});
                //初始鼠标位置
                var pos = getMousePoint(e);
                //初始dialog位置值
                var offset = $(this).offset();
                $(this).mousemove(function(e){
                    //获取坐标当前位置
                    var p = getMousePoint(e);
                    //移动的位置
                    var x = p.x - pos.x;
                    var y = p.y - pos.y;
                    //计算当前dialog到四周的距离
                    var top = parseInt($(this).css('top'));
                    var left = parseInt($(this).css('left'));
                    var bottom = parseInt($(this).css('bottom'));
                    var right = parseInt($(this).css('right'));
                    //dialog初始未知加上移动的位置即为当前位置
                    $(this).offset({top:offset.top+y, left:offset.left+x});
                });
            });
            $(this).mouseup(function(e){
                $(this).css({cursor:"default"});
                $(this).unbind('mousemove');
            }).mouseout(function(e){
                $(this).css({cursor:"default"});
                $(this).unbind('mousemove');
            });
        });
        
        //点击删除按钮关闭弹层
        $('div.dialog_close, a.cancel_button').click(function(){
            $('div.dialog').remove();
            $('div.shadow').remove();
        });
    };
});
