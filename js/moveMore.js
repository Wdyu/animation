function getStyle(argument,attr) {
    if(argument.currentStyle){
        return argument.currentStyle[attr]
    }else {
        return getComputedStyle(argument,false)[attr]
    }
}

// startMove(argument,{attr1:obj,attr2:obj},fn);
function startMove(argument,json,fn) {
    var flag = true;  //假设所有运动都达到目标值
    clearInterval(argument.timer);
    argument.timer = setInterval(function () {
        for (var attr in json) {
            var icur = 0;
            if (attr === 'opacity') {
                icur = Math.round(parseFloat(getStyle(argument, attr)) * 100);
            } else {
                icur = parseInt(getStyle(argument, attr));
            }

            var speed = (json[attr] - icur) / 8;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //检测停止
            if (icur != json[attr]) {
                flag = false;
            }
            if (attr === 'opacity') {
                argument.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                argument.style.opacity = (icur + speed) / 100;
            } else {
                argument.style[attr] = icur + speed + "px";
            }
        }
        if(flag){
            clearInterval(argument.timer);
            if(fn){
                fn()
            }
        }
    },30)
}