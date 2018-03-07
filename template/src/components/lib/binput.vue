<script>
import { mixin as focusMixin }  from 'vue-focus';
import {mask} from 'vue-the-mask'
import {VMoney} from 'v-money'

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
        'input',
        'is-' + this.size,
        {'is-danger': this.error},
        {'is-success': this.success},
        {'is-danger': this.errors && this.errors[this.name]}
      ],
      attrs: {
        maxlength: this.maxlength,
        disabled: this.disabled,
        readonly: this.readonly,
        value: this.value,
        id: this.moddedId,
        placeholder: this.placeholder,
        name: this.name,
        type: this.type,
        tabindex: this.tabindex,
      },
      directives:[
        {
          name: "focus",
          value: this.focusState
        }
      ]
    }

    // if using mask, put the directive by vueTheMask
    if(this.mask){
      inputData.directives.push({
        name: 'mask',
        value: this.mask,
      })
      // if using money, put the directive by vMoney
    } else if(this.money){
      inputData.directives.push({
        name: 'money',
        value: this.moneyFormat,
      })
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

      change(e){
        self.on_change(e)
      },

      focus(){
        self.on_focus()
      },

      blur(){
      },

      shortkey(){
        self.on_shortkey()
      },

      keyup(e){
        e.stopPropagation()
        e.preventDefault()
        self.on_keyup
      }
    }

    // Create the input
    inputArray.push(
      h('input', inputData, '')
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
        'control',
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

  directives: {mask, money: VMoney},
  mixins: [ focusMixin ],
  data(){
    return {
      moddedId: null,
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
    mask:           null,
    tooltip:        null,
    shortkey:       null,
    money:    {default: false, type: Boolean},
    moneyFormat:    { type: Object, default: function () { return {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: '',
      precision: 2,
      masked: false /* doesn't work with directive */
    } } },
    maxlength:      {default: '-1', type: String},
    tooltipLoading: {default: 'AJUDA', type: String},
    loading:        {default: 'AJUDA', type: String},
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
      if(this.mask){
        if(!e.isTrusted){
          this.$emit('input', e.target.value)
        }
      } else if (this.money) {
        // Do nothing for only changes in on_change.
      }else {
        this.$emit('input', e.target.value)
      }
    },

    on_change(e){
      // console.log(this.moneyFormat.precision)
      if(this.money){
        this.$emit('input', this.unformat(e.target.value, this.moneyFormat.precision))
      }
    },

    unformat(input, precision) {
      var negative = input.indexOf('-') >= 0 ? -1 : 1
      var numbers = this.toStr(input).replace(/\D+/g, '') || '0'
      var currency = this.numbersToCurrency(numbers, precision)
      return parseFloat(currency) * negative
    },

     numbersToCurrency (numbers, precision) {
      var exp = Math.pow(10, precision)
      var float = parseFloat(numbers) / exp
      return float.toFixed(this.fixed(precision))
    },

    toStr (value) {
      return value ? value.toString() : ''
    },

    fixed (precision) {
      return Math.max(0, Math.min(precision, 20))
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
      }

      return false
    },

    showRight(){
      if (this.$slots['right']) {
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
  },
}
</script>

<style lang="css">
</style>
