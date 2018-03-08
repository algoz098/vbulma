<template lang="html">
  <div class="card">

    <div class="card-image" v-if='img'>

      <figure class="image">

        <img :src="img" :alt="altImg">

      </figure>

    </div>

    <header class="card-header" v-if="title">

      <p class="card-header-title">
       {{title}}
      </p>

      <div class="card-header-icon">
        <span class="icon" v-if="$loading.isLoading(loading)">
          <icon i="spinner" spin />
        </span>

        <slot name="icon"></slot>
      </div>

    </header>

    <div class="card-content">

      <div class="content">

        <h2 class="featured" v-if="featured">{{featured}}</h2>
        <h3 class="subfeatured has-text-grey-light" v-if="subfeatured">{{subfeatured}}</h3>

        <slot></slot>

      </div>

    </div>

    <card-footer v-if="!!$slots.footer">
      <slot name="footer" />
    </card-footer>

  </div>
</template>

<script>
import cardFooter from '../dependencies/card-footer.vue'
export default {
  components: {
    cardFooter

  },
  props: {
    title: null,
    img: null,
    altImg: null,
    featured: null,
    subfeatured: null,
    loading: {default: 'AJUDA', type: String},
  }
}
</script>

<style lang="css">
h2.featured{
  margin-left: -10px;
  margin-top: -10px;
  margin-bottom: 1px;
}

h3.subfeatured, h3.subfeatured:not(:first-child){
  margin-left: -10px;
  margin-top: 0px;
  color:
}
</style>
