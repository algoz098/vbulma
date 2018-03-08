<template>
  <transition
    name="bounce-right"
    mode="in-out"
    appear
    appear-active-class="bounceInRight"
    enter-active-class="bounceInRight"
    leave-active-class="bounceOutRight"
  >
  <div :class="['notification', 'animated', type ? `is-${type}` : '']" v-if="show">
    <button class="delete touchable" @click="closedByUser()"></button>
    <div class="title is-5" v-if="title">{{ title }}</div>
    {{ message }}
  </div>
</transition>
</template>

<script>
import Vue from 'vue'

export default {

  props: {
    type: String,
    title: String,
    message: String,
    direction: {
      type: String,
      default: 'Right'
    },
    duration: {
      type: Number,
      default: 4500
    },
    container: {
      type: String,
      default: '.notifications'
    }
  },

  data () {
    return {
      $_parent_: null,
      show: true
    }
  },

  created () {
    let $parent = this.$parent
    if (!$parent) {
      let parent = document.querySelector(this.container)
      if (!parent) {
        // Lazy creating `div.notifications` container.
        const className = this.container.replace('.', '')
        const Notifications = Vue.extend({
          name: 'Notifications',
          render (h) {
            return h('div', {
              'class': {
                [`${className}`]: true
              }
            })
          }
        })
        $parent = new Notifications().$mount()
        document.body.appendChild($parent.$el)
      } else {
        $parent = parent.__vue__
      }
      // Hacked.
      this.$_parent_ = $parent
    }
  },

  mounted () {
    if (this.$_parent_) {
      this.$_parent_.$el.appendChild(this.$el)
      this.$parent = this.$_parent_
      delete this.$_parent_
    }
    if (this.duration > 0) {
      this.timer = setTimeout(() => this.close(), this.duration)
    }

    if (this.type=='danger'){
      var audio = new Audio(require('../../assets/audios/alert.mp3'));
      audio.play();
    }
  },

  destroyed () {
    this.$el.remove()
  },

  computed: {
    transition () {
      return `bounce-${this.direction}`
    },

    enterClass () {
      return `bounceIn${this.direction}`
    },

    leaveClass () {
      return `bounceOut${this.direction}`
    },
  },

  methods: {
    closedByUser () {
       this.$emit('close')
       this.$emit('close-user')
       clearTimeout(this.timer)
       this.show = false
    },

    close () {
      this.$emit('close')
      clearTimeout(this.timer)
      this.show = false
    },

    afterLeave () {
      this.$destroy()
    }
  }
}
</script>

<style lang="scss">
.notifications {
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1024 + 233;
  pointer-events: none;

  // @include tablet() {
  //   max-width: 320px;
  // }

  .notification {
    margin: 20px;
  }
}

.notification {
  position: relative;
  min-width: 240px;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  pointer-events: all;
}
</style>
