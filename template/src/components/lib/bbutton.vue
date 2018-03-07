
<script>

import { focus } from 'vue-focus';

export default {
  data(){
    return {
      moddedId: null,
    }
  },
  directives: {
    focus: focus,
  },
  props: {
    id:       null,
    name:     null,
    label:    null,
    loading:  null,
    i:        null,
    link:     null,
    shortkey: null,
    modId:    {default: '', type: String},
    tabindex: {default: '-1', type: String},
    type:     {default: 'button', type: String},
    color:    {default: 'white', type: String},
    size:     {default: 'normal', type: String},
    tooltip:        null,
    tooltipLoading: {default: 'helper', type: String},
    tooltipTrigger: {default: 'hover', type: [String, Array]},
    tooltipShow: {default: false, type: Boolean},
    outlined: {default: false, type: Boolean},
    noTooltip:{default: false, type: Boolean},
    inverted: {default: false, type: Boolean},
    rounded:  {default: false, type: Boolean},
    marginless: {default: false, type: Boolean},
    paddingless: {default: false, type: Boolean},
    disabled: {default: false, type: Boolean},
    iRight:   {default: false, type: Boolean},
  },
  mounted() {
    this.moddedId = this.id + String(this.modId)
  },
  methods: {
    on_shortkey(){
      this.on_focus()
    },

    on_keyup(){

    },

    on_click() {
      if(this.link){
        this.$router.push(this.link)
      } else {
        this.$emit('click')
      }
    },
    on_focus() {
      this.$store.commit('SET_FOCUS', this.moddedId)
    },
    on_blur() {

    },
  },
  created(){
    if (this.shortkey){
      this.shortkey_trated = this.shortkey
    }
  },
  computed:{
    get_tooltip(){
      var addon = ''

      if(this.shortkey){
        addon = " <" + this.shortkey.join('+')+">"
      }

      if(this.tooltip && !this.noTooltip){
        return this.tooltip + addon
      } else if (this.id && this.$store.state.helper.helps[this.id] && this.$store.state.helper.helps[this.id].tooltip && !this.noTooltip){
        return this.$store.state.helper.helps[this.id].tooltip + addon
      }
      return false;
    },

    focus() {
      if(this.$store.state.helper.focus==this.moddedId){
        return true
      }
      return false
    },

    content(){
      return !!this.$slots.content
    }
  },

  render(h){
    var parent_tag = 'div';
    var parent_data = {};
    var content = [];

    var button_data = {};
    var button_content = [];

    var icon = []

    button_data.attrs = {};
    button_data.attrs.type = this.type;
    button_data.attrs.name = this.name;
    button_data.attrs.id = this.moddedId;
    button_data.attrs.disabled = this.disabled;
    button_data.attrs.tabindex = this.tabindex;

    button_data.class = [
      'button is-' + this.color + ' is-' + this.size,
      {'is-outlined': this.outlined},
      {'is-inverted': this.inverted},
      {'is-rounded': this.rounded},
      {'is-marginless': this.marginless},
      {'is-paddingless': this.paddingless},
      {'is-loading': this.$loading.isLoading(this.loading)},
    ]

    button_data.directives=[]

    button_data.directives.push({
      name: 'focus',
      value: this.focus,
    })

    if(this.shortkey){
      button_data.directives.push({
        name: 'shortkey',
        value: this.shortkey,
      })
    }

    var self = this

    button_data.on = {
      click(){
        self.on_click()
      },

      focus(){
        self.on_focus()
      },

      blur(){
        self.on_blur()
      },

      shortkey(){
        self.on_shortkey()
      },

      keydown(e){
        if(e.key=='Enter'){
          e.stopPropagation()
          e.preventDefault()
        }
      }
    }

    if(this.i && !this.iRight){
      icon = [h('icon', {props: {i: this.i}}, '')];

      button_content.push(
        h('span', {class: ['icon is-' + this.size]}, icon)
      )
    }

    if(this.label){
      button_content.push(
        h('span', {}, this.label)
      )
    } else if(this.$slots.content) {
      button_content.push(
        this.$slots.content
      )
    }

    if(this.i && this.iRight){
      icon = [h('icon', {props: {i: this.i}}, '')];

      button_content.push(
        h('span', {class: ['icon is-' + this.size]}, icon)
      )
    }

    if(this.get_tooltip){
      parent_tag = 'btooltip';

      parent_data.props = {}
      parent_data.props.show = this.focus
      parent_data.props.loading = this.tooltipLoading

      content.push(
        h('template', {slot: 'tooltip'}, this.get_tooltip)
      )

      content.push(h('button', button_data, button_content));

      return h(parent_tag, parent_data, content)
    }

    return h('button', button_data, button_content)
  }
}
</script>

<style lang="css">
</style>
