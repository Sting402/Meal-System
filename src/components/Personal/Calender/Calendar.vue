<script setup>
import { ref, reactive, onMounted } from "vue";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import zhTwLocale from '@fullcalendar/core/locales/zh-tw'
import Popin from './Popin.vue'
import Swal from "sweetalert2";
import DefaultPop from "./DefaultPop.vue"
import SecondPop from './SecondPop.vue'
import VisitorsPop from "./VisitorsPop.vue";
import { $thatDay } from '../../../api/personal/getThatday'
import { storeToRefs } from "pinia";
import { usePersonaleStore } from '../../../stores/personal/personal';
import { $cancelDefault } from '../../../api/personal/cancelDefault'
import { $addVisitors } from '../../../api/personal/addVisitors'
const store = usePersonaleStore()
store.default_MealType = storeToRefs(store)
// Helper variables
const fullCalendar = ref(null);
const inputAddEvent = ref(null);
const isChangeDefault = ref('')
const isReorderDefault = ref('')
const isSecondAdd = ref('')
const isVisitorsAdd = ref('')
//
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
function swalErrorEdit() {
    toast.fire("編輯失敗", "請重新編輯", "error");
}
function swalEditSuccess() {
    toast.fire("編輯成功", "取消訂餐成功", "success");
}
function swalEditReorderSuccess() {
    toast.fire("編輯成功", "重新訂餐成功", "success");
}
// Calendar options, variables and events
const calendarOptions = reactive({
    events: [],
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    firstDay: 1,
    editable: true,
    droppable: true,
    eventOrder: 'order',
    headerToolbar: {
        // left: "title",
        // right: "prev,next today dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        left: "title",
        center: "",
        right: "prev,next today dayGridMonth,listWeek",
    },
    handleWindowResize: true,
    initialView: 'dayGridMonth',
    locale: zhTwLocale,
    dateClick: handleDateClick,
    eventClick: handleEventClick,
    // eventDrop: handleEventDrop,
    // eventReceive: handleExternalDrop,
});
const calendarNewEvent = ref(null);
// const calendarNewEvents = reactive([
// ]);

