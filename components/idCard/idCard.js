// components/idCard/idCard.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

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
        handleTap() {
            this.triggerEvent('handleTap')
        },
        checkout() {
            console.log(1);
            wx.navigateTo({
                url: '/pages/classList/classList',
            })
        }
    }
})