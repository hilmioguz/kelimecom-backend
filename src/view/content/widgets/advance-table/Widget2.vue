<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Yazar İstatistikleri
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          Bu ay 10'dan fazla yeni yazar
        </span>
      </h3>
      <div class="card-toolbar">
        <a href="#" class="btn btn-success font-weight-bolder font-size-sm">
          <span class="svg-icon svg-icon-md svg-icon-white">
            <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Add-user.svg-->
            <inline-svg src="media/svg/icons/Communication/Add-user.svg" />
            <!--end::Svg Icon--> </span
          >Yeni Yazar Ekle</a
        >
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table
          class="table table-head-custom table-vertical-center"
          id="kt_advance_table_widget_1"
        >
          <thead>
            <tr class="text-left">
              <th class="pr-0" style="width: 50px">yazar</th>
              <th style="min-width: 200px"></th>
              <th style="min-width: 150px">kurum</th>
              <th style="min-width: 150px">ilerleme</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in list">
              <tr v-bind:key="i">
                <td class="pr-2">
                  <div class="symbol symbol-50 symbol-light mt-1">
                    <span class="symbol-label">
                      <img
                        :src="item.text0"
                        class="h-75 align-self-end"
                        alt=""
                      />
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <a
                    href="#"
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >{{ item.text1 }}</a
                  >
                  <span
                    class="text-muted font-weight-bold text-muted d-block"
                    >{{ item.text2 }}</span
                  >
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                    >{{ item.text3 }}</span
                  >
                  <span class="text-muted font-weight-bold">{{
                    item.text4
                  }}</span>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 mr-2">
                    <div
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <span
                        class="text-muted mr-2 font-size-sm font-weight-bold"
                        >{{ item.text5 }}</span
                      >
                      <span class="text-muted font-size-sm font-weight-bold"
                        >İlerleme</span
                      >
                    </div>
                    <div class="progress progress-xs w-100">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="{ width: item.text5 }"
                        v-bind:class="`bg-${item.text6}`"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
    <!--end::Advance Table Widget 2-->
  </div>
</template>

<script>
export default {
  name: "widget-2",
  data() {
    return {
      list: [
        {
          text0: "media/svg/avatars/001-boy.svg",
          text1: "Ali Yazaroğlu",
          text2: "HTML, JS, ReactJS",
          text3: "Vadi Bilişm",
          text4: "Web, UI/UX Dizayn",
          text5: "65%",
          text6: "danger"
        },
        {
          text0: "media/svg/avatars/018-girl-9.svg",
          text1: "Ayşe Ay",
          text2: "İngiliz Dili Edebiyat",
          text3: "Boğaziçi Üniversitesi",
          text4: "Prof. Dr.",
          text5: "83%",
          text6: "success"
        },
        {
          text0: "media/svg/avatars/047-girl-25.svg",
          text1: "Gara Oğlan",
          text2: "PHP, Laravel, VueJS",
          text3: "Çukurova Üniversitesi",
          text4: "Kütüphane Müdürü",
          text5: "47%",
          text6: "primary"
        },
        {
          text0: "media/svg/avatars/014-girl-7.svg",
          text1: "Beyza Çokokuyan",
          text2: "Dil, Tarih, Edebiyat",
          text3: "Anakara Üniversitesi",
          text4: "Doktora Öğr.",
          text5: "71%",
          text6: "danger"
        }
      ],
      checked: false
    };
  },
  components: {},
  methods: {
    setCheck(checked) {
      this.checked = checked;
    }
  }
};
</script>
