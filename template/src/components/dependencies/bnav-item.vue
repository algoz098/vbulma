<template lang="html">
  <span>
    <hr class="navbar-divider" v-if="divider">

    <router-link class="navbar-item" active-class="is-active" :to="link" v-else-if="link">
      <slot></slot>
    </router-link>

    <div class="navbar-item" v-else>
      <slot></slot>
    </div>
  </span>
</template>

<script>
export default {
  props:{
    link: null,
    divider: {default: false, type: Boolean}
  }
}
</script>

<style lang="css">
</style>
