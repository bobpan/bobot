const {
    Message,
    FileBox,
    UrlLnik,
    Wechaty,
  }             = require('wechaty')
  
  async function onMessage(message) {
    try {
      const room      = message.room()
      const sender    = message.from()
      const content   = message.text()
  
      console.info((room ? '[' + await room.topic() + ']' : '')
                  + '<' + (sender && sender.name()) + '>'
                  + ':' + message,
      )
  
      //if (message.self() || room) {
      //  console.info('message is sent from myself, or inside a room.')
      //  return
      //}
  
      /********************************************
       *
       * 从下面开始修改vvvvvvvvvvvv
       *
       */
      if (!sender) return
  
      if (/^bobot/i.test(content)){
        await message.say('欢迎你来[鼓掌]')
  
        const bobotR = await this.Room.find({ topic: 'bobot' })
        if (!bobotR) return
  
        if (await bobotR.has(sender)) {
          await sender.say('你已经在bobot微信群里面啦')
          return
        }
  
        await sender.say('已将你拉进bobot微信群啦')
        await bobotR.add(sender)
        return
  
      } else if (/^bpan1/i.test(content)) {
        await sender.say('对对对，我就是沃尔玛那枚小小的产品经理')
        return
      } else if (/^音乐/i.test(content)) {
        const fileBox = FileBox.fromUrl('https://7265-release-66-1257636227.tcb.qcloud.la/qrcode/%E5%91%A8%E6%9D%B0%E4%BC%A6%E5%94%B1%E7%9A%84%E4%B8%8D%E8%83%BD%E8%AF%B4%E7%9A%84%E7%A7%98%E5%AF%86.png?sign=ac882ac5c7dfd5a736d411f8c0eecb86&t=1605356008')
        await sender.say(fileBox)
        return
      } else if (/^link$/i.test(m.text())) {
          const linkPayload = new UrlLnik({
              description : 'Netty',
              thumbnailUrl: 'http://mmbiz.qpic.cn/mmbiz_jpg/48MFTQpxichmmxEoXZ1w7eno72H2MQdx1WC6JiaVdYRmwAp4MCcQbctE2IE7jWqkWOlgMPqMBXVAdR1N46xEibvoQ/640?wx_fmt=jpeg&wxtype=jpeg&wxfrom=0',
              title : 'Netty',
              url : 'http://mp.weixin.qq.com/s?__biz=MzU2MDU3MzE1Mg==&mid=2247484375&idx=1&sn=5ee91b0a8607a1766b5212a23d3c9179&chksm=fc04bc58cb73354e798403bcc03e293149bb115a0755940e334c0fbe33d7c3b0b0797120a213&scene=0&xtrack=1#rd', 
          })
          await msg.say(linkPayload)
      } .start()
  
      /**
       *
       * 到这里结束修改^^^^^^^^^^^^
       *
       */
      /*********************************************/
    } catch (e) {
      console.error(e)
    }
  }
  
  module.exports = {
    default: onMessage,
    onMessage,
  }
