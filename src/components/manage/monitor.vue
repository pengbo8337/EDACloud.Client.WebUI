<template>
  <div>
    <div class="item margin_left_1 myTable">
      <label class="title">
        CPU利用率
        <span class="right_span" v-if="allData.length>0">{{allData[0].date.split("T")[0]}}</span>
      </label>
      <div class="margin_top">
        <el-radio-group v-model="dateRange">
          <el-radio-button label="今天"></el-radio-button>
          <el-radio-button label="最近7天"></el-radio-button>
        </el-radio-group>
        <!-- <el-radio-group v-model="chartType" class="right_span">
          <el-radio-button label="折线图"></el-radio-button>
          <el-radio-button label="柱状图"></el-radio-button>
        </el-radio-group> -->
        <div>
          <div id="myChart" :style="{width: '1150px', height: '300px'}"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      dateRange: "今天",
      chartType:"折线图",
      allData:this.$store.state.CPUData
    };
  },
  mounted(){     
    this.drawLine();
  },
  computed:{
    allDataChange(){
      return this.$store.state.CPUData;
    }
  },
  watch:{
    allDataChange(val) {
      this.allData = val;
      this.drawLine();
    },
    dateRange(val){
      if(val=="今天")
      {
        this.$store.state.dateRange=1;
      }else{
        this.$store.state.dateRange=7;
      }
    }  
  },
  methods:{
      drawLine(){
        let data=this.allData;
        console.log(data);
        let xData=[];
        let yData=[];
        data.forEach(e => {
          xData.push(e.date);
          yData.push(e.cpu);
        });

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
            // title: { text: '在Vue中使用echarts' },
            tooltip: {},
            xAxis: {
                data: xData
            },
            yAxis: {},
            series: [{
                name: '利用率',
                type: 'bar',
                data: yData,
                type: 'line'
            }],
            color: ["#409EFF"]
        });
      }
  }
};
</script>

<style scoped>
.title {
  display: block;
  font-size: 1.5rem;
  color: rgba(17, 17, 17, 0.95);
  padding-bottom: 12px;
  border-bottom: 1px solid #e9e9e9;
}
</style>
