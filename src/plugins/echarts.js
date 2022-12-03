import * as echarts from 'echarts'
import 'echarts-gl';

export default {
    /**echart mounted to global */
    install:app=>{
       
        app.config.globalProperties.$chart = (element,data) =>{
            //loading charts
            var myChart = echarts.init(document.getElementById(element));
            //chart details
            const option =  {
                title: {
                  text: 'Tunnel Progress Record'
                },
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross',
                    label: {
                      backgroundColor: '#6a7985'
                    }
                  }
                },
                legend: {
                  data: ['Tunnel Number', 'Qualified Number', 'In Progress', 'Procasting', ]
                },
                toolbox: {
                  feature: {
                    saveAsImage: {}
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  }
                ],
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                series: data
              };
            myChart.setOption(option)
        }
        app.config.globalProperties.$radar = (element) =>{
            //loading charts
            var myChart = echarts.init(document.getElementById(element));
            //chart details
            const option = {
                title: {
                  text: 'Proportion of Browsers',
                  subtext: 'Fake Data',
                  top: 10,
                  left: 10
                },
                tooltip: {
                  trigger: 'item'
                },
                legend: {
                  type: 'scroll',
                  bottom: 10,
                  data: (function () {
                    var list = [];
                    for (var i = 1; i <= 28; i++) {
                      list.push(i + 2000 + '');
                    }
                    return list;
                  })()
                },
                visualMap: {
                  top: 'middle',
                  right: 10,
                  color: ['red', 'yellow'],
                  calculable: true
                },
                radar: {
                  indicator: [
                    { text: 'IE8-', max: 400 },
                    { text: 'IE9+', max: 400 },
                    { text: 'Safari', max: 400 },
                    { text: 'Firefox', max: 400 },
                    { text: 'Chrome', max: 400 }
                  ]
                },
                series: (function () {
                  var series = [];
                  for (var i = 1; i <= 28; i++) {
                    series.push({
                      type: 'radar',
                      symbol: 'none',
                      lineStyle: {
                        width: 1
                      },
                      emphasis: {
                        areaStyle: {
                          color: 'rgba(0,250,0,0.3)'
                        }
                      },
                      data: [
                        {
                          value: [
                            (40 - i) * 10,
                            (38 - i) * 4 + 60,
                            i * 5 + 10,
                            i * 9,
                            (i * i) / 2
                          ],
                          name: i + 2000 + ''
                        }
                      ]
                    });
                  }
                  return series;
                })()
              };
              
            myChart.setOption(option)
        }
        app.config.globalProperties.$pie = (element) =>{
            //loading charts
            var myChart = echarts.init(document.getElementById(element));
            //chart details
            const option = {
                backgroundColor: '#2c343c',
                title: {
                  text: 'Customized Pie',
                  left: 'center',
                  top: 20,
                  textStyle: {
                    color: '#ccc'
                  }
                },
                tooltip: {
                  trigger: 'item'
                },
                visualMap: {
                  show: false,
                  min: 80,
                  max: 600,
                  inRange: {
                    colorLightness: [0, 1]
                  }
                },
                series: [
                  {
                    name: 'Access From',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '50%'],
                    data: [
                      { value: 335, name: 'Direct' },
                      { value: 310, name: 'Email' },
                      { value: 274, name: 'Union Ads' },
                      { value: 235, name: 'Video Ads' },
                      { value: 400, name: 'Search Engine' }
                    ].sort(function (a, b) {
                      return a.value - b.value;
                    }),
                    roseType: 'radius',
                    label: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    labelLine: {
                      lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                      },
                      smooth: 0.2,
                      length: 10,
                      length2: 20
                    },
                    itemStyle: {
                      color: '#c23531',
                      shadowBlur: 200,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    },
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                      return Math.random() * 200;
                    }
                  }
                ]
              };
              
            myChart.setOption(option)
        }
       
    }
}