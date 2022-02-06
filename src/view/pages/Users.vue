<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Kullanıcı Listesi
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
                :json-data="users"
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
          :items="users"
          :options.sync="options"
          :server-items-length="totalUsers"
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
                  <div class="col-auto">
                    <div class="row align-items-start">
                      <div class="col-auto my-2 my-md-0">
                        <v-text-field
                          v-model="filter.name"
                          append-icon="mdi-magnify"
                          label="Arama"
                          single-line
                          hide-details
                        />
                      </div>
                      <div class="col-auto my-2 my-md-0">
                        <v-radio-group
                          v-model="aramaYeri"
                        >
                          <v-radio
                            label="İsim"
                            color="primary"
                            value="name"
                          />
                          <v-radio
                            label="E-posta"
                            color="primary"
                            value="email"
                          />
                        </v-radio-group>
                      </div>
                      <div class="col-auto my-2 my-md-0">
                        <v-select
                          v-model="filter.role"
                          :return-object="false"
                          :items="rolesecimListesi"
                          label="Rol"
                        />
                      </div>
                      <div class="col-auto my-2 my-md-0">
                        <v-select
                          v-model="filter.packetId"
                          :return-object="false"
                          :items="packetListAll"
                          label="Paket Tipi"
                        />
                      </div>
                      <div class="col-auto my-2 my-md-0">
                        <v-select
                          v-model="filter.kurumId"
                          :return-object="false"
                          :items="kurumlarListAll"
                          label="Kurum Adı"
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
                            label="Adı Soyadı"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.password
                            "
                            label="Yeni Şifre"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="
                              editedItem.email
                            "
                            label="E-Posta"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="
                              editedItem.role
                            "
                            :return-object="false"
                            :items="roleList"
                            label="Kullanıcı Tipi"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="editedItem.packetId.id"
                            :return-object="false"
                            :items="packetList"
                            label="Paket Tipi"
                          />
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="editedItem.kurumId.id"
                            :return-object="false"
                            :items="kurumList"
                            label="Kurumu"
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
                                label="Paket Başlangıç"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.paketBegin"
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
                                label="Paket Bitiş"
                                persistent-hint
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              />
                            </template>
                            <v-date-picker
                              v-model="editedItem.paketEnd"
                              no-title
                              locale="tr-TR"
                              @input="menu2 = false"
                            />
                          </v-menu>
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
                          <v-switch
                            v-model="
                              editedItem.isEmailVerified
                            "
                            :label="
                              editedItem.isEmailVerified
                                ? 'Onaylı'
                                : 'Onay bekliyor'
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
                                v-if="editedItem.picture"
                              >
                                <img
                                  data-dz-thumbnail=""
                                  alt="profile picture"
                                  width="100"
                                  height="auto"
                                  :src="editedItem.picture"
                                >
                              </div>
                              <h5 class="ma-2 dropzone-custom-title">
                                Profil Resmi - Sürükle Bırak ya da tıklayın
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
                :items="getPacketDetails(item)"
                :fields="detayFields"
              />
            </td>
          </template>
          <template #item.name="{ item }">
            <span v-html="`<strong>${item.name}</strong>`" />
          </template>
          <template #item.email="{ item }">
            <span v-html="`${item.email}`" />
          </template>
          <template #item.role="{ item }">
            <span v-html="`${getRole(item.role)}`" />
          </template>
          <template #item.packetId="{ item }">
            <span v-html="`${getPacket(item.packetId)}`" />
          </template>
          <template #item.isEmailVerified="{ item }">
            <span v-html="`${getEmailVerified(item.isEmailVerified)}`" />
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
import turkish from 'date-fns/locale/tr';
import vue2Dropzone from 'vue2-dropzone';
import ApiService from '@/core/services/api.service';
import DropdownExport from '@/view/layout/extras/dropdown/DropdownExport';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
import {
  roleList,
} from '@/core/config/defaults';
import helpers from '../../core/services/helpers.vue';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
/* eslint-disable max-len */

