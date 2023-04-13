# Ridefox Meal Ordering System

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for?

- Quick summary
- Version
- [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up?

- Summary of set up
- Configuration
- Dependencies
- Database configuration
- How to run tests
- Deployment instructions

### Contribution guidelines

- Writing tests
- Code review
- Other guidelines

### Who do I talk to?

- Repo owner or admin
- Other community or team contact

select

const options = [
{ text: '選項一', value: 'S001' },
{ text: '選項二', value: 'S002' },
{ text: '選項三', value: 'S003' },
];
const selectedValue = ref('S001')
function handleChange(event) {
console.log(event.target.value); // 打印出選擇的值
}
<label for="options">選擇一個選項：</label>
<select id="options" v-model="selectedValue" @change="handleChange">

<option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
</select>

  </div>
<!-- <div id="app">
<select @change="handleChange" v-bind:value="selectedValue" class="form-select" id="example-select"
name="example-select">
<option v-for="item in options" :value="item.value">{{ item.text }}</option>
</select>
</div> -->

#監聽 input#
// const num1 = ref(0)
// const num2 = ref(0)
// const num3 = ref(0)

// watch([num1, num2, num3], (newValues, oldValues) => {
// console.log('New values:', newValues)
// console.log('Old values:', oldValues)
// num3.value = num1.value + num2.value
// })

<!-- <div>
        <input type="number" v-model="num1" />
        <input type="number" v-model="num2" />
        <input type="number" v-model="num3" />
    </div> -->
