<script>

export default {
  render:function(createElement){
      var vnodes = null

      if (this.$slots.default){
        vnodes = this.$slots.default
        .filter(vnode => !!vnode.tag)
        .map(vnode => createElement('p', { class: 'control' }, [vnode]))
      }

      if (vnodes && vnodes.length > 1) {
        return createElement('div', { class: [{'buttons': !this.field}, {'field': this.field}, 'has-addons'] }, vnodes)
      } else {
        return createElement('div', {}, this.$slots.default)
      }
  },
  props:{
    field: {default: true, type: Boolean}
  }
}
</script>

<style lang="css">
</style>
