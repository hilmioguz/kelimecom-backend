<template>
  <!--begin::Navigation-->
  <ul class="navi flex-column navi-hover py-2">
    <li
      class="navi-header font-weight-bolder text-uppercase font-size-sm text-primary pb-2"
    >
      Seçiniz:
    </li>
    <li class="navi-item">
      <a href="#" class="navi-link">
        <span class="navi-icon">
          <i class="la la-print"></i>
        </span>
        <span class="navi-text">Yazıcı</span>
      </a>
    </li>
    <li class="navi-item">
      <a href="#" class="navi-link">
        <span class="navi-icon">
          <i class="la la-copy"></i>
        </span>
        <span class="navi-text">Kopyala</span>
      </a>
    </li>
    <li class="navi-item">
      <a href="#" class="navi-link">
        <span class="navi-icon">
          <i class="la la-file-excel-o"></i>
        </span>
        <span class="navi-text">Excel</span>
      </a>
    </li>
    <li class="navi-item">
      <a href="#" class="navi-link">
        <span class="navi-icon">
          <i class="la la-file-text-o"></i>
        </span>
        <span class="navi-text">CSV</span>
      </a>
    </li>
    <li class="navi-item">
      <a href="#" class="navi-link">
        <span class="navi-icon">
          <i class="la la-file-pdf-o"></i>
        </span>
        <span class="navi-text">PDF</span>
      </a>
    </li>
  </ul>
  <!--end::Navigation-->
</template>

<script>
export default {
  name: "DropdownExport",
  data() {
    return {};
  },
  methods: {},
  computed: {}
};
</script>
