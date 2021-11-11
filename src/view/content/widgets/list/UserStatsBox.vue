<template>
  <div>
    <div class="row">
      <div class="col-xl-3">
        <!--begin::Tiles Widget 11-->
        <div
          class="card card-custom bg-primary gutter-b"
          style="height: 150px"
        >
          <div class="card-body">
            <span
              class="svg-icon svg-icon-3x svg-icon-white ml-n2"
            >
              <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
              <inline-svg
                src="media/svg/icons/Text/Edit-text.svg"
              />
              <!--end::Svg Icon-->
            </span>
            <div
              class="text-inverse-primary font-weight-bolder font-size-h2 mt-3"
            >
              {{ totalMaddeCount.length ? new Intl.NumberFormat().format(totalMaddeCount[0].count) : '' }}
            </div>
            <a
              href="#"
              class="text-inverse-primary font-weight-bold font-size-lg mt-1"
            >Toplam Maddebaşı</a>
          </div>
        </div>
        <!--end::Tiles Widget 11-->
      </div>
      <div class="col-xl-3">
        <!--begin::Tiles Widget 3-->
        <div
          class="card card-custom bg-info gutter-b"
          style="height: 150px"
        >
          <div class="card-body">
            <span class="svg-icon svg-icon-3x svg-icon-white ml-n2">
              <!--begin::Svg Icon | path:assets/media/svg/icons/Layout/Layout-4-blocks.svg-->
              <inline-svg
                src="media/svg/icons/Communication/Group-chat.svg"
              />
              <!--end::Svg Icon-->
            </span>
            <div
              class="text-inverse-success font-weight-bolder font-size-h2 mt-3"
            >
              {{ totalGundemCount.length ? new Intl.NumberFormat().format(totalGundemCount[0].count) : '' }}
            </div>
            <a
              href="#"
              class="text-inverse-info font-weight-bold font-size-lg mt-1"
            >Toplam Gündem</a>
          </div>
        </div>
        <!--end::Tiles Widget 3-->
      </div>

      <div class="col-xl-6">
        <!--begin::Mixed Widget 10-->
        <div
          class="card card-custom gutter-b"
          style="height: 150px"
        >
          <!--begin::Body-->
          <div
            class="card-body d-flex align-items-center justify-content-between flex-wrap"
          >
            <div class="mr-2">
              <h3 class="font-weight-bolder">
                Ziyaretçi İstatistikleri
              </h3>
              <div class="text-dark-50 font-size-lg mt-2">
                Güncel site ziyaretçi istatistikleri için tıklayın
              </div>
            </div>
            <a
              href="#"
              class="btn btn-primary font-weight-bold py-3 px-6"
            >Git</a>
          </div>
          <!--end::Body-->
        </div>
        <!--end::Mixed Widget 10-->
      </div>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <!--begin::Mixed Widget 14-->
        <div class="row">
          <div class="col-xl-3">
            <!--begin::Tiles Widget 12-->
            <div
              class="card card-custom gutter-b"
              style="height: 150px"
            >
              <div class="card-body">
                <span
                  class="svg-icon svg-icon-3x svg-icon-success"
                >
                  <inline-svg
                    src="media/svg/icons/Communication/Group.svg"
                  />
                </span>
                <div
                  class="text-dark font-weight-bolder font-size-h2 mt-3"
                >
                  {{ totalUsersStat }}
                </div>
                <a
                  href="#"
                  class="text-muted text-hover-primary font-weight-bold font-size-sm mt-1"
                >Toplam Kullanıcı</a>
              </div>
            </div>
            <!--end::Tiles Widget 12-->
          </div>
          <div
            class="col-xl-3"
            v-for="paket in userStats"
            :key="paket.paketadi"
          >
            <!--begin::Tiles Widget 12-->
            <div
              class="card card-custom gutter-b"
              style="height: 150px"
            >
              <div class="card-body">
                <span
                  class="svg-icon svg-icon-3x svg-icon-success"
                >
                  <inline-svg
                    src="media/svg/icons/Communication/Group.svg"
                  />
                </span>
                <div
                  class="text-dark font-weight-bolder font-size-h2 mt-3"
                >
                  {{ paket.count }}
                </div>
                <a
                  href="#"
                  class="text-muted text-hover-primary font-weight-bold font-size-sm mt-1"
                >{{ paket.paketadi }}</a>
              </div>
            </div>
            <!--end::Tiles Widget 12-->
          </div>
          <div
            class="col-xl-3"
            v-for="(kurum, i) in kurumStats"
            :key="`${kurum.status}-${i}`"
          >
            <!--begin::Tiles Widget 12-->
            <div
              class="card card-custom gutter-b"
              style="height: 150px"
            >
              <div class="card-body bg-light-warning">
                <span
                  class="svg-icon svg-icon-3x svg-icon-warning"
                >
                  <inline-svg
                    src="media/svg/icons/Home/Building.svg"
                  />
                </span>
                <div
                  class="text-warning font-weight-bolder font-size-h2 mt-3"
                >
                  {{ kurum.count }}
                </div>
                <a
                  href="#"
                  class="text-muted text-hover-primary font-weight-bold font-size-sm mt-1"
                >{{ `${kurum.aktif ? 'Aktif': 'Pasif'} ${kurum.status} kurum` }}</a>
              </div>
            </div>
            <!--end::Tiles Widget 12-->
          </div>
        </div>
        <!--end::Mixed Widget 14-->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import helpers from '@/core/services/helpers.vue';

export default {
  name: 'UserStatsBox',
  mixins: [helpers],
  components: {},
  methods: {

  },
  computed: {
    ...mapGetters(['layoutConfig']),
  },
};
</script>
