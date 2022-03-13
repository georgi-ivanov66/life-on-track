<template>
  <LineChart v-bind="lineChartProps" />
  <ion-button fill="none" @click="setLastDays(7)">Past 7 days</ion-button>
  <ion-button fill="none" @click="setLastDays(30)">Past 30 days</ion-button>
</template>

<script lang="ts">
import { IonButton } from "@ionic/vue";
import { computed } from "vue";
import { LineChart, useLineChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
Chart.register(...registerables);
const past7Days = [...Array(7).keys()].map((index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);

  return date.toLocaleDateString();
});
const past30Days = [...Array(30).keys()].map((index) => {
  const date = new Date();
  date.setDate(date.getDate() - index);

  return date.toLocaleDateString();
});
console.log(past30Days);
export default {
  name: "BaseChart",
  components: { LineChart, IonButton },
  setup() {
    const getData = computed<ChartData<"line">>(() => ({
      labels: past30Days,
      datasets: [
        {
          data: [
            65, 59, 80, 81, 56, 55, 40.54, 65, 78, 34, 98, 23, 67, 88, 22, 33,
            44, 55, 66,
          ],
          fill: false,
          borderColor: "#4bc0ff",
        },
      ],
    }));

    const options = computed<ChartOptions<"line">>(() => ({
      plugins: {
        legend: {
          display: false,
        },
      },
    }));

    const { lineChartProps } = useLineChart({
      options,
      chartData: getData,
    });

    return {
      getData,
      options,
      lineChartProps,
    };
  },
  methods: {
    //TODO regenerate chart
    setLastDays(numberOfDays: number) {
      if (numberOfDays === 7) {
        this.getData.labels = past7Days;
        console.log("past 7 days", past7Days);
      } else if (numberOfDays === 30) {
        this.getData.labels = past30Days;
        console.log("past 30 days", past30Days);
      }
    },
  },
};
</script>

<style scoped></style>
