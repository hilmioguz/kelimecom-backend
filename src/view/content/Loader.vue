<template>
  <!-- begin::Page loader -->
  <div class="page-loader page-loader-logo">
    <img
      alt="Logo"
      :src="logo"
      width="100"
    >
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
    logo: String,
    spinnerClass: String,
  },
};
</script>
