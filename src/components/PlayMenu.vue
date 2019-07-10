<template>
  <div>
  <Menu mode="horizontal" active-name="1" width="auto" @on-select="route">

    <Row style="width: 100vw;padding: 0;margin: 0;">


      <Col span="12">
        <MenuItem name="1">
      <Icon type="ios-play" />
      播放
    </MenuItem>
      </Col>

      <Col span="12">
    <MenuItem name="2">
      <Icon type="ios-paper" />
      详情
    </MenuItem>
      </Col>

<!--      </router-link>-->
    </Row>

  </Menu>

  </div>
</template>

<script>

    export default {
        name: "PlayMenu",
      methods:{
        route:function (data) {
        var path="";
        var name="";
            switch(data) {
              case "1":
                path="/play/playpath";
                name="pathLink";
                break;
              case "2":
                path="/play/detail";
                name="detailLink";
                break;

        }
          this.$router.push({
            path: path,
            name: name,
          })

          }
      },

    }
</script>

<style scoped>

</style>
