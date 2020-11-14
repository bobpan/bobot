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
  
      if (content === 'bpms') {
        await message.say('谢谢你来撩')
  
        const myRoom = await this.Room.find({ topic: 'bpms' })
        if (!myRoom) return
  
        if (await myRoom.has(sender)) {
          await sender.say('不用重复加入，你已经在BPMS微信群里面啦')
          return
        }
  
        await sender.say('已将你拉近BPMS微信群')
        await myRoom.add(sender)
        return
  
      } else if (content === 'bpan1') {
        await sender.say('暗号对接成功')
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
