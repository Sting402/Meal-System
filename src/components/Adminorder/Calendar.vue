<script setup>
import { ref, reactive, onMounted } from "vue";
import DefaultPop from './Calendar/DefaultPop.vue'
// FullCalendar, for more info and examples you can check out https://fullcalendar.io/
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import zhTwLocale from '@fullcalendar/core/locales/zh-tw'
import { useAdminOrderStore } from '../../stores/adminorder/adminorder'
import Popin from './Calendar/Popin.vue'
// Helper variables
const fullCalendar = ref(null);
const inputAddEvent = ref(null);
const store = useAdminOrderStore()
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

// Populate calendar with predefined events
calendarOptions.events = [
];

// Add new event data to the calendar on date click
function handleDateClick(arg) {
    // if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
    //     calendarOptions.events.push({
    //         title: "New Event",
    //         start: arg.date,
    //         allDay: arg.allDay,
    //     });
    // }
}

// When dropping an existing event to another date
function handleEventDrop(eventDropInfo) {
    window.console.log(eventDropInfo);
}
const isDefault = ref('')
function handleEventClick(clickInfo) {
    console.log(clickInfo.event)
    console.log(clickInfo.event.extendedProps.order);
    switch (clickInfo.event.extendedProps.order) {
        case 0:
            isDefault.value = store.isDefault
            console.log(isDefault.value);
            isDefault.value.click();
            break;
        // case 2:
        //     isSecond.value = store.isSecond
        //     isSecond.value.click()
        //     break;
        // case 3:
        //     isVisitors.value = store.isVisitors
        //     isVisitors.value.click()
        //     break;

    }
}
// When dropping an external event and is added to the calendar
function handleExternalDrop(info) {
    window.console.log(info);
}

// Add event form submission
// function addNewEvent() {
//     if (calendarNewEvent.value) {
//         // Add the event to the draggable list
//         calendarNewEvents.unshift({
//             title: calendarNewEvent.value,
//             color: "info",
//         });

//         // Reset and focus the input
//         calendarNewEvent.value = "";
//         inputAddEvent.value.focus();
//     }
// }

// Init draggable calendar events on content load
onMounted(() => {
    //預設餐點
    let data = []
    for (let i = 1; i < 26; i++) {
        data.push({
            title: "午餐",
            start: new Date(y, m, i),
            allDay: true,
            type: "默認餐",
            pro: "CY",
            type: "午餐",
            meals: "葷食",
            color: "rgb(76, 120, 221)",
            today: `${y}-${m + 1}-${i}`,
            order: 0
        })
    }
    for (let i = 0; i < 25; i++) {
        calendarOptions.events.push(
            data[i]
        )
    }
});
</script>

<style lang="scss">
// FullCalendar custom overrides
@import "@/assets/scss/vendor/fullcalendar";
</style>

<template>
    <div class="father">
        <DefaultPop></DefaultPop>
        <!-- <SecondPop></SecondPop>
                    <VisitorsPop></VisitorsPop> -->
    </div>
    <div class="content">
        <!-- Calendar -->
        <BaseBlock>
            <div class="row items-push">
                <div class="col-md-12 col-lg-12 col-xl-12">
                    <!-- Calendar Container -->
                    <!-- <button type="button" class="btn btn-primary push">新增餐點</button> -->
                    <Popin></Popin>
                    <FullCalendar ref="fullCalendar" :options="calendarOptions"></FullCalendar>
                </div>
            </div>
        </BaseBlock>
        <!-- END Calendar -->
    </div>
    <!-- END Page Content -->
</template>
<style lang="scss">
.father {
    display: flex;
    flex-direction: row;
}
</style>