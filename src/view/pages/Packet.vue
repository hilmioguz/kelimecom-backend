<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Paket Listesi
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
                :json-data="packets"
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
          :items="packets"
          :options.sync="options"
          :server-items-length="totalPackets"
          :loading="loading"
          :expanded.sync="expanded"
          :page="page"
          show-expand
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
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
                          v-model="filter.name"
                          append-icon="mdi-magnify"
                          label="Arama"
                          single-line
                          hide-details
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
                              editedItem.name
                            "
                            label="Paket Adı"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.role
                            "
                            label="Paket slug(farklı eşssiz olmalı, id gibi)"
                          />
                        </v-col>
                        <v-col cols="12">
                          <label class="h6">Maddebaşı</label>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.maddebasi.limitlessCount
                            "
                            label="Ne kadar sefer sınırsız gösterim"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.maddebasi.limitLater
                            "
                            label="Kredi bitince gösterilecek madde sayısı"
                          />
                        </v-col>
                        <v-col cols="12">
                          <label class="h6">Çekim</label>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.cekim.limitlessCount
                            "
                            label="Ne kadar sefer sınırsız gösterim"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.cekim.limitLater
                            "
                            label="Kredi bitince gösterilecek madde sayısı"
                          />
                        </v-col>
                        <v-col cols="12">
                          <label class="h6">Anlam</label>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.anlam.limitlessCount
                            "
                            label="Ne kadar sefer sınırsız gösterim"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.anlam.limitLater
                            "
                            label="Kredi bitince gösterilecek madde sayısı"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-switch
                            v-model="isLangLimit
                            "
                            :true-value="1"
                            :false-value="-1"
                            :label="
                              isLangLimit > 0
                                ? 'Sınırlı Dil'
                                : 'Sınırsız Dil'
                            "
                          />
                          <b-form-select
                            v-if="isLangLimit > 0"
                            v-model="editedItem.allowedLangs"
                            :options="dilListesi"
                            multiple
                            :select-size="5"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-switch
                            v-model="isDictLimit"
                            :true-value="1"
                            :false-value="-1"
                            :label="
                              isDictLimit > 0
                                ? 'Sınırlı Sözlük'
                                : 'Sınırsız Sözlük'
                            "
                          />
                          <b-form-select
                            v-if="isDictLimit > 0"
                            v-model="editedItem.allowedDicts"
                            :options="dictList"
                            multiple
                            :select-size="5"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-alert
                      text
                      type="info"
                    >
                      Sınırsız için -1 değeri veriniz
                    </v-alert>
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
                transition="dialog-bottom-transition"
                scrollable
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
            <td
              :colspan="headers.length"
              class="pa-0 ma-0"
            >
              <b-table
                stacked
                striped
                small
                class="mb-0"
                :items="getDictDetails(item)"
                :fields="detayFields"
              />
            </td>
          </template>
          <template #item.name="{ item }">
            <span v-html="`<strong>${item.name}</strong>`" />
          </template>
          <template #item.role="{ item }">
            <span v-html="`${item.role}`" />
          </template>
          <template #item.langLimit="{ item }">
            <span v-html="`${getLimit(item.langLimit)}`" />
          </template>
          <template #item.dictLimit="{ item }">
            <span v-html="`${getLimit(item.dictLimit)}`" />
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
import helpers from '../../core/services/helpers.vue';
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */

