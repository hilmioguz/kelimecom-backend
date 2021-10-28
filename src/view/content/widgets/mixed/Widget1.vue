<template>
  <!--begin::Tiles Widget 1-->
  <div class="card card-custom gutter-b card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <div class="card-title">
        <div class="card-label">
          <div class="font-weight-bolder">
            Haftalık İstatistikler
          </div>
          <div class="font-size-sm text-muted mt-2">
            Toplam 890.344 Ziyaretçi
          </div>
        </div>
      </div>
      <div class="card-toolbar">
        <Dropdown2><i class="ki ki-bold-more-hor"></i></Dropdown2>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body d-flex flex-column px-0">
      <!--begin::Chart-->
      <apexchart
        class="card-rounded-bottom"
        :options="chartOptions"
        :series="series"
        type="area"
      ></apexchart>
      <!--end::Chart-->
      <!--begin::Items-->
      <div class="flex-grow-1 card-spacer-x">
        <template v-for="(item, i) in list">
          <div
            class="d-flex align-items-center justify-content-between mb-10"
            v-bind:key="i"
          >
            <div class="d-flex align-items-center mr-2">
              <div class="symbol symbol-50 symbol-light mr-3 flex-shrink-0">
                <div class="symbol-label">
                  <inline-svg :src="`${item.svg}`" alt="" class="h-50" />
                </div>
              </div>
              <div>
                <a
                  href="#"
                  class="font-size-h6 text-dark-75 text-hover-primary font-weight-bolder"
                  >{{ item.title }}</a
                >
                <div class="font-size-sm text-muted font-weight-bold mt-1">
                  {{ item.desc }}
                </div>
              </div>
            </div>
            <div
              class="label label-light label-inline font-weight-bold text-dark-50 py-4 px-3 font-size-base"
            >
              {{ item.profit }}
            </div>
          </div>
        </template>
      </div>
      <!--end::Items-->
    </div>
    <!--end::Body-->
  </div>
  <!--end::Tiles Widget 1-->
</template>

<script>
import Dropdown2 from "@/view/content/dropdown/Dropdown2.vue";
import { mapGetters } from "vuex";

export default {
  name: "widget-1",
  components: {
    Dropdown2
  },
  data() {
    return {
      strokeColor: "#f86573",
      chartOptions: {},
      series: [
        {
          name: "Günlük Ziyaretçi",
          data: [20, 25, 33, 25, 27, 34, 29]
        }
      ],
      list: [
        {
          title: "En İyi Yazarlar",
          desc: "Ali Yazaroğlu, Veli Okumuş",
          svg: "media/svg/misc/006-plurk.svg",
          profit: "+50 giriş"
        },
        {
          title: "En Çok Aranan Kelimeler",
          desc: "kalem, mualla, musilaj",
          svg: "media/svg/misc/015-telegram.svg",
          profit: "+60"
        },
        {
          title: "En Çok Kurumsal Bağlantı",
          desc: "Hacettepe Üni.\n",
          svg: "media/svg/misc/003-puzzle.svg",
          profit: "+75"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["layoutConfig"])
  },
  mounted() {
    // reference; kt_mixed_widget_1_chart
    this.chartOptions = {
      chart: {
        type: "area",
        height: 125,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {},
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: "gradient",
        opacity: 1,
        gradient: {
          type: "vertical",
          shadeIntensity: 0.55,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.2,
          stops: [25, 50, 100],
          colorStops: []
        }
      },
      stroke: {
        curve: "smooth",
        show: true,
        width: 3,
        colors: [this.strokeColor]
      },
      xaxis: {
        categories: [
          "Pazartesi",
          "Salı",
          "Çarşamba",
          "Perşembe",
          "Cuma",
          "Cumartesi",
          "Pazar"
        ],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          style: {
            colors: this.layoutConfig("colors.gray.gray-500"),
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        },
        crosshairs: {
          show: false,
          position: "front",
          stroke: {
            color: this.layoutConfig("colors.gray.gray-300"),
            width: 1,
            dashArray: 3
          }
        },
        tooltip: {
          enabled: true,
          formatter: undefined,
          offsetY: 0,
          style: {
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        }
      },
      yaxis: {
        show: false,
        min: 0,
        max: 37,
        labels: {
          show: false,
          style: {
            colors: this.layoutConfig("colors.gray.gray-500"),
            fontSize: "12px",
            fontFamily: this.layoutConfig("font-family")
          }
        }
      },
      states: {
        normal: {
          filter: {
            type: "none",
            value: 0
          }
        },
        hover: {
          filter: {
            type: "none",
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: "none",
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: "12px",
          fontFamily: this.layoutConfig("font-family")
        },
        y: {
          formatter: function(val) {
            return val + " bin";
          }
        },
        marker: {
          show: false
        }
      },
      colors: [this.layoutConfig("colors.theme.light.danger")],
      markers: {
        colors: [this.layoutConfig("colors.theme.light.danger")],
        strokeColor: [this.strokeColor],
        strokeWidth: 3
      },
      grid: {
        show: false,
        padding: {
          left: 0,
          right: 0
        }
      }
    };
  }
};
</script>
