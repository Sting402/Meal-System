<script setup>
import { ref, computed, reactive } from "vue";
// import Serch from '../../../components/Adminorder/Serch.vue'
// import Calendar from "../../../components/Adminorder/Calendar.vue";
</script>
<template>
    <BasePageHeading title="管理者代訂" subtitle="代訂功能" id="adminorder-basepageheading">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">餐點</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">管理者代訂餐點</li>
                </ol>
            </nav>
    </template>
</BasePageHeading>
<Serch></Serch>
<Calendar></Calendar>
<!-- <div class="content">
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
                            <Rating></Rating>
                        </td>
                        <th style="width: 10%">{{ item.note }}</th>
                    </tr>

                            </tbody>
                        </table>
                    </BaseBlock>
                </div> -->
</template>
<style lang="scss">
#adminorder-basepageheading {
    height: 100px !important;
}
</style>