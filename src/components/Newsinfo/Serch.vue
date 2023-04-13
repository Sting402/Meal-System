<script setup>
import { ref, computed, reactive, onMounted } from "vue";

// Grab icon list data
import iconsList from "@/data/icons";

// Reactive variable
const search = ref("");
const infoList = ref([])
const filteredRegular = computed(() => {
    return infoList.value.filter(item =>
        item.title.includes(search.value) || item.start.includes(search.value))
});
onMounted(() => {
    fetch('/search.json')
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            infoList.value = res.list
            //console.log(infoList.value);
        })
})

// const colSelected = ref(false)
// //checkBox只能單選
const handleChange = (item) => {
    //console.log(item);
    //console.log(col[item].isChecked);
    // filteredRegular.forEach((el, key) => {
    //     // console.log(key);
    //     // console.log(el.isChecked);
    //     if (key !== item) {
    //         el.isChecked = false
    //     }
    // });
}
</script>

<template>
    <!-- Page Content -->
    <div class="content">
        <!-- Search Section -->
        <div class="input-group input-group-lg push">
            <input type="text" class="form-control fs-base" placeholder="請輸入查詢" v-model="search" />
            <span class="input-group-text">
                <i class="fa fa-search"></i>
            </span>
        </div>
        <!-- <div v-if="filteredRegular.length === 0">
            <span>"沒有結果"</span>
        </div> -->
        <!-- END Search Section -->
        <div class="content">
            <BaseBlock title="查詢結果" v-if="search">
                <template #options>
                </template>
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th style="width: 10%"></th>
                            <th style="width: 10%">標題</th>
                            <th style="width: 10%">上下架</th>
                            <th style="width: 10%">開始日期</th>
                            <th style="width: 10%">結束日期</th>
                            <th style="width: 10%">編輯人員</th>
                            <th style="width: 10%">編輯/刪除</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list, item) in filteredRegular" :key=item>
                            <td> <input class="form-check-input" type="checkbox"
                                    v-model="filteredRegular[item].isChecked" :value="item"
                                    @change="handleChange(item)" /></td>
                            <td>{{ list.title }}</td>
                            <th style="width: 10%">
                            <td> <button type="button" class="btn btn-sm btn-alt-secondary">
                                    <i class="fa fa-fw fa-square-caret-up"></i>
                                </button>
                                <button type="button" class="btn btn-sm btn-alt-secondary">
                                    <i class="fa fa-fw fa-square-caret-down"></i>
                                </button>
                            </td>
                            </th>
                            <td>{{ list.start }}</td>
                            <td>{{ list.end }}</td>
                            <td>{{ list.staff }}</td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-alt-secondary">
                                        <i class="fa fa-fw fa-pencil-alt"></i>
                                    </button>
                                    <button type="button" class="btn btn-sm btn-alt-secondary">
                                        <i class="fa fa-fw fa-times"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </BaseBlock>
        </div>
        <!-- No Results -->
        <!-- <div v-if="
    filteredIconsFaRegular.length === 0 &&
    filteredIconsFaSolid.length === 0 &&
    filteredIconsFaBrands.length === 0 &&
    filteredIconsSimpleLine.length === 0
        " class="alert alert-warning space-x-2 fw-medium text-center">
            <i class="fa fa-triangle-exclamation opacity-50"></i>
            <span>No icons found!</span>
        </div> -->

        <!-- END No Results -->

        <!-- Font Awesome Regular -->
        <!-- <BaseBlock v-if="filteredIconsFaRegular.length > 0"
            :title="`(${filteredIconsFaRegular.length}) Font Awesome Regular`" btn-option-content>
            <template #subtitle>
                <small class="text-lowercase"><code>far fa-*</code></small>
            </template>

            <div class="row items-push-2x text-center">
                <div v-for="(icon, index) in filteredIconsFaRegular" :key="`far-icon-${index}`"
                    class="col col-sm-6 col-lg-4 col-xl-3">
                    <p><i :class="`far fa-2x fa-${icon}`"></i></p>
                    <code>{{ icon }}</code>
                </div>
            </div>
        </BaseBlock> -->
        <!-- END Font Awesome Regular -->

        <!-- Font Awesome Solid -->
        <!-- <BaseBlock v-if="filteredIconsFaSolid.length > 0" :title="`(${filteredIconsFaSolid.length}) Font Awesome Solid`"
            btn-option-content>
            <template #subtitle>
                <small class="text-lowercase"><code>fa fa-*</code></small>
            </template>

            <div class="row items-push-2x text-center">
                <div v-for="(icon, index) in filteredIconsFaSolid" :key="`fa-icon-${index}`"
                    class="col col-sm-6 col-lg-4 col-xl-3">
                    <p><i :class="`fa fa-2x fa-${icon}`"></i></p>
                    <code>{{ icon }}</code>
                </div>
            </div>
        </BaseBlock> -->
        <!-- END Font Awesome Solid -->

        <!-- Font Awesome Brands -->
        <!-- <BaseBlock v-if="filteredIconsFaBrands.length > 0"
            :title="`(${filteredIconsFaBrands.length}) Font Awesome Brands`" btn-option-content>
            <template #subtitle>
                <small class="text-lowercase"><code>fab fa-*</code></small>
            </template>

            <div class="row items-push-2x text-center">
                <div v-for="(icon, index) in filteredIconsFaBrands" :key="`fab-icon-${index}`"
                    class="col col-sm-6 col-lg-4 col-xl-3">
                    <p><i :class="`fab fa-2x fa-${icon}`"></i></p>
                    <code>{{ icon }}</code>
                </div>
            </div>
        </BaseBlock> -->
        <!-- END Font Awesome Brands -->

        <!-- Simple Line Icons -->
        <!-- <BaseBlock v-if="filteredIconsSimpleLine.length > 0"
            :title="`(${filteredIconsSimpleLine.length}) Simple Line Icons`" btn-option-content>
            <template #subtitle>
                <small class="text-lowercase"><code>si si-*</code></small>
            </template>

            <div class="row items-push-2x text-center">
                <div v-for="(icon, index) in filteredIconsSimpleLine" :key="`si-icon-${index}`"
                    class="col col-sm-6 col-lg-4 col-xl-3">
                    <p><i :class="`si si-${icon} fa-2x`"></i></p>
                    <code>{{ icon }}</code>
                </div>
            </div>
        </BaseBlock> -->
        <!-- END Simple Line Icons -->

    </div>
    <!-- END Page Content -->
</template>