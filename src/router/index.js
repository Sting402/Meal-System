import { createRouter, createWebHashHistory } from "vue-router";
import { useLoginStore } from '../stores/login/login';
import NProgress from "nprogress/nprogress.js";
// Main layout variations
import LayoutSimple from "@/layouts/variations/Simple.vue";
//import LayoutLanding from "@/layouts/variations/Landing.vue";
import LayoutBackend from "@/layouts/variations/Backend.vue";
import LayoutBackendBoxed from "@/layouts/variations/BackendBoxed.vue";
import LayoutBackendMegaMenu from "@/layouts/variations/BackendMegaMenu.vue";
import LayoutBackendSidebarMiniNav from "@/layouts/variations/BackendSidebarMiniNav.vue";
// Frontend: Landing
//const Landing = () => import("@/views/landing/LandingView.vue");

// RideFox: Login
const RideFoxSignIn = () => import("@/views/ridefox/auth/SignInView.vue");
// Backend Boxed: Dashboard
const BackendBoxedDashboard = () =>
  import("@/views/backend-boxed/DashboardView.vue");
const BackendBoxedSimple1 = () =>
  import("@/views/backend-boxed/Simple1View.vue");
const BackendBoxedSimple2 = () =>
  import("@/views/backend-boxed/Simple2View.vue");
const BackendBoxedImage1 = () => import("@/views/backend-boxed/Image1View.vue");
const BackendBoxedImage2 = () => import("@/views/backend-boxed/Image2View.vue");
const BackendBoxedSearch = () => import("@/views/backend-boxed/SearchView.vue");

// Backend: Dashboard
const BackendDashboard = () => import("@/views/backend/DashboardView.vue");
// Backend: Element
const BackendElementsMegaMenu = () =>
  import("@/views/backend/elements/MegaMenuView.vue");
// Backend: Layout
const BackendLayoutPageDefault = () =>
  import("@/views/backend/layout/page/DefaultView.vue");
const BackendLayoutPageFlipped = () =>
  import("@/views/backend/layout/page/FlippedView.vue");
const BackendLayoutDarkModeOn = () =>
  import("@/views/backend/layout/dark-mode/OnView.vue");
const BackendLayoutDarkModeOff = () =>
  import("@/views/backend/layout/dark-mode/OffView.vue");
const BackendLayoutDarkModeSystem = () =>
  import("@/views/backend/layout/dark-mode/SystemView.vue");
const BackendLayoutMainContentFullWidth = () =>
  import("@/views/backend/layout/main-content/FullWidthView.vue");
const BackendLayoutMainContentNarrow = () =>
  import("@/views/backend/layout/main-content/NarrowView.vue");
const BackendLayoutMainContentBoxed = () =>
  import("@/views/backend/layout/main-content/BoxedView.vue");
const BackendLayoutHeaderFixedLight = () =>
  import("@/views/backend/layout/header/FixedLightView.vue");
const BackendLayoutHeaderFixedDark = () =>
  import("@/views/backend/layout/header/FixedDarkView.vue");
const BackendLayoutHeaderStaticLight = () =>
  import("@/views/backend/layout/header/StaticLightView.vue");
const BackendLayoutHeaderStaticDark = () =>
  import("@/views/backend/layout/header/StaticDarkView.vue");
const BackendLayoutSidebarMini = () =>
  import("@/views/backend/layout/sidebar/MiniView.vue");
const BackendLayoutSidebarLight = () =>
  import("@/views/backend/layout/sidebar/LightView.vue");
const BackendLayoutSidebarDark = () =>
  import("@/views/backend/layout/sidebar/DarkView.vue");
const BackendLayoutSidebarHidden = () =>
  import("@/views/backend/layout/sidebar/HiddenView.vue");
const BackendLayoutSideOverlayVisible = () =>
  import("@/views/backend/layout/side-overlay/VisibleView.vue");
const BackendLayoutSideOverlayHoverMode = () =>
  import("@/views/backend/layout/side-overlay/HoverModeView.vue");
const BackendLayoutSideOverlayNoPageOverlay = () =>
  import("@/views/backend/layout/side-overlay/NoPageOverlayView.vue");
const BackendLayoutLoaders = () =>
  import("@/views/backend/layout/LoadersView.vue");
const BackendLayoutApi = () => import("@/views/backend/layout/ApiView.vue");

// Backend: Generic Pages
const BackendPagesGenericBlank = () =>
  import("@/views/backend/pages/generic/BlankView.vue");
const BackendPagesGenericBlankBlock = () =>
  import("@/views/backend/pages/generic/BlankBlockView.vue");
