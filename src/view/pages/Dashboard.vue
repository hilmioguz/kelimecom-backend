<template>
  <div>
    <!--begin::Dashboard-->
    <div class="row mt-n4">
      <div class="col-xxl-4">
        <HaftalikSatis />
      </div>
      <div class="col-xxl-8">
        <UserStatsBox />
      </div>

      <div class="col-xxl-4">
        <AylikSatis />
      </div>
      <div class="col-xxl-8">
        <AramaStats />
      </div>
    </div>

    <div class="row">
      <div class="col-xxl-12">
        <Yazar />
      </div>
    </div>
    <!--end::Dashboard-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
import Yazar from '@/view/content/widgets/advance-table/Yazar.vue';
import AramaStats from '@/view/content/widgets/advance-table/AramaStats.vue';
import HaftalikSatis from '@/view/content/widgets/mixed/HaftalikSatis.vue';
import AylikSatis from '@/view/content/widgets/list/AylikSatis.vue';
import UserStatsBox from '@/view/content/widgets/list/UserStatsBox.vue';
import helperFunctions from '@/core/services/helpers';

export default {
  name: 'Dashboard',
  mixins: [helperFunctions],
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters([
      'isAuthenticated',
    ]),
  },
  components: {
    Yazar,
    HaftalikSatis,
    AylikSatis,
    UserStatsBox,
    AramaStats,
  },

  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Dashboard' }]);
  },
  methods: {

    setActiveTab1(event) {
      this.tabIndex = this.setActiveTab(event);
    },
    setActiveTab2(event) {
      this.tabIndex2 = this.setActiveTab(event);
    },
    /**
         * Set current active on click
         * @param event
         */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll('.nav-link');
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
      }

      // set current active tab
      event.target.classList.add('active');

      // set clicked tab index to bootstrap tab
      return parseInt(event.target.getAttribute('data-tab'));
    },
  },
};
</script>
