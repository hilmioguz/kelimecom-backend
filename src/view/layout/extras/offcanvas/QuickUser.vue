<template>
  <div class="topbar-item">
    <div
      id="kt_quick_user_toggle"
      class="btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
    >
      <span
        class="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1"
      >
        Merhaba,
      </span>
      <span
        class="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4"
      >
        {{
          currentUser && currentUser.name
            ? currentUser.name.split(' ')[0]
            : ''
        }}
      </span>
      <span class="symbol symbol-35">
        <span
          class="symbol-label text-white font-size-h5 font-weight-bold bg-white-o-30"
        >
          {{
            currentUser && currentUser.name
              ? currentUser.name[0]
              : ''
          }}
        </span>
      </span>
    </div>

    <div
      id="kt_quick_user"
      ref="kt_quick_user"
      class="offcanvas offcanvas-right p-10"
    >
      <!--begin::Header-->
      <div
        class="offcanvas-header d-flex align-items-center justify-content-between pb-5"
      >
        <h3 class="font-weight-bold m-0">
          Kullanıcı Profili
          <!-- <small class="text-muted font-size-sm ml-2">5 mesaj</small> -->
        </h3>
        <a
          id="kt_quick_user_close"
          href="#"
          class="btn btn-xs btn-icon btn-light btn-hover-primary"
        >
          <i class="ki ki-close icon-xs text-muted" />
        </a>
      </div>
      <!--end::Header-->

      <!--begin::Content-->
      <perfect-scrollbar
        class="offcanvas-content pr-5 mr-n5 scroll"
        style="max-height: 90vh; position: relative;"
      >
        <!--begin::Header-->
        <div class="d-flex align-items-center mt-5">
          <div class="symbol symbol-100 mr-5">
            <img
              class="symbol-label"
              :src="currentUser && currentUser.picture ? currentUser.picture : '/media/users/default.jpg'"
              alt=""
            >
            <i class="symbol-badge bg-success" />
          </div>
          <div class="d-flex flex-column">
            <a
              href="#"
              class="font-weight-bold font-size-h5 text-dark-75 text-hover-primary"
            >
              {{
                currentUser && currentUser.name
                  ? currentUser.name
                  : ''
              }}
            </a>
            <div class="text-muted mt-1">
              {{
                currentUser && currentUser.kurumId
                  ? currentUser.kurumId.institution_name
                  : ''
              }}
            </div>
            <div class="text-muted mt-1">
              {{
                currentUser && currentUser.packetId
                  ? currentUser.packetId.name
                  : ''
              }}
            </div>
            <div class="navi mt-2">
              <a
                href="#"
                class="navi-item"
              >
                <span class="navi-link p-0 pb-2">
                  <span class="navi-icon mr-1">
                    <span
                      class="svg-icon svg-icon-lg svg-icon-primary"
                    >
                      <!--begin::Svg Icon-->
                      <inline-svg
                        src="media/svg/icons/Communication/Mail-notification.svg"
                      />
                      <!--end::Svg Icon-->
                    </span>
                  </span>
                  <span
                    class="navi-text text-muted text-hover-primary"
                  >
                    {{
                      currentUser && currentUser.email
                        ? currentUser.email
                        : ''
                    }}
                  </span>
                </span>
              </a>
            </div>
            <button
              class="btn btn-light-primary btn-bold"
              @click="onLogout"
            >
              {{ $t('AUTH.GENERAL.SIGNOUT_BUTTON') }}
            </button>
          </div>
        </div>
        <!--end::Header-->
        <div class="separator separator-dashed mt-8 mb-5" />
        <!--begin::Nav-->
        <div class="navi navi-spacer-x-0 p-0">
          <!--begin::Item-->
          <router-link
            to="/builder"
            href="#"
            class="navi-item"
            @click.native="closeOffcanvas"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span
                    class="svg-icon svg-icon-md svg-icon-success"
                  >
                    <!--begin::Svg Icon-->
                    <inline-svg
                      src="media/svg/icons/General/Notification2.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">
                  {{ $t('AUTH.PROFILE.MY_PROFILE') }}
                </div>
                <div class="text-muted">
                  Hesap ayarları ve daha
                  <span
                    class="label label-light-danger label-inline font-weight-bold"
                  >
                    fazlası
                  </span>
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
            to="/builder"
            href="#"
            class="navi-item"
            @click.native="closeOffcanvas"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span
                    class="svg-icon svg-icon-md svg-icon-warning"
                  >
                    <!--begin::Svg Icon-->
                    <inline-svg
                      src="media/svg/icons/Shopping/Chart-bar1.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">
                  Mesajlarım
                </div>
                <div class="text-muted">
                  Mesaj kutusu ve görevler
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
            to="/builder"
            href="#"
            class="navi-item"
            @click.native="closeOffcanvas"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span
                    class="svg-icon svg-icon-md svg-icon-danger"
                  >
                    <!--begin::Svg Icon-->
                    <inline-svg
                      src="media/svg/icons/Files/Selected-file.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">
                  Aktivitelerim
                </div>
                <div class="text-muted">
                  Loglar ve bildirimler
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
          <!--begin::Item-->
          <router-link
            to="/builder"
            href="#"
            class="navi-item"
            @click.native="closeOffcanvas"
          >
            <div class="navi-link">
              <div class="symbol symbol-40 bg-light mr-3">
                <div class="symbol-label">
                  <span
                    class="svg-icon svg-icon-md svg-icon-primary"
                  >
                    <!--begin::Svg Icon-->
                    <inline-svg
                      src="media/svg/icons/Communication/Mail-opened.svg"
                    />
                    <!--end::Svg Icon-->
                  </span>
                </div>
              </div>
              <div class="navi-text">
                <div class="font-weight-bold">
                  Görevlerim
                </div>
                <div class="text-muted">
                  En son görev ve projelerim
                </div>
              </div>
            </div>
          </router-link>
          <!--end:Item-->
        </div>
        <!--end::Nav-->
        <div class="separator separator-dashed my-7" />
        <!--begin::Notifications-->
        <div>
          <!--begin:Heading-->
          <h5 class="mb-5">
            Son Bildirimler
          </h5>
          <!--end:Heading-->
          <template v-for="(item, i) in list">
            <!--begin::Item -->
            <div
              :key="i"
              class="d-flex align-items-center rounded p-5 gutter-b"
              :class="`bg-light-${item.type}`"
            >
              <span
                class="svg-icon mr-5"
                :class="`svg-icon-${item.type}`"
              >
                <span class="svg-icon svg-icon-lg">
                  <!--begin::Svg Icon-->
                  <inline-svg :src="item.svg" />
                  <!--end::Svg Icon-->
                </span>
              </span>
              <div class="d-flex flex-column flex-grow-1 mr-2">
                <a
                  href="#"
                  class="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1"
                >
                  {{ item.title }}
                </a>
                <span class="text-muted font-size-sm">
                  {{ item.desc }}
                </span>
              </div>
              <span
                class="font-weight-bolder py-1 font-size-lg"
                :class="`text-${item.type}`"
              />
            </div>
            <!--end::Item -->
          </template>
        </div>
        <!--end::Notifications-->
      </perfect-scrollbar>
      <!--end::Content-->
    </div>
  </div>
