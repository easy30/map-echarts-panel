'use strict';

System.register(['app/plugins/sdk', 'lodash', './libs/echarts.min', './libs/echarts-liquidfill.min', './libs/echarts-wordcloud.min', './libs/dark', './css/style.css!', './libs/china.js'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, echarts, _createClass, EchartsCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_libsEchartsMin) {
            echarts = _libsEchartsMin.default;
        }, function (_libsEchartsLiquidfillMin) {}, function (_libsEchartsWordcloudMin) {}, function (_libsDark) {}, function (_cssStyleCss) {}, function (_libsChinaJs) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('EchartsCtrl', EchartsCtrl = function (_MetricsPanelCtrl) {
                _inherits(EchartsCtrl, _MetricsPanelCtrl);

                // eslint-disable-line

                function EchartsCtrl($scope, $injector) {
                    _classCallCheck(this, EchartsCtrl);

                    var _this = _possibleConstructorReturn(this, (EchartsCtrl.__proto__ || Object.getPrototypeOf(EchartsCtrl)).call(this, $scope, $injector));

                    var panelDefaults = {
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
                        updateInterval: 10000
                    };

                    _this.provinces = {
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

                    _this.maps = ['世界', '中国', '河北'];

                    _this.paramValue = '';

                    _.defaults(_this.panel, panelDefaults);

                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('panel-initialized', _this.render.bind(_this));

                    _this.updateData();
                    return _this;
                }

                //请求


                _createClass(EchartsCtrl, [{
                    key: 'updateData',
                    value: function updateData() {
                        var _this2 = this;

                        var that = this;
                        var urlData = void 0;
                        var xmlhttp = void 0;
                        if (this.panel.USE_URL && this.panel.USE_FAKE_DATA && this.panel.fakeData) {
                            this.data = eval(this.panel.fakeData);
                        } else if (that.panel.USE_URL && !that.panel.USE_FAKE_DATA && that.panel.url && that.panel.method) {
                            if (window.XMLHttpRequest) {
                                xmlhttp = new XMLHttpRequest();
                            } else {
                                xmlhttp = new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
                            }
                            xmlhttp.onreadystatechange = function () {
                                if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                                    urlData = JSON.parse(xmlhttp.responseText);
                                    that.data = urlData.items;
                                    that.onDataReceived();
                                }
                            };
                            if (that.panel.method == 'GET') {
                                if (that.paramValue == '') {
                                    xmlhttp.open(that.panel.method, that.panel.url, true);
                                } else {
                                    xmlhttp.open(that.panel.method, that.panel.url + that.paramValue, true);
                                }
                                xmlhttp.send();
                            } else {
                                xmlhttp.open(that.panel.method, that.panel.url, true);
                                xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                                xmlhttp.send(that.panel.params);
                            }
                        } else {
                            xmlhttp = null;
                        }
                        this.$timeout(function () {
                            _this2.updateData();
                        }, that.panel.updateInterval);
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        this.data = !this.panel.USE_URL && !this.panel.USE_FAKE_DATA ? dataList : this.data;
                        //    alert('onDataReceived-----' + JSON.stringify(this.data))
                        this.IS_DATA_CHANGED = true;
                        this.render();
                        this.IS_DATA_CHANGED = false;
                    }
                }, {
                    key: 'onDataError',
                    value: function onDataError() {
                        this.render();
                    }
                }, {
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Data Source', 'public/plugins/map-echarts-panel/partials/editer-metric.html', 2);
                        this.addEditorTab('Ecahrts Configuration', 'public/plugins/map-echarts-panel/partials/editor-echarts.html', 3);
                    }
                }, {
                    key: 'loadMap',
                    value: function loadMap(mapCode, name, myChart) {
                        var that = this;
                        $.get(mapCode, function (data) {
                            if (data) {
                                echarts.registerMap(name, data);
                                var option = {
                                    title: {
                                        text: name,
                                        left: 'center',
                                        textStyle: { color: '#ffffff', fontSize: 12 }
                                    },
                                    geo: {
                                        map: name,
                                        itemStyle: {
                                            normal: { areaColor: '#3a8eff', borderColor: '#3a8eff' },
                                            emphasis: { areaColor: '#3a8eff' }
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
                                    series: [{
                                        type: 'scatter',
                                        coordinateSystem: 'geo',
                                        symbol: 'pin',
                                        symbolSize: 12,
                                        mapLocation: {
                                            y: "center",
                                            x: "center",
                                            height: "380"
                                        },
                                        data: that.data

                                    }]
                                };
                                myChart.setOption(option);
                            } else {
                                //              alert('无法加载该地图');
                            }
                        });
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        var $panelContainer = elem.find('.echarts_container')[0];
                        var option = {}; // eslint-disable-line
                        var echartsData = []; // eslint-disable-line

                        ctrl.IS_DATA_CHANGED = true;

                        var myChart = echarts.init($panelContainer, 'dark');

                        // bad hank
                        setTimeout(function () {
                            myChart.resize();
                        }, 1000);

                        function render() {
                            if (!myChart) {
                                return;
                            }
                            if (ctrl.IS_DATA_CHANGED) {
                                myChart.clear();
                                if (ctrl.paramValue == '') {
                                    echartsData = ctrl.data;
                                    eval(ctrl.panel.EchartsOption);
                                    myChart.setOption(option);
                                } else {
                                    var mapCode = ctrl.provinces[ctrl.paramValue];
                                    ctrl.loadMap(mapCode, ctrl.paramValue, myChart);
                                }
                            }
                            myChart.resize();
                        }

                        var timeFn = null;

                        //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图
                        myChart.on('click', function (params) {
                            clearTimeout(timeFn);
                            //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行
                            timeFn = setTimeout(function () {
                                var name = params.name; //地区name
                                var mapCode = ctrl.provinces[name]; //地区的json数据
                                if (!mapCode) {
                                    return;
                                }
                                ctrl.paramValue = name;
                                ctrl.updateData();
                                ctrl.loadMap(mapCode, name, myChart);
                                myChart.resize();
                            }, 100);
                        });

                        // 绑定双击事件，返回全国地图
                        myChart.on('dblclick', function (params) {
                            clearTimeout(timeFn);
                            ctrl.paramValue = '';
                            //返回全国地图
                            ctrl.updateData();
                        });

                        this.events.on('render', function () {
                            render();
                            ctrl.renderingCompleted();
                        });
                    }
                }]);

                return EchartsCtrl;
            }(MetricsPanelCtrl));

            _export('EchartsCtrl', EchartsCtrl);

            EchartsCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=echarts_ctrl.js.map
