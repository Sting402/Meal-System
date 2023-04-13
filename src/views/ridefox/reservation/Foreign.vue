<script setup>
import { reactive, ref, onMounted, computed, watch, watchEffect } from "vue";
import FlatPickr from "vue-flatpickr-component";
import Swal from "sweetalert2";
import { ElLoading } from 'element-plus'//Loading加載
import { readFile, character, delay } from '../../../utils/utils'
import { $workDay } from '../../../api/personal/getWorkday'
import { $foreignInfo } from '../../../api/foreign/getForeign'
import { $addforeignInfo } from '../../../api/foreign/addForeign'
import { getDateformat } from '../../../utils/utils'
const flatPickrState = reactive({
    // Initial values
    dateDefault: null,
    dateCustom: null,
    dateFriendly: null,
    dateRange: null,
    timeStandalone: null,
    timeStandalone24: null,
    timeDateTime: null,
    timeDateTime24: null,
    inlineDefault: null,
    inlineTime: null,

    // Configuration, get more form https://chmln.github.io/flatpickr/options/
    configCustom: { dateFormat: "d-m-Y", },
    configFriendly: { dateFormat: "F j, Y", },
    configRange: {
        mode: "single", minDate: "today",
        enable: []
    },
    configTimeStandalone: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
    },
    configTimeStandalone24: {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
    },
    configDateTime: { enableTime: true },
    configDateTime24: { enableTime: true, time_24hr: true },
    configInlineDefault: { inline: true },
    configInlineTime: { inline: true, enableTime: true },
});
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
let message = ''
let messageInfo = []
function swalErrorEdit() {
    toast.fire("新增失敗", `${message}`, "error");
}
function swalEditSuccess() {
    toast.fire("新增成功", "代訂倉庫成功", "success");
}
function swalInfo() {
    let message = messageInfo.map(item => `廠區:${item.site_ID}，部門:${item.dept_ID}，數量:${item.meal_Number}， ${item.order_Desc}無法新增`).join("<br>");
    Swal.fire({
        title: "注意資訊",
        html: message,
        icon: "info",
        confirmButtonText: "確定"
    });
}
const selectedMeal_Order = ref('')
const isMeal = ref(true)
const isVegetarian = ref(true)
const btnMeal = ref('確認')
const btnVegetarian = ref('確認')
let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
const now = new Date(); // 取得現在時間
const hour = now.getHours(); // 取得現在小時
const minute = now.getMinutes(); // 取得現在分鐘

