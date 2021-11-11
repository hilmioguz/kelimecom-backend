<template>
  <KTCard
    ref="preview"
    :title="title"
    :example="true"
  >
    <template
      v-if="hasTitleSlot"
      #title
    >
      <h3 class="card-title">
        <slot name="title" />
      </h3>
    </template>
    <template #toolbar>
      <div class="example-tools justify-content-center">
        <span
          v-b-tooltip.hover.top="'View code'"
          class="example-toggle"
          data-toggle="tooltip"
        />
        <span
          v-b-tooltip.hover.top="'Copy code'"
          class="example-copy"
          data-toggle="tooltip"
        />
      </div>
    </template>
    <template #body>
      <!--begin::Code example-->
      <div class="example-code mb-5">
        <ul
          v-if="!hasGeneralCode && !hasSingleCodeType"
          class="example-nav nav nav-tabs nav-bold nav-tabs-line nav-tabs-line-2x"
          role="tablist"
        >
          <li
            v-if="hasHtmlCode"
            class="nav-item"
          >
            <a
              class="nav-link active"
              data-tab="0"
              data-toggle="tab"
              href="#"
              role="tab"
              aria-selected="true"
              @click="setActiveTab"
            >
              HTML
            </a>
          </li>
          <li
            v-if="hasJsCode"
            class="nav-item"
          >
            <a
              class="nav-link"
              data-tab="1"
              data-toggle="tab"
              href="#"
              role="tab"
              aria-selected="false"
              @click="setActiveTab"
            >
              &nbsp;JS&nbsp;
            </a>
          </li>
          <li
            v-if="hasScssCode"
            class="nav-item"
          >
            <a
              class="nav-link"
              data-tab="2"
              data-toggle="tab"
              href="#"
              role="tab"
              aria-selected="false"
              @click="setActiveTab"
            >
              SCSS
            </a>
          </li>
        </ul>
        <div v-if="hasGeneralCode">
          <slot name="code" />
        </div>

        <div v-if="!hasGeneralCode && !hasSingleCodeType">
          <b-tabs
            v-model="tabIndex"
            class="hide-tabs"
            content-class="mt-3"
          >
            <b-tab
              active
              class="example-highlight"
            >
              <highlight-code
                lang="html"
                class="language-html"
              >
                <slot name="html" />
              </highlight-code>
            </b-tab>
            <b-tab class="example-highlight">
              <highlight-code
                lang="js"
                class="language-js"
              >
                <slot name="js" />
              </highlight-code>
            </b-tab>
            <b-tab class="example-highlight">
              <highlight-code
                lang="scss"
                class="language-scss"
              >
                <slot name="scss" />
              </highlight-code>
            </b-tab>
          </b-tabs>
        </div>

        <div
          v-if="hasSingleCodeType"
          class="example-highlight"
        >
          <highlight-code
            v-if="hasHtmlCode"
            lang="html"
            class="language-html"
          >
            <slot name="html" />
          </highlight-code>
          <highlight-code
            v-if="hasJsCode"
            lang="js"
            class="language-js"
          >
            <slot name="js" />
          </highlight-code>
          <highlight-code
            v-if="hasScssCode"
            lang="scss"
            class="language-scss"
          >
            <slot name="scss" />
          </highlight-code>
        </div>
      </div>
      <!--end::Code example-->

      <slot name="preview" />
    </template>
  </KTCard>
</template>

<script>
import KTCard from '@/view/content/Card.vue';
import KTLayoutExamples from '@/assets/js/layout/extended/examples.js';

export default {
  name: 'KTCodePreview',
  components: {
    KTCard,
  },
  props: {
    title: String,
  },
  data() {
    return {
      tabIndex: 0,
      isOpen: false,
    };
  },
  computed: {
    /**
         * Check if has title
         * @returns {boolean}
         */
    hasTitleSlot() {
      return !!this.$slots.title;
    },

    /**
         * Check if code only has one, exclude the tabs
         * @returns {boolean}
         */
    hasSingleCodeType() {
      let exist = 0;
      ['html', 'js', 'scss'].forEach((type) => {
        if (this.$slots.hasOwnProperty(type)) {
          exist++;
        }
      });
      return exist === 1;
    },

    /**
         * Custom generate codes
         * @returns {boolean}
         */
    hasGeneralCode() {
      return !!this.$slots.code;
    },

    /**
         * Check if has JS code slot
         * @returns {boolean}
         */
    hasJsCode() {
      return !!this.$slots.js;
    },

    /**
         * Check if has SCSS code slot
         * @returns {boolean}
         */
    hasScssCode() {
      return !!this.$slots.scss;
    },

    /**
         * Check if has HTML code slot
         * @returns {boolean}
         */
    hasHtmlCode() {
      return !!this.$slots.html;
    },
  },
  mounted() {
    // init example codes
    this.$nextTick(() => {
      KTLayoutExamples.init([this.$el]);
      const hljs = this.$el.querySelectorAll('.hljs');
      hljs.forEach((hl) => {
        hl.classList.add(`language-${hl.classList[1]}`);
        hl.classList.remove('hljs');
      });
    });
  },
  methods: {
    /**
         * Set current active on click
         * @param event
         */
    setActiveTab(event) {
      // get all tab links
      const tab = event.target.closest('[role="tablist"]');
      const links = tab.querySelectorAll('[data-toggle="tab"]');
      // remove active tab links
      for (let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
      }

      // set current active tab
      event.target.classList.add('active');

      // set clicked tab index to bootstrap tab
      this.tabIndex = parseInt(event.target.getAttribute('data-tab'));
    },
  },
};
</script>
