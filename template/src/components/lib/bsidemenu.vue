<template lang="html">
  <div class="columns is-gapless" :style="'height: ' + height + 'px'">
    <div class="is-background-white">
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

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Favorites
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

        <a class="panel-block is-active">
          <span class="panel-icon">
            <icon i="star" />
          </span>

          &nbsp;

          <transition
            name="custom-classes-transition"
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutLeftBig"
            mode="out-in"
          >
            <span v-if="show">
              Menu 1
            </span>
          </transition>
        </a>

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
</style>
