<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, computed, watchEffect } from "vue";
import { usePopinStore } from "../../stores/newsinfo/popin";
// import { useDashboardPopinStore } from '../../stores/dashboard/popin';
// const storeDashboard = useDashboardPopinStore()
const store = usePopinStore();
const data = reactive([{
    id: store.data.length,
    title: '',
    start: '',
    end: '',
    staff: '',
    content: '',
    videoUrl: ''
}])
//將新增的段落寫入data
const index = ref(1)
const handleAdd = () => {
    console.log(data[0].id);
    data.push({
        // [`content${data.length}`]: ''
        content: '',
        videoUrl: '',
        
    })
}
//預覽上傳圖片
const fileInput = ref(null)
const previewSrc = ref(null)
const previewImage = () => {
    const file = fileInput.value.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
        previewSrc.value = reader.result
    })
    reader.readAsDataURL(file)
    // console.log(file);
    store.file = file
    console.log(store.file);
}
//youtube 影片編譯
const videoUrlInput = ref('')
function convertYoutubeUrl(url) {
    const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? `https://www.youtube.com/embed/${match[2]}` : url;
}
// const youtubeUrl = 'https://www.youtube.com/watch?v=2SXOGshQKdQ';
// const embedUrl = convertYoutubeUrl(videoUrlInput.value);
const embedUrl = ref([])
watchEffect(() => {
    embedUrl.value = data.map((item, index) => {
        if (item.videoUrl.length > 10) {
            return convertYoutubeUrl(item.videoUrl)
        }
    })
})
const hanldeConfirm = () => {
    //重組
    const newData = data.map(({ content, videoUrl, ...rest }) => rest)
    newData[0].content = []
    newData[0].videoUrl = []
    //console.log(newData)
    data.forEach((item, index) => {
        newData[0].content.push({ content: item.content })
    })
    embedUrl.value.forEach((item, index) => {
        newData[0].videoUrl.push({ item })
    });
    console.log(newData[0])
    store.data.push(newData[0])
    console.log(store.data);
}
</script>
<template>
    <div class="row push">
        <div>
            <ul>
                <li class="mb-2">標題</li>
                <li class="mb-2"><input type="text" class="form-control" placeholder="" v-model="data[0].title" />
                </li>
                <li class="mb-2">開始日期</li>
                <li class="mb-2"><input type="text" class="form-control" placeholder="" v-model="data[0].start" />
                </li>
                <li class="mb-2">結束日期</li>
                <li class="mb-2"><input type="text" class="form-control" placeholder="" v-model="data[0].end" />
                </li>
                <li class="mb-2">編輯人員</li>
                <li class="mb-2"><input type="text" class="form-control" placeholder="" v-model="data[0].staff" />
                </li>
            </ul>

        </div>
        <div class="col-lg-12">
            <h3>封面圖片上傳</h3>
        </div>
        <div class="col-lg-6">
            <span class="text-danger">*</span><label class="form-label" for="val-password">主題</label>
        </div>
        <div class="mb-4">
            <input class="form-control" type="file" id="formFile" ref="fileInput" @change="previewImage" />
            <img v-if="previewSrc" class="img-fluid" :src="previewSrc" alt="" />
        </div>
        <div class="mb-4">
            <button type="button" class="btn btn-secondary">上傳檔案</button>
        </div>
        <div class="mb-4">
            <span class="text-danger">*建議圖片上傳尺寸600x600</span>
        </div>
    </div>
    <div class="row push">
        <h3>文章內容編輯</h3>
        <div class="mb-4">
            <h5>段落一編輯</h5>
            <!-- <div class="border-bottom"></div> -->
            <div class="border-0 border-bottom"></div>
        </div>
        <div v-for="(list, item) in data" :key=item>
            <div class="mb-4">
                <label class="form-label" for="block-form1-password">段落{{ item+ 1}}影片或圖片</label>
            </div>
            <div class="mb-4">
                <div class="mb-4">
                    <input type="text" class="form-control" placeholder="請輸入圖片網址...可不填" v-model="data[item].videoUrl" />
                    <div>
                        <iframe :src="embedUrl[item]" frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen v-if="embedUrl[item]"></iframe>
                    </div>
                </div>
            </div>
            <div class="mb-4">
                (圖片則使用下面檔案上傳)
            </div>
            <div class="mb-4">
                <input class="form-control" type="file" id="example-file-input" />
            </div>
            <div class="mb-2">
                <label class="form-label" for="block-form1-password">段落文章</label>
                <textarea class="form-control" id="example-textarea-input" name="example-textarea-input" rows="2"
                    placeholder="可不填" style="resize:none;" v-model="data[item].content"></textarea>
            </div>
        </div>
        <div class="mb-4">
            <button type="button" class="btn btn-primary" @click="handleAdd()">新增</button>
        </div>
        <div class="mb-4">
            <button type="button" class="btn btn-primary" @click="hanldeConfirm">上傳</button><br>
        </div>
    </div>

</template>
<style lang="scss" scoped>
li {
    list-style: none;
}
</style>