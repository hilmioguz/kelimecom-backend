<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Sözlük Listesi
            <span class="d-block text-muted pt-2 font-size-sm"
              >Her satırda detayları görebilirsiniz.</span
            >
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
            <template v-slot:button-content>
              <i class="la la-download"></i>
              Export
            </template>
            <b-dropdown-text tag="div" class="min-w-md-175px">
              <DropdownExport
                v-on:veri="
                  {
                  }
                "
              ></DropdownExport>
            </b-dropdown-text>
          </b-dropdown>
          <!--end::Dropdown-->
          <!--begin::Button-->
          <a href="#" class="btn btn-primary btn-sm font-weight-bolder">
            <i class="la la-plus"></i>Yeni Kayıt</a
          >
          <!--end::Button-->
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
          class="elevation-0"
        >
          <!-- eslint-disable vue/valid-v-slot -->
          <template v-slot:top>
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
                        ></v-text-field>
                      </div>
                      <div class="col-md-4 my-2 my-md-0">
                        <v-select
                          v-model="filter.lang"
                          :return-object="false"
                          :items="[
                            { text: 'Tümü', value: '' },
                            { text: 'Türkçe', value: 'tr' },
                            { text: 'Osmanlıca', value: 'os' },
                            { text: 'Arapça', value: 'ar' },
                            { text: 'İngilizce', value: 'en' }
                          ]"
                          label="Dil"
                        ></v-select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    class="mb-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon small class="mr-2" @click="editItem(item)">
                      mdi-plus
                    </v-icon>
                    Yeni Kayıt
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.name"
                            label="Sözluk Adı"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.shortDesc"
                            label="Kısa Açıklama"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                          <v-textarea
                            v-model="editedItem.desc"
                            label="Açıklama"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="editedItem.code"
                            label="Kodu"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="editedItem.lang"
                            :return-object="false"
                            :items="[
                              { text: 'Türkçe', value: 'tr' },
                              { text: 'İngilizce', value: 'en' }
                            ]"
                            label="Dil"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-switch
                            v-model="editedItem.isBidirectional"
                            :label="
                              editedItem.isBidirectional
                                ? 'Çift Yönlü'
                                : 'Tek Yönlü'
                            "
                          ></v-switch>
                        </v-col>
                        <v-col cols="6">
                          <v-switch
                            v-model="editedItem.isActive"
                            :label="editedItem.isActive ? 'Aktif' : 'Pasif'"
                          ></v-switch>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      İptal
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                      Kaydet
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="text-h5"
                    >Silmek istediğinizden emin misiniz?</v-card-title
                  >
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete"
                      >İptal</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                      >Tamam</v-btn
                    >
                    <v-spacer></v-spacer>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              {{ item.desc }}
            </td>
          </template>
          <template v-slot:item.name="{ item }">
            <span v-html="`<strong>${item.name}</strong>`"></span>
          </template>
          <template v-slot:item.lang="{ item }">
            <span v-html="`${getLang(item.lang)}`"></span>
          </template>
          <template v-slot:item.isBidirectional="{ item }">
            <span v-html="`${getBiDirectional(item.isBidirectional)}`"></span>
          </template>
          <template v-slot:item.isActive="{ item }">
            <span v-html="`${getActive(item.isActive)}`"></span>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
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
// import { APIEND_DICTIONARY } from "@/core/config/apiends";
import ApiService from "@/core/services/api.service";
// import JwtService from "@/core/services/jwt.service";
import DropdownExport from "@/view/layout/extras/dropdown/DropdownExport";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

/* eslint-disable max-len */

export default {
  name: "Dictionary",
  data() {
    return {
      expanded: [],
      filter: { name: "", lang: null },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalDicts: 0,
      dictionaries: [],
      loading: true,
      options: {},
      page: 1,
      headers: [
        {
          text: "İSİM",
          align: "start",
          sortable: true,
          value: "name"
        },
        { text: "AÇIKLAMA", value: "shortDesc" },
        { text: "KOD", value: "code", align: "center" },
        { text: "DİL", value: "lang", align: "center" },
        { text: "İKİ YÖNLÜ", value: "isBidirectional", align: "center" },
        { text: "AKTİF", value: "isActive", align: "center" },
        { text: "İŞLEMLER", value: "actions", sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        name: "",
        shortDesc: "",
        desc: "",
        code: "",
        lang: "",
        isBidirectional: false,
        isActive: false
      },
      defaultItem: {
        name: "",
        shortDesc: "",
        desc: "",
        code: "",
        lang: "",
        isBidirectional: false,
        isActive: false
      }
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Yeni Kayıt" : "Kayıt Düzenleme";
    }
  },
  watch: {
    filter: {
      handler(newval) {
        console.log("filter", newval);
        if (newval) {
          if (newval.name) {
            this.options = { searchTerm: newval.name, searchField: "name" };
          } else if (newval.lang !== null) {
            this.options = { searchTerm: newval.lang, searchField: "lang" };
          }
        }
      },
      deep: true
    },
    options: {
      handler(newval) {
        console.log("Options:", newval);
        // cancel pending call
        clearTimeout(this._timerId);
        // delay new call 500ms
        this.timerId = setTimeout(() => {
          this.getDataFromApi();
        }, 500);
      },
      deep: true
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    }
  },
  created() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Sözlükler" }]);
    // this.dictionaryDatatable();
    this.getDataFromApi();
  },
  components: { DropdownExport },

  methods: {
    stringify(input) {
      const params = new URLSearchParams();

      for (const key in input) {
        if (Array.isArray(input[key])) {
          input[key].forEach(val => {
            params.append(key + "[]", val);
          });
        } else {
          params.append(key, input[key]);
        }
      }
      return "?" + params.toString();
    },

    getLang(lang) {
      if (typeof lang !== "undefined") {
        var langtemplate = {
          tr: { class: "label-light-primary" },
          en: { class: " label-light-danger" },
          ar: { class: " label-light-info" },
          os: { class: " label-light-success" },
          "": { class: " label-light-info" }
        };
        return (
          '<span class="label ' +
          langtemplate[lang].class +
          ' label-inline font-weight-bold label-lg">' +
          lang +
          "</span>"
        );
      }
    },

    getActive(isActive) {
      if (typeof isActive !== "undefined") {
        var status = {
          false: {
            title: "Pasif",
            state: "danger"
          },
          true: {
            title: "Aktif",
            state: "success"
          }
        };
        return (
          '<span class="label label-' +
          status[isActive].state +
          ' label-dot mr-2"></span><span class="font-weight-bold text-' +
          status[isActive].state +
          '">' +
          status[isActive].title +
          "</span>"
        );
      }
    },

    getBiDirectional(isBidirectional) {
      if (typeof isBidirectional !== "undefined") {
        return isBidirectional
          ? '<i class="la la-exchange-alt"></i>'
          : '<i class="la la-arrow-right"></i>';
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
      if (this.editedIndex > -1) {
        Object.assign(this.dictionaries[this.editedIndex], this.editedItem);
      } else {
        this.dictionaries.push(this.editedItem);
      }
      this.close();
    },

    getDataFromApi() {
      this.loading = true;
      console.log("this.options:", this.options);
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get("dictionary", this.stringify(this.options))
          .then(({ data }) => {
            console.log("Data:", data);
            if (data) {
              this.dictionaries = data.data;
              this.totalDicts = data.meta.total;
            }
            this.loading = false;
            resolve(data);
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
            this.loading = false;
            reject(response.data.errors);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep td.datatable-subtable {
  background-color: #f3efef;
  table.datatable-table {
    background-color: #f3efef;
  }
}
</style>
