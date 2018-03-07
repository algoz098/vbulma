<script>
import { mixin as focusMixin }  from 'vue-focus';

export default {

  render(h){
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

    // creating the buttons mimic radio/checkbox
    var buttonArray = []
    var buttonsArray = []

    // add the left icon
    if(this.iLeft){
      buttonArray.push(
        h('bbutton', {props: {
          'size': this.size,
          color: 'info',
          outlined: true,
          disabled: true,
          i: this.iLeft
        }}, null)
      )
    }

    // Create the buttons inside options object
    var self = this

    for (var i = 0; i < this.options.length; i++) {
      var item = this.options[i]

      var itemData = {
        props:{
          color: this.color(item.value),
          size: this.size,
          i: this.icon(item.value),
          noTooltip: true,
          label: item.label,
          id: this.getId(i),
          disabled: this.disabled,
          readonly: this.readonly,
          tabindex: this.tabindex,
          click: item.value
        },
        on:{
          click(e){
            self.on_input(e)
          },

          focus(){
            self.on_focus()
          }
        }
      }

      buttonArray.push(
        h('bbutton', itemData, null)
      )
    }


    //create the right icon
    if(this.iRight){
      buttonArray.push(
        h('bbutton', {props: {
          'size': this.size,
          color: 'info',
          outlined: true,
          disabled: true,
          i: this.iRight
        }}, null)
      )
    }

    // create the error icon
    if(this.errors && this.errors[this.name]){
      buttonArray.push(
        h('bbutton', {props: {
          'size': this.size,
          color: 'danger',
          outlined: true,
          disabled: true,
          i: 'exclamation-triangle'
        }}, null)
      )
    }

    // put all buttons together
    buttonsArray.push(
      h('bbuttons', {}, buttonArray)
    )

    //add a tooltip around
    if(this.get_tooltip()){
      var buttonsArray_holder = buttonsArray
      buttonsArray = []

      var tooltipData = {
        props:{
          loading: this.tooltipLoading,
          triger: this.tooltipTrigger,
          inline: true,
          show: this.tooltipShow
        }
      }

      buttonsArray.push(
        h('div', {slot:'tooltip'}, this.get_tooltip())
      )

      buttonsArray.push(
        h('div', {slot:'default'}, buttonsArray_holder)
      )

      data.push(
        h('btooltip', tooltipData, buttonsArray)
      )
    } else {
      data = buttonsArray
    }

    content.push(
      h('div', {class: [
        'field',
        {'has-addons': this.showAddons()},
        {'is-horizontal': this.horizontal}
      ]}, data)
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

    return h(parent_tag, parent_data, content)

  },

  mixins: [ focusMixin ],
  data(){
    return {
      moddedId: null,
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
    options:           null,
    mask:           null,
    tooltip:        null,
    shortkey:        null,
    maxlength:      {default: '-1', type: String},
    tooltipLoading: {default: 'AJUDA', type: String},
    tooltipTrigger: {default: 'hover', type: String},
    tooltipShow:    {default: false, type: Boolean},
    checkbox:       {default: false, type: Boolean},
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
  },
  methods:{
    getId(index){
      if (index==0){
        return this.moddedId
      }

      return this.moddedId + '_' + index
    },

    icon(value){
      if(this.checkbox && this.value.includes(value)){
        return 'check-circle'
      } else if(this.value==value){
        return 'dot-circle'
      }

      return 'circle'
    },

    color(value){
      if(this.checkbox && this.value.includes(value)){
        return 'link'

      } else if(this.value==value){
        return 'link'
      }

      return 'info'
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
      var emit = e

      if(this.checkbox){
        emit = []
        emit = emit.concat(this.value)

        if(emit.includes(e)){
          emit.splice(emit.indexOf(e), 1)
        } else {
          emit.push(e)
        }

      }

      this.$emit('input', emit)
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
    optionsValidated(){
      // If options is a object, just return it.
      if(typeof this.options[0] == 'object'){
        return this.options;
      }

      // if a array, make a object
      var array = []
      for (var i = 0; i < this.options.length; i++) {
        var item = this.options[i]

        array.push({ value: item, label: item})

      }

      return array
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

<style lang="css">

</style>
