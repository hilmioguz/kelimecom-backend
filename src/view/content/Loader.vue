<template>
  <!-- begin::Page loader -->
  <div class="page-loader page-loader-logo">
    <img
      v-if="logo"
      alt="Logo"
      :src="logo"
      width="100"
    >
    <div v-if="message">
      {{ message }}
    </div>
    <div
      class="spinner"
      :class="spinnerClass || 'spinner-primary'"
    />
  </div>
  <!-- end::Page Loader -->
</template>

<script>
export default {
  name: 'Loader',
  props: {
    logo: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    spinnerClass: {
      type: String,
      default: '',
    },
  },
};
</script>