// 判斷現在時間屬於哪個範圍
if (hour >= 6 && hour <= 8) {
    selectedMeal_Order.value = '午餐';
} else if (hour >= 9 && hour <= 13) {
    selectedMeal_Order.value = '晚餐';
} else if (hour >= 14 && hour <= 23) {
    selectedMeal_Order.value = '宵夜';
} else {
    selectedMeal_Order.value = '早餐';
}
const getNoworkDates = async () => {
    try {
        console.log(y);
        let res = await $workDay({ year: `${y}` })
        //console.log(res);
        let dates = res //這是本月工作日
        //console.log(dates);
        const targetMonth = m; // 這裡指的是4月工作天
        //console.log(targetMonth);
        // 過濾出符合條件的日期 dates
        const filteredDates = dates.filter((dateString) => {
            const date = new Date(dateString);
            return date.getMonth() === targetMonth;
        });
        const targetNextMonth = m + 1 //這裡是下一個月的工作天
        const filteredNextMonthDates = dates.filter((dateString) => {
            const date = new Date(dateString);
            return date.getMonth() === targetNextMonth;
        });
        //console.log(filteredNextMonthDates);
        const mergedDates = filteredDates.concat(filteredNextMonthDates);
        //console.log(mergedDates);
        // let today = getDateformat()
        let today = new Date(); // 
        const twoWeeksLater = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14); // 獲取兩週後的日期
        //console.log(twoWeeksLater);
        //這還不確定 多測試幾天
        const result = mergedDates.slice(mergedDates.indexOf(today.toISOString().slice(0, 10)), mergedDates.indexOf(twoWeeksLater.toISOString().slice(0, 10)) + 1);
        //console.log(filteredDates); // ["2023-03-07", "2023-03-19"]
        flatPickrState.configRange.enable = result
        //console.log(flatPickrState.configRange.enable);
    } catch (err) {
        console.log(err);
    }
}
//
const cols = reactive([
    {
        id: 851,
        name: "CY",
        isShow: false
    },
    {
        id: 852,
        name: "JK8",
        isShow: false
    },
    {
        id: 853,
        name: "JKS",
        isShow: false
    },
    {
        id: 854,
        name: "LJ",
        isShow: false
    },
    {
        id: 855,
        name: "TC",
        isShow: false
    },
    {
        id: 856,
        name: "TRI",
        isShow: false
    },
    {
        id: 857,
        name: "WQ",
        isShow: false
    },
]);
//
let stateMeal = reactive([
    {
        meal: [
            { values: 0, title: "CY" },
            { meal_Number: 0, title: "CY" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JK8" },
            { meal_Number: 0, title: "JK8" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JKS" },
            { meal_Number: 0, title: "JKS" }
        ]
    },
    {
        meal: [
            { values: 0, title: "LJ" },
            { meal_Number: 0, title: "LJ" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TC" },
            { meal_Number: 0, title: "TC" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TRI" },
            { meal_Number: 0, title: "TRI" }
        ],
    },
    {
        meal: [
            { values: 0, title: "WQ" },
            { meal_Number: 0, title: "WQ" }
        ],
    }
])
let stateVegetarian = reactive([
    {
        meal: [
            { values: 0, title: "CY" },
            { meal_Number: 0, title: "CY" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JK8" },
            { meal_Number: 0, title: "JK8" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JKS" },
            { meal_Number: 0, title: "JKS" }
        ]
    },
    {
        meal: [
            { values: 0, title: "LJ" },
            { meal_Number: 0, title: "LJ" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TC" },
            { meal_Number: 0, title: "TC" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TRI" },
            { meal_Number: 0, title: "TRI" }
        ],
    },
    {
        meal: [
            { values: 0, title: "WQ" },
            { meal_Number: 0, title: "WQ" }
        ],
    }

])
watch(stateMeal, (newVal, oldVal) => {
    newVal.forEach((item, index) => {
        //console.log(item);
        if (item.meal[0].values !== 0) {
            //console.log(`item ${index} has changed to ${item.meal[0].values}`, `${item.meal[1].meal_Number}`);
            console.log(newVal[index].meal[0].values);
            item.meal[1].meal_Number = item.meal[0].values
        }
        else {
            item.meal[1].meal_Number = 0
        }
    })
})
watch(stateVegetarian, (newVal, oldVal) => {
    newVal.forEach((item, index) => {
        //console.log(item);
        if (item.meal[0].values !== 0) {
            //console.log(`item ${index} has changed to ${item.meal[0].values}`, `${item.meal[1].meal_Number}`);
            //console.log(newVal[index].meal[0].values);
            item.meal[1].meal_Number = item.meal[0].values
        }
        else {
            item.meal[1].meal_Number = 0
        }
    })
})
watch(selectedMeal_Order, (newVal, oldVal) => {
    console.log(selectedMeal_Order.value);
    console.log(flatPickrState.dateRange);
    const hour = new Date().getHours()
    const selectedDate = new Date(flatPickrState.dateRange);
    const today = new Date(getDateformat())
    if (selectedDate > today) {
        isMeal.value = true;// 顯示
        isVegetarian.value = true
        btnMeal.value = '確認'
        btnVegetarian.value = '確認'
    } else {
        if ((newVal === '早餐' && hour >= 6) ||
            (newVal === '午餐' && hour >= 9) ||
            (newVal === '晚餐' && hour >= 14)) {
            isMeal.value = false; // 隱藏
            isVegetarian.value = false
            btnMeal.value = '查詢'
            btnVegetarian.value = '查詢'
        } else {
            isMeal.value = true;// 顯示
            isVegetarian.value = true
            btnMeal.value = '確認'
            btnVegetarian.value = '確認'
        }
    }
})
watch(() => [flatPickrState.dateRange, selectedMeal_Order], (newVal, oldVal) => {
    console.log(flatPickrState.dateRange, selectedMeal_Order.value);
    console.log(selectedMeal_Order.value);
    const hour = new Date().getHours()
    const selectedDate = new Date(flatPickrState.dateRange);
    const today = new Date(getDateformat())
    console.log(newVal[1].value);
    if (selectedDate > today) {
        console.log(333);
        isMeal.value = true;// 顯示
        isVegetarian.value = true
        btnMeal.value = '確認'
        btnVegetarian.value = '確認'
    } else {
        if ((newVal[1].value === '早餐' && hour >= 6) ||
            (newVal[1].value === '午餐' && hour >= 9) ||
            (newVal[1].value === '晚餐' && hour >= 14)) {
            isMeal.value = false; // 隱藏
            isVegetarian.value = false
            btnMeal.value = '查詢'
            btnVegetarian.value = '查詢'
        } else {
            isMeal.value = true;// 顯示
            isVegetarian.value = true
            btnMeal.value = '確認'
            btnVegetarian.value = '確認'
        }
    }
});

let menu = []
const getinit = async () => {
    let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    //console.log(loginInfo.menu);
    let list = JSON.parse(loginInfo.menu);
    //console.log(list.MenusSelect);
    menu = list.MenusSelect.filter(item => {
        let data = [851, 852, 853, 854, 855, 856, 857].includes(item);//陣列的過濾跟字串不一樣
        //console.log(data);
        return data;
    })
    //console.log(menu);
    cols.forEach(col => {
        col.isShow = menu.includes(col.id);
    });
    stateMeal = stateMeal.filter(col => {
        const title = col.meal[0].title;
        const isShow = cols.find(item => item.name === title)?.isShow;
        return isShow !== undefined && isShow === true;
    });
    stateVegetarian = stateVegetarian.filter(col => {
        const title = col.meal[0].title;
        const isShow = cols.find(item => item.name === title)?.isShow;
        return isShow !== undefined && isShow === true;
    });
    //console.log(stateMeal);
    //console.log(stateVegetarian);
    try {
        let loadingInstance = ElLoading.service({
            text: "加載中，稍待片刻",
            background: "rgba(0,0,0,.7)"
        })
        await delay(300)//等待讓畫面出面
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let month = 0
        let day = 0
        if (m < 10) {
            month = `0${m + 1}`
            console.log(month);
        } else {
            month = `${m + 1}`
        }
        if ((d < 10)) {
            day = `0${d}`
        } else {
            day = `${d}`
        }
        let today = `${y}-${month}-${day}`
        //console.log(today);
        let res = await $foreignInfo({
            meal_OrderCust: 7,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            order_Date: today,
            meal_Order: "晚",
            op: loginInfo.worker_ID,
        })
        console.log(res);
        let data = res
        if (data.success) {
            if (data.payload[0].siteDept) {
                data.payload[0].siteDept.forEach(item => {//循環葷食 先默認午餐
                    //console.log(item.site_ID);
                    stateMeal.forEach(col => {
                        //console.log(col.meal[0].title);
                        //console.log(col.meal[1].meal_Number);
                        if (col.meal[0].title == item.site_ID) {
                            //console.log(item.meal_Number);
                            col.meal[0].values = item.meal_Number
                        }
                    })
                })
            }
            if (data.payload[1].siteDept) {
                data.payload[1].siteDept.forEach(item => {//循環素食 先默認晚餐
                    //console.log(item.site_ID);
                    stateVegetarian.forEach(col => {
                        console.log(col.meal[0].title);
                        console.log(col.meal[1].meal_Number);
                        if (col.meal[0].title == item.site_ID) {
                            console.log(item.meal_Number);
                            col.meal[0].values = item.meal_Number
                        }
                    })
                })
            }
            console.log(stateMeal);
            console.log(stateVegetarian);
            loadingInstance.close()//
        }
    } catch (err) {
        console.log(err);
    }

}
getinit()
getNoworkDates()
const filteredCols = computed(() => {
    return cols.filter(item => item.isShow)
})
const handleConfirm = async (date) => {
    console.log(date);
    let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    //console.log(loginInfo.menu);
    let list = JSON.parse(loginInfo.menu); // 
    //console.log(list.MenusSelect);
    menu = list.MenusSelect.filter(item => {
        let data = [851, 852, 853, 854, 855, 856, 857].includes(item);//陣列的過濾跟字串不一樣
        //console.log(data);
        return data;
    })
    console.log(menu);
    cols.forEach(col => {
        col.isShow = menu.includes(col.id);
    });
    console.log(cols);
    stateMeal = stateMeal.filter(col => {
        const title = col.meal[0].title;
        const isShow = cols.find(item => item.name === title)?.isShow;
        return isShow !== undefined && isShow === true;
    });
    stateVegetarian = stateVegetarian.filter(col => {
        const title = col.meal[0].title;
        const isShow = cols.find(item => item.name === title)?.isShow;
        return isShow !== undefined && isShow === true;
    });
    // console.log(stateMeal);
    // console.log(stateVegetarian);
    stateMeal.forEach(col => {//初始化
        col.meal[0].values = 0
    })
    stateVegetarian.forEach(col => {//初始化
        col.meal[0].values = 0
    })
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let meal_Order = selectedMeal_Order
        let res = await $foreignInfo({
            meal_OrderCust: 7,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            order_Date: date,
            "meal_Order": meal_Order.value.substring(0, 1),
            op: loginInfo.worker_ID,
        })
        console.log(res);
        let data = res
        if (data.success) {
            if (data.payload[0].siteDept) {
                stateMeal.forEach(col => {
                    col.meal[0].values = 0
                })
                data.payload[0].siteDept.forEach(item => {//循環葷食 先默認午餐
                    //console.log(item.site_ID);
                    stateMeal.forEach(col => {
                        //console.log(col.meal[0].title);
                        //console.log(col.meal[1].meal_Number);
                        if (col.meal[0].title == item.site_ID) {
                            //console.log(item.meal_Number);
                            col.meal[0].values = item.meal_Number
                        }
                    })
                })
            }
            if (data.payload[0].siteDept.length == 0) {
                stateMeal.forEach(col => {
                    col.meal[0].values = 0
                })
            }
            if (data.payload[1].siteDept) {
                stateVegetarian.forEach(col => {
                    col.meal[0].values = 0
                })
                data.payload[1].siteDept.forEach(item => {//循環素食 先默認晚餐
                    //console.log(item.site_ID);
                    stateVegetarian.forEach(col => {
                        //console.log(col.meal[0].title);
                        //console.log(col.meal[1].meal_Number);
                        if (col.meal[0].title == item.site_ID) {
                            console.log(item.meal_Number);
                            //col.meal[0].values = item.meal_Number
                        }
                    })
                })
            }
            if (data.payload[1].siteDept.length == 0) {
                stateVegetarian.forEach(col => {
                    col.meal[0].values = 0
                })
            }
            console.log(stateMeal);
            console.log(stateVegetarian);
        }
    } catch (err) {
        console.log(err);
    }
}
const handleMealConfirm = async () => {
    let siteDept = []
    console.log(stateMeal);
    for (const col of stateMeal) {//forEach只能同步 for of 可以異步
        console.log(col);
        let data = {
            "dept_ID": "811_外",
            "site_ID": col.meal[1].title,
            "meal_Number": col.meal[1].meal_Number
        }
        siteDept.push(data)
    }
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let meal_Order = selectedMeal_Order
        //console.log(meal_Order.value.substring(0, 1));
        //console.log(stateMeal[0].meal[1].meal_Number);
        let res = await $addforeignInfo({
            "meal_OrderCust": 7,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            "order_Date": flatPickrState.dateRange,
            "meal_Order": meal_Order.value.substring(0, 1),
            "meal_Type": "葷",
            "active": true,
            "op": loginInfo.worker_ID,
            "siteDept": siteDept
        })
        console.log(res);
        messageInfo = []
        let data = res
        if (data.success) {
            console.log(data);
            data.payload.forEach(item => {
                if (item.order_Desc === "無取餐地點") {
                    let data = {
                        'site_ID': item.site_ID,
                        'dept_ID': item.dept_ID,
                        'meal_Number': item.meal_Number,
                        'order_Desc': item.order_Desc,
                    }
                    messageInfo.push(data)
                }
            })
            console.log(messageInfo);
            if (messageInfo.length > 0) {
                swalInfo()
            } else {
                swalEditSuccess()
            }
        } else {
            console.log(data.message);
            message = data.message
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }
}
const handleVegetarianConfirm = async () => {
    console.log(date);
    let siteDept = []
    console.log(stateVegetarian);
    for (const col of stateVegetarian) {
        console.log(col);
        //forEach只能同步 for of 可以異步
        let data = {
            "dept_ID": "811_外",
            "site_ID": col.meal[1].title,
            "meal_Number": col.meal[1].meal_Number
        }
        siteDept.push(data)
        console.log(siteDept);
    }
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let meal_Order = selectedMeal_Order
        //console.log(meal_Order.value.substring(0, 1));
        //console.log(stateMeal[0].meal[1].meal_Number);
        let res = await $addforeignInfo({
            "meal_OrderCust": 7,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            "order_Date": flatPickrState.dateRange,
            "meal_Order": meal_Order.value.substring(0, 1),
            "meal_Type": "素",
            "active": true,
            "op": loginInfo.worker_ID,
            "siteDept": siteDept
        })
        console.log(res);
        messageInfo = []
        let data = res
        if (data.success) {
            console.log(data);
            data.payload.forEach(item => {
                if (item.order_Desc === "無取餐地點") {
                    let data = {
                        'site_ID': item.site_ID,
                        'dept_ID': item.dept_ID,
                        'meal_Number': item.meal_Number,
                        'order_Desc': item.order_Desc,
                    }
                    messageInfo.push(data)
                }
            })
            console.log(messageInfo);
            if (messageInfo.length > 0) {
                swalInfo()
            } else {
                swalEditSuccess()
            }
        } else {
            console.log(data.message);
            message = data.message
            swalErrorEdit()
        }
    } catch (err) {
        console.log(err);
    }
}

const isDate = ref('')
const handleDate = () => {
    flatPickrState.dateRange = getDateformat()
    console.log(flatPickrState.dateRange);
}
// { id: 551, parentId: 55, index: 39, menu: 851, title: 'CY', checked: false },
// { id: 552, parentId: 55, index: 40, menu: 852, title: 'JK8', checked: false },
// { id: 553, parentId: 55, index: 41, menu: 853, title: 'JKS', checked: false },
// { id: 554, parentId: 55, index: 42, menu: 854, title: 'LJ', checked: false },
// { id: 555, parentId: 55, index: 43, menu: 855, title: 'TC', checked: false },
// { id: 556, parentId: 55, index: 44, menu: 856, title: 'TRI', checked: false },
// { id: 557, parentId: 55, index: 45, menu: 857, title: 'WQ', checked: false },
onMounted(() => {
    //nextTick()完也沒用 感覺是要click後才能執行
    setTimeout(() => {
        handleDate()
    }, 100)
    flatPickrState.dateRange = getDateformat()
    setTimeout(() => {
        handleDate()
    }, 300)
})
</script>

<template>
    <div class="content">
        <BaseBlock title="代訂外國同仁">
            <template #options>
                <button class="btn btn-primary" type="button" @click=handleConfirm(flatPickrState.dateRange)>
                    確認
                </button>
            </template>
            <div class="row items-push text-center ">
                <div class="col-sm-6 col-md-4 offset-md-2">
                    <label class="form-label" for="example-flatpickr-default">選擇日期:</label>
                    <FlatPickr id="example-flatpickr-range" class="form-control" placeholder="請選擇日期..."
                        v-model="flatPickrState.dateRange" :config="flatPickrState.configRange" />
                </div>
                <div class="col-sm-6 col-md-4">
                    <label class="form-label" for="block-form1-type">選擇餐別:</label>
                    <div id="app">
                        <select id="default-select" class="form-select" v-model="selectedMeal_Order">
                            <option value="早餐">早餐</option>
                            <option value="午餐">午餐</option>
                            <option value="晚餐">晚餐</option>
                            <option value="宵夜">宵夜</option>
                        </select>
                    </div>
                </div>
            </div>
        </BaseBlock>
    </div>
    <div class="content">
        <BaseBlock title="葷食">
            <template #options>
                <button class="btn btn-primary" type="button" :disabled="!isMeal"
                    @click=handleMealConfirm(flatPickrState.dateRange)>
                    {{ btnMeal }}
                </button>
            </template>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 10%">廠別</th>
                            <th class="text-center" style="width: 10%">811_外</th>
                            <th class="text-center" style="width: 10%">總和</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in filteredCols" :key="key">
                            <td class="text-center">
                                <div>{{ item.name }}</div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control w-100  text-center" min="0"
                                        v-model="stateMeal[key].meal[0].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control w-100  text-center" min="0"
                                        v-model="stateMeal[key].meal[1].meal_Number" disabled="true" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </BaseBlock>
        <BaseBlock title="素食">
            <template #options>
                <button class="btn btn-primary" type="button" :disabled="!isVegetarian"
                    @click=handleVegetarianConfirm(flatPickrState.dateRange)>
                    {{ btnVegetarian }}
                </button>
            </template>
            <div class="table-responsive">
                <table class="table table-bordered table-striped table-vcenter">
                    <thead>
                        <tr>
                            <th class="text-center" style="width: 10%">廠別</th>
                            <th class="text-center" style="width: 10%">811_外</th>
                            <th class="text-center" style="width: 10%">總和</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in filteredCols" :key="key">
                            <td class="text-center">
                                <div>{{ item.name }}</div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control w-100  text-center" min="0"
                                        v-model="stateVegetarian[key].meal[0].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control w-100  text-center" min="0"
                                        v-model="stateVegetarian[key].meal[1].meal_Number" disabled="true" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </BaseBlock>
    </div>
    <button type="button" @click="handleDate" v-show="false" ref="isDate">日期</button>
    <div class="col-md-6">
        <button type="button" class="btn btn-alt-secondary push" @click="swalEditSuccess" v-show="false">
            <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEdit" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalInfo" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss">
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";
</style>