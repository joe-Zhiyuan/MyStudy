function timedCount(){
    for(var j = 0; j < 100; j++){
        var i = j;
    }
    postMessage(i);
}

postMessage("开始执行时间：" + new Date);
timedCount();
postMessage("结束执行时间：" + new Date);

