<template lang="html">
  <span>
    <router-link class="panel-block" active-class="is-active" :to="link" v-if="link">
      <span class="panel-icon">
        <icon :i="i" />
      </span>

      &nbsp;

      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeftBig"
        mode="out-in"
      >
        <span v-if="show">
          {{title}}
        </span>

      </transition>
    </router-link>

    <a class="panel-block" :class="{'is-active': open}" @click="open=!open" v-else>
      <span class="panel-icon">
        <icon :i="i" />
      </span>

      &nbsp;

      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutLeftBig"
        mode="out-in"
      >
        <span v-if="show">
          {{title}}&nbsp;

          <transition
            name="multiselect__loading"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in" :duration="300"
          >
            <icon i="angle-down" key="down" v-if="open"/>
            <icon i="angle-left" key="left" v-else/>

          </transition>
        </span>

      </transition>
    </a>

    <transition
      name="custom-classes-transition"
      enter-active-class="animated zoomInLeft"
      leave-active-class="animated zoomOutLeft"
      mode="out-in"
    >
      <div class="collapse-content is-background-white" v-if="open">
        <nav class="collapse-content-box panel" style="margin-left: +20px">
          <slot></slot>
        </nav>
      </div>
    </transition>
  </span>

</template>

<script>
export default {
  props:{
    i: {default: 'user', type: String},
    title: {default: 'undefined', type: String},
    link:  null
  },

  data(){
    return{
      open: false
    }
  },

  computed:{
    show(){
      return this.$store.state.helper.menu.show
    }
  }
}
</script>

<style lang="css">
</style>
