var page = {
    init: function () {
        var _this = this;
        // 获取时间
        var currentDate = calculateDate();
        // 加载数据
        $.ajax({
            url: 'http://farm.tnktech.cn/WisdomFarmCenter/purchaseController.do?getprovince',
            type: 'GET',
            data: {
                datebegin: currentDate
            },
            dataType: 'jsonp',
            success: function (res) {
                if (res.code == 1000) {
                    var data = res.data;
                    // 累计生成溯源数据
                    $('.accumulated_data .da_numer').html(data.provinceall);
                    // 今日溯源数据
                    $('.pie_chart .da_numer').html(data.province);
                    // 总溯源数据分类
                    var $dataItem = $('.data_list .data_item');
                    var dataAll = data.jsonArray;
                    for (var i = 0; i < dataAll.length; i++) {
                        var str = '';
                        str = '<div class="name_word"><p class="name">' + dataAll[i]['sampletype'] + '</p><p class="number">' + dataAll[i]['allnumber'] + '</p></div><div class="line"><span class="data_line"></span></div>'
                        $($dataItem[i]).html(str);
                    };
                    // 今日溯源数据饼状图
                    var dataToday = data.jsonarray;
                    _this.loadDataGraph(dataToday);
                    // 溯源数据分类进度条
                    var total = data.provinceall;
                    // 溯源分类百分比
                    var per = [];
                    for (var j = 0; j < dataAll.length; j++) {
                        var currentPer = Math.round(dataAll[j]['allnumber'] / total * 100) + '%';
                        per.push(currentPer);
                    }
                    // 设置宽度
                    $('.data_list .data_item').each(function (index, value) {
                        $(value).find('.data_line').css({
                            'width': per[index]
                        })
                    })

                }
            },
            error: function () {
                alert('访问数据错误！请重试');
            }
        })
        // 加载折线图数据
        $.ajax({
            url: 'http://farm.tnktech.cn/WisdomFarmCenter/purchaseController.do?province',
            type: 'GET',
            data: {
                datebegin: currentDate
            },
            dataType: 'jsonp',
            success: function (res) {
                // 接受折线图数据的数组
                var dataArray = [];
                if (res.code == 1000) {
                    var data = res.data;
                    for (var i = 0, iLenght = data.length; i < iLenght; i++) {
                        var inArr = [];
                        inArr[0] = data[i]['time'];
                        inArr[1] = data[i]['provincenumber'];
                        dataArray.push(inArr);
                    }
                    _this.loadLineChart(dataArray);
                }
            },
            error: function () {
                alert('访问数据错误！请重试');
            }
        })
    },
    // 加载溯源数据饼状图
    loadDataGraph: function (data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('dataGraph'));
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            textStyle: {
                fontSize: 28
            },
            series: [
                {
                    name: '溯源数据',
                    type: 'pie',
                    radius: [0, '30%'],
                    // 设置饼图的颜色
                    color: ['#eb6e58', '#0c64df', '#f7d667', '#9ab6da', '#9a4333'],
                    radius: ['45%', '70%'],
                    data: [
                        { value: data[0]['number'], name: data[0]['sampletype'] + data[0]['number'] },
                        { value: data[1]['number'], name: data[1]['sampletype'] + data[1]['number'] },
                        { value: data[2]['number'], name: data[2]['sampletype'] + data[2]['number'] },
                        { value: data[3]['number'], name: data[3]['sampletype'] + data[3]['number'] },
                        { value: data[4]['number'], name: data[4]['sampletype'] + data[4]['number'] },
                    ]
                }
            ]
        };
        myChart.setOption(option);
    },
    // 加载溯源数据折线图
    loadLineChart: function (data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('lineChart'));

        myChart.setOption(option = {
            title: {
                text: '溯源数据月统计',
                textStyle: {
                    color: '#ffffff'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#ccc',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        textStyle: {
                            color: '#222'
                        }
                    }
                },
                formatter: function (params) {
                    return '溯源数据月统计' + params[2].name + '<br />' + params[2].value;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: data.map(function (item) {
                    return item[0];
                }),
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                nameTextStyle: {
                    color: '#ffffff'
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#fff'
                    }
                },
                splitLine: {
                    show: false
                },
                splitNumber:3,
            },
            series: [{
                name: 'L',
                type: 'line',
                data: data,
                lineStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                stack: 'confidence-band',
                symbol: 'none'
            }, {
                name: 'U',
                type: 'line',
                data: data,
                lineStyle: {
                    normal: {
                        opacity: 0
                    }
                },
                stack: 'confidence-band',
                symbol: 'none'
            }, {
                type: 'line',
                data: data,
                hoverAnimation: false,
                symbolSize: 3,
                itemStyle: {
                    normal: {
                        color: '#ffffff'
                    }
                },
                showSymbol: false,
                areaStyle: {
                    normal: {
                        color: '#5d4a19'
                    }
                }
            }]
        });
        myChart.setOption(option);
    }
}

// 获取xxxx-xx-xx格式的时间
function calculateDate() {
    var now = new Date();

    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    return (clock);
}

// 初始化
page.init();
