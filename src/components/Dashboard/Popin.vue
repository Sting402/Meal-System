<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import { usePopinStore } from "../../stores/newsinfo/popin";
import { useDashboardPopinStore } from '../../stores/dashboard/popin';
const store = useDashboardPopinStore()
const storeNewsinfo = usePopinStore();
const $popin = ref(null)
const previewSrc = ref(null)
store.$popin = $popin
const newData = ref([]);
watchEffect(() => {
    console.log(store.index);
    newData.value = storeNewsinfo.data[store.index].content.map((item, index) => ({ content: item, videoUrl: storeNewsinfo.data[store.index].videoUrl[index] }));
    console.log(newData.value);
});
</script>
<template>
    <!-- <BaseBlock title="Size: Large" class="h-100 mb-0">
                                                                                                                                                                                                            <p class="fs-sm text-muted">
                                                                                                                                                                                                                If you need more space you can use the large size variation
                                                                                                                                                                                                            </p>
                                                                                                                                                                                                        </BaseBlock> -->
    <button type="button" class="btn btn-alt-primary push" data-bs-toggle="modal" data-bs-target="#modal-block-large"
        ref="$popin" v-show="false">
        隱藏按鈕彈窗
    </button>
    <div class="modal" id="modal-block-large" tabindex="-1" role="dialog" aria-labelledby="modal-block-large"
        aria-hidden="true">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <BaseBlock title="消息列表" transparent class="mb-0">
                    <template #options>
                        <button type="button" class="btn-block-option" data-bs-dismiss="modal" aria-label="Close">
                            <i class="fa fa-fw fa-times"></i>
                        </button>
                    </template>
                    <template #content>
                        <div class="block-content fs-md">
                            <img class="w-100 " src="/assets/media/photos/photo2.jpg" alt="" style="object-fit: cover;;" />
                            <div class="block-content">
                                <h4 class="mb-1">{{ storeNewsinfo.data[store.index].title }}</h4>
                                <p class="fs-sm fw-medium mb-2">
                                    <span class="text-primary">{{ storeNewsinfo.data[store.index].staff }}</span> 發佈於
                                    {{ storeNewsinfo.data[store.index].start }}
                                    <!-- <span class="text-muted">10 min</span> -->
                                </p>
                                <div v-for="(list, item) in newData" :key="item">
                                    <div>
                                        <iframe frameborder="0" :src="list.videoUrl.item"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowfullscreen v-if="list.videoUrl.item"></iframe>
                                    </div>
                                    <p class="fs-sm text-muted">
                                        {{ list.content.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="block-content block-content-full text-end bg-body">
                        <button type="button" class="btn btn-sm btn-alt-secondary me-1" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal">
                            Perfect
                        </button>
                    </div>
                </template>
            </BaseBlock>
        </div>
        <!-- <div class="content content-boxed">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="push">
                            <BaseBlock class="overflow-hidden">
                                <template #content>
                                    <img class="img-fluid" src="/assets/media/photos/photo8@2x.jpg" alt="" />
                                    <div class="block-content">
                                        <h4 class="mb-1">Top 10 Destinations</h4>
                                        <p class="fs-sm fw-medium mb-2">
                                            <span class="text-primary">Henry Harrison</span> on July 16,
                                            2019 · <span class="text-muted">10 min</span>
                                        </p>
                                        <p class="fs-sm text-muted">
                                            Dolor posuere proin blandit accumsan senectus netus nullam
                                            curae, ornare laoreet adipiscing luctus mauris adipiscing
                                            pretium eget fermentum, tristique lobortis est ut metus
                                            lobortis tortor tincidunt himenaeos habitant quis dictumst
                                            proin odio sagittis purus mi, nec taciti vestibulum quis in
                                            sit varius lorem sit metus mi.
                                        </p>
                                    </div>
                                    <div class="block-content block-content-full text-end bg-body">
                                        <button type="button" class="btn btn-sm btn-alt-secondary me-1"
                                            data-bs-dismiss="modal">
                                            Close
                                        </button>
                                        <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal">
                                            Perfect
                                        </button>
                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                    </template>
                                                                                                                                                                                                                                    <div class="block-content block-content-full text-end bg-body">
                                                                                                                                                                                                                                        <button type="button" class="btn btn-sm btn-alt-secondary me-1"
                                                                                                                                                                                                                                            data-bs-dismiss="modal">
                                                                                                                                                                                                                                            Close
                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                        <button type="button" class="btn btn-sm btn-primary" data-bs-dismiss="modal">
                                                                                                                                                                                                                                            Perfect
                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                </BaseBlock>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                </div> -->
        </div>
    </div>
</template>