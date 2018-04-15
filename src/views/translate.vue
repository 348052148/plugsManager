<style scoped lang="less">
    .translate{
        width: 100%;
        flex-direction: row;
    }
    .translate .ivu-layout{
        height:100%;
    }
</style>
<template>
    <div class="translate">

            
                 <Tabs @on-click="func" >
                    <TabPane label="中-英" :key="1" icon="social-apple">
                        翻译前
                         <Input @on-change="translate" v-model="query"  type="textarea"  :style="{resize:'none'}" :rows="8" autofocus placeholder="中文"></Input>
                         翻译后
                          <Input v-model="disquery" :readonly="true" :style="{resize:'none'}" type="textarea" :rows="8" placeholder="翻译"></Input>
                    </TabPane>
                    <TabPane label="英-中" :key="2" icon="social-windows">
                        翻译前
                         <Input @on-change="translate_en" v-model="enquery"  type="textarea"  :style="{resize:'none'}" :rows="8" autofocus placeholder="英文"></Input>
                         翻译后
                          <Input  v-model="endisquery" :readonly="true" :style="{resize:'none'}" type="textarea" :rows="8" placeholder="翻译"></Input>
                    </TabPane>
                    <TabPane label="翻译设置" icon="gear-a">
                        <Form ref="formValidate" :label-width="80">
                            <FormItem label="是否检查" >
                               <Switch size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </Switch>
                            </FormItem>
                            <FormItem label="翻译接口" prop="mail">
                                <Input  placeholder="Enter your e-mail"></Input>
                            </FormItem>
                            <FormItem label="翻译参数" prop="city">
                                <Select  placeholder="Select your city">
                                    <Option value="beijing">New York</Option>
                                    <Option value="shanghai">London</Option>
                                    <Option value="shenzhen">Sydney</Option>
                                </Select>
                            </FormItem>
                    
                            <FormItem>
                                <Button type="primary" >保存设置</Button>
                            </FormItem>
                        </Form>
                    </TabPane>
                </Tabs>
    </div>
</template>
<script>
    import util from '../libs/util.js';
    export default {
        data(){
            return {
                query:'',
                disquery:'',
                enquery:'',
                endisquery:'',
                way:1
            };
        },
        methods: {
            func(key){
                this.way == key;
            },
            translate(){
                var $ = require('jquery');
                 var appid = '20171122000098654';
                var key = 'l8BptNrr5nbPF3VsYDKi';
                var salt = (new Date).getTime();
                var query = this.query;
                // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
                var from = 'zh';
                var to = 'en';
                
                var str1 = appid + query + salt +key;
                var sign = util.MD5(str1);
                $.ajax({
                    url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        q: query,
                        appid: appid,
                        salt: salt,
                        from: from,
                        to: to,
                        sign: sign
                    },
                    success: (data) => {
                        console.log(data);
                       if(!data.error_code){
                            if(data.trans_result)
                            this.disquery = data.trans_result[0].dst;
                        }
                    }
                });
            },
            translate_en(){
                var $ = require('jquery');
                 var appid = '20171122000098654';
                var key = 'l8BptNrr5nbPF3VsYDKi';
                var salt = (new Date).getTime();
                var query = this.enquery;
                // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
                var from = 'en';
                var to = 'zh';
                
                var str1 = appid + query + salt +key;
                var sign = util.MD5(str1);
                $.ajax({
                    url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        q: query,
                        appid: appid,
                        salt: salt,
                        from: from,
                        to: to,
                        sign: sign
                    },
                    success: (data) => {
                        console.log(data);
                       if(!data.error_code){
                            if(data.trans_result)
                            this.endisquery = data.trans_result[0].dst;
                        }
                    }
                });
            }
        }
    }
</script>