const BackendPagesGenericSearch = () =>
  import("@/views/backend/pages/generic/SearchView.vue");
const BackendPagesGenericProfile = () =>
  import("@/views/backend/pages/generic/ProfileView.vue");
const BackendPagesGenericInvoice = () =>
  import("@/views/backend/pages/generic/InvoiceView.vue");
const BackendPagesGenericPricingPlans = () =>
  import("@/views/backend/pages/generic/PricingPlansView.vue");
const BackendPagesGenericFaq = () =>
  import("@/views/backend/pages/generic/FaqView.vue");
const BackendPagesGenericInbox = () =>
  import("@/views/backend/pages/generic/InboxView.vue");
const BackendPagesGenericSidebarMiniNav = () =>
  import("@/views/backend/pages/generic/SidebarMiniNavView.vue");

// Backend: Pages
const BackendPagesAuth = () => import("@/views/backend/pages/AuthView.vue");
const BackendPagesErrors = () => import("@/views/backend/pages/ErrorsView.vue");

// Specials
const SpecialsMaintenance = () =>
  import("@/views/specials/MaintenanceView.vue");
const SpecialsStatus = () => import("@/views/specials/StatusView.vue");
const SpecialsComingSoon = () => import("@/views/specials/ComingSoonView.vue");

// Auth
const AuthSignIn = () => import("@/views/auth/SignInView.vue");
const AuthSignIn2 = () => import("@/views/auth/SignIn2View.vue");
const AuthSignIn3 = () => import("@/views/auth/SignIn3View.vue");
const AuthSignUp = () => import("@/views/auth/SignUpView.vue");
const AuthSignUp2 = () => import("@/views/auth/SignUp2View.vue");
const AuthSignUp3 = () => import("@/views/auth/SignUp3View.vue");
const AuthLock = () => import("@/views/auth/LockView.vue");
const AuthLock2 = () => import("@/views/auth/Lock2View.vue");
const AuthLock3 = () => import("@/views/auth/Lock3View.vue");
const AuthReminder = () => import("@/views/auth/ReminderView.vue");
const AuthReminder2 = () => import("@/views/auth/Reminder2View.vue");
const AuthReminder3 = () => import("@/views/auth/Reminder3View.vue");

