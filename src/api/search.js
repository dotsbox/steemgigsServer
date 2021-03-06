const router = require('express').Router()
const Post = require('../model/post')
// const SteemPost = require('../model/steemData/Post')
const {stringify, handleErr} = require('../utils')

router.post('/search/:limit?', (req, res) => {
  let {query} = req.body
  let limit = req.params.limit || 50
  if (query) {
    console.log('query:', stringify(query))
    let {searchText} = query
    console.log(searchText, Boolean(searchText))
    if (searchText.trim().length === 0 || searchText.trim() === '.' || searchText.trim().toLowerCase() === 'steemgigs') {
      Post.find({type: 'steemgigs_post'}).select('').limit(limit).exec((err, result) => {
        if (!err) {
          console.log(JSON.stringify(result, null, 2))
          res.status(200).send(result)
        } else {
          handleErr(err, res, 'empty result')
        }
      })
    } else if (searchText.trim().length > 0) {
      Post.find({type: 'steemgigs_post', $text: {$search: searchText.trim()}}, { score: {$meta: 'textScore'} }).select('').limit(limit).exec((err, result) => {
        if (!err) {
          console.log(JSON.stringify(result, null, 2))
          res.status(200).send(result)
        } else {
          handleErr(err, res, 'empty result')
        }
      })
    } else {
      res.status(400).send('please supply a proper query')
    }
  } else {
    res.status(400).send('please supply a proper query')
  }
})
router.post('/checktitle', (req, res) => {
  let {username, title} = req.body
  Post.findOne({author: username, title}).then((response) => {
    res.send(response)
  }).catch((e) => {
    handleErr(e, res, 'empty result')
  })
})

module.exports = router
