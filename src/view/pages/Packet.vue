<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Üyelik Paketleri Listesi
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
                      placeholder="Arama..."
                      id="kt_datatable_search_query"
                    />
                    <span>
                      <i class="flaticon2-search-1 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
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
import { APIEND_PACKETS, APIEND_PACKET_OPTION } from "@/core/config/apiends";
import JwtService from "@/core/services/jwt.service";
import DropdownExport from "@/view/layout/extras/dropdown/DropdownExport";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import $ from "jquery";
/* eslint-disable max-len */

export default {
  name: "Packets",
  data() {
    return {
      mydatatable: null
    };
  },
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Üyelik Paketleri" }]);
    this.packetsDatatable();
  },
  activated() {
    this.mydatatable.reload();
  },
  components: { DropdownExport },
  computed: {
    token() {
      const token = JwtService.getToken();
      return token && token.access ? token.access.token : "";
    },
    datatableOption() {
      const self = this;
      return {
        // datasource definition
        data: {
          type: "remote",
          source: {
            read: {
              url: APIEND_PACKETS,
              method: "GET",
              // sample custom headers
              headers: {
                Authorization: `Bearer ${self.token}`
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
          content: self.subtableInit
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
            field: "name",
            title: "İsim",
            sortable: "asc",
            template: function(row) {
              return "<strong>" + row.name + "</strong>";
            }
          },
          {
            field: "isActive",
            title: "Aktif",
            width: 60,
            template: function(row) {
              if (typeof row.isActive !== "undefined") {
                var status = {
                  false: {
                    title: "Pasif",
                    state: "danger"
                  },
                  true: {
                    title: "Aktif",
                    state: "success"
                  }
                };
                return (
                  '<span class="label label-' +
                  status[row.isActive].state +
                  ' label-dot mr-2"></span><span class="font-weight-bold text-' +
                  status[row.isActive].state +
                  '">' +
                  status[row.isActive].title +
                  "</span>"
                );
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
                            <i class="la la-plus"></i>\
                        </a>\
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
      };
    }
  },
  methods: {
    subdatableOption(e) {
      const self = this;
      return {
        data: {
          type: "remote",
          source: {
            read: {
              url: `${APIEND_PACKET_OPTION}/${e.data.id}`,
              method: "GET",
              // sample custom headers
              headers: {
                Authorization: `Bearer ${self.token}`
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
          pageSize: 10
        },

        // layout definition
        layout: {
          scroll: true,
          height: 600,
          footer: false
        },

        sortable: false,
        pagination: true,
        // columns definition
        columns: [
          {
            field: "name",
            title: "Özellik Adı",
            template: function(row) {
              return row.name;
            }
          },
          {
            field: "limitValue",
            title: "Limit",
            width: 50,
            textAlign: "center",
            template: function(row) {
              if (typeof row.limitValue !== "undefined") {
                return row.limitValue < 0
                  ? "<i class='la la-infinity'></i>"
                  : row.limitValue;
              }
            }
          },
          {
            field: "isIncluded",
            title: "Varmı?",
            width: 60,
            textAlign: "center",
            template: function(row) {
              if (typeof row.isIncluded !== "undefined") {
                return row.isIncluded
                  ? '<i class="la la-check"></i>'
                  : '<i class="la la-times"></i>';
              }
            }
          },
          {
            field: "isActive",
            title: "Aktif",
            width: 60,
            template: function(row) {
              if (typeof row.isActive !== "undefined") {
                var status = {
                  false: {
                    title: "Pasif",
                    state: "danger"
                  },
                  true: {
                    title: "Aktif",
                    state: "success"
                  }
                };
                return (
                  '<span class="label label-' +
                  status[row.isActive].state +
                  ' label-dot mr-2"></span><span class="font-weight-bold text-' +
                  status[row.isActive].state +
                  '">' +
                  status[row.isActive].title +
                  "</span>"
                );
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
      };
    },
    subtableInit(e) {
      console.log("subdataaa eee:", e.data);
      const self = this;
      $("<div/>")
        .attr("id", "child_data_local_" + e.data.id)
        .appendTo(e.detailCell)
        .KTDatatable(self.subdatableOption(e));
    },
    async packetsDatatable() {
      const self = this;
      this.mydatatable = $("#kt_datatable").KTDatatable(self.datatableOption);
      $("#kt_datatable_search_lang").on("change", function() {
        self.mydatatable.search(
          $(this)
            .val()
            .toLowerCase(),
          "lang"
        );
      });

      $("#kt_datatable_search_lang").selectpicker();
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
