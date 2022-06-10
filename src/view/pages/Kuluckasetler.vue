<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Set Listesi
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
                :json-data="sections"
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
          :items="sections"
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
            <v-toolbar
              flat
              height="auto"
            >
              <div class="w-100">
                <div class="row align-items-center">
                  <div class="col-lg-9 col-xl-8">
                    <div class="row align-items-start">
                      <div class="col-md-4 my-2 my-md-0">
                        <v-select
                          v-model="filter.isActive"
                          :items="isActivesearchTerm"
                          label="Aktif"
                        />
                      </div>
                      <div class="col-md-4 my-2 my-md-0">
                        <v-select
                          v-model="filter.isCompleted"
                          :items="isCompletedsearchTerm"
                          label="Tamamlanma"
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
                            type="number"
                            v-model="
                              editedItem.totalPages
                            "
                            label="Toplam Sayfa"
                          />
                        </v-col>
                        <v-col cols="12">
                          <v-combobox
                            v-model="editedItem.pages"
                            :items="editedItem.pages"
                            label="Sayfalar"
                            cache-items
                            multiple
                            chips
                          />
                        </v-col>
                        <v-col cols="4">
                          <div class="d-flex align-start justify-start">
                            <v-switch

                              v-model="
                                editedItem.isDelivered
                              "
                              :label="
                                editedItem.isDelivered
                                  ? 'Teslim Edildi'
                                  : 'Teslim Edilmedi'
                              "
                            />
                            <v-tooltip
                              top
                            >
                              <template #activator="{ on, attrs }">
                                <v-btn
                                  icon
                                  small
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    color="grey lighten-1"
                                  >
                                    mdi-information-outline
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Kullanıcı seti tamamlayarak teslim edip etmediğini gösterir</span>
                            </v-tooltip>
                          </div>
                        </v-col>
                        <v-col cols="4">
                          <div class="d-flex align-start justify-start">
                            <v-switch
                              v-model="
                                editedItem.isCompleted
                              "
                              :label="
                                editedItem.isCompleted
                                  ? 'Tamamlandı'
                                  : 'Tamamlanmadı'
                              "
                            />
                            <v-tooltip
                              top
                            >
                              <template #activator="{ on, attrs }">
                                <v-btn
                                  icon
                                  small
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    color="grey lighten-1"
                                  >
                                    mdi-information-outline
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>Kullanıcı tarafından teslim edilen set, moderatör tarafından kontrol edilerek tamamlanıp tamamlanmadığını gösterir </span>
                            </v-tooltip>
                          </div>
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
              <v-list>
                <v-list-item
                  v-for="(ipage, ind) in item.pages"
                  :key="ind"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="ipage" />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </td>
          </template>
          <template #item.name="{ item }">
            <span v-html="`<strong>${item.name}</strong>`" />
          </template>
          <template #item.totalPages="{ item }">
            <span v-html="`${item.totalPages}`" />
          </template>
          <template #item.isActive="{ item }">
            <span v-html="`${getActive(item.isActive)}`" />
          </template>
          <template #item.isDelivered="{ item }">
            <span v-html="`${item.isDelivered ? getDeliver(item.isDelivered): '-'}`" />
          </template>
          <template #item.userAssigned="{ item }">
            <span v-html="`${item.userAssigned ? item.userAssigned.name : '-'}`" />
          </template>
          <template #item.isCompleted="{ item }">
            <span v-html="`${getCompleted(item.isCompleted)}`" />
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
  name: 'Kuluckasetler',
  mixins: [helpers],
  components: { DropdownExport },
  data() {
    return {
      expanded: [],
      filter: { isActive: null, isCompleted: null },
      timerId: null,
      dialog: false,
      show: false,
      dialogDelete: false,
      totalDicts: 0,
      sections: [],
      loading: true,
      options: {
        sortBy: ['order'],
        sortDesc: [false],
      },
      isActivesearchTerm: [{ text: 'Tümü', value: 'tum' }, { text: 'Aktif', value: true }, { text: 'Pasif', value: false }],
      isCompletedsearchTerm: [{ text: 'Tümü', value: 'tum' }, { text: 'Tamamlanmış', value: true }, { text: 'Tamamlanmamış', value: false }],
      page: 1,
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'İSİM',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'TOPLAM SAYFA', value: 'totalPages', align: 'center' },
        { text: 'AKTİF', value: 'isActive', align: 'center' },
        { text: 'TESLİM EDİLME', value: 'isDelivered', align: 'center' },
        { text: 'ATANAN KULLANICI', value: 'userAssigned', align: 'center' },
        { text: 'TAMAMLANMIŞ', value: 'isCompleted', align: 'center' },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        name: '',
        totalPages: 0,
        pages: [],
        isActive: false,
        isCompleted: false,
        isDelivered: false,
        userAssigned: '',
      },
      defaultItem: {
        name: '',
        totalPages: 0,
        pages: [],
        isActive: false,
        isCompleted: false,
        isDelivered: false,
        userAssigned: '',
      },
    };
  },
  watch: {
    filter: {
      handler(newval) {
        console.log('newval.isActive:', newval.isActive);
        console.log('newval.isCompleted:', newval.isCompleted);
        if (newval) {
          if (newval.isActive != null && newval.isActive !== 'undefined') {
            if (newval.isActive === 'tum') {
              this.$delete(this.options, 'isActive');
            } else {
              console.log('filter isActive', newval.isActive);
              this.$set(this.options, 'isActive', newval.isActive);
            }
          }

          if (newval.isCompleted != null && newval.isCompleted !== 'undefined') {
            if (newval.isCompleted === 'tum') {
              this.$delete(this.options, 'isCompleted');
            } else {
              console.log('filter isActive', newval.isCompleted);
              this.$set(this.options, 'isCompleted', newval.isCompleted);
            }
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

  activated() {
    console.log('activated..');
    this.$set(this.options, 'searchField', 'dictId');
    this.$set(this.options, 'searchTerm', this.$route.params.setId);
    this.$store.dispatch(SET_BREADCRUMB, [{ title: `${this.$route.params.name} Setleri` }]);
    this.getDataFromApi();
    this.filter = { isActive: null, isCompleted: null };
    this.$delete(this.options, 'isActive');
    this.$delete(this.options, 'isCompleted');
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

    getCompleted(isCompleted) {
      if (typeof isCompleted !== 'undefined') {
        const status = {
          false: {
            title: 'Tamamlanmadı',
            state: 'danger',
          },
          true: {
            title: 'Tamamlanmış',
            state: 'success',
          },
        };
        return (
          `<span class="label label-${
            status[isCompleted].state
          } label-dot mr-2"></span><span class="font-weight-bold text-${
            status[isCompleted].state
          }">${
            status[isCompleted].title
          }</span>`
        );
      }
    },
    getDeliver(isDelivered) {
      if (typeof isDelivered !== 'undefined') {
        const status = {
          false: {
            title: 'Edilmedi',
            state: 'danger',
          },
          true: {
            title: 'Edildi',
            state: 'success',
          },
        };
        return (
          `<span class="label label-${
            status[isDelivered].state
          } label-dot mr-2"></span><span class="font-weight-bold text-${
            status[isDelivered].state
          }">${
            status[isDelivered].title
          }</span>`
        );
      }
    },
    editItem(item) {
      this.editedIndex = this.sections.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.sections.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.sections.splice(this.editedIndex, 1);
      this.deleteData('kuluckasection', this.editedItem.id);
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
        totalPages: this.editedItem.pages.length,
        pages: JSON.stringify(this.editedItem.pages),
        isCompleted: this.editedItem.isCompleted,
        userAssigned: this.editedItem.userAssigned.id,
        isActive: this.editedItem.isActive,
        isDelivered: this.editedItem.isDelivered,
        dictId: this.$route.params.setId,
      };
      payload = this.removeEmpty(payload);
      if (this.editedIndex > -1) {
        Object.assign(
          this.sections[this.editedIndex],
          this.editedItem,
        );
        this.updateData('kuluckasection', this.editedItem.id, payload).then(() => this.getDataFromApi());
      } else {
        this.sections.push(this.editedItem);
        this.saveData('kuluckasection', payload).then(() => this.getDataFromApi());
      }
      setTimeout(() => {
        this.getDataFromApi();
      }, 500);
      this.close();
    },

    async getDataFromApi() {
      this.loading = true;
      console.log('this.options:', this.options);
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options;
      const data = await new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('kuluckasection', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            this.loading = false;
            resolve(data);
          })
          .catch(({ message }) => {
            console.log(message);
            this.loading = false;
            reject(message);
          });
      });
      if (data) {
        this.sections = data.data;
        this.totalDicts = data.meta.total;
      }
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
