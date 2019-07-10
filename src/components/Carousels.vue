<template>

    <Carousel class="Carousel"  v-model="value"  dots="none"	:autoplay-speed="3000" arrow="always" autoplay loop>
    <CarouselItem>
      <div class="demo-carousel">复仇者联盟4</div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"></div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"></div>
    </CarouselItem>
    <CarouselItem>
      <div class="demo-carousel"></div>
    </CarouselItem>
  </Carousel>

</template>

<script>
    export default {
        name: "Carousels",
      data () {
        return {
          value : 0
        }
      }
    }
</script>

<style scoped>
.Carousel{
  width: 80vw;
  height: 53vw;
  position: relative;
  margin: 10px auto 0 auto;

//position: relative;

}
.demo-carousel
{

  position: relative;
  width: 80vw;
  height: 53vw;
  background: url("http://puui.qpic.cn/tv/0/54447017_1680580/0") ;
  /*max-width: 100%;*/
  /*max-height: 100%;*/
  background-size: 100%;
  background-repeat:no-repeat;
}
</style>
