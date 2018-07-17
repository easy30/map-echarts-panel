import { MetricsPanelCtrl } from 'app/plugins/sdk'; // eslint-disable-line
import _ from 'lodash';
import echarts from './libs/echarts.min'; // eslint-disable-line
import './libs/echarts-liquidfill.min'; // eslint-disable-line
import './libs/echarts-wordcloud.min'; // eslint-disable-line
import './libs/dark'; // eslint-disable-line
import './css/style.css!'; // eslint-disable-line
//import './libs/bmap.js'; // eslint-disable-line
import './libs/china.js' // eslint-disable-line
//import './libs/beijing.js'// eslint-disable-line
//import './libs/jiangxi.js'// eslint-disable-line
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
             '上海': 'public/plugins/map-echarts-panel/libs/data-1482909900836-H1BC_1WHg.json',
             '河北': 'public/plugins/map-echarts-panel/libs/data-1482909799572-Hkgu_yWSg.json',
             '山西': 'public/plugins/map-echarts-panel/libs/data-1482909909703-SyCA_JbSg.json',
             '内蒙古': 'public/plugins/map-echarts-panel/libs/data-1482909841923-rkqqdyZSe.json',
             '辽宁': 'public/plugins/map-echarts-panel/libs/data-1482909836074-rJV9O1-Hg.json',
             '吉林': 'public/plugins/map-echarts-panel/libs/data-1482909832739-rJ-cdy-Hx.json',
             '黑龙江': 'public/plugins/map-echarts-panel/libs/data-1482909803892-Hy4__J-Sx.json',
             '江苏': 'public/plugins/map-echarts-panel/libs/data-1482909823260-HkDtOJZBx.json',
             '浙江': 'public/plugins/map-echarts-panel/libs/data-1482909960637-rkZMYkZBx.json',
             '安徽': 'public/plugins/map-echarts-panel/libs/data-1482909768458-HJlU_yWBe.json',
             '福建': 'public/plugins/map-echarts-panel/libs/data-1478782908884-B1H6yezWe.json',
             '江西': 'public/plugins/map-echarts-panel/libs/data-1482909827542-r12YOJWHe.json',
             '山东': 'public/plugins/map-echarts-panel/libs/data-1482909892121-BJ3auk-Se.json',
             '河南': 'public/plugins/map-echarts-panel/libs/data-1482909807135-SJPudkWre.json',
             '湖北': 'public/plugins/map-echarts-panel/libs/data-1482909813213-Hy6u_kbrl.json',
             '湖南': 'public/plugins/map-echarts-panel/libs/data-1482909818685-H17FOkZSl.json',
             '广东': 'public/plugins/map-echarts-panel/libs/data-1482909784051-BJgwuy-Sl.json',
             '广西': 'public/plugins/map-echarts-panel/libs/data-1482909787648-SyEPuJbSg.json',
             '海南': 'public/plugins/map-echarts-panel/libs/data-1482909796480-H12P_J-Bg.json',
             '四川': 'public/plugins/map-echarts-panel/libs/data-1482909931094-H17eKk-rg.json',
             '贵州': 'public/plugins/map-echarts-panel/libs/data-1482909791334-Bkwvd1bBe.json',
             '云南': 'public/plugins/map-echarts-panel/libs/data-1482909957601-HkA-FyWSx.json',
             '西藏': 'public/plugins/map-echarts-panel/libs/data-1482927407942-SkOV6Qbrl.json',
             '陕西': 'public/plugins/map-echarts-panel/libs/data-1482909918961-BJw1FyZHg.json',
             '甘肃': 'public/plugins/map-echarts-panel/libs/data-1482909780863-r1aIdyWHl.json',
             '青海': 'public/plugins/map-echarts-panel/libs/data-1482909853618-B1IiOyZSl.json',
             '宁夏': 'public/plugins/map-echarts-panel/libs/data-1482909848690-HJWiuy-Bg.json',
             '新疆': 'public/plugins/map-echarts-panel/libs/data-1482909952731-B1YZKkbBx.json',
             '北京': 'public/plugins/map-echarts-panel/libs/data-1482818963027-Hko9SKJrg.json',
             '天津': 'public/plugins/map-echarts-panel/libs/data-1482909944620-r1-WKyWHg.json',
             '重庆': 'public/plugins/map-echarts-panel/libs/data-1482909775470-HJDIdk-Se.json',
             '香港': 'public/plugins/map-echarts-panel/libs/data-1461584707906-r1hSmtsx.json',
             '澳门': 'public/plugins/map-echarts-panel/libs/data-1482909771696-ByVIdJWBx.json'
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
    let urlData;
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
          urlData = JSON.parse(xmlhttp.responseText);
          that.data = urlData.items;
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
                          normal: {areaColor: '#3a8eff' ,borderColor:'#3a8eff'},
                          emphasis: {areaColor: '#3a8eff' }
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
            let mapCode = ctrl.provinces[ctrl.paramValue];
            ctrl.loadMap(mapCode,ctrl.paramValue,myChart);
        }
      }
      myChart.resize();
    }

    let timeFn = null;

    //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
    myChart.on('click', function(params) {
        clearTimeout(timeFn);
        //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
        timeFn = setTimeout(function() {
            var name = params.name; //地区name
            var mapCode = ctrl.provinces[name]; //地区的json数据
            if (!mapCode) {
                return;
            }
            ctrl.paramValue = name;
            ctrl.updateData();
            ctrl.loadMap(mapCode,name,myChart);
            myChart.resize();
        }, 100);
    });

    // 绑定双击事件，返回全国地图
    myChart.on('dblclick', function(params) {
        clearTimeout(timeFn);
        ctrl.paramValue = '';
        //返回全国地图
        ctrl.updateData();
    });

    this.events.on('render', () => {
      render();
      ctrl.renderingCompleted();
    });
  }
}

EchartsCtrl.templateUrl = 'module.html';
