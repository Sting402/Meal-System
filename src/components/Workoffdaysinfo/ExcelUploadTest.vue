<script setup>
import { ref } from 'vue'
import * as xlsx from "xlsx";
import { readFile, character, delay } from '../../utils/utils'
//日期格式不對的方式 直接轉換
const handle = async (ev) => {
    let file = ev.raw
    if (!file) return

    //讀取FILE中的數據
    let data = await readFile(file)//解析2進制檔案
    //console.log(data);
    let workbook = xlsx.read(data, { type: "binary" })
    //console.log(workbook);
    //console.log(workbook.SheetNames);
    let worksheet = workbook.Sheets[workbook.SheetNames[0]]
    data = xlsx.utils.sheet_to_json(worksheet)//利用插件轉成json檔案
    console.log(data);
    let arr = []
    data.forEach(item => {
        let date = new Date((item.放假未供餐日期資料輸入格式 - (25567 + 2)) * 86400 * 1000);
        let list = date.toISOString().substr(0, 10)
        console.log(list);
        arr.push(list)
    });
    console.log(arr);

}
const submit = () => {

}
const openExcelFile = () => {
    var a = document.createElement("a"); //创建一个<a></a>标签
    a.href = "/static/2023 行事曆.xlsx"; // 给a标签的href属性值加上地址，注意，这里是绝对路径，不用加 点.
    a.download = "下載成功.xlsx"; //设置下载文件文件名，这里加上.xlsx指定文件类型，pdf文件就指定.fpd即可
    a.style.display = "none"; // 障眼法藏起来a标签
    document.body.appendChild(a); // 将a标签追加到文档对象中
    a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
    a.remove(); // 一次性的，用完就删除a标签
}
</script>

<template>
    <div class="uploadBox">
        <div class="buttonBox">
            <el-upload action accept=".xlsx,.xls" :auto-upload="false" :show-file-list="false" :on-change="handle">
                <el-button type="primary" slot="trigger">選取 Excel 文件</el-button>
            </el-upload>
            <el-button type="success" @click="submit">收集數據上傳</el-button>
            <el-button type="danger" class="btn1
                    " data-bs-toggle="tooltip" data-bs-placement="right" title="right Tooltip" @click="openExcelFile">
                匯出EXCEL
            </el-button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.homeBox {
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 9999;
    font-size: 40px;
}

.btn1 {
    border-radius: 5px;
    // background-color: #f70a0a64;
    border: 1px solid #5c5b5931;
    margin-left: -2px;
    // margin-top: 15px;
    width: 150px;
    height: 32px;
    position: relative;

}

.buttonBox {
    padding: 15px;
    display: flex;
    width: 35%;
    justify-content: flex-start;

    & .el-button {
        margin-right: 20px !important;
    }
}

.tableBox {
    padding: 0 15px;

    h3 {
        font-size: 18px;
        color: #f56c6c;
        padding-bottom: 15px;
    }
}
</style>