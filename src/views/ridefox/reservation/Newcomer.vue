<script setup>
import { reactive, ref, onMounted, computed, watch, nextTick } from "vue";
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
        enable: [],
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
    toast.fire("新增成功", "代訂新人成功", "success");
}
function swalInfo() {
    let message = messageInfo.map(item => `廠區:${item.site_ID}，數量:${item.meal_Number}， ${item.order_Desc}無法新增`).join("<br>");
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
        console.log(mergedDates);
        // let today = getDateformat()
        let today = new Date(); // 
        // 設置為今天的 0 時 0 分 0 秒
        today.setHours(0, 0, 0, 0);
        // 計算 2 個禮拜後的日期
        let twoWeeksLater = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000);
        console.log(twoWeeksLater);
        // 取得日期字串的格式化函式
        function formatDate(date) {
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
        // 篩選出包含在範圍內的日期
        let datesInRange = dates.filter(date => {
            let currentDate = new Date(date);
            return currentDate >= today && currentDate <= twoWeeksLater;
        }).map(date => formatDate(new Date(date)));
        console.log(datesInRange);
        flatPickrState.configRange.enable = datesInRange
        //console.log(flatPickrState.configRange.enable);
    } catch (err) {
        console.log(err);
    }
}
//
const cols = reactive([
    {
        id: 831,
        name: "CY",
        isShow: false
    },
    {
        id: 832,
        name: "JK8",
        isShow: false
    },
    {
        id: 833,
        name: "JKS",
        isShow: false
    },
    {
        id: 834,
        name: "LJ",
        isShow: false
    },
    {
        id: 835,
        name: "TC",
        isShow: false
    },
    {
        id: 836,
        name: "TRI",
        isShow: false
    },
    {
        id: 837,
        name: "WQ",
        isShow: false
    },
]);
let stateMeal = reactive([
    {
        meal: [
            { values: 0, title: "CY", dept_ID: "114" },
            { values: 0, title: "CY", dept_ID: "119" },
            { values: 0, title: "CY", dept_ID: "311" },
            { values: 0, title: "CY", dept_ID: "312" },
            { values: 0, title: "CY", dept_ID: "318" },
            { values: 0, title: "CY", dept_ID: "411" },
            { values: 0, title: "CY", dept_ID: "421" },
            { values: 0, title: "CY", dept_ID: "441" },
            { values: 0, title: "CY", dept_ID: "472" },
            { values: 0, title: "CY", dept_ID: "811" },
            { values: 0, title: "CY", dept_ID: "821" },
            { values: 0, title: "CY", dept_ID: "831" },
            { values: 0, title: "CY", dept_ID: "832" },
            { values: 0, title: "CY", dept_ID: "833" },
            { values: 0, title: "CY", dept_ID: "843" },
            { values: 0, title: "CY", dept_ID: "844" },
            { values: 0, title: "CY", dept_ID: "845" },
            { values: 0, title: "CY", dept_ID: "846" },
            { values: 0, title: "CY", dept_ID: "847" },
            { values: 0, title: "CY", dept_ID: "851" },
            { values: 0, title: "CY", dept_ID: "852" },
            { values: 0, title: "CY", dept_ID: "855" },
            { values: 0, title: "CY", dept_ID: "871" },
            { values: 0, title: "CY", dept_ID: "872" },
            { values: 0, title: "CY", dept_ID: "881" },
            { totals: 0, title: "CY" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JK8", dept_ID: "114" },
            { values: 0, title: "JK8", dept_ID: "119" },
            { values: 0, title: "JK8", dept_ID: "311" },
            { values: 0, title: "JK8", dept_ID: "312" },
            { values: 0, title: "JK8", dept_ID: "318" },
            { values: 0, title: "JK8", dept_ID: "411" },
            { values: 0, title: "JK8", dept_ID: "421" },
            { values: 0, title: "JK8", dept_ID: "441" },
            { values: 0, title: "JK8", dept_ID: "472" },
            { values: 0, title: "JK8", dept_ID: "811" },
            { values: 0, title: "JK8", dept_ID: "821" },
            { values: 0, title: "JK8", dept_ID: "831" },
            { values: 0, title: "JK8", dept_ID: "832" },
            { values: 0, title: "JK8", dept_ID: "833" },
            { values: 0, title: "JK8", dept_ID: "843" },
            { values: 0, title: "JK8", dept_ID: "844" },
            { values: 0, title: "JK8", dept_ID: "845" },
            { values: 0, title: "JK8", dept_ID: "846" },
            { values: 0, title: "JK8", dept_ID: "847" },
            { values: 0, title: "JK8", dept_ID: "851" },
            { values: 0, title: "JK8", dept_ID: "852" },
            { values: 0, title: "JK8", dept_ID: "855" },
            { values: 0, title: "JK8", dept_ID: "871" },
            { values: 0, title: "JK8", dept_ID: "872" },
            { values: 0, title: "JK8", dept_ID: "881" },
            { totals: 0, title: "JK8" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JKS", dept_ID: "114" },
            { values: 0, title: "JKS", dept_ID: "119" },
            { values: 0, title: "JKS", dept_ID: "311" },
            { values: 0, title: "JKS", dept_ID: "312" },
            { values: 0, title: "JKS", dept_ID: "318" },
            { values: 0, title: "JKS", dept_ID: "411" },
            { values: 0, title: "JKS", dept_ID: "421" },
            { values: 0, title: "JKS", dept_ID: "441" },
            { values: 0, title: "JKS", dept_ID: "472" },
            { values: 0, title: "JKS", dept_ID: "811" },
            { values: 0, title: "JKS", dept_ID: "821" },
            { values: 0, title: "JKS", dept_ID: "831" },
            { values: 0, title: "JKS", dept_ID: "832" },
            { values: 0, title: "JKS", dept_ID: "833" },
            { values: 0, title: "JKS", dept_ID: "843" },
            { values: 0, title: "JKS", dept_ID: "844" },
            { values: 0, title: "JKS", dept_ID: "845" },
            { values: 0, title: "JKS", dept_ID: "846" },
            { values: 0, title: "JKS", dept_ID: "847" },
            { values: 0, title: "JKS", dept_ID: "851" },
            { values: 0, title: "JKS", dept_ID: "852" },
            { values: 0, title: "JKS", dept_ID: "855" },
            { values: 0, title: "JKS", dept_ID: "871" },
            { values: 0, title: "JKS", dept_ID: "872" },
            { values: 0, title: "JKS", dept_ID: "881" },
            { totals: 0, title: "JKS" }
        ],
    },
    {
        meal: [
            { values: 0, title: "LJ", dept_ID: "114" },
            { values: 0, title: "LJ", dept_ID: "119" },
            { values: 0, title: "LJ", dept_ID: "311" },
            { values: 0, title: "LJ", dept_ID: "312" },
            { values: 0, title: "LJ", dept_ID: "318" },
            { values: 0, title: "LJ", dept_ID: "411" },
            { values: 0, title: "LJ", dept_ID: "421" },
            { values: 0, title: "LJ", dept_ID: "441" },
            { values: 0, title: "LJ", dept_ID: "472" },
            { values: 0, title: "LJ", dept_ID: "811" },
            { values: 0, title: "LJ", dept_ID: "821" },
            { values: 0, title: "LJ", dept_ID: "831" },
            { values: 0, title: "LJ", dept_ID: "832" },
            { values: 0, title: "LJ", dept_ID: "833" },
            { values: 0, title: "LJ", dept_ID: "843" },
            { values: 0, title: "LJ", dept_ID: "844" },
            { values: 0, title: "LJ", dept_ID: "845" },
            { values: 0, title: "LJ", dept_ID: "846" },
            { values: 0, title: "LJ", dept_ID: "847" },
            { values: 0, title: "LJ", dept_ID: "851" },
            { values: 0, title: "LJ", dept_ID: "852" },
            { values: 0, title: "LJ", dept_ID: "855" },
            { values: 0, title: "LJ", dept_ID: "871" },
            { values: 0, title: "LJ", dept_ID: "872" },
            { values: 0, title: "LJ", dept_ID: "881" },
            { totals: 0, title: "LJ" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TC", dept_ID: "114" },
            { values: 0, title: "TC", dept_ID: "119" },
            { values: 0, title: "TC", dept_ID: "311" },
            { values: 0, title: "TC", dept_ID: "312" },
            { values: 0, title: "TC", dept_ID: "318" },
            { values: 0, title: "TC", dept_ID: "411" },
            { values: 0, title: "TC", dept_ID: "421" },
            { values: 0, title: "TC", dept_ID: "441" },
            { values: 0, title: "TC", dept_ID: "472" },
            { values: 0, title: "TC", dept_ID: "811" },
            { values: 0, title: "TC", dept_ID: "821" },
            { values: 0, title: "TC", dept_ID: "831" },
            { values: 0, title: "TC", dept_ID: "832" },
            { values: 0, title: "TC", dept_ID: "833" },
            { values: 0, title: "TC", dept_ID: "843" },
            { values: 0, title: "TC", dept_ID: "844" },
            { values: 0, title: "TC", dept_ID: "845" },
            { values: 0, title: "TC", dept_ID: "846" },
            { values: 0, title: "TC", dept_ID: "847" },
            { values: 0, title: "TC", dept_ID: "851" },
            { values: 0, title: "TC", dept_ID: "852" },
            { values: 0, title: "TC", dept_ID: "855" },
            { values: 0, title: "TC", dept_ID: "871" },
            { values: 0, title: "TC", dept_ID: "872" },
            { values: 0, title: "TC", dept_ID: "881" },
            { totals: 0, title: "TC" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TRI", dept_ID: "114" },
            { values: 0, title: "TRI", dept_ID: "119" },
            { values: 0, title: "TRI", dept_ID: "311" },
            { values: 0, title: "TRI", dept_ID: "312" },
            { values: 0, title: "TRI", dept_ID: "318" },
            { values: 0, title: "TRI", dept_ID: "411" },
            { values: 0, title: "TRI", dept_ID: "421" },
            { values: 0, title: "TRI", dept_ID: "441" },
            { values: 0, title: "TRI", dept_ID: "472" },
            { values: 0, title: "TRI", dept_ID: "811" },
            { values: 0, title: "TRI", dept_ID: "821" },
            { values: 0, title: "TRI", dept_ID: "831" },
            { values: 0, title: "TRI", dept_ID: "832" },
            { values: 0, title: "TRI", dept_ID: "833" },
            { values: 0, title: "TRI", dept_ID: "843" },
            { values: 0, title: "TRI", dept_ID: "844" },
            { values: 0, title: "TRI", dept_ID: "845" },
            { values: 0, title: "TRI", dept_ID: "846" },
            { values: 0, title: "TRI", dept_ID: "847" },
            { values: 0, title: "TRI", dept_ID: "851" },
            { values: 0, title: "TRI", dept_ID: "852" },
            { values: 0, title: "TRI", dept_ID: "855" },
            { values: 0, title: "TRI", dept_ID: "871" },
            { values: 0, title: "TRI", dept_ID: "872" },
            { values: 0, title: "TRI", dept_ID: "881" },
            { totals: 0, title: "TRI" }
        ],
    },
    {
        meal: [
            { values: 0, title: "WQ", dept_ID: "114" },
            { values: 0, title: "WQ", dept_ID: "119" },
            { values: 0, title: "WQ", dept_ID: "311" },
            { values: 0, title: "WQ", dept_ID: "312" },
            { values: 0, title: "WQ", dept_ID: "318" },
            { values: 0, title: "WQ", dept_ID: "411" },
            { values: 0, title: "WQ", dept_ID: "421" },
            { values: 0, title: "WQ", dept_ID: "441" },
            { values: 0, title: "WQ", dept_ID: "472" },
            { values: 0, title: "WQ", dept_ID: "811" },
            { values: 0, title: "WQ", dept_ID: "821" },
            { values: 0, title: "WQ", dept_ID: "831" },
            { values: 0, title: "WQ", dept_ID: "832" },
            { values: 0, title: "WQ", dept_ID: "833" },
            { values: 0, title: "WQ", dept_ID: "843" },
            { values: 0, title: "WQ", dept_ID: "844" },
            { values: 0, title: "WQ", dept_ID: "845" },
            { values: 0, title: "WQ", dept_ID: "846" },
            { values: 0, title: "WQ", dept_ID: "847" },
            { values: 0, title: "WQ", dept_ID: "851" },
            { values: 0, title: "WQ", dept_ID: "852" },
            { values: 0, title: "WQ", dept_ID: "855" },
            { values: 0, title: "WQ", dept_ID: "871" },
            { values: 0, title: "WQ", dept_ID: "872" },
            { values: 0, title: "WQ", dept_ID: "881" },
            { totals: 0, title: "WQ" }
        ],
    },
])
let stateVegetarian = reactive([
    {
        meal: [
            { values: 0, title: "CY", dept_ID: "114" },
            { values: 0, title: "CY", dept_ID: "119" },
            { values: 0, title: "CY", dept_ID: "311" },
            { values: 0, title: "CY", dept_ID: "312" },
            { values: 0, title: "CY", dept_ID: "318" },
            { values: 0, title: "CY", dept_ID: "411" },
            { values: 0, title: "CY", dept_ID: "421" },
            { values: 0, title: "CY", dept_ID: "441" },
            { values: 0, title: "CY", dept_ID: "472" },
            { values: 0, title: "CY", dept_ID: "811" },
            { values: 0, title: "CY", dept_ID: "821" },
            { values: 0, title: "CY", dept_ID: "831" },
            { values: 0, title: "CY", dept_ID: "832" },
            { values: 0, title: "CY", dept_ID: "833" },
            { values: 0, title: "CY", dept_ID: "843" },
            { values: 0, title: "CY", dept_ID: "844" },
            { values: 0, title: "CY", dept_ID: "845" },
            { values: 0, title: "CY", dept_ID: "846" },
            { values: 0, title: "CY", dept_ID: "847" },
            { values: 0, title: "CY", dept_ID: "851" },
            { values: 0, title: "CY", dept_ID: "852" },
            { values: 0, title: "CY", dept_ID: "855" },
            { values: 0, title: "CY", dept_ID: "871" },
            { values: 0, title: "CY", dept_ID: "872" },
            { values: 0, title: "CY", dept_ID: "881" },
            { totals: 0, title: "CY" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JK8", dept_ID: "114" },
            { values: 0, title: "JK8", dept_ID: "119" },
            { values: 0, title: "JK8", dept_ID: "311" },
            { values: 0, title: "JK8", dept_ID: "312" },
            { values: 0, title: "JK8", dept_ID: "318" },
            { values: 0, title: "JK8", dept_ID: "411" },
            { values: 0, title: "JK8", dept_ID: "421" },
            { values: 0, title: "JK8", dept_ID: "441" },
            { values: 0, title: "JK8", dept_ID: "472" },
            { values: 0, title: "JK8", dept_ID: "811" },
            { values: 0, title: "JK8", dept_ID: "821" },
            { values: 0, title: "JK8", dept_ID: "831" },
            { values: 0, title: "JK8", dept_ID: "832" },
            { values: 0, title: "JK8", dept_ID: "833" },
            { values: 0, title: "JK8", dept_ID: "843" },
            { values: 0, title: "JK8", dept_ID: "844" },
            { values: 0, title: "JK8", dept_ID: "845" },
            { values: 0, title: "JK8", dept_ID: "846" },
            { values: 0, title: "JK8", dept_ID: "847" },
            { values: 0, title: "JK8", dept_ID: "851" },
            { values: 0, title: "JK8", dept_ID: "852" },
            { values: 0, title: "JK8", dept_ID: "855" },
            { values: 0, title: "JK8", dept_ID: "871" },
            { values: 0, title: "JK8", dept_ID: "872" },
            { values: 0, title: "JK8", dept_ID: "881" },
            { totals: 0, title: "JK8" }
        ],
    },
    {
        meal: [
            { values: 0, title: "JKS", dept_ID: "114" },
            { values: 0, title: "JKS", dept_ID: "119" },
            { values: 0, title: "JKS", dept_ID: "311" },
            { values: 0, title: "JKS", dept_ID: "312" },
            { values: 0, title: "JKS", dept_ID: "318" },
            { values: 0, title: "JKS", dept_ID: "411" },
            { values: 0, title: "JKS", dept_ID: "421" },
            { values: 0, title: "JKS", dept_ID: "441" },
            { values: 0, title: "JKS", dept_ID: "472" },
            { values: 0, title: "JKS", dept_ID: "811" },
            { values: 0, title: "JKS", dept_ID: "821" },
            { values: 0, title: "JKS", dept_ID: "831" },
            { values: 0, title: "JKS", dept_ID: "832" },
            { values: 0, title: "JKS", dept_ID: "833" },
            { values: 0, title: "JKS", dept_ID: "843" },
            { values: 0, title: "JKS", dept_ID: "844" },
            { values: 0, title: "JKS", dept_ID: "845" },
            { values: 0, title: "JKS", dept_ID: "846" },
            { values: 0, title: "JKS", dept_ID: "847" },
            { values: 0, title: "JKS", dept_ID: "851" },
            { values: 0, title: "JKS", dept_ID: "852" },
            { values: 0, title: "JKS", dept_ID: "855" },
            { values: 0, title: "JKS", dept_ID: "871" },
            { values: 0, title: "JKS", dept_ID: "872" },
            { values: 0, title: "JKS", dept_ID: "881" },
            { totals: 0, title: "JKS" }
        ],
    },
    {
        meal: [
            { values: 0, title: "LJ", dept_ID: "114" },
            { values: 0, title: "LJ", dept_ID: "119" },
            { values: 0, title: "LJ", dept_ID: "311" },
            { values: 0, title: "LJ", dept_ID: "312" },
            { values: 0, title: "LJ", dept_ID: "318" },
            { values: 0, title: "LJ", dept_ID: "411" },
            { values: 0, title: "LJ", dept_ID: "421" },
            { values: 0, title: "LJ", dept_ID: "441" },
            { values: 0, title: "LJ", dept_ID: "472" },
            { values: 0, title: "LJ", dept_ID: "811" },
            { values: 0, title: "LJ", dept_ID: "821" },
            { values: 0, title: "LJ", dept_ID: "831" },
            { values: 0, title: "LJ", dept_ID: "832" },
            { values: 0, title: "LJ", dept_ID: "833" },
            { values: 0, title: "LJ", dept_ID: "843" },
            { values: 0, title: "LJ", dept_ID: "844" },
            { values: 0, title: "LJ", dept_ID: "845" },
            { values: 0, title: "LJ", dept_ID: "846" },
            { values: 0, title: "LJ", dept_ID: "847" },
            { values: 0, title: "LJ", dept_ID: "851" },
            { values: 0, title: "LJ", dept_ID: "852" },
            { values: 0, title: "LJ", dept_ID: "855" },
            { values: 0, title: "LJ", dept_ID: "871" },
            { values: 0, title: "LJ", dept_ID: "872" },
            { values: 0, title: "LJ", dept_ID: "881" },
            { totals: 0, title: "LJ" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TC", dept_ID: "114" },
            { values: 0, title: "TC", dept_ID: "119" },
            { values: 0, title: "TC", dept_ID: "311" },
            { values: 0, title: "TC", dept_ID: "312" },
            { values: 0, title: "TC", dept_ID: "318" },
            { values: 0, title: "TC", dept_ID: "411" },
            { values: 0, title: "TC", dept_ID: "421" },
            { values: 0, title: "TC", dept_ID: "441" },
            { values: 0, title: "TC", dept_ID: "472" },
            { values: 0, title: "TC", dept_ID: "811" },
            { values: 0, title: "TC", dept_ID: "821" },
            { values: 0, title: "TC", dept_ID: "831" },
            { values: 0, title: "TC", dept_ID: "832" },
            { values: 0, title: "TC", dept_ID: "833" },
            { values: 0, title: "TC", dept_ID: "843" },
            { values: 0, title: "TC", dept_ID: "844" },
            { values: 0, title: "TC", dept_ID: "845" },
            { values: 0, title: "TC", dept_ID: "846" },
            { values: 0, title: "TC", dept_ID: "847" },
            { values: 0, title: "TC", dept_ID: "851" },
            { values: 0, title: "TC", dept_ID: "852" },
            { values: 0, title: "TC", dept_ID: "855" },
            { values: 0, title: "TC", dept_ID: "871" },
            { values: 0, title: "TC", dept_ID: "872" },
            { values: 0, title: "TC", dept_ID: "881" },
            { totals: 0, title: "TC" }
        ],
    },
    {
        meal: [
            { values: 0, title: "TRI", dept_ID: "114" },
            { values: 0, title: "TRI", dept_ID: "119" },
            { values: 0, title: "TRI", dept_ID: "311" },
            { values: 0, title: "TRI", dept_ID: "312" },
            { values: 0, title: "TRI", dept_ID: "318" },
            { values: 0, title: "TRI", dept_ID: "411" },
            { values: 0, title: "TRI", dept_ID: "421" },
            { values: 0, title: "TRI", dept_ID: "441" },
            { values: 0, title: "TRI", dept_ID: "472" },
            { values: 0, title: "TRI", dept_ID: "811" },
            { values: 0, title: "TRI", dept_ID: "821" },
            { values: 0, title: "TRI", dept_ID: "831" },
            { values: 0, title: "TRI", dept_ID: "832" },
            { values: 0, title: "TRI", dept_ID: "833" },
            { values: 0, title: "TRI", dept_ID: "843" },
            { values: 0, title: "TRI", dept_ID: "844" },
            { values: 0, title: "TRI", dept_ID: "845" },
            { values: 0, title: "TRI", dept_ID: "846" },
            { values: 0, title: "TRI", dept_ID: "847" },
            { values: 0, title: "TRI", dept_ID: "851" },
            { values: 0, title: "TRI", dept_ID: "852" },
            { values: 0, title: "TRI", dept_ID: "855" },
            { values: 0, title: "TRI", dept_ID: "871" },
            { values: 0, title: "TRI", dept_ID: "872" },
            { values: 0, title: "TRI", dept_ID: "881" },
            { totals: 0, title: "TRI" }
        ],
    },
    {
        meal: [
            { values: 0, title: "WQ", dept_ID: "114" },
            { values: 0, title: "WQ", dept_ID: "119" },
            { values: 0, title: "WQ", dept_ID: "311" },
            { values: 0, title: "WQ", dept_ID: "312" },
            { values: 0, title: "WQ", dept_ID: "318" },
            { values: 0, title: "WQ", dept_ID: "411" },
            { values: 0, title: "WQ", dept_ID: "421" },
            { values: 0, title: "WQ", dept_ID: "441" },
            { values: 0, title: "WQ", dept_ID: "472" },
            { values: 0, title: "WQ", dept_ID: "811" },
            { values: 0, title: "WQ", dept_ID: "821" },
            { values: 0, title: "WQ", dept_ID: "831" },
            { values: 0, title: "WQ", dept_ID: "832" },
            { values: 0, title: "WQ", dept_ID: "833" },
            { values: 0, title: "WQ", dept_ID: "843" },
            { values: 0, title: "WQ", dept_ID: "844" },
            { values: 0, title: "WQ", dept_ID: "845" },
            { values: 0, title: "WQ", dept_ID: "846" },
            { values: 0, title: "WQ", dept_ID: "847" },
            { values: 0, title: "WQ", dept_ID: "851" },
            { values: 0, title: "WQ", dept_ID: "852" },
            { values: 0, title: "WQ", dept_ID: "855" },
            { values: 0, title: "WQ", dept_ID: "871" },
            { values: 0, title: "WQ", dept_ID: "872" },
            { values: 0, title: "WQ", dept_ID: "881" },
            { totals: 0, title: "WQ" }
        ],
    },
])
watch(stateMeal, (newVal, oldVal) => {
    newVal.forEach((item, index) => {
        if (item.meal.some(meal => meal.values !== 0)) {//some可以理解成if(true)
            let sum = 0;
            for (let i = 0; i < 25; i++) {
                sum += item.meal[i].values;
            }
            item.meal[25].totals = sum;
        } else {
            item.meal[25].totals = 0;
        }
    })
})
watch(stateVegetarian, (newVal, oldVal) => {
    newVal.forEach((item, index) => {
        if (item.meal.some(meal => meal.values !== 0)) {//some可以理解成if(true)
            let sum = 0;
            for (let i = 0; i < 25; i++) {
                sum += item.meal[i].values;
            }
            item.meal[25].totals = sum;
        } else {
            item.meal[25].totals = 0;
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
    let list = JSON.parse(loginInfo.menu); // 将字符串转换为数组
    //console.log(list.MenusSelect);
    menu = list.MenusSelect.filter(item => {
        let data = [831, 832, 833, 834, 835, 836, 837].includes(item);//陣列的過濾跟字串不一樣
        //console.log(data);
        return data;
    })
    console.log(menu);
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
        let meal_Order = selectedMeal_Order
        //console.log(today);
        let res = await $foreignInfo({
            meal_OrderCust: 5,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            // order_Date: today,
            order_Date: today,
            meal_Order: meal_Order.value.substring(0, 1),
            op: loginInfo.worker_ID,
        })
        console.log(res);
        let data = res
        //console.log(data.payload[1].siteDept);
        if (data.success) {
            if (data.payload[0].siteDept) {
                stateMeal.forEach(col => {
                    for (let i = 0; i < 25; i++) {
                        col.meal[i].values = 0
                    }
                })
                data.payload[0].siteDept.forEach(item => {//循環葷食 先默認晚餐
                    //console.log(item.site_ID);
                    stateMeal.forEach(col => {
                        for (let i = 0; i < 25; i++) {
                            if (col.meal[i].title === item.site_ID && col.meal[i].dept_ID === item.dept_ID) {
                                col.meal[i].values = item.meal_Number;
                            }
                        }
                    })
                })
            }
            if (data.payload[1].siteDept) {
                stateVegetarian.forEach(col => {
                    for (let i = 0; i < 25; i++) {
                        col.meal[i].values = 0
                    }
                })
                data.payload[1].siteDept.forEach(item => {//循環素食 先默認晚餐
                    stateVegetarian.forEach(col => {
                        for (let i = 0; i < 25; i++) {
                            if (col.meal[i].title === item.site_ID && col.meal[i].dept_ID === item.dept_ID) {
                                col.meal[i].values = item.meal_Number;
                            }
                        }
                    })
                })
            }
            // console.log(stateMeal);
            // console.log(stateVegetarian);
            loadingInstance.close()//
        }
    } catch (err) {
        console.log(err);
    }
}
getinit()
getNoworkDates()
//
const handleConfirm = async (date) => {
    console.log(date);
    let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
    //console.log(loginInfo.menu);
    let list = JSON.parse(loginInfo.menu); // 
    //console.log(list.MenusSelect);
    menu = list.MenusSelect.filter(item => {
        let data = [831, 832, 833, 834, 835, 836, 837].includes(item);//陣列的過濾跟字串不一樣
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
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let meal_Order = selectedMeal_Order
        let res = await $foreignInfo({
            meal_OrderCust: 5,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            // order_Date: today,
            order_Date: date,
            "meal_Order": meal_Order.value.substring(0, 1),
            op: loginInfo.worker_ID,
        })
        console.log(res);
        let data = res
        if (data.success) {
            if (data.payload[0].siteDept) {
                stateMeal.forEach(col => {
                    for (let i = 0; i < 6; i++) {
                        col.meal[i].values = 0
                    }
                })
                data.payload[0].siteDept.forEach(item => {//循環葷食 先默認晚餐
                    //console.log(item.site_ID);
                    stateMeal.forEach(col => {
                        for (let i = 0; i < 25; i++) {
                            if (col.meal[i].title === item.site_ID && col.meal[i].dept_ID === item.dept_ID) {
                                col.meal[i].values = item.meal_Number;
                            }
                        }
                    })
                })
            }
            if (data.payload[1].siteDept) {
                stateVegetarian.forEach(col => {
                    for (let i = 0; i < 6; i++) {
                        col.meal[i].values = 0
                    }
                })
                data.payload[1].siteDept.forEach(item => {//循環素食 先默認晚餐
                    stateVegetarian.forEach(col => {
                        for (let i = 0; i < 25; i++) {
                            if (col.meal[i].title === item.site_ID && col.meal[i].dept_ID === item.dept_ID) {
                                col.meal[i].values = item.meal_Number;
                            }
                        }
                    })
                })
            }
            if (data.payload[0].siteDept.length == 0) {
                stateMeal.forEach(col => {
                    for (let i = 0; i < 25; i++) {
                        col.meal[i].values = 0
                    }
                })
            }
            if (data.payload[1].siteDept == 0) {
                stateVegetarian.forEach(col => {
                    for (let i = 0; i < 25; i++) {
                        col.meal[i].values = 0
                    }
                })
            }
            //console.log(stateMeal);
            //console.log(stateVegetarian);
        }
    } catch (err) {
        console.log(err);
    }
}
const handleMealConfirm = async (date) => {
    console.log(date);
    let siteDept = []
    console.log(stateMeal);
    const deptIds = ["114", "119", "311", "312", "318", "411", "421", "441", "472", "811", "821", "831", "832", "833", "843", "844", "845", "846", "847", "851", "852", "855", "871", "872", "881"];
    for (const col of stateMeal) {
        for (let i = 0; i < 25; i++) {
            const data = {
                "dept_ID": deptIds[i],
                "site_ID": col.meal[i].title,
                "meal_Number": col.meal[i].values
            };
            siteDept.push(data);
        }
    }
    //console.log(siteDept);
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let meal_Order = selectedMeal_Order
        console.log(siteDept);
        //console.log(meal_Order.value.substring(0, 1));
        //console.log(stateMeal[0].meal[1].meal_Number);
        let res = await $addforeignInfo({
            "meal_OrderCust": 5,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            // "order_Date": flatPickrState.dateRange,
            "order_Date": date,
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
            //console.log(data);
            data.payload.forEach(item => {
                if (item.order_Desc === "無取餐地點" || item.order_Desc.startsWith("無供應商供應")) {
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
const handleVegetarianConfirm = async (date) => {
    console.log(date);
    let siteDept = []
    console.log(stateMeal);
    const deptIds = ["114", "119", "311", "312", "318", "411", "421", "441", "472", "811", "821", "831", "832", "833", "843", "844", "845", "846", "847", "851", "852", "855", "871", "872", "881"];
    for (const col of stateMeal) {
        for (let i = 0; i < 25; i++) {
            const data = {
                "dept_ID": deptIds[i],
                "site_ID": col.meal[i].title,
                "meal_Number": col.meal[i].values
            };
            siteDept.push(data);
        }
    }
    //console.log(siteDept);
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let meal_Order = selectedMeal_Order
        console.log(siteDept);
        //console.log(meal_Order.value.substring(0, 1));
        //console.log(stateMeal[0].meal[1].meal_Number);
        let res = await $addforeignInfo({
            "meal_OrderCust": 5,       // 3:代訂產線 4:代訂倉庫 5:代訂新人 6:代訂外部人員 7:代訂外國同仁
            // "order_Date": flatPickrState.dateRange,
            "order_Date": date,
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
            //console.log(data);
            data.payload.forEach(item => {
                if (item.order_Desc === "無取餐地點" || item.order_Desc.startsWith("無供應商供應")) {
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
//
const isDate = ref('')
const handleDate = () => {
    flatPickrState.dateRange = getDateformat()
    console.log(flatPickrState.dateRange);
}
const filteredCols = computed(() => {
    return cols.filter(item => item.isShow)
})
// { id: 531, parentId: 53, index: 23, menu: 831, title: 'CY', checked: false },
// { id: 532, parentId: 53, index: 24, menu: 832, title: 'JK8', checked: false },
// { id: 533, parentId: 53, index: 25, menu: 833, title: 'JKS', checked: false },
// { id: 534, parentId: 53, index: 26, menu: 834, title: 'LJ', checked: false },
// { id: 535, parentId: 53, index: 27, menu: 835, title: 'TC', checked: false },
// { id: 536, parentId: 53, index: 28, menu: 836, title: 'TRI', checked: false },
// { id: 537, parentId: 53, index: 29, menu: 837, title: 'WQ', checked: false },
onMounted(() => {
    //nextTick()完也沒用 感覺是要click後才能執行
    setTimeout(() => {
        handleDate()
    }, 500)
    flatPickrState.dateRange = getDateformat()
    setTimeout(() => {
        handleDate()
    }, 100)
})
</script>

<template>
    <div class="content">
        <BaseBlock title="代訂新人">
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
                            <th class="text-center" style="width: 10%">114</th>
                            <th class="text-center" style="width: 10%">119</th>
                            <th class="text-center" style="width: 10%">311</th>
                            <th class="text-center" style="width: 10%">312</th>
                            <th class="text-center" style="width: 10%">318</th>
                            <th class="text-center" style="width: 10%">411</th>
                            <th class="text-center" style="width: 10%">421</th>
                            <th class="text-center" style="width: 10%">441</th>
                            <th class="text-center" style="width: 10%">472</th>
                            <th class="text-center" style="width: 10%">811</th>
                            <th class="text-center" style="width: 10%">821</th>
                            <th class="text-center" style="width: 10%">831</th>
                            <th class="text-center" style="width: 10%">832</th>
                            <th class="text-center" style="width: 10%">833</th>
                            <th class="text-center" style="width: 10%">843</th>
                            <th class="text-center" style="width: 10%">844</th>
                            <th class="text-center" style="width: 10%">845</th>
                            <th class="text-center" style="width: 10%">846</th>
                            <th class="text-center" style="width: 10%">847</th>
                            <th class="text-center" style="width: 10%">851</th>
                            <th class="text-center" style="width: 10%">852</th>
                            <th class="text-center" style="width: 10%">855</th>
                            <th class="text-center" style="width: 10%">871</th>
                            <th class="text-center" style="width: 10%">872</th>
                            <th class="text-center" style="width: 10%">881</th>
                            <th class="text-center" style="width: 10%">總和</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in filteredCols" :key="item">
                            <td class="text-center" style="width: 50%">
                                <div style="width: 100px;">{{ item.name }}</div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[0].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[1].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[2].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[3].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[4].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[5].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[6].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[7].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[8].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[9].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[10].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[11].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[12].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[13].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[14].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[15].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[16].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 100%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[17].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 100%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[18].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[19].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[20].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[21].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[22].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[23].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[24].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateMeal[key].meal[25].totals" :disabled="true" />
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
                            <th class="text-center" style="width: 10%">114</th>
                            <th class="text-center" style="width: 10%">119</th>
                            <th class="text-center" style="width: 10%">311</th>
                            <th class="text-center" style="width: 10%">312</th>
                            <th class="text-center" style="width: 10%">318</th>
                            <th class="text-center" style="width: 10%">411</th>
                            <th class="text-center" style="width: 10%">421</th>
                            <th class="text-center" style="width: 10%">441</th>
                            <th class="text-center" style="width: 10%">472</th>
                            <th class="text-center" style="width: 10%">811</th>
                            <th class="text-center" style="width: 10%">821</th>
                            <th class="text-center" style="width: 10%">831</th>
                            <th class="text-center" style="width: 10%">832</th>
                            <th class="text-center" style="width: 10%">833</th>
                            <th class="text-center" style="width: 10%">843</th>
                            <th class="text-center" style="width: 10%">844</th>
                            <th class="text-center" style="width: 10%">845</th>
                            <th class="text-center" style="width: 10%">846</th>
                            <th class="text-center" style="width: 10%">847</th>
                            <th class="text-center" style="width: 10%">851</th>
                            <th class="text-center" style="width: 10%">852</th>
                            <th class="text-center" style="width: 10%">855</th>
                            <th class="text-center" style="width: 10%">871</th>
                            <th class="text-center" style="width: 10%">872</th>
                            <th class="text-center" style="width: 10%">881</th>
                            <th class="text-center" style="width: 10%">總和</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in filteredCols" :key="item">
                            <td class="text-center" style="width: 50%">
                                <div style="width: 100px;">{{ item.name }}</div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[0].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[1].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[2].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[3].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[4].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[5].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[6].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[7].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[8].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[9].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[10].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[11].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[12].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[13].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[14].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[15].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[16].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 100%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[17].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 100%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[18].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[19].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[20].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[21].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[22].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[23].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        v-model="stateVegetarian[key].meal[24].values" />
                                </div>
                            </td>
                            <td class="text-center" style="width: 10%">
                                <div id="app" style="width: 100%">
                                    <input type="number" class="form-control text-center" style="width: 100px;" min="0"
                                        :disabled="true" v-model="stateVegetarian[key].meal[25].totals" />
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