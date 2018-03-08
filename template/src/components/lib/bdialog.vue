<template lang="html">
  <span>
    <bmodal :title="'Tem certeza que deseja ' + title + '?'" id="dialog_modal_" :mod-id="modId" card cancel-button>

      <slot></slot>

      <template slot="footer">
        <bbutton color="success" label="Confirmar" i="check" @click="$emit('confirm')" id="button_confirm" :mod-id="'_' + modId" />
      </template>

    </bmodal>

    <bbutton :size="buttonSize" :color="buttonColor" :id="buttonId" :mod-id="buttonModId" :label="buttonLabel" v-bind:i="buttonIcon"
      @click="$store.commit('OPEN_MODAL', 'dialog_modal_' + modId)" v-if="!noButton"
    />

  </span>
</template>

<script>
export default {
  props: {
    modId: null,
    buttonId: null,
    buttonModId: null,
    buttonLabel: {default: "Label indefinida", type: String},
    title: {default: '', type: String},
    buttonColor: {default: 'danger', type: String},
    buttonSize: {default: 'normal', type: String},
    buttonIcon: null,
    noButton: {default: false, type: Boolean},
  },
}
</script>

<style lang="css">
</style>
