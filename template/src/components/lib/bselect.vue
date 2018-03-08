helps<lixo lang="html">
  <div class="column" :class="collumns()">
    <label class="label" v-if="label">
      {{label}}

      <atooltip inline trigger="click" v-if="required">

        &nbsp
        <span slot="tooltip">
          Campo obrigatorio
        </span>

        <icon i="exclamation-circle" />
      </atooltip>

      <atooltip inline trigger="click" v-if="get_addon()">

        &nbsp
        <span slot="tooltip">
          {{get_addon()}}
        </span>

        <icon i="question-circle" />
      </atooltip>
    </label>

    <div class="field" :class="[{'has-addons': showAddons()}, {'is-horizontal': horizontal}]">

      <div class="control " v-if="showLeft()">
        <abuttons ref="left">
          <slot name="left"></slot>
        </abuttons>
      </div>

      <div :class="['control multiselect', 'is-'+ size, {'has-icons-left': iLeft}, {'has-icons-right': showIconRight()}]">

        <atooltip :loading="tooltipLoading" :trigger="tooltipTrigger" :show="tooltipShow" v-if="get_tooltip()">
          <div slot="tooltip">
            {{get_tooltip()}}
          </div>

          <multiselect :disabled="disabled" :value="value" @input="on_input" @open="on_focus" :options="optionsTreated" track-by="value"
            label="label" :loading="$loading.isLoading(loading)" :tabindex="tabindexTreated" v-focus="focusState"
            deselect-label="<enter> para remover" :placeholder="placeholder" select-label="<enter> para selecionar" selected-label="Selecionado"
            @search-change="$emit('search-change', $event[0])" v-shortkey.focus="shortkey_trated"
            :class="['is-' + size, {'is-danger': error}, {'is-success': success}, {'is-danger': errors && errors[name]}]"
          >
          <span slot="noResult">Nenhuma opção encontrada</span>
        </multiselect>

        </atooltip>

        <multiselect :disabled="disabled" :value="value" @input="on_input" @open="on_focus" v-focus="focusState" :options="optionsTreated" track-by="value" label="label"
          :loading="$loading.isLoading(loading)"
          deselect-label="<enter> para remover" :placeholder="placeholder" select-label="<enter> para selecionar" selected-label="Selecionado"
          @search-change="$emit('search-change', $event[0])"  :tabindex="tabindexTreated"
          :class="['is-' + size, {'is-danger': error}, {'is-success': success}, {'is-danger': errors && errors[name]}]"
        v-else>
        <span slot="noResult">Nenhuma opção encontrada</span>
      </multiselect>

        <span class="icon is-left" :class="['is-' + size]" v-if="iLeft">
          <icon :i="iLeft"/>
        </span>

        <span class="icon is-right" :class="['is-' + size]" v-if="showIconRight()">
          <icon :i="iRight" v-if="iRight" />

          <icon style="color: red;" i="exclamation-triangle" v-if="errors && errors[name]" />
        </span>

      </div>

      <div class="control" v-if="showRight()">
        <abuttons ref="right">
          <slot name="right"></slot>
        </abuttons>
      </div>

    </div>

    <p class="help" v-if="get_help()">{{get_help()}}</p>

    <p class="help is-danger" v-if="error">{{error}}</p>

    <span v-if="errors && errors[name]">
      <p class="help is-danger"  v-for="error in errors[name]">{{error}}</p>
    </span>

  </div>
</lixo>

<script>
import { mixin as focusMixin }  from 'vue-focus';
import Multiselect from 'vue-multiselect'

