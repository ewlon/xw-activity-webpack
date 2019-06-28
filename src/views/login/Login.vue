<template>
    <xw-popup>
        <div class="popup-container">
            <div class="popup-head"><a href="javascript: void (0);" class="popup-close-btn"><img src="/static/popup-close-btn.png" alt=""></a></div>
            <div class="popup-body">
                <div class="popup-content-box">
                    <div class="popup-tst-box">
                        <ul :class="kind === 0 ? 'login-lists':'login-lists1'">
                            <li>
                                <div class="input-box">
                                    <input type="tel" placeholder="请输入手机号" id="phone" maxlength="11" v-model="tel" @blur="checkPhone" @focus="clearError">
                                </div>
                            </li>
                            <li class="get-code">
                                <div class="input-box">
                                    <input type="text" placeholder="请输入验证码" id="yzm">

                                </div>
                                <a href="" class="code-btn" v-time="120">获取验证码</a>
                            </li>
                        </ul>
                        <p v-show="error" class="error">{{error | errorMsg}}</p>
                    </div>
                    <ul class="popup-btn-box flex-box">
                        <li class="flex"><a href="javascript: void (0);" @click="login">登录</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </xw-popup>
</template>

<script>
    import XwPopup from '@/views/popup/Popup'
    import {reqYZM,reqCheckPhone} from '@/api/index'
    var that;
    export default {
        created(){
            that = this;
        },
        name: "Login",
        props:['kind'],
        data(){
            return {
                tel:'',
                error: 0,
            }
        },
        methods:{
            checkPhone(){
                var pattern = /^1(3[4-9]|5[012789]|8[23478]|4[7]|7[8]|9[8])\d{8}$/;
                var tel = this.tel.trim();
                if (isNaN(tel)) {
                    this.error = 1;
                }else{
                    if(tel.length !== 11){
                        this.error = 2;
                    }else if (!pattern.test(tel)) {
                        this.error = 3;
                    } else {
                        this.error = '';
                    }
                }

            },
            clearError(){
                this.error = 0;
            },
            getYZM(tel){
                reqYZM(tel).then()
            },
            login(){

            }
        },
        components:{XwPopup},
        filters:{
            errorMsg(value){
                if(value === 1){
                    return '手机号格式不正确！'
                }else if(value === 2){
                    return '手机号位数不够11位！'
                }else if (value === 3){
                    return '该手机号不是有效的河南移动手机号码！'
                }else if(value === 4){
                    return '验证码不正确'
                }
            }
        },
        directives:{
            time:{
                inserted: function (el,binding) {
                    var interval,handle,time = 0,isclick=true;
                    el.addEventListener('click',function (e) {
                        if(time == 0 && that.error === '' && isclick){
                            isclick = false;
                            var tel = that.tel;
                            reqCheckPhone(tel).then(function (data) {
                                isclick = true;
                                if(data.judgeHn){ // 后台判断是否是河南移动手机号
                                    time = binding.value;
                                    el.innerHTML= time + 's';
                                    var handle = that.getYZM;
                                    handle(tel); // 发送验证码
                                    interval = setInterval(function () {
                                        time--;
                                        if(time>0){
                                            el.innerHTML= time + 's';
                                        }else{
                                            time = 0;
                                            isclick = true;
                                            el.innerHTML = '获取验证码';
                                            clearInterval(interval)
                                        }
                                    },1000)
                                }else{
                                    that.error=3;

                                }

                            },function () {
                                isclick = true;
                            });
                        }
                        e.preventDefault();
                        e.preventDefault();
                    });
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .error{
        color: red;
    }
</style>