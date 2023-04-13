<script setup>
import Loc from './MultipleSelect .vue'
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-5">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">部門代號</label>
                <input type="text" class="form-control" placeholder="" />
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">廠區地點</label>
                <Loc></Loc>
            </div>
            <div class="d-flex justify-content-start">
                <button type="button" class="btn btn-primary leftovers-confirm">
                    確認
                </button>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.leftovers-confirm {
    margin-right: 100px;
}
</style>