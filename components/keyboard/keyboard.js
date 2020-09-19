// components/keyboard/keyboard.js
Component({
  properties: {
    'isKeyboard':{
      type: Boolean,
      value: false
    },
    'keyboardType': {
      type: String,
      value: "keyboardOne"
    },
    'maxLength': {
      type: Number,
      value: ""
    },
    'minLength': {
      type: Number,
      value: ""
    },
    'test': {
      type: String,
      value: ""
    },
    'placeholder':{
      type: String,
      value: ""
    },
    'inputContent':{
      type: String,
      value: ""
    },
    'isKeyboardContent':{
      type: Boolean,
      value: true
    }
  },
  data: {
    categoryOne: '粤京津沪冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵川青藏琼宁渝✘'.split(''),
    categoryTwo: '1234567890'.split(''),
    categoryThree: 'QWERTYUIOP'.split(''),
    categoryFour: 'ASDFGHJKL'.split(''),
    categoryFive: 'ZXCVBNM✘'.split(''),
    categorySix: '123456789✘0.✔'.split(''),
  },
  methods: {
    changeKeyboardContent(e){
      if (e.currentTarget.dataset.value == '省称'){
        this.setData({
          isKeyboardContent: true
        })
      }
      if (e.currentTarget.dataset.value == '英\数'){
        this.setData({
          isKeyboardContent: false
        })
      }
    },
    keyboard(e) {
      // console.log(e)
      if (e.target.dataset.value == undefined){
        return;
      }
      if (e.target.dataset.value == '✘') {
        if (this.data.inputContent.length > 0) {
          this.setData({
            inputContent: this.data.inputContent.substring(0, this.data.inputContent.length - 1)
          })
        }
        return
      }
      if (e.target.dataset.value == '✔'){
        if (this.data.minLength != '' && this.data.inputContent.length < this.data.minLength) {
          wx.showToast({
            title: '输入位数不得小于' + this.data.minLength + '位',
            icon: 'none'
          })
          return
        }
        let reg = new RegExp(this.data.test)
        console.log(reg)
        if (this.data.test != '' && !reg.test(this.data.inputContent)) {
          wx.showToast({
            title: '不符合规则',
            icon: 'none'
          })
          return
        }
        this.triggerEvent('fwhfContent', {
          inputContent: this.data.inputContent
        })
        return
      }
      if (this.data.maxLength != '' && this.data.inputContent.length >= this.data.maxLength) {
        wx.showToast({
          title: '输入位数不得超过' + this.data.maxLength + '位',
          icon: 'none'
        })
        return
      }
      this.setData({
        inputContent: this.data.inputContent + e.target.dataset.value
      })
    }
  }
})
