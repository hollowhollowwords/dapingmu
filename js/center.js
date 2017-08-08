var page={
	//初始化
	init:function(){
		var _this=this;
		this.addLine();  //添加检测合格率图表
		this.addBar();   //添加检测类别分布图表
		this.addTop();  //添加统一数据
	},
    // 加载溯源数据折线图
    loadLineChart: function (data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('lineChart'));

        myChart.setOption(option = {
            title: {
                text: '检测合格率',
                 textStyle: {
                    color: '#ffffff',
                    fontWeight:'normal',
                    fontSize:16
                },
                // 分别设置四个方向的内边距
				padding: [
				    10,  // 上
				    0, // 右
				    10,  // 下
				    10, // 左
				]
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
                extraCssText: 'width:200px;height:80px;',
                formatter: function (params) {
					  return '检测合格率' + params[2].name  + '<br />'  +params[2].value;
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
                min: 0,
                max: 100,
                splitLine: {
                    show: false
                }
            },
            series: [
	            {
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
	                        color: '#E0DE33'
	                    }
	                },
	                showSymbol: false
	            }]
        });
        myChart.setOption(option);
    },
	//饼图初始化
	loadBarChart:function(data){
   	 // 基于准备好的dom，初始化echarts实例
		var barChart = echarts.init(document.getElementById('barChart'));

        barChart.setOption(option = {
		    title : {
		        text: '检测类别分布',
		        x:'left',
		        textStyle: {
                    color: '#ffffff',
                    fontWeight:'normal',
                    fontSize:16
                },
                // 分别设置四个方向的内边距
				padding: [
				    10,  // 上
				    0, // 右
				    10,  // 下
				    10, // 左
				]
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)",
		        extraCssText: 'width:200px;height:80px;',
		    },

		    series : [
		        {
		            name: '类别分布',
		            type: 'pie',
		            radius: ['20%', '50%'],
		            center: ['50%', '60%'],
		           	color:['#0C64DF', '#0CC4DF','#EBB558','#F7D667','#9AB6DA'],    //饼图颜色
		            data:[
		                {value:data[0].value, name:data[0].name},
		                {value:data[1].value, name:data[1].name},
		                {value:data[2].value, name:data[2].name},
		                {value:data[3].value, name:data[3].name},
		                {value:data[4].value, name:data[4].name}
		            ],
                  	itemStyle : {
	              		normal : {
	                 		label : {
	                     	 		formatter : function (params) {      //提示信息回调方法                   
	                     	 	  		return params.name+": "+params.percent+ '%' ;
	                     		},

	                  		},
	                  		labelLine : {
	                      		show : true
	                  	}
	              		}
	            	} 
		        }
		    ]
		});
	},
	//添加信息
	addLine:function(){
		var _this=this;
		$.ajax({
			type: "get",
			url: "http://farm.tnktech.cn/WisdomFarmCenter/MobileFarmServiceController.do?getlinedata",
			jsonp: "callback",
			dataType: "jsonp", // 处理Ajax跨域问题
			success: function(data) {
				if(data.code == 1000) {
					_this.loadLineChart(data.data);	//添加数据
				}else if(data.code == 1001) { //暂无数据	
					$("#lineChart").next().show();  //显示暂无数据
				}		
			},
			error: function(data) {
				alert("访问数据错误！请重试");
			}
		});
	},
	addBar:function(){
		var _this=this;
		$.ajax({
			type: "get",
			url: "http://farm.tnktech.cn/WisdomFarmCenter/MobileService.do?getbardata",
			jsonp: "callback",
			dataType: "jsonp", // 处理Ajax跨域问题
			success: function(data) {
				if(data.status == 0) {
					_this.loadBarChart(data.context);	//添加数据
				}else if(data.status == 1) { //暂无数据	
					$("#barChart").next().show();  //显示暂无数据
				}	
			},
			error: function(data) {
				alert("访问数据错误! 请重试");
			}
		});
	},
	addTop:function(){
		var _this= this;
		//获取当前格式化后的时间
		var nowtime = _this.getNowFormatDate();
		$.ajax({
			type: "get",
			url: "http://farm.tnktech.cn/WisdomFarmCenter/MobileFarmServiceController.do?getmarketcount",
			data:{time:nowtime},
			jsonp: "callback",
			dataType: "jsonp", // 处理Ajax跨域问题
			success: function(data) {
				if(data.code == 1000) {
					 _this.showTop(data);		//添加数据	
				}else if(data.code == 1001) { //暂无数据	
					 _this.emptyTop("暂无数据");
				}	
			},
			error: function(data) {
				alert("访问数据错误！请重试");
			}
		});
	},
	showTop:function(data){
		var _this=this;
		//添加统计数据
		$("#marketNum").html(_this.textNum(data.marketCount));  //市场总数 
		$("#clientNum").html(_this.textNum('9538')); // 商户总量
		$("#todayNum").html(_this.textNum('923400'));  // 日客流量
		$("#checkNum").html(_this.textNum(data.checkCount));  //日检验量
		// 添加市场列表数据
		var str ="";
		var str2 ="";
		for(var i =0;i < data.data.length;i++){
			if(i<10){   //前十条数据
				str+='<li><div class="area">'+data.data[i].proarea+'</div><div class="num" >'+data.data[i].procount+'</span><span class="danwei">家</span></div><div class="point '+data.data[i].decisionresult+'"></div></li>'
			}else{     //后四条数据
				str2+='<li><div class="area">'+data.data[i].proarea+'</div><div class="num" >'+data.data[i].procount+'</span><span class="danwei">家</span></div><div class="point '+data.data[i].decisionresult+'"></div></li>'
			}
		}
		$("#margketList").append(str);  //添加左侧列表
		$("#margketList2").append(str2);  //添加右侧列表侧列表
	},
	emptyTop:function(data){
		var _this=this;
		//添加统计数据
		$(".home").hide();
		$("#marketNum").html(data);  //市场总数
		$("#clientNum").html(data); // 客户总量
		$("#todayNum").html(data);  // 日客流量
		$("#checkNum").html(data);  //日检验量
		// 添加市场列表数据
		$("#margketList .empty").show();
	}
	,getNowFormatDate:function (){
	   var day = new Date();
	   var Year = 0;
	   var Month = 0;
	   var Day = 0;
		var CurrentDate = "";
		   //初始化时间
		   //Year       = day.getYear();//有火狐下2008年显示108的bug
		   Year       = day.getFullYear();//ie火狐下都可以
		   Month      = day.getMonth()+1;
		   Day        = day.getDate();
		   
		   CurrentDate += Year + "-";
		   
		   if (Month >= 10 )
		   {
		    CurrentDate += Month + "-";
		   }
		   else
		   {
		    CurrentDate += "0" + Month + "-";
		   }
		   if (Day >= 10 )
		   {
		    CurrentDate += Day ;
		   }
		   else
		   {
		    CurrentDate += "0" + Day ;
		   }

		   return CurrentDate;
		},
	//为数值添加分隔号  33,333
	textNum:function (num){   //注意num是字符串类型
		var str=num.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
		return str;
	}

}

//初始化
page.init();


