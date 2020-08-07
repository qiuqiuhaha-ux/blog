<template>
    <div class="Blog">
        <Nav></Nav>
        <Container></Container>
    </div>
</template>
<script>
    import Nav from "../../components/Nav.vue"
    import Container from "../../components/Container"
    export default {
        name:"Blog",
        components:{
            Nav,Container
        }
    }
</script>
<style lang="less" scoped>
.Blog{
    box-sizing: border-box;
    width: 100%;
    max-width: 1360px;
    padding: 20px 20px;
}
</style>