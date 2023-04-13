// 設置異步延遲時間
export function delay(interval = 0) {
  return new Promise(resolve => {
    let timer = setTimeout(_ => {
      clearTimeout(timer)
      resolve()
    }, interval)
  })
}

// 按照二進制讀取文件
export function readFile(file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = e => {
      resolve(e.target.result)
      console.log("有");
    }
  })
}

// 字段對應表
export let character = {
  Workday_ID: {
    text: 'Workday_ID',
    type: 'string'
  },
  English_Name: {
    text: 'English_Name',
    type: 'string'
  },
  Chinese_Name: {
    text: 'Chinese_Name',
    type: 'string'
  },
  English_Name: {
    text: 'English_Name',
    type: 'string'
  },
  Email: {
    text: 'Email',
    type: 'string'
  },
  DL_IDL: {
    text: 'DL_IDL',
    type: 'string'
  },
  Department: {
    text: 'Department',
    type: 'string'
  },
  Site: {
    text: 'Site',
    type: 'string'
  },
  Shift: {
    text: 'Shift',
    type: 'string'
  },
  Type: {
    text: 'Type',
    type: 'string'
  },
  PR_Excel: {
    text: 'PR_Excel',
    type: 'string'
  },
  Status: {
    text: 'Status',
    type: 'string'
  },
  Modify_Date: {
    text: 'Modify_Date',
    type: 'number'
  }
}

// 時間字串格式化
export function formatTime(str, tpl) {
  let arr = str.match(/\d+/g).map(item => {
    return item.length < 2 ? '0' + item : item
  })
  tpl = tpl || '{0}年{1}月{2}日 {3}时{4}分{5}秒'
  return tpl.replace(/\{(\d+)\}/g, (_, group) => {
    return arr[group] || '00'
  })
}
//獲得當天日期格式
export function getToday() {
  let date = new Date();
  let options = { weekday: 'long' };
  let day = date.toLocaleDateString('zh-CN', options);
  let y = date.getFullYear();
  let m = date.getMonth();
  let d = date.getDate();
  let today = `${y}-${m + 1}-${d} ${day}`
  return today
}
//日期格式
export function getDateformat() {
  let date = new Date();

  let y = date.getFullYear();
  let m = (date.getMonth() + 1).toString().padStart(2, '0');  // add 1 to month and pad with leading zeros if needed
  let d = date.getDate().toString().padStart(2, '0');  // pad with leading zeros if needed

  let dateStr = `${y}-${m}-${d}`;
  return dateStr
}
//
export function getMenuList(menuList) {
  // let menuList = [1, 3, 4, 6, 10, 11, 12, 21, 30, 81]
  if (menuList.includes(1)) {
    menuList.unshift(0);
  }
  if (menuList.includes(3) || menuList.includes(4)) {
    if (!menuList.includes(2)) {
      menuList.push(2)
    }
  }
  if (menuList.some(item => [6, 7, 8, 9, 10, 11, 12].includes(item))) {
    if (!menuList.includes(5)) {
      menuList.push(5);
    }
  }
  if (menuList.some(item => [14, 15, 16, 17, 18, 19, 20, 21].includes(item))) {
    if (!menuList.includes(13)) {
      menuList.push(13);
    }
  }
  if (menuList.some(item => [23, 24, 25, 26, 27, 28, 29, 30, 31].includes(item))) {
    if (!menuList.includes(22)) {
      menuList.push(22);
    }
  }
  let newMenuList = []
  for (let i = 0; i < menuList.length; i++) {
    if (menuList[i] < 81 || menuList[i] > 85) {
      newMenuList.push(menuList[i]);
    }
  }
  newMenuList.sort((a, b) => a - b);

  //console.log(newMenuList);
  return newMenuList
}
//
export function getSubList(subList) {
  // let menuList = [1, 3, 4, 6, 10, 11, 12, 21, 30, 81, 82, 83]
  //console.log(subList);
  let resultArr = []
  let newSubList = []
  for (let i = 0; i < subList.length; i++) {
    if (subList[i] >= 81 && subList[i] <= 85) {
      newSubList.push(subList[i]);
    }
  }
  //console.log(newSubList);
  let resultSubList = []
  for (let i = 0; i < newSubList.length; i++) {
    resultSubList.push(newSubList[i] - 80);
  }
  if (resultSubList.length > 0) {
    let arr = [1, 2, 3, 4, 5]
    for (let i = 0; i < arr.length; i++) {
      if (resultSubList.includes(arr[i])) {
        arr.splice(i, 1);
        i--;
      }
    }
    resultArr = arr
  }
  //console.log(arr);
  return resultArr
}