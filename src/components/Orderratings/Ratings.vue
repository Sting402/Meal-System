<script setup>
import { ref } from "vue";
// Vue Star Rating, for more info and examples you can check out https://github.com/craigh411/vue-StarRating
import StarRating from "vue-star-rating";
import { storeToRefs } from "pinia";
import { useOrderratingsStore } from '../../stores/orderratings/orderratings';
const store = useOrderratingsStore()
store.starRatingSize = storeToRefs(store)
const starRatingSize = ref(3);
store.starRatingSize = starRatingSize.value
</script>

<template>
    <div class="col-md-6">
        <StarRating v-model:rating="store.starRatingSize" :star-size="24" :show-rating="false" :star-points="[
            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
            19, 31, 17,
        ]" class="mb-1"></StarRating>
    </div>
</template>