<template>
  <div class="d-flex flex-column flex-root">
    <div
      class="error error-5 d-flex flex-row-fluid bgi-size-cover bgi-position-center"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
      }"
    >
      <!-- begin:: Content -->
      <div
        class="container d-flex flex-row-fluid flex-column justify-content-md-center p-12"
      >
        <h1
          class="error-title font-weight-boldest text-info mt-10 mt-md-0 mb-12"
        >
          Hoppala!
        </h1>
        <p class="font-weight-boldest display-4">
          Burada bir şeyler ters gitti.
        </p>
        <p class="font-size-h3">
          Üzerinde çalışıyoruz ve en kısa zamanda düzelteceğiz.
          <br>İşleminizi Geri alabilir veya Yardım Merkezimizi
          kullanabilirsiniz.
        </p>
      </div>
      <!-- end:: Content -->
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/sass/pages/error/error-5.scss';
</style>

<script>
export default {
  name: 'Error5',
  computed: {
    backgroundImage() {
      return `${process.env.BASE_URL}media/error/bg5.jpg`;
    },
  },
  mounted() {},
};
</script>
