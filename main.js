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
  `
  console.info(welcome)
  
  const token = process.env.WXCOM_BOT_KEY
  const keepLogin = process.env.keepLogin||false
  const bot = Wechaty.instance({ name: process.env.profile||'bobot' })
  
  bot
    .on('scan', (qrcode, status) => {

      const qrcodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${qrcode}`

      if (!token) {
        log.error('bobot ｜', `
          如需要推送登入二维码到企业微信，请先配置企业微信机器人的Token，
          Github Action执行可以维护Secrets：WXCOM_BOT_KEY
        `)
      } else {
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
      }

      if(status===4 && keepLogin) {
          log.info('bobot ｜', `Keeped login session via scan the QR code`)
      } else console.info(`${qrcodeImageUrl}\n[${status}] Scan QR Code in above url to login: `)
    })
  
    .on('login', async function (user) {
      log.info('bobot ｜', `${user.name()} logined, send "exit" to exit bobot`)
      await this.say(`logined`)
    })
  
    .on('logout',     user =>  log.info('bobot ｜', `${user.name()} logouted`))
    .on('error',      error => log.info('bobot ｜', 'error: %s', error))
    .on('message',    onMessage)
    .on('friendship', onFriendship)
    .on('room-join',  onRoomJoin)
  
    .start()
    .catch(e => console.error(e))
