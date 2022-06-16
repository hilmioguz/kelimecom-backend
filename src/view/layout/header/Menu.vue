<template>
  <ul class="menu-nav">
    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      to="/dashboard"
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a
          :href="href"
          class="menu-link"
          @click="navigate"
        >
          <span class="menu-text"> Dashboard </span>
        </a>
      </li>
    </router-link>

    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      to="/maddeler"
      custom
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a
          :href="href"
          class="menu-link"
          @click="navigate"
        >
          <span class="menu-text"> Maddeler </span>
        </a>
      </li>
    </router-link>
    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      to="/gundemler"
      custom
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a
          :href="href"
          class="menu-link"
          @click="navigate"
        >
          <span class="menu-text"> Gündemler </span>
        </a>
      </li>
    </router-link>
    <router-link
      v-slot="{ href, navigate, isActive, isExactActive }"
      to="/users"
      custom
    >
      <li
        aria-haspopup="true"
        data-menu-toggle="hover"
        class="menu-item"
        :class="[
          isActive && 'menu-item-active',
          isExactActive && 'menu-item-active',
        ]"
      >
        <a
          :href="href"
          class="menu-link"
          @click="navigate"
        >
          <span class="menu-text"> Kullanıcılar </span>
        </a>
      </li>
    </router-link>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open"
      :class="{ 'menu-item-active': hasActiveChildren() }"
    >
      <a
        href="#"
        class="menu-link menu-toggle"
      >
        <span class="menu-text"> Kuluçka </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/kuluckasozluk"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Kuluçka Sözlüklükleri </span>
              </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/kuluckamaddeler"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Kuluçka Maddeleri </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>

    <li
      aria-haspopup="true"
      data-menu-toggle="click"
      class="menu-item menu-item-submenu menu-item-open"
      :class="{ 'menu-item-active': hasActiveChildren() }"
    >
      <a
        href="#"
        class="menu-link menu-toggle"
      >
        <span class="menu-text"> Diğer </span>
      </a>
      <div class="menu-submenu menu-submenu-classic">
        <ul class="menu-subnav">
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/blog"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Blog </span>
              </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/diller"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Diller </span>
              </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/dictionary"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Sözlükler </span>
              </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/packet"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Paketler </span>
              </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/kurumlar"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Kurumlar </span>
              </a>
            </li>
          </router-link>
          <router-link
            v-slot="{ href, navigate, isActive, isExactActive }"
            to="/toplukullanici"
            custom
          >
            <li
              aria-haspopup="true"
              data-menu-toggle="hover"
              class="menu-item menu-item-submenu"
              :class="[
                isActive && 'menu-item-active',
                isExactActive && 'menu-item-active',
              ]"
            >
              <a
                :href="href"
                class="menu-link"
                @click="navigate"
              >
                <span class="menu-text"> Toplu Kullanıcı Oluşturma </span>
              </a>
            </li>
          </router-link>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'KTMenu',
  methods: {
    hasActiveChildren() {
      const match = ['/blog', '/dictionary', '/packet', '/kurumlar'];
      return match.indexOf(this.$route.path) !== -1;
    },
  },
};
</script>
