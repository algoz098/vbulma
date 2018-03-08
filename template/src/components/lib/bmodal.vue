<template lang="html">
  <transition
    name="custom-classes-transition"
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in" appear
  >
  <div class="modal is-active" v-if="show">

    <div class="modal-background" @click="$store.commit('CLOSE_MODAL')" ></div>

    <div  class="modal-content" v-if="!card">
      <slot></slot>
    </div>

    <button class="modal-close is-large" aria-label="close" @click="$store.commit('CLOSE_MODAL')" v-if="!card"></button>

    <div class="modal-card" :class="[{'is-large': large, 'is-medium': medium}]" v-if="card">
      <header class="modal-card-head">

        <p class="modal-card-title">
          {{title}}
        </p>

        <bbutton i="times-circle" paddingless marginless color="text" @click="$store.commit('CLOSE_MODAL')" id="close_button" />
      </header>

      <section class="modal-card-body">
        <slot></slot>
      </section>

      <footer class="modal-card-foot" v-if="!noFooter">
        <slot name="footer"></slot>

        <bbutton color="success" label="Salvar" i="save" id="save_button" v-if="saveButton" />&nbsp;

        <bbutton label="Cacelar" color="normal" id="cancel_button" @click="$store.commit('CLOSE_MODAL')" v-if="cancelButton"/>
      </footer>
    </div>

  </div>
</transition>

</template>

<script>
export default {
  data(){
    return {
      moddedId: null,
      internalShow: false
    }
  },
  props:{
    id:            null,
    title:         null,
    modId:         { default: '', type: String},
    card:          { default: false, type: Boolean},
    medium:        { default: false, type: Boolean},
    large:         { default: false, type: Boolean},
    noFooter:      { default: false, type: Boolean},
    cancelButton:  { default: false, type: Boolean},
    saveButton:    { default: false, type: Boolean},
    disableAutofocus:    { default: false, type: Boolean},
  },
  mounted(){
    this.moddedId = this.id + this.modId
  },

  methods:{
    open(){
      // eslint-disable-next-line
      this.internalShow = true

      this.$emit('open')

      if(!this.disableAutofocus){

        this.$store.commit('SET_FOCUS', 'close_button')

      }
    }
  },


  computed:{
    lastModal(){
      if (this.$store.state.helper.modals && this.$store.state.helper.modals.length) {

        return this.$store.state.helper.modals[this.$store.state.helper.modals.length - 1]

      }

      return false
    },

    show(){
      if(this.moddedId && this.lastModal && this.lastModal.id === this.moddedId){

        if(!this.internalShow){
          this.open()
        }

        return true
      }

      if(this.internalShow){
        // eslint-disable-next-line
        this.internalShow = false

        this.$emit('close')
      }

      return false
    }
  }
}
</script>

<style lang="css">
</style>
