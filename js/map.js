var page = {
    init: function () {
         var _this= this;
         _this.addData();
    },
    addData:function(){
        $.ajax({
            type: "get",
            url: "http://farm.tnktech.cn/WisdomFarmCenter/MobileFarmServiceController.do?getmapfarm",
            jsonp: "callback",
            dataType: "jsonp", // 处理Ajax跨域问题
            success: function(dataObj) {
                if(dataObj.code == 1000) {
                    // 获取商户数据
                    var data = dataObj.data;
                    // 循环商户
                    for (var i = 0, iLength = data.length; i < iLength; i++) {
                        putPosition(data[i]['proarea'], data[i]['marketdata'] )
                    }
                }else if(dataObj.code == 1001) { //暂无数据    
                     
                }   
            },
            error: function(data) {
                alert("访问数据错误！请重试");
            }
        });
    }
}


// 放置坐标点
function putPosition(proarea, marketdata) {
    // 获取各个区中心点的top,left值
    var posData = [];
    var $names = $('.circle .name');
    // 循环每个name的中心点偏移值
    for (var i = 0; i < $names.length; i++) {
        var currenIndex = i + 1;
        // 中间变量 
        var inObj = {};
        inObj['top'] = $('.name' + currenIndex).offset().top-$('.map').offset().top;
        inObj['left'] = $('.name' + currenIndex).offset().left-$('.map').offset().left;
        posData.push(inObj);
    }
    // 根据区域给坐标点
    // 康平县
    if (proarea == '康平县') {
        var top = posData[0].top;
        var left = posData[0].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -59 + 30);
            var randomNum2 = Math.round(Math.random() * -59 + 30);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle1').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle1').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle1 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 法库县
    if (proarea == '法库县') {
        var top = posData[1].top;
        var left = posData[1].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -59 + 30);
            var randomNum2 = Math.round(Math.random() * -59 + 30);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle2').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle2').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle2 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 新民市
    if (proarea == '新民市') {
        var top = posData[2].top;
        var left = posData[2].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -79 + 40);
            var randomNum2 = Math.round(Math.random() * -79 + 40);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle3').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle3').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle3 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 辽中区
    if (proarea == '辽中区') {
        var top = posData[3].top;
        var left = posData[3].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -39 + 30);
            var randomNum2 = Math.round(Math.random() * -39 + 30);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle4').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle4').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle4 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 沈北新区
    if (proarea == '沈北新区') {
        var top = posData[4].top;
        var left = posData[4].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -39 + 20);
            var randomNum2 = Math.round(Math.random() * -39 + 20);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle5').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle5').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle5 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 浑南区
    if (proarea == '浑南区') {
        var top = posData[5].top;
        var left = posData[5].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -39 + 20);
            var randomNum2 = Math.round(Math.random() * -39 + 20);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle6').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle6').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle6 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 苏家屯区
    if (proarea == '苏家屯区') {
        var top = posData[6].top;
        var left = posData[6].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -39 + 20);
            var randomNum2 = Math.round(Math.random() * -39 + 20);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle7').append('<span class="red pos pos' + i + '"><span>')
            }else{
                $('.circle7').append('<span class="pos pos' + i + '"><span>')
            };
            $('.circle7 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 于洪区
    if (proarea == '于洪区') {
        var top = posData[7].top;
        var left = posData[7].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -39 + 20);
            var randomNum2 = Math.round(Math.random() * -39 + 20);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle8').append('<span class="red poss pos' + i + '"><span>')
            }else{
                $('.circle8').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle8 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 铁西区
    if (proarea == '铁西区') {
        var top = posData[8].top;
        var left = posData[8].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -19 + 10);
            var randomNum2 = Math.round(Math.random() * -19 + 10);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle9').append('<span class="red poss pos' + i + '"><span>')
            }else{
                $('.circle9').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle9 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 和平区
    if (proarea == '和平区') {
        var top = posData[9].top;
        var left = posData[9].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -19 + 10);
            var randomNum2 = Math.round(Math.random() * -19 + 10);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle10').append('<span class="red poss pos' + i + '"><span>')
            }else{
                $('.circle10').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle10 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 沈河区
    if (proarea == '沈河区') {
        var top = posData[10].top;
        var left = posData[10].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -19 + 10);
            var randomNum2 = Math.round(Math.random() * -19 + 10);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle11').append('<span class="red poss pos' + i + '"><span>')
            }else{
                $('.circle11').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle11 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 皇姑区
    if (proarea == '皇姑区') {
        var top = posData[11].top;
        var left = posData[11].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * -19 + 10);
            var randomNum2 = Math.round(Math.random() * -19 + 10);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle12').append('<span class="red poss pos' + i + '"><span>')
            }else{
                $('.circle12').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle12 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 大东区
    if (proarea == '大东区') {
        var top = posData[12].top;
        var left = posData[12].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * 19 + 1);
            var randomNum2 = Math.round(Math.random() * -19 + 10);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle13').append('<span class="red poss pos' + i + '"><span>');
            }else{
                $('.circle13').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle13 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
    // 经济开发区
    if (proarea == '经开区') {
        var top = posData[13].top;
        var left = posData[13].left;
        for (var i = 0; i < marketdata.length; i++) {
            // 获取随机数
            var randomNum1 = Math.round(Math.random() * 19 + 1);
            var randomNum2 = Math.round(Math.random() * -19 + 10);
            if(marketdata[i]['percentstate']=='red'){
                $('.circle13').append('<span class="red poss pos' + i + '"><span>');
            }else{
                $('.circle13').append('<span class="poss pos' + i + '"><span>')
            };
            $('.circle13 .pos' + i).css({
                'top': top + randomNum1,
                'left': left + randomNum2
            })
        }
    };
}

// 获取10到20的随机数

// 执行
page.init();