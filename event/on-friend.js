const {
    Friendship,
    Wechaty,
    // Room,
  }                 = require('wechaty')
  
  async function onFriendship (
    request,
  ) {
    try {
      const contact = request.contact()
  
      if (request.type() === Friendship.Type.Confirm) {
        console.info('New friend ' + contact.name() + ' relationship confirmed!')
        return
      }
  
      /********************************************
       *
       * 从这里开始修改 vvvvvvvvvvvv
       *
       */
      await request.accept()
  
      setTimeout(
        async _ => {
          await contact.say('thank you for adding me')
        },
        3000,
      )
  
      if (request.hello() === 'bobot') {
        const myRoom = await this.Room.find({ topic: 'bobot' })
        if (!myRoom) return
        setTimeout(
          async _ => {
            await myRoom.add(contact)
            await myRoom.say('welcome ' + contact.name())
          },
          3000,
        )
      }
  
      /**
       *
       * 到这里结束修改 ^^^^^^^^^^^^
       *
       */
      /*******************************************/
    } catch (e) {
      console.info(e)
    }
  }
  
  module.exports = {
    default: onFriendship,
    onFriendship,
  }
