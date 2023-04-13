<script setup>
import Serch from '../../../components/Ratinghistory/Serch.vue'
import Rating from '../../../components/Ratinghistory/Ratings.vue'
import FlatPickr from '../../../components/Ratinghistory/FlatPickr.vue';
import { ref, computed, reactive } from "vue";
let date = new Date();
let today = date.toISOString().slice(0, 10);
const list = reactive([
    {
        date: today,
        Pro: "JKS",
        Dep: "812",
        ID: "888",
        Type: "午餐",
        Meal: "葷食",
        supplier: "好食客",
        rating: 5,
        note: "無"
    },
    {
        date: today,
        Pro: "CBD",
        Dep: "871",
        ID: "111",
        Type: "早餐",
        Meal: "葷食",
        supplier: "里家",
        rating: 4,
        note: "好吃"
    }
])
</script>
<template>
    <BasePageHeading title="餐點評分查詢" subtitle="查詢功能">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">餐點</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">餐點評分查詢</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="content">
        <div class="row">
            <div class="col-lg-12 col-xl-12 ">
                <FlatPickr></FlatPickr>
            </div>
        </div>
    </div>
    <Serch></Serch>
    <div class="content">
        <BaseBlock title="查詢">

            <template #options>
                <button type="submit" class="btn btn-sm btn-primary">
                    新增(評分)
                </button>
            </template>
            <table class="table table-bordered table-striped table-vcenter">
                <thead>
                    <tr>
                        <th style="width: 10%">日期</th>
                        <th style="width: 10%">廠別</th>
                        <th style="width: 10%">部門</th>
                        <th style="width: 10%">員編</th>
                        <th style="width: 10%">餐別</th>
                        <th style="width: 10%">類型</th>
                        <th style="width: 10%">供應商</th>
                        <th style="width: 10%">評分</th>
                        <th style="width: 10%">備註</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in list">
                        <td>{{ item.date }}</td>
                        <td>{{ item.Pro }}</td>
                        <td>{{ item.Dep }}</td>
                        <td>{{ item.ID }}</td>
                        <td>{{ item.Type }}</td>
                        <td>{{ item.Meal }}</td>
                        <td>{{ item.supplier }}</td>
                        <td>
                            {{ item.rating }}
                        </td>
                        <th style="width: 10%">{{ item.note }}</th>
                    </tr>

                </tbody>
            </table>
        </BaseBlock>
    </div>
</template>