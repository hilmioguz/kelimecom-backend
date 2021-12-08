<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Sözlük Listesi
            <span
              class="d-block text-muted pt-2 font-size-sm"
            >Her satırda detayları görebilirsiniz.</span>
          </h3>
        </div>
        <div class="card-toolbar">
          <!--begin::Dropdown-->
          <b-dropdown
            size="sm"
            variant="light-primary"
            class="m-2 "
            toggle-class="d-flex align-items-center font-weight-bolder font-size-lg"
            right
            no-flip
          >
            <template #button-content>
              <i class="la la-download" />
              Export
            </template>
            <b-dropdown-text
              tag="div"
              class="min-w-md-175px"
            >
              <DropdownExport
                :json-data="dictionaries"
              />
            </b-dropdown-text>
          </b-dropdown>
          <!--end::Dropdown-->
        </div>
      </div>
      <div class="card-body">
        <!--begin: Search Form-->
        <!--begin::Search Form-->

        <!--end::Search Form-->
        <!--end: Search Form-->
        <!--begin: Datatable-->
        <v-data-table
          :headers="headers"
          :items="dictionaries"
          :options.sync="options"
          :server-items-length="totalDicts"
          :loading="loading"
          :expanded.sync="expanded"
          :page="page"
          show-expand
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
          class="elevation-0"
        >
          <!-- eslint-disable vue/valid-v-slot -->
          <template #top>
            <v-toolbar flat height="auto">
              <div class="w-100">
                <div class="row align-items-center">
                  <div class="col-lg-9 col-xl-8">
                    <div class="row align-items-start">
                      <div class="col-md-4 my-2 my-md-0">
                        <v-text-field
                          v-model="filter.name"
                          append-icon="mdi-magnify"
                          label="Arama"
                          single-line
                          hide-details
                        />
                      </div>
                      <div class="col-md-4 my-2 my-md-0">
                        <v-select
                          v-model="filter.lang"
                          :return-object="false"
                          :items="dilsecimListesi"
                          label="Dil"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer />
              <v-dialog
                v-model="dialog"
                max-width="900px"
                width="80vw"
                min-width="600px"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon
                      small
                      class="mr-2"
                      @click="editItem(item)"
                    >
                      mdi-plus
                    </v-icon>
                    Yeni Kayıt
                  </v-btn>
                </template>
                <v-card
                  rounded="20"
                >
                  <v-card-title
                    class=" bgi-size-cover bgi-no-repeat"
                    :style="{ backgroundImage: `url(${backgroundImage})` }"
                  >
                    <span class="white--text text-h5">{{
                      formTitle
                    }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.name
                            "
                            label="Sözluk Adı"
                          />
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.code
                            "
                            label="Kodu"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="
                              editedItem.lang
                            "
                            :return-object="false"
                            :items="dilListesi"
                            label="Dil"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="
                              editedItem.anlamLang
                            "
                            :return-object="false"
                            :items="dilListesi"
                            label="Anlam Dili"
                          />
                        </v-col>
                        <v-col cols="12">
                          <p class="font-weight-black subtitle-1 blue--text">
                            Akademik Referanslar
                          </p>
                          <b-tabs content-class="tabcontent flex-start">
                            <b-tab
                              title="Apa"
                              active
                              class="text-left"
                            >
                              <v-text-field
                                v-model="
                                  editedItem.apa_cevirmen
                                "
                                label="Çevirmen"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.apa_sozluk_ismi
                                "
                                label="Sözlük İsmi"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.apa_yazar_tarih
                                "
                                label="Yazar-Tarih"
                              />
                            </b-tab>
                            <b-tab title="Cms">
                              <v-text-field
                                v-model="
                                  editedItem.cms_basim_yeri
                                "
                                label="Basım Yeri"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.cms_cevirmen
                                "
                                label="Çevirmen"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.cms_sozluk_ismi
                                "
                                label="Sözlük İsmi"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.cms_tarih_siteadi
                                "
                                label="Tarih-Site Adı"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.cms_yazar
                                "
                                label="Yazar"
                              />
                            </b-tab>
                            <b-tab
                              title="Mla"
                            >
                              <v-text-field
                                v-model="
                                  editedItem.mla_cevirmen
                                "
                                label="Çevirmen"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.mla_sozluk_ismi
                                "
                                label="Sözlük İsmi"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.mla_tarih_siteadi
                                "
                                label="Tarih-Site Adı"
                              />
                              <v-text-field
                                v-model="
                                  editedItem.mla_yazar
                                "
                                label="Yazar"
                              />
                            </b-tab>
                          </b-tabs>
                        </v-col>
                        <v-col cols="6">
                          <v-textarea
                            v-model="
                              editedItem.desc
                            "
                            label="Açıklama"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-switch
                            v-model="
                              editedItem.isActive
                            "
                            :label="
                              editedItem.isActive
                                ? 'Aktif'
                                : 'Pasif'
                            "
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="secondary blue--text"
                      class="mb-2"
                      @click="close"
                    >
                      İptal
                    </v-btn>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click="save"
                    >
                      Kaydet
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogDelete"
                max-width="500px"
              >
                <v-card>
                  <v-card-title
                    class="text-h5"
                  >
                    Silmek istediğinizden emin
                    misiniz?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeDelete"
                    >
                      İptal
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      Tamam
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <!-- eslint-disable-next-line vue/no-template-shadow -->
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <b-tabs
                class="mt-3"
                content-class="flex-start"
              >
                <b-tab
                  title="Apa"
                  active
                  class="text-left"
                >
                  <b-table
                    stacked
                    striped
                    small
                    :items="[{ 'Çevirmen:': item.apa_cevirmen, 'Sözlük İsmi:': item.apa_sozluk_ismi, 'Yazar-Tarih:': item.apa_yazar_tarih }]"
                  />
                </b-tab>
                <b-tab
                  title="Cms"
                  class="text-left"
                >
                  <b-table
                    stacked
                    striped
                    small
                    :items="[{ 'Basım Yeri:': item.cms_basim_yeri, 'Çevirmen:': item.cms_cevirmen, 'Sözlük İsmi:': item.cms_sozluk_ismi, 'Tarih-Site Adı:': item.cms_tarih_siteadi, 'Yazar:': item.cms_yazar }]"
                  />
                </b-tab>
                <b-tab
                  title="Mla"
                  class="text-left"
                >
                  <b-table
                    stacked
                    striped
                    small
                    :items="[{ 'Çevirmen:': item.mla_cevirmen, 'Sözlük İsmi:': item.mla_sozluk_ismi, 'Tarih-Site Adı:': item.mla_tarih_siteadi, 'Yazar:': item.mla_yazar }]"
                  />
                </b-tab>
              </b-tabs>
            </td>
          </template>
          <template #item.name="{ item }">
            <span v-html="`<strong>${item.name}</strong>`" />
          </template>
          <template #item.lang="{ item }">
            <span v-html="`${getLang(item.lang)}`" />
          </template>
          <template #item.isActive="{ item }">
            <span v-html="`${getActive(item.isActive)}`" />
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <!--end: Datatable-->
      </div>
    </div>
    <!--end::Card-->
  </div>
</template>

<script>
import ApiService from '@/core/services/api.service';
import DropdownExport from '@/view/layout/extras/dropdown/DropdownExport';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
/* eslint-disable max-len */
import helpers from '../../core/services/helpers.vue';

export default {
  name: 'Dictionary',
  mixins: [helpers],
  components: { DropdownExport },
  data() {
    return {
      expanded: [],
      filter: { name: '', lang: null },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalDicts: 0,
      dictionaries: [],
      loading: true,
      options: {},
      page: 1,
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'İSİM',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'DİL', value: 'lang', align: 'center' },
        { text: 'KOD', value: 'code', align: 'center' },
        { text: 'ALAM DİLİ', value: 'anlamLang', align: 'center' },
        { text: 'AKTİF', value: 'isActive', align: 'center' },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        desc: '',
        code: '',
        lang: '',
        anlamLang: '',
        apa_cevirmen: '',
        apa_sozluk_ismi: '',
        apa_yazar_tarih: '',
        cms_basim_yeri: '',
        cms_cevirmen: '',
        cms_sozluk_ismi: '',
        cms_tarih_siteadi: '',
        cms_yazar: '',
        mla_cevirmen: '',
        mla_sozluk_ismi: '',
        mla_tarih_siteadi: '',
        mla_yazar: '',
        isActive: false,
      },
      defaultItem: {
        name: '',
        desc: '',
        code: '',
        lang: '',
        anlamLang: '',
        apa_cevirmen: '',
        apa_sozluk_ismi: '',
        apa_yazar_tarih: '',
        cms_basim_yeri: '',
        cms_cevirmen: '',
        cms_sozluk_ismi: '',
        cms_tarih_siteadi: '',
        cms_yazar: '',
        mla_cevirmen: '',
        mla_sozluk_ismi: '',
        mla_tarih_siteadi: '',
        mla_yazar: '',
        isActive: false,
      },
    };
  },
  watch: {
    filter: {
      handler(newval) {
        console.log('filter', newval);
        if (newval) {
          if (newval.name) {
            this.options = {
              searchTerm: newval.name,
              searchField: 'name',
            };
          } else if (newval.lang !== null) {
            this.options = {
              searchTerm: newval.lang,
              searchField: 'lang',
            };
          }
        }
      },
      deep: true,
    },
    options: {
      handler(newval) {
        console.log('Options:', newval);
        // cancel pending call
        clearTimeout(this._timerId);
        // delay new call 500ms
        this.timerId = setTimeout(() => {
          this.getDataFromApi();
        }, 500);
      },
      deep: true,
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Sözlükler' }]);
    this.getDataFromApi();
  },

  methods: {

    getLang(lang) {
      if (typeof lang !== 'undefined') {
        return (
          `<span class="label label-light-primary label-inline font-weight-bold label-lg">${
            lang
          }</span>`
        );
      }
    },

    getActive(isActive) {
      if (typeof isActive !== 'undefined') {
        const status = {
          false: {
            title: 'Pasif',
            state: 'danger',
          },
          true: {
            title: 'Aktif',
            state: 'success',
          },
        };
        return (
          `<span class="label label-${
            status[isActive].state
          } label-dot mr-2"></span><span class="font-weight-bold text-${
            status[isActive].state
          }">${
            status[isActive].title
          }</span>`
        );
      }
    },

    editItem(item) {
      this.editedIndex = this.dictionaries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dictionaries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dictionaries.splice(this.editedIndex, 1);
      this.deleteData('dictionary', this.editedItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let payload = {
        name: this.editedItem.name,
        desc: this.editedItem.desc,
        code: this.editedItem.code,
        lang: this.editedItem.lang,
        anlamLang: this.editedItem.anlamLang,
        apa_cevirmen: this.editedItem.apa_cevirmen,
        apa_sozluk_ismi: this.editedItem.apa_sozluk_ismi,
        apa_yazar_tarih: this.editedItem.apa_yazar_tarih,
        cms_basim_yeri: this.editedItem.cms_basim_yeri,
        cms_cevirmen: this.editedItem.cms_cevirmen,
        cms_sozluk_ismi: this.editedItem.cms_sozluk_ismi,
        cms_tarih_siteadi: this.editedItem.cms_tarih_siteadi,
        cms_yazar: this.editedItem.cms_yazar,
        mla_cevirmen: this.editedItem.mla_cevirmen,
        mla_sozluk_ismi: this.editedItem.mla_sozluk_ismi,
        mla_tarih_siteadi: this.editedItem.mla_tarih_siteadi,
        mla_yazar: this.editedItem.mla_yazar,
        isActive: this.editedItem.isActive,
      };
      payload = this.removeEmpty(payload);
      if (this.editedIndex > -1) {
        Object.assign(
          this.dictionaries[this.editedIndex],
          this.editedItem,
        );
        this.updateData('dictionary', this.editedItem.id, payload).then(() => this.getDataFromApi());
      } else {
        this.dictionaries.push(this.editedItem);
        this.saveData('dictionary', payload).then(() => this.getDataFromApi());
      }
      setTimeout(() => {
        this.getDataFromApi();
      }, 500);
      this.close();
    },

    getDataFromApi() {
      this.loading = true;
      console.log('this.options:', this.options);
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('dictionary', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.dictionaries = data.data;
              this.totalDicts = data.meta.total;
            }
            this.loading = false;
            resolve(data);
          })
          .catch(({ message }) => {
            console.log(message);
            this.loading = false;
            reject(message);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep td.datatable-subtable {
    background-color: #f3efef;
    table.datatable-table {
        background-color: #f3efef;
    }
}
::v-deep .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    background-color: #EBEDF3;
    border-color: #EBEDF3 #EBEDF3 #EBEDF3;
}
::v-deep .table.b-table.b-table-stacked > tbody > tr > [data-label]::before {
    width: 100px;
}
::v-deep .tabcontent {
  background: #ebedf2;
  padding: 20px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 3px;
}
</style>
