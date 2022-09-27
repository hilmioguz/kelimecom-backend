<!-- eslint-disable max-len -->
<template>
  <!--begin::Card-->
  <b-overlay
    :show="loaderEnabled"
    variant="info"
    :opacity="0.80"
    :blur="'2px'"
    rounded="sm"
  >
    <template #overlay>
      <div class="text-center text-white">
        <b-icon
          icon="stopwatch"
          font-scale="3"
          animation="cylon"
        />
        <p
          id="cancel-label"
          class="font-weight-bold"
        >
          Lütfen bekleyiniz! <br> <br>Birleştiriliyor...
        </p>
      </div>
    </template>

    <div
      class="card card-custom"
    >
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Kuluçka Sözlük Listesi
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
          :page="page"
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
          class="elevation-0"
        >
          <!-- eslint-disable vue/valid-v-slot -->
          <template #top>
            <v-toolbar
              flat
              height="auto"
            >
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
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
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
                        <v-col cols="4">
                          <v-select
                            v-model="
                              editedItem.lang
                            "
                            :return-object="false"
                            :items="dilListesi"
                            label="Dil"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-select
                            v-model="
                              editedItem.anlamLang
                            "
                            :return-object="false"
                            :items="dilListesi"
                            label="Anlam Dili"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-select
                            v-model="
                              editedItem.karsiLang
                            "
                            :return-object="false"
                            :items="dilListesi"
                            label="Karşı Anlam Dili"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            v-model="
                              editedItem.desc
                            "
                            label="Açıklama"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="
                              editedItem.yazar
                            "
                            label="Yazar"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="
                              editedItem.hangiAsama
                            "
                            :items="[1,2,3]"
                            label="Hangi Kuluçka Aşama"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.toplamSayfa
                            "
                            label="Toplam Sayfa"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.bitenSayfa
                            "
                            label="Biten Sayfa"
                          />
                        </v-col>

                        <v-col cols="6">
                          <template v-for="(cilt, inde) in editedItem.cilt">
                            <div
                              class="d-flex"
                              :key="inde"
                            >
                              <v-text-field
                                type="number"
                                :disabled="editedItem.hangiAsama !== 2"
                                :value="editedItem.hangiAsama !== 2 ? null : 1"
                                v-model="
                                  cilt.start
                                "
                                :label="`${inde + 1}.Cilt Başlangıç Safası`"
                              />
                              <v-text-field
                                type="number"
                                :disabled="editedItem.hangiAsama !== 2"
                                :value="editedItem.hangiAsama !== 2 ? null : 1"
                                v-model="
                                  cilt.end
                                "
                                :label="`${inde + 1}.Cilt Bitiş Sayfası`"
                              />
                              <v-btn
                                color="secondary blue--text"
                                class="mb-2"
                                :disabled="editedItem.hangiAsama !== 2"
                                v-if="editedItem.cilt.length > 1"
                                @click="ciltSil(inde)"
                              >
                                Sil
                              </v-btn>
                            </div>
                          </template>
                          <v-btn
                            color="danger"
                            dark
                            class="mb-2"
                            :disabled="editedItem.hangiAsama !== 2"
                            @click="ciltEkle"
                          >
                            Yeni Cilt Ekle
                          </v-btn>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.sectionedBy
                            "
                            label="Bir Set de bulunan Sayfa Sayısı"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.azureUrl
                            "
                            label="Azure Folder Url"
                          />
                        </v-col>

                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.imageFilenameSytanx
                            "
                            label="Resim Dosya Adı Formatı( ör: resim*.jpeg )"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.hakkindaBlogUrl
                            "
                            label="Hakkında blog url"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.kisaltmalarUrl
                            "
                            label="Sözlük kısaltmalar url"
                          />
                        </v-col>

                        <v-col cols="4">
                          <v-switch
                            v-model="
                              editedItem.isSectionCreated
                            "
                            :disabled="editedItem.hangiAsama !== 2"
                            :value="editedItem.hangiAsama !== 2 ? false : true"
                            :label="
                              editedItem.isSectionCreated
                                ? 'Setleri Oluştur'
                                : 'Setleri Sonra Oluştur'
                            "
                          />
                        </v-col>
                        <v-col cols="4">
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
                        <v-col cols="4">
                          <vue-dropzone
                            ref="profilePic"
                            id="dropzone"
                            :options="uploadOptions"
                            :use-custom-slot="true"
                            @vdropzone-removed-file="fileDeleted"
                            @vdropzone-success="fileUploaded"
                          >
                            <div class="dropzone-custom-content">
                              <div
                                class="dz-image"
                                v-if="editedItem.coverImage"
                              >
                                <img
                                  data-dz-thumbnail=""
                                  alt="resim"
                                  width="100"
                                  height="auto"
                                  :src="editedItem.coverImage"
                                >
                              </div>
                              <h5 class="ma-2 dropzone-custom-title">
                                Kapak Resmi - Sürükle Bırak ya da tıklayın
                              </h5>
                            </div>
                          </vue-dropzone>
                        </v-col>
                        <v-col cols="12">
                          <v-expansion-panels v-model="panel">
                            <v-expansion-panel>
                              <v-expansion-panel-header>
                                <p class="font-weight-black subtitle-1 blue--text">
                                  Akademik Referanslar
                                </p>
                              </v-expansion-panel-header>
                              <v-expansion-panel-content>
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
                              </v-expansion-panel-content>
                            </v-expansion-panel>
                          </v-expansion-panels>
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
                    class="text-h4"
                  >
                    Kuluçka sistemde bu sözlüğe ait <br>toplam {{ toplamMaddeBasi }} maddebaşı var.
                  </v-card-title>
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
          <template #item.name="{ item }">
            <span v-html="`<strong>${item.name}</strong>`" />
          </template>
          <template #item.cilt="{ item }">
            <div
              v-for="(alt, ix) in item.cilt"
              :key="alt._id"
              v-html="`${ix + 1}.Cilt <strong>${alt.start}</strong>-<strong>${alt.end}</strong> sayfaları`"
            />
          </template>
          <template #item.lang="{ item }">
            <span v-html="`${getLang(item.lang)}`" />
          </template>
          <template #item.isActive="{ item }">
            <span v-html="`${getActive(item.isActive)}`" />
          </template>
          <template #item.actions="{ item }">
            <v-btn
              depressed
              small
              color="primary"
              @click="gotoSet(item)"
              class="mx-4"
            >
              Setler
            </v-btn>
            <v-btn
              depressed
              small
              :disabled="item.isCombined"
              color="purple lighten-1 text-white"
              @click="combine(item)"
              class="mx-4"
            >
              {{ item.isCombined ? 'Birleştirilmiş': 'Birleştir' }}
            </v-btn>
            <v-icon
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
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
  </b-overlay>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import ApiService from '@/core/services/api.service';
