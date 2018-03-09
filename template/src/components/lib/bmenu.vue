<template lang="html">
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">

      <a class="navbar-item" @click="alter_menu" href="#">
        <icon i="bars" key="bars" v-if="!show"  />
        <icon i="times" v-else />
        &nbsp;Menu
      </a>

    </div>

    <div class="navbar-start">
      <div class="navbar-item">
        <binput :placeholder="searchPlaceholder" horizontal />
      </div>
    </div>

    <div class="navbar-end">

      <bnav-dropdown title="Me" right>

      </bnav-dropdown>

    </div>
  </nav>
</template>

<script>
export default {
  props:{
    searchPlaceholder: {default: 'Search', type: String}
  },

  computed:{
    show(){
      return this.$store.state.helper.menu.show
    }
  },

  methods: {
    alter_menu(){
      this.$store.commit('SHOW_MENU')
    }
  }
}
</script>

<style lang="css">

</style>