export default {
  name: 'Users',
  mixins: [helpers],
  components: { DropdownExport, vueDropzone: vue2Dropzone },
  data() {
    return {
      expanded: [],
      filter: { name: '', lang: null },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      totalUsers: 0,
      packetList: [],
      kurumList: [],
      users: [],
      aramaYeri: 'name',
      roleList,
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
          text: 'AD SOYAD',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'EPOSTA', value: 'email', align: 'center' },
        { text: 'ROL', value: 'role', align: 'center' },
        { text: 'PAKET', value: 'packetId', align: 'center' },
        { text: 'ONAYLI', value: 'isEmailVerified', align: 'center' },
        { text: 'AKTİF', value: 'isActive', align: 'center' },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedItem: {
        name: '',
        email: '',
        role: '',
        isEmailVerified: '',
        picture: '',
        packetId: { id: '' },
        kurumId: { id: '' },
        googleId: '',
        paketBegin: '',
        paketEnd: '',
        isActive: false,
        password: null,
      },
      defaultItem: {
        name: '',
        email: '',
        role: '',
        isEmailVerified: '',
        picture: '',
        packetId: { id: '' },
        kurumId: { id: '' },
        googleId: '',
        paketBegin: '',
        paketEnd: '',
        password: null,
        isActive: false,
      },
      detayFields: [
        {
          key: 'packet',
          label: 'Paketi:',
        },
        { key: 'kurum', label: 'Kurumu:' },
        { key: 'packetbegin', label: 'Paket Başlangıç:', formatter: value => (value ? format(parseISO(value), 'dd MMMM yyyy', { locale: turkish }) : '') },
        { key: 'packetend', label: 'Paket Sonu:', formatter: value => (value ? format(parseISO(value), 'dd MMMM yyyy', { locale: turkish }) : '') },
      ],
    };
  },
  computed: {
    rolesecimListesi() {
      let liste = [];
      if (this.roleList.length) {
        liste = this.roleList;
        liste.unshift({
          text: 'Tümü',
          value: '',
        });
      }
      return liste;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Yeni Kayıt' : 'Kayıt Düzenleme';
    },
    backgroundImage() {
      return `${process.env.BASE_URL}media/misc/bg-1.jpg`;
    },
    computedBeginDate() {
      return this.dateFormating(this.editedItem.paketBegin);
    },
    computedEndDate() {
      return this.dateFormating(this.editedItem.paketEnd);
    },
  },
  watch: {
    filter: {
      handler(newval) {
        console.log('filter', newval);
        if (newval) {
          if (newval.name) {
            this.options = {
              searchTerm: newval.name,
              searchField: this.aramaYeri,
            };
          } else if (newval.role != null) {
            this.options = {
              searchTerm: newval.role,
              searchField: 'role',
            };
          } else if (newval.packetId != null) {
            this.options = {
              searchTerm: newval.packetId,
              searchField: 'packetId',
            };
          } else if (newval.kurumId != null) {
            this.options = {
              searchTerm: newval.kurumId,
              searchField: 'kurumId',
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
    // eslint-disable-next-line no-undef
    this.loadPaketler().then((response) => {
      this.packetList = response.map(
        (paket => ({
          text: paket.name,
          value: paket.id,
        })),
      );
    });

    this.loadKurumlar().then((response) => {
      this.kurumList = response.map((kurum => ({
        text: kurum.institution_name,
        value: kurum.id,
      })));
    });
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Kullanıcılar' }]);
    this.getDataFromApi();
  },
  methods: {
    fileUploaded(file, response) {
      console.log('FILE UPLOAD SONUC:', file, response);
      if (response && response.length && response[0].url) {
        this.editedItem.picture = response[0].url;
      }
    },
    fileDeleted(file, response) {
      console.log('FILE deleted SONUC:', file, response);
      this.editedItem.picture = '';
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

    loadPaketler() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('packet', this.stringify(this.koptions))
          .then(({ data }) => {
            resolve(data.data);
          })
          .catch(({ message }) => {
            reject(message);
          });
      });
    },
    loadKurumlar() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('kurumlar', this.stringify(this.koptions))
          .then(({ data }) => {
            resolve(data.data);
          })
          .catch(({ message }) => {
            reject(message);
          });
      });
    },
    getRole(role) {
      if (typeof role !== 'undefined') {
        const roletemplate = {
          user: { class: 'label-light-primary' },
          admin: { class: ' label-light-danger' },
          modarater: { class: ' label-light-info' },
          '': { class: ' label-light-info' },
        };

        return (
          `<span class="label ${
            roletemplate[role].class
          } label-inline font-weight-bold label-lg">${
            role
          }</span>`
        );
      }
    },
    getEmailVerified(isEmailVerified) {
      if (typeof isEmailVerified !== 'undefined') {
        return isEmailVerified
          ? '<i class="la la-check"></i>'
          : '<i class="la la-times"></i>';
      }
    },
    getPacket(packetId) {
      if (packetId && typeof packetId.name !== 'undefined') {
        const langtemplate = {
          'Standart Paket': { class: 'label-light-primary' },
          'Kurumsal Paket': { class: ' label-light-danger' },
          'Ziyaretci Paketi': { class: ' label-light-info' },
          'Bireysel Temel Paket': { class: ' label-light-blue' },
          'Bireysel Profesyonel Paket': { class: ' label-light-green' },
          'Bireysel Premium Paket': { class: ' label-light-warning' },
          '': { class: ' label-light-info' },
        };
        return (
          `<span class="label ${
            langtemplate[packetId.name].class
          } label-inline font-weight-bold label-lg">${
            packetId.name
          }</span>`
        );
      }
    },
    getPacketDetails(item) {
      return [
        {
          packet: item.packetId ? item.packetId.name : '',
          kurum: item.kurumId ? item.kurumId.institution_name : '',
          packetbegin: item.paketBegin,
          packetend: item.paketEnd,
        },
      ];
    },
    async editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      if (item.kurumId && item.kurumId.id) {
        this.editedItem = Object.assign({}, item);
      } else {
        item.kurumId = { id: ' ' };
        this.editedItem = Object.assign({}, item);
      }
      //   if (this.editedItem.picture) {
      //     const file = await this.urlToBlob(this.editedItem.picture);
      //     this.$refs.profilePic.manuallyAddFile(file, this.editedItem.picture);
      //   }
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.users.indexOf(item);
      if (item.kurumId && item.kurumId.id) {
        this.editedItem = Object.assign({}, item);
      } else {
        item.kurumId = { id: ' ' };
        this.editedItem = Object.assign({}, item);
      }
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.users.splice(this.editedIndex, 1);
      this.deleteData('users', this.editedItem.id);
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
      const payload = {
        name: this.editedItem.name,
        email: this.editedItem.email,
        role: this.editedItem.role,
        isEmailVerified: this.editedItem.isEmailVerified,
        packetId: this.editedItem.packetId.id,
        kurumId: this.editedItem.kurumId.id,
        paketBegin: this.editedItem.paketBegin,
        paketEnd: this.editedItem.paketEnd,
        isActive: this.editedItem.isActive,
      };
      if (this.editedItem.password) {
        payload.password = this.editedItem.password;
      }
      if (this.editedItem.picture !== '' && this.editedItem.picture != null) {
        payload.picture = this.editedItem.picture;
      }
      if (this.editedIndex > -1) {
        Object.assign(
          this.users[this.editedIndex],
          this.editedItem,
        );
        this.updateData('users', this.editedItem.id, payload);
      } else {
        this.users.push(this.editedItem);
        this.saveData('users', payload);
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
        ApiService.get('users', this.stringify(this.options))
          .then(({ data }) => {
            console.log('Data:', data);
            if (data) {
              this.users = data.data;
              this.totalUsers = data.meta.total;
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
    width: 25%;
}
</style>
