import { MetricsPanelCtrl } from 'app/plugins/sdk'; // eslint-disable-line
import _ from 'lodash';
import echarts from './libs/echarts.min'; // eslint-disable-line
import './libs/echarts-liquidfill.min'; // eslint-disable-line
import './libs/echarts-wordcloud.min'; // eslint-disable-line
import './libs/dark'; // eslint-disable-line
import './css/style.css!'; // eslint-disable-line
//import './libs/bmap.js'; // eslint-disable-line
import './libs/china.js' // eslint-disable-line
import './libs/beijing.js'// eslint-disable-line
import './libs/jiangxi.js'// eslint-disable-line
//import './libs/getBmap.js'; // eslint-disable-line

export class EchartsCtrl extends MetricsPanelCtrl { // eslint-disable-line

  constructor($scope, $injector) {
    super($scope, $injector);

    const panelDefaults = {
      EchartsOption: 'console.log(JSON.stringify(echartsData));\n\noption = {};',
      IS_MAP: false,
      map: '',
      METHODS: ['POST', 'GET'],
      USE_URL: false,
      USE_FAKE_DATA: true,
      fakeData: '',
      url: '',
      method: 'GET',
      params: '',
      updateInterval: 10000,
    };

    this.provinces = {
                 '上海':'public/plugins/map-echarts-panel/libs/shanghai.js',
                 '河北':'public/plugins/map-echarts-panel/libs/hebei.js',
                 '山西':'public/plugins/map-echarts-panel/libs/shanxi.js',
                 '内蒙古':'public/plugins/map-echarts-panel/libs/neimenggu.js',
                 '辽宁':'public/plugins/map-echarts-panel/libs/liaoning.js',
                 '吉林':'public/plugins/map-echarts-panel/libs/jilin.js',
                 '黑龙江':'public/plugins/map-echarts-panel/libs/heilongjiang.js',
                 '江苏':'public/plugins/map-echarts-panel/libs/jiangsu.js',
                 '浙江':'public/plugins/map-echarts-panel/libs/zhejiang.js',
                 '安徽':'public/plugins/map-echarts-panel/libs/anhui.js',
                 '福建':'public/plugins/map-echarts-panel/libs/fujian.js',
                 '江西':'public/plugins/map-echarts-panel/libs/data-jiangxi.json',
                 '山东':'public/plugins/map-echarts-panel/libs/shandong.js',
                 '河南':'public/plugins/map-echarts-panel/libs/henan.js',
                 '湖北':'public/plugins/map-echarts-panel/libs/hubei.js',
                 '湖南':'public/plugins/map-echarts-panel/libs/hunan.js',
                 '广东':'public/plugins/map-echarts-panel/libs/guangdong.js',
                 '广西':'public/plugins/map-echarts-panel/libs/guangxi.js',
                 '海南':'public/plugins/map-echarts-panel/libs/hainan.js',
                 '四川':'public/plugins/map-echarts-panel/libs/sichuan.js',
                 '贵州':'public/plugins/map-echarts-panel/libs/guizhou.js',
                 '云南':'public/plugins/map-echarts-panel/libs/yunnan.js',
                 '西藏':'public/plugins/map-echarts-panel/libs/xizang.js',
                 '陕西':'public/plugins/map-echarts-panel/libs/shanxi1.js',
                 '甘肃':'public/plugins/map-echarts-panel/libs/gansu.js',
                 '青海':'public/plugins/map-echarts-panel/libs/qinghai.js',
                 '宁夏':'public/plugins/map-echarts-panel/libs/ningxia.js',
                 '新疆':'public/plugins/map-echarts-panel/libs/xinjiang.js',
                 '北京':'public/plugins/map-echarts-panel/libs/data-beijing.json',
                 '天津':'public/plugins/map-echarts-panel/libs/tianjin.js',
                 '重庆':'public/plugins/map-echarts-panel/libs/chongqing.js',
                 '香港':'public/plugins/map-echarts-panel/libs/xianggang.js',
                 '澳门':'public/plugins/map-echarts-panel/libs/aomen.js',
                 '台湾':'public/plugins/map-echarts-panel/libs/taiwan.js'
             };

    this.maps = ['世界', '中国', '河北'];

    this.paramValue = '';

    _.defaults(this.panel, panelDefaults);

    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('data-error', this.onDataError.bind(this));
    this.events.on('data-snapshot-load', this.onDataReceived.bind(this));
    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));

    this.updateData();
  }

  //请求
  updateData() {
    const that = this;
    let xmlhttp;
    if (this.panel.USE_URL && this.panel.USE_FAKE_DATA && this.panel.fakeData) {
      this.data = eval(this.panel.fakeData);
    } else if (that.panel.USE_URL && !that.panel.USE_FAKE_DATA && that.panel.url && that.panel.method) {
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
      }
      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          that.data = JSON.parse(xmlhttp.responseText);
          that.onDataReceived();
        }
      };
      if(that.panel.method == 'GET'){
          if(that.paramValue == ''){
            xmlhttp.open(that.panel.method, that.panel.url, true);
          }else{
            xmlhttp.open(that.panel.method, that.panel.url + that.paramValue, true);
          }
          xmlhttp.send();
      }else{
        xmlhttp.open(that.panel.method, that.panel.url, true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(that.panel.params);
      }

    } else {
      xmlhttp = null;
    }
    this.$timeout(() => { this.updateData(); }, that.panel.updateInterval);
  }

  onDataReceived(dataList) {
    this.data = !this.panel.USE_URL && !this.panel.USE_FAKE_DATA ? dataList : this.data;
//    alert('onDataReceived-----' + JSON.stringify(this.data))
    this.IS_DATA_CHANGED = true;
    this.render();
    this.IS_DATA_CHANGED = false;
  }

  onDataError() {
    this.render();
  }

  onInitEditMode() {
    this.addEditorTab('Data Source', 'public/plugins/map-echarts-panel/partials/editer-metric.html', 2);
    this.addEditorTab('Ecahrts Configuration', 'public/plugins/map-echarts-panel/partials/editor-echarts.html', 3);
  }

  loadMap(mapCode,name,myChart) {
     let that = this;
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
                          data:that.data

                      }
                  ]
              };
