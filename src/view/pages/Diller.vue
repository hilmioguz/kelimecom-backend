<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Dil Listesi
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
                :json-data="sitelangs"
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
          :items="sitelangs"
          :options.sync="options"
          :server-items-length="totalSitelangs"
          :loading="loading"
          :page="page"
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
                          v-model="filter.value"
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
                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.value
                            "
                            label="Dilin kısaltması"
                          />
                        </v-col>

                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.title.tr
                            "
                            label="Türkçesi"
                          />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field
                            v-model="
                              editedItem.title.en
                            "
                            label="İngilizcesi"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            type="number"
                            v-model="
                              editedItem.order
                            "
                            label="Sıralama"
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
                transition="dialog-bottom-transition"
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
          <template #item.value="{ item }">
            <span v-html="`<strong>${item.value}</strong>`" />
          </template>
          <template #item.title="{ item }">
            <span v-html="`<strong>${item.tr}</strong>`" />
          </template>
          <template #item.title="{ item }">
            <span v-html="`<strong>${item.en}</strong>`" />
          </template>
          <template #item.order="{ item }">
            <span v-html="`${item.order}`" />
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
  name: 'Diller',
  mixins: [helpers],
  components: { DropdownExport },
  data() {
    return {
      expanded: [],
      filter: { value: '' },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalSitelangs: 0,
      sitelangs: [],
      loading: true,
      page: 1,
      headers: [
        {
          text: 'KISALTMASI',
          align: 'start',
          sortable: true,
          value: 'value',
        },
        { text: 'TÜRKÇE ADI', value: 'title.tr', align: 'left' },
        { text: 'İNGİLİZCE ADI', value: 'title.en', align: 'left' },
        { text: 'SIRALAMA', value: 'order', align: 'left' },
        {
          text: 'SON GUNCELLEME',
          align: 'center',
          sortable: true,
          value: 'updatedAt',
        },
        { text: 'AKTİF', value: 'isActive', align: 'center' },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        value: '',
        title: {
          en: '',
          tr: '',
        },
        order: null,
        isActive: false,
      },
      defaultItem: {
        value: '',
        title: {
          en: '',
          tr: '',
        },
        order: null,
        isActive: false,
      },
    };
  },
  watch: {
    filter: {
      handler(newval) {
        console.log('filter', newval);
        if (newval) {
          if (newval.value) {
            this.options = {
              searchTerm: newval.value,
              searchField: 'value',
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Diller' }]);
    this.getDataFromApi();
  },

  methods: {

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
      this.editedIndex = this.sitelangs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.sitelangs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.sitelangs.splice(this.editedIndex, 1);
      this.deleteData('sitelanguage', this.editedItem.value);
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
        value: this.editedItem.value,
        title: this.editedItem.title,
        order: this.editedItem.order,
        isActive: this.editedItem.isActive,
      };
      payload = this.removeEmpty(payload);
      if (this.editedIndex > -1) {
        Object.assign(
          this.sitelangs[this.editedIndex],
          this.editedItem,
        );
        this.updateData('sitelanguage', this.editedItem.value, payload).then(() => this.getDataFromApi());
      } else {
        this.sitelangs.push(this.editedItem);
        this.saveData('sitelanguage', payload).then(() => this.getDataFromApi());
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
        ApiService.get('sitelanguage', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.sitelangs = data.data;
              this.totalSitelangs = data.meta.total;
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
::v-deep .pmd-editor .icon-box {
  i {
    color: #6d6e70;
  }
  .icon-menu {
      padding-left: 0!important;
  }
}

::v-deep .sub-blog-content {
    max-height: 400px;
    padding: 20px;
    overflow-y: auto;
}
::v-deep .pmd-editor .editor-box {
    max-height: 500px;
}
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
    vertical-align: middle !important;
  }
::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
vertical-align: middle !important;
}
</style>
