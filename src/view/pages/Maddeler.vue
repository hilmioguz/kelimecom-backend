<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Sözlüklerde Bulunan Maddeler
            <span class="d-block text-muted pt-2 font-size-sm"
              >Her satırda detayları görebilirsiniz.</span
            >
          </h3>
        </div>
        <div class="card-toolbar">
          <!--begin::Dropdown-->
          <b-dropdown
            size="sm"
            variant="light-primary"
            class="m-2 "
            toggle-class="d-flex align-items-center font-weight-bolder font-size-lg"
            right
            no-flip
          >
            <template v-slot:button-content>
              <i class="la la-download"></i>
              Export
            </template>
            <b-dropdown-text tag="div" class="min-w-md-175px">
              <DropdownExport
                v-on:veri="
                  {
                  }
                "
              ></DropdownExport>
            </b-dropdown-text>
          </b-dropdown>
          <!--end::Dropdown-->
          <!--begin::Button-->
          <a href="#" class="btn btn-primary btn-sm font-weight-bolder">
            <i class="la la-plus"></i>Yeni Kayıt</a
          >
          <!--end::Button-->
        </div>
      </div>
      <div class="card-body">
        <!--begin: Search Form-->
        <!--begin::Search Form-->
        <div class="mb-7">
          <div class="row align-items-center">
            <div class="col-lg-9 col-xl-8">
              <div class="row align-items-center">
                <div class="col-md-4 my-2 my-md-0">
                  <div class="input-icon">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search..."
                      id="kt_datatable_search_query"
                    />
                    <span>
                      <i class="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>
                <div class="col-md-4 my-2 my-md-0">
                  <div class="d-flex align-items-center">
                    <label class="mr-3 mb-0 d-none d-md-block">Tür:</label>
                    <select
                      class="form-control"
                      id="kt_datatable_search_status"
                    >
                      <option value="">Tümü</option>
                      <option value="isim">İsim</option>
                      <option value="fiil">Fiil</option>
                      <option value="sıfat">Sıfat</option>
                      <option value="zarf">Zarf</option>
                      <option value="edat">Edat</option>
                      <option value="baglaç">Bağlaç</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4 my-2 my-md-0">
                  <div class="d-flex align-items-center">
                    <label class="mr-3 mb-0 d-none d-md-block">Tip:</label>
                    <select class="form-control" id="kt_datatable_search_type">
                      <option value="">Tümü</option>
                      <option value="1">A tipi</option>
                      <option value="2">B tipi</option>
                      <option value="3">C tipi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-xl-4 mt-5 mt-lg-0">
              <a href="#" class="btn btn-light-primary px-6 font-weight-bold"
                >Arama</a
              >
            </div>
          </div>
        </div>
        <!--end::Search Form-->
        <!--end: Search Form-->
        <!--begin: Datatable-->
        <div
          class="datatable datatable-bordered datatable-head-custom"
          id="kt_datatable"
        ></div>
        <!--end: Datatable-->
      </div>
    </div>
    <!--end::Card-->
  </div>
</template>

<script>
import { APIEND_MADDE } from "@/core/config/apiends";
import JwtService from "@/core/services/jwt.service";
import DropdownExport from "@/view/layout/extras/dropdown/DropdownExport";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import $ from "jquery";
/* eslint-disable max-len */

