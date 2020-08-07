<template>
  <div>
    <textarea  id="demo" style="display: none;"></textarea>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        layedit : null,
        index : 0
      }
    },
    computed: {
      content(){
        return this.layedit.getContent(this.index)
      }
    },
    mounted() {
      layui.use('layedit', ()=>{
        this.layedit = layui.layedit;
        this.index = this.layedit.build('demo',{
          
        }); //建立编辑器
      });
    }
  }
</script>
<style lang="less" scoped>

</style>