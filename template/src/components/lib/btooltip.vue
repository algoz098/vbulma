<script>
import { VPopover } from 'v-tooltip';

export default {
  props:{
    label:   null,
    offset:  null,
    inline:  {default: false, type: Boolean},
    show:    {default: false, type: Boolean},
    delay:   {default: '1', type: String},
    loading: {default: 'null', type: String},
    place:   {default: 'auto', type: String},
    trigger: {default: 'hover', type: [String, Array]},
  },
  components: {
    'v-popover':VPopover
  },
  render(h){
    var parent_tag = 'div';
    var parent_data = {};
    var content = [];

    parent_data.class = {
      [`inline`]: this.inline
    }

    parent_data.props = {};
    parent_data.props.placement = this.place
    parent_data.props.trigger = this.trigger
    parent_data.props.open = this.show
    parent_data.props.offset = this.offset
    parent_data.props.delay = this.delay

    if(this.label || this.$slots.tooltip){
      parent_tag = "v-popover"

      if(this.$loading.isLoading(this.loading)){
        var loading = []
        loading.push(h('icon', {props: {i: 'cog', spin: true}}, ''))

        content.push(
          h('template', {slot: 'popover'}, loading)
        )

      } else if(this.label){

        content.push(
          h('template', {slot: 'popover'}, this.label)
        )

      } else if (this.$slots.tooltip){

        content.push(
          h('template', {slot: 'popover'}, this.$slots.tooltip)
        )

      }

      content.push(h('div', {slot: 'default'}, this.$slots.default));

      return h(parent_tag, parent_data, content)
    }

    return h('div', parent_data, this.$slots.default)
  }

}
</script>

<style lang="css">
.inline{
  display: inline-block;
}

.trigger{
  display: block !important;
}

.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  color: white;
  border-radius: 16px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: black;
  color: white;
  padding: 1px 7px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: black;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
</style>
