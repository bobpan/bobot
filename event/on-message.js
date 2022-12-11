 const { getChatGPTReply } = require('../chatGPT.js')
 const {
    Message,
    FileBox,
    Wechaty,
  } = require('wechaty')
  
  async function onMessage(message) {
    try {
      const room      = message.room()
      const sender    = message.from()
      const content   = message.text()
  
      console.info((room ? '[' + await room.topic() + ']' : '')
                  + '<' + (sender && sender.name()) + '>'
                  + ':' + message,
      )
        
      if (message.self()) {
        if (/^exit/i.test(content)) {
          await sender.say('请求退出')
          process.exit()
        } else return
      } else {
        if (!sender) return
        // message is inside a room.
        if (room ) return
        // Message discarded because its TOO OLD(than 1 minute)
        if (message.age() > 60) return
        // 非Message#Text类型
        if(message.type() != this.Message.Type.Text) return
        /********************************************
         *
         * 默认加群动作
         *
         */

        await message.say('查找微信群：' + content)
        const bobotR = await this.Room.find({ topic: new RegExp(content, 'i') })
        console.log(content,bobotR)
        if (bobotR){
          const topic = await bobotR.topic()
          console.log(topic)
          await message.say('找到微信群：' + topic)
          if (await bobotR.has(sender)) {
            await sender.say('你已经在群里面啦')
          } else {
            await bobotR.add(sender)
            await sender.say('已拉您进群：' + topic)
          }
          return
        } else {
          if (/^bpan1/i.test(content)) {
            await sender.say('对对对，我就是沃尔玛那枚小小的产品经理')
            return
          } else if (/^chatgpt/i.test(content)) {
              console.log('🚀🚀🚀 / content', content)
              const reply = await getChatGPTReply(content)
              console.log('🚀🚀🚀 / reply', reply)
              await sender.say(reply)
            return
          } else if (/^(音乐|乐曲多|我要谢谢你)/i.test(content)) {
            const fileBox = FileBox.fromUrl('https://7465-test-666666-1257636227.tcb.qcloud.la/jay%20zhou.jpeg?sign=94ead5a2ea2bffe9a75cb91dec259bd0&t=1605359493')
            await sender.say(fileBox)
            return
          } else await sender.say('没有找到这个群，如果是您的群希望被人搜到，拉我进群就可以啦')
        } 
        
        /**
         *
         * 加群结束
         *
         */
        /*********************************************/
      }
    } catch (e) {
      console.error(e)
    }
  }
  
  module.exports = {
    default: onMessage,
    onMessage,
  }
