<template lang="html">
  <div class=" columns is-gapless" :style="'height: ' + height + 'px'">
    <div class="is-background-white is-clipped is-overflow">
      <nav class="panel">
        <!-- <p class="panel-heading">
          repositories
        </p>
        <div class="panel-block">
          <p class="control has-icons-left">
            <input class="input is-small" type="text" placeholder="search">
            <span class="icon is-small is-left">
              <i class="fas fa-search"></i>
            </span>
          </p>
        </div> -->

        <bpanel-link i="star" title="Favorites">
          <bpanel-link i="user" title="Home" :link="{name: 'home'}" />
          <bpanel-link i="user" title="Another" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="One" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
        </bpanel-link>

        <bpanel-link i="user" title="Something" :link="{name: 'testing'}" />
        <bpanel-link i="book" title="Another something" :link="{name: 'tested'}" />
        <bpanel-link i="book" title="Another something" :link="{name: 'tested'}" />
        <bpanel-link i="book" title="Another something" :link="{name: 'tested'}" />
        
        <bpanel-link i="book" title="Another something" >
          <bpanel-link i="user" title="Home" :link="{name: 'home'}" />
          <bpanel-link i="user" title="Another" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="One" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
          <bpanel-link i="user" title="Bites the dust" :link="{name: 'testing'}" />
        </bpanel-link>

        <bpanel-link i="book" title="Another something" :link="{name: 'tested'}" />
        <bpanel-link i="book" title="Another something" :link="{name: 'tested'}" />
        <bpanel-link i="book" title="Another something" :link="{name: 'tested'}" />

      </nav>

    </div>
    <div class="column" :style="'height: ' + height + 'px; overflow-y: scroll; overflow-x: hidden'">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      height: '300'
    }
  },

  methods:{
    handleResize () {
      this.height = document.documentElement.clientHeight - 52
    }
  },

  // bind event handlers to the `handleResize` method (defined below)
  mounted: function () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  },

  computed:{
    show(){
      return this.$store.state.helper.menu.show
    }
  }
}
</script>

<style lang="css">
.is-background-white{
  background-color: white;
}

.is-overflow{
  overflow-y: auto!important;
}

::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
}

::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
}
</style>
