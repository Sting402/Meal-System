<script setup>
import { ref } from "vue";

// Vue Star Rating, for more info and examples you can check out https://github.com/craigh411/vue-StarRating
import StarRating from "vue-star-rating";

// Helper variables
const starRatingSimple = ref(0);
const starRatingPredefined = ref(3);
const starRatingMore = ref(5);
const starRatingReset = ref(4);
const starRatingIncrement = ref(2.5);
const starRatingFluid = ref(0);
const starRatingColors = ref(3);
const starRatingSize = ref(3);
</script>

<template>
    <!-- Size and Shape Variations -->
    <div class="col-md-6">
        <!-- <StarRating v-model:rating="starRatingSize" :star-size="16" :show-rating="false" :star-points="[
            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
            19, 31, 17,
        ]" class="mb-1"></StarRating> -->
        <StarRating v-model:rating="starRatingSize" :star-size="24" :show-rating="false" :star-points="[
            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
            19, 31, 17,
        ]" class="mb-1"></StarRating>
        <!-- <StarRating v-model:rating="starRatingSize" :star-size="32" :show-rating="false" :star-points="[
            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
            19, 31, 17,
        ]" class="mb-1"></StarRating> -->
        <!-- <StarRating v-model:rating="starRatingSize" :star-size="48" :show-rating="false" :star-points="[
            23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46,
            19, 31, 17,
        ]" class="mb-1"></StarRating> -->
    </div>
    <!-- END Size and Shape Variations -->
</template>