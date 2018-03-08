<template lang="html">
  <div id="app">

    <div class="columns">
      <div class="column"></div>

      <bselect :options="[{value: 'a', label: 'a'}, {value: 'b', label: 'b'}]"label="aaa" v-model="teste" >
      </bselect>

      <div class="column" >teste: {{teste}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      teste: []
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma/bulma.sass';

  .control.has-icons-left .icon.is-small, .control.has-icons-right .icon.is-small{
  height: 27px;
}

.control.has-icons-left .icon.is-large, .control.has-icons-right .icon.is-large{
  height: 54px;
  width: 54px;
  font-size: 24px;
}

.modal-card.is-large{
  width: 90%;
}

.modal-card.is-medium{
  width: 60%;
}

.atoast{
  z-index: 10;
  position: fixed;
  right: 10px;
  max-width: 500px;
  top: 10px;
  top: 10px;
  top: 10px;
  top: 10px;
}

</style>
