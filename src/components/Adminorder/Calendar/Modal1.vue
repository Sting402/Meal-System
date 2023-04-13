<script setup>
import FlatPickr from './FlatPickr.vue';
</script>
<template>
    <div class="row justify-content-center py-sm-3 py-md-1">
        <div class="col-sm-10 col-md-8">
            <div class="mb-4">
                <FlatPickr></FlatPickr>
            </div>
            <div class="mb-4">
                <label class="form-label">選擇地點</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別..">
                    <!-- <option selected>公司別(請款)..</option> -->
                    <option value="CBD">CBD</option>
                    <option value="CY">CY</option>
                    <option value="JK8">JK8</option>
                    <option value="JKS-2F">JKS-2F</option>
                    <option value="JKS-3F">JKS-3F</option>
                    <option value="LJ">LJ</option>
                    <option value="TC-2F">TC-2F</option>
                    <option value="TC-3F">TC-3F</option>
                    <option value="TRI">TRI</option>
                    <option value="WQ">WQ</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇餐別</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇餐別..">
                    <!-- <option selected>公司別(請款)..</option> -->
                    <option value="1">午餐</option>
                    <option value="2">晚餐</option>
                    <option value="3">宵夜</option>
                    <option value="4">早餐</option>
                </select>
            </div>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">選擇類型</label>
                <select class="form-select" id="example-select" name="example-select" placeholder="選擇類型..">
                    <option value="1">葷食</option>
                    <option value="2">素食</option>
                    <option value="3">輕食</option>
                    <option value="4">菲餐</option>
                </select>
            </div>
            <div>
                <label class="form-label" for="block-form1-password">內容</label>
                <div>
                    <textarea class="form-control" id="example-textarea-input" name="example-textarea-input" rows="2"
                        placeholder="輸入事由..." style="resize:none;"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>