<style scoped lang="less">
    .index{
        width: 100%;
        flex-direction: row;
    }
    .index .ivu-layout{
        height:100%;
    }
    .demo-carousel{
        height: 200px;
        line-height: 200px;
        width:100%;
        text-align: center;
        color: #fff;
        font-size: 20px;
        background: #506b9e;
    }
</style>
<template>
    <div class="index">
        <Carousel autoplay v-model="value2" loop>
                    <CarouselItem>
                        <div class="demo-carousel">
                            <img :style="{width:'100%'}" height="200" src="http://img.zcool.cn/community/010a1b554c01d1000001bf72a68b37.jpg@1280w_1l_2o_100sh.png">1</img>
                        </div>
                    </CarouselItem>
                    <CarouselItem>
                        <div class="demo-carousel">
                            <img :style="{width:'100%'}" height="200" src="http://img.zcool.cn/community/010a1b554c01d1000001bf72a68b37.jpg@1280w_1l_2o_100sh.png">2</img>
                        </div>
                    </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                value2:0
            };
        },
        methods: {

        }
    }
</script>
