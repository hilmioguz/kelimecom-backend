<template>
  <div :dir="rtl ? 'rtl' : 'ltr'">
    <div>
      <treeselect
        name="demo"
        :multiple="multiple"
        :clearable="clearable"
        :searchable="searchable"
        v-model="value"
        :disabled="disabled"
        :open-on-click="openOnClick"
        :open-on-focus="openOnFocus"
        :clear-on-select="clearOnSelect"
        :close-on-select="closeOnSelect"
        :always-open="alwaysOpen"
        :append-to-body="appendToBody"
        :options="options"
        :limit="3"
        :max-height="200"
      />
      <div class="mt-5">
        Selected: <strong>{{ value }}</strong>
      </div>
    </div>
    <div class="mt-5">
      <div>
        <b-form-checkbox
          v-model="multiple"
          class="custom-control-inline"
        >
          Multi-select
        </b-form-checkbox>
        <b-form-checkbox
          v-model="clearable"
          class="custom-control-inline"
        >
          Clearable
        </b-form-checkbox>
        <b-form-checkbox
          v-model="searchable"
          class="custom-control-inline"
        >
          Searchable
        </b-form-checkbox>
        <b-form-checkbox
          v-model="disabled"
          class="custom-control-inline"
        >
          Disabled
        </b-form-checkbox>
      </div>
      <div>
        <b-form-checkbox
          v-model="openOnClick"
          class="custom-control-inline"
        >
          Open on click
        </b-form-checkbox>
        <b-form-checkbox
          v-model="openOnFocus"
          class="custom-control-inline"
        >
          Open on focus
        </b-form-checkbox>
      </div>
      <div>
        <b-form-checkbox
          v-model="clearOnSelect"
          class="custom-control-inline"
        >
          Clear on select
        </b-form-checkbox>
        <b-form-checkbox
          v-model="closeOnSelect"
          class="custom-control-inline"
        >
          Close on select
        </b-form-checkbox>
      </div>
      <div>
        <b-form-checkbox
          v-model="alwaysOpen"
          class="custom-control-inline"
        >
          Always open
        </b-form-checkbox>
        <b-form-checkbox
          v-model="appendToBody"
          class="custom-control-inline"
        >
          Append to body
        </b-form-checkbox>
        <b-form-checkbox
          v-model="rtl"
          class="custom-control-inline"
        >
          RTL mode
        </b-form-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Treeselect2',
  data: () => ({
    multiple: true,
    clearable: true,
    searchable: true,
    disabled: false,
    openOnClick: true,
    openOnFocus: false,
    clearOnSelect: true,
    closeOnSelect: false,
    alwaysOpen: false,
    appendToBody: false,
    rtl: false,
    value: [],
    options: [
      {
        id: 'fruits',
        label: 'Fruits',
        children: [
          {
            id: 'apple',
            label: 'Apple 🍎',
            isNew: true,
          },
          {
            id: 'grapes',
            label: 'Grapes 🍇',
          },
          {
            id: 'pear',
            label: 'Pear 🍐',
          },
          {
            id: 'strawberry',
            label: 'Strawberry 🍓',
          },
          {
            id: 'watermelon',
            label: 'Watermelon 🍉',
          },
        ],
      },
      {
        id: 'vegetables',
        label: 'Vegetables',
        children: [
          {
            id: 'corn',
            label: 'Corn 🌽',
          },
          {
            id: 'carrot',
            label: 'Carrot 🥕',
          },
          {
            id: 'eggplant',
            label: 'Eggplant 🍆',
          },
          {
            id: 'tomato',
            label: 'Tomato 🍅',
          },
        ],
      },
    ],
  }),

  watch: {
    multiple(newValue) {
      if (newValue) {
        this.value = this.value ? [this.value] : [];
      } else {
        this.value = this.value[0];
      }
    },
  },
};
</script>
