// /*
//  * Main and demo navigation arrays
//  *
//  * 'to' attribute points to the route name, not the path url
//  */

export default {
  main: [ //標題 0 2 5 13 22
    {//0 標題1
      name: "訊息",
      heading: true,
    },
    {//1
      name: "最新消息",
      to: "ridefox-dashboard",
    },
    {//2 標題2
      name: "個人設定",
      heading: true,
    },
    {//3
      name: "修改密碼",
      to: "passwordchange",

    },
    {//4
      name: "預設餐維護",
      to: "defaultmeal",

    },
    {//5 標題3
      name: "餐點",
      heading: true,
    },
    {//6
      name: "個人訂餐",
      to: "personal",

    },
    {//7
      name: "餐點評分",
      to: "orderratings",
    },
    {//8
      name: "代訂人員訂餐",
      subActivePaths: "/layout",
      sub: [//81
        {
          name: "代訂產線",
          to: "productionLine",

        },
        {//82
          name: "代訂倉庫",
          to: "warehouse",
        },
        {//83
          name: "代訂新人",
          to: "newcomer",
        },
        {//84
          name: "外部人員",
          to: "staff",
        },
        {//85
          name: "外國同仁",
          to: "foreign",
        }
      ]
    },
    {//9
      name: "管理者代訂餐點",
      to: "adminorder",

    },
    {//10
      name: "預估餐點數量",
      to: "estamount",

    },
    {//11
      name: "剩餘便當數量",
      to: "leftovers",
    },
    {//12
      name: "部門取餐地點",
      to: "dapartmentpickup",
    },
    {//13 標題4
      name: "查詢報表",
      heading: true,
    },
    {//14
      name: "廠商出餐查詢",
      to: "searchproviding",

    },
    {//15
      name: "待出餐訂單管理報表",
      to: "pendingorders",

    },
    {//16
      name: "廠商對帳管理報表",
      to: "balancesheet",

    },
    {//17
      name: "廠商訂購管理報表",
      to: "ordermanage",

    },
    {//18
      name: "廠商參考值報表",
      to: "reference",

    },
    {//19
      name: "廠商公司分帳報表",
      to: "splitprofit",

    },
    {//20
      name: "PR Excel分帳報表",
      to: "prexcelchart",

    },
    {//21
      name: "餐點評分報表",
      to: "mealratings",

    },
    {//22 標題5
      name: "系統設定",
      heading: true,
    },
    {//23
      name: "權限設定",
      to: "adminselect",

    },
    {//24
      name: "員工資料維護",
      to: "personalinfo",

    },
    {//25
      name: "部門資料維護",
      to: "departmentinfo",

    },
    {//26
      name: "廠區資料維護",
      to: "locationinfo",

    },
    {//27
      name: "餐廳資料維護",
      to: "restaurant",
    },
    {//28
      name: "供應商維護",
      to: "supplierinfo",

    },
    {//29
      name: "年度供應商維護",
      to: "annualsupplierinfo",

    },
    {//30
      name: "工作日維護",
      to: "workoffdaysinfo",

    },
    {//31
      name: "佈告欄維護",
      to: "dashboardinfo",

    },
    {//32
      name: "最新消息維護",
      to: "newsinfo",

    },
  ]
};

