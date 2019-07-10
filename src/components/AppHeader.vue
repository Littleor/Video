<template>
    <div class="header">
      <div class="top">
        <h1 class="" >极简影院</h1>
        <Icon v-show="!show" size="30" color="white" class="search" type="ios-search" @click="showSearch" />
      </div>
      <div class="div-input" v-show="show">
        <Input class="input" v-model="value" placeholder="Seacher" @on-keyup="key"  />
        <Button  class="button" shape="circle" icon="ios-search" ghost :loading="loading" @click="toLoading">Search</Button>
      </div>
    </div>
</template>

<script>




  const axios = require('axios');
  const x2js = require('x2js');
  const x2jsone= new x2js();



      export default {
        name: "AppHeader",
        data () {
          return {
            value: '',
            loading:false,
            show:false,
            page:1,



          }
        },
      props: {
         /* show: {
            type:Boolean,
            default:true
          }*/
      }
      ,
        methods:{
          key:function(){


            if(event.keyCode == 13){
              this.toLoading();
            }

          },
          toLoading:function () {
            if(this.$route.name==="searchLink"){
              this.$Spin.show();//显示加载中
              this.page=1;
              this.$router.push({
                path: '/search',
                query: {
                  keyword: this.value,
                  loading: true,
                }
              })
              axios.get('https://sixming.com/apis/zyapi.php',{
                params: {
                  ac: 'videolist',
                  t: 0,
                  pg: this.page,
                  wd: this.value,
                }
              })
                .then( (response)=> {
                  //请求成功

                  const xml=x2jsone.xml2js(response.data).rss.list;//将数据转化为js对象
                  this.$parent.pages=xml._page;
                  this.$parent.total=Number(xml._recordcount);
                  this.$parent.videoes=xml.video;

                  if(this.$parent.total===1){
                    this.$parent.isOnly=true;
                    this.$parent.none=false;
                  }
                  else if(this.$parent.total===0){
                    this.$parent.none=true;
                    this.$parent.isOnly=false;
                  }
                  else {
                    this.$parent.isOnly=false;
                    this.$parent.none=false;
                  }

                  this.stopLoading();//停止Header加载图案
                  this.$Spin.hide();//停止全局加载

                  this.$Message.success('检索成功,共找到:'+this.$parent.total+'条数据');

                  //      console.log(xml);
                })
                .catch(function (error) {
                  this.$Message.error('请求出错,刷新重试,如仍然出错请反馈');
                  console.log(error);
                });

            }
            else {
              this.loading = true;
              this.$router.push({
                path: '/search',
                query: {
                  keyword: this.value,
                  loading: true,
                }
              })
            }
          },
        stopLoading:function () {
          this.loading=false;
        }
        ,
          showSearch:function () {
            if(this.show){
              this.show=false;
            }
            else{
              this.show=true;
            }
          }
        },
        created() {
          if(this.$route.query.keyword){
            //获取搜索关键字
            this.value=this.$route.query.keyword;
          }
          else{
          }
          if(this.$route.query.loading){
            //判断是否是搜索界面加载中
            this.show=true;
            this.loading=true;
          }
          else{
            this.show=false;
            this.loading=false;
          }
        }
      }
</script>

<style scoped>
  h1{
    position: relative;
    color: white;
    line-height: 60px;
    display: inline;
  }
.header{
  width: 100vw;
  background-color: #ff83a2;

}
.top{
  height: 60px;
  width: 100vw;
  text-align: center;
  margin: 0;

}
  .div-input{
  width: 100vw;
    padding-bottom: 8px;
}
  .input{
    width:80vw;
    left:50%;
    margin-left: -40vw;
    display: block;
  }
  .button{
    display: block;
    margin: 13px auto;


  }
  .search{
    top:14px;
    right: 8px;
    position: absolute;
  }
</style>
