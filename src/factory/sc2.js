const sc2 = require('sc2-sdk')

const sc = sc2.Initialize({
  baseURL: 'https://v2.steemconnect.com',
  app: 'steemgigs.app',
  callbackURL: 'https://steemgigs.org/complete',
  scope: ['login', 'vote', 'comment', 'comment_delete', 'comment_options', 'custom_json', 'claim_reward_balance']
})
module.exports = sc
