<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Toplu Kullanıcı Oluşturma
            <span
              class="d-block text-muted pt-2 font-size-sm"
            >Excel dosyasından kullanıcı oluşturma</span>
          </h3>
        </div>
      </div>
      <div class="card-body">
        <!--begin: Search Form-->
        <div class="w-100">
          <div class="row justify-content-center">
            <div class="col-5">
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <div class="row justify-content-center">
                  <div class="col-12">
                    <v-file-input
                      label="Excel Dosyasını yükleyiniz"
                      outlined
                      @change="onFileChange"
                      dense
                    />
                  </div>
                  <div class="col-12">
                    <div class="row align-items-start">
                      <div class="col-auto my-2 my-md-0">
                        <v-select
                          v-model="role"
                          :return-object="false"
                          :items="rolesecimListesi"
                          :rules="[v => !!v || 'role zorunlu']"
                          label="Rol"
                        />
                      </div>
                      <div class="col-auto my-2 my-md-0">
                        <v-select
                          v-model="packetId"
                          :return-object="false"
                          :items="packetListAll"
                          :rules="[v => !!v || 'packetid is zorunlu']"
                          label="Paket Tipi"
                        />
                      </div>
                      <div class="col-auto my-2 my-md-0">
                        <v-select
                          v-model="kurumId"
                          :return-object="false"
                          :items="kurumlarListAll"
                          :rules="[v => !!v || 'kurumid zorunlu']"
                          label="Kurum Adı"
                        />
                      </div>
                      <div class="col-12">
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
                              :rules="[v => !!v || 'paket başlangıç zorunlu']"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="paketBegin"
                            no-title
                            locale="tr-TR"
                            @input="menu1 = false"
                          />
                        </v-menu>
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
                              :rules="[v => !!v || 'packet bitiş zorunlu']"
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="paketEnd"
                            no-title
                            locale="tr-TR"
                            @input="menu2 = false"
                          />
                        </v-menu>
                      </div>
                      <div class="col-12 my-2 my-md-0">
                        <v-text-field
                          v-model="password"
                          label="Yeni Şifre"
                          :rules="passwordRules"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <v-btn
                  color="primary"
                  @click="submitForm"
                >
                  Submit
                </v-btn>
              </v-form>
            </div>
            <div class="col-7">
              <!--begin: Datatable-->
              <h3 class="card-label">
                Ön izleme listesi
              </h3>
              <v-data-table
                :headers="headers"
                :items="users"
                :items-per-page="10"
                class="elevation-0"
              >
                <!-- eslint-disable vue/valid-v-slot -->

                <template #item.name="{ item }">
                  <span v-html="`<strong>${item.name}</strong>`" />
                </template>
                <template #item.email="{ item }">
                  <span v-html="`${item.email}`" />
                </template>
              </v-data-table>
              <!--end: Datatable-->
            </div>
          </div>
        </div>

        <!--begin::Search Form-->

        <!--end::Search Form-->
        <!--end: Search Form-->
      </div>
    </div>
    <!--end::Card-->
  </div>
</template>

<script>
import readXlsxFile from 'read-excel-file';
import ApiService from '@/core/services/api.service';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
import {
  roleList,
} from '@/core/config/defaults';
import helpers from '../../core/services/helpers.vue';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
/* eslint-disable max-len */

export default {
  name: 'MassUsersUploader',
  mixins: [helpers],
  data() {
    return {
      totalUsers: 0,
      packetList: [],
      kurumList: [],
      users: [],
      role: '',
      packetId: '',
      kurumId: '',
      menu1: false,
      valid: false,
      menu2: false,
      paketBegin: null,
      paketEnd: null,
      password: '',
      passwordRules: [
        value => !!value || 'Şifre giriniz.',
        value => (value && value.length >= 6 && (value.match(/\d/ig) && value.match(/[a-z]/g) && value.match(/[A-Z]/g))) || 'minimum 6 karekter, bir rakam ve bir buyuk harf içermelidir',
      ],
      roleList,
      headers: [
        {
          text: 'AD SOYAD',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'EPOSTA', value: 'email', align: 'center' },
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
    computedBeginDate() {
      return this.dateFormating(this.paketBegin);
    },
    computedEndDate() {
      return this.dateFormating(this.paketEnd);
    },
  },
  watch: {

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
  },
  methods: {
    onFileChange(file) {
      readXlsxFile(file).then((rows) => {
        console.log('rows:', rows);
        this.users = rows.map(row => ({ name: row[0], email: row[1] }));
        this.totalUsers = rows.length;
      });
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
    submitForm() {
      const valid = this.$refs.form.validate();
      if (valid) {
        const payload = {
          role: this.role,
          password: this.password,
          paketId: this.packetId,
          kurumId: this.kurumId,
          paketBegin: this.paketBegin,
          paketEnd: this.paketEnd,
          users: this.users,
        };
        ApiService.setHeader();
        ApiService.post('users/toplukullanici', payload)
          .then(() => {
            this.successMessage();
            window.location.reload();
          })
          .catch(({ message }) => {
            this.errorMessage(message);
          });
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
