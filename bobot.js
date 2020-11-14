const {
    config,
    Wechaty,
    log,
  }           = require('wechaty')
  
  const { onMessage }      = require('./event/on-message')
  const { onFriendship }   = require('./event/on-friend')
  const { onRoomJoin }     = require('./event/on-room-join')
  
  const welcome = `
  =============== Powered by Wechaty ===============
  -------- https://github.com/Chatie/wechaty --------
  Please wait... I'm trying to login in...
  `
  console.info(welcome)
  
  const bot = Wechaty.instance({ profile: 'bobot' })
  
  bot
    .on('scan', (qrcode, status) => {
      
      const token = process.env.WXCOM_BOT_KEY
      if (!token) {
        log.error('qyapi webhook', `
          需要企业微信机器人的Token发送登入二维码，
          请先维护Secrets：WXCOM_BOT_KEY
        `)
        throw new Error('请先维护Secrets：WXCOM_BOT_KEY')
      }
  
      const qrcodeImageUrl = [
        'https://wechaty.js.org/qrcode/',
        encodeURIComponent(qrcode),
      ].join('')
      
      const axios = require('axios')
      axios
        .post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${token}`, {
              msgtype: "markdown",
              markdown: {
                content: `[登入二维码](${qrcodeImageUrl})`
              }
            })
        .then(res => console.info)
        .catch(error => console.error)
        
      console.info(`${qrcodeImageUrl}\n[${status}] Scan QR Code in above url to login: `)
    })
  
    .on('login', async function (user) {
      log.info('Bot', `${user.name()} logined`)
      await this.say(`wechaty logined`)
    })
  
    .on('logout',     user => {
      log.info('Bot', `${user.name()} logouted`)
      bot.stop()
      process.exit()
    })
    .on('error',      error => log.info('Bot', 'error: %s', error))
  
    .on('message',    onMessage)
    .on('friendship', onFriendship)
    .on('room-join',  onRoomJoin)
  
    .start()
    .catch(e => console.error(e))