export default {
  render(h) {
    // creating the used vars
    var parent_tag = 'div';
    var parent_data = {};
    var content = [];

    var props = {}
    var data = []
    var internal = []

    // create the most external class object
    parent_data.class = [
      'column',
      this.collumns()
    ]

    // If needed, create the structure for label
    if(this.label){
      data = [this.label]

      // If is required, create the element with tooltip
      if(this.required){
        props = {props: {trigger: 'click', inline: true}}

        internal = []
        internal.push(h('span', {slot: 'tooltip'}, 'Campo obrigatorio'))
        internal.push(h('icon', {style: 'margin-left: 5px', slot: 'default', props: {i: "exclamation-circle"}}, ''))

        data.push(
          h('btooltip', props, internal)
        )
      }

      // If this has a addon help, create with tooltip
      if(this.get_addon()){
        props = {props: {trigger: 'click', inline: true}}

        internal = []
        internal.push(h('span', {slot: 'tooltip'}, this.get_addon()))
        internal.push(h('icon', {style: 'margin-left: 5px', slot: 'default', props: {i: "question-circle"}}, ''))

        data.push(
          h('btooltip', props, internal)
        )
      }

      // After build the label and it's content, push it to the overall content var
      content.push(
        h('label', {class: 'label'}, data)
      )

      data = []
    }

    // Check if anything in the left of the input, and build it
    if(this.showLeft()){
      props = {}

      data.push(
        h('bbuttons', {class: 'control'}, this.$slots.left)
      )
    }

    // Create the array for the vue components for the input itself
    var inputArray = []

    // Build the class, binds the data, the directives if any and the events for the input
    var inputData = {
      class:[
        'is-' + this.size,
        {'is-danger': this.error},
        {'is-success': this.success},
        {'is-danger': this.errors && this.errors[this.name]}
      ],
      attrs: {
        maxlength: this.maxlength,
        disabled: this.disabled,
        value: this.value,
        id: this.moddedId,
        placeholder: this.placeholder,
        name: this.name,
        type: this.type,
        tabindex: this.tabindexTreated,
      },
      props: {
        options: this.optionsTreated,
        trackBy: 'value',
        label: 'label',
        loading: this.$loading.isLoading(this.loading),
        selectLabel: this.selectLabel,
        selectedLabel: this.selectedLabel,
        deselectLabel: this.deselectLabel,
      },
      directives:[
        {
          name: "focus",
          value: this.focusState
        }
      ]
    }

    // if any shortkey, put the directive
    if (this.shortkey){
      inputData.directive.push({
        name: 'shortkey',
        arg: 'focus',
        value: this.shortkey
      })
    }

    var self = this
    // bind the events with the functions
    inputData.on = {
      input(e){
        self.on_input(e)
      },

      shortkey(){
        self.on_shortkey()
      },

      open(){
        self.on_focus()
      },

      searchChange($event){
        self.$emit('search-change', $event[0])
      }
    }

    var noResult = [h('span', {slot: 'noResult'}, 'Nenhuma opção encontrada')]

    // Create the input
    inputArray.push(
      h('multiselect', inputData, noResult)
    )

    // add the left if exists
    if(this.iLeft){
      var iconLeft = [h('icon', {props: {i: this.iLeft}}, '')]

      inputArray.push(
        h('span', { class: [ 'icon is-left is-' + this.size ] }, iconLeft)
      )
    }

    //add the internal icon on the right
    if(this.showIconRight()){
      var iRight = []

      if(this.iRight){
        iRight.push(
          h('icon', {props: {i: this.iRight}}, '')
        )
      }

      // if there's a error on the validation, add a icon
      if(this.errors && this.errors[this.name]){
        iRight.push(
          h('icon', {props: {i: 'exclamation-triangle', danger: true}}, '')
        )
      }

      inputArray.push(
        h('span', { style: 'color: red', class: [ 'icon is-right is-' + this.size ] }, iRight)
      )
    }

    // If a tooltip exists for this input, create it, and put the content inside
    if(this.get_tooltip()){
      var inputArray_holder = inputArray
      inputArray = []

      var tooltipData = {
        props: {
          loading: this.tooltipLoading,
          trigger: this.tooltipTrigger,
          show: this.tooltipShow
        }
      }

      var slotTooltip = [h('div', {slot: 'tooltip'}, this.get_tooltip())]
      slotTooltip.push(
        h('template', {slot: 'default'}, inputArray_holder)
      )

      inputArray.push(
        h('btooltip', tooltipData, slotTooltip)
      )
    }

    // the input holder element
    data.push(
      h('div', {class: [
        'control multiselect',
        {'is-loading': this.$loading.isLoading(this.loading)},
        {'has-icons-left': this.iLeft},
        {'has-icons-right': this.showIconRight()}
      ]}, inputArray)
    )

    //add elements on the right
    if(this.showRight()){
      props = {}

      data.push(
        h('bbuttons', {class: 'control'}, this.$slots.right)
      )
    }

    props = {}

    props.class = [
      'field',
      {'has-addons': this.showAddons()},
      {'is-horizontal': this.horizontal},
    ]
    content.push(
      h('div', props, data)
    )

    // If there's a help text, it will add the p with it
    if (this.get_help()){
      content.push(
        h('p', {class: ['help']}, this.get_help())
      )
    }

    // If there's a error text, it will add the p with it
    if (this.error){
      content.push(
        h('p', {class: ['help is-danger']}, this.error)
      )
    }

    // If there's a errors, it will add several P's with it
    if (this.errors && this.errors[this.name]){
      for (var i = 0; i < this.errors[this.name].length; i++) {
        var erro = this.errors[this.name][i]

        content.push(
          h('p', {class: ['help is-danger']}, erro)
        )
      }
    }

    return h(parent_tag, parent_data, content);
  },

  components: { Multiselect },
  mixins: [ focusMixin ],
  data(){
    return {
      moddedId: null,
      tabindexTreated: -1,
      shortkey_trated: ['aaaaaaaa'],
    }
  },
  props:{
    value:          null,
    name:           null,
    id:             null,
    placeholder:    {default: "- Selecione -", type: String},
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
    options:        null,
    maxlength:      {default: '-1', type: String},
    loading:        {default: 'INDEFINIDO', type: String},
    tooltipLoading: {default: 'AJUDA', type: String},
    tooltipTrigger: {default: 'hover', type: String},
    selectLabel:    {default: '<enter> para selecionar', type: String},
    selectedLabel:  {default: 'Selecionado', type: String},
    deselectedLabel:  {default: '<enter> para remover', type: String},
    tooltipShow:    {default: false, type: Boolean},
    horizontal:     {default: false, type: Boolean},
    readonly:       {default: false, type: Boolean},
    disabled:       {default: false, type: Boolean},
    required:       {default: false, type: Boolean},
    modId:          {default: '', type: String},
    size:           {default: 'normal', type: String},
    tabindex:       null,
  },
  created(){
    if(this.shortkey){
      this.shortkey_trated = this.shortkey
    }
    if(this.tabindex){
      this.tabindexTreated = parseInt(this.tabindex)
    }
  },
  mounted(){
    this.moddedId = this.id + String(this.modId)
  },
  methods:{
    on_focus(){
      this.$store.commit('SET_FOCUS', this.moddedId)
    },

    on_keyup(e){
      if(e.key==="Enter"){
        this.$emit('enter')
      }
    },

    on_input(e){
      this.$emit('input', e.value)
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
      if (!this.$loading.isLoading('AJUDA') && this.id && this.$store.state.helper.helps[this.id] && this.$store.state.helper.helps[this.id].addon){
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
    optionsTreated(){
      var retorno = []

      if(!this.options) {
        return retorno
      }

      for (var i = 0; i < this.options.length; i++) {
        var option = this.options[i]

        if (typeof(option)==="object"){
          retorno.push(option)

        } else {
          retorno.push({value: option, label: option})

        }
      }

      return retorno;
    },

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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="scss" >
@import '../../../node_modules/bulma/bulma.sass';

  div.multiselect.is-danger .multiselect__tags{
    border-color: $danger;
  }

  .multiselect.is-small{
    height: 24px;
  }

  div.multiselect{
    min-height: 0px;
    height: 2.25em;
    // height:36px;
  }

  .multiselect__tags:hover{
    border-color: #b5b5b5;
  }

  div.multiselect__tags{
    border-color: #dbdbdb;
    border-radius: 3px;
    min-height: 0px;
    height: 2.25rem;
    padding-bottom: calc(0.375em - 1px);
    padding-left: calc(0.625em - 1px);
    padding-right: 40px;
    padding-top: calc(0.375em - 1px);
  }

  div.multiselect.is-small .multiselect__tags{
    height: 27px;
    padding-bottom: 1px;
    padding-left: 2px;
    padding-top: 3px;
    padding-right: 40px;
  }

  div.multiselect.is-large .multiselect__tags{
    height: 54px;
    padding-bottom: 1px;
    padding-left: 2px;
    padding-top: 3px;
    padding-right: 40px;
  }

  div.multiselect.is-small .multiselect__input{
    height: 1px;
  }

  div.multiselect.is-small  .multiselect__input, div.multiselect.is-small .multiselect__single{
    font-size: $size-small
  }

  div.multiselect.is-small  .multiselect__input, div.multiselect.is-small .multiselect__single{
    font-size: $size-large
  }

  div.multiselect.is-small .multiselect__select{
      padding-right: 1px;
      padding-left: 1px;
      padding-top: 1px;
      padding-bottom: 1px;
      height: 26px;
      width: 26px;
  }

  div.multiselect.is-large .multiselect__select{
      padding-right: 1px;
      padding-left: 1px;
      padding-top: 1px;
      padding-bottom: 1px;
      height: 54px;
      width: 54px;
  }

  div.multiselect__tags input{
    margin: 0px;
    padding-top: 2px;
    // height: 2.25em;
  }

  .is-large div.multiselect__tags input{
    height: 46px;
    font-size: 24px;
  }

  div.multiselect__spinner {
    height: 2.25em;
  }

   div.multiselect__select{
     height: 2.25em;
   }

   div.control.multiselect .is-large .multiselect__select::before{
     top: 55%;
   }

  .multiselect, .multiselect__input, .multiselect__single {
    font-size: 16px;
    color: #363636;
  }

  .multiselect .icon.is-right.is-small{
    padding-right: 24px;
  }
  .multiselect .icon.is-right.is-large{
    padding-right: 54px;
  }
</style>
