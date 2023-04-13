<script setup>
import { reactive, ref, onMounted, watchEffect } from 'vue'
import { $select } from '../../api/adminselect/select'
import { useAdminSelectStore } from "../../stores/adminselect/select";
const store = useAdminSelectStore();
const data = reactive({
    tableData: [
        { id: 0, parentId: null, index: 0, menu: 1, title: '最新消息', checked: false },
        { id: 1, parentId: null, index: 1, menu: 3, title: '修改密碼', checked: false },
        { id: 2, parentId: null, index: 2, menu: 4, title: '預設餐維護', checked: false },
        { id: 3, parentId: null, index: 3, menu: 6, title: '個人訂餐', checked: false },
        { id: 4, parentId: null, index: 4, menu: 7, title: '餐點評分', checked: false },
        { id: 5, parentId: null, index: 5, menu: 8, title: '代訂人員訂餐', checked: false, },
        { id: 51, parentId: 5, index: 6, menu: 81, title: '代訂產線', checked: false, },
        // { id: 511, parentId: 51, index: 7, menu: 811, title: 'CBD', checked: false },
        { id: 511, parentId: 51, index: 7, menu: 811, title: 'CY', checked: false },
        { id: 512, parentId: 51, index: 8, menu: 812, title: 'JK8', checked: false },
        { id: 513, parentId: 51, index: 9, menu: 813, title: 'JKS', checked: false },
        { id: 514, parentId: 51, index: 10, menu: 814, title: 'LJ', checked: false },
        { id: 515, parentId: 51, index: 11, menu: 815, title: 'TC', checked: false },
        { id: 516, parentId: 51, index: 12, menu: 816, title: 'TRI', checked: false },
        { id: 517, parentId: 51, index: 13, menu: 817, title: 'WQ', checked: false },
        { id: 52, parentId: 5, index: 14, menu: 82, title: '代訂倉庫', checked: false },
        // { id: 521, parentId: 52, index: 16, menu: 821, title: 'CBD', checked: false },
        { id: 521, parentId: 52, index: 15, menu: 821, title: 'CY', checked: false },
        { id: 522, parentId: 52, index: 16, menu: 822, title: 'JK8', checked: false },
        { id: 523, parentId: 52, index: 17, menu: 823, title: 'JKS', checked: false },
        { id: 524, parentId: 52, index: 18, menu: 824, title: 'LJ', checked: false },
        { id: 525, parentId: 52, index: 19, menu: 825, title: 'TC', checked: false },
        { id: 526, parentId: 52, index: 20, menu: 826, title: 'TRI', checked: false },
        { id: 527, parentId: 52, index: 21, menu: 827, title: 'WQ', checked: false },
        { id: 53, parentId: 5, index: 22, menu: 83, title: '代訂新人', checked: false },
        // { id: 531, parentId: 53, index: 25, menu: 831, title: 'CBD', checked: false },
        { id: 531, parentId: 53, index: 23, menu: 831, title: 'CY', checked: false },
        { id: 532, parentId: 53, index: 24, menu: 832, title: 'JK8', checked: false },
        { id: 533, parentId: 53, index: 25, menu: 833, title: 'JKS', checked: false },
        { id: 534, parentId: 53, index: 26, menu: 834, title: 'LJ', checked: false },
        { id: 535, parentId: 53, index: 27, menu: 835, title: 'TC', checked: false },
        { id: 536, parentId: 53, index: 28, menu: 836, title: 'TRI', checked: false },
        { id: 537, parentId: 53, index: 29, menu: 837, title: 'WQ', checked: false },
        { id: 54, parentId: 5, index: 30, menu: 84, title: '外部人員', checked: false },
        // { id: 541, parentId: 54, index: 34, menu: 841, title: 'CBD', checked: false },
        { id: 541, parentId: 54, index: 31, menu: 841, title: 'CY', checked: false },
        { id: 542, parentId: 54, index: 32, menu: 842, title: 'JK8', checked: false },
        { id: 543, parentId: 54, index: 33, menu: 843, title: 'JKS', checked: false },
        { id: 544, parentId: 54, index: 34, menu: 844, title: 'LJ', checked: false },
        { id: 545, parentId: 54, index: 35, menu: 845, title: 'TC', checked: false },
        { id: 546, parentId: 54, index: 36, menu: 846, title: 'TRI', checked: false },
        { id: 547, parentId: 54, index: 37, menu: 847, title: 'WQ', checked: false },
        { id: 55, parentId: 5, index: 38, menu: 85, title: '外國同仁', checked: false },
        // { id: 551, parentId: 55, index: 43, menu: 851, title: 'CBD', checked: false },
        { id: 551, parentId: 55, index: 39, menu: 851, title: 'CY', checked: false },
        { id: 552, parentId: 55, index: 40, menu: 852, title: 'JK8', checked: false },
        { id: 553, parentId: 55, index: 41, menu: 853, title: 'JKS', checked: false },
        { id: 554, parentId: 55, index: 42, menu: 854, title: 'LJ', checked: false },
        { id: 555, parentId: 55, index: 43, menu: 855, title: 'TC', checked: false },
        { id: 556, parentId: 55, index: 44, menu: 856, title: 'TRI', checked: false },
        { id: 557, parentId: 55, index: 45, menu: 857, title: 'WQ', checked: false },
        { id: 6, parentId: null, index: 46, menu: 9, title: '管理者代訂餐點', checked: false },
        { id: 7, parentId: null, index: 47, menu: 10, title: '預估餐點數量', checked: false },
        // { id: 71, parentId: 7, index: 53, menu: 1001, title: 'CBD', checked: false },
        { id: 71, parentId: 7, index: 48, menu: 1001, title: 'CY', checked: false },
        { id: 72, parentId: 7, index: 49, menu: 1002, title: 'JK8', checked: false },
        { id: 73, parentId: 7, index: 50, menu: 1003, title: 'JKS', checked: false },
        { id: 74, parentId: 7, index: 51, menu: 1004, title: 'LJ', checked: false },
        { id: 75, parentId: 7, index: 52, menu: 1005, title: 'TC', checked: false },
        { id: 76, parentId: 7, index: 53, menu: 1006, title: 'TRI', checked: false },
        { id: 77, parentId: 7, index: 54, menu: 1007, title: 'WQ', checked: false },
        { id: 8, parentId: null, index: 55, menu: 11, title: '剩餘便當數量', checked: false },
        { id: 9, parentId: null, index: 56, menu: 12, title: '部門取餐地點', checked: false },
        { id: 10, parentId: null, index: 57, menu: 14, title: '廠商出餐查詢', checked: false },
        { id: 11, parentId: null, index: 58, menu: 15, title: '待出餐訂單管理報表', checked: false },
        { id: 12, parentId: null, index: 59, menu: 16, title: '廠商對帳管理報表', checked: false },
        { id: 13, parentId: null, index: 60, menu: 17, title: '廠商訂購管理報表', checked: false },
        { id: 14, parentId: null, index: 61, menu: 18, title: '廠商參考值報表', checked: false },
        { id: 15, parentId: null, index: 62, menu: 10, title: '廠商公司分帳報表', checked: false },
        { id: 16, parentId: null, index: 63, menu: 20, title: 'PR Excel分帳報表', checked: false },
        { id: 17, parentId: null, index: 64, menu: 21, title: '餐點評分報表', checked: false },
        { id: 18, parentId: null, index: 65, menu: 23, title: '權限設定', checked: false },
        { id: 19, parentId: null, index: 66, menu: 24, title: '員工資料維護', checked: false },
        { id: 20, parentId: null, index: 67, menu: 25, title: '部門資料維護', checked: false },
        { id: 21, parentId: null, index: 68, menu: 26, title: '廠區資料維護', checked: false },
        { id: 22, parentId: null, index: 69, menu: 27, title: '餐廳資料維護', checked: false },
        { id: 23, parentId: null, index: 70, menu: 28, title: '供應商維護', checked: false },
        { id: 24, parentId: null, index: 71, menu: 29, title: '年度供應商維護', checked: false },
        { id: 25, parentId: null, index: 72, menu: 30, title: '工作日維護', checked: false },
        { id: 26, parentId: null, index: 73, menu: 31, title: '佈告欄維護', checked: false },
        { id: 27, parentId: null, index: 74, menu: 32, title: '最新消息維護', checked: false },
    ]
})
const table = ref('')
const uploadData = ref([])
const getCheckedData = async () => {
    console.log("點擊了");
    const menuList = []
    //console.log(table.value.getCheckboxRecords());
    // data.tableData[1].checked = true
    uploadData.value = table.value.getCheckboxRecords()
    //console.log(uploadData.value);
    uploadData.value.forEach(item => {
        //console.log(item.menu);
        menuList.push(item.menu)
    })
    menuList.sort((a, b) => a - b);
    console.log(menuList);
    let uniqueArr = [...new Set(menuList)];//把重複的刪掉
    const menus = uniqueArr.filter(num => num <= 85); // 過濾出 Menus 陣列
    const menusSelect = uniqueArr
    console.log(menus);
    console.log(menusSelect);
    const result = {
        "Menus": menus,
        "MenusSelect": menusSelect
    }
    console.log(result);
    let message = await $select(
        {
            worker_ID: store.data[0].worker_ID,
            menu: JSON.stringify(result)
        })
    console.log(message);
    console.log(table.value.getCheckboxIndeterminateRecords());
    store.isSelect.click()
}
// console.log(menuList.value);
const selectChangeEvent = ({ $table }) => {
    const records = $table.getCheckboxRecords()
    //console.info(`勾選${records.length}個樹形節點`, records)
}
watchEffect(() => {
    data.tableData.forEach(item => {
        data.tableData[item.index].checked = false
    })
    store.data[0].menu
    console.log(store.data[0].worker_ID);
    console.log(store.data[0].menu);
    let menus = JSON.parse(store.data[0].menu)
    console.log(menus);
    console.log(menus.MenusSelect);
    for (let i = 0; i < menus.MenusSelect.length; i++) {
        data.tableData.forEach(item => {
            //console.log(item);
            if (item.menu === menus.MenusSelect[i]) {
                //console.log(item.index);
                data.tableData[item.index].checked = true
            }
        })
    }
})

