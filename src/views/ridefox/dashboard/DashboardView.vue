<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import $ridefoxmenu from '../../../data/ridefoxmenu'
import Popin from '../../../components/Dashboard/Popin.vue'
import {
  Dataset,
  DatasetItem,
  DatasetInfo,
  DatasetPager,
  DatasetSearch,
  DatasetShow,
} from "vue-dataset";
import users from "@/data/usersDataset.json";
import { usePopinStore } from "../../../stores/newsinfo/popin";
import { useDashboardPopinStore } from '../../../stores/dashboard/popin';
const store = useDashboardPopinStore()
const storeNewsinfo = usePopinStore();
// Helper variables
const orderSearch = ref(false);

// Chart Earnings data
const earningsData = reactive({
  labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  datasets: [
    {
      label: "This Week",
      fill: true,
      backgroundColor: "rgba(100, 116, 139, .7)",
      borderColor: "transparent",
      pointBackgroundColor: "rgba(100, 116, 139, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(100, 116, 139, 1)",
      data: [716, 628, 1056, 560, 956, 890, 790],
    },
    {
      label: "Last Week",
      fill: true,
      backgroundColor: "rgba(100, 116, 139, .15)",
      borderColor: "transparent",
      pointBackgroundColor: "rgba(100, 116, 139, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(100, 116, 139, 1)",
      data: [1160, 923, 1052, 1300, 880, 926, 963],
    },
  ],
});

const handlePop = (item) => {
  console.log(item);
  store.index = item
  console.log(store.index);
  store.$popin.click();
}

const cols = reactive([
  {
    name: "標題",
    field: "title",
    sort: "",
  },
  {
    name: "開始日期",
    field: "start",
    sort: "",
  },
  {
    name: "結束日期",
    field: "end",
    sort: "",
  },
  {
    name: "編輯人員",
    field: "staff",
    sort: "",
  },
]);
const sortBy = computed(() => {
  return cols.reduce((acc, o) => {
    if (o.sort) {
      o.sort === "asc" ? acc.push(o.field) : acc.push("-" + o.field);
    }
    return acc;
  }, []);
});
function onSort(event, i) {
  let toset;
  const sortEl = cols[i];

  if (!event.shiftKey) {
    cols.forEach((o) => {
      if (o.field !== sortEl.field) {
        o.sort = "";
      }
    });
  }

  if (!sortEl.sort) {
    toset = "asc";
  }

  if (sortEl.sort === "desc") {
    toset = event.shiftKey ? "" : "asc";
  }

  if (sortEl.sort === "asc") {
    toset = "desc";
  }

  sortEl.sort = toset;
}
let list = JSON.parse(sessionStorage.getItem('loginInfo'))
//console.log(list);
onMounted(() => {
  // Remove labels from
  document.querySelectorAll("#datasetLength label").forEach((el) => {
    el.remove();
  });

  // Replace select classes
  let selectLength = document.querySelector("#datasetLength select");

  selectLength.classList = "";
  selectLength.classList.add("form-select");
  selectLength.style.width = "80px";
})
</script>

