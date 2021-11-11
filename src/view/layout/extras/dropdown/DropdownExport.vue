<template>
  <!--begin::Navigation-->
  <ul class="navi flex-column navi-hover py-2">
    <li
      class="navi-header font-weight-bolder text-uppercase font-size-sm text-primary pb-2"
    >
      Seçiniz:
    </li>
    <li class="navi-item">
      <a
        href="#"
        class="navi-link"
      >
        <span class="navi-icon">
          <i class="la la-print" />
        </span>
        <span class="navi-text">Yazıcı</span>
      </a>
    </li>
    <li class="navi-item">
      <a
        href="#"
        class="navi-link"
      >
        <span class="navi-icon">
          <i class="la la-copy" />
        </span>
        <span class="navi-text">Kopyala</span>
      </a>
    </li>
    <li class="navi-item">
      <a
        href="#"
        class="navi-link"
      >
        <span class="navi-icon">
          <i class="la la-file-excel-o" />
        </span>
        <span class="navi-text">Excel</span>
      </a>
    </li>
    <li class="navi-item">
      <a
        href="#"
        class="navi-link"
      >
        <span class="navi-icon">
          <i class="la la-file-text-o" />
        </span>
        <span class="navi-text">CSV</span>
      </a>
    </li>
    <li class="navi-item">
      <a
        href="#"
        class="navi-link"
      >
        <span class="navi-icon">
          <i class="la la-file-pdf-o" />
        </span>
        <span class="navi-text">PDF</span>
      </a>
    </li>
  </ul>
  <!--end::Navigation-->
</template>

<script>
export default {
  name: 'DropdownExport',
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>
