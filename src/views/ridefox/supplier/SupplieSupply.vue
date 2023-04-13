<script setup>
import { ref } from "vue";
import BaseNavigation from "@/components/BaseNavigation.vue";

// Grab menu navigation arrays
import menu from "@/data/menu";

// Helper variables for mobile navigation visibility
const mobileVisibleNavHoverNormal = ref(false);
const mobileVisibleNavHoverNormalDark = ref(false);
//以下api

const testBlock = ref(null);

const testBlockRefresh = ref(null);
const testBlockAll = ref(null);

const testBlockLoading1 = ref(null);
const testBlockLoading2 = ref(null);
const testBlockLoading3 = ref(null);
const testBlockLoading4 = ref(null);
const testBlockLoading5 = ref(null);
const testBlockLoading6 = ref(null);
const testBlockLoading7 = ref(null);
const testBlockLoading8 = ref(null);

// Demo loading functionality for testBlockRefresh
function loadDataForTestBlockRefresh() {
    // Set the block to loading state
    testBlockRefresh.value.statusLoading();

    // .. here you could load your data

    // Set a timeout for demo purposes
    setTimeout(() => {
        // Set the block back to normal state
        testBlockRefresh.value.statusNormal();
    }, 2000);
}

// Demo loading functionality for testBlockAll
function loadDataForTestBlockAll() {
    // Set the block to loading state
    testBlockAll.value.statusLoading();

    // .. here you could load your data

    // Set a timeout for demo purposes
    setTimeout(() => {
        // Set the block back to normal state
        testBlockAll.value.statusNormal();
    }, 2000);
}
// computed: {
//     isBreakfastTime() {
//       const currentHour = new Date().getHours();
//       if (currentHour >= 6 && currentHour < 9) {
//         return true;
//       } else {
//         return false;
//       }
//     }
//   }
</script>
<template>
    <!-- <div>
            <p>當前時間是否為早餐時段：{{ isBreakfastTime }}</p>
        </div> -->
    <div class="content">
        <h2 class="content-heading">供應商</h2>
        <div class="bg-white p-3 push">
            <select name="fruit">
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
            </select>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
            <div class="d-lg-block mt-2 mt-lg-0" :class="{
                'd-none': !mobileVisibleNavHoverNormal,
            }">
                <BaseNavigation :nodes="menu.demo" horizontal horizontal-hover />
            </div>
        </div>
    </div>

    <!-- Page Content -->
    <div class="content">
        <BaseBlock title="Usage with JavaScript">
            <p class="text-muted">
                Using block API is easy. You will just have to use the ref property of
                your block to call the related method. For example, to set the status of
                a block with ref set to <strong>testBlock</strong> to loading, you will
                have to call:
                <code>testBlock.statusLoading()</code>
            </p>
            <div class="row items-push">
                <div class="col-md-6">
                    <div class="table-responsive">
                        <table class="table table-bordered table-hover table-vcenter mb-0">
                            <thead>
                                <tr>
                                    <th style="width: 25%">Live Test</th>
                                    <th style="min-width: 160px">Method</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-alt-secondary w-100"
                                            @click="testBlock.contentToggle()">
                                            1月份
                                        </button>
                                    </td>
                                    <td>

                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button type="button" class="btn btn-sm btn-alt-secondary w-100"
                                            @click="testBlock.open()">
                                            Open
                                        </button>
                                    </td>
                                    <td>
                                        <code>testBlock.open()</code>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-md-6">
                    <BaseBlock ref="testBlock" title="Test Block" bordered btn-option-fullscreen btn-option-content>
                        <p>
                            廠商資訊
                        </p>
                    </BaseBlock>
                </div>
            </div>
        </BaseBlock>
        <!-- END Blocks API -->

        <!-- Interactive Options -->

        <!-- END Interactive Options -->

        <!-- Loading Indicators -->
        <h2 class="content-heading">Loading Indicators</h2>

        <!-- END Loading Indicators -->
    </div>
    <!-- END Page Content -->
</template>