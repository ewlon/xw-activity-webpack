import './js/public'
import './css/public.css'
import './css/index.css'
import Vue from 'vue'
import Page from './views/page/Page'
import $ from 'zepto'
    
new Vue({
    el: '#app',
    components: {Page},
    template: '<Page/>',
})

if(module.hot) {
    module.hot.accept();
}
