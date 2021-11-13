<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Blog Listesi
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
                :json-data="blogs"
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
          :items="blogs"
          :options.sync="options"
          :server-items-length="totalBlogs"
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
                          v-model="filter.title"
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
                              editedItem.title
                            "
                            @input="slugIt"
                            label="Blog Başlığı"
                          />
                        </v-col>

                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.slug
                            "
                            label="Slug"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.author
                            "
                            label="Yazar"
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
                        <v-col cols="12">
                          <h6>Blog İçeriği:</h6>
                          <pmd
                            v-model="editedItem.body"
                            :show-toolbar="true"
                            :show-textarea="true"
                            custom-lang="tr"
                            :upload-img-fn="uploadFn"
                            :upload-file-fn="uploadFn"
                            :img-width-height-attr="{width: true, height: false}"
                          />
                        </v-col>
                        <v-col cols="6">
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
                                v-if="editedItem.image"
                              >
                                <img
                                  data-dz-thumbnail=""
                                  alt="Blog kapak"
                                  width="100"
                                  height="auto"
                                  :src="editedItem.image"
                                >
                              </div>
                              <h5 class="ma-2 dropzone-custom-title">
                                Kapak Resmi - Sürükle Bırak ya da tıklayın
                              </h5>
                            </div>
                          </vue-dropzone>
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
          <template #item.createdAt="{ item }">
            <span>
              {{ dateFormatShort(item.createdAt) }}
            </span>
          </template>
          <template #item.updatedAt="{ item }">
            <span>
              {{ dateFormatShort(item.updatedAt) }}
            </span>
          </template>
          <!-- eslint-disable-next-line vue/no-template-shadow -->
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <div
                class="d-flex flex-column sub-blog-content"
              >
                <v-img
                  :src="item.image"
                  name="Kapak Resmi"
                  max-height="150"
                  max-width="250"
                />
                <span
                  class="bodyBLock"
                  v-html="renderMD(item.body)"
                />
              </div>
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
import Vue from 'vue';
import pmd from 'perfect-markdown'; //  or import pmd from 'perfect-markdown/lib/pmd.umd.min.js'
import vue2Dropzone from 'vue2-dropzone';
import store from '@/core/services/store'; // vuex is required in perfect-markdown
import ApiService from '@/core/services/api.service';

import DropdownExport from '@/view/layout/extras/dropdown/DropdownExport';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
/* eslint-disable max-len */
import helpers from '../../core/services/helpers.vue';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

Vue.use(pmd, { store }); // register pmd vuex module
const slug = require('slug');

export default {
  name: 'Dictionary',
  mixins: [helpers],
  components: { DropdownExport, vueDropzone: vue2Dropzone },
  data() {
    return {
      expanded: [],
      filter: { title: '' },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalBlogs: 0,
      blogs: [],
      loading: true,
      page: 1,
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'BLOG BAŞLIK',
          align: 'start',
          sortable: true,
          value: 'title',
        },
        { text: 'Yazar', value: 'author', align: 'left' },
        {
          text: 'OLUŞTURMA',
          align: 'center',
          sortable: true,
          value: 'createdAt',
        },
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
        title: '',
        image: '',
        body: '',
        slug: '',
        author: '',
        isActive: false,
      },
      defaultItem: {
        title: '',
        image: '',
        body: '',
        slug: '',
        author: '',
        isActive: false,
      },
    };
  },
  watch: {
    filter: {
      handler(newval) {
        console.log('filter', newval);
        if (newval) {
          if (newval.title) {
            this.options = {
              searchTerm: newval.title,
              searchField: 'title',
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
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Bloglar' }]);
    this.getDataFromApi();
  },

  methods: {
    slugIt(title) {
      this.editedItem.slug = slug(title, { locale: 'tr' });
    },
    renderMD(content) {
      return pmd.markdownIt.render(content);
    },
    fileUploaded(file, response) {
      console.log('FILE UPLOAD SONUC:', file, response);
      if (response && response.length && response[0].url) {
        this.editedItem.image = response[0].url;
      }
    },
    fileDeleted() {
      this.editedItem.image = '';
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
      this.editedIndex = this.blogs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.blogs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.blogs.splice(this.editedIndex, 1);
      this.deleteData('blog', this.editedItem.slug);
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
        title: this.editedItem.title,
        image: this.editedItem.image,
        body: this.editedItem.body,
        slug: this.editedItem.slug,
        author: this.editedItem.author,
        isActive: this.editedItem.isActive,
      };
      payload = this.removeEmpty(payload);
      if (this.editedIndex > -1) {
        Object.assign(
          this.blogs[this.editedIndex],
          this.editedItem,
        );
        this.updateData('blog', this.editedItem.slug, payload).then(() => this.getDataFromApi());
      } else {
        this.blogs.push(this.editedItem);
        this.saveData('blog', payload).then(() => this.getDataFromApi());
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
        ApiService.get('blog', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.blogs = data.data;
              this.totalBlogs = data.meta.total;
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