onMounted(() => {
    // let sessionStorageData = JSON.parse(sessionStorage.getItem('loginInfo'))
    // console.log(sessionStorageData.workerId);
    //console.log(store.data[0]);
    // let worker_id = sessionStorageData.workerId
    // console.log(worker_id);
    // let isSelect = await $select({
    //     Worker_ID: worker_id,
    //     // Password: state.password,
    // })
    // if (isSelect) {
    //     let menuSelect = await JSON.parse(sessionStorage.getItem('menuSelect'))
    //     console.log(menuSelect);
    //     for (let i = 0; i < menuSelect.length; i++) {
    //         //console.log(menuSelect[i]);
    //         data.tableData.forEach(item => {
    //             if (item.menu === menuSelect[i]) {
    //                 console.log(item.index);
    //                 data.tableData[item.index].checked = true
    //             }
    //         })
    //     }

    // }
})
</script>
<template>
    <!-- <BaseBlock title="權限設定"> -->
    <!-- <template #options> -->

    <!-- </template> -->
    <div class="btntest">
        <button type="button" class="btn btn-sm btn-primary" @click="getCheckedData" v-show="true" ref="isCheck">
            確定
        </button>
    </div>
    <vxe-table :column-config="{ resizable: true }" :data="data.tableData" :tree-config="{
        transform: true,
        rowField: 'id',
        // parentField: 'parentCode',
        // children: 'children'
    }" :checkbox-config="{ labelField: 'title', checkStrictly: true, checkField: 'checked', }" ref="table"
        @checkbox-change="selectChangeEvent">
        <vxe-column type="checkbox" width="280" tree-node></vxe-column>
    </vxe-table>

    <!-- </BaseBlock> -->
</template>
<style lang="scss">
.btntest {
    margin-top: 10px !important;
    margin-bottom: 10px !important;
}
</style>