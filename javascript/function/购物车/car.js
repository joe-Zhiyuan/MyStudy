window.onload = function() {
    utils = {
        setParam: function (name, value) {
            localStorage.setItem(name, value);
        },
        getParam: function (name) {
            return localStorage.getItem(name);
        }
    };
    product = {
        id: "",
        name: "",
        productImg: "",
        productTxt: "",
        price: 0.00
    };
    cart = {
        //向购物车添加商品
        addproduct: function (product) {
            var ShoppingCart = utils.getParam("ShoppingCart");
            if (ShoppingCart == null || ShoppingCart == "") {
                //第一次加入商品
                var jsonstr = {
                    "productlist": [{
                        "id": product.id, "name": product.name, "productImg": product.productImg,
                        "productTxt": product.productTxt, "price": product.price
                    }]
                };
                utils.setParam("ShoppingCart", "'" + JSON.stringify(jsonstr));
            } else {
                var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
                var productlist = jsonstr.productlist;
                var result = false;
                //查找购物车是否有改商品
                for (var i in productlist) {
                    if (productlist[i].id == product.id) {
                        result = true;
                    }
                }
                if (!result) {
                    //没有该商品 直接加入
                    productlist.push({
                        "id": product.id, "name": product.name, "productImg": product.productImg,
                        "productTxt": product.productTxt, "price": product.price
                    });
                }
                //保存购物车
                utils.setParam("ShoppingCart", "'" + JSON.stringify(jsonstr));
            }
        },
        //获取购物车中所有商品
        getproductlist: function () {
            var ShoppingCart = utils.getParam("ShoppingCart");
            var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
            var productlist = jsonstr.productlist;
            return productlist;
        },
        //判断购物车是否存在商品
        existproduct: function (id) {
            var result = false;
            var ShoppingCart = utils.getParam("ShoppingCart");
            if (ShoppingCart != bull) {
                var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
                var productlist = jsonstr.productlist;
                for (var i in productlist) {
                    if (productlist[i].id == id) {
                        result = true;
                    }
                }
            }
            return result;
        },
        //删除购物车商品
        deleteproduct: function (id) {
            var ShoppingCart = utils.getParam("ShoppingCart");
            var jsonstr = JSON.parse(ShoppingCart.substr(1, ShoppingCart.length));
            var productlist = jsonstr.productlist;
            var list = [];
            for (var i in productlist) {
                if (productlist[i].id == id) {

                } else {
                    list.push(productlist[i]);
                }
            }
            jsonstr.productlist = list;
            utils.setParam("ShoppingCart", "'" + JSON.stringify(jsonstr));
        }
    };
//添加产品到购物车
    $(".carBtn").on("click", function () {
        var thisLI = $(this).parent("div").parent("li");
        var LiLink = thisLI.children("a").attr("href");
        var LiTil = thisLI.children("a").children("h3").text();
        var LiImgSrc = thisLI.children("a").children(".productsBox").children("img").attr("src");
        var LiTxt = thisLI.children("a").children(".productTxt").text();
        var LiP = thisLI.children(".productDown").children("p").text();
        var product = {
            id: LiLink,
            name: LiTil,
            productImg: LiImgSrc,
            productTxt: LiTxt,
            price: LiP
        };
        //商品添加到购物车
        cart.addproduct(product);
        var productlist = cart.getproductlist();
        console.log(productlist);
        $("#CarNumber").text(productlist.length);
    });
    $(".carBtn1").on("click", function () {
        var thisLI = $(this).parent("li");
        var LiLink = thisLI.children("a").attr("href");
        var LiTil = thisLI.children(".productsdTil").children("h3").text();
        var LiImgSrc = thisLI.children(".contBox").children("img").attr("src");
        var LiTxt = thisLI.children(".productDetails").children("i").text();
        var LiP = thisLI.children(".productDetails").children("p").text();
        var product = {
            id: LiLink,
            name: LiTil,
            productImg: LiImgSrc,
            productTxt: LiTxt,
            price: LiP
        };
        //商品添加到购物车
        cart.addproduct(product);
        var productlist = cart.getproductlist();
        console.log(productlist);
        $("#CarNumber").text(productlist.length);
    });
//取出商品在购物车展示
    var productlist = cart.getproductlist();
// 显示购物车商品数
    $("#CarNumber").text(productlist.length);
    var cars = $("#cars");
    for (var i = 0; i < productlist.length; i++) {
        cars.append("<li class=\"clearFix\">\n" +
            "            <div class=\"carBox\">\n" +
            "                <img src=\"" + productlist[i].productImg + "\" alt=\"product Img\"/>\n" +
            "            </div>\n" +
            "            <div class=\"carCont clearFix\">\n" +
            "                <div class=\"carDetails fl\">\n" +
            "                    <h3>" + productlist[i].name + "</h3>\n" +
            "                    <div>" + productlist[i].productTxt + "</div>\n" +
            "                </div>\n" +
            "                <p class=\"fl\">" + productlist[i].price + "</p>\n" +
            "                <button class=\"Delete fr\">删除</button>\n" +
            "            </div>\n" +
            "<a href=\"" + productlist[i].id + "\"></a>" +
            "        </li>");
    }
//删除购物车产品
    $(".Delete").on("click", function () {
        var deleteId = $(this).parent(".carCont").next("a").attr("href");
        cart.deleteproduct(deleteId);
        // 显示购物车商品数
        $("#CarNumber").text(productlist.length);
        //刷新当前页面
        window.location.reload();
    });
};