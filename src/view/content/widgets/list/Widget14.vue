<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title font-weight-bolder text-dark">
        Bildirimler
      </h3>
      <div class="card-toolbar">
        <Dropdown2><i class="ki ki-bold-more-hor" /></Dropdown2>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-0">
      <template v-for="(item, i) in list">
        <div
          :key="i"
          class="mb-6"
        >
          <!--begin::Content-->
          <div class="d-flex align-items-center flex-grow-1">
            <!--begin::Checkbox-->
            <label
              class="checkbox checkbox-lg checkbox-lg checkbox-single flex-shrink-0 mr-4"
            >
              <input
                type="checkbox"
                value="1"
              >
              <span />
            </label>
            <!--end::Checkbox-->
            <!--begin::Section-->
            <div
              class="d-flex flex-wrap align-items-center justify-content-between w-100"
            >
              <!--begin::Info-->
              <div
                class="d-flex flex-column align-items-cente py-2 w-75"
              >
                <!--begin::Title-->
                <a
                  href="#"
                  class="text-dark-75 font-weight-bold text-hover-primary font-size-lg mb-1"
                >{{ item.title }}</a>
                <!--end::Title-->
                <!--begin::Data-->
                <span class="text-muted font-weight-bold">{{
                  item.desc
                }}</span>
                <!--end::Data-->
              </div>
              <!--end::Info-->
              <!--begin::Label-->
              <span
                class="label label-lg label-inline font-weight-bold py-4"
                :class="`label-light-${item.class}`"
              >{{ item.status }}</span>
              <!--end::Label-->
            </div>
            <!--end::Section-->
          </div>
          <!--end::Content-->
        </div>
      </template>
      <!--begin::Item-->
      <!--end::Item-->
    </div>
    <!--end: Card Body-->
  </div>
</template>

<script>
import Dropdown2 from '@/view/content/dropdown/Dropdown2.vue';

export default {
  name: 'Widget13',
  components: {
    Dropdown2,
  },
  data() {
    return {
      list: [
        {
          title:
                        'Sitenin görünürlüğü artırıcı çalışma yaparmısınız. Sizi bulmakda zorlandım.',
          desc: '27.05.2021',
          status: 'Geri Dönüldü',
          class: 'primary',
        },
        {
          title: 'Çok reklam çıkıyor. Kelimer aklımda kalmıyor...',
          desc: '03.05.2021',
          status: 'Değerlendirmede',
          class: 'warning',
        },
        {
          title:
                        'Üyelik paketimi değiştirimisiniz. Pro plana geçmek istiyorum.',
          desc: '27.04.2021',
          status: 'Tamamlandı',
          class: 'success',
        },
        {
          title:
                        'Günlük aratama sayımı artırırmısnız..pakeyt almaya param yok..',
          desc: '22.04.2021',
          status: 'Red edildi',
          class: 'danger',
        },
        {
          title:
                        'Veri analitiği araştırması yapıyorum. Verilerinizi nasıl alabilirim?',
          desc: '01.04.2021',
          status: 'Değerlendirmede',
          class: 'warning',
        },
      ],
    };
  },
};
</script>
