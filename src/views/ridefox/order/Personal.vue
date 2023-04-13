<script setup>
import { ref, reactive, onMounted } from "vue";
import Calendar from "../../../components/Personal/Calender/Calendar.vue";
import Popin from '../../../components/Personal/Popin.vue'
</script>
<template>
    <BasePageHeading title="員工訂餐" subtitle="僅可更改今日餐點內容">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">Order</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">訂餐系統</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <Calendar></Calendar>
    <Popin></Popin>
</template>
