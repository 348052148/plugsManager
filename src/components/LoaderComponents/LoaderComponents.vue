<style scoped lang="less">
    .synComponents{
        width:100%;
        height:100%;
        display:inline-block;
    }
</style>
<template>
    <div class="synComponents">
        <component
            :is="mode"
            :socket="socket"
            v-bind="$attrs"
            v-on="$listeners">
        </component>
    </div>
</template>
<script>
    import Loader from '../../libs/loader.js';
    export default {
        props: {
            // 父组件提供请求地址
            url: {
                type: String,
                default: ''
            },
            socket:{
                type:Object,
                default:''
            }
        },
        name:'TaskList',
        data(){
            return {
                mode:''
            };
        },
        watch:{
            url(){
                let loader = new Loader();
                loader.urlLoad(this.url,(text)=>{
                    
                    let Fn = Function;
                    console.log(new Fn(`return ${text}`));
                    this.mode = new Function(`return ${text}`)();
                
                });
            }
        },
        created(){

        },
        mounted(){
            let loader = new Loader();
            loader.urlLoad(this.url,(text)=>{
                
                let Fn = Function;
                console.log(new Fn(`return ${text}`));
                this.mode = new Function(`return ${text}`)();
            
            });
        },
        methods: {
            
        }
    }
</script>
