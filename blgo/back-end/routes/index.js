var express = require('express');
var router = express.Router();

/* 文章的接口 */
router.use('/article',require("./article/index") );
router.use('/verification',require("./verification/index"))
router.use('/home',require("./home/index"))
router.use('/login',require("./login/index"))
router.use('/message',require("./message/index"))
router.use('/visitor',require("./visitor/index"))
router.use('/diary',require("./diary/index"))
router.use('/links',require("./links/index"))
module.exports = router;
