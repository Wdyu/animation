function getStyle(argument,attr) {
    if(argument.currentStyle){
        return argument.currentStyle[attr]
    }else {
        return getComputedStyle(argument,false)[attr]
    }
}

function startMove(argument,attr,obj,fn) {
    clearInterval(argument.timer);
    argument.timer = setInterval(function () {
        var icur = 0;
        if(attr === 'opacity'){
            icur = Math.round(parseFloat(getStyle(argument,attr))*100);
        }else {
            icur = parseInt(getStyle(argument,attr));
        }

        var speed = (obj - icur)/8;
        speed = speed>0 ? Math.ceil(speed):Math.floor(speed);
        //检测停止
        if(icur === obj){
            clearInterval(argument.timer);
            if(fn){
                fn()
            }
        }else {
            if(attr === 'opacity'){
                argument.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                argument.style.opacity = (icur + speed)/100;
            }else {
                argument.style[attr] = icur + speed + "px";
            }
        }
    },30)
}