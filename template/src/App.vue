<template lang="html">
  <div id="app">

    <div class="columns">
      <div class="column"></div>

      <boption :options="[{value: 'a', label: 'a'}, {value: 'b', label: 'b'}]" checkbox label="aaa" v-model="teste">
        <bbutton i="user" color="primary" slot="right" />
        <bbutton i="user" color="primary" slot="right" />
        <bbutton i="user" color="primary" slot="left" />
        <bbutton i="user" color="primary" slot="left" />
      </boption>

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
