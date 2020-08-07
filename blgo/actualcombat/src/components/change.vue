<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="http://121.40.239.63:80/upload/artivle"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <span id="text">改变头像</span>
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
      return {
        imageUrl: ''
      };
    },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isType = /^(image\/jpeg|image\/png|image\/gif)$/.test(file.type);
        const isLt50K = file.size / 1024 < 50;

        if (!isType) {
          this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!');
        }
        if (!isLt50K) {
          this.$message.error('上传头像图片大小不能超过 50K !');
        }
        return isType && isLt50K;
      },

      beforeClose(){
        this.$emit("handleClose");
      }
  }
}
</script>
<style lang="less" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  #text{
    margin-right: 78px;
  }
</style>