// components/test/test.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickMe() { // 根据需求定义事件
      console.log("you have clicked me")
      this.triggerEvent('changeName', {
        name: '李四'
      })
    }
  }
})
