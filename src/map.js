var provinces = {
    '上海':'./libs/shanghai.js',
    '河北':'./libs/hebei.js',
    '山西':'./libs/shanxi.js',
    '内蒙古':'./libs/neimenggu.js',
    '辽宁':'./libs/liaoning.js',
    '吉林':'./libs/jilin.js',
    '黑龙江':'./libs/heilongjiang.js',
    '江苏':'./libs/jiangsu.js',
    '浙江':'./libs/zhejiang.js',
    '安徽':'./libs/anhui.js',
    '福建':'./libs/fujian.js',
    '江西':'./libs/jiangxi.js',
    '山东':'./libs/shandong.js',
    '河南':'./libs/henan.js',
    '湖北':'./libs/hubei.js',
    '湖南':'./libs/hunan.js',
    '广东':'./libs/guangdong.js',
    '广西':'./libs/guangxi.js',
    '海南':'./libs/hainan.js',
    '四川':'./libs/sichuan.js',
    '贵州':'./libs/guizhou.js',
    '云南':'./libs/yunnan.js',
    '西藏':'./libs/xizang.js',
    '陕西':'./libs/shanxi1.js',
    '甘肃':'./libs/gansu.js',
    '青海':'./libs/qinghai.js',
    '宁夏':'./libs/ningxia.js',
    '新疆':'./libs/xinjiang.js',
    '北京':'./libs/beijing.js',
    '天津':'./libs/tianjin.js',
    '重庆':'./libs/chongqing.js',
    '香港':'./libs/xianggang.js',
    '澳门':'./libs/aomen.js',
    '台湾':'./libs/taiwan.js'
};

function loadMap(mapCode, name) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                title : {
                    text: name,
                    left: 'center',
                    textStyle:{color:'#ffffff',fontSize:12}
                },
                geo: {
                    map: name,
                    itemStyle: {
                            normal: {areaColor: '#08affe' ,borderColor:'#08affe'},
                            emphasis: {areaColor: '#08affe' }
                        },
                label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        }
                    },
                backgroundColor: '#21242b',
                series: [
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol:'pin',
                        symbolSize:12,
                        data:ctrl.data

                    }
                ]
            };
            myChart.setOption(option);
        } else {
            alert('无法加载该地图');
        }
    });
}

function loadChinaMap(mapCode, name,data) {
    $.get(mapCode, function(data) {
        if (data) {
            echarts.registerMap(name, data);
            var option = {
                title : {

                },
                tooltip : {
                    trigger: 'item',
                            padding:[0,1,0,4],
                            backgroundColor:'#ff9600',
                            textStyle:{color: '#ffffff',fontSize:12},
                            formatter : function (params) {
                            return '<span style="padding-right:4px;">' + params.value + '</span><span style="background-color:#ffffff;color:#444444;">' + params.name +'</span>';
                        }
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                visualMap: {
                    text:['高','低'],
                    calculable: false,
                    color: ['#06429f','#08affe'],
                            textStyle:{color:'#06429f'}
                },
                   backgroundColor: '#21242b',
                series : [
                    {
                        type: 'map',
                        mapType: 'china',
                        hoverable: true,
                        roam:true,
                        itemStyle:{
                            normal:{label:{show:false},areaColor: '#08affe',borderColor: '#21242b'},
                            emphasis:{label:{show:false},areaColor: '#06429f'}
                        },
                        mapLocation: {
                            y: "center",
                            x: "center",
                            height: "520"
                        },
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        data: ctrl.data
                    }
                ]
            };
            myChart.setOption(option);
        } else {
            alert('无法加载该地图');
        }
    });
}