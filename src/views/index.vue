<style scoped lang="less">
    *{
        list-style:none;
    }
    a{
        color:#000;
    }
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
    .plugs{
        width:100%;
        height:100px;
        background:#fff;
        display:inline-block;
         text-align:center;
         padding-top:20px;
    }
    .plugs ul li{
        width:60px;
        height:65px;
        display:inline-block;
        text-align:center;
        margin-left:10px;
        border:1px solid #fff;
    }
    .plugs ul li:hover{
        cursor:pointer;
        color:#FFB90F;
        border:1px solid #FFB90F;
    }
    .plugs ul li .icon{
        width:100%;
        height:45px;
        text-align:center;
    }
    .plugs ul li span{
        width:100%;
        display:inline-block;
        font-size:10px;
        color:#666;
    }
    .notify{
         width:100%;
        background:#fff;
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
        <div class="plugs">
            <ul>
                <router-link :to="{path:'/brow',params:{func:'TaskList'}}">
                <li><Icon size="40" class="icon" type="aperture"></Icon><span>图形</span></li>
                </router-link>
                <li><Icon size="40" class="icon" type="coffee"></Icon></Icon><span>coffie</span></li>
                <li><Icon size="40" class="icon" type="contrast"></Icon></Icon><span>半球</span></li>
                <li><Icon size="40" class="icon" type="ipod"></Icon></Icon><span>触摸</span></li>
                <li><Icon size="40" class="icon" type="network"></Icon></Icon><span>链接</span></li>
                <li><Icon size="40" class="icon" type="music-note"></Icon></Icon><span>音乐</span></li>
                <li><Icon size="40" class="icon" type="happy-outline"></Icon><span>表情</span></li>
            </ul>
        </div>
        <div class="notify">
            <Card style="width:300px;display:inline-block;width:49%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    今日任务
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    切换
                </a>
                <ul>
                    <li >
                        完成文档编写
                    </li>
                </ul>
            </Card>

            <Card style="width:300px;display:inline-block;width:49%;">
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    今日任务
                </p>
                <a href="#" slot="extra" @click.prevent="changeLimit">
                    <Icon type="ios-loop-strong"></Icon>
                    切换
                </a>
                <ul>
                    <li >
                        完成文档编写
                    </li>
                </ul>
            </Card>
        </div>
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
