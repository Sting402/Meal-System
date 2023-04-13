<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { $annualSupplier } from '../../../api/annualsupplierinfo/getAnnualSupplier'
import { $editSupplier } from '../../../api/annualsupplierinfo/editAnnualSupplier'

//CBD
const CBDVModle = reactive([
    {
        options: [
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
            { value: null, readonly: null },
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
//CY
const CYVModle = reactive([
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
// Get current year, month and day
let date = new Date();

let y = date.getFullYear();
let m = date.getMonth();
let d = date.getDate();
const selectedThisYear = ref(`${y}`);
let hightSelect = reactive({
    isCBD: true,
    isCY: false,
    isJK8: false,
    isJKS: false,
    isLJ: false,
    isTC: false,
    isTRI: false,
    isWQ: false
})
const getSite = async (ref) => {
    // console.log(y);
    console.log(ref.innerText);
    // for (const key in hightSelect) {
    //     if (hightSelect.hasOwnProperty(key)) {
    //         hightSelect[key] = false;
    //     }
    // }
    // hightSelect[`is${ref.innerText}`] = true;

    try {
        let res = await $annualSupplier({
            site_ID: `${ref.innerText}`,
            year: `${selectedThisYear.value}`
        })
        let data = res
        console.log(data.payload);
    } catch (err) {
        console.log(err);
    }
}
const getInitSite = async () => {
    //console.log(y);
    try {
        let res = await $annualSupplier({
            site_ID: 'CBD',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.CBD = data.payload
        console.log(stateSelect.CBD);
        //console.log(stateSelect.CBD[1].午晚葷);
        stateSelect.CBD.forEach((item, key) => {
            console.log(item.午輕value);
            CBDVModle[0].options[key].value = item.午晚葷value
            CBDVModle[1].options[key].value = item.宵早葷value
            CBDVModle[2].options[key].value = item.午晚素value
            CBDVModle[3].options[key].value = item.宵早素value
            CBDVModle[4].options[key].value = item.午輕value
            CBDVModle[5].options[key].value = item.午宵菲value
            CBDVModle[0].options[key].readonly = item.午晚葷readonly
            CBDVModle[1].options[key].readonly = item.宵早葷readonly
            CBDVModle[2].options[key].readonly = item.午晚素readonly
            CBDVModle[3].options[key].readonly = item.宵早素readonly
            CBDVModle[4].options[key].readonly = item.午輕readonly
            CBDVModle[5].options[key].readonly = item.午宵菲readonly
            //console.log(CBDVModle[0].options[key]);
        })
        console.log(CBDVModle);
        //console.log(CBDVModle[0].options[2].value);
        //let newArr = stateSelect.CBD.filter(item => item['午晚葷value'] === '').map(item => item['午晚葷value']);
    } catch (err) {
        console.log(err);
    }
    try {
        let res = await $annualSupplier({
            site_ID: 'CY',
            year: `${selectedThisYear.value}`
        })
        let data = res
        // console.log(data.payload);
        stateSelect.CY = data.payload
        stateSelect.CY.forEach((item, key) => {
            console.log(item.午晚葷value);
            CYVModle[0].options[key].value = item.午晚葷value
            CYVModle[1].options[key].value = item.宵早葷value
            CYVModle[2].options[key].value = item.午晚素value
            CYVModle[3].options[key].value = item.宵早素value
            CYVModle[4].options[key].value = item.午輕value
            CYVModle[5].options[key].value = item.午宵菲value
            CYVModle[0].options[key].readonly = item.午晚葷readonly
            CYVModle[1].options[key].readonly = item.宵早葷readonly
            CYVModle[2].options[key].readonly = item.午晚素readonly
            CYVModle[3].options[key].readonly = item.宵早素readonly
            CYVModle[4].options[key].readonly = item.午輕readonly
            CYVModle[5].options[key].readonly = item.午宵菲readonly
            //console.log(CBDVModle[0].options[key]);
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
            //console.log(item.午晚葷value);
            JK8VModle[0].options[key].value = item.午晚葷value
            JK8VModle[1].options[key].value = item.宵早葷value
            JK8VModle[2].options[key].value = item.午晚素value
            JK8VModle[3].options[key].value = item.宵早素value
            JK8VModle[4].options[key].value = item.午輕value
            JK8VModle[5].options[key].value = item.午宵菲value
            JK8VModle[0].options[key].readonly = item.午晚葷readonly
            JK8VModle[1].options[key].readonly = item.宵早葷readonly
            JK8VModle[2].options[key].readonly = item.午晚素readonly
            JK8VModle[3].options[key].readonly = item.宵早素readonly
            JK8VModle[4].options[key].readonly = item.午輕readonly
            JK8VModle[5].options[key].readonly = item.午宵菲readonly
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
            //console.log(item.午晚葷value);
            JKSVModle[0].options[key].value = item.午晚葷value
            JKSVModle[1].options[key].value = item.宵早葷value
            JKSVModle[2].options[key].value = item.午晚素value
            JKSVModle[3].options[key].value = item.宵早素value
            JKSVModle[4].options[key].value = item.午輕value
            JKSVModle[5].options[key].value = item.午宵菲value
            JKSVModle[0].options[key].readonly = item.午晚葷readonly
            JKSVModle[1].options[key].readonly = item.宵早葷readonly
            JKSVModle[2].options[key].readonly = item.午晚素readonly
            JKSVModle[3].options[key].readonly = item.宵早素readonly
            JKSVModle[4].options[key].readonly = item.午輕readonly
            JKSVModle[5].options[key].readonly = item.午宵菲readonly
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
            //console.log(item.午晚葷value);
            LJVModle[0].options[key].value = item.午晚葷value
            LJVModle[1].options[key].value = item.宵早葷value
            LJVModle[2].options[key].value = item.午晚素value
            LJVModle[3].options[key].value = item.宵早素value
            LJVModle[4].options[key].value = item.午輕value
            LJVModle[5].options[key].value = item.午宵菲value
            LJVModle[0].options[key].readonly = item.午晚葷readonly
            LJVModle[1].options[key].readonly = item.宵早葷readonly
            LJVModle[2].options[key].readonly = item.午晚素readonly
            LJVModle[3].options[key].readonly = item.宵早素readonly
            LJVModle[4].options[key].readonly = item.午輕readonly
            LJVModle[5].options[key].readonly = item.午宵菲readonly
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
            //console.log(item.午晚葷value);
            TCVModle[0].options[key].value = item.午晚葷value
            TCVModle[1].options[key].value = item.宵早葷value
            TCVModle[2].options[key].value = item.午晚素value
            TCVModle[3].options[key].value = item.宵早素value
            TCVModle[4].options[key].value = item.午輕value
            TCVModle[5].options[key].value = item.午宵菲value
            TCVModle[0].options[key].readonly = item.午晚葷readonly
            TCVModle[1].options[key].readonly = item.宵早葷readonly
            TCVModle[2].options[key].readonly = item.午晚素readonly
            TCVModle[3].options[key].readonly = item.宵早素readonly
            TCVModle[4].options[key].readonly = item.午輕readonly
            TCVModle[5].options[key].readonly = item.午宵菲readonly
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
            TRIVModle[0].options[key].value = item.午晚葷value
            TRIVModle[1].options[key].value = item.宵早葷value
            TRIVModle[2].options[key].value = item.午晚素value
            TRIVModle[3].options[key].value = item.宵早素value
            TRIVModle[4].options[key].value = item.午輕value
            TRIVModle[5].options[key].value = item.午宵菲value
            TRIVModle[0].options[key].readonly = item.午晚葷readonly
            TRIVModle[1].options[key].readonly = item.宵早葷readonly
            TRIVModle[2].options[key].readonly = item.午晚素readonly
            TRIVModle[3].options[key].readonly = item.宵早素readonly
            TRIVModle[4].options[key].readonly = item.午輕readonly
            TRIVModle[5].options[key].readonly = item.午宵菲readonly
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
            //console.log(item.午晚葷value);
            WQVModle[0].options[key].value = item.午晚葷value
            WQVModle[1].options[key].value = item.宵早葷value
            WQVModle[2].options[key].value = item.午晚素value
            WQVModle[3].options[key].value = item.宵早素value
            WQVModle[4].options[key].value = item.午輕value
            WQVModle[5].options[key].value = item.午宵菲value
            WQVModle[0].options[key].readonly = item.午晚葷readonly
            WQVModle[1].options[key].readonly = item.宵早葷readonly
            WQVModle[2].options[key].readonly = item.午晚素readonly
            WQVModle[3].options[key].readonly = item.宵早素readonly
            WQVModle[4].options[key].readonly = item.午輕readonly
            WQVModle[5].options[key].readonly = item.午宵菲readonly
        })
    } catch (err) {
        console.log(err);
    }
}
async function changeSupplier(event) {
    console.log(event.target.value);
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
    console.log(editSupplier);
}

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
        <BaseBlock>
            <template #content>
                <ul class="nav nav-tabs nav-tabs-block" role="tablist">
                    <li class="nav-item">
                        <button type="button" class="nav-link active" id="btabs-animated-slideleft-CBD-tab"
                            data-bs-toggle="tab" data-bs-target="#btabs-animated-slideleft-CBD" role="tab"
                            aria-controls="btabs-animated-slideleft-CBD" aria-selected="true" ref="state.CBD"
                            @click="getSite(state.CBD)">
                            CBD
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-CY-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-CY" role="tab"
                            aria-controls="btabs-animated-slideleft-CY" aria-selected="false" ref="state.CY"
                            @click="getSite(state.CY)">
                            CY
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-JK8-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-JK8" role="tab"
                            aria-controls="btabs-animated-slideleft-JK8" aria-selected="false" ref="state.JK8"
                            @click="getSite(state.JK8)">
                            JK8
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-JKS-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-JKS" role="tab"
                            aria-controls="btabs-animated-slideleft-JKS" aria-selected="false" ref="state.JKS"
                            @click="getSite(state.JKS)">
                            JKS
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-LJ-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-LJ" role="tab"
                            aria-controls="btabs-animated-slideleft-LJ" aria-selected="false" ref="state.LJ"
                            @click="getSite(state.LJ)">
                            LJ
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-TC-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-TC" role="tab"
                            aria-controls="btabs-animated-slideleft-TC" aria-selected="false" ref="state.TC"
                            @click="getSite(state.TC)">
                            TC
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-TRI-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-TRI" role="tab"
                            aria-controls="btabs-animated-slideleft-TRI" aria-selected="false" @click="getSite(state.TRI)"
                            ref="state.TRI">
                            TRI
                        </button>
                    </li>
                    <li class="nav-item">
                        <button type="button" class="nav-link" id="btabs-animated-slideleft-WQ-tab" data-bs-toggle="tab"
                            data-bs-target="#btabs-animated-slideleft-WQ" role="tab"
                            aria-controls="btabs-animated-slideleft-WQ" aria-selected="false" @click="getSite(state.WQ)"
                            ref="state.WQ">
                            WQ
                        </button>
                    </li>
                </ul>
                <div class="block-content tab-content overflow-hidden">
                    <div class="tab-pane fade fade-left show active" id="btabs-animated-slideleft-CBD" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-CBD-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(list, item) in stateSelect.CBD">
                                        <td>{{ `${selectedThisYear}年` + list.month + '月' }}</td>
                                        <td class="d-sm-table-cell fw-semibold">
                                            <div id="app">
                                                <select class="form-select" id="example-select" name="example-select"
                                                    @change="changeSupplier" :value="CBDVModle[0].options[item].value"
                                                    :disabled="CBDVModle[0].options[item].readonly">
                                                    <option :value="list.value" :supplier="list.text" :month="list.month"
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.CBD[item].午晚葷"
                                                        :key="item">
                                                        {{ list.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="d-sm-table-cell fw-semibold">
                                            <div id="app">
                                                <select class="form-select" id="example-select" name="example-select"
                                                    @change="changeSupplier" :value="CBDVModle[1].options[item].value"
                                                    :disabled="CBDVModle[1].options[item].readonly">
                                                    <option :value="list.value" :supplier="list.text" :month="list.month"
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.CBD[item].宵早葷"
                                                        :key="item">
                                                        {{ list.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="d-sm-table-cell fw-semibold">
                                            <div id="app">
                                                <select class="form-select" id="example-select" name="example-select"
                                                    @change="changeSupplier" :value="CBDVModle[2].options[item].value"
                                                    :disabled="CBDVModle[2].options[item].readonly">
                                                    <option :value="list.value" :supplier="list.text" :month="list.month"
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.CBD[item].午晚素"
                                                        :key="item">
                                                        {{ list.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="d-sm-table-cell fw-semibold">
                                            <div id="app">
                                                <select class="form-select" id="example-select" name="example-select"
                                                    @change="changeSupplier" :value="CBDVModle[3].options[item].value"
                                                    :disabled="CBDVModle[3].options[item].readonly">
                                                    <option :value="list.value" :supplier="list.text" :month="list.month"
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.CBD[item].宵早素"
                                                        :key="item">
                                                        {{ list.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="d-sm-table-cell fw-semibold">
                                            <div id="app">
                                                <select class="form-select" id="example-select" name="example-select"
                                                    @change="changeSupplier" :value="CBDVModle[4].options[item].value"
                                                    :disabled="CBDVModle[4].options[item].readonly">
                                                    <option :value="list.value" :supplier="list.text" :month="list.month"
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.CBD[item].午輕"
                                                        :key="item">
                                                        {{ list.text }}
                                                    </option>
                                                </select>
                                            </div>
                                        </td>
                                        <td class="d-sm-table-cell fw-semibold">
                                            <div id="app">
                                                <select class="form-select" id="example-select" name="example-select"
                                                    @change="changeSupplier" :value="CBDVModle[5].options[item].value"
                                                    :disabled="CBDVModle[5].options[item].readonly">
                                                    <option :value="list.value" :supplier="list.text" :month="list.month"
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.CBD[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-CY" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-CY-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.CY[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.CY[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.CY[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.CY[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.CY[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.CY[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-JK8" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-JK8-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.JK8[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.JK8[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.JK8[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.JK8[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.JK8[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.JK8[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-JKS" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-JKS-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.JKS[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.JKS[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.JKS[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.JKS[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.JKS[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.JKS[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-LJ" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-LJ-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.LJ[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.LJ[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.LJ[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.LJ[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.LJ[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.LJ[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-TC" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-TC-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.TC[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.TC[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.TC[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.TC[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.TC[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.TC[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-TRI" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-TRI-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.TRI[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.TRI[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.TRI[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.TRI[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.TRI[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.TRI[item].午宵菲"
                                                        :key="item">
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
                    <div class="tab-pane fade fade-left" id="btabs-animated-slideleft-WQ" role="tabpanel"
                        aria-labelledby="btabs-animated-slideleft-WQ-tab" tabindex="0">
                        <div class="table-responsive">
                            <table class="table table-bordered table-striped table-vcenter">
                                <thead>
                                    <tr>
                                        <th style="width: 5%">月份</th>
                                        <th style="width: 5%">午晚(葷食)</th>
                                        <th style="width: 5%">宵早(葷食)</th>
                                        <th style="width: 5%">午晚(素食)</th>
                                        <th style="width: 5%">宵早(素食)</th>
                                        <th style="width: 5%">午(輕食)</th>
                                        <th style="width: 5%">午宵(菲餐)</th>
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚葷" v-for="(list, item) in stateSelect.WQ[item].午晚葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早葷" v-for="(list, item) in stateSelect.WQ[item].宵早葷"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午晚素" v-for="(list, item) in stateSelect.WQ[item].午晚素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="宵早素" v-for="(list, item) in stateSelect.WQ[item].宵早素"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午輕" v-for="(list, item) in stateSelect.WQ[item].午輕"
                                                        :key="item">
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
                                                        :year="list.year" :site_ID="list.site_ID" :order="list.index"
                                                        type="午宵菲" v-for="(list, item) in stateSelect.WQ[item].午宵菲"
                                                        :key="item">
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
            </template>
        </BaseBlock>
    </div>
</template>

<style lang="scss">
// Flatpickr + Custom overrides
@import "flatpickr/dist/flatpickr.css";
@import "@/assets/scss/vendor/flatpickr";

// Vue Color Custom overrides
@import "@/assets/scss/vendor/vue-color";

// Vue Select + Custom overrides
@import "vue-select/src/scss/vue-select";
@import "@/assets/scss/vendor/vue-select";

// Vue Form Slider + Custom overrides
@import "@vueform/slider/themes/default.css";
@import "@/assets/scss/vendor/vueform-slider";

// Dropzone + Custom overrides
@import "dropzone/dist/dropzone.css";
@import "@/assets/scss/vendor/dropzone";

.col-first {
    width: 150px !important;
}

.col-second {
    width: 50px !important;
}

// #nav-itemCBD:hover {
//     background-color: blue !important;
//     /* 變更背景顏色為黃色 */
//     text-decoration: underline !important;
//     color: black;
//     /* 變更文字顏色為黑色 */
//     cursor: pointer;
// }

// .nav-item:hover {
//     background-color: rgb(195, 209, 238) !important;
// }
</style>