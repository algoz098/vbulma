<template>
  <font-awesome-icon v-if="i" :icon="[type, i]" :spin="spin" :size="size"/>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid/'

export default {
  props:{
    i: {default: 'user'},
    spin: null,
    type: { default: 'fas', type: String},
    size: { default: '1x', type: String},
  },
  created() {
    fontawesome.library.add(solid)
  },


  components: {
    FontAwesomeIcon
  }
}
</script>
