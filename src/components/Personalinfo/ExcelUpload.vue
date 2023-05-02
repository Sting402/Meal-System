<script setup>
import { ref, onMounted, watchEffect } from 'vue'//員工資料維護
import * as xlsx from "xlsx";
import { Delete, Edit, Download, Files, Upload } from '@element-plus/icons-vue'
import { saveAs } from 'file-saver';//匯出excel用
import { ElLoading } from 'element-plus'//Loading加載
import Swal from "sweetalert2";
import { $upLoadInfo } from '../../api/personalinfo/upload'
import { readFile, character, delay } from '../../utils/utils'
import { usePersonalinfoStore } from "../../stores/personalinfo/personalinfo";
const store = usePersonalinfoStore();
// Set default properties
let toast = Swal.mixin({
    buttonsStyling: false,
    target: "#page-container",
    customClass: {
        confirmButton: "btn btn-success m-1",
        cancelButton: "btn btn-danger m-1",
        input: "form-control",
    },
});
let arr = []
const handle = async (ev) => {
    arr = []
    console.log(ev);
    let file = ev.raw
    if (!file) return
    let loadingInstance = ElLoading.service({
        text: "稍待片刻",
        background: "rgba(0,0,0,.5)"
    })
    await delay(500)//等待讓畫面出面
    let data = await readFile(file)
    let workbook = xlsx.read(data, { type: 'binary' })
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]
    console.log(worksheet);
    data = xlsx.utils.sheet_to_json(worksheet)
    data.forEach(item => {
        if (item.Modify_Date) {
            let dateValue = new Date((item.Modify_Date - (25567 + 2)) * 86400 * 1000)
            item.Modify_Date = formatDate(dateValue, 'yyyy-MM-dd')
        }
        //console.log(item);
        // item = JSON.stringify(item);
        item = Object.fromEntries(
            Object.entries(item).map(([key, value]) => [key, value.toString()])
        );
        // console.log(item)
        arr.push(item)
        console.log(arr);
    })
    // let arrStr = JSON.stringify(arr);
    // console.log(arrStr);
    loadingInstance.close()
    if (arr.length > 0) {
        toast.fire("提交成功", "接著點選匯入Excel匯入!", "info");
    } else {
        toast.fire("warning", "匯入資料失敗，請重新提交!", "warning")
    }

}

function formatDate(date, fmt) {
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        }
    }
    return fmt
}
const submit = async () => {
    //這是異步
    // let loadingInstance = ElLoading.service({
    //     text: "稍待片刻",
    //     background: "rgba(0,0,0,.5)"
    // })
    //await delay(3000)//等待讓畫面出面
    //數據一條一條上傳
    let n = 0
    let send = async () => {
        if (n > arr.length - 1) {
            console.log("傳遞完畢");
            //完成的function
            toast.fire("匯入成功", "成功更新員工資料!", "success");
            store.isChange.click()
            return
        }
        console.log(arr);
        console.log(arr[n]);
        let body = []
        body.push(arr[n])
        console.log(body);
        let isupLoad = await $upLoadInfo(body)
        if (isupLoad) {
            n++
            console.log(n);
            //console.log("回調開始");
            send()
        } else {
            console.log(n + 2);//Excel表格的問題
            console.log("提交失败");
            toast.fire("匯入失敗", `Excel第${n + 2}格格式錯誤!`, "error");
            return
            //loadingInstance.close()//
        }

    }
    send()
    //let isupLoad = await $upLoadInfo(arr)
    // if (isupLoad.success) {
    //     console.log("提交成功");
    //     toast.fire("匯入成功", "成功更新員工資料!", "success");
    //     store.isChange.click()

    // } else {
    //     console.log("提交失败");
    //     toast.fire("匯入失敗", "請重新匯入!", "error");
    //     loadingInstance.close()//
    // }
}

// const openExcelFile = () => {
//     console.log(store.data[0]);
//     //生成 Excel 文件
//     const worksheet = xlsx.utils.json_to_sheet(store.data[0]);
//     const workbook = xlsx.utils.book_new();
//     xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     // 生成 Excel 文件并保存到本地
//     const excelBuffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
//     saveAs(blob, '員工資料表.xlsx'); // 保存文件到本地
//     // fetch('/public/employees.json')
//     //     .then(response => response.json())
//     //     .then(data => {
//     //     })
//     //     .catch(error => {
//     //         console.error('读取JSON文件时出错：', error);
//     //     });
// }
const getEmployeesInfo = () => {
    var a = document.createElement("a");
    a.href = "/static/員工維護資料匯入.xlsx";
    a.download = "員工維護資料匯入.xlsx";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    a.remove();
}
onMounted(async () => {

})
</script>

<template>
    <div class="content">
        <div class="row">
            <div class="d-flex justify-content-end">
                <el-button type="primary" class="me-2" data-bs-toggle="tooltip" data-bs-placement="right" color="#626aef"
                    title="right Tooltip" @click="getEmployeesInfo">匯出Excel範例
                    <el-icon class="el-icon--right">
                        <Download />
                    </el-icon>
                </el-button>
                <el-upload class="me-2" action accept=".xlsx,.xls" :auto-upload="false" :show-file-list="false"
                    :on-change="handle">
                    <el-button type="primary" slot="trigger" color="#626aef">選取Excel文件
                        <el-icon class="el-icon--right">
                            <Files />
                        </el-icon>
                    </el-button>
                </el-upload>
                <el-button type="success" @click="submit">匯入Excel文件
                    <el-icon class="el-icon--right">
                        <Upload />
                    </el-icon>
                </el-button>
            </div>
        </div>
    </div>
    <button type="button" class="btn btn-alt-secondary push" @click="swalInfo" v-show="false"></button>
</template>

<style lang="scss">
// SweetAlert2
@import "sweetalert2/dist/sweetalert2.min.css";

.upLoad-select {
    margin-right: 10px !important;
}
</style>