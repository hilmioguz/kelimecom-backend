<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Kurum Listesi
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
                @veri="
                  {
                  }
                "
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
          :items="kurumlar"
          :options.sync="options"
          :server-items-length="totalKurumlar"
          :loading="loading"
          :expanded.sync="expanded"
          :page="page"
          show-expand
          class="elevation-0"
        >
          <!-- eslint-disable vue/valid-v-slot -->
          <template #top>
            <v-toolbar flat>
              <div class="w-100">
                <div class="row align-items-center">
                  <div class="col-lg-9 col-xl-8">
                    <div class="row align-items-start">
                      <div class="col-md-4 my-2 my-md-0">
                        <v-text-field
                          v-model="filter.institution_name"
                          append-icon="mdi-magnify"
                          label="Arama"
                          single-line
                          hide-details
                        />
                      </div>
                      <div class="col-md-4 my-2 my-md-0">
                        <v-select
                          v-model="filter.status"
                          :return-object="false"
                          :items="statusList"
                          label="Statüsü"
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
                transition="dialog-bottom-transition"
                scrollable
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
                              editedItem.institution_name
                            "
                            label="Kurum Adı"
                          />
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.mail_suffix
                            "
                            label="Domain"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-menu
                            v-model="menu1"
                            :close-on-content-click="true"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                v-model="computedBeginDate"
                                label="Abone/Deneme Başlangıç"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.beginDate"
                              no-title
                              locale="tr-TR"
                              @input="menu1 = false"
                            />
                          </v-menu>
                        </v-col>
                        <v-col cols="6">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="true"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto"
                          >
                            <template #activator="{ on, attrs }">
                              <v-text-field
                                v-model="computedEndDate"
                                label="Abone/Deneme Bitiş"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.endDate"
                              no-title
                              locale="tr-TR"
                              @input="menu2 = false"
                            />
                          </v-menu>
                        </v-col>

                        <v-col cols="6">
                          <v-textarea
                            v-model="
                              editedItem.ipBlockRef
                            "
                            rows="2"
                            label="IP Blokları (Referans)"
                          />
                        </v-col>
                        <v-col cols="6">
                          <label class="typo__label">CIDR IP Blokları *</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir tane ekle"
                            id="ts"
                            :multiple="true"
                            :options="cidrOptions"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="false"
                            @tag="addTag"
                            v-model="editedItem.cidr"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.contact
                            "
                            label="İrtibat"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.contactEmail
                            "
                            label="İrtibat Eposta"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.phone
                            "
                            label="Telefon"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-textarea
                            v-model="
                              editedItem.address
                            "
                            rows="2"
                            label="Kurum Adress"
                          />
                        </v-col>
                        <v-col cols="4">
                          <vue-dropzone
                            ref="kurumLogo"
                            id="dropzone"
                            :options="uploadOptions"
                            :use-custom-slot="true"
                            @vdropzone-removed-file="fileDeleted"
                            @vdropzone-success="fileUploaded"
                          >
                            <div class="dropzone-custom-content">
                              <div
                                class="dz-image"
                                v-if="editedItem.logoImage"
                              >
                                <img
                                  data-dz-thumbnail=""
                                  alt="kurum logo"
                                  width="100"
                                  height="auto"
                                  :src="editedItem.logoImage"
                                >
                              </div>
                              <h5 class="ma-2 dropzone-custom-title">
                                Kurum Logo - Sürükle Bırak ya da tıklayın
                              </h5>
                            </div>
                          </vue-dropzone>
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
                          <v-select
                            v-model="editedItem.status"
                            :return-object="false"
                            :items="statusList"
                            label="Statüsü"
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
                  title="Detaylar"
                  active
                  class="text-left"
                >
                  <b-table
                    stacked
                    striped
                    small
                    :fields="detayFields"
                    :items="getKurumDetails(item)"
                  />
                </b-tab>
                <b-tab
                  title="IP Blokları"
                  class="text-left"
                >
                  <b-table
                    stacked
                    striped
                    small
                    :items="[{ 'Ip Blok Referanslar:': item.ipBlockRef, 'CIDR IP Blok:': item.cidr.toString() }]"
                  />
                </b-tab>
              </b-tabs>
            </td>
          </template>
          <template #item.institution_name="{ item }">
            <span v-html="`<strong>${item.institution_name}</strong>`" />
          </template>
          <template #item.status="{ item }">
            <span v-html="`${getStatus(item.status)}`" />
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
import { format, parseISO } from 'date-fns';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import turkish from 'date-fns/locale/tr';
import vue2Dropzone from 'vue2-dropzone';
import ApiService from '@/core/services/api.service';
import DropdownExport from '@/view/layout/extras/dropdown/DropdownExport';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';

/* eslint-disable max-len */
import helpers from '../../core/services/helpers.vue';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

const IPCIDR = require('ip-cidr');

