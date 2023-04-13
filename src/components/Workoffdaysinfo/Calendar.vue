<script setup>
import { ref, reactive, onMounted } from "vue";

// FullCalendar, for more info and examples you can check out https://fullcalendar.io/
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import zhTwLocale from '@fullcalendar/core/locales/zh-tw'
import { $workoffdaysinfo } from '../../api/workoffdaysinfo/workoffdaysinfo'
const fullCalendar = ref(null);
const inputAddEvent = ref(null);
const calendarOptions = reactive({
    events: [],
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    firstDay: 1,
    editable: true,
    droppable: true,
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
    eventDrop: handleEventDrop,
    eventReceive: handleExternalDrop,
});

const calendarNewEvent = ref(null);
let date = new Date();
let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();

// Populate calendar with predefined events
calendarOptions.events = [
];

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
let NoWorkday = []
let data = []
const getNoWorkday = async () => {
    try {
        let res = await $workoffdaysinfo({})
        console.log(res);
        NoWorkday = res
        NoWorkday.forEach(item => {
            item.holiday
            data.push({
                title: "不供餐日",
                allDay: true,
                start: item.holiday,
                type: "不供餐日",
                color: "rgb(76, 120, 221)",
            })
        });
        for (let i = 0; i < data.length; i++) {
            calendarOptions.events.push(
                data[i]
            )
        }
    } catch (err) {
        console.log(err);
    }
}
getNoWorkday()
console.log(NoWorkday);
onMounted(() => {
    //預設餐點
    // let data = []
    //console.log(data);
    // let data = []
    // for (let i = 1; i < 28; i++) {
    //     data.push({
    //         title: "默認餐",
    //         start: new Date(y, m, i),
    //         allDay: true,
    //         type: "默認餐",
    //         dpSelected: "CY",
    //         mealsSelected: "午餐",
    //         options: "葷食",
    //         color: "rgb(76, 120, 221)",
    //         selectYear: `${y}-${m}-${d}`,
    //         selectDate: `${d}`,
    //         number: 1,
    //         index: i - 1
    //     })
    // }
    // for (let i = 0; i < 27; i++) {
    //     calendarOptions.events.push(
    //         data[i]
    //     )
    // }
});
</script>

<style lang="scss">
// FullCalendar custom overrides
@import "@/assets/scss/vendor/fullcalendar";
</style>

<template>
    <!-- Page Content -->
    <div class="content">
        <!-- Calendar -->
        <BaseBlock>
            <div class="row items-push">
                <div class="col-md-12 col-lg-12 col-xl-12">
                    <!-- Calendar Container -->
                    <!-- <button type="button" class="btn btn-primary push">新增餐點</button> -->
                    <FullCalendar ref="fullCalendar" :options="calendarOptions"></FullCalendar>
                </div>
            </div>
        </BaseBlock>
        <!-- END Calendar -->
    </div>
    <!-- END Page Content -->
</template>