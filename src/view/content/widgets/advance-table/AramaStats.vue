<template>
  <div class="card card-custom card-stretch">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span
          class="card-label font-weight-bolder text-dark"
        >Tüm Sözlüklerde En'ler</span>
      </h3>
      <div class="card-toolbar">
        <ul class="nav nav-pills nav-pills-xs nav-dark-75">
          <li
            class="nav-item"
            v-for="dil in dilListesi"
            :key="dil.value"
          >
            <a
              class="nav-link pa-2"
              data-toggle="tab"
              :class="{ active: show === dil.value }"
              href="#kt_tab_pane"
              @click="getLangStat(dil.value)"
            >{{ dil.text }}</a>
          </li>

          <li class="nav-item">
            <a
              class="nav-link pa-2"
              data-toggle="tab"
              :class="{ active: show === 'tumu' }"
              href="#kt_tab_pane"
              @click="getLangStat('tumu')"
            >Tümü</a>
          </li>
        </ul>
      </div>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body pt-2 pb-0">
      <!--begin::Table-->
      <div class="table-responsive">
        <table class="table table-borderless table-vertical-center">
          <thead>
            <tr>
              <th
                class="p-0"
                style="width: 100%"
              />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-right">
                <div class="d-flex align-center my-4">
                  <div
                    class="symbol symbol-25 symbol-light mr-2"
                  >
                    <span class="symbol-label">
                      <inline-svg
                        src="media/svg/icons/General/Search.svg"
                      />
                    </span>
                  </div>
                  <div
                    class="text-success font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    En Son Arananlar
                  </div>
                </div>

                <div class="d-flex justify-flex-start align-center pa-2">
                  <template
                    v-for="(latest, i) in maddeStats.latest"
                  >
                    <span
                      :key="`latest${i}`"
                      class="label label-lg label-inline label-light-success mx-3"
                    > {{ latest._id }} </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-right">
                <div class="d-flex align-center my-4">
                  <div
                    class="symbol symbol-25 symbol-light mr-2"
                  >
                    <span class="symbol-label">
                      <inline-svg
                        src="media/svg/icons/Map/Position.svg"
                      />
                    </span>
                  </div>
                  <div
                    class="text-primary font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    En Çok Arananlar
                  </div>
                </div>

                <div class="d-flex justify-flex-start align-center pa-2">
                  <template
                    v-for="(most, i) in maddeStats.most"
                  >
                    <span
                      :key="`most${i}`"
                      class="label label-lg label-inline label-light-primary mx-3"
                    > {{ most._id }} </span>
                  </template>
                </div>
              </td>
            </tr>
            <tr>
              <td class="text-right">
                <div class="d-flex align-center my-4">
                  <div
                    class="symbol symbol-25 symbol-light mr-2"
                  >
                    <span class="symbol-label">
                      <inline-svg
                        src="media/svg/icons/Navigation/Plus.svg"
                      />
                    </span>
                  </div>
                  <div
                    class="text-danger font-weight-bolder text-hover-primary mb-1 font-size-lg"
                  >
                    En Son Eklenenler
                  </div>
                </div>

                <div class="d-flex justify-flex-start align-center pa-2">
                  <template
                    v-for="(ins, i) in maddeStats.inserted"
                  >
                    <span
                      :key="`ins${i}`"
                      class="label label-lg label-inline label-light-danger mx-3"
                    > {{ ins.madde }} </span>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--end::Table-->
    </div>
    <!--end::Body-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import helpers from '@/core/services/helpers.vue';

export default {
  name: 'AramaStats',
  mixins: [helpers],
  data() {
    return {
      show: 'tumu',
    };
  },
  computed: {
    ...mapGetters(['layoutConfig']),
  },
  methods: {
    getLangStat(dil) {
      if (dil === 'tumu') {
        this.getMaddeStatsFromApi();
      } else {
        this.getMaddeStatsFromApi(dil);
      }
      this.show = dil;
    },
  },
};
</script>