// Init Calendar
// Get current year, month and day
let date = new Date();
let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
// Add new event data to the calendar on date click
function handleDateClick(arg) {

}
// When dropping an existing event to another date
function handleEventDrop(eventDropInfo) {
    window.console.log(eventDropInfo);
}
// When dropping an external event and is added to the calendar
function handleExternalDrop(info) {
    window.console.log(info);
}
// 取得當前日期
const isDefault = ref('')
const isSecond = ref('')
const isVisitors = ref('')
async function handleEventClick(clickInfo) {
    //console.log(clickInfo.event)
    // console.log(clickInfo)
    //console.log(clickInfo.event.extendedProps);
    //console.log(clickInfo.event.extendedProps.worker_ID);
    //console.log(clickInfo.event.extendedProps.selectedDay);
    //console.log(clickInfo.event.extendedProps.dept_ID);
    switch (clickInfo.event.extendedProps.order) {
        case 0:
            console.log(clickInfo.event.extendedProps);
            store.data = clickInfo.event.extendedProps
            console.log(store.data);
            store.isDefaultEdit.click()
            isDefault.value = store.isDefault
            isDefault.value.click();
            break;
        case 1:
            console.log(clickInfo.event.extendedProps);
            store.secondEditData = clickInfo.event.extendedProps
            console.log(store.secondEditData);
            store.isSecondEdit.click()
            isSecond.value = store.isSecond
            isSecond.value.click()
            break;
        case 2:
            store.visitorsData = clickInfo.event.extendedProps
            console.log(store.visitorsData);
            store.isVisitorsEdit.click()
            isVisitors.value = store.isVisitors
            isVisitors.value.click()
            break;
    }
}
const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth() - 1, 26);
const end = new Date(today.getFullYear(), today.getMonth(), 25);
//取得全部餐點
const getWorkday = async () => {
    try {
        //console.log(y);
        // let res = await $workDay({ year: `${y}` })
        // let workday = res
        //console.log(res);
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        //console.log(loginInfo);
        let default_MealOrder = loginInfo.default_MealOrder
        let data = []
        let dataSecond = []
        let dataVisitors = []
        let resDays = await $thatDay({
            worker_ID: loginInfo.worker_ID,
            dept_ID: loginInfo.dept_ID,
            order_Year: `${y}`,  //Key
            order_Month: `${m + 1}`
        })
        let Days = resDays.payload
        //console.log(Days);
        const filteredDays = Days.filter((item) => item.active === false)//默認餐取消的
            .map((item) => {
                const orderDate = item.order_Date.replace(/T.*/, '');
                return {
                    ...item,
                    order_Date: new Date(orderDate).toISOString().slice(0, 10),
                };
            });
        //console.log(filteredDays);//默認餐取消天數
        const filterDefaultDays = Days.filter((item) => item.meal_Sort === 1)
        //console.log(filterDefaultDays);//默認餐天數
        const filerSecondDays = Days.filter((item) => item.meal_Sort === 2)
        const filerVisitors = Days.filter((item) => item.meal_Sort === 9)
        console.log(filerSecondDays);//新增第二餐的天數
        filterDefaultDays.forEach((item, key) => {//目前今天9點之前的時間顏色還不要變
            console.log(item);
            //console.log(item.site_ID);
            item.order_Date = item.order_Date.substring(0, 10)
            let color = ''
            let textColor = ''
            switch (item.meal_Order) {
                case '午':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(255, 237, 56)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
                case '晚':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(249, 107, 7)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '宵':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 0, 0)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '早':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 165, 219)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
            }
            // let color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(230,217,51)" : "rgb(145, 150, 147)";
            data.push({
                title: item.site_ID + default_MealOrder + '餐' + `(${item.meal_Type}食)`,
                allDay: true,
                start: item.order_Date,
                worker_ID: loginInfo.worker_ID,
                dept_ID: loginInfo.dept_ID,
                site_ID: item.site_ID,
                default_MealType: item.meal_Type + '食',
                default_MealOrder: default_MealOrder + '餐',
                color: color,
                textColor: textColor, // 将字体颜色设置为红色
                selectedDay: item.order_Date,
                isCancle: false,
                isReorder: true,
                index: key,
                enable: item.enable,
                // color: "rgb(76, 120, 221)",
                order: 0
            })
        })
        //console.log(data);
        data.forEach((item) => {
            filteredDays.some((day) => {
                //console.log(day);//感覺是默認餐的天數
                if (day.order_Date === item.start) {
                    item.isCancle = true
                    item.isReorder = false
                    //console.log(item.selectedDay);//是取消默認餐
                    item.color = 'rgb(145, 150, 147)'
                    if (!day.enable) {
                        item.color = 'rgb(145, 150, 147)'
                        item.title = day.meal_Order + '餐' + `(${day.meal_Type}食)` + '取消'
                    }
                }
            });
        });
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            calendarOptions.events.push(
                data[i]
            )
        }
        //新增第二餐
        filerSecondDays.forEach((item, key) => {
            //console.log(item);
            item.order_Date = item.order_Date.substring(0, 10)
            //console.log(item.order_Date);
            let color = ''
            let textColor = ''
            switch (item.meal_Order) {
                case '午':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(255, 237, 56)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
                case '晚':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(249, 107, 7)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '宵':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 0, 0)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '早':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 165, 219)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
            }
            dataSecond.push({
                title: item.site_ID + item.meal_Order + '餐' + `(${item.meal_Type}食)`,
                allDay: true,
                start: item.order_Date,
                worker_ID: loginInfo.worker_ID,
                dept_ID: loginInfo.dept_ID,
                site_ID: loginInfo.site_ID,
                default_MealType: item.meal_Type + '食',
                default_MealOrder: item.meal_Order + '餐',
                color: color,
                textColor: textColor,
                selectedDay: item.order_Date,
                enable: item.enable,
                // isCancle: false,
                // isReorder: true,
                index: key,
                // color: "rgb(76, 120, 221)",
                order: 1
            })
        })
        //console.log(dataSecond);
        for (let i = 0; i < dataSecond.length; i++) {
            calendarOptions.events.push(
                dataSecond[i]
            )
        }
        //新增訪客
        filerVisitors.forEach((item, key) => {
            item.order_Date = item.order_Date.substring(0, 10)
            let color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? 'rgb(0, 178, 122)' : "rgb(145, 150, 147)";
            let textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? 'white' : "black";
            dataVisitors.push({
                title: item.site_ID + '訪客訂餐',
                allDay: true,
                start: item.order_Date,
                worker_ID: item.worker_ID,
                dept_ID: item.dept_ID,
                site_ID: item.site_ID,
                meal_Type: item.meal_Type,
                meal_Number: item.meal_Number,
                meal_Type2: item.meal_Type2,
                meal_Number2: item.meal_Number2,
                meal_Order: item.meal_Order,
                selectedDay: item.order_Date,
                meal_Sort: item.meal_Sort,
                meal_OrderCustComp: item.meal_OrderCustComp,
                meal_OrderCustMember: item.meal_OrderCustMember,
                order_Desc: item.order_Desc,
                color: color,
                textColor: textColor,
                enable: item.enable,
                order: 2
            })
        })
        //console.log(dataVisitors);
        for (let i = 0; i < dataVisitors.length; i++) {
            calendarOptions.events.push(
                dataVisitors[i]
            )
        }
    } catch (err) {
        console.log(err);
    }
}
//個人默認餐取消訂餐
const handleChange = async () => {
    //console.log(123);
    //console.log(calendarOptions.events[store.data.index]);
    //console.log(calendarOptions.events[store.data.index].color);
    //console.log(store.data.selectedDay);//單一個的data
    // calendarOptions.events[store.data.index].color = 'rgb(145, 150, 147)' 修改顏色
    // const eventsOnDate = calendarOptions.events.filter(event => {
    //     return event.start === '2023-03-21';
    // });
    //console.log(eventsOnDate);
    let arr = []
    calendarOptions.events.forEach(event => {
        //console.log(event.start);
        if (event.start === store.data.selectedDay && event.order === 0) {
            console.log(event);
            arr.push(event)
            event.color = 'rgb(145, 150, 147)'
        }
    });
    //console.log(arr[0].default_MealOrder);
    //console.log(arr[0].start);
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        const newStr = arr[0].default_MealOrder.substring(0, 1)
        //console.log(newStr);//查詢哪邊錯
        let res = await $cancelDefault({
            worker_ID: loginInfo.worker_ID,
            order_Date: arr[0].start,
            meal_Order: newStr,
            meal_OrderCust: 0,        //0：自己訂; 1：代客戶訂；
            Active: false,            //false:取消; true:恢復
            // "op": "103136"
        })
        console.log(res);
        let data = res.success
        if (data) {
            swalEditSuccess()
            calendarOptions.events = []
            getWorkday()
        } else {
            swalErrorEdit()
        }

    } catch (err) {
        console.log(err);
    }
}
//個人恢復訂餐
const ReorderChange = async () => {
    //console.log(store.data.selectedDay);
    console.log(store.data);
    let arr = []
    calendarOptions.events.forEach(event => {
        //console.log(event.start);
        if (event.start === store.data.selectedDay && event.order === 0) {
            console.log(event);
            arr.push(event)
            event.color = "rgb(76, 120, 221)"
        }
    });
    try {
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        const newStr = arr[0].default_MealOrder.substring(0, 1)
        console.log(newStr);
        console.log(store.defaultsite_ID);//先預備 LJ
        console.log(store.default_MealType);//先預備 葷食
        //console.log(store.data);
        let res = await $addVisitors({
            worker_ID: loginInfo.worker_ID,
            order_Date: arr[0].start,
            "dept_ID": loginInfo.dept_ID,
            Site_ID: store.defaultsite_ID,
            meal_Order: newStr,//午
            meal_OrderCust: 0,        //0：自己訂; 1：代客戶訂；
            Active: true,             //false:取消; true:恢復
            "meal_Number": 1,
            "op": loginInfo.worker_ID,
            meal_Type: store.default_MealType.substring(0, 1) //葷 素
            // meal_Type: '輕'
        })
        console.log(res.payload.meal_Type);
        store.default_MealType = res.payload.meal_Type
        switch (store.default_MealType) {
            case '葷':
                store.default_MealType = '葷食'
                break;
            case '素':
                store.default_MealType = '素食'
                break;
            case '輕':
                store.default_MealType = '輕食'
                break;
        }
        console.log(store.default_MealType);
        let data = res.success
        if (data) {
            swalEditReorderSuccess()
            calendarOptions.events = []
            getWorkday()
        } else {
            console.log(res.message);
            swalErrorEdit()
        }


    } catch (err) {
        console.log(err);
    }
}
//個人新增第二餐
const SecondAdd = async () => {
    console.log('Second');
    calendarOptions.events = []
    getWorkday()
}
//訪客新增訂單
const VisitorsAdd = async () => {
    console.log(store.visitorsData.selectedDay);
    calendarOptions.events = []
    getWorkday()
}
//獲取下一個月或上一個月
const gePrevORNext = async (year, month) => {
    try {
        calendarOptions.events = []
        console.log(year);
        console.log(month);
        let loginInfo = await JSON.parse(localStorage.getItem('loginInfo'))
        let default_MealOrder = loginInfo.default_MealOrder
        let data = []
        let dataSecond = []
        let dataVisitors = []
        let resDays = await $thatDay({
            worker_ID: loginInfo.worker_ID,
            dept_ID: loginInfo.dept_ID,
            order_Year: `${year}`,  //Key
            order_Month: `${month}`
        })
        let Days = resDays.payload
        const filteredDays = Days.filter((item) => item.active === false)//默認餐取消的
            .map((item) => {
                const orderDate = item.order_Date.replace(/T.*/, '');
                return {
                    ...item,
                    order_Date: new Date(orderDate).toISOString().slice(0, 10),
                };
            });
        //console.log(filteredDays);//默認餐取消天數
        const filterDefaultDays = Days.filter((item) => item.meal_Sort === 1)
        //console.log(filterDefaultDays);//默認餐天數
        const filerSecondDays = Days.filter((item) => item.meal_Sort === 2)
        const filerVisitors = Days.filter((item) => item.meal_Sort === 9)
        //console.log(filerSecondDays);//新增第二餐的天數
        filterDefaultDays.forEach((item, key) => {//目前今天9點之前的時間顏色還不要變
            console.log(item);
            //console.log(item.site_ID);
            item.order_Date = item.order_Date.substring(0, 10)
            let color = ''
            let textColor = ''
            switch (item.meal_Order) {
                case '午':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(255, 237, 56)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
                case '晚':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(249, 107, 7)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '宵':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 0, 0)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '早':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 165, 219)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
            }
            // let color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(230,217,51)" : "rgb(145, 150, 147)";
            data.push({
                title: item.site_ID + default_MealOrder + '餐' + `(${item.meal_Type}食)`,
                allDay: true,
                start: item.order_Date,
                worker_ID: loginInfo.worker_ID,
                dept_ID: loginInfo.dept_ID,
                site_ID: item.site_ID,
                default_MealType: item.meal_Type + '食',
                default_MealOrder: default_MealOrder + '餐',
                color: color,
                textColor: textColor, // 将字体颜色设置为红色
                selectedDay: item.order_Date,
                isCancle: false,
                isReorder: true,
                index: key,
                enable: item.enable,
                // color: "rgb(76, 120, 221)",
                order: 0
            })
        })
        data.forEach((item) => {
            filteredDays.some((day) => {
                if (day.order_Date === item.start) {
                    //console.log(item);
                    item.isCancle = true
                    item.isReorder = false
                    item.color = 'rgb(145, 150, 147)'
                    if (!day.enable) {
                        item.color = 'rgb(145, 150, 147)'
                        item.title = day.meal_Order + '餐' + `(${day.meal_Type}食)` + '取消'
                    }
                }
            });
        });
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
            calendarOptions.events.push(
                data[i]
            )
        }
        filerSecondDays.forEach((item, key) => {
            //console.log(item);
            item.order_Date = item.order_Date.substring(0, 10)
            //console.log(item.order_Date);
            let color = ''
            let textColor = ''
            switch (item.meal_Order) {
                case '午':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(255, 237, 56)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
                case '晚':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(249, 107, 7)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '宵':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 0, 0)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "white" : "black";
                    break;
                case '早':
                    color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "rgb(0, 165, 219)" : "rgb(145, 150, 147)";
                    textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? "black" : "black";
                    break;
            }
            dataSecond.push({
                title: item.site_ID + item.meal_Order + '餐' + `(${item.meal_Type}食)`,
                allDay: true,
                start: item.order_Date,
                worker_ID: loginInfo.worker_ID,
                dept_ID: loginInfo.dept_ID,
                site_ID: loginInfo.site_ID,
                default_MealType: item.meal_Type + '食',
                default_MealOrder: item.meal_Order + '餐',
                color: color,
                textColor: textColor,
                selectedDay: item.order_Date,
                enable: item.enable,
                // isCancle: false,
                // isReorder: true,
                index: key,
                // color: "rgb(76, 120, 221)",
                order: 1
            })
        })
        for (let i = 0; i < dataSecond.length; i++) {
            calendarOptions.events.push(
                dataSecond[i]
            )
        }
        filerVisitors.forEach((item, key) => {
            item.order_Date = item.order_Date.substring(0, 10)
            let color = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? 'rgb(0, 178, 122)' : "rgb(145, 150, 147)";
            let textColor = item.order_Date >= (new Date()).toISOString().slice(0, 10) ? 'white' : "black";
            dataVisitors.push({
                title: item.site_ID + '訪客訂餐',
                allDay: true,
                start: item.order_Date,
                worker_ID: item.worker_ID,
                dept_ID: item.dept_ID,
                site_ID: item.site_ID,
                meal_Type: item.meal_Type,
                meal_Number: item.meal_Number,
                meal_Type2: item.meal_Type2,
                meal_Number2: item.meal_Number2,
                meal_Order: item.meal_Order,
                selectedDay: item.order_Date,
                meal_Sort: item.meal_Sort,
                meal_OrderCustComp: item.meal_OrderCustComp,
                meal_OrderCustMember: item.meal_OrderCustMember,
                order_Desc: item.order_Desc,
                color: color,
                textColor: textColor,
                enable: item.enable,
                order: 2
            })
        })
        for (let i = 0; i < dataVisitors.length; i++) {
            calendarOptions.events.push(
                dataVisitors[i]
            )
        }
    } catch (err) {
        console.log(err);
    }
}
getWorkday()
onMounted(() => {
    store.isChangeDefault = isChangeDefault.value
    store.isReorderDefault = isReorderDefault.value
    store.isVisitorsAdd = isVisitorsAdd.value
    store.isSecondAdd = isSecondAdd.value
    //console.log(fullCalendar.value);
    // 選擇左右切換月份的按鈕
    const prevButton = document.querySelector('.fc-prev-button')
    const nextButton = document.querySelector('.fc-next-button')
    //console.log(prevButton);
    prevButton.addEventListener('click', () => {
        console.log('Prev button clicked')
        console.log(fullCalendar.value.calendar.currentData.viewTitle);
        let prevYear = fullCalendar.value.calendar.currentData.viewTitle.substring(0, 4)
        console.log(prevYear);
        const regex = /(\d{1,2})月/;
        const match = fullCalendar.value.calendar.currentData.viewTitle.match(regex);
        const month = parseInt(match[1], 10);
        //console.log(`${month}`);
        let prevMonth = month.toString()
        console.log(prevMonth);
        gePrevORNext(prevYear, prevMonth)
    })

    nextButton.addEventListener('click', () => {
        console.log('Next button clicked')
        console.log(fullCalendar.value.calendar.currentData.viewTitle);
        let nextYear = fullCalendar.value.calendar.currentData.viewTitle.substring(0, 4)
        console.log(nextYear);
        const regex = /(\d{1,2})月/;
        const match = fullCalendar.value.calendar.currentData.viewTitle.match(regex);
        const month = parseInt(match[1], 10);
        //console.log(`${month}`);
        let nextMonth = month.toString()
        console.log(nextMonth);
        gePrevORNext(nextYear, nextMonth)
    })
});