</template>

<style lang="scss" scoped>
#kt_quick_user {
    overflow: hidden;
}
</style>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from '@/core/services/store/auth.module';
import KTLayoutQuickUser from '@/assets/js/layout/extended/quick-user.js';
import KTOffcanvas from '@/assets/js/components/offcanvas.js';

export default {
  name: 'KTQuickUser',
  data() {
    return {
      list: [
        {
          title: 'Yeni sözlük oluşturma',
          desc: '20 gün içinde',
          alt: '+28%',
          svg: 'media/svg/icons/Home/Library.svg',
          type: 'warning',
        },
        {
          title: 'Boş kelime özelliklerini doldurma',
          desc: '6 gün içinde',
          alt: '+50%',
          svg: 'media/svg/icons/Communication/Write.svg',
          type: 'success',
        },
        {
          title: 'Ziyaretçi raporları hakkında sunum',
          desc: '2 gün içinde',
          alt: '-27%',
          svg: 'media/svg/icons/Communication/Group-chat.svg',
          type: 'danger',
        },
        {
          title: 'Site optimizasyon raporları',
          desc: '3 gün içinde',
          alt: '+8%',
          svg: 'media/svg/icons/General/Attachment2.svg',
          type: 'info',
        },
      ],
    };
  },
  mounted() {
    // Init Quick User Panel
    KTLayoutQuickUser.init(this.$refs.kt_quick_user);
  },
  methods: {
    onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(() => this.$router.push({ name: 'login' }));
    },
    closeOffcanvas() {
      new KTOffcanvas(KTLayoutQuickUser.getElement()).hide();
    },
  },
  computed: {
    ...mapGetters(['currentUser']),
    picture() {
      return `${process.env.BASE_URL}media/users/300_21.jpg`;
    },
  },
};
</script>
