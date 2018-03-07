<template lang="html">

  <binput :value="value" @input="on_input" @change="on_change" :name="name" :mask="mask"
    :id="id" :placeholder="placeholder" :type="type" :label="label" :iLeft="iLeft" :iRight="iRight"
    :col="col" :error="error" :success="success" :help="help" :tooltip="tooltip" :shortkey="shortkey"
    :maxlength="maxlength" :tooltipLoading="tooltipLoading" :tooltipTrigger="tooltipTrigger" :tooltipShow="tooltipShow"
    :horizontal="horizontal" :readonly="readonly" :disabled="disabled" :required="required" :modId="modId" :size="size" :tabindex="tabindex"
  >
    <bbutton :id="moddedId + '_datepicker'" @click="open"  ref="datepicker" slot="right" color="info" i="calendar"/>
  </binput>

</template>

<script>
import flatpickr from "flatpickr";
import { mixin as focusMixin }  from 'vue-focus';
import { Portuguese } from "flatpickr/dist/l10n/pt.js"

export default {
  mixins: [ focusMixin ],
  data(){
    return {
      moddedId: null,
      picker: null,
      shortkey_trated: ['aaaaaaaa'],
    }
  },
  props:{
    value:          null,
    name:           null,
    id:             null,
    placeholder:    null,
    type:           null,
    label:          null,
    iLeft:          null,
    iRight:         null,
    col:            null,
    error:          null,
    success:        null,
    help:           null,
    tooltip:        null,
    shortkey:        null,
    maxlength:      {default: '-1', type: String},
    tooltipLoading: {default: 'AJUDA', type: String},
    mask:           {default: '##/##/####', type: String},
    tooltipTrigger: {default: 'hover', type: String},
    tooltipShow:    {default: false, type: Boolean},
    horizontal:     {default: false, type: Boolean},
    readonly:       {default: false, type: Boolean},
    disabled:       {default: false, type: Boolean},
    required:       {default: false, type: Boolean},
    modId:          {default: '', type: String},
    size:           {default: 'normal', type: String},
    tabindex:       {default: '-1', type: String},
  },
  created(){
    if(this.shortkey){
      this.shortkey_trated = this.shortkey
    }
  },
  mounted(){
    this.moddedId = this.id + String(this.modId)

    var self = this

    this.picker = flatpickr(this.$el, {
      dateFormat: "dmY",
      clickOpens: false,
      "locale": Portuguese,
      onChange: function(selectedDates, dateStr) {
        self.on_input(dateStr)
      }
    });
  },
  methods:{
    open(){
      this.picker.toggle()
    },

    on_focus(){
      this.$store.commit('SET_FOCUS', this.moddedId)
    },

    on_keyup(e){
      if(e.key==="Enter"){
        this.$emit('enter')
      }
    },

    on_input(e){
      this.$emit('input', e)
    },

    on_change(e){
      this.$emit('change', e)
    },

    get_tooltip(){
      if (this.tooltip){
        return this.tooltip
      } else if (!this.$loading.isLoading('AJUDA') && this.id && this.$store.state.helper.helps[this.id] && this.$store.state.helper.helps[this.id].tooltip){
        return this.$store.state.helper.helps[this.id].tooltip
      }
      return false;
    },

    get_help(){
      if (this.help){
        return this.help
      } else if (!this.$loading.isLoading('AJUDA') && this.id && this.$store.state.helper.helps[this.id] && this.$store.state.helper.helps[this.id].help){
        return this.$store.state.helper.helps[this.id].help
      }
      return false;
    },

    get_addon(){
      if (!this.$loading.isLoading('AJUDA') && this.id && this.$store.state.helper.helps[this.id] && this.$store.state.helper.helps[this.id]){
        return this.$store.state.helper.helps[this.id].addon
      }
      return false;
    },

    showIconRight(){
        if(this.iRight){
          return true
        } else if(this.errors && this.errors[this.name]){
          return true
        }

        return false
    },

    showAddons(){
      if (this.showRight()) {
        return true
      } else if (this.showLeft()) {
        return true
      } else if (this.get_addon()) {
        return true
      }

      return false
    },

    showRight(){
      if (this.$slots['right']) {
        return true
      } else if (this.get_addon()) {
        return true
      }

      return false
    },

    showLeft(){
      if (this.$slots['left']) {
        return true
      }

      return false
    },

    collumns() {
      if(this.col){
        return 'is-' + this.col;
      }
      return null
    }
  },
  computed: {
    focusState(){
      if(this.$store.state.helper.focus==this.moddedId){
        return true
      }

      return false
    },

    errors() {
      if (this.name) {
        return this.$store.state.helper.form.erros
      }

      return false
    }
  }
}
</script>

<style lang="stylus">
@import '~flatpickr/src/style/flatpickr'
</style>
