<template>
  <div id="app">
<div v-if="isad" class="img">
  <Button size="large" icon="ios-close" class="icon" shape="circle" @click="()=>{this.isad=false;}"></Button>
<img src="../assets/720.png"  @click="linkDownload('http://qdt.0808ds.cn/')">
</div>
    <div v-if="!isad">
    <h1>极简影院</h1>
    <p>追求极简,一个搜索框便够了</p>
    <div class="div-input">
      <Input class="input" v-model="value" placeholder="What's your love?"  @on-keyup="key"  clearable/>
      <Button size="large" class="button" shape="circle" icon="ios-search" ghost :loading="loading" @click="toLoading">
        Search
      </Button>
    </div>
    <p class="content">{{content}}</p>
    <p class="footer">Copyright ©<Poptip title="Littleor" content="一位技术热爱者"> <a >Littleor</a></Poptip> and <Poptip title="Rotten Raphael" content="提供本站图标-一位PS大佬"><a>RR</a>
    </Poptip> ALL right reserverd </p>

    <Poptip title="免责声明" word-wrap
            content="本站提供视频播放初衷是作为学习和交流使用，不收取任何费用，请在使用接口24小时之内删除并清空相关缓存数据。 本站不提供任何形式的商业服务，包括但不限于：技术支持，二次开发，源码出售，付费使用。QQ群等交流工具也仅限用户进行技术交流，无任何商业行为。  本站资源库及接口解析出的资源均来自网络，本站及本站所有者及管理员不做任何视频存储工作，所有行为均接口用户自行负责，如有疑问请联系底部邮箱。  经过大量的测试和修复，接口尚未发现重大问题。但限制于个人能力、时间精力等因素，不可避免的会出现各种问题。您出于自愿而使用本影院接口，您必须了解使用风险，本人不提供任何形式的使用担保，也不承担任何的相关责任。  作为使用者，您拥有使用接口的选择权，如需使用本接口你必须独立承担这些内容的法律义务。本站不对使用本接口和使用本接口构建网站的任何信息内容以及导致的任何版权纠纷和法律争议承担责任。     用户使用本接口时，不得用于从事违反中国人民共和国相关法律的活动，本解析接口对于用户擅自使用本API从事违法活动（包括但不限于解析违规视频内容）不承担任何责任，包括但不限于刑事责任、行政责任、民事责任等。     本站为开源项目，旨在学习交流！ 当前版本：V1.3"
            placement="top">
      <a>免责声明</a>
    </Poptip>


    <!--  <v-header></v-header>

      <v-content  type="5" titlename="动作片"></v-content>
      <v-content  type="6" titlename="科幻片"></v-content>
      <v-content  type="13" titlename="电视剧"></v-content>
      <v-content  type="3" titlename="综艺"></v-content>
      <v-content  type="4" titlename="动漫"></v-content>
      <v-foot></v-foot>-->
    </div>

  </div>
</template>

<script>
  /*  import AppFooter from "../components/AppFooter"
    import AppHeader from "../components/AppHeader"
    import Carousels from "../components/Carousels"
    import Content from "../components/Content"*/

  const axios = require('axios');
  export default {
    name: 'Home',
    components: {
      /*  'v-header':AppHeader,
        'v-carousel':Carousels,
        'v-content':Content,
        'v-foot':AppFooter,*/


    },
    data() {
      return {
        value: '',
        loading: false,
        content: '',
        place: '',
        desc: '',
        isad:false,


      }
    },
    methods: {
      key:function(){


        if(event.keyCode == 13){
          this.toLoading();
        }

      },
      toLoading: function () {


        this.loading = true;
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.value,
            loading: true,

          }
        })
      },
      linkDownload :function(url) {
        mui.plusReady(function(){
          plus.runtime.openURL(url);

        });


       // plus.runtime.openURL( url,'','');
      }

    },
    beforeCreate() {

    //  this.$Spin.show();//显示加载中
    }
    ,
    created() {

      const jinrishici = require('jinrishici');
      jinrishici.load(result => {
        this.content = result.data.content;

      }, errData => {
        console.log(err);
      });
      axios.get('https://sixming.com/apis/tips.php', {
        params: {
          version:1.3,
          type:'app',
        }
      })
        .then((response) => {
          this.desc = response.data.desc;
          this.isad=response.data.ad;
          this.value=response.data.value;
        })
        .catch((error)=> {
          this.$Message.error('请求出错,刷新重试,如仍然出错请反馈');
          console.log(error);
        });

      axios.get('https://sixming.com/apis/ip.php', {
        params: {}
      })
        .then((response) => {
          this.place = response.data;
          this.$Spin.hide();//停止全局加载
        })
        .catch((error)=> {
          this.$Message.error('请求出错,刷新重试,如仍然出错请反馈');
          console.log(error);
        });




    },
    mounted:function () {
      this.$nextTick(()=> {
        setTimeout(()=>{this.isad=false;
        this.$Message.info("来自" + this.place + '的小伙伴,' + '欢迎来到极简影院!');
        this.$Notice.open({
          title: '公告',
          desc: this.desc,
          top: 60,
          duration: 6
        });},800);
      })
    }

  }
</script>

<style scoped>
  * {
    padding: 0px;
  }

  #app {
    width: 100vw;
    height: 100vh;
    background-color: #ff83a2;
    text-align: center;
  }

  h1 {
    padding-top: 5vh;
    color: white;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  p {
    padding-top: 1vh;
    color: white;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .div-input {
    text-align: center;
    margin: 20vh 5vw 0 5vw;
  }

  input::-ms-input-placeholder {
    text-align: center;
  }

  input::-webkit-input-placeholder {
    text-align: center;
  }

  .button {
    margin-top: 5vh;
    width: 30vw;
    height: 9vw;
  }

  .footer {

    font-weight: bold;
    padding-top: 3vh;
  }

  .content {
    padding-top: 38vh;
  }

  a {
    padding-top: 3px;
  }
  .img{
    height: 100vh;
    width: 100vw;
    ilter:"progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";

  }
  img{
    height: 100%;
    width: 100%;
  }
  .icon{
    position: absolute;
    top:2vh;
    right: 3vw;

  }

</style>
<style>
  input::-ms-input-placeholder {
    text-align: center;
  }

  input::-webkit-input-placeholder {
    text-align: center;
  }

  h1 {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  p {

    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

</style>
