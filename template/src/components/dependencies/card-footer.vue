<script>
export default {
  render(h){
    var slotedArray = []

    for (var i = 0; i < this.$slots.default.length; i++) {
      var slot = this.$slots.default[i]

      slotedArray.push(
        h('p', {class: 'card-footer-item'}, [slot])
      )
    }

    return h('footer', {class: 'card-footer'}, slotedArray)
  }
}
</script>

<style lang="css">
</style>
