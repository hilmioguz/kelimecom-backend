<template>
  <div class="card card-custom card-stretch gutter-b">
    <!--begin::Header-->
    <div class="card-header border-0 py-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label font-weight-bolder text-dark">
          Yazar İstatistikleri
        </span>
        <span class="text-muted mt-3 font-weight-bold font-size-sm">
          En Çok Maddebaşı Girişi Yapan Kullanıcılar
        </span>
      </h3>
      <div class="card-toolbar">
        <a
          href="/users"
          class="btn btn-success font-weight-bolder font-size-sm"
        >
          <span class="svg-icon svg-icon-md svg-icon-white">
            <!--begin::Svg Icon | path:assets/media/svg/icons/Communication/Add-user.svg-->
            <inline-svg
              src="media/svg/icons/Communication/Add-user.svg"
            />
            <!--end::Svg Icon--> </span>Yeni Yazar Ekle</a>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table
          id="kt_advance_table_widget_1"
          class="table table-head-custom table-vertical-center"
        >
          <thead>
            <tr class="text-left">
              <th
                class="pr-0"
                style="width: 50px"
              >
                yazar
              </th>
              <th style="min-width: 200px" />
              <th style="min-width: 150px">
                kurum
              </th>
              <th style="min-width: 150px">
                toplam giriş
              </th>
              <th style="min-width: 150px">
                son 3 kelime
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(item, i) in gundemStats">
              <tr :key="i">
                <td class="pr-2">
                  <div
                    class="symbol symbol-50 symbol-light mt-1"
                  >
                    <span class="symbol-label">
                      <img
                        src="media/users/default.jpg"
                        class="h-75 align-self-center"
                        alt=""
                      >
                    </span>
                  </div>
                </td>
                <td class="pl-0">
                  <span
                    class="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >{{ item.name }}</span>
                </td>
                <td>
                  <span
                    class="text-dark-75 font-weight-bolder d-block font-size-lg"
                  >{{ item.kurumu }}</span>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 mr-2">
                    <div
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <span
                        class="text-dark mr-2 font-size-sm font-weight-bold"
                      >{{ item.count }}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="d-flex flex-column w-100 mr-2">
                    <div
                      class="d-flex align-items-center justify-content-between mb-2"
                    >
                      <span
                        class="text-dark mr-2 font-size-sm font-weight-bold"
                      >{{ item.maddeler.join(', ') }}</span>
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
import helpers from '@/core/services/helpers.vue';

export default {
  name: 'Yazar',
  mixins: [helpers],
  components: {},
};
</script>
