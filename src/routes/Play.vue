<template>
    <div>
        <v-header></v-header>
        <div class="player">

          <div id="video" name="video" class="video" style="width: 100%;"></div>
        </div>
      <Card :dis-hover="true" class="card">
        <p slot="title">选集</p>
        <Button name="button" class="button" :key="name" v-for="(value,name,index) in video" @click="changeSrc(name,value,index,$event)">{{name}}</Button>
        <div style="text-align: center ;background-color:#fff;margin:30px 0px" v-if="error">
        <p>数据错误没有找到可用播放源,<a href="https://video.muwall.cn/">点我进入极简解析接口</a></p>
      </div>
      </Card>
      <Card :dis-hover="true" class="card" :padding="0">
        <p slot="title">分享</p>
      <div class="share">
      <div data-sites="qzone,qq,wechat,douban,weibo" class="social-share"></div>
    </div>
      </Card>
    </div>
</template>

<script>
  import AppHeader from "../components/AppHeader"
import  PlayMenu from "../components/PlayMenu"
  import AppFooter from "../components/AppFooter"
  const axios = require('axios');


  import 'dplayer/dist/DPlayer.min.css';
  import 'social-share.js/dist/css/share.min.css';

  import DPlayer from 'dplayer';
  import Share from 'social-share.js/dist/js/social-share.min.js';


    export default {
        name: "Play",
        components:{
        'v-menu':PlayMenu,
        'v-header':AppHeader,
        'v-foot':AppFooter,
        },
      data(){
          return{
            video:'',//存储获取到的对象
            src:'',//正在播放的资源地址
            index:0,//正在播放的索引
            select:true,//是否显示选择路径界面
            value:'',//正在播放的链接
            player:'',
            danmuid:'',
            error:false,//判断是否是空的播放源
            name:'',
            description:'',


          }
      },

      beforeCreate() {
        this.$Spin.show();//显示加载中

/*

        if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          this.ispc=false;
        } else {
          this.ispc=true;
        }
*/

        axios.get('https://sixming.com/apis/api.php',{
          params: {
            id:this.$route.query.id,
          }
        })
          .then( (response)=> {
            //请求成功

            if(response.data.url.length===0){
              this.error=true;
            }
            else{
              this.error=false;
            }
            this.description=response.data.description;
            this.name=response.data.name;


                        this.video=response.data.url;//将播放地址储存到video
                        const url =response.data.url;
                        const urlname=Object.getOwnPropertyNames(url)[0]//获取属性名称
                         document.title = "正在播放："+this.name +urlname;
                        this.src=url[Object.keys(url)[0]];




                               this.danmuid='V'+this.$route.query.id+this.index+'V';
                                  const meta =document.getElementsByTagName('meta');
                                   meta["description"].setAttribute('content',"极简影院-正在播放-"+this.name+this.description);
                                 this.$Spin.hide();//停止全局加载

                                const dp = new DPlayer({
                                     container: document.getElementById('video'),
                                     video: {
                                       url: this.src,
                                       type: 'hls',
                                       autoplay: true,
                                       theme:'#ff83a2',
                                       lang:'zh-cn',


                                     },
                                     danmaku: {
                                       id: this.danmuid,
                                       api: 'https://api.muwall.cn/',


                                     },
                                   });
            dp.on('play',  () =>{
              this.$Notice.open({
                title: '提示',
                desc: '请打开手机自动旋屏功能再横立手机才可正常全屏',
                top: 48,
                duration: 3
              });

            });



  this.$Message.success('视频已上膛,请点击下方播放按钮,'+'祝你观影愉快');

          })
          .catch(function (error) {
            this.$Message.error('请求出错,刷新重试,如仍然出错请反馈');
            console.log(error);
          });

      },
      methods:{

        changeSrc:function(name,value,index,e){
          e.currentTarget.classList.add("onclick");

          this.src=value;
          this.index=index;
          this.danmuid='V'+this.$route.query.id+this.index+'V';

          document.title = "正在播放："+this.name +name;
          const dp = new DPlayer({
            container: document.getElementById('video'),
            video: {
              url: this.src,
              type: 'hls',
              autoplay: true,
              theme:'#ff83a2',
              lang:'zh-cn',
            },
            danmaku: {
              id: this.danmuid,
              api: 'https://api.muwall.cn/',

            },
          });
          this.$Message.success('已切换到:'+name+',祝你观影愉快');


          /*  //  console.log(this.src)
              const videoObject = {
                container: '.video',//“#”代表容器的ID，“.”或“”代表容器的class
                variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
                autoplay:true,//自动播放
                video:this.src //视频地址
              };
              const player=new ckplayer(videoObject);

    */

        }
      },
    }
</script>

<style scoped>
  /*.header{
    width: 100vw;
    height: 60px;
    background-color: #ff83a2;
    margin-bottom: 10px;
    text-align: center;

  }*/
  video{
    width: 100%;
  }
  .player{
    width: 90vw;
    margin: 5px auto;
  }
  .card{
    margin: 20px 5px 0px 5px;
  }
  .button{
    margin: 3px;

  }
  .share{

    margin:5px auto;
    text-align: center;
  }
  .onclick{
    background-color: #2b85e4;
    color: white;
  }
  /*h1{
    position: relative;
    color: white;
    line-height: 60px;
    display: inline;
  }
  .menu{
    left:0;
    position: absolute;
  }
  .search{
    top:14px;
    right: 5px;
    position: absolute;
  }*/

</style>
