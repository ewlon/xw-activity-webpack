<template>
    <div class="page">
        <xw-header :src="headSrc"></xw-header>
        <!--<xw-popup></xw-popup>-->

        <xw-login v-if="!isLogin" :kind="0"></xw-login>
    </div>
</template>
<script>
    import XwHeader from '@/views/header/Header'
    import XwLogin from '@/views/login/Login'
    export default {
        components:{XwLogin,XwHeader},
        data(){
            return {
                headSrc : '/static/images/header-img.png',
                isLogin: false,
            }
        }
    }
</script>
<style scoped lang="scss">

</style>