</script>
<template>
    <!-- Page Content -->
    <div class="father">
        <DefaultPop></DefaultPop>
        <SecondPop></SecondPop>
        <VisitorsPop></VisitorsPop>
    </div>
    <div class="content">
        <!-- Calendar -->
        <BaseBlock>
            <div class="row items-push">
                <div class="col-md-12 col-lg-12 col-xl-12">
                    <!-- Calendar Container -->
                    <!-- <button type="button" class="btn btn-primary push">新增餐點</button> -->
                    <Popin></Popin>
                    <FullCalendar ref="fullCalendar" :options="calendarOptions">
                    </FullCalendar>
                </div>
            </div>
            <button @click="handleChange" ref="isChangeDefault" v-show="false">個人默認餐取消訂餐</button>
            <button @click="ReorderChange" ref="isReorderDefault" v-show="false">個人恢復訂餐</button>
            <button @click="SecondAdd" ref="isSecondAdd" v-show="false">訪客代訂</button>
            <button @click="VisitorsAdd" ref="isVisitorsAdd" v-show="false">訪客代訂</button>
        </BaseBlock>
    </div>
    <div class="col-md-6">
        <button type="button" class="btn btn-alt-secondary push" @click="swalEditSuccess" v-show="false">
            <i class="fa fa-check-circle text-success me-1"></i> Launch Dialog
        </button>
        <button type="button" class="btn btn-alt-secondary push" @click="swalErrorEdit" v-show="false">
            <i class="fa fa-times-circle text-danger me-1"></i> Launch Dialog
        </button>
    </div>
</template>
<style lang="scss">
// FullCalendar custom overrides
@import "@/assets/scss/vendor/fullcalendar";
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";
@import "sweetalert2/dist/sweetalert2.min.css";

.father {
    display: flex;
    flex-direction: row;
}
</style>