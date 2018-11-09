window.onload = function(){
    // 导航
    $("#headerBtn").on("click",function(){
        $(".header").eq(0).css({
            "height":"100%",
            "top":0
        });
        $("#nav").stop().fadeIn(300);
        $("body").css("overflowY","hidden");
    });
    $("#close").on("click",function(){
        $(".header").eq(0).css({
            "height":"auto",
            "top":"5px"
        });
        $("#nav").stop().fadeOut(350);
        $("body").css("overflowY","auto");
    });
    // 首页搜索效果
    var searchInput = $(".searchInput").eq(0);
    var searchBtn = $(".searchBtn").eq(0);
    var mobile = $("#mobile");
    //首页搜索效果 searchInput:输入框  searchBtn：提交button
    $(".search").on("click", function (event) {
        event = event || window.event;
        if(document.body.clientWidth >= 850) {
            console.log(1);
                searchInput.css("display","block");
                searchInput.stop().animate({"width": "190px"}, 250);
                searchInput.focus();
                searchInput.bind('input propertychange', function () {
                    if (searchInput.val() !== "" && searchInput.width() >= 100) {
                        searchBtn.attr("type", "sumbit");
                    } else {
                        searchBtn.attr("type", "button");
                    }
                });
                $(document).one("click", function () {
                    searchInput.stop().animate({width: 0}, 200,function(){
                        searchInput.css("display","none");
                        searchBtn.attr("type", "button");
                        searchInput.val("");
                    });
                });
                event.stopPropagation();
        }else if(document.body.clientWidth < 850){
                if (mobile.css("display") === "none") {
                        $("#mobile").stop().slideDown(250);
                        $(".header").eq(0).stop().animate({"top": "55px"},250);

                } else if (mobile.css("display") === "block") {
                        $("#mobile").stop().slideUp(200);
                        $(".header").eq(0).stop().animate({"top": "5px"},200);
                }
        }
    });
    // 回到顶部
    var top = $("#top");
    var rightFixed = $("#rightFixed");
    $(document).on("scroll",function() {
        if( $("html,body").scrollTop() > 200) {
            top.css("display","block");
            rightFixed.css("display","block");
            top.on("click", function () {
                $("html,body").stop().animate({scrollTop: 0}, 300,function(){
                    top.css("display","none");
                    rightFixed.css("display","none");
                });
            });
        }else{
            top.css("display","none");
            rightFixed.css("display","none");
        }
    });
    try {
        // banner
        var mySwiper = new Swiper('.banner', {
            autoplay: 4000,//可选选项，自动滑动
            pagination: '.pagination',
            paginationClickable: true
        });
        //鼠标覆盖停止自动切换
        mySwiper.container[0].onmouseover = function () {
            mySwiper.stopAutoplay();
        };
        //鼠标移出开始自动切换
        mySwiper.container[0].onmouseout = function () {
            mySwiper.startAutoplay();
        };
    }catch (e){
        console.log(e + "不是首页！")
    }
    try {
        var aboutTop = $(".aboutTop").eq(0);
        var aboutImg = $(".aboutTopCont").eq(0).children("img");
        // 动画方法
        function aboutAnimate(){
            if (aboutTop.offset().top - $(document).scrollTop() <= 200 && aboutTop.offset().top - $(document).scrollTop() >= -700) {
                aboutImg.eq(0).stop().animate({
                    marginLeft:"-780px"
                },300);
                aboutImg.eq(1).stop().animate({
                    marginLeft:"-405px"
                },350);
                aboutImg.eq(2).stop().animate({
                    marginLeft:"390px"
                },300);
                aboutImg.eq(3).stop().animate({
                    marginLeft:"760px"
                },350);
            }
        }
        // 执行方法
        aboutAnimate();
        // 滚动判断执行
        $(document).on("scroll",function(){
            aboutAnimate();
        });
    }catch (e){
        console.log(e + "不是关于我们页！");
    }
    try {
        //网站建设页 banner图不变位置效果
        var webItem = $(".webItems").eq(0);
        $(document).on("scroll",function() {
            webItem.css("height",webItem.children("img").eq(0).css("height"));
            $(".webItems>img").css({
                "position":"fixed",
                "zIndex":"1"
            });
        });
    }catch (e){
        console.log(e + "不是网站建设页！");
    }
    try{
        // 使用 new JParticles.特效名 创建特效
        var canvas = new JParticles.particle('#canvas',{
            opacity:1,
            color:"white",
            resize:true,
            // 两粒子圆心点之间的直线距离为 90
            proximity: 90,
            // range 等于 0，粒子之间不连线
            range: 0,
            //半径
            maxR:2.5,
            minR:1,
            // 开启视差效果
            parallax: true
        });
        // 流程js
        var modifier=2;//每天的px
        var historyList=[{"detail":"需求调研","date":"Demand research","Img":"images/process1.png"},
            {"detail":"合同签订","date":"Sign the contract","Img":"images/process2.png"},
            {"detail":"交互设计","date":"Interaction design","Img":"images/process3.png"},
            {"detail":"视觉设计","date":"Visual design","Img":"images/process4.png"},
            {"detail":"前端开发","date":"Front-end development","Img":"images/process5.png"},
            {"detail":"后端开发","date":"Backend development","Img":"images/process6.png"},
            {"detail":"全面测试","date":"A comprehensive test","Img":"images/process7.png"},
            {"detail":"上线部署","date":"On-line deployment","Img":"images/process8.png"},
            {"detail":"运营推广","date":"A comprehensive test","Img":"images/process9.png"}
        ];

        var mySwiperProcess = new Swiper('#swiper-Process .swiper-container',{
            virtualTranslate : true,
            // observer:true,
            // observeParents:true,
            preventClicks : false,
            prevButton:'#swiper-Process .swiper-button-prev',
            nextButton:'#swiper-Process .swiper-button-next',
            pagination:'#swiper-Process .swiper-pagination',
            paginationClickable:true,
            paginationBulletRender: function (swiper, index, className) {
                if(index>0){
                    marginLeft=255;
                }else{
                    marginLeft=0
                }
                return '<span class="' + className + '" style="margin-left:'+marginLeft+'px;"></span>';
            },

            onInit: function(swiper){
                mySlides='';
                for(var i = 0;i<historyList.length;i++){
                    swiper.appendSlide('<div class="swiper-slide slide'+i+'"><h3 class="detail">'+historyList[i]['detail']+'</h3><p class="date">'+historyList[i]['date']+'</p><img class="img" src='+historyList[i]['Img'] +'></div>');
                    swiper.slides[i].style.transform='translate3d(' + (-i)*swiper.width + 'px, 0px, 0px)';
                }
                swiper.slideTo(1);
            },
            onSlideChangeStart: function(swiper){
                detailPrev=swiper.slides[swiper.previousIndex].querySelector('.detail');
                datePrev=swiper.slides[swiper.previousIndex].querySelector('.date');
                imgPrev=swiper.slides[swiper.previousIndex].querySelector('.img');
                detailPrev.offsetHeight;datePrev.offsetHeight;imgPrev.offsetHeight;
                swiper.slides[swiper.previousIndex].style.zIndex=1;
                detailPrev.style.opacity=datePrev.style.opacity=0;
                detailPrev.style.transform=datePrev.style.transform='translate3d(0px, 0px, 0px)';

                detailActive=swiper.slides[swiper.activeIndex].querySelector('.detail');
                dateActive=swiper.slides[swiper.activeIndex].querySelector('.date');
                detailActive.offsetHeight;dateActive.offsetHeight;
                swiper.slides[swiper.activeIndex].style.zIndex=999;
                detailActive.style.opacity=dateActive.style.opacity=1;
                detailActive.style.transform='translate3d(0px, 10px, 0px)';
                dateActive.style.transform='translate3d(0px, -10px, 0px)';


                swiper.paginationContainer[0].style.left=-264*[swiper.activeIndex]+'px';

            }
        });
    }catch (e){
        console.log(e + "不是网站项目页！");
    }
};