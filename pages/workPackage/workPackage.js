// pages/workPackage/workPackage.js
let voice = wx.createInnerAudioContext()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        workPackageInfo: {
            title: '2021.3.11（周三）英语作业',
            subject: "英语",
            publisher: "巫美美",
            pubTime: "3.11 17:03",
            endTime: "3.12 17:03",
            desc: '把今天家庭作业做了以后，认真订正。'
        },
        voices: [{
            src: '/static/river.mp3'
        }],
        showEidt: false,
        currentWork: 0,
        voiceLength: 0,
        workList: [{
            type: '跟读',
            title: 'unit 2单元',
            timeTake: "4分钟"
        }, {
            type: '跟读',
            title: 'unit 2单元',
            timeTake: "4分钟"
        }, {
            type: '跟读',
            title: 'unit 2单元',
            timeTake: "4分钟"
        }, {
            type: '跟读',
            title: 'unit 2单元',
            timeTake: "4分钟"
        }, {
            type: '跟读',
            title: 'unit 2单元',
            timeTake: '4分钟'
        }],
        queList: [{
            question: 'one',
            score: 'C'
        }, {
            question: 'one',
            score: 'C'
        }, {
            question: 'one',
            score: 'C'
        }, {
            question: 'two',
            score: 'B'
        }, {
            question: 'one',
            score: 'C'
        }, {
            question: 'two',
            score: 'C'
        }, {
            question: 'one',
            score: 'A'
        }, {
            question: 'one',
            score: 'A'
        }, {
            question: 'three',
            score: 'C'
        }]

    },
    showEdit() {
        this.setData({
            showEdit: !this.data.showEdit
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: this.data.workPackageInfo.title
        })

        voice.src = this.data.voices[0].src
        voice.volume = 0
        voice.play()
        voice.onTimeUpdate(() => {
            if (voice.duration != 0) {
                this.setData({
                    voiceLength: Math.floor(voice.duration)
                })
                voice.stop()
                voice.volume = 1
            }
        })
    },
    playVoice() {
        if (voice.paused) {
            voice.play()
            voice.onTimeUpdate(() => {
                this.setData({
                    voiceLength: Math.floor(voice.currentTime)
                })
            })
        } else {
            voice.stop()
            voice.offTimeUpdate()
            this.setData({
                voiceLength: Math.floor(voice.duration)
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})