<template>
  <div class="content">
  <div
    class="d-flex flex-column flex-md-row justify-content-md-between align-items-md-center py-2 text-center text-md-start">
    <div class="flex-grow-1 mb-1 mb-md-0">
      <h1 class="h3 fw-bold mb-2">最新消息</h1>
      <h2 class="h6 fw-medium fw-medium text-muted mb-0">
        你好,
        <RouterLink :to="{ name: '' }" class="fw-semibold">{{ list.e_Name }}</RouterLink>
      </h2>
    </div>
    <!-- <div class="mt-3 mt-md-0 ms-md-3 space-x-1">
          <div class="dropdown d-inline-block">
            <button type="button" class="btn btn-sm btn-alt-secondary space-x-1" id="dropdown-analytics-overview"
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fa fa-fw fa-calendar-alt opacity-50"></i>
                            <span>All time</span>
                                <i class="fa fa-fw fa-angle-down"></i>
                              </button>
                              <div class="dropdown-menu dropdown-menu-end fs-sm" aria-labelledby="dropdown-analytics-overview">
                                <a class="dropdown-item fw-medium" href="javascript:void(0)">Last 30 days</a>
                                <a class="dropdown-item fw-medium" href="javascript:void(0)">Last month</a>
                                <a class="dropdown-item fw-medium" href="javascript:void(0)">Last 3 months</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item fw-medium" href="javascript:void(0)">This year</a>
                                <a class="dropdown-item fw-medium" href="javascript:void(0)">Last Year</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                                  href="javascript:void(0)">
                                  <span>All time</span>
                                  <i class="fa fa-check"></i>
                                </a>
                              </div>
                            </div>
                          </div> -->
    </div>
  </div>
  <!-- <div class="content">
        <BaseBlock title="消息列表">
          <template #options>
            <div class="space-x-1">
              <button type="button" class="btn btn-sm btn-alt-secondary" @click="
                () => {
                  orderSearch = !orderSearch;
                }
              ">
                <i class="fa fa-search"></i>
              </button>
              <div class="dropdown d-inline-block">
                <button type="button" class="btn btn-sm btn-alt-secondary" id="dropdown-recent-orders-filters"
                  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  排序方式
                  <i class="fa fa-angle-down ms-1"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-md dropdown-menu-end fs-sm"
                  aria-labelledby="dropdown-recent-orders-filters">
                  <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                    href="javascript:void(0)">
                    Pending
                    <span class="badge bg-primary rounded-pill"></span>
                  </a>
                  <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                    href="javascript:void(0)">
                    Active
                    <span class="badge bg-primary rounded-pill"></span>
                  </a>
                  <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                    href="javascript:void(0)">
                    Completed
                    <span class="badge bg-primary rounded-pill"></span>
                  </a>
                  <a class="dropdown-item fw-medium d-flex align-items-center justify-content-between"
                    href="javascript:void(0)">
                    All
                    <span class="badge bg-primary rounded-pill"></span>
                  </a>
                </div>
              </div>
            </div>
          </template>

          <template #content>
            <div v-if="orderSearch" id="one-dashboard-search-orders" class="block-content border-bottom">
              <form @submit.prevent>
                <div class="push">
                  <div class="input-group">
                    <input type="text" class="form-control form-control-alt" id="one-ecom-orders-search"
                      name="one-ecom-orders-search" placeholder="Search all orders.." />
                    <span class="input-group-text bg-body border-0">
                      <i class="fa fa-search"></i>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div class="block-content block-content-full">
              <div class="table-responsive">
                <table class="table table-hover table-vcenter">
                  <thead>
                    <tr>
                      <th>標題</th>
                      <th>開始日期</th>
                      <th>結束日期</th>
                    </tr>
                  </thead>
                  <tbody class="fs-sm" v-for="(list, item) in storeNewsinfo.data" :key="item">
                    <tr @click="handlePop(item)">
                      <td>{{ list.title }}</td>
                      <td>{{ list.start }}</td>
                      <td>{{ list.end }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="block-content block-content-full bg-body-light">
              <nav aria-label="Photos Search Navigation">
                <ul class="pagination pagination-sm justify-content-end mb-0">
                  <li class="page-item">
                    <a class="page-link" href="javascript:void(0)" tabindex="-1" aria-label="Previous">
                      Prev
                    </a>
                  </li>
                  <li class="page-item active">
                    <a class="page-link" href="javascript:void(0)">1</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="javascript:void(0)">2</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="javascript:void(0)">3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="javascript:void(0)">4</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="javascript:void(0)" aria-label="Next">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </template>
        </BaseBlock>
      </div> -->


  <div class="content">
    <BaseBlock title="消息列表" content-full>
      <Dataset v-slot="{ ds }" :ds-data="storeNewsinfo.data" :ds-sortby="sortBy"
        :ds-search-in="['name', 'email', 'product']">
        <div class="row" :data-page-count="ds.dsPagecount">

          <div id="datasetLength" class="col-md-8 py-2">
            <DatasetShow />
          </div>
          <div class="col-md-4 py-2">
            <DatasetSearch ds-search-placeholder="搜尋" />
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-12">
            <div class="table-responsive">
              <table class="table  mb-0 table-hover">
                <thead>
                  <tr>
                    <th v-for="(th, index) in cols" :key="th.field" :class="['sort', th.sort]"
                      @click="onSort($event, index)" class="text-center">
                      {{ th.name }} <i class="gg-select float-end"></i>
                    </th>
                  </tr>
                </thead>
                <DatasetItem tag="tbody" class="fs-sm">
                  <template #default="{ row, rowIndex }">
                    <tr @click="handlePop(rowIndex)">
                      <!-- <th scope="row">{{ rowIndex + 1 }}</th> -->
                      <td class="text-center">{{ row.title }}</td>
                      <td class="text-center">{{ row.start }}</td>
                      <td class="text-center">{{ row.end }}</td>
                      <td class="text-center">{{ row.staff }}</td>
                    </tr>
                  </template>
                </DatasetItem>
              </table>
            </div>
          </div>
        </div>
        <div class="d-flex flex-md-row flex-column justify-content-between align-items-center">
          <DatasetInfo class="py-3 fs-sm" />
          <DatasetPager class="flex-wrap py-3 fs-sm" />
        </div>
      </Dataset>
    </BaseBlock>
  </div>
  <Popin></Popin>
</template>
<style lang="scss" scoped>
.gg-select {
  box-sizing: border-box;
  position: relative;
  display: block;
  transform: scale(1);
  width: 22px;
  height: 22px;
}

.gg-select::after,
.gg-select::before {
  content: "";
  display: block;
  box-sizing: border-box;
  position: absolute;
  width: 8px;
  height: 8px;
  left: 7px;
  transform: rotate(-45deg);
}

.gg-select::before {
  border-left: 2px solid;
  border-bottom: 2px solid;
  bottom: 4px;
  opacity: 0.3;
}

.gg-select::after {
  border-right: 2px solid;
  border-top: 2px solid;
  top: 4px;
  opacity: 0.3;
}

th.sort {
  cursor: pointer;
  user-select: none;

  &.asc {
    .gg-select::after {
      opacity: 1;
    }
  }

  &.desc {
    .gg-select::before {
      opacity: 1;
    }
  }
}
</style>