export default {
  name: 'Kurumlar',
  mixins: [helpers],
  components: { DropdownExport, vueDropzone: vue2Dropzone, Multiselect },
  data() {
    return {
      expanded: [],
      filter: { name: '', lang: null },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalKurumlar: 0,
      kurumlar: [],
      loading: true,
      menu1: false,
      menu2: false,
      cidrOptions: [],
      options: {},
      page: 1,
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'KURUM ADI',
          align: 'start',
          sortable: true,
          value: 'institution_name',
        },
        { text: 'DOMAIN', value: 'mail_suffix', align: 'center' },
        { text: 'STATUS', value: 'status', align: 'center' },
        { text: 'AKTİF', value: 'isActive', align: 'center' },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        institution_name: '',
        address: '',
        beginDate: '',
        cidr: [],
        contact: '',
        contactEmail: '',
        endDate: '',
        ipBlockRef: '',
        logoImage: '',
        mail_suffix: '',
        phone: '',
        status: '',
        isActive: false,
      },
      defaultItem: {
        institution_name: '',
        address: '',
        beginDate: '',
        cidr: [],
        contact: '',
        contactEmail: '',
        endDate: '',
        ipBlockRef: '',
        logoImage: '',
        mail_suffix: '',
        phone: '',
        status: '',
        isActive: false,
      },
      detayFields: [
        {
          key: 'beginDate',
          label: 'Abone/Deneme Başlangıç:',
          formatter: value => (value ? format(parseISO(value), 'dd MMMM yyyy', { locale: turkish }) : ''),
        },
        { key: 'endDate', label: 'Abone/Deneme Bitiş:', formatter: value => (value ? format(parseISO(value), 'dd MMMM yyyy', { locale: turkish }) : '') },
        { key: 'contact', label: 'İrtibat:' },
        { key: 'contactEmail', label: 'İrtibat Eposta:' },
        { key: 'phone', label: 'İrtibat Telefon:' },
      ],
    };
  },
  computed: {
    computedBeginDate() {
      return this.dateFormating(this.editedItem.beginDate);
    },
    computedEndDate() {
      return this.dateFormating(this.editedItem.endDate);
    },
  },
  watch: {
    filter: {
      handler(newval) {
        console.log('filter', newval);
        if (newval) {
          if (newval.institution_name) {
            this.options = {
              searchTerm: newval.institution_name,
              searchField: 'institution_name',
            };
          } else if (newval.status !== null) {
            this.options = {
              searchTerm: newval.status,
              searchField: 'status',
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Kurumlar' }]);
    this.getDataFromApi();
  },

  methods: {
    getKurumDetails(item) {
      return [
        {
          beginDate: item.beginDate ? item.beginDate : '',
          endDate: item.endDate ? item.endDate : '',
          contact: item.contact,
          contactEmail: item.contactEmail,
          phone: item.phone,
        },
      ];
    },
    addTag(newTag) {
      console.log('new tag: ', newTag);
      if (IPCIDR.isValidAddress(newTag) && newTag.includes('/')) {
        this.cidrOptions.unshift(newTag);
        this.editedItem.cidr.unshift(newTag);
      } else {
        this.errorMessage('Eklemeye çalıştıgınız şey IP CIDR formatında değil!');
      }
    },
    fileUploaded(file, response) {
      console.log('FILE UPLOAD SONUC:', file, response);
      if (response && response.length && response[0].url) {
        this.editedItem.logoImage = response[0].url;
      }
    },
    fileDeleted(file, response) {
      console.log('FILE deleted SONUC:', file, response);
      this.editedItem.logoImage = '';
    },
    getStatus(status) {
      if (typeof status !== 'undefined') {
        if (status === 'deneme') {
          return (
            `<span class="label label-light-primary label-inline font-weight-bold label-lg">${
              status
            }</span>`
          );
        }
        if (status === 'abone') {
          return (
            `<span class="label label-light-success label-inline font-weight-bold label-lg">${
              status
            }</span>`
          );
        }
      }
      return '';
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
      this.editedIndex = this.kurumlar.indexOf(item);
      this.cidrOptions = Array.isArray(item.cidr) ? item.cidr : [];
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.kurumlar.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.kurumlar.splice(this.editedIndex, 1);
      this.deleteData('kurumlar', this.editedItem.id);
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
      let formattedCidr = [];
      if (formattedCidr !== null) {
        if (typeof this.editedItem.cidr === 'object') {
          console.log('Cidr object');
          formattedCidr = Object.values(this.editedItem.cidr);
        } else if (!Array.isArray(this.editedItem.cidr)) {
          formattedCidr.push(this.editedItem.cidr);
          console.log('Cidr string');
        } else if (Array.isArray(this.editedItem.cidr)) {
          console.log('Cidr array');
        }
      }

      let payload = {
        institution_name: this.editedItem.institution_name,
        address: this.editedItem.address,
        beginDate: this.editedItem.beginDate,
        cidr: formattedCidr,
        contact: this.editedItem.contact,
        contactEmail: this.editedItem.contactEmail,
        endDate: this.editedItem.endDate,
        ipBlockRef: this.editedItem.ipBlockRef,
        logoImage: this.editedItem.logoImage,
        mail_suffix: this.editedItem.mail_suffix,
        phone: this.editedItem.phone,
        status: this.editedItem.status,
        isActive: this.editedItem.isActive,
      };
      console.log(payload);
      payload = this.removeEmpty(payload);
      payload.cidr = formattedCidr;
      if (this.editedIndex > -1) {
        Object.assign(
          this.kurumlar[this.editedIndex],
          this.editedItem,
        );
        this.updateData('kurumlar', this.editedItem.id, payload).then(() => this.getDataFromApi());
      } else {
        this.kurumlar.push(this.editedItem);
        this.saveData('kurumlar', payload).then(() => this.getDataFromApi());
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
        ApiService.get('kurumlar', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.kurumlar = data.data;
              this.totalKurumlar = data.meta.total;
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
    width: 170px;
}
</style>
