<template>
  <!--begin::Navigation-->
  <ul class="navi flex-column navi-hover py-2">
    <li
      class="navi-header font-weight-bolder text-uppercase font-size-sm text-primary pb-2"
    >
      Seçiniz:
    </li>
    <!-- <li class="navi-item">
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
        @click="download('txt')"
      >
        <span class="navi-icon">
          <i class="la la-copy" />
        </span>
        <span class="navi-text">Text</span>
      </a>
    </li> -->
    <!-- <li class="navi-item">
      <a
        href="#"
        class="navi-link"
        @click="download('xls')"
      >
        <span class="navi-icon">
          <i class="la la-file-excel-o" />
        </span>
        <span class="navi-text">Excel</span>
      </a>
    </li> -->
    <li class="navi-item">
      <a
        href="#"
        class="navi-link"
        @click="downloadCsv"
      >
        <span class="navi-icon">
          <i class="la la-file-text-o" />
        </span>
        <span class="navi-text">CSV</span>
      </a>
    </li>
    <!-- <li class="navi-item">
      <a
        href="#"
        class="navi-link"
        @click="download('html')"
      >
        <span class="navi-icon">
          <i class="la la-file-pdf-o" />
        </span>
        <span class="navi-text">PDF</span>
      </a>
    </li> -->
  </ul>
  <!--end::Navigation-->
</template>

<script>
import Papa from 'papaparse';
import exportFromJSON from 'export-from-json';

export default {
  name: 'DropdownExport',
  props: {
    jsonData: {
      type: [Object, Array],
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    flatten(obj, prefix = [], current = {}) {
      if (typeof (obj) === 'object' && obj !== null) {
        for (const key of Object.keys(obj)) {
          this.flatten(obj[key], prefix.concat(key), current);
        }
      } else {
        current[prefix.join('.')] = obj;
      }
      return current;
    },
    download(type) {
      const fileName = 'download';
      let exportType;
      if (type === 'csv') {
        exportType = exportFromJSON.types.csv;
      } else if (type === 'xls') {
        exportType = exportFromJSON.types.xls;
      } else if (type === 'txt') {
        exportType = exportFromJSON.types.txt;
      } else if (type === 'html') {
        exportType = exportFromJSON.types.html;
      }

      exportFromJSON({
        data: this.jsonData, fileName, exportType, withBOM: true,
      });
    },
    downloadCsv() {
      let blob = new Blob([Papa.unparse(this.jsonData, {
        quotes: false, // or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ',',
        header: true,
        newline: '\r\n',
        skipEmptyLines: false, // other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
        // columns: this.jsonColumns, // or array of strings
      })], {
        type: 'text/csv;charset=utf-8;',
      });

      let link = document.createElement('a');

      let url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'filename.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>