// Errors
const Error400 = () => import("@/views/errors/400View.vue");
const Error401 = () => import("@/views/errors/401View.vue");
const Error403 = () => import("@/views/errors/403View.vue");
const Error404 = () => import("@/views/errors/404View.vue");
const Error500 = () => import("@/views/errors/500View.vue");
const Error503 = () => import("@/views/errors/503View.vue");
const routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/ridefox/auth/LoginView.vue'),
    meta: { requireAuth: true }
  },
  {
    path: '/reminder',
    name: 'reminder',
    component: () => import('../views/ridefox/auth/reminder.vue'),
  },
  {
    path: '/supplierLogin',
    name: 'supplierLogin',
    component: () => import('../views/ridefox/auth/supplierLogin.vue'),
  },
  {
    path: "/signin",
    component: LayoutBackend,
    children: [
      {
        path: "",
        name: "ridefox-signin",
        component: RideFoxSignIn,
      },
    ],
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('../layouts/BaseLayout.vue'),
    children: [
      {
        path: 'passwordchange',
        name: 'passwordchange',
        component: () => import('../views/ridefox/auth/passwordchange.vue'),
      },
      {
        path: 'defaultmeal',
        name: 'defaultmeal',
        component: () => import('../views/ridefox/auth/defaultmeal.vue'),
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('../views/ridefox/order/Personal.vue'),
      },
      {
        path: 'dashboard',
        name: 'ridefox-dashboard',
        component: () => import('../views/ridefox/dashboard/DashboardView.vue'),
      },
      {
        path: 'adminselect',
        name: 'adminselect',
        component: () => import('../views/ridefox/admin/adminselect.vue'),
      },
      {
        path: "adminorder",
        name: 'adminorder',
        component: () => import('../views/ridefox/order/adminorder.vue'),
      },
      {
        path: "orderratings",
        name: 'orderratings',
        component: () => import('../views/ridefox/order/orderratings.vue'),
      },
      {
        path: "ratinghistory",
        name: 'ratinghistory',
        component: () => import('../views/ridefox/order/ratinghistory.vue'),
      },
      {
        path: "estamount",
        name: 'estamount',
        component: () => import('../views/ridefox/order/estamount.vue'),
      },
      {
        path: "leftovers",
        name: 'leftovers',
        component: () => import('../views/ridefox/order/leftovers.vue'),
      },
      {
        path: "dapartmentpickup",
        name: 'dapartmentpickup',
        component: () => import('../views/ridefox/order/dapartmentpickup.vue'),
      },
      {
        path: "searchproviding",
        name: 'searchproviding',
        component: () => import('../views/ridefox/supplier/searchproviding.vue'),
      },
      {
        path: "pendingorders",
        name: 'pendingorders',
        component: () => import('../views/ridefox/supplier/pendingorders.vue'),
      },
      {
        path: "balancesheet",
        name: 'balancesheet',
        component: () => import('../views/ridefox/supplier/balancesheet.vue'),
      },
      {
        path: "ordermanage",
        name: 'ordermanage',
        component: () => import('../views/ridefox/supplier/ordermanage.vue'),
      },
      {
        path: "reference",
        name: 'reference',
        component: () => import('../views/ridefox/supplier/reference.vue'),
      },
      {
        path: "splitprofit",
        name: 'splitprofit',
        component: () => import('../views/ridefox/supplier/splitprofit.vue'),
      },
      {
        path: "prexcelchart",
        name: 'prexcelchart',
        component: () => import('../views/ridefox/supplier/prexcelchart.vue'),
      },
      {
        path: "mealratings",
        name: 'mealratings',
        component: () => import('../views/ridefox/supplier/mealratings.vue'),
      },
      {
        path: "personalinfo",
        name: 'personalinfo',
        component: () => import('../views/ridefox/setting/personalinfo.vue'),
      },
      {
        path: "departmentinfo",
        name: 'departmentinfo',
        component: () => import('../views/ridefox/setting/departmentinfo.vue'),
      },
      {
        path: "annualsupplierinfo",
        name: 'annualsupplierinfo',
        component: () => import('../views/ridefox/setting/annualsupplierinfo.vue'),
      },
      {
        path: "annualsupplierinfoYear/:id",
        name: 'annualsupplierinfoYear',
        component: () => import('../views/ridefox/setting/annualsupplierinfoYear.vue'),
      },
      {
        path: "locationinfo",
        name: 'locationinfo',
        component: () => import('../views/ridefox/setting/locationinfo.vue'),
      },
      {
        path: "restaurant",
        name: 'restaurant',
        component: () => import('../views/ridefox/setting/restaurant.vue'),
      },
      {
        path: "supplierinfo",
        name: 'supplierinfo',
        component: () => import('../views/ridefox/setting/supplierinfo.vue'),
      },
      {
        path: "workoffdaysinfo",
        name: 'workoffdaysinfo',
        component: () => import('../views/ridefox/setting/workoffdaysinfo.vue'),
      },
      {
        path: "dashboardinfo",
        name: 'dashboardinfo',
        component: () => import('../views/ridefox/setting/dashboardinfo.vue'),
      },
      {
        path: "newsinfo",
        name: 'newsinfo',
        component: () => import('../views/ridefox/setting/newsinfo.vue'),
      },
      {
        path: "newcomer",
        name: "newcomer",
        component: () => import("../views/ridefox/reservation/Newcomer.vue")
      },
      {
        path: "productionLine",
        name: "productionLine",
        component: () => import("../views/ridefox/reservation/ProductionLine.vue")
      },
      {
        path: "staff",
        name: "staff",
        component: () => import("../views/ridefox/reservation/Staff.vue")
      },
      {
        path: "warehouse",
        name: "warehouse",
        component: () => import("../views/ridefox/reservation/Warehouse.vue"),
      },
      {
        path: "foreign",
        name: "foreign",
        component: () => import("../views/ridefox/reservation/Foreign.vue"),
      },
    ],
  },
  {
    path: "/backend-boxed",
    component: LayoutBackendBoxed,
    children: [
      {
        path: "",
        name: "backend-boxed-dashboard",
        component: BackendBoxedDashboard,
      },
      {
        path: "simple1",
        name: "backend-boxed-simple1",
        component: BackendBoxedSimple1,
      },
      {
        path: "simple2",
        name: "backend-boxed-simple2",
        component: BackendBoxedSimple2,
      },
      {
        path: "image1",
        name: "backend-boxed-image1",
        component: BackendBoxedImage1,
      },
      {
        path: "image2",
        name: "backend-boxed-image2",
        component: BackendBoxedImage2,
      },
      {
        path: "search",
        name: "backend-boxed-search",
        component: BackendBoxedSearch,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Backend Mega Menu Route
  |--------------------------------------------------------------------------
  */

  {
    path: "/backend/elements",
    component: LayoutBackendMegaMenu,
    children: [
      {
        path: "mega-menu",
        name: "backend-elements-mega-menu",
        component: BackendElementsMegaMenu,
      },
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Backend Sidebar Mini Nav Route
  |--------------------------------------------------------------------------
  */

  {
    path: "/backend/pages/generic",
    component: LayoutBackendSidebarMiniNav,
    children: [
      {
        path: "sidebar-mini-nav",
        name: "backend-pages-generic-sidebar-mini-nav",
        component: BackendPagesGenericSidebarMiniNav,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Backend Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/backend",
    redirect: "/backend/dashboard",
    component: LayoutBackend,
    children: [
      {
        path: "dashboard",
        name: "backend-dashboard",
        component: BackendDashboard,
      },
      {
        path: "layout",
        redirect: "/layout/api",
        children: [
          {
            path: "page/default",
            name: "backend-layout-page-default",
            component: BackendLayoutPageDefault,
          },
          {
            path: "page/flipped",
            name: "backend-layout-page-flipped",
            component: BackendLayoutPageFlipped,
          },
          {
            path: "dark-mode/on",
            name: "backend-layout-dark-mode-on",
            component: BackendLayoutDarkModeOn,
          },
          {
            path: "dark-mode/off",
            name: "backend-layout-dark-mode-off",
            component: BackendLayoutDarkModeOff,
          },
          {
            path: "dark-mode/system",
            name: "backend-layout-dark-mode-system",
            component: BackendLayoutDarkModeSystem,
          },
          {
            path: "main-content/full-width",
            name: "backend-layout-main-content-full-width",
            component: BackendLayoutMainContentFullWidth,
          },
          {
            path: "main-content/narrow",
            name: "backend-layout-main-content-narrow",
            component: BackendLayoutMainContentNarrow,
          },
          {
            path: "main-content/boxed",
            name: "backend-layout-main-content-boxed",
            component: BackendLayoutMainContentBoxed,
          },
          {
            path: "header/fixed-light",
            name: "backend-layout-header-fixed-light",
            component: BackendLayoutHeaderFixedLight,
          },
          {
            path: "header/fixed-dark",
            name: "backend-layout-header-fixed-dark",
            component: BackendLayoutHeaderFixedDark,
          },
          {
            path: "header/static-light",
            name: "backend-layout-header-static-light",
            component: BackendLayoutHeaderStaticLight,
          },
          {
            path: "header/static-dark",
            name: "backend-layout-header-static-dark",
            component: BackendLayoutHeaderStaticDark,
          },
          {
            path: "sidebar/mini",
            name: "backend-layout-sidebar-mini",
            component: BackendLayoutSidebarMini,
          },
          {
            path: "sidebar/light",
            name: "backend-layout-sidebar-light",
            component: BackendLayoutSidebarLight,
          },
          {
            path: "sidebar/dark",
            name: "backend-layout-sidebar-dark",
            component: BackendLayoutSidebarDark,
          },
          {
            path: "sidebar/hidden",
            name: "backend-layout-sidebar-hidden",
            component: BackendLayoutSidebarHidden,
          },
          {
            path: "side-overlay/visible",
            name: "backend-layout-side-overlay-visible",
            component: BackendLayoutSideOverlayVisible,
          },
          {
            path: "side-overlay/hover-mode",
            name: "backend-layout-side-overlay-hover-mode",
            component: BackendLayoutSideOverlayHoverMode,
          },
          {
            path: "side-overlay/no-page-overlay",
            name: "backend-layout-side-overlay-no-page-overlay",
            component: BackendLayoutSideOverlayNoPageOverlay,
          },
          {
            path: "loaders",
            name: "backend-layout-loaders",
            component: BackendLayoutLoaders,
          },
          {
            path: "api",
            name: "backend-layout-api",
            component: BackendLayoutApi,
          },
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Backend Generic Pages Routes
      |--------------------------------------------------------------------------
      */
      {
        path: "pages/generic",
        redirect: "/pages/generic/blank",
        children: [
          {
            path: "blank",
            name: "backend-pages-generic-blank",
            component: BackendPagesGenericBlank,
          },
          {
            path: "blank-block",
            name: "backend-pages-generic-blank-block",
            component: BackendPagesGenericBlankBlock,
          },
          {
            path: "search",
            name: "backend-pages-generic-search",
            component: BackendPagesGenericSearch,
          },
          {
            path: "profile",
            name: "backend-pages-generic-profile",
            component: BackendPagesGenericProfile,
          },
          {
            path: "invoice",
            name: "backend-pages-generic-invoice",
            component: BackendPagesGenericInvoice,
          },
          {
            path: "pricing-plans",
            name: "backend-pages-generic-pricing-plans",
            component: BackendPagesGenericPricingPlans,
          },
          {
            path: "faq",
            name: "backend-pages-generic-faq",
            component: BackendPagesGenericFaq,
          },
          {
            path: "inbox",
            name: "backend-pages-generic-inbox",
            component: BackendPagesGenericInbox,
          },
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Backend Pages Routes
      |--------------------------------------------------------------------------
      */
      {
        path: "pages",
        children: [
          {
            path: "auth",
            name: "backend-pages-auth",
            component: BackendPagesAuth,
          },
          {
            path: "errors",
            name: "backend-pages-errors",
            component: BackendPagesErrors,
          },
        ],
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Special Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/specials",
    component: LayoutSimple,
    children: [
      {
        path: "maintenance",
        name: "specials-maintenance",
        component: SpecialsMaintenance,
      },
      {
        path: "status",
        name: "specials-status",
        component: SpecialsStatus,
      },
      {
        path: "coming-soon",
        name: "specials-coming-soon",
        component: SpecialsComingSoon,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Auth Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/auth",
    component: LayoutSimple,
    children: [
      {
        path: "signin",
        name: "auth-signin",
        component: AuthSignIn,
      },
      {
        path: "signin2",
        name: "auth-signin2",
        component: AuthSignIn2,
      },
      {
        path: "signin3",
        name: "auth-signin3",
        component: AuthSignIn3,
      },
      {
        path: "signup",
        name: "auth-signup",
        component: AuthSignUp,
      },
      {
        path: "signup2",
        name: "auth-signup2",
        component: AuthSignUp2,
      },
      {
        path: "signup3",
        name: "auth-signup3",
        component: AuthSignUp3,
      },
      {
        path: "lock",
        name: "auth-lock",
        component: AuthLock,
      },
      {
        path: "lock2",
        name: "auth-lock2",
        component: AuthLock2,
      },
      {
        path: "lock3",
        name: "auth-lock3",
        component: AuthLock3,
      },
      {
        path: "reminder",
        name: "auth-reminder",
        component: AuthReminder,
      },
      {
        path: "reminder2",
        name: "auth-reminder2",
        component: AuthReminder2,
      },
      {
        path: "reminder3",
        name: "auth-reminder3",
        component: AuthReminder3,
      },
    ],
  },

  /*
  |
  |--------------------------------------------------------------------------
  | Error Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/errors",
    component: LayoutSimple,
    children: [
      {
        path: "400",
        name: "error-400",
        component: Error400,
      },
      {
        path: "401",
        name: "error-401",
        component: Error401,
      },
      {
        path: "403",
        name: "error-403",
        component: Error403,
      },
      {
        path: "404",
        name: "error-404",
        component: Error404,
      },
      {
        path: "500",
        name: "error-500",
        component: Error500,
      },
      {
        path: "503",
        name: "error-503",
        component: Error503,
      },
    ],
  },

];
let modules = import.meta.glob('../**/*.vue')
// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});

// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });
let flag = true
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});

router.beforeEach(async (to, from, next) => {
  console.log('守衛');
  // 如果用戶未登入
  if (!sessionStorage.getItem('token')) {
    // 如果目標路徑不是登錄頁面
    if (to.name !== 'login' && to.name !== 'supplierLogin' && to.name !== 'reminder') {
      // 直接跳轉到登錄頁面
      next({ name: 'login' })
    } else {
      // 否則放行
      next()
    }
  } else {
    console.log('else');
    // 如果用戶已登入
    // 如果目標路徑是登錄頁面
    if (to.name === 'login' || to.name === 'supplierLogin') {
      // 直接跳轉到首頁或者其他頁面
      if (to.name === 'login') next({ name: 'personal' }) // 首頁名稱為 personal
      //目前廠商回到login還有問題
      else if (to.name === 'supplierLogin') next({ name: 'searchproviding' })
    } else {
      // 否則放行
      next()
    }
  }
  console.log(to.name);//廠商 supplierLogin searchproviding
  //next()
})

// to要去的路由信息
// from要离开的路由信息
// next是否要放行，默认放行，next(false)不放行

// 全局路由守卫: 根据token判断，如果没有则返回登录页面，如果有则放行
// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('token')) { // 如果没有
//     if (to.name == "login") { // 判断是否要去登陆界面如果是则放行
//       next()
//     } else { // 否则直接跳转登录界面
//       router.push('login')
//     }
//   } else { // 如果有则放行
//     next()
//   }
// })
router.afterEach(() => {
  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;

