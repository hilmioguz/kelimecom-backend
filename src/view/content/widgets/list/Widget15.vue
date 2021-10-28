<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title font-weight-bolder text-dark">Talepler</h3>
      <div class="card-toolbar">
        <Dropdown2><i class="ki ki-bold-more-hor"></i></Dropdown2>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-0">
      <!--begin::Item-->
      <template v-for="(item, i) in list">
        <div
          class="d-flex align-items-center mb-9 rounded p-5"
          v-bind:key="i"
          v-bind:class="`bg-light-${item.class}`"
        >
          <!--begin::Icon-->
          <span class="svg-icon mr-5" v-bind:class="`svg-icon-${item.class}`">
            <span class="svg-icon svg-icon-lg">
              <!--begin::Svg Icon | path:assets/media/svg/icons/Home/Library.svg-->
              <inline-svg :src="item.icon" />
              <!--end::Svg Icon-->
            </span>
          </span>
          <!--end::Icon-->
          <!--begin::Title-->
          <div class="d-flex flex-column flex-grow-1 mr-2">
            <a
              href="#"
              class="font-weight-bold text-dark-75 text-hover-primary font-size-lg mb-1"
              >{{ item.title }}</a
            >
            <span class="text-muted font-weight-bold">{{ item.desc }}</span>
          </div>
          <!--end::Title-->
          <!--begin::Lable-->
          <span
            class="font-weight-bolder py-1 font-size-lg"
            v-bind:class="`text-${item.class}`"
            >{{ item.percentage }}</span
          >
          <!--end::Lable-->
        </div>
      </template>
      <!--end::Item-->
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import Dropdown2 from "@/view/content/dropdown/Dropdown2.vue";

export default {
  name: "Widget13",
  data() {
    return {
      list: [
        {
          title: "Grup öğle yemeği kutlaması",
          desc: "2 gün içinde",
          percentage: "+28%",
          icon: "media/svg/icons/Home/Library.svg",
          class: "warning"
        },
        {
          title: "Site gezinme optimizasyonu",
          desc: "15 gün içinde",
          percentage: "+50%",
          icon: "media/svg/icons/Communication/Write.svg",
          class: "success"
        },
        {
          title: "Yeniden marka stratejisi planlaması",
          desc: "30 gün içinde'",
          percentage: "-27%",
          icon: "media/svg/icons/Communication/Group-chat.svg",
          class: "danger"
        },
        {
          title: "Ürün hedefleri stratejisi buluşması",
          desc: "7 gün içinde",
          percentage: "+8%",
          icon: "media/svg/icons/General/Attachment2.svg",
          class: "info"
        }
      ]
    };
  },
  components: {
    Dropdown2
  }
};
</script>
