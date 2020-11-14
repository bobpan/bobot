const {
    Message,
    FileBox,
    UrlLink,
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
        const fileBox = FileBox.fromUrl('https://7465-test-666666-1257636227.tcb.qcloud.la/jay%20zhou.jpeg?sign=94ead5a2ea2bffe9a75cb91dec259bd0&t=1605359493')
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
