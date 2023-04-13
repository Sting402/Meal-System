import{describe, it, expect} from 'vitest'
import reative from "../Adminorder/Calendar.vue"
import {mount} from "@vue/test-utils"

describe('reative',()=>{
    it('should render correctly',()=>{const wrapper  = mount (reative)
    expect (wrapper.html()).toMatchSnapshot()})
    
})