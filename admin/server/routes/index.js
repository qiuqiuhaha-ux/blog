var express = require('express');
var router = express.Router();


/*上传接口*/
router.use("/upload",require('./upload/index'));
//文章管理
router.use("/article",require('./article/index'))
//用户管理
router.use("/user",require('./user/index'))
//留言
router.use("/content",require('./message/index'))
//日记
router.use("/diary",require('./diary/index'))
//留言
router.use("/link",require('./link/index'))
//登录
router.use("/login",require('./login/index'))
module.exports = router;
