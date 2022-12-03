import * as echarts from 'echarts'

export default{
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
    }
}