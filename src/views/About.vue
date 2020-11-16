<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="test">
      <vue-star-rating v-bind:increment="1"
        v-bind:max-rating="5"
        inactive-color="#000"
        active-color="#621bbf"
        v-bind:star-size="25"
        @rating-selected ="setRating">
      </vue-star-rating>
    </div>
  </div>
</template>

<script>
import VueStarRating from "vue-star-rating/src/star-rating";

export default {
  name: "About",
  components: {
    VueStarRating
  },
  methods: {
    setRating: function(rating){
      this.rating = rating;
    }
  },
  data: function() {
    return {
      rating: 0
    }
  }
};
</script>

<style scoped>
.test {
  height: 100px;
}
</style>
