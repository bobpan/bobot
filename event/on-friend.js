  import { Friendship, Wechaty } from "wechaty";
   // Friendship, Wechaty, Room

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
          await contact.say('你好，' + contact.name() + '，我可以提供微信群搜索服务，输入关键字并可快速查找和加群，快试试吧（例：bobot）')
          await contact.say('如果您也有群希望被人搜到，只需要拉我进群就行啦')
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
