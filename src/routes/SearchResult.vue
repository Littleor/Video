<template>
  <div>
    <v-header ref="appheader"></v-header>
    <div class="list">
      <div style="text-align: center ;background-color:#fff;margin:30px 0px" v-if="none">
                  <p>没有找到呢,<a href="https://muwall.cn/">点我前往留言催更</a></p>
      </div>
      <div class="video"   @click='play(videoes.id,videoes.name)'  v-if="isOnly">
        <Card :bordered="false" >
          <p slot="title" >{{videoes.name}}</p>
          <Row>
            <Col span="8"><img :src="videoes.pic"></Col>
            <Col span="16">
              <p><b>上映时间</b>:{{videoes.year}}</p>
              <p><b>影片版本</b>:{{videoes.note}}</p>
              <p><b>影片类型</b>:{{videoes.type}}</p>
              <p><b>影片简介</b>:{{videoes.des}}</p>
            </Col>
          </Row>


        </Card>
      </div>
      <div class="video"   @click='play(value.id,value.name)' v-for="value in videoes" v-if="!isOnly" >
      <Card :bordered="false" >
        <p slot="title" >{{value.name}}</p>
        <Row>
          <Col span="8"><img :src="value.pic"></Col>
          <Col span="16">
            <p><b>上映时间</b>:{{value.year}}</p>
            <p><b>影片版本</b>:{{value.note}}</p>
            <p><b>影片类型</b>:{{value.type}}</p>
            <p><b>影片简介</b>:{{value.des}}</p>
          </Col>
        </Row>


      </Card>
      </div>
  </div>
<div class="foot">
      <Page  class-name="page" :total="total" :page-size="20" @on-change="pageChange" size="small" />
  </div>

  </div>
</template>

<script>
  import AppHeader from "../components/AppHeader"
  import AppFooter from "../components/AppFooter"
  const axios = require('axios');
  const x2js = require('x2js');
  const x2jsone= new x2js();

    export default {
        name: "SearchResult",

      components:{
      'v-header': AppHeader,
        'v-foot':AppFooter
      },
      data(){
        return{
          page : 1 ,//当前页数
          pages: 1,//总页数
          total: 1,//数据总数
          videoes:'',
          isOnly:false,//是否是一个数据
          none:false,//是否找不到



        }
      },
      methods:{
        pageChange:function(index) {
          this.$Spin.show();//显示加载中
          this.page=index;
          axios.get('https://sixming.com/apis/zyapi.php',{
            params: {
              ac: 'videolist',
              t: 0,
              pg: this.page,
              wd: this.$route.query.keyword,
            }
          })
            .then( (response)=> {
              //请求成功
              const xml=x2jsone.xml2js(response.data).rss.list;//将数据转化为js对象
              this.pages=xml._page;
              this.total=Number(xml._recordcount);
              this.videoes=xml.video;


              this.$refs.appheader.stopLoading();//停止Header加载图案
              this.$Spin.hide();//停止全局加载
              this.$Message.success('已切换到第'+this.page+'页');
            })
            .catch(function (error) {
              this.$Message.error('请求出错,刷新重试,如仍然出错请反馈');
              console.log(error);
            });


//翻页触发请求数据
        },
        go:function () {

          window.top.location.href ='https://pay.sixming.com/';
          return false;
        },
        play:function (id,name) {

          this.$router.push({
            path: '/play',
            query: {
              id: id,

            }
          })
        }
      }
      ,
      beforeCreate() {
          //渲染前
        document.title = "搜索结果："+ this.$route.query.keyword;

      },
      created() {
          //渲染完成请求数据



        this.$Spin.show();//显示加载中

        axios.get('https://sixming.com/apis/zyapi.php',{
          params: {
            ac: 'videolist',
            t: 0,
            pg: this.page,
            wd: this.$route.query.keyword,
          }
        })
          .then( (response)=> {
            //请求成功
            const xml=x2jsone.xml2js(response.data).rss.list;//将数据转化为js对象
            this.pages=xml._page;
            this.total=Number(xml._recordcount);

            if(this.total===1){
              this.isOnly=true;
              this.none=false;
            }
            else if(this.total===0){

              this.isOnly=false;
              this.none=true;
            }
            else {
              this.isOnly=false;
              this.none=false;
            }
            this.videoes = xml.video;
            this.$refs.appheader.stopLoading();//停止Header加载图案
            this.$Spin.hide();//停止全局加载
            this.$Message.success('检索成功,共找到:'+this.total+'条数据');

          })
          .catch(function (error) {
            this.$Message.error('请求出错,刷新重试,如仍然出错请反馈');
            console.log(error);
          });
      },



    }
</script>

<style scoped>
.page{
  margin: 5px auto;
  text-align: center;

}
.video{
  margin: 6px 5px;
}
  .list{
    width: 100vw;
    background:#eee;
    margin: 5px 0 5px 0;
  }
img{
  width: 25vw;
display: inline-block;
}
  .desc{
    display: inline-block;
   //float: right;


  }
  p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    text-overflow: ellipsis;

  }
  .foot{
    margin: 5px 0;
  }
</style>