//              alert('loadMap---' + JSON.stringify(that.data))
              myChart.setOption(option);
          } else {
//              alert('无法加载该地图');
          }
      });
  }

  link(scope, elem, attrs, ctrl) {
    const $panelContainer = elem.find('.echarts_container')[0];
    let option = {}; // eslint-disable-line
    let echartsData = []; // eslint-disable-line

    ctrl.IS_DATA_CHANGED = true;

    const myChart = echarts.init($panelContainer, 'dark');

    // bad hank
    setTimeout(() => {
      myChart.resize();
    }, 1000);

    function render() {
      if (!myChart) {
        return;
      }
      if (ctrl.IS_DATA_CHANGED) {
         myChart.clear();
        if(ctrl.paramValue == ''){
            echartsData = ctrl.data;
            eval(ctrl.panel.EchartsOption);
            myChart.setOption(option);
        }else{
//            alert('render---' + ctrl.paramValue)
            let mapCode = ctrl.provinces[ctrl.paramValue];
            ctrl.loadMap(mapCode,ctrl.paramValue,myChart);
        }
      }
      myChart.resize();
    }

    let timeFn = null;

    //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
    myChart.on('click', function(params) {
//        alert('click event----' + params.name);
        clearTimeout(timeFn);
        //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
        timeFn = setTimeout(function() {
            var name = params.name; //地区name
            var mapCode = ctrl.provinces[name]; //地区的json数据
            if (!mapCode) {
//                alert('无此区域地图显示');
                return;
            }
            ctrl.paramValue = name;
            ctrl.updateData();
            ctrl.loadMap(mapCode,name,myChart);
            myChart.resize();
        }, 100);
    });

    this.events.on('render', () => {
      render();
      ctrl.renderingCompleted();
    });
  }
}

EchartsCtrl.templateUrl = 'module.html';
