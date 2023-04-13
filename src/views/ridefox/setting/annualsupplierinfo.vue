<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { $annualSupplier } from '../../../api/annualsupplierinfo/getAnnualSupplier'
import { $editSupplier } from '../../../api/annualsupplierinfo/editAnnualSupplier'

//CY
const CYVModle = reactive([
    {
        options: [
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
            { value: null, text: null, selected: false },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
//JK8
const JK8VModle = reactive([
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
//JKS
const JKSVModle = reactive([
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
//LJ
const LJVModle = reactive([
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
//TC
const TCVModle = reactive([
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
//TRI
const TRIVModle = reactive([
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
//WQ
const WQVModle = reactive([
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    },
    {
        options: [
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
            { value: null },
        ]
    }
])
const state = reactive({
    CBD: null,
    CY: null,
    JK8: null,
    JKS: null,
    LJ: null,
    TC: null,
    TRI: null,
    WQ: null
})
const stateSelect = reactive({
    CBD: null,
    CY: null,
    JK8: null,
    JKS: null,
    LJ: null,
    TC: null,
    TRI: null,
    WQ: null
})
const CYselectOption = reactive([
    {
        options: [[], [], [], [], [], [], [], [], [], [], [], []],
    },
    {
        options: [],
    },
    {
        options: [],
    },
    {
        options: [],
    },
    {
        options: [],
    },
    {
        options: [],
    },
])

let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
const selectedThisYear = ref(`${y}`);

const getInitSite = async () => {
    try {
        let res = await $annualSupplier({
            site_ID: 'CY',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.CY = data.payload
        //console.log(CYselectOption);
        //console.log(stateSelect.CY);
        // stateSelect.CY.forEach((item, key) => {
        //     //console.log(key);
        //     //console.log(item.午葷素);
        //     for (let i = 0; i < item.午葷素.length; i++) {
        //         CYselectOption[0].options[key].push(item.午葷素[i].text)
        //     }
        // })
        stateSelect.CY.forEach((item, key) => {
            console.log(item);
            CYVModle[0].options[key].value = item.午葷素value
            CYVModle[1].options[key].value = item.晚葷素value
            CYVModle[2].options[key].value = item.宵葷素value
            CYVModle[3].options[key].value = item.早葷素value
            CYVModle[4].options[key].value = item.午輕value
            CYVModle[5].options[key].value = item.午菲value
            CYVModle[6].options[key].value = item.宵菲value
            CYVModle[0].options[key].readonly = item.午葷素readonly
            CYVModle[1].options[key].readonly = item.晚葷素readonly
            CYVModle[2].options[key].readonly = item.宵葷素readonly
            CYVModle[3].options[key].readonly = item.早葷素readonly
            CYVModle[4].options[key].readonly = item.午輕readonly
            CYVModle[5].options[key].readonly = item.午菲readonly
            CYVModle[6].options[key].readonly = item.宵菲readonly
        })
        // console.log(CYVModle);
        // console.log(CYVModle[0].options[2].value);
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'JK8',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.JK8 = data.payload
        //console.log(stateSelect.JK8);
        stateSelect.JK8.forEach((item, key) => {
            //console.log(item.午葷素value);
            JK8VModle[0].options[key].value = item.午葷素value
            JK8VModle[1].options[key].value = item.晚葷素value
            JK8VModle[2].options[key].value = item.宵葷素value
            JK8VModle[3].options[key].value = item.早葷素value
            JK8VModle[4].options[key].value = item.午輕value
            JK8VModle[5].options[key].value = item.午菲value
            JK8VModle[6].options[key].value = item.宵菲value
            JK8VModle[0].options[key].readonly = item.午葷素readonly
            JK8VModle[1].options[key].readonly = item.晚葷素readonly
            JK8VModle[2].options[key].readonly = item.宵葷素readonly
            JK8VModle[3].options[key].readonly = item.早葷素readonly
            JK8VModle[4].options[key].readonly = item.午輕readonly
            JK8VModle[5].options[key].readonly = item.午菲readonly
            JK8VModle[6].options[key].readonly = item.宵菲readonly

        })
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'JKS',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.JKS = data.payload
        //console.log(stateSelect.JKS);
        stateSelect.JKS.forEach((item, key) => {
            //console.log(item.午葷素value);
            JKSVModle[0].options[key].value = item.午葷素value
            JKSVModle[1].options[key].value = item.晚葷素value
            JKSVModle[2].options[key].value = item.宵葷素value
            JKSVModle[3].options[key].value = item.早葷素value
            JKSVModle[4].options[key].value = item.午輕value
            JKSVModle[5].options[key].value = item.午菲value
            JKSVModle[6].options[key].value = item.宵菲value
            JKSVModle[0].options[key].readonly = item.午葷素readonly
            JKSVModle[1].options[key].readonly = item.晚葷素readonly
            JKSVModle[2].options[key].readonly = item.宵葷素readonly
            JKSVModle[3].options[key].readonly = item.早葷素readonly
            JKSVModle[4].options[key].readonly = item.午輕readonly
            JKSVModle[5].options[key].readonly = item.午菲readonly
            JKSVModle[6].options[key].readonly = item.宵菲readonly
        })
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'LJ',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.LJ = data.payload
        //console.log(stateSelect.LJ);
        stateSelect.LJ.forEach((item, key) => {
            //console.log(item.午葷素value);
            LJVModle[0].options[key].value = item.午葷素value
            LJVModle[1].options[key].value = item.晚葷素value
            LJVModle[2].options[key].value = item.宵葷素value
            LJVModle[3].options[key].value = item.早葷素value
            LJVModle[4].options[key].value = item.午輕value
            LJVModle[5].options[key].value = item.午菲value
            LJVModle[6].options[key].value = item.宵菲value
            LJVModle[0].options[key].readonly = item.午葷素readonly
            LJVModle[1].options[key].readonly = item.晚葷素readonly
            LJVModle[2].options[key].readonly = item.宵葷素readonly
            LJVModle[3].options[key].readonly = item.早葷素readonly
            LJVModle[4].options[key].readonly = item.午輕readonly
            LJVModle[5].options[key].readonly = item.午菲readonly
            LJVModle[6].options[key].readonly = item.宵菲readonly
        })
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'TC',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.TC = data.payload
        //console.log(stateSelect.TC);
        stateSelect.TC.forEach((item, key) => {
            //console.log(item.午葷素value);
            TCVModle[0].options[key].value = item.午葷素value
            TCVModle[1].options[key].value = item.晚葷素value
            TCVModle[2].options[key].value = item.宵葷素value
            TCVModle[3].options[key].value = item.早葷素value
            TCVModle[4].options[key].value = item.午輕value
            TCVModle[5].options[key].value = item.午菲value
            TCVModle[6].options[key].value = item.宵菲value
            TCVModle[0].options[key].readonly = item.午葷素readonly
            TCVModle[1].options[key].readonly = item.晚葷素readonly
            TCVModle[2].options[key].readonly = item.宵葷素readonly
            TCVModle[3].options[key].readonly = item.早葷素readonly
            TCVModle[4].options[key].readonly = item.午輕readonly
            TCVModle[5].options[key].readonly = item.午菲readonly
            TCVModle[6].options[key].readonly = item.宵菲readonly
        })
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'TRI',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.TRI = data.payload
        //console.log(stateSelect.TRI);
        stateSelect.TRI.forEach((item, key) => {
            TRIVModle[0].options[key].value = item.午葷素value
            TRIVModle[1].options[key].value = item.晚葷素value
            TRIVModle[2].options[key].value = item.宵葷素value
            TRIVModle[3].options[key].value = item.早葷素value
            TRIVModle[4].options[key].value = item.午輕value
            TRIVModle[5].options[key].value = item.午菲value
            TRIVModle[6].options[key].value = item.宵菲value
            TRIVModle[0].options[key].readonly = item.午葷素readonly
            TRIVModle[1].options[key].readonly = item.晚葷素readonly
            TRIVModle[2].options[key].readonly = item.宵葷素readonly
            TRIVModle[3].options[key].readonly = item.早葷素readonly
            TRIVModle[4].options[key].readonly = item.午輕readonly
            TRIVModle[5].options[key].readonly = item.午菲readonly
            TRIVModle[6].options[key].readonly = item.宵菲readonly
        })
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'WQ',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.WQ = data.payload
        //console.log(stateSelect.WQ);
        stateSelect.WQ.forEach((item, key) => {
            //console.log(item.午葷素value);
            WQVModle[0].options[key].value = item.午葷素value
            WQVModle[1].options[key].value = item.晚葷素value
            WQVModle[2].options[key].value = item.宵葷素value
            WQVModle[3].options[key].value = item.早葷素value
            WQVModle[4].options[key].value = item.午輕value
            WQVModle[5].options[key].value = item.午菲value
            WQVModle[6].options[key].value = item.宵菲value
            WQVModle[0].options[key].readonly = item.午葷素readonly
            WQVModle[1].options[key].readonly = item.晚葷素readonly
            WQVModle[2].options[key].readonly = item.宵葷素readonly
            WQVModle[3].options[key].readonly = item.早葷素readonly
            WQVModle[4].options[key].readonly = item.午輕readonly
            WQVModle[5].options[key].readonly = item.午菲readonly
            WQVModle[6].options[key].readonly = item.宵菲readonly
        })
    } catch (err) {
        console.log(err);
    }
}
async function changeSupplier(item) {
    // console.log(123);
    // console.log(item);
    // console.log(CYVModle[0].options[item].value);
    // console.log(event.target.value);
    const selectedMonth = event.target.options[event.target.selectedIndex].getAttribute('month');
    const selectedYear = event.target.options[event.target.selectedIndex].getAttribute('year');
    const selectedSite = event.target.options[event.target.selectedIndex].getAttribute('site_ID');
    const selectedType = event.target.options[event.target.selectedIndex].getAttribute('type');
    console.log(selectedMonth, selectedYear, selectedSite, selectedType);
    let editSupplier = await $editSupplier({
        site_ID: selectedSite,
        year: selectedYear,
        month: selectedMonth,
        [selectedType]: event.target.value
    })
    // console.log(editSupplier);
}
const handleChange = (item) => {
    console.log(item);
}
// const options = [
//     { text: '選項一', value: 'S001' },
//     { text: '選項二', value: 'S002' },
//     { text: '選項三', value: 'S003' },
// ];
const options = [
    { text: '2023', value: '2023' },
    { text: '2024', value: '2024' },
    { text: '2025', value: '2025' },
]
function handleChangeYear(event) {
    //console.log(event.target.value); // 打印出選擇的值
    selectedThisYear.value = event.target.value
    console.log(selectedThisYear.value);
    getInitSite()
}

const activeIndex = ref(0);
let selectRef = reactive({
    isCY: true,
    isJK8: false,
    isJKS: false,
    isLJ: false,
    isTC: false,
    isTRI: false,
    isWQ: false
})
const handleClick = (index) => {
    console.log(index);
    activeIndex.value = index;
    for (const key in selectRef) {
        selectRef[key] = false;
    }
    selectRef[Object.keys(selectRef)[index]] = true;
}
const items = [
    { label: 'CY' },
    { label: 'JK8' },
    { label: 'JKS' },
    { label: 'LJ' },
    { label: 'TC' },
    { label: 'TRI' },
    { label: 'WQ' },
];
onMounted(() => {
    state.CBD = document.querySelector('#btabs-animated-slideleft-CBD-tab');
    state.CY = document.querySelector('#btabs-animated-slideleft-CY-tab');
    state.JK8 = document.querySelector('#btabs-animated-slideleft-JK8-tab');
    state.JKS = document.querySelector('#btabs-animated-slideleft-JKS-tab');
    state.LJ = document.querySelector('#btabs-animated-slideleft-LJ-tab');
    state.TC = document.querySelector('#btabs-animated-slideleft-TC-tab');
    state.TRI = document.querySelector('#btabs-animated-slideleft-TRI-tab');
    state.WQ = document.querySelector('#btabs-animated-slideleft-WQ-tab');
    getInitSite()
})
</script>
<template>
    <BasePageHeading title="年度供應商維護" subtitle="整年度">
        <template #extra>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb breadcrumb-alt">
                    <li class="breadcrumb-item">
                        <a class="link-fx" href="javascript:void(0)">系統設定</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">年度供應商維護</li>
                </ol>
            </nav>
        </template>
    </BasePageHeading>
    <div class="d-flex justify-content-start">
        <div class="mt-4  ms-4">
            <select @change="handleChangeYear" v-bind:value="selectedThisYear" class="form-select" id="example-select"
                name="example-select">
                <option v-for="item in options" :value="item.value" :key="item">{{ item.text + '年' }}</option>
            </select>
        </div>
    </div>
    <div class="content">
        <div class="card text-center">
            <div class="card-header">
                <ul class="nav nav-pills">
                    <li class="nav-item" v-for="(item, index) in items" :key="index" @click="handleClick(index)">
                        <a class="nav-link" :class="{ 'active': activeIndex === index }" @click="activeIndex = index">{{
                            item.label }}</a>
                    </li>
                </ul>
            </div>
            <div class="card-body">
                <div class="table-responsive" v-if="selectRef.isCY">
                    <!-- <table class="table table-bordered table-striped table-vcenter"> -->
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">CY午(葷素)</th>
                                <th class="text-center" style="width: 5%">CY晚(葷素)</th>
                                <th class="text-center" style="width: 5%">CY宵(葷素)</th>
                                <th class="text-center" style="width: 5%">CY早(葷素)</th>
                                <th class="text-center" style="width: 5%">CY午(輕食)</th>
                                <th class="text-center" style="width: 5%">CY午(菲餐)</th>
                                <th class="text-center" style="width: 5%">CY宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.CY">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[0].options[item].value"
                                            :disabled="CYVModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.CY[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[1].options[item].value"
                                            :disabled="CYVModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.CY[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[2].options[item].value"
                                            :disabled="CYVModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.CY[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[3].options[item].value"
                                            :disabled="CYVModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.CY[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[4].options[item].value"
                                            :disabled="CYVModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.CY[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[5].options[item].value"
                                            :disabled="CYVModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午宵菲"
                                                v-for="(list, item) in stateSelect.CY[item].午宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="CYVModle[6].options[item].value"
                                            :disabled="CYVModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.CY[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" v-if="selectRef.isJK8">
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">JK8午(葷素)</th>
                                <th class="text-center" style="width: 5%">JK8晚(葷素)</th>
                                <th class="text-center" style="width: 5%">JK8宵(葷素)</th>
                                <th class="text-center" style="width: 5%">JK8早(葷素)</th>
                                <th class="text-center" style="width: 5%">JK8午(輕食)</th>
                                <th class="text-center" style="width: 5%">JK8午(菲餐)</th>
                                <th class="text-center" style="width: 5%">JK8宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.JK8">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[0].options[item].value"
                                            :disabled="JK8VModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.JK8[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[1].options[item].value"
                                            :disabled="JK8VModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.JK8[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[2].options[item].value"
                                            :disabled="JK8VModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.JK8[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[3].options[item].value"
                                            :disabled="JK8VModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.JK8[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[4].options[item].value"
                                            :disabled="JK8VModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.JK8[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[5].options[item].value"
                                            :disabled="JK8VModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午菲"
                                                v-for="(list, item) in stateSelect.JK8[item].午菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JK8VModle[6].options[item].value"
                                            :disabled="JK8VModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.JK8[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" v-if="selectRef.isJKS">
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">JKS午(葷素)</th>
                                <th class="text-center" style="width: 5%">JKS晚(葷素)</th>
                                <th class="text-center" style="width: 5%">JKS宵(葷素)</th>
                                <th class="text-center" style="width: 5%">JKS早(葷素)</th>
                                <th class="text-center" style="width: 5%">JKS午(輕食)</th>
                                <th class="text-center" style="width: 5%">JKS午(菲餐)</th>
                                <th class="text-center" style="width: 5%">JKS宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.JKS">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[0].options[item].value"
                                            :disabled="JKSVModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.JKS[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[1].options[item].value"
                                            :disabled="JKSVModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.JKS[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[2].options[item].value"
                                            :disabled="JKSVModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.JKS[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[3].options[item].value"
                                            :disabled="JKSVModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.JKS[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[4].options[item].value"
                                            :disabled="JKSVModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.JKS[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[5].options[item].value"
                                            :disabled="JKSVModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午菲"
                                                v-for="(list, item) in stateSelect.JKS[item].午菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="JKSVModle[6].options[item].value"
                                            :disabled="JKSVModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.JKS[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" v-if="selectRef.isLJ">
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">LJ午(葷素)</th>
                                <th class="text-center" style="width: 5%">LJ晚(葷素)</th>
                                <th class="text-center" style="width: 5%">LJ宵(葷素)</th>
                                <th class="text-center" style="width: 5%">LJ早(葷素)</th>
                                <th class="text-center" style="width: 5%">LJ午(輕食)</th>
                                <th class="text-center" style="width: 5%">LJ午(菲餐)</th>
                                <th class="text-center" style="width: 5%">LJ宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.LJ">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[0].options[item].value"
                                            :disabled="LJVModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.LJ[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[1].options[item].value"
                                            :disabled="LJVModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.LJ[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[2].options[item].value"
                                            :disabled="LJVModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.LJ[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[3].options[item].value"
                                            :disabled="LJVModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.LJ[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[4].options[item].value"
                                            :disabled="LJVModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.LJ[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[5].options[item].value"
                                            :disabled="LJVModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午菲"
                                                v-for="(list, item) in stateSelect.LJ[item].午菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="LJVModle[6].options[item].value"
                                            :disabled="LJVModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.LJ[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" v-if="selectRef.isTC">
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">TC午(葷素)</th>
                                <th class="text-center" style="width: 5%">TC晚(葷素)</th>
                                <th class="text-center" style="width: 5%">TC宵(葷素)</th>
                                <th class="text-center" style="width: 5%">TC早(葷素)</th>
                                <th class="text-center" style="width: 5%">TC午(輕食)</th>
                                <th class="text-center" style="width: 5%">TC午(菲餐)</th>
                                <th class="text-center" style="width: 5%">TC宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.TC">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[0].options[item].value"
                                            :disabled="TCVModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.TC[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[1].options[item].value"
                                            :disabled="TCVModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.TC[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[2].options[item].value"
                                            :disabled="TCVModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.TC[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[3].options[item].value"
                                            :disabled="TCVModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.TC[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[4].options[item].value"
                                            :disabled="TCVModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.TC[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[5].options[item].value"
                                            :disabled="TCVModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午菲"
                                                v-for="(list, item) in stateSelect.TC[item].午菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TCVModle[6].options[item].value"
                                            :disabled="TCVModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.TC[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" v-if="selectRef.isTRI">
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">TRI午(葷素)</th>
                                <th class="text-center" style="width: 5%">TRI晚(葷素)</th>
                                <th class="text-center" style="width: 5%">TRI宵(葷素)</th>
                                <th class="text-center" style="width: 5%">TRI早(葷素)</th>
                                <th class="text-center" style="width: 5%">TRI午(輕食)</th>
                                <th class="text-center" style="width: 5%">TRI午(菲餐)</th>
                                <th class="text-center" style="width: 5%">TRI宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.TRI">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[0].options[item].value"
                                            :disabled="TRIVModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.TRI[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[1].options[item].value"
                                            :disabled="TRIVModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.TRI[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[2].options[item].value"
                                            :disabled="TRIVModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.TRI[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[3].options[item].value"
                                            :disabled="TRIVModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.TRI[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[4].options[item].value"
                                            :disabled="TRIVModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.TRI[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[5].options[item].value"
                                            :disabled="TRIVModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午菲"
                                                v-for="(list, item) in stateSelect.TRI[item].午菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="TRIVModle[6].options[item].value"
                                            :disabled="TRIVModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.TRI[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="table-responsive" v-if="selectRef.isWQ">
                    <table class="table table-bordered table-striped table-vcenter">
                        <thead>
                            <tr>
                                <th class="text-center" style="width: 5%">月份</th>
                                <th class="text-center" style="width: 5%">WQ午(葷素)</th>
                                <th class="text-center" style="width: 5%">WQ晚(葷素)</th>
                                <th class="text-center" style="width: 5%">WQ宵(葷素)</th>
                                <th class="text-center" style="width: 5%">WQ早(葷素)</th>
                                <th class="text-center" style="width: 5%">WQ午(輕食)</th>
                                <th class="text-center" style="width: 5%">WQ午(菲餐)</th>
                                <th class="text-center" style="width: 5%">WQ宵(菲餐)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(list, item) in stateSelect.WQ">
                                <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[0].options[item].value"
                                            :disabled="WQVModle[0].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午葷素"
                                                v-for="(list, item) in stateSelect.WQ[item].午葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[1].options[item].value"
                                            :disabled="WQVModle[1].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="晚葷素"
                                                v-for="(list, item) in stateSelect.WQ[item].晚葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[2].options[item].value"
                                            :disabled="WQVModle[2].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵葷素"
                                                v-for="(list, item) in stateSelect.WQ[item].宵葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[3].options[item].value"
                                            :disabled="WQVModle[3].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="早葷素"
                                                v-for="(list, item) in stateSelect.WQ[item].早葷素" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[4].options[item].value"
                                            :disabled="WQVModle[4].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午輕"
                                                v-for="(list, item) in stateSelect.WQ[item].午輕" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[5].options[item].value"
                                            :disabled="WQVModle[5].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="午菲"
                                                v-for="(list, item) in stateSelect.WQ[item].午菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                                <td class="d-sm-table-cell fw-semibold">
                                    <div id="app">
                                        <select class="form-select" id="example-select" name="example-select"
                                            @change="changeSupplier" :value="WQVModle[6].options[item].value"
                                            :disabled="WQVModle[6].options[item].readonly">
                                            <option :value="list.value" :supplier="list.text" :month="list.month"
                                                :year="list.year" :site_ID="list.site_ID" :order="list.index" type="宵菲"
                                                v-for="(list, item) in stateSelect.WQ[item].宵菲" :key="item">
                                                {{ list.text }}
                                            </option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
a {
    cursor: pointer;
}
</style>
<style lang="scss" scoped>
@import "vue-select/src/scss/vue-select";
@import "../../../assets/scss/vendor/vue-select";

@media screen and (max-width:768px) {
    .table {
        width: 1000px;
    }
}
</style>