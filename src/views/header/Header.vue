<template>
    <header class="header-box">
        <img :src="src" alt="" class="header-img">
        <slot></slot>
    </header>
</template>

<script>
    export default {
        name: "Header",
        props:['className','src']
    }
</script>

<style scoped lang="scss">
    .header-box{
        position: relative;
        .header-img{
            display: block;
            width: 100%;
        }
    }
</style>