export default {
  name: "Maddeler",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Maddeler" }]);
    this.maddelerDatatable();
  },
  components: { DropdownExport },
  computed: {
    backgroundImage() {
      return process.env.BASE_URL + "media/error/bg1.jpg";
    }
  },
  methods: {
    subtableInit(e) {
      $("<div/>")
        .attr("id", "child_data_local_" + e.data.id)
        .appendTo(e.detailCell)
        .KTDatatable({
          data: {
            type: "local",
            source: e.data.whichDict,
            pageSize: 5
          },

          // layout definition
          layout: {
            scroll: true,
            height: 400,
            footer: false
          },

          sortable: false,
          pagination: false,
          // columns definition
          columns: [
            {
              field: "anlam",
              title: "Anlam"
            },
            {
              field: "dict",
              title: "Sözlük",
              template: function(row) {
                return row.dictId.name;
              }
            },
            {
              field: "lang",
              title: "Dil",
              template: function(row) {
                return row.dictId.lang;
              }
            }
          ]
        });
    },
    async maddelerDatatable() {
      let token = await JwtService.getToken();
      token = token.access ? token.access.token : "";
      var datatable = $("#kt_datatable").KTDatatable({
        // datasource definition
        data: {
          type: "remote",
          source: {
            read: {
              url: APIEND_MADDE,
              method: "GET",
              // sample custom headers
              headers: {
                Authorization: `Bearer ${token}`
              },
              map: function(raw) {
                // sample data mapping
                var dataSet = raw;
                if (typeof raw.data !== "undefined") {
                  dataSet = raw.data;
                }
                return dataSet;
              }
            }
          },
          pageSize: 10,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },

        // layout definition
        layout: {
          scroll: true,
          footer: false
        },

        // column sorting
        sortable: true,

        pagination: true,
        detail: {
          title: "Detaylar",
          content: this.subtableInit
        },
        search: {
          input: $("#kt_datatable_search_query"),
          key: "generalSearch"
        },
        rows: {
          autoHide: false
        },
        // columns definition
        columns: [
          {
            field: "id",
            title: "#",
            sortable: "asc",
            width: 30,
            type: "number",
            selector: false,
            textAlign: "center"
          },
          {
            field: "madde",
            title: "Madde",
            sortable: "asc",
            width: 100,
            template: function(row) {
              return "<strong>" + row.madde + "</strong>";
            }
          },
          {
            field: "anlam",
            title: "Anlam",
            width: 300,
            template: function(row) {
              if (typeof row.tur !== "undefined") {
                return row.whichDict.map(i => i.anlam).join(", ");
              }
            }
          },
          {
            field: "tur",
            title: "Tür",
            width: 90,
            textAlign: "center",
            template: function(row) {
              if (typeof row.tur !== "undefined") {
                var turtemplate = {
                  isim: { class: "label-light-primary" },
                  sıfat: { class: " label-light-danger" },
                  zarf: { class: " label-light-info" },
                  fiil: { class: " label-light-success" },
                  zamir: { class: " label-light-info" },
                  bağlaç: { class: " label-light-danger" },
                  ünlem: { class: " label-light-warning" },
                  edat: { class: " label-light-info" },
                  mecaz: { class: " label-light-warning" },
                  "": { class: " label-light-info" }
                };
                const temp = row.tur.map(
                  tur =>
                    '<span class="label ' +
                    turtemplate[tur].class +
                    ' label-inline font-weight-bold label-lg">' +
                    tur +
                    "</span>"
                );
                return "<div class='d-flex'>" + temp + "</div>";
              }
            }
          },
          {
            field: "tip",
            title: "Tip",
            width: 60,
            template: function(row) {
              if (typeof row.tur !== "undefined") {
                return row.tip.join(", ");
              }
            }
          },
          {
            field: "koken",
            title: "Köken",
            width: 60,
            template: function(row) {
              if (typeof row.tur !== "undefined") {
                return row.koken.join(", ");
              }
            }
          },
          {
            field: "cinsiyet",
            title: "Cinsi",
            width: 60,
            template: function(row) {
              if (typeof row.cinsiyet !== "undefined") {
                return row.cinsiyet.join(", ");
              }
            }
          },
          {
            field: "Actions",
            title: "Aksiyonlar",
            sortable: false,
            width: 125,
            overflow: "visible",
            autoHide: false,
            template: function() {
              return '\
                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" title="Edit details">\
                            <i class="la la-pen"></i>\
                        </a>\
                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon" title="Delete">\
                            <i class="la la-trash"></i>\
                        </a>\
                    ';
            }
          }
        ]
      });

      $("#kt_datatable_search_status").on("change", function() {
        datatable.search(
          $(this)
            .val()
            .toLowerCase(),
          "tur"
        );
      });

      $("#kt_datatable_search_type").on("change", function() {
        datatable.search(
          $(this)
            .val()
            .toLowerCase(),
          "tip"
        );
      });

      $(
        "#kt_datatable_search_status, #kt_datatable_search_type"
      ).selectpicker();
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep td.datatable-subtable {
  background-color: #f3efef;
  table.datatable-table {
    background-color: #f3efef;
  }
}
</style>
