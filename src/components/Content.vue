<template>
<div style="margin-bottom: 8px;">
  <Card class="card" :padding="0" :dis-hover="true">
    <p slot="title">
      <Icon type="ios-film-outline"></Icon>
     {{ titlename}}
    </p>
    <div class="view" v-for="(data,index) in datas" v-if="index < 6" @click='play(data.id,data.name)'>
      <img v-bind:src="data.pic">
      <p>{{data.name}}</p>
    </div>
  </Card>

</div>
</template>

<script>
  const axios = require('axios');
  const x2js = require('x2js');
  const x2jsone= new x2js();



    export default {
        name: "Content",
      components:{

      },
      data(){
          return{
            datas: '',
          }
      },
      props:['type','titlename'],
        /*
        * 1 电影
        * 2 电视剧
        * 3 综艺
        * 4 动漫
        * 5 动作片 of 1
        * 6 爱情片 of 1
        * 7 科幻片 of 1
        * 8 恐怖片 of 1
        * 9 战争片 of 1
        * 10 喜剧片 of 1
        * 11 纪录片 of 1
        * 12 剧情片 of 1
        * 13 大陆片 of 1
        *
        * */
      methods:{
        play:function (id,name) {

          this.$router.push({
            path: '/play',
            query: {
              id: id,
              name:name,
            }
          })
        }
      },
        created() {
        this.$Spin.show();//显示加载中\

        axios.get('/apis/zyapi.php',{
          params: {
            ac: 'videolist',
            t: this.type,
            pg: 1,

          }
        })
          .then( (response)=> {
            //请求成功

            const xml=x2jsone.xml2js(response.data).rss.list;//将数据转化为js对象
            this.datas=xml.video;



            this.$Spin.hide();//停止全局加载

          })
      }

    }
</script>

<style scoped>

  .card{
    margin: 0 auto;
    width: 96vw;
  }

  .view{
    width: 31vw;
    padding: 2vw 1vw 0vw 1vw;
    display: inline-block;
    margin: 0;
    text-align: center;
  }
  img{
    width: 29vw;

  }
  p{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    text-overflow: ellipsis;

  }
</style>
