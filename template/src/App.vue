<template lang="html">
  <div id="app">

    <div class="columns">
      <div class="column"></div>

      <binput id="teste1" label="aaa" loading="teste" money col="3" v-model.lazy="teste">
      </binput>

      <div class="column" >teste: {{teste}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      teste: ''
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma/bulma.sass';
</style>