export default {
  name: 'Packets',
  mixins: [helpers],
  components: { DropdownExport },
  data() {
    return {
      expanded: [],
      filter: { name: '' },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalPackets: 0,
      packetList: [],
      kurumList: [],
      packets: [],
      isDictLimit: 0,
      isLangLimit: 0,
      editedIndex: -1,
      koptions: {
        page: 1,
        itemsPerPage: -1,
      },
      loading: true,
      menu1: false,
      menu2: false,
      options: {},
      page: 1,
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'PAKET ADI',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'SLUG', value: 'role', sortable: false },
        { text: 'DİL', value: 'langLimit', sortable: false },
        { text: 'SÖZLÜK', value: 'dictLimit', sortable: false },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedItem: {
        name: '',
        role: '',
        maddebasi: { limitlessCount: 3, limitLater: 1 },
        cekim: { limitlessCount: 3, limitLater: 1 },
        anlam: { limitlessCount: 3, limitLater: 1 },
        dictLimit: -1,
        allowedDicts: [],
        langLimit: -1,
        allowedLangs: [],
      },
      defaultItem: {
        name: '',
        role: '',
        maddebasi: { limitlessCount: 3, limitLater: 1 },
        cekim: { limitlessCount: 3, limitLater: 1 },
        anlam: { limitlessCount: 3, limitLater: 1 },
        dictLimit: -1,
        allowedDicts: [],
        langLimit: -1,
        allowedLangs: [],
      },
      detayFields: [
        { key: 'maddebasiLCount', label: 'Maddebaşı sınırsız gösterim sayısı:' },
        { key: 'maddebasiLLater', label: 'Maddebaşı daha sonra gösterim sayısı:' },
        { key: 'cekimLCount', label: 'Çekim sınırsız gösterim sayısı:' },
        { key: 'cekimLLater', label: 'Çekim daha sonra gösterim sayısı:' },
        { key: 'anlamLCount', label: 'Anlam sınırsız gösterim sayısı:' },
        { key: 'anlamLLater', label: 'Anlam daha sonra gösterim sayısı:' },
        { key: 'allowedLangs', label: 'İzin verilen diller:' },
        { key: 'allowedDicts', label: 'İzin verilen sözlükler:' },
      ],
    };
  },
  watch: {
    filter: {
      handler(newval) {
        if (newval) {
          if (newval.name) {
            this.options = {
              searchTerm: newval.name,
              searchField: 'name',
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
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Yeni Kayıt' : 'Kayıt Düzenleme';
    },
    backgroundImage() {
      return `${process.env.BASE_URL}media/misc/bg-1.jpg`;
    },

  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Üyelik Paketleri' }]);
    this.getDataFromApi();
    this.getDictsFromApi();
  },

  methods: {
    parseDicts(items) {
      return this.dictList.map(dict => (items.includes(dict.value) ? dict.text : null)).filter(x => x !== null).toString();
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
    getDictDetails(item) {
      return [
        {
          maddebasiLCount: item.maddebasi ? (item.maddebasi.limitlessCount < 0 ? 'Sınırsız' : item.maddebasi.limitlessCount) : '',
          maddebasiLLater: item.maddebasi ? (item.maddebasi.limitLater < 0 ? 'Sınırsız' : item.maddebasi.limitLater) : '',
          cekimLCount: item.cekim ? (item.cekim.limitlessCount < 0 ? 'Sınırsız' : item.cekim.limitlessCount) : '',
          cekimLLater: item.cekim ? (item.cekim.limitLater < 0 ? 'Sınırsız' : item.cekim.limitLater) : '',
          anlamLCount: item.anlam ? (item.anlam.limitlessCount < 0 ? 'Sınırsız' : item.anlam.limitlessCount) : '',
          anlamLLater: item.anlam ? (item.anlam.limitLater < 0 ? 'Sınırsız' : item.anlam.limitLater) : '',
          allowedLangs: item.allowedLangs.length ? item.allowedLangs.toString() : 'Tümü',
          allowedDicts: item.allowedDicts.length ? this.parseDicts(item.allowedDicts) : 'Tümü',
        },
      ];
    },
    getLimit(item) {
      if (typeof item !== 'undefined') {
        const status = {
          sinirsiz: {
            title: 'Sınırsız',
            state: 'success',
          },
          sinirli: {
            title: 'Sınırlı',
            state: 'error',
          },
        };
        return item < 0 ? (
          `<span class="label label-${
            status.sinirsiz.state
          } label-dot mr-2"></span><span class="font-weight-bold text-${
            status.sinirsiz.state
          }">${
            status.sinirsiz.title
          }</span>`
        ) : (
          `<span class="label label-${
            status.sinirli.state
          } label-dot mr-2"></span><span class="font-weight-bold text-${
            status.sinirli.state
          }">${
            status.sinirli.title
          } - ${item
          }</span>`
        );
      }
    },
    editItem(item) {
      this.editedIndex = this.packets.indexOf(item);
      this.isDictLimit = item.allowedDicts.length ? 1 : -1;
      this.isLangLimit = item.allowedLangs.length ? 1 : -1;
      if (item.kurumId && item.kurumId.id) {
        this.editedItem = Object.assign({}, item);
      } else {
        item.kurumId = { id: ' ' };
        this.editedItem = Object.assign({}, item);
      }

      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.packets.indexOf(item);
      this.isDictLimit = item.allowedDicts.length ? 1 : -1;
      this.isLangLimit = item.allowedLangs.length ? 1 : -1;
      if (item.kurumId && item.kurumId.id) {
        this.editedItem = Object.assign({}, item);
      } else {
        item.kurumId = { id: ' ' };
        this.editedItem = Object.assign({}, item);
      }
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.packets.splice(this.editedIndex, 1);
      this.deleteData('packet', this.editedItem.id);
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
      if ((this.isDictLimit > 0 && this.editedItem.allowedDicts.length === 0) || (this.isLangLimit > 0 && this.editedItem.allowedLangs.length === 0)) {
        this.warningMessage('Sınırlı içerik seçtiniz ancak bir seçim yapmadınız!');
        return;
      }
      const payload = {
        name: this.editedItem.name,
        role: this.editedItem.role,
        maddebasi: { limitlessCount: this.editedItem.maddebasi.limitlessCount, limitLater: this.editedItem.maddebasi.limitLater },
        cekim: { limitlessCount: this.editedItem.cekim.limitlessCount, limitLater: this.editedItem.cekim.limitLater },
        anlam: { limitlessCount: this.editedItem.anlam.limitlessCount, limitLater: this.editedItem.anlam.limitLater },
        dictLimit: this.isDictLimit > 0 ? this.editedItem.allowedDicts.length : -1,
        allowedDicts: this.isDictLimit > 0 ? this.editedItem.allowedDicts : [],
        langLimit: this.isLangLimit > 0 ? this.editedItem.allowedLangs.length : -1,
        allowedLangs: this.isLangLimit > 0 ? this.editedItem.allowedLangs : [],
      };

      if (this.editedIndex > -1) {
        Object.assign(
          this.packets[this.editedIndex],
          this.editedItem,
        );
        this.updateData('packet', this.editedItem.id, payload);
      } else {
        this.packets.push(this.editedItem);
        this.saveData('packet', payload);
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
        ApiService.get('packet', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.packets = data.data;
              this.totalPackets = data.meta.total;
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
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    vertical-align: middle !important;
  }
::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
vertical-align: middle !important;
}
::v-deep .table.b-table.b-table-stacked > tbody > tr > [data-label]::before {
    width: 260px;
}
</style>
