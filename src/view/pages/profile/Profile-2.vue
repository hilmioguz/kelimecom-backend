<template>
  <div class="d-flex flex-row">
    <!--begin::Aside-->
    <div
      id="kt_profile_aside"
      class="flex-row-auto offcanvas-mobile w-300px w-xl-350px"
    >
      <!--begin::Card-->
      <div class="card card-custom">
        <!--begin::Body-->
        <div class="card-body pt-15">
          <!--begin::User-->
          <div class="text-center mb-10">
            <div
              class="symbol symbol-60 symbol-circle symbol-xl-90"
            >
              <div
                class="symbol-label"
                :style="{
                  backgroundImage: `url(${currentUserPhoto})`,
                }"
              />
              <i
                class="symbol-badge symbol-badge-bottom bg-success"
              />
            </div>

            <h4 class="font-weight-bold my-2">
              James Jones
            </h4>
            <div class="text-muted mb-2">
              Application Developer
            </div>
            <span
              class="label label-light-warning label-inline font-weight-bold label-lg"
            >Active</span>
          </div>
          <!--end::User-->

          <!--begin::Contact-->
          <div class="mb-10 text-center">
            <a
              href="#"
              class="btn btn-icon btn-circle btn-light-facebook mr-2"
            >
              <i class="socicon-facebook" />
            </a>
            <a
              href="#"
              class="btn btn-icon btn-circle btn-light-twitter mr-2"
            >
              <i class="socicon-twitter" />
            </a>
            <a
              href="#"
              class="btn btn-icon btn-circle btn-light-google"
            >
              <i class="socicon-google" />
            </a>
          </div>
          <!--end::Contact-->

          <!--begin::Nav-->
          <div
            class="navi navi-bold navi-hover navi-active navi-link-rounded"
            role="tablist"
          >
            <div class="navi-item mb-2">
              <a
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block active"
                style="cursor:pointer"
                data-tab="0"
                data-toggle="tab"
                role="tab"
                @click="setActiveTab"
              >
                Profile Overview
              </a>
              <a
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
                style="cursor:pointer"
                data-tab="1"
                data-toggle="tab"
                role="tab"
                @click="setActiveTab"
              >
                Personal info
              </a>
              <a
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
                style="cursor:pointer"
                data-tab="2"
                data-toggle="tab"
                role="tab"
                @click="setActiveTab"
              >
                Account Info
              </a>
              <a
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
                style="cursor:pointer"
                data-tab="3"
                data-toggle="tab"
                role="tab"
                @click="setActiveTab"
              >
                Change Passwort
              </a>
              <a
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
                style="cursor:pointer"
                data-tab="4"
                data-toggle="tab"
                role="tab"
                @click="setActiveTab"
              >
                Email Settings
              </a>
              <a
                v-b-tooltip.hover.right="'Comming soon...'"
                href="#"
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
              >
                Saved Credit Cards
              </a>
              <a
                v-b-tooltip.hover.right="'Comming soon...'"
                href="#"
                class="btn btn-hover-light-primary font-weight-bold py-3 px-6 mb-2 text-center btn-block"
              >
                Tax information
              </a>
            </div>
          </div>
          <!--end::Nav-->
        </div>
        <!--end::Body-->
      </div>
      <!--end::Card-->
    </div>
    <!--end::Aside-->

    <!--begin::Content-->
    <div class="flex-row-fluid ml-lg-8">
      <b-tabs
        v-model="tabIndex"
        class="hide-tabs"
      >
        <b-tab active>
          <!--begin::Row-->
          <div class="row">
            <div class="col-lg-6">
              <Widget14 />
            </div>
            <div class="col-lg-6">
              <Widget1 />
            </div>
          </div>
          <!--end::Row-->
          <Widget2 />
        </b-tab>

        <b-tab>
          <KTPersonalInformation />
        </b-tab>

        <b-tab>
          <KTAccountInformation />
        </b-tab>

        <b-tab>
          <KTChangePassword />
        </b-tab>

        <b-tab>
          <KTEmailSettings />
        </b-tab>
      </b-tabs>
    </div>
    <!--end::Content-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
import Widget1 from '@/view/pages/profile/profile-comp-2/Widget1';
import Widget2 from '@/view/pages/profile/profile-comp-2/Widget2';
import Widget14 from '@/view/pages/profile/profile-comp-2/Widget14';
import KTPersonalInformation from '@/view/pages/profile/profile-comp/PersonalInformation';
import KTAccountInformation from '@/view/pages/profile/profile-comp/AccountInformation';
import KTChangePassword from '@/view/pages/profile/profile-comp/ChangePassword';
import KTEmailSettings from '@/view/pages/profile/profile-comp/EmailSettings';

export default {
  name: 'Profile2',
  components: {
    Widget1,
    Widget2,
    Widget14,
    KTPersonalInformation,
    KTAccountInformation,
    KTChangePassword,
    KTEmailSettings,
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Profile 2' }]);
  },
  methods: {
    /**
         * Set current active on click
         * @param event
         */
    setActiveTab(event) {
      const { target } = event;
      const tab = target.closest('[role="tablist"]');
      const links = tab.querySelectorAll('[data-toggle="tab"]');
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
      }

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(target.getAttribute('data-tab'));

      // set current active tab
      target.classList.add('active');
    },
  },
  computed: {
    ...mapGetters(['currentUserPhoto']),
  },
};
</script>
