<template lang="html">
<div class="navbar-item has-dropdown" :class="[{'is-active': active}]">
    <a class="navbar-link" @click="active=!active">
      {{title}}
    </a>

    <div class="navbar-dropdown" :class="[{'is-right': right}]">
      <bnav-item>Overview</bnav-item>

      <bnav-item divider />

      <bnav-item>User: User's name</bnav-item>
      <bnav-item>Version date: 01/01/1990</bnav-item>
      <bnav-item>Version 0.1.0</bnav-item>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    right: {default: false, type: Boolean},
    title: {default: 'Undefined', type: String}
  },

  data(){
    return {
      active: false
    }
  },

  methods:{
    show(){
      this.active = !this.active
    }
  }
}
</script>

<style lang="css">
</style>
