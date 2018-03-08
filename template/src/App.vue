<template lang="html">
  <div id="app">

    <div class="columns">
      <div class="column"></div>

      <div class="column">

        <bdialog mod-id="teste" button-label="algo">
          Confirmar: ?

        </bdialog>

      </div>

      <div class="column" ></div>
    </div>


    <!-- This is the toast place. Do not delete this if using the toast system -->
    <div class="atoast">
      <btoast v-for="(toast, index) in toasts" :key="'toast' + index" :title="toast.title" :type="toast.type" :direction="toast.direction" :message="toast.message" :duration="toast.duration"
        @close="$store.commit('REMOVAL_TOAST', toast)"
      ></btoast>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return {
      teste: []
    }
  },
  computed:{
    toasts() {
      return this.$store.state.helper.toasts
    }
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bulma/bulma.sass';
  @import '../node_modules/animate.css/animate.min.css';

  .control.has-icons-left .icon.is-small, .control.has-icons-right .icon.is-small{
  height: 27px;
}

.control.has-icons-left .icon.is-large, .control.has-icons-right .icon.is-large{
  height: 54px;
  width: 54px;
  font-size: 24px;
}

.modal-card.is-large{
  width: 90%;
}

.modal-card.is-medium{
  width: 60%;
}

.atoast{
  z-index: 10;
  position: fixed;
  right: 10px;
  max-width: 500px;
  top: 10px;
  top: 10px;
  top: 10px;
  top: 10px;
}

</style>
