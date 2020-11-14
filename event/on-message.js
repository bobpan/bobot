const {
    Message,
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
          await sender.say('不用重复加入，你已经在bobot微信群里面啦')
          return
        }
  
        await sender.say('已将你拉进bobot微信群')
        await bobotR.add(sender)
        return
  
      } else if (/^bpan1/i.test(content)) {
        await sender.say('对对对，我就是沃尔玛那枚小小的产品经理')
        return
      } else if (/^音乐/i.test(content)) {
        const fileBox = FileBox.fromUrl('https://7265-release-66-1257636227.tcb.qcloud.la/qrcode/%E5%91%A8%E6%9D%B0%E4%BC%A6%E5%94%B1%E7%9A%84%E4%B8%8D%E8%83%BD%E8%AF%B4%E7%9A%84%E7%A7%98%E5%AF%86.png?sign=ac882ac5c7dfd5a736d411f8c0eecb86&t=1605356008')
        await sender.say(fileBox)
        return
      }
  
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
