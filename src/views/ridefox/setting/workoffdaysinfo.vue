<script setup>
import { reactive, computed, onMounted, watch, ref, watchEffect } from "vue"
import Calendar from "../../../components/Workoffdaysinfo/Calendar.vue"
import Upload from '../../../components/Workoffdaysinfo/ExcelUpload.vue'

</script>
<template>
    <BasePageHeading title="年度行事曆" subtitle="休假期間未提供餐點">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">年度行事曆</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <Upload></Upload>
    <Calendar></Calendar>
</template>
<style lang="scss"></style>