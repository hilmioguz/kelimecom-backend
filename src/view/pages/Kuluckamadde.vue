<!-- eslint-disable max-len -->
<template>
  <div>
    <!--begin::Card-->
    <div class="card card-custom">
      <div class="card-header flex-wrap border-0 pt-6 pb-0">
        <div class="card-title">
          <h3 class="card-label">
            Tüm Kuluçka Maddebaşı Listesi
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
                :json-data="flattenMaddeData(kuluckamaddeler)"
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
          :items="kuluckamaddeler"
          :options.sync="options"
          :server-items-length="totalKuluckamaddeler"
          :loading="loading"
          :expanded.sync="expanded"
          :page="page"
          show-expand
          @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
          class="elevation-0"
        >
          <!-- eslint-disable vue/valid-v-slot -->
          <template #top>
            <v-toolbar
              flat
              height="auto"
            >
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
                            :return-object="false"
                            :items="kuluckaDictList"
                            label="Sözlük"
                          />
                        </v-col>
                        <v-col cols="3">
                          <h5>Diğer yazım</h5>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir diger yazım ekle"
                            :multiple="true"
                            :options="[]"
                            :taggable="true"
                            :max-height="150"
                            :allow-empty="true"
                            :hide-selected="true"
                            :show-labels="false"
                            @select="onSelect"
                            @tag="(event) => addDigerTag(event)"
                            v-model="editedItem.digeryazim"
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
                        <v-col cols="12">
                          <h6>Maddebaşı Anlamı</h6>
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
                          <label class="typo__label">Kökleri</label>
                          <multiselect
                            tag-placeholder="Yeni olarak ekle"
                            placeholder="Yeni bir kök ekle"
                            :multiple="true"
                            :options="kokenListesi"
                            :taggable="true"
                            :max-height="150"
                            :allow-empty="true"
                            :hide-selected="true"
                            :show-labels="false"
                            @tag="(event) => addTag('kokleri', event)"
                            v-model="editedSubItem.kokleri"
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
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.eserindili"
                            label="Eserin dili"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.eserindonemi"
                            label="Eserin dönemi"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.eserinyili"
                            label="Eserin yılı"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.eserinyazari"
                            label="Eserin yazarı"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.dili"
                            label="Dili"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.kokendili"
                            label="Köken Dili"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.kokeni"
                            label="Kökeni"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-text-field
                            v-model="editedSubItem.sozusoyleyen"
                            label="Sözü söyleyen"
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-textarea
                            auto-grow
                            rows="4"
                            v-model="editedSubItem.bulunduguSayfalar"
                            label="Bulunduğu Sayfalar"
                          />
                        </v-col>
                        <v-col
                          cols="3"
                        >
                          <label class="typo__label">Etimolojik seyri</label>
                          <template v-for="(tarihce, ti) in editedSubItem.tarihcesi">
                            <div :key="ti">
                              {{ ti + 1 }}
                              <v-text-field
                                v-model="tarihce.baslangic"
                                label="Başlangıç"
                              />
                              <v-text-field
                                v-model="tarihce.bitis"
                                label="Başlangıç"
                              />
                              <v-text-field
                                v-model="tarihce.hakimiyet"
                                label="Hakimiyet"
                              />
                              <v-text-field
                                v-model="tarihce.adi"
                                label="Adı"
                              />
                              <v-btn
                                color="secondary blue--text"
                                class="mb-2"
                                @click="editedSubItem.tarihcesi.splice(ti, 1)"
                              >
                                Sil
                              </v-btn>
                            </div>
                          </template>
                          <v-btn
                            color="danger"
                            dark
                            class="mb-2 d-block"
                            @click="editedSubItem.tarihcesi.push({baslangic: '', bitis:'', adi:'', hakimiyet:''})"
                          >
                            Yeni ekle
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="3"
                        >
                          <label class="typo__label">Karşı Maddeler</label>
                          <template v-for="(karsi, ki) in editedSubItem.karsi">
                            <div :key="ki">
                              {{ ki + 1 }}
                              <v-text-field
                                v-model="karsi.dili"
                                label="Dili"
                              />
                              <v-text-field
                                v-model="karsi.madde"
                                label="Madde"
                              />
                              <v-text-field
                                v-model="karsi.anlam"
                                label="Anlam"
                              />
                              <v-text-field
                                v-model="karsi.digeryazım"
                                label="Diger yazım"
                              />
                              <v-btn
                                color="secondary blue--text"
                                class="mb-2"
                                @click="editedSubItem.karsi.splice(ki, 1)"
                              >
                                Sil
                              </v-btn>
                            </div>
                          </template>
                          <v-btn
                            color="danger"
                            dark
                            class="mb-2 d-block"
                            @click="editedSubItem.karsi.push({dili: '', madde:'', anlam:'', digeryazım:[]})"
                          >
                            Yeni ekle
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="3"
                        >
                          <label class="typo__label">Şekiller</label>
                          <template v-for="(sekil, se) in editedSubItem.sekil">
                            <div :key="se">
                              {{ se + 1 }}
                              <v-text-field
                                v-model="sekil.url"
                                label="Url"
                              />
                              <v-text-field
                                v-model="sekil.aciklama"
                                label="Açıklama"
                              />
                              <v-btn
                                color="secondary blue--text"
                                class="mb-2"
                                @click="editedSubItem.sekil.splice(se, 1)"
                              >
                                Sil
                              </v-btn>
                            </div>
                          </template>
                          <v-btn
                            color="danger"
                            dark
                            class="mb-2 d-block"
                            @click="editedSubItem.sekil.push({url: '', aciklama:''})"
                          >
                            Yeni ekle
                          </v-btn>
                        </v-col>
                        <v-col
                          cols="3"
                        >
                          <label class="typo__label">Lokasyon</label>
                          <div>
                            <v-text-field
                              v-model="editedSubItem.location[0]"
                              label="Latitude"
                            />
                            <v-text-field
                              v-model="editedSubItem.location[1]"
                              label="Longitude"
                            />
                          </div>
                        </v-col>
                        <v-col cols="3">
                          <v-switch
                            v-model="
                              editedSubItem.isActive
                            "
                            :label="
                              editedSubItem.isActive
                                ? 'Aktif'
                                : 'Pasif'
                            "
                          />
                        </v-col>
                        <v-col cols="3">
                          <v-select
                            v-model="editedSubItem.kuluckaSectionId.id"
                            :return-object="false"
                            :items="kuluckaSectionList"
                            label="Kulucka Section Id"
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
                      @click="editedIndex === -1 ? save() : saveSub()"
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
          <template #item.createdAt="{ item }">
            <span>
              {{ dateFormatShort(item.createdAt) }}
            </span>
          </template>
          <template #item.updatedAt="{ item }">
            <span>
              {{ dateFormatShort(item.updatedAt) }}
            </span>
          </template>
          <!-- eslint-disable-next-line vue/no-template-shadow -->
          <template #expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              <b-tabs
                class="mt-3"
                content-class="flex-start"
              >
                <b-tab
                  title="Detay 1"
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
                          <v-tooltip right>
                            <template #activator="{ on }">
                              <v-icon
                                color="primary"
                                v-on="on"
                                @click="editSubItem(data)"
                              >
                                mdi-pencil
                              </v-icon>
                            </template>
                            <span>Güncelleme</span>
                          </v-tooltip>
                          <v-tooltip right>
                            <template #activator="{ on }">
                              <v-icon
                                color="primary"
                                v-on="on"
                                :disabled="data && data.item ? data.item.isCheckedOutToMadde:false"
                                @click="mergeSubItem(data)"
                              >
                                mdi-merge
                              </v-icon>
                            </template>
                            <span>Birleştirme</span>
                          </v-tooltip>
                          <v-tooltip right>
                            <template #activator="{ on }">
                              <v-icon
                                v-on="on"
                                color="primary"
                                @click="deleteSubItem(data)"
                              >
                                mdi-delete
                              </v-icon>
                            </template>
                            <span>Silme</span>
                          </v-tooltip>
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
                    <template #cell(isControlled)="data">
                      <span
                        class="checkoutBLock"
                        v-html="data.value"
                      />
                    </template>
                    <template #cell(isCheckedOutToMadde)="data">
                      <span
                        class="checkoutBLock"
                        v-html="data.value"
                      />
                    </template>
                    <template #cell(isActive)="data">
                      <span
                        class="checkoutBLock"
                        v-html="data.value"
                      />
                    </template>
                  </b-table>
                </b-tab>
                <b-tab
                  title="Detay 2"
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
                <b-tab
                  title="Detay 3"
                  class="text-left"
                >
                  <b-table
                    striped
                    small
                    head-variant="light"
                    selectable
                    select-mode="single"
                    @row-selected="onRowSelected"
                    :fields="digerDetaySubFields"
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
  name: 'Kuluckamadde',
  mixins: [helpers],
  data() {
    return {
      expanded: [],
      filter: { madde: '' },
      kuluckasectionlist: [],
      timerId: null,
      dialog: false,
      dialogDelete: false,
      subDialog: false,
      dialogSubDelete: false,
      totalKuluckamaddeler: 0,
      kuluckamaddeler: [],
      loading: true,
      menu1: false,
      menu2: false,
      options: {},
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
          text: 'DIĞER YAZIM',
          align: 'start',
          sortable: false,
          value: 'digeryazim',
        },
        {
          text: 'TOPLAM KAYIT SAYISI',
          align: 'center',
          sortable: false,
          value: 'whichDict.length',
        },
        {
          text: 'SON GUNCELLEME',
          align: 'center',
          sortable: false,
          value: 'updatedAt',
          // formatter: value => (value ? format(parseISO(value), 'dd MMMM yyyy', { locale: turkish }) : ''),
        },
        { text: 'İŞLEMLER', value: 'actions', sortable: false },
      ],
      exportColumn: ['madde', 'whichtDict.anlam', 'whichtDict.dictId.name', 'whichtDict.karsiMaddeId.madde', 'whichtDict.digerMaddeId.madde', 'whichtDict.tur', 'whichtDict.alttur'],
      editedIndex: -1,
      editedItem: {
        id: '', madde: '', digeryazim: [],
      },
      defaultItem: {
        madde: '',
        digeryazim: [],
      },
      editedSubIndex: -1,
      editedSubItem: {
        id: '',
        anlam: '',
        dictId: '',
        tur: [],
        alttur: [],
        tip: [],
        kokleri: [],
        kokeni: '',
        sesDosyasi: '',
        location: [],
        eserindili: '',
        eserindonemi: '',
        eserinyili: '',
        eserinyazari: '',
        esertxt: '',
        dili: '',
        kokendili: '',
        karsi: [],
        sozusoyleyen: '',
        sekil: [],
        tarihcesi: [],
        bulunduguSayfalar: '',
        cinsiyet: [],
        bicim: [],
        sinif: [],
        transkripsiyon: [],
        fonetik: [],
        heceliyazim: [],
        zitanlam: [],
        esanlam: [],
        telaffuz: [],
        kuluckaSectionId: '',
        isControlled: false,
        isDelivered: false,
        userSubmitted: '',
        userConfirmed: '',
        isCheckedOutToMadde: false,
        isActive: false,
      },
      defaultSubItem: {
        id: null,
        anlam: '',
        dictId: '',
        tur: [],
        alttur: [],
        tip: [],
        kokleri: [],
        kokeni: '',
        sesDosyasi: '',
        location: [],
        eserindili: '',
        eserindonemi: '',
        eserinyili: '',
        eserinyazari: '',
        esertxt: '',
        dili: '',
        kokendili: '',
        karsi: [],
        sozusoyleyen: '',
        sekil: [],
        tarihcesi: [],
        bulunduguSayfalar: '',
        cinsiyet: [],
        bicim: [],
        sinif: [],
        transkripsiyon: [],
        fonetik: [],
        heceliyazim: [],
        zitanlam: [],
        esanlam: [],
        telaffuz: [],
        kuluckaSectionId: '',
        isControlled: false,
        isDelivered: false,
        userSubmitted: '',
        userConfirmed: '',
        isActive: false,
        isCheckedOutToMadde: false,
      },
      detayFields: [
        'indeks',
        { key: 'anlam', label: 'Anlam:', formatter: value => (value ? pmd.markdownIt.render(value) : '') },
        { key: 'dictId', label: 'Sözlük:', formatter: value => ((value && value.name) ? value.name : '') },
        { key: 'kuluckaSectionId', label: 'Set:', formatter: value => ((value && value.name) ? value.name : '') },
        { key: 'userSubmitted', label: 'Ekleyen:', formatter: value => ((value && value.email) ? value.email : '') },
        { key: 'userConfirmed', label: 'Kontrolör:', formatter: value => ((value && value.email) ? value.email : '') },
        { key: 'isControlled', label: 'Kontrol edilme:', formatter: value => this.getChecked(value) },
        { key: 'isCheckedOutToMadde', label: 'Birleştirme:', formatter: value => this.getChecked(value) },
        { key: 'isActive', label: 'Durumu:', formatter: value => (value != null ? this.getActive(value) : '') },
      ],
      digerDetayFields: [
        'indeks',
        { key: 'tur', label: 'Tür:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'alttur', label: 'Alt Tür:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'tip', label: 'Tip:', formatter: value => (value ? value.join(', ') : '') },
        { key: 'karsi', label: 'Karşı Maddeler:', formatter: value => (value && value.length ? value.map(k => k.madde).join(', ') : '') },
      ],
      digerDetaySubFields: [
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

    // searchDigerMadde(val) {
    //   if (val == null) return;
    //   const options = {
    //     searchTerm: val,
    //     itemsPerPage: 1000,
    //     searchField: 'madde',
    //   };
    //   clearTimeout(this.timerId);
    //   // delay new call 500ms
    //   this.timerId = setTimeout(() => {
    //     this.isDigerItemLoading = true;
    //     ApiService.setHeader();
    //     ApiService.get('kuluckamadde', this.stringify(options))
    //       .then(async ({ data }) => {
    //         this.searchDigerItems = data.data;
    //         this.isDigerItemLoading = false;
    //       })
    //       .catch(({ message }) => {
    //         console.log(message);
    //         this.isDigerItemLoading = false;
    //       });
    //   }, 500);
    // },
    // searchKarsiMadde(val) {
    //   if (val == null) return;
    //   const options = {
    //     searchTerm: val,
    //     itemsPerPage: 1000,
    //     searchField: 'madde',
    //   };
    //   clearTimeout(this.timerId);
    //   // delay new call 500ms
    //   this.timerId = setTimeout(() => {
    //     this.isKarsiItemLoading = true;
    //     ApiService.setHeader();
    //     ApiService.get('kuluckamadde', this.stringify(options))
    //       .then(async ({ data }) => {
    //         this.searchKarsiItems = data.data;
    //         this.isKarsiItemLoading = false;
    //       })
    //       .catch(({ message }) => {
    //         console.log(message);
    //         this.isKarsiItemLoading = false;
    //       });
    //   }, 500);
    // },
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
    kuluckaSectionList() {
      if (this.kuluckasectionlist.length === 0) {
        this.kuluckasectionLoad();
      }
      const a = this.kuluckasectionlist.map(
        (section => ({
          text: `${section.dictId.name} ${section.name}`,
          value: section.id,
        })),
      );
      return a;
    },
  },
  created() {
    this.$store.dispatch(SET_BREADCRUMB, [{ title: 'Kuluçka Maddebaşları' }]);
    this.getDataFromApi();
    this.kuluckasectionLoad();
  },
  methods: {
    onRowSelected(item) {
      console.log('items:', item);
      // this.selected = items;
      this.editedIndex = this.kuluckamaddeler.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    kuluckasectionLoad() {
      const options = {
        itemsPerPage: 1000,
      };
      this.isDigerItemLoading = true;
      ApiService.setHeader();
      ApiService.get('kuluckasection', this.stringify(options))
        .then(async ({ data }) => {
          this.kuluckasectionlist = data.data;
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage(error);
        });
    },
    getChecked(item) {
      return this.getFormatter(item, 'Yapılmadı', 'Yapıldı');
    },
    getActive(item) {
      return this.getFormatter(item, 'Pasif', 'Aktif');
    },
    getFormatter(value, option1, option2) {
      if (typeof value !== 'undefined') {
        const status = {
          false: {
            title: option1,
            state: 'danger',
          },
          true: {
            title: option2,
            state: 'success',
          },
        };
        return (
          `<span class="label label-${
            status[value].state
          } label-dot mr-2"></span><span class="font-weight-bold text-${
            status[value].state
          }">${
            status[value].title
          }</span>`
        );
      }
    },
    // karsiChanged(val) {
    //   if (val == null) {
    //     this.searchKarsiItems = [];
    //   }
    // },

    // digerChanged(val) {
    //   if (val == null) {
    //     this.searchDigerItems = [];
    //   }
    // },

    customLabel(item) {
      if (typeof (item) === 'object') {
        return `${item.text}`;
      }
      return `${item}`;
    },
    addDigerTag(newTag) {
      this.editedItem.digeryazim.unshift(newTag);
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
      this.editedIndex = this.kuluckamaddeler.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.kuluckamaddeler.indexOf(item);
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
      this.editedIndex = this.kuluckamaddeler.indexOf(parent);
      this.editedItem = Object.assign({}, parent);
      this.editedSubItem = Object.assign({}, this.defaultSubItem);
      this.editedSubIndex = -1;
      this.subDialog = true;
    },
    editSubItem(item) {
      if (item != null) {
        this.editedSubIndex = this.kuluckamaddeler[this.editedIndex].whichDict.indexOf(item.item);
        if (item.item.dictId && item.item.dictId.id) {
          const dictId = item.item.dictId.id;
          item.item.dictId = dictId;
        }
        this.editedSubItem = Object.assign({}, item.item);
        // if (item.item.karsiMaddeId && item.item.karsiMaddeId.id) {
        //   this.searchKarsiItems = [{ id: item.item.karsiMaddeId.id, madde: item.item.karsiMaddeId.madde }];
        // }
        // if (item.item.digerMaddeId && item.item.digerMaddeId.id) {
        //   this.searchDigerItems = [{ id: item.item.digerMaddeId.id, madde: item.item.digerMaddeId.madde }];
        // }
      }

      this.subDialog = true;
    },
    mergeSubItem(item) {
      console.log('item:', item);
      const payload = {};
      payload.id = item.item.id;
      this.saveData(`kuluckamadde/submadde-merge/${this.editedItem.id}`, payload);
      setTimeout(() => {
        this.getDataFromApi();
      }, 500);
    },
    deleteSubItem(item) {
      this.editedSubIndex = this.kuluckamaddeler[this.editedIndex].whichDict.indexOf(item.item);
      this.editedSubItem = Object.assign({}, item.item);
      this.dialogSubDelete = true;
    },

    deleteItemConfirm() {
      this.kuluckamaddeler.splice(this.editedIndex, 1);
      this.deleteData('kuluckamadde', this.editedItem.id);
      this.closeDelete();
    },

    deleteSubItemConfirm() {
      this.kuluckamaddeler[this.editedIndex].whichDict.splice(this.editedSubIndex, 1);
      this.deleteSubData('kuluckamadde/submadde', this.editedItem.id, this.editedSubItem.id);
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
          this.kuluckamaddeler[this.editedIndex],
          this.editedItem,
        );
        console.log('update.');
        this.updateData('kuluckamadde/headonly', this.editedItem.id, payload);
      } else {
        delete this.editedItem.id;
        payload = this.editedItem;
        delete this.editedSubItem.id;
        delete this.editedSubItem.isCheckedOutToMadde;
        // if (!this.editedSubItem.digerMaddeId) {
        //   delete this.editedSubItem.digerMaddeId;
        // }
        // if (!this.editedSubItem.karsiMaddeId) {
        //   delete this.editedSubItem.karsiMaddeId;
        // }
        if (!this.editedSubItem.userConfirmed) {
          delete this.editedSubItem.userConfirmed;
        }
        if (!this.editedSubItem.userSubmitted) {
          this.editedSubItem.userSubmitted = this.currentUser.id;
        }
        payload.whichDict = [this.editedSubItem];
        console.log('save.');
        this.saveData('kuluckamadde', payload);
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
        isActive: this.editedSubItem.isActive,
        kokeni: this.editedSubItem.kokeni,
        kokleri: this.editedSubItem.kokleri,
        sesDosyasi: this.editedSubItem.sesDosyasi,
        location: this.editedSubItem.location,
        eserindili: this.editedSubItem.eserindili,
        eserindonemi: this.editedSubItem.eserindonemi,
        eserinyili: this.editedSubItem.eserinyili,
        eserinyazari: this.editedSubItem.eserinyazari,
        esertxt: this.editedSubItem.esertxt,
        dili: this.editedSubItem.dili,
        kokendili: this.editedSubItem.kokendili,
        karsi: this.editedSubItem.karsi,
        sozusoyleyen: this.editedSubItem.sozusoyleyen,
        sekil: this.editedSubItem.sekil,
        tarihcesi: this.editedSubItem.tarihcesi,
        bulunduguSayfalar: this.editedSubItem.bulunduguSayfalar,
        kuluckaSectionId: this.editedSubItem.kuluckaSectionId.id,
        // userConfirmed: this.editedSubItem.userConfirmed,
        // userSubmitted: this.editedSubItem.userSubmitted,
      };
      console.log(payload);
      // payload = this.removeEmpty(payload);
      if (this.editedSubIndex > -1) {
        Object.assign(
          this.kuluckamaddeler[this.editedIndex].whichDict[this.editedSubIndex],
          this.editedSubItem,
        );
        console.log('update sub.');
        payload.id = this.editedSubItem.id;

        // if (this.editedSubItem.digerMaddeId && this.editedSubItem.digerMaddeId.id) {
        //   payload.digerMaddeId = this.editedSubItem.digerMaddeId.id;
        // }

        // if (this.editedSubItem.karsiMaddeId && this.editedSubItem.karsiMaddeId.id) {
        //   payload.karsiMaddeId = this.editedSubItem.karsiMaddeId.id;
        // }

        if (this.editedSubItem.userConfirmed && this.editedSubItem.userConfirmed.id) {
          payload.userConfirmed = this.currentUser.id; // overwrite user confirmations
        } else if (!this.editedSubItem.userConfirmed) {
          delete payload.userConfirmed;
        }

        if (this.editedSubItem.userSubmitted && this.editedSubItem.userSubmitted.id) {
          payload.userSubmitted = this.editedSubItem.userSubmitted.id;
        } else if (!this.editedSubItem.userConfirmed) {
          payload.userSubmitted = this.currentUser.id;
        }

        // eslint-disable-next-line no-nested-ternary
        payload.dictId = (this.editedSubItem.dictId && this.editedSubItem.dictId.id) ? this.editedSubItem.dictId.id : this.editedSubItem.dictId ? this.editedSubItem.dictId : '';
        this.updateData('kuluckamadde/submadde', this.editedItem.id, payload);
      } else {
        console.log('save sub.');
        // if (this.editedSubItem.digerMaddeId) {
        //   payload.digerMaddeId = this.editedSubItem.digerMaddeId;
        // }
        // if (this.editedSubItem.karsiMaddeId) {
        //   payload.karsiMaddeId = this.editedSubItem.karsiMaddeId;
        // }
        if (this.editedSubItem.userConfirmed && this.editedSubItem.userConfirmed.id) {
          payload.userConfirmed = this.currentUser.id; // overwrite user confirmations
        } else if (!this.editedSubItem.userConfirmed) {
          delete payload.userConfirmed;
        }
        if (!this.editedSubItem.userSubmitted) {
          payload.userSubmitted = this.currentUser.id;
        }
        payload.dictId = (this.editedSubItem.dictId) ? this.editedSubItem.dictId : '';
        let newpayload;
        // this.kuluckamaddeler.push(this.editedItem);
        let url = 'kuluckamadde';
        if (this.editedItem.id) {
          payload.digeryazim = this.editedItem.digeryazim;
          newpayload = payload;
          url = `${url}/submadde/${this.editedItem.id}`;
        } else {
          newpayload = { madde: this.editedItem.madde, digeryazim: this.editedItem.digeryazim, whichDict: [payload] };
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
      const that = this;
      return new Promise((resolve, reject) => {
        ApiService.setHeader();
        ApiService.get('kuluckamadde', this.stringify(this.options))
          .then(async ({ data }) => {
            try {
              this.kuluckamaddeler = data.data;
              this.totalKuluckamaddeler = data.meta.total;
              this.loading = false;
              resolve(this.kuluckamaddeler);
            } catch (error) {
              that.loading = false;
              reject(error.message);
            }
          })
          .catch((error) => {
            this.errorMessage(error);
            that.loading = false;
            reject(error);
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
