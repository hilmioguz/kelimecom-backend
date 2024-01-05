
<script>
import { mapGetters } from 'vuex';
import Swal from 'sweetalert2';
import { format, parseISO } from 'date-fns';
import turkish from 'date-fns/locale/tr';
import ApiService from '@/core/services/api.service';
import JwtService from '@/core/services/jwt.service';

import {
  dilListesi, turListesi, tipListesi, roleList, statusList, altturListesi, kokenListesi, cinsiyetListesi, bicimListesi, sinifListesi, transkripsiyonListesi, fonetikListesi, heceliyazimListesi, zitanlamListesi, esanlamListesi, telaffuzListesi,
} from '@/core/config/defaults';

export default {
  data() {
    return {
      dilListesi,
      turListesi,
      tipListesi,
      roleList,
      altturListesi,
      kokenListesi,
      cinsiyetListesi,
      bicimListesi,
      sinifListesi,
      transkripsiyonListesi,
      fonetikListesi,
      heceliyazimListesi,
      zitanlamListesi,
      esanlamListesi,
      telaffuzListesi,
      statusList,
      maddeStats: [],
      gundemStats: [],
      kurumStats: [],
      totalMaddeCount: [],
      totalGundemCount: [],
      editedIndex: -1,
      userStats: [],
      options: {
        sortBy: ['createdAt'],
        sortDesc: [true],
      },
      koptions: {
        page: 1,
        itemsPerPage: -1,
      },
      dictionaries: [],
      kuluckadictionaries: [],
      packetsAll: [],
      kurumlarAll: [],
      uploadOptions: {
        url: `${process.env.VUE_APP_APIEND_BASE_URL}/fileupload`,
        acceptedFiles: 'image/*',
        thumbnailWidth: 150,
        addRemoveLinks: true,
        headers: { Authorization: `Bearer ${JwtService.getToken().access.token}` },
        maxFilesize: 10,
      },
      excellUploadOptions: {
        url: `${process.env.VUE_APP_APIEND_BASE_URL}/excel/upload`,
        acceptedFiles: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        addRemoveLinks: true,
        headers: { Authorization: `Bearer ${JwtService.getToken().access.token}` },
        maxFilesize: 500,
      },
    };
  },
  computed: {
    ...mapGetters(['currentUser']),
    dilsecimListesi() {
      let liste = [];
      if (this.dilListesi.length) {
        liste = [...this.dilListesi];
        liste.unshift({
          text: 'Tümü',
          value: '',
        });
      }
      return liste;
    },
    totalUsersStat() {
      return this.userStats.reduce((acc, user) => acc + user.count, 0);
    },
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
    dictListFilter() {
      if (this.dictionaries.length === 0) {
        this.getDictsFromApi();
      }
      const a = this.dictionaries.map(
        (dict => ({
          text: dict.name,
          value: dict.id,
        })),
      );
      a.unshift({
        text: 'Tümü',
        value: '',
      });
      return a;
    },
    dictList() {
      if (this.dictionaries.length === 0) {
        this.getDictsFromApi();
      }
      const a = this.dictionaries.map(
        (dict => ({
          text: dict.name,
          value: dict.id,
        })),
      );
      return a;
    },
    kuluckaDictList() {
      if (this.kuluckadictionaries.length === 0) {
        this.getKuluckaDictsFromApi();
      }
      const a = this.kuluckadictionaries.map(
        (dict => ({
          text: dict.name,
          value: dict.id,
        })),
      );
      return a;
    },
    packetListAll() {
      if (this.packetsAll.length === 0) {
        this.getPacketsFromApi();
      }
      const a = this.packetsAll.map(
        (packet => ({
          text: packet.name,
          value: packet.id,
        })),
      );
      a.unshift({
        text: 'Tümü',
        value: '',
      });
      a.filter(a => !a.text.includes('ziyaret'));
      return a;
    },
    kurumlarListAll() {
      if (this.kurumlarAll.length === 0) {
        this.getKurumlarFromApi();
      }
      const a = this.kurumlarAll.map(
        (kurum => ({
          text: kurum.institution_name,
          value: kurum.id,
        })),
      );
      a.unshift({
        text: 'Tümü',
        value: '',
      });
      return a;
    },
    formTitle() {
      return this.editedIndex === -1 ? 'Yeni Kayıt' : 'Kayıt Düzenleme';
    },
    formSubTitle() {
      return this.editedSubIndex === -1 ? 'Yeni Kayıt' : 'Kayıt Düzenleme';
    },
    backgroundImage() {
      return `${process.env.BASE_URL}media/misc/bg-1.jpg`;
    },
  },
  created() {
    this.getUsersStatsFromApi();
    this.getMaddeStatsFromApi();
  },
  methods: {
    async uploadFn(payload) {
      console.log('Payload file:', payload);
      const formData = new FormData();
      formData.append('file', payload);
      const ret = await this.updloadFile(formData); // the payload has the file(File) param from pmd
      return {
        upload: true, // required
        url: ret[0].url,
      };
    },
    dateFormating(input) {
      if (!input) return null;
      return format(parseISO(input), 'dd MMMM yyyy, EEEE', { locale: turkish });
    },
    dateFormatShort(input) {
      if (!input) return null;
      return format(parseISO(input), 'dd-MM-yyyy HH:mm', { locale: turkish });
    },
    removeEmpty(obj) {
      return Object.fromEntries(
        Object.entries(obj)
          // eslint-disable-next-line no-unused-vars
          .filter(([_, v]) => (v != null && v !== ''))
          .map(([k, v]) => [k, v === Object(v) ? this.removeEmpty(v) : v]),
      );
    },
    // async urlToBlob(url, name = '') {
    //   const timestamp = new Date().getTime();
    //   const xblob = await fetch(`${url}`).then(r => r.blob());
    //   return new File([xblob], name || `image-${timestamp}.jpg`);
    // },
    stringify(input) {
      const params = new URLSearchParams();

      for (const key in input) {
        if (Array.isArray(input[key])) {
          input[key].forEach((val) => {
            params.append(`${key}[]`, val);
          });
        } else {
          params.append(key, input[key]);
        }
      }
      return `?${params.toString()}`;
    },
    getDictsFromApi() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('dictionary', this.stringify(this.koptions))
          .then(({ data }) => {
            if (data) {
              this.dictionaries = data.data;
            }
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    getKuluckaDictsFromApi() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('kuluckadictionary', this.stringify(this.koptions))
          .then(({ data }) => {
            if (data) {
              this.kuluckadictionaries = data.data;
            }
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    getPacketsFromApi() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('packet', this.stringify(this.koptions))
          .then(({ data }) => {
            if (data) {
              this.packetsAll = data.data;
            }
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    getKurumlarFromApi() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('kurumlar', this.stringify(this.koptions))
          .then(({ data }) => {
            if (data) {
              this.kurumlarAll = data.data;
            }
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    getUsersStatsFromApi() {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('getstats/allstats')
          .then(({ data }) => {
            if (data) {
              this.userStats = data.userstat;
              this.gundemStats = data.gundemstat;
              this.kurumStats = data.kurumstat.sort((a, b) => a.aktif - b.aktif);
              this.totalMaddeCount = data.totalMaddestat;
              this.totalGundemCount = data.totalGundemstat;
            }
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    getMaddeStatsFromApi(dil = null) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        const payload = dil ? `?lang=${dil}` : '';
        ApiService.get('getstats', payload)
          .then(({ data }) => {
            if (data) {
              this.maddeStats = data;
            }
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    updloadFile(payload) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.post('fileupload', payload)
          .then(({ data }) => {
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },

    saveData(resource, payload) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.post(resource, payload)
          .then(({ data }) => {
            this.successMessage();
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    flattenMaddeData(hamarray) {
      const newa = [];
      hamarray.forEach((h) => {
        h.whichDict.forEach((w) => {
          const a = {};
          a.madde = h.madde;
          a.anlam = w.anlam;
          a.sozluk = w.dictId.name;
          a.tip = w.tip;
          a.tur = w.tur;
          a.alttur = w.alttur;
          a.koken = w.koken;
          a.cinsiyet = w.cinsiyet;
          a.bicim = w.bicim;
          a.sinif = w.sinif;
          a.transkripsiyon = w.transkripsiyon;
          a.fonetik = w.fonetik;
          a.heceliyazim = w.heceliyazim;
          a.zitanlam = w.zitanlam;
          a.esanlam = w.esanlam;
          a.telaffuz = w.telaffuz;
          if (w.userSubmitted) a.userSubmitted = w.userSubmitted.name;
          newa.push(a);
        });
      });
      return newa;
    },
    updateData(resource, id, payload) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.patch(resource, id, payload, { headers: { 'Content-Type': 'application/json' } })
          .then(({ data }) => {
            this.successMessage();
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },

    deleteData(resource, id) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.delete(resource, id)
          .then(({ data }) => {
            this.successMessage();
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    deleteSubData(resource, maddeId, anlamId) {
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.deleteSub(resource, maddeId, anlamId)
          .then(({ data }) => {
            this.successMessage();
            resolve(data);
          })
          .catch((error) => {
            this.errorMessage(error);
            reject(error);
          });
      });
    },
    errorMessage(msg) {
      Swal.fire({
        title: 'Hoppalaa!',
        text: msg,
        icon: 'error',
        showConfirmButton: false,
        timer: 4000,
      });
    },
    successMessage(msg = null) {
      Swal.fire({
        text: msg || 'Ok! İşlem başarılı.',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
    },
    warningMessage(msg) {
      Swal.fire({
        title: 'Uyarı!',
        text: msg,
        icon: 'warning',
      });
    },
    confirmMessage(msg, callback) {
      Swal.fire({
        title: 'Emin misiniz?',
        text: `${msg}. Yaptiğınız işlem geri alınamaz!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eminim işleme devam et!',
      }).then((result) => {
        if (result.isConfirmed) {
          callback();
        }
      });
    },
  },
};
</script>
