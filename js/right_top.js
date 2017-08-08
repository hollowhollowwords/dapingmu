var page = {
    init: function () {
        var _this = this;
        // 将合格率部分隐藏
        $('.qualified_rate').hide();
        // 将检测单位隐藏
        $('.detection_dw .desc').hide();
        // 获取时间
        var currentDate = calculateDate();
        // 加载今日数据
        $.ajax({
            url: 'http://farm.tnktech.cn/WisdomFarmCenter/MobileFarmServiceController.do?getCheckData',
            type: 'GET',
            dataType: 'jsonp',
            data: {
                detectiontime: currentDate
            },
            success: function (res) {
                var data = res.data;
                // 处理合格率所需值
                var qualified = 0;
                var unqualified = 0;
                var total = 100;
                if (res.code == 1000) {
                    // 累计检测批次
                    $('.accumulative_detection .number').html(data.dataSum);
                    // 检测批次
                    $('.batch .number').html(data.todayDataSum);
                    // 检测品种
                    $('.varieties .number').html(data.todayDataTypeSum);
                    // 检测商家
                    $('.business .number').html(data.todayDataInspectedunitSum);
                    // 合格率
                    if (data.percent !== '0.00') {
                        $('.qualified_rate').show();
                        $('.qualified_rate .number').html(data.percent);
                    }
                    // 加载合格率饼状图(处理一下百分数)
                    qualified = data.percent;
                    unqualified = total - qualified;
                    _this.loadQualifiedRate(qualified, unqualified);
                    // 居中
                    _this.textCenter();
                }
            },
            error: function () {
                alert('访问数据错误！请重试');
            }
        })
        // 加载本月检测数据走势图
        $.ajax({
            url: 'http://farm.tnktech.cn/WisdomFarmCenter/MobileFarmServiceController.do?columnarOrder',
            type: 'GET',
            dataType: 'jsonp',
            success: function (res) {
                if (res.code == 1000) {
                    _this.loadDataChart(res.data);
                }
            },
            error: function () {
                alert('访问数据错误！请重试');
            }
        })
        // 加载检测异常数
        $.ajax({
            url: 'http://farm.tnktech.cn/WisdomFarmCenter/disqualificationReasonsController.do?faultinfo',
            type: 'GET',
            data: {
                datebegin: currentDate
            },
            dataType: 'jsonp',
            success: function (res) {
                if (res.code == 1000) {
                    var data = res.data;
                    var str = '';
                    var listData = 0;
                    // 显示检测单位
                    $('.detection_dw .desc').show();
                    $('.the_number .number').html(res.faultinfo);
                    // 检测名称
                    $('.inspection_category .name').html(data[listData][0]['inspection']);
                    // 是否合格
                    $('.inspection_category .desc').html(data[listData][0]['decisionresult']);
                    if (data[listData][0]['decisionresult'] == '不合格') {
                        $('.inspection_category .desc').addClass('unqualified');
                    } else {
                        $('.inspection_category .desc').removeClass('unqualified');
                    }
                    // 检测项目
                    $('.test_item .desc').html(data[listData][0]['checktype']);
                    // 检测时间
                    $('.detection_time .desc').html(data[listData][0]['detectiontime']);
                    // 检测人
                    $('.tester .desc').html(data[listData][0]['checkperson']);
                    // 近日检测异常数表格数据
                    for (var i = 0; i < data[listData][1].length; i++) {
                        var currentIndex = i + 1;
                        if(currentIndex<=5){
                            str += '<tr><td class="serial_number">' + currentIndex + '</td><td class="time">' + data[listData][1][i]['time'] + '</td><td class="residual_value">' + data[listData][1][i]['checkresult'] + '</td><td class="result unqualified">' + data[listData][1][i]['result'] + '</td></tr>'
                        };
                    }
                    $('.detection_table tbody').html(str);
                } else if (res.code == 1001) {
                    $('.the_number .number').html(res.faultinfo);
                    $('.detection_table tbody').html('<span class="no_data">' + res.message + '</span>');
                }
            },
            error: function () {
                alert('访问数据错误！请重试');
            }
        })
    },
    // 处理合格率文字居中
    textCenter: function () {
        var spanLeft = $('.qualified_rate .text').width() / 2;
        var spanTop = $('.qualified_rate .text').height() / 2;
        $('.qualified_rate .text').css({
            'margin-left': -spanLeft,
            'margin-top': -spanTop,
        })
    },
    // 加载合格率
    loadQualifiedRate: function (qualified, unqualified) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('qualifiedRate'));
        option = {
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['65%', '75%'],
                    // 设置饼图的颜色
                    color: ['#fd0505', '#f7d667'],
                    avoidLabelOverlap: false,
                    data: [
                        { value: unqualified, name: '不合格' },
                        { value: qualified, name: '合格' },
                    ]
                }
            ]
        };
        // 执行
        myChart.setOption(option);
    },
    // 加载本月检测数据走势图
    loadDataChart: function (data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('dataChart'));

        var data = data;


        myChart.setOption(option = {
            title: {
                text: '本月检测数据走势图',
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
                    return  "检测数据"+params[2].name + '<br />' + params[2].value;
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
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
                splitNumber: 3,
                splitLine: {
                    show: false
                }
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
                symbolSize: 6,
                itemStyle: {
                    normal: {
                        color: '#53fd4f'
                    }
                },
                showSymbol: false
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
