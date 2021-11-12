<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Maddebaşları Listesi
            <span
              class="d-block text-muted pt-2 font-size-sm"
            >Her satırda detayları görebilirsiniz.</span>
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
            <template #button-content>
              <i class="la la-download" />
              Export
            </template>
            <b-dropdown-text
              tag="div"
              class="min-w-md-175px"
            >
              <DropdownExport
                @veri="
                  {
                  }
                "
              />
            </b-dropdown-text>
          </b-dropdown>
          <!--end::Dropdown-->
        </div>
      </div>
      <div class="card-body">
        <!--begin: Search Form-->
        <!--begin::Search Form-->

        <!--end::Search Form-->
        <!--end: Search Form-->
        <!--begin: Datatable-->
        <v-data-table
          :headers="headers"
          :items="maddeler"
          :options.sync="options"
          :server-items-length="totalMaddeler"
          :loading="loading"
          :expanded.sync="expanded"
          :page="page"
          show-expand
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
          class="elevation-0"
        >
          <!-- eslint-disable vue/valid-v-slot -->
          <template #top>
            <v-toolbar flat>
              <div class="w-100">
                <div class="row align-items-center">
                  <div class="col-lg-9 col-xl-8">
                    <div class="row align-items-start">
                      <div class="col-md-4 my-2 my-md-0">
                        <v-text-field
                          v-model="filter.madde"
                          append-icon="mdi-magnify"
                          label="Arama"
                          single-line
                          hide-details
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <v-divider
                class="mx-4"
                inset
                vertical
              />
              <v-spacer />
              <v-btn
                color="primary"
                dark
                class="mb-2"
                @click="addItem()"
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-plus
                </v-icon>
                Yeni Kayıt
              </v-btn>
              <v-dialog
                v-model="dialog"
                max-width="500px"
                width="50vw"
                min-width="400px"
              >
                <v-card
                  rounded="20"
                >
                  <v-card-title
                    class=" bgi-size-cover bgi-no-repeat"
                    :style="{ backgroundImage: `url(${backgroundImage})` }"
                  >
                    <span class="white--text text-h5">{{
                      formTitle
                    }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            v-model="editedItem.madde"
                            label="Maddebaşı"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="secondary blue--text"
                      class="mb-2"
                      @click="close"
                    >
                      İptal
                    </v-btn>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click="save"
                    >
                      Kaydet
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogDelete"
                max-width="500px"
              >
                <v-card>
                  <v-card-title
                    class="text-h5"
                  >
                    Silmek istediğinizden emin
                    misiniz? Bu işlemin geri dönüşü yoktur! Maddebaşının silinmesi ile birlikte bu madde başlığı altında bulunan tüm sözlüklerdeki veriler silinecektir.
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeDelete"
                    >
                      İptal
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteItemConfirm"
                    >
                      Tamam
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="subDialog"
                fullscreen
                hide-overlay
                transition="dialog-bottom-transition"
                scrollable
              >
                <v-card
                  rounded="20"
                >
                  <v-card-title
                    class=" bgi-size-cover bgi-no-repeat"
                    :style="{ backgroundImage: `url(${backgroundImage})` }"
                  >
                    <span class="white--text text-h5">{{
                      formSubTitle
                    }}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedItem.madde"
                            :readonly="editedSubIndex === -1 ? false : true"
                            label="Maddebaşı"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="editedSubItem.dictId"
                            :readonly="editedSubIndex === -1 ? false : true"
                            :return-object="false"
                            :items="dictList"
                            label="Sözlük"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-autocomplete
                            v-model="editedSubItem.digerMaddeId"
                            :items="searchDigerItems"
                            :loading="isDigerItemLoading"
                            :search-input.sync="searchDigerMadde"
                            deletable-chips
                            small-chips
                            hide-details
                            hide-selected
                            @change="digerChanged"
                            item-text="madde"
                            item-value="id"
                            label="Diğer Yazım Maddebaşı"
                          >
                            <template #no-data>
                              <v-list-item>
                                <v-list-item-title>
                                  Maddebaşı ara
                                </v-list-item-title>
                              </v-list-item>
                            </template>
                            <template #item="{ item }">
                              <v-list-item-content>
                                <v-list-item-title v-text="item.madde" />
                              </v-list-item-content>
                            </template>
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="3">
                          <v-autocomplete
                            v-model="editedSubItem.karsiMaddeId"
                            :items="searchKarsiItems"
                            :loading="isKarsiItemLoading"
                            :search-input.sync="searchKarsiMadde"
                            deletable-chips
                            small-chips
                            hide-details
                            hide-selected
                            @change="karsiChanged"
                            item-text="madde"
                            item-value="id"
                            label="Karşı Maddebaşı"
                          >
                            <template #no-data>
                              <v-list-item>
                                <v-list-item-title>
                                  Maddebaşı ara
                                </v-list-item-title>
                              </v-list-item>
                            </template>
                            <template #item="{ item }">
                              <v-list-item-content>
                                <v-list-item-title v-text="item.madde" />
                              </v-list-item-content>
                            </template>
                          </v-autocomplete>
                        </v-col>
                        <v-col cols="12">
                          <h6>Madde Anlamı</h6>
                          <pmd
                            v-model="editedSubItem.anlam"
                            :show-toolbar="true"
                            :show-textarea="true"
                            custom-lang="tr"
                            :upload-img-fn="uploadFn"
                            :upload-file-fn="uploadFn"
                            :img-width-height-attr="{width: true, height: false}"
                          />
                        </v-col>

                        <v-col cols="3">
                          <label class="typo__label">Tür</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir tür ekle"
                            :multiple="true"
                            :options="turListesi"
                            :taggable="true"
                            :max-height="150"
                            :allow-empty="true"
                            :hide-selected="true"
                            :show-labels="false"
                            @select="onSelect"
                            @tag="(event) => addTag('tur', event)"
                            v-model="editedSubItem.tur"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Alt Tür</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir alt tür ekle"
                            :multiple="true"
                            :options="altturListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @select="onSelect"
                            @tag="(event) => addTag('alttur', event)"
                            v-model="editedSubItem.alttur"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Tip</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir tür ekle"
                            :multiple="true"
                            :options="tipListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @select="onSelect"
                            @tag="(event) => addTag('tip', event)"
                            v-model="editedSubItem.tip"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Köken</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir köken ekle"
                            :multiple="true"
                            :options="kokenListesi"
                            :taggable="true"
                            :max-height="150"
                            :allow-empty="true"
                            :hide-selected="true"
                            :show-labels="false"
                            @tag="(event) => addTag('koken', event)"
                            v-model="editedSubItem.koken"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Cinsiyet</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir cinsiyet ekle"
                            :multiple="true"
                            :options="cinsiyetListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('cinsiyet', event)"
                            v-model="editedSubItem.cinsiyet"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Biçim</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir biçim ekle"
                            :multiple="true"
                            :options="bicimListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('bicim', event)"
                            v-model="editedSubItem.bicim"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Sınıfı</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir sınıf ekle"
                            :multiple="true"
                            :options="sinifListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('sinif', event)"
                            v-model="editedSubItem.sinif"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Transkripsiyon</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir transkripsiyon ekle"
                            :multiple="true"
                            :options="transkripsiyonListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('transkripsiyon', event)"
                            v-model="editedSubItem.transkripsiyon"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Fonetik</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir fonetik ekle"
                            :multiple="true"
                            :options="fonetikListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('fonetik', event)"
                            v-model="editedSubItem.fonetik"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Heceliyazim</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir heceli yazım ekle"
                            :multiple="true"
                            :options="heceliyazimListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('heceliyazim', event)"
                            v-model="editedSubItem.heceliyazim"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Zıt Anlam</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir zıt anlam ekle"
                            :multiple="true"
                            :options="zitanlamListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('zitanlam', event)"
                            v-model="editedSubItem.zitanlam"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Eş Anlam</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir eş anlam ekle"
                            :multiple="true"
                            :options="esanlamListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('esanlam', event)"
                            v-model="editedSubItem.esanlam"
                          />
                        </v-col>
                        <v-col cols="3">
                          <label class="typo__label">Telaffuz</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir telaffuz ekle"
                            :multiple="true"
                            :options="telaffuzListesi"
                            :taggable="true"
                            :max-height="150"
                            :hide-selected="true"
                            :show-labels="false"
                            :allow-empty="true"
                            @tag="(event) => addTag('telaffuz', event)"
                            v-model="editedSubItem.telaffuz"
                          />
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="secondary blue--text"
                      class="mb-2"
                      @click="close"
                    >
                      İptal
                    </v-btn>
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      @click="saveSub"
                    >
                      Kaydet
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                v-model="dialogSubDelete"
                max-width="500px"
              >
                <v-card>
                  <v-card-title
                    class="text-h5"
                  >
                    Silmek istediğinizden emin
                    misiniz? Bu işlemin geri dönüşü yoktur!
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="closeDelete"
                    >
                      İptal
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="deleteSubItemConfirm"
                    >
                      Tamam
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <!-- eslint-disable-next-line vue/no-template-shadow -->
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <b-tabs
                class="mt-3"
                content-class="flex-start"
              >
                <b-tab
                  title="Detaylar"
                  active
                  class="text-left"
                >
                  <b-table
                    sticky-header
                    tbody-tr-class="detayRowClass"
                    head-variant="light"
                    striped
                    selectable
                    select-mode="single"
                    @row-selected="onRowSelected(item)"
                    :fields="detayFields"
                    :items="item.whichDict"
                  >
                    <template #cell(indeks)="data">
                      <template
                        v-if="data.rowSelected"
                      >
                        <div
                          class="d-flex flex-column align-start"
                        >
                          <div
                            aria-hidden="true"
                            style="font-size:16px"
                          >
                            &check;
                          </div>
                          <v-icon
                            small
                            @click="editSubItem(data)"
                          >
                            mdi-pencil
                          </v-icon>
                          <v-icon
                            small
                            @click="deleteSubItem(data)"
                          >
                            mdi-delete
                          </v-icon>
                        </div>
                      </template>
                      <template v-else>
                        {{ data.index + 1 }}
                      </template>
                    </template>
                    <template #cell(anlam)="data">
                      <span
                        class="anlamBLock"
                        v-html="data.value"
                      />
                    </template>
                  </b-table>
                </b-tab>
                <b-tab
                  title="Diğer Detaylar"
                  class="text-left"
                >
                  <b-table
                    striped
                    small
                    head-variant="light"
                    selectable
                    select-mode="single"
                    @row-selected="onRowSelected"
                    :fields="digerDetayFields"
                    :items="item.whichDict"
                  >
                    <template #cell(indeks)="data">
                      <template v-if="data.rowSelected">
                        <span aria-hidden="true">&check;</span>
                        <span class="sr-only">Selected</span>
                      </template>
                      <template v-else>
                        {{ data.index + 1 }}
                      </template>
                    </template>
                  </b-table>
                </b-tab>
              </b-tabs>
            </td>
          </template>
          <template #item.madde="{ item }">
            <span v-html="`<strong>${item.madde}</strong>`" />
          </template>
          <template #item.actions="{ item }">
            <v-icon
              small
              class="mr-2"
              @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="addSubItem(item)"
            >
              mdi-plus
            </v-icon>
            <v-icon
              small
              @click="deleteItem(item)"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
        <!--end: Datatable-->
      </div>
    </div>
    <!--end::Card-->
  </div>
</template>


<script>
import Vue from 'vue';
import pmd from 'perfect-markdown'; //  or import pmd from 'perfect-markdown/lib/pmd.umd.min.js'
import Multiselect from 'vue-multiselect';
import store from '@/core/services/store'; // vuex is required in perfect-markdown
import ApiService from '@/core/services/api.service';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import DropdownExport from '@/view/layout/extras/dropdown/DropdownExport';
import { SET_BREADCRUMB } from '@/core/services/store/breadcrumbs.module';
import helpers from '../../core/services/helpers.vue';

/* eslint-disable max-len */

Vue.use(pmd, { store }); // register pmd vuex module

export default {
  name: 'Maddeler',
  mixins: [helpers],
  data() {
    return {
      expanded: [],
      filter: { madde: '' },
      timerId: null,
      dialog: false,
      dialogDelete: false,
      subDialog: false,
      dialogSubDelete: false,
      totalMaddeler: 0,
      isKarsiItemLoading: false,
      isDigerItemLoading: false,
      searchDigerItems: [],
      searchKarsiItems: [],
      searchDigerMadde: null,
      searchKarsiMadde: null,
      maddeler: [],
      loading: true,
      menu1: false,
      menu2: false,
      page: 1,
      headers: [
        { text: '', value: 'data-table-expand' },
        {
          text: 'MADDEBAŞI',
          align: 'start',
          sortable: true,
          value: 'madde',
        },
        {
          text: 'TOPLAM KAYIT SAYISI',
          align: 'center',
          sortable: false,
          value: 'whichDict.length',
        },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      editedIndex: -1,
      editedItem: { id: '', madde: '' },
      defaultItem: { id: '', madde: '' },
      editedSubIndex: -1,
      editedSubItem: {
        parentId: '',
        id: '',
        anlam: '',
        digerMaddeId: '',
        karsiMaddeId: '',
        dictId: '',
        tur: [],
        alttur: [],
        tip: [],
        koken: [],
        cinsiyet: [],
        bicim: [],
        sinif: [],
        transkripsiyon: [],
        fonetik: [],
        heceliyazim: [],
        zitanlam: [],
        esanlam: [],
        telaffuz: [],
      },
      defaultSubItem: {
        parentId: null,
        id: null,
        anlam: '',
        digerMaddeId: '',
        karsiMaddeId: '',
        dictId: '',
        tur: [],
        alttur: [],
        tip: [],
        koken: [],
        cinsiyet: [],
        bicim: [],
        sinif: [],
        transkripsiyon: [],
        fonetik: [],
        heceliyazim: [],
        zitanlam: [],
        esanlam: [],
        telaffuz: [],
      },
      detayFields: [
        'indeks',
        { key: 'anlam', label: 'Anlam:', formatter: value => (value ? pmd.markdownIt.render(value) : '') },
        { key: 'dictId', label: 'Sözlük:', formatter: value => (value && value.name ? value.name : '') },
        { key: 'tur', label: 'Tür:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'alttur', label: 'Alt Tür:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'tip', label: 'Tip:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'digerMaddeId', label: 'Diğer Maddebaşı:', formatter: value => (value && value.madde ? value.madde : '') },
        { key: 'karsiMaddeId', label: 'Karşı Maddebaşı:', formatter: value => (value && value.madde ? value.madde : '') },
      ],
      digerDetayFields: [
        'indeks',
        { key: 'koken', label: 'Köken:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'bicim', label: 'Biçim:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'sinif', label: 'Sınıf:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'transkripsiyon', label: 'Transkripsiyon:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'fonetik', label: 'Fonetik:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'heceliyazim', label: 'Heceliyazim:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'zitanlam', label: 'Zıt Anlam:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'esanlam', label: 'Eş Anlam:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'telaffuz', label: 'telaffuz:', formatter: value => (value ? value.join(', ') : '') },
      ],
    };
  },
  components: { DropdownExport, Multiselect },
  watch: {
    filter: {
      handler(newval) {
        console.log('filter', newval);
        if (newval) {
          if (newval.madde) {
            this.options = {
              searchTerm: newval.madde,
              searchField: 'madde',
            };
          }
        }
      },
      deep: true,
    },
    options: {
      handler(newval) {
        console.log('Options:', newval);
        // cancel pending call
        clearTimeout(this.timerId);
        // delay new call 500ms
        this.timerId = setTimeout(() => {
          this.getDataFromApi();
        }, 500);
      },
      deep: true,
    },

    searchDigerMadde(val) {
      if (val == null) return;
      const options = {
        searchTerm: val,
        itemsPerPage: 1000,
        searchField: 'madde',
      };
      clearTimeout(this.timerId);
      // delay new call 500ms
      this.timerId = setTimeout(() => {
        this.isDigerItemLoading = true;
        ApiService.setHeader();
        ApiService.get('madde', this.stringify(options))
          .then(async ({ data }) => {
            this.searchDigerItems = data.data;
            this.isDigerItemLoading = false;
          })
          .catch(({ message }) => {
            console.log(message);
            this.isDigerItemLoading = false;
          });
      }, 500);
    },
    searchKarsiMadde(val) {
      if (val == null) return;
      const options = {
        searchTerm: val,
        itemsPerPage: 1000,
        searchField: 'madde',
      };
      clearTimeout(this.timerId);
      // delay new call 500ms
      this.timerId = setTimeout(() => {
        this.isKarsiItemLoading = true;
        ApiService.setHeader();
        ApiService.get('madde', this.stringify(options))
          .then(async ({ data }) => {
            this.searchKarsiItems = data.data;
            this.isKarsiItemLoading = false;
          })
          .catch(({ message }) => {
            console.log(message);
            this.isKarsiItemLoading = false;
          });
      }, 500);
    },
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    subDialog(val) {
      val || this.close();
    },
    dialogSubDelete(val) {
      val || this.closeDelete();
    },
  },
  computed: {
  },
  created() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Maddeler' }]);
    this.getDataFromApi();
  },
  methods: {
    onRowSelected(item) {
      console.log('items:', item);
      // this.selected = items;
      this.editedIndex = this.maddeler.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    async uploadFn(payload) {
      console.log('PAyload file:', payload);
      const formData = new FormData();
      formData.append('file', payload);
      const ret = await this.updloadFile(formData); // the payload has the file(File) param from pmd
      return {
        upload: true, // required
        url: ret[0].url,
      };
    },

    karsiChanged(val) {
      if (val == null) {
        this.searchKarsiItems = [];
      }
    },

    digerChanged(val) {
      if (val == null) {
        this.searchDigerItems = [];
      }
    },

    customLabel(item) {
      if (typeof (item) === 'object') {
        return `${item.text}`;
      }
      return `${item}`;
    },

    addTag(place, newTag) {
      let newp = newTag;
      if (typeof (newTag) === 'object') {
        newp = newTag.value;
      }

      this.editedSubItem[place].unshift(newp);
    },

    onSelect(newTag) {
      console.log('ON select:', newTag);
      let newp = newTag;
      if (typeof (newTag) === 'object') {
        newp = newTag.value;
        console.log('ON select object:', newp);
      }
      return newp;
    },

    editItem(item) {
      this.editedIndex = this.maddeler.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.maddeler.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    addItem() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedSubItem = Object.assign({}, this.defaultSubItem);
      this.editedSubIndex = -1;
      this.subDialog = true;
    },
    addSubItem(parent) {
      this.editedIndex = this.maddeler.indexOf(parent);
      this.editedItem = Object.assign({}, parent);
      this.editedSubItem = Object.assign({}, this.defaultSubItem);
      this.editedSubIndex = -1;
      this.subDialog = true;
    },
    editSubItem(item) {
      if (item != null) {
        this.editedSubIndex = this.maddeler[this.editedIndex].whichDict.indexOf(item.item);
        if (item.item.dictId && item.item.dictId.id) {
          const dictId = item.item.dictId.id;
          item.item.dictId = dictId;
        }
        this.editedSubItem = Object.assign({}, item.item);
        if (item.item.karsiMaddeId && item.item.karsiMaddeId.id) {
          this.searchKarsiItems = [{ id: item.item.karsiMaddeId.id, madde: item.item.karsiMaddeId.madde }];
        }
        if (item.item.digerMaddeId && item.item.digerMaddeId.id) {
          this.searchDigerItems = [{ id: item.item.digerMaddeId.id, madde: item.item.digerMaddeId.madde }];
        }
      }

      this.subDialog = true;
    },

    deleteSubItem(item) {
      this.editedSubIndex = this.maddeler[this.editedIndex].whichDict.indexOf(item.item);
      this.editedSubItem = Object.assign({}, item.item);
      this.dialogSubDelete = true;
    },

    deleteItemConfirm() {
      this.maddeler.splice(this.editedIndex, 1);
      this.deleteData('madde', this.editedItem.id);
      this.closeDelete();
    },

    deleteSubItemConfirm() {
      this.maddeler[this.editedIndex].whichDict.splice(this.editedSubIndex, 1);
      this.deleteSubData('madde/submadde', this.editedItem.id, this.editedSubItem.id);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.subDialog = false;
      this.reset();
    },

    reset() {
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.editedSubItem = Object.assign({}, this.defaultSubItem);
        this.editedSubIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.dialogSubDelete = false;
      this.reset();
    },

    save() {
      let payload = {
        madde: this.editedItem.madde,
      };
      console.log(payload);
      // payload = this.removeEmpty(payload);
      if (this.editedIndex > -1) {
        Object.assign(
          this.maddeler[this.editedIndex],
          this.editedItem,
        );
        console.log('update.');
        this.updateData('madde/headonly', this.editedItem.id, payload);
      } else {
        delete this.editedItem.id;
        payload = this.editedItem;
        delete this.editedSubItem.parentId;
        delete this.editedSubItem.id;
        if (!this.editedSubItem.digerMaddeId) {
          delete this.editedSubItem.digerMaddeId;
        }
        if (!this.editedSubItem.karsiMaddeId) {
          delete this.editedSubItem.karsiMaddeId;
        }
        payload.whichDict = [this.editedSubItem];
        console.log('save.');
        this.saveData('madde', payload);
      }
      setTimeout(() => {
        this.getDataFromApi();
      }, 500);
      this.close();
    },

    saveSub() {
      const payload = {
        anlam: this.editedSubItem.anlam,
        tur: this.editedSubItem.tur,
        alttur: this.editedSubItem.alttur,
        tip: this.editedSubItem.tip,
        koken: this.editedSubItem.koken,
        cinsiyet: this.editedSubItem.cinsiyet,
        bicim: this.editedSubItem.bicim,
        sinif: this.editedSubItem.sinif,
        transkripsiyon: this.editedSubItem.transkripsiyon,
        fonetik: this.editedSubItem.fonetik,
        heceliyazim: this.editedSubItem.heceliyazim,
        zitanlam: this.editedSubItem.zitanlam,
        esanlam: this.editedSubItem.esanlam,
        telaffuz: this.editedSubItem.telaffuz,
      };
      console.log(payload);
      // payload = this.removeEmpty(payload);
      if (this.editedSubIndex > -1) {
        Object.assign(
          this.maddeler[this.editedIndex].whichDict[this.editedSubIndex],
          this.editedSubItem,
        );
        console.log('update sub.');
        payload.id = this.editedSubItem.id;
        if (this.editedSubItem.digerMaddeId && this.editedSubItem.digerMaddeId.id) {
          payload.digerMaddeId = this.editedSubItem.digerMaddeId.id;
        }
        if (this.editedSubItem.karsiMaddeId && this.editedSubItem.karsiMaddeId.id) {
          payload.karsiMaddeId = this.editedSubItem.karsiMaddeId.id;
        }
        // eslint-disable-next-line no-nested-ternary
        payload.dictId = (this.editedSubItem.dictId && this.editedSubItem.dictId.id) ? this.editedSubItem.dictId.id : this.editedSubItem.dictId ? this.editedSubItem.dictId : '';
        this.updateData('madde/submadde', this.editedItem.id, payload);
      } else {
        console.log('save sub.');
        if (this.editedSubItem.digerMaddeId) {
          payload.digerMaddeId = this.editedSubItem.digerMaddeId;
        }
        if (this.editedSubItem.karsiMaddeId) {
          payload.karsiMaddeId = this.editedSubItem.karsiMaddeId;
        }

        payload.dictId = (this.editedSubItem.dictId) ? this.editedSubItem.dictId : '';
        let newpayload;
        // this.maddeler.push(this.editedItem);
        let url = 'madde/submadde';
        if (this.editedItem.id) {
          newpayload = payload;
          url = `${url}/${this.editedItem.id}`;
        } else {
          newpayload = { madde: this.editedItem.madde, whichDict: [payload] };
        }
        this.saveData(url, newpayload);
      }
      setTimeout(() => {
        this.getDataFromApi();
      }, 500);
      this.close();
    },

    getDataFromApi() {
      this.loading = true;
      console.log('this.options:', this.options);
      // const { sortBy, sortDesc, page, itemsPerPage } = this.options;

      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('madde', this.stringify(this.options))
          .then(async ({ data }) => {
            console.log('Data:', data);
            try {
              this.maddeler = data.data;
              this.totalMaddeler = data.meta.total;
              this.loading = false;
              console.log('maddeler:', this.maddeler);
              resolve(this.maddeler);
            } catch (error) {
              reject(error);
            }
          })
          .catch(({ response }) => {
            console.log(response.message);
            this.loading = false;
            reject(response.message);
          });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep td.datatable-subtable {
    background-color: #f3efef;
    table.datatable-table {
        background-color: #f3efef;
    }
}
::v-deep .nav-tabs .nav-link.active, .nav-tabs .nav-item.show .nav-link {
    background-color: #F3F6F9;
    border-color: #F3F6F9 #F3F6F9 #F3F6F9;
}
// ::v-deep .theme--light.v-label {
//     color: rgba(0, 0, 0, 0.6);
//     font-weight: 600;
//     font-size: 1.3rem;
// }
::v-deep .pmd-editor .icon-box {
  i {
    color: #6d6e70;
  }
  .icon-menu {
      padding-left: 0!important;
  }
}
::v-deep .b-table span.anlamBLock {
  max-height: 300px;
  max-width: 400px;
  display: block;
  overflow-y: auto;
}
::v-deep .v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  vertical-align: middle !important;
}
::v-deep .v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  vertical-align: middle !important;
}

</style>