import DropdownExport from '@/view/layout/extras/dropdown/DropdownExport';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
/* eslint-disable max-len */
import helpers from '../../core/services/helpers.vue';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'Kuluckasozluk',
  mixins: [helpers],
  components: { DropdownExport, vueDropzone: vue2Dropzone },
  data() {
    return {
      expanded: [],
      filter: { name: '', lang: null },
      timerId: null,
      panel: false,
      loaderEnabled: false,
      dialog: false,
      toplamMaddeBasi: 0,
      dialogDelete: false,
      totalDicts: 0,
      dictionaries: [],
      loading: true,
      options: {},
      page: 1,
      headers: [
        {
          text: 'İSİM',
          align: 'flex-start',
          sortable: true,
          value: 'name',
        },
        { text: 'DİL', value: 'lang', align: 'center' },
        { text: 'KOD', value: 'code', align: 'center' },
        { text: 'CİLT', value: 'cilt', align: 'center' },
        { text: 'SET SAYFA', value: 'sectionedBy', align: 'center' },
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
        karsiLang: '',
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
        cilt: [{ start: 1, end: 1 }],
        azureUrl: '',
        imageFilenameSytanx: '',
        sectionedBy: 5,
        toplamSayfa: null,
        bitenSayfa: null,
        yazar: '',
        coverImage: '',
        hangiAsama: 1,
        isSectionCreated: false,
        isCombined: false,
        hakkindaBlogUrl: '',
        kisaltmalarUrl: '',
      },
      defaultItem: {
        name: '',
        desc: '',
        code: '',
        lang: '',
        anlamLang: '',
        karsiLang: '',
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
        cilt: [{ start: 1, end: 1 }],
        azureUrl: '',
        imageFilenameSytanx: '',
        sectionedBy: 5,
        toplamSayfa: null,
        bitenSayfa: null,
        yazar: '',
        coverImage: '',
        hangiAsama: 1,
        isSectionCreated: false,
        isCombined: false,
        hakkindaBlogUrl: '',
        kisaltmalarUrl: '',
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Kuluçka Sözlükler' }]);
    this.getDataFromApi();
  },
  activated() {
    this.editedItem = this.defaultItem;
  },
  methods: {
    gotoSet(item) {
      this.$router.push({ name: 'Setler', params: { setId: item.id, name: item.name } });
    },
    getLang(lang) {
      if (typeof lang !== 'undefined') {
        return (
          `<span class="label label-light-primary label-inline font-weight-bold label-lg">${
            lang
          }</span>`
        );
      }
    },

    async combine(item) {
      const uncompleted = await this.getUncompletedSectionsApi(item.id);
      console.log(uncompleted);
      let message = '';
      let totalItems = null;
      if (uncompleted && uncompleted.length) {
        const names = uncompleted.map(i => i.name).join(', ');
        message = `Tamamlanmamış setler var. ${names}`;
      }
      const dictexist = await this.checkDictionary(item.id);
      if (dictexist) {
        console.log('dictexist:', dictexist);
      }
      const stat = await this.getStatsFromApi(item.id);
      if (stat && stat.count) {
        totalItems = stat.count.toLocaleString('tr-TR');
      }
      if (!totalItems) {
        message = 'Birleştirme yapılacak kuluçka madde yok.';
      }

      if (message) {
        this.warningMessage(message);
      } else {
        const result = await this.combineFromApi(item.id);
        console.log('processing', result);
        if (result && result.ok) {
          this.updateData('kuluckadictionary', item.id, { isCombined: true }).then(() => {
            this.successMessage(`Toplam ${result.nMatched || result.nInserted || result.nUpserted || result.nModified} kayıt başarılı bir şekilde birleştirildi.`);
            this.getDataFromApi();
          });
        }
      }
    },

    async getUncompletedSectionsApi(dictId) {
      this.loading = true;
      const payload = {
        searchTerm: dictId,
        searchField: 'dictId',
        isDelivered: false,
        isControlled: false,
      };
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('kuluckasection', this.stringify(payload))
          .then(({ data }) => {
            this.loading = false;
            resolve(data.data);
          })
          .catch((error) => {
            this.errorMessage(error);
            this.loading = false;
            reject(error);
          });
      });
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
    ciltEkle() {
      this.editedItem.cilt.push({ start: 1, end: 1 });
    },
    ciltSil(index) {
      this.editedItem.cilt.splice(index, 1);
    },
    fileUploaded(file, response) {
      if (response && response.length && response[0].url) {
        this.editedItem.coverImage = response[0].url;
      }
    },
    fileDeleted() {
      this.editedItem.coverImage = '';
    },
    editItem(item) {
      this.editedIndex = this.dictionaries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.toplamMaddeBasi = 0;
      this.editedIndex = this.dictionaries.indexOf(item);
      this.editedItem = Object.assign({}, item);
      const stat = await this.getStatsFromApi(item.id);
      if (stat && stat.count) {
        this.toplamMaddeBasi = stat.count.toLocaleString('tr-TR');
      }
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.dictionaries.splice(this.editedIndex, 1);
      this.deleteData('kuluckadictionary', this.editedItem.id);
      this.closeDelete();
    },

    combineFromApi(id) {
      this.loaderEnabled = true;
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        // eslint-disable-next-line prefer-template
        ApiService.get('kuluckadictionary/combine/' + id)
          .then(({ data }) => {
            this.loaderEnabled = false;
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            this.loaderEnabled = false;
            reject(error);
          });
      });
    },
    checkDictionary(id) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        // eslint-disable-next-line prefer-template
        ApiService.get('kuluckadictionary/checkexistance/' + id)
          .then(({ data }) => {
            this.loading = false;
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            this.loading = false;
            reject(error);
          });
      });
    },

    getStatsFromApi(id) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        // eslint-disable-next-line prefer-template
        ApiService.get('kuluckadictionary/stat/' + id)
          .then(({ data }) => {
            this.loading = false;
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            this.loading = false;
            reject(error);
          });
      });
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
        cilt: JSON.stringify(this.editedItem.cilt),
        azureUrl: this.editedItem.azureUrl,
        imageFilenameSytanx: this.editedItem.imageFilenameSytanx,
        sectionedBy: this.editedItem.sectionedBy,
        toplamSayfa: this.editedItem.toplamSayfa,
        bitenSayfa: this.editedItem.bitenSayfa,
        yazar: this.editedItem.yazar,
        hangiAsama: this.editedItem.hangiAsama,
        hakkindaBlogUrl: this.editedItem.hakkindaBlogUrl,
        karsiLang: this.editedItem.karsiLang,
        kisaltmalarUrl: this.editedItem.kisaltmalarUrl,
        isSectionCreated: this.editedItem.isSectionCreated,
        isCombined: this.editedItem.isCombined,
      };
      if (this.editedItem.coverImage !== '' && this.editedItem.coverImage != null) {
        payload.coverImage = this.editedItem.coverImage;
      }
      payload = this.removeEmpty(payload);
      if (this.editedIndex > -1) {
        Object.assign(
          this.dictionaries[this.editedIndex],
          this.editedItem,
        );
        this.updateData('kuluckadictionary', this.editedItem.id, payload).then(() => this.getDataFromApi());
      } else {
        this.dictionaries.push(this.editedItem);
        this.saveData('kuluckadictionary', payload).then(() => this.getDataFromApi());
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
        ApiService.get('kuluckadictionary', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.dictionaries = data.data;
              this.totalDicts = data.meta.total;
            }
            this.loading = false;
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            this.loading = false;
            reject(error);
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
