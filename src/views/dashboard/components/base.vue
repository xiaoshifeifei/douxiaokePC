<template>
  <div class="mains1">
    <div class="main-t">
        <div class="main-t1">
            <p>总销售额</p>
            <div class="main-t2">￥ 12365</div>
            <div class="main-t3"><span>周同比上升  12% </span> <span style="margin-left:20px"> 日同比上升  10%</span></div>
            <div class="main-t4">日均销售总额  ￥ 194.56</div>
        </div>
         <div class="main-t1">
            <p>总销售额</p>
            <div class="main-t2">￥ 15243</div>
            <div class="main-t3"><span>周同比上升  22% </span> <span style="margin-left:20px"> 日同比上升  10%</span></div>
            <div class="main-t4">日均销售总额  ￥ 232.56</div>
        </div>
         <div class="main-t1">
            <p>总销售额</p>
            <div class="main-t2">￥ 53214</div>
            <div class="main-t3"><span>周同比上升  8% </span> <span style="margin-left:20px"> 日同比上升  10%</span></div>
            <div class="main-t4">日均销售总额  ￥ 169.56</div>
        </div>
         <div class="main-t5">
            <p>总销售额</p>
            <div class="main-t2">￥ 36521</div>
            <div class="main-t3"><span>周同比上升  9% </span> <span style="margin-left:20px"> 日同比上升  10%</span></div>
            <div class="main-t4">日均销售总额  ￥ 184.56</div>
        </div>
        <div style="clear:both"></div>
    </div>

    <!-- 图表模块 -->
    <div class="main-2">
      <div style="display: inline-block;background-color: #fff;" id="myChart" :style="{width: '1000px', height: '400px'}"></div>
      <div class="main-12">
        <ul>
          <li class="li-1">
            销量排行
          </li>
          <li class="li-2"><span class="span-1">白鹭岛 1 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 2 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 3 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 4 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 5 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 6 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 7 号店</span><span class="span-2">123465.1</span></li>
          <li class="li-2"><span class="span-1">白鹭岛 8 号店</span><span class="span-2">123465.1</span></li>
        </ul>
      </div>
    </div>

    <div class="main-3">
      <div id="myCharts" :style="{width: '100', height: '400px'}"></div>
    </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
     
    }
  },
  mounted(){
    this.drawLine()
    this.drawLines()
  },
  created() {
    
  },
  methods:{
     drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({title: {
        text: '周访问量'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '邮件营销',
            type: 'bar',
            stack: '广告',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '联盟广告',
            type: 'bar',
            stack: '广告',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '视频广告',
            type: 'bar',
            stack: '广告',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '搜索引擎',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            markLine: {
                lineStyle: {
                    type: 'dashed'
                },
                data: [
                    [{type: 'min'}, {type: 'max'}]
                ]
            }
        },
        {
            name: '百度',
            type: 'bar',
            barWidth: 5,
            stack: '搜索引擎',
            data: [620, 732, 701, 734, 1090, 1130, 1120]
        },
        {
            name: '谷歌',
            type: 'bar',
            stack: '搜索引擎',
            data: [120, 132, 101, 134, 290, 230, 220]
        },
        {
            name: '必应',
            type: 'bar',
            stack: '搜索引擎',
            data: [60, 72, 71, 74, 190, 130, 110]
        },
        {
            name: '其他',
            type: 'bar',
            stack: '搜索引擎',
            data: [62, 82, 91, 84, 109, 110, 120]
        }
    ]
}
);
    },
    drawLines() {
    let myChart = this.$echarts.init(document.getElementById('myCharts'))
      myChart.setOption({title: {
        text: '年度访问量'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 210, 210, 263, 300, 210]
        },
        {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310, 210, 202, 303, 304, 210]
        },
        {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410, 210, 210, 169, 430, 210]
        },
        {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320, 210, 302, 210, 325, 210]
        },
        {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320, 210, 1530, 210, 1521, 210]
        }
    ]})

    }
  }

};
</script>

<style lang="less" scoped>
  .mains1 {
    width: 100%;
    height: 1200px;
    background-color: #F0F2F5;
    padding: 20px;
    .main-t {
      width: 100%;
      .main-t1 {
        width: 23%;
        padding: 20px;
        float: left;
        background-color: #FFFFFF;
        margin-right: 2%;
        p {
          width: 100%;
          font-size: 14px;
          color: #8C8C8C;
        }
        .main-t2 {
          width: 100%;
          height: 50px;
          font-size: 30px;
        }
        .main-t3 {
          margin-top: 10px;
          width: 100%;
          height: 30px;
          border-bottom: 1px solid #ccc;
        }
        .main-t4 {
          margin-top: 10px;
         
        }
      }
      .main-t5 {
        width: 25%;
        padding: 20px;
        float: left;
        background-color: #FFFFFF;
        p {
          width: 100%;
          font-size: 14px;
          color: #8C8C8C;
        }
        .main-t2 {
          width: 100%;
          height: 50px;
          font-size: 30px;
        }
        .main-t3 {
          margin-top: 10px;
          width: 100%;
          height: 30px;
          border-bottom: 1px solid #ccc;
        }
        .main-t4 {
          margin-top: 10px;
         
        }
      }
    }
    .main-2 {
      margin-top: 60px;
      
      .main-12 {
        width: calc(100% - 1000px);
        height: 400px;
        display: inline-block;
        vertical-align: top;
        ul {
          width: 100%;
          height: 100%;
          background-color: #fff;
          .li-1 {
            width: 100%;
            height: 80px;
            font-size: 30px;
            font-weight: 700;
            padding: 20px;
          }
          .li-2 {
            width: 100%;
            height: 40px;
            font-size: 20px;
            // font-weight: 700;
            .span-1 {
              display: inline-block;
              width: 60%;
              height: 40px;
              line-height: 40px;
              padding-left: 20px;
            }
            .span-2 {
              display: inline-block;
              width: 40%;
              height: 40px;
              line-height: 40px;
              text-align: end;
              padding-right: 20px;
            }
          }
        }
      }
    }
    .main-3 {
      margin-top: 60px;
      background-color: #fff;
    }
  }
</style>
