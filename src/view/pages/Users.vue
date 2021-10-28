<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Kullanıcılar Listesi
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
                    <label class="mr-3 mb-0 d-none d-md-block">Rol:</label>
                    <select class="form-control" id="kt_datatable_search_role">
                      <option value="">Tümü</option>
                      <option value="user">Kullanıcı</option>
                      <option value="moderater">Moderatör</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4 my-2 my-md-0">
                  <div class="d-flex align-items-center">
                    <label class="mr-3 mb-0 d-none d-md-block">Tip:</label>
                    <select class="form-control" id="kt_datatable_search_type">
                      <option value="">Tümü</option>
                      <option value="Bireysel">Bireysel</option>
                      <option value="Kurumsal">Kurumsal</option>
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
import { APIEND_USERS } from "@/core/config/apiends";
import JwtService from "@/core/services/jwt.service";
import DropdownExport from "@/view/layout/extras/dropdown/DropdownExport";
import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";

import $ from "jquery";
/* eslint-disable max-len */

export default {
  name: "Users",
  mounted() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: "Kullanıcılar" }]);
    this.usersDatatable();
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
            source: e.data,
            pageSize: 1
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
              field: "packetname",
              title: "Kullandığı Paket",
              template: function(row) {
                return row.packet.packetId.name;
              }
            },
            {
              field: "packetBegin",
              title: "P. Başlangıç",
              template: function(row) {
                return row.packet.packetBegin;
              }
            },
            {
              field: "packetEnd",
              title: "Paket Bitiş",
              template: function(row) {
                return row.packet.packetEnd;
              }
            }
          ]
        });
    },
    async usersDatatable() {
      let token = await JwtService.getToken();
      token = token.access ? token.access.token : "";
      var datatable = $("#kt_datatable").KTDatatable({
        // datasource definition
        data: {
          type: "remote",
          source: {
            read: {
              url: APIEND_USERS,
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
            field: "name",
            title: "Ad Soyad",
            sortable: "asc",
            width: 100,
            template: function(row) {
              return "<strong>" + row.name + "</strong>";
            }
          },
          {
            field: "email",
            title: "Eposta",
            width: 200,
            template: function(row) {
              if (typeof row.email !== "undefined") {
                return row.email;
              }
            }
          },
          {
            field: "role",
            title: "Rol",
            width: 90,
            textAlign: "center",
            template: function(row) {
              if (typeof row.role !== "undefined") {
                var roletemplate = {
                  user: { class: "label-light-primary" },
                  admin: { class: " label-light-danger" },
                  modarater: { class: " label-light-info" },
                  "": { class: " label-light-info" }
                };

                return (
                  '<span class="label ' +
                  roletemplate[row.role].class +
                  ' label-inline font-weight-bold label-lg">' +
                  row.role +
                  "</span>"
                );
              }
            }
          },
          {
            field: "userType",
            title: "K.Tipi",
            width: 80,
            textAlign: "center",
            template: function(row) {
              if (typeof row.profile.userType !== "undefined") {
                var langtemplate = {
                  Bireysel: { class: "label-light-primary" },
                  Kurumsal: { class: " label-light-danger" },
                  "": { class: " label-light-info" }
                };
                return (
                  '<span class="label ' +
                  langtemplate[row.profile.userType].class +
                  ' label-inline font-weight-bold label-lg">' +
                  row.profile.userType +
                  "</span>"
                );
              }
            }
          },
          {
            field: "isEmailVerified",
            title: "Onaylı",
            textAlign: "center",
            width: 60,
            template: function(row) {
              if (typeof row.isEmailVerified !== "undefined") {
                return row.isEmailVerified
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
      });

      $("#kt_datatable_search_role").on("change", function() {
        datatable.search(
          $(this)
            .val()
            .toLowerCase(),
          "role"
        );
      });

      $("#kt_datatable_search_type").on("change", function() {
        datatable.search(
          $(this)
            .val()
            .toLowerCase(),
          "userType"
        );
      });

      $("#kt_datatable_search_role, #kt_datatable_search_type").selectpicker();
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
