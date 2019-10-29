<template>
 <div class="box">
    <div class="starApp" v-if='showStar'>
      <span class='close_star_icon iconfont icon-cuohao' @click='onCloseStarTagClick()'></span>
      点击添加到小程序<br>
      下次访问更便捷！
    </div>
    <div class="loading_cover" v-if='rloading'></div>
    <button
      plain="true"
      type="book_primary"
      class="contact-button"
      @longpress="onBookManageButtonLongPress()"
      @click="onKeFuButtonClcik()"
    >联系客服</button>
    <button
        class="child-tag noborder"
        @click="onChildTagClick()"
        v-if="childData">
        <div class='avater-img-box'>
          <img :src="childData.avatarUrl?childData.avatarUrl:'/static/images/defaultavater@2x.png'" alt="" >
        </div>
        <span class='text-overflow-ell name' :style="{fontSize:26+'wx'}">{{childData.name}}</span>
        <img src="/static/images/vip_avater.png" v-if="vipmem > 0 && isvip" class='vip_name_icon' alt="">
    </button>

    <div class="camera_big_box">
      <div class="camera-box absolute-auto">

      </div>
      <div class="camera-box-out absolute-auto">

      </div>
      <div class="camera-box-inner absolute-auto">

      </div>
      <div class="camera-box-inner-in absolute-auto" @click="selectImage(['camera'])">
        <img src="/static/images/camera@3x.png">
        <p class="white-color">整页拍照</p>
      </div>
    </div>

    <div class="explain-box " >
        <span class="explain-text" @click="selectImage(['album'])">从相册中选择
          <img class="youjiantou_box" src="/static/images/youjiantou@2x.png"/>
        </span>
    </div>
    <button
        class="book-button noborder"
        type="book_primary"
        hover-class="primary-hover"
        @click="onBookButtonClick()"
        >
        <img
          src="/static/images/book@3x.png"
          alt=""
        >
        <span class="white-color">错题本</span>
    </button>
    <button
        v-if='!hasBindPhone'
        class="book-button-mask"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumberFun"
      >
    </button>

    <button
      class="video-button container_flex center"
      @click='navigateToInstrutionPage()'
      type="nobgcolor"
    >
      <div class='iconfont icon-shipin primary-color' :style="{fontSize:38+'wx',position:'relative',top:1+'wx'}"></div>
      <span class="primary-color">操作视频</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
      childData: null,
      userData: '',
      pictures: [{areas: [], count: 0, url: '', photoScore: 0, serUrl: '', rotate: '', angle: 0}],
      subselected: null,
      isvip: false,
      vipmem: 0,
      hasBindPhone: true,
      rloading: false,
      appLoading: false,
      WXCODE: '',
      showStar: false
    }
  }
}
</script>

<style lang="postcss">
@import "./common/static/less/base.less";
/* @import "./common/static/less/common.less"; */
.box{
  height: 100%;
}
.loading_cover{
  width:100%;
  height: 100%;
  position: fixed;
  top:0;
  left:0;
  z-index: 99999;
  opacity: 0;
}
.starApp{
  position: fixed;
  top:20wx;
  right:70wx;
  z-index: 999991;
  padding:14wx 25wx;
  padding-right: 50wx;
  background-color: @primarycolor;
  border-radius: 8wx;
  color:#fff;
  line-height: 40wx;
  font-size: 28wx;
  &::before{
    content: '';
    position: absolute;
    top:-18wx;
    right:50wx;
    display: inline-block;
    width:0;
    height:0;
    border-right:20wx solid transparent;
    border-left:20wx solid transparent;
    border-bottom:20wx solid @primarycolor;
  }
  .close_star_icon{
    position: absolute;
    top: 2wx;
    right: -2wx;
    font-size: 28wx;
    width: 40wx;
    height: 40wx;

  }
}

.vip_name_icon{
  width:32wx;
  height: 28wx;
  margin-left: 5wx;
  position: relative;
  top:-2wx;
}
.contact-button {
  width: 148wx;
  height: 60wx;
  line-height: 60wx;
  padding: 0;
  font-size: 26wx;
  border-radius: 0;
  border-top-left-radius: 30wx;
  border-bottom-left-radius: 30wx;
  position: fixed;
  top: 50wx;
  border-right: 0;
  right: 0;
  color: #fff;
  text-align: center;
}
.child-tag{
  height: 60wx;
  line-height: 60wx;
  padding-left: 20wx;
  font-size: 26wx;
  position: fixed;
  top: 50wx;
  border-right: 0;
  left: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  color:@colorlight;
  align-items: center;
  background-color: transparent;
  .name{
    margin-left: 10wx;
    max-width: 140wx;
  }
}
.avater-img-box{
  width:60wx;
  min-width: 60wx;
  height: 60wx;
  border-radius: 50%;
  overflow: hidden;
  image{
    width:100%;
    height: 100%;
  }
}

.book-button,.book-button-mask{
  width: 300wx;
  height: 80wx;
  text-align: center;
  font-size: 26wx;
  border-radius: 40wx;
  position:absolute;
  margin:auto;
  left:0;
  right:0;
  bottom:200wx;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 36wx;
    height: 36wx;
  }
  span{
    font-size: 32wx;
    margin-left: 10wx;
  }
}
.book-button-mask{
  opacity: 0;
}
.video-button {
  position:absolute;
  bottom:40wx;
  display: flex;
  align-items: center;
  margin: auto;
  left:0;
  right: 0;
  width: 265wx;
  span {
    font-size: 30wx;
    margin-left: 10wx;
    position: relative;
    top:2wx;
  }
  img {
    width: 48wx;
    height: 48wx;
  }
}
.explain-box {
  font-size: 28wx;
  position: absolute;
  margin:auto;
  left:0;
  right:0;
  top: 54%;
  text-align: center;
  .explain-text {
    font-size: 30wx;
    color: rgb(141, 150, 159);
    width:112wx;
    padding:15wx;
    position: relative;
  }
  .youjiantou_box{
    width: 26wx;
    height: 26wx;
    position:relative;
    top:2wx;
  }
}

.camera_big_box {
  width: 560wx;
  height: 560wx;
  border-radius: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  margin:auto;
  left:0;
  right: 0;
  top:calc(50% - 430wx);
}

.camera-box {
  width: 360wx;
  height: 360wx;
  background-color: rgb(221, 241, 255);
  border-radius: 100%;
  animation: cameraBoxScaleOpacity 1.5s linear infinite;
  animation-direction: normal;
}
.camera-box-out {
  width: 260wx;
  height: 260wx;
  border-radius: 100%;
  position: absolute;
  z-index: 99;
  animation: cameraBoxOutScaleOpacity 1.5s linear infinite;
}
.camera-box-inner {
  width: 328wx;
  height: 328wx;
  border-radius: 100%;
  background-color: @primarycolor;
  position: absolute;
  z-index: 999;
  animation: cameraBoxInnerScale 3s infinite alternate;
}
.camera-box-inner-in {
  position: absolute;
  z-index: 9999;
  width:328wx;
  height:328wx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.camera-box-inner-in > img {
  width: 144wx;
  height: 144wx;
  animation: cameraBoxInnerImageScale 2s infinite;
  display: block;
  margin:auto;
  margin-top: 70wx;
}
.camera-box-inner-in > p {
  font-size: 28wx;
  text-align: center;
  color: #fff;
  // margin-top: 20wx;
}
.book-form-box{
  width:100%;
  height:100%;
  position: absolute;
  left:0;
  z-index: 9;
  opacity: 0;
}

@media (min-height:720px){
  .book-button{
    bottom:230wx;
  }
}
@keyframes cameraBoxScaleOpacity {
  0% {
    width: 360wx;
    height: 360wx;
    background-color: rgba(221, 241, 255, 0);
  }
  50% {
    background-color: rgba(221, 241, 255, 0.8);
  }
  100% {
    width: 520wx;
    height: 520wx;
    background-color: rgba(221, 241, 255, 0);
  }
}
@keyframes cameraBoxOutScaleOpacity {
  0% {
    width: 280wx;
    height: 280wx;
    background-color: rgba(153, 213, 254, 1);
  }

  100% {
    width: 430wx;
    height: 430wx;
    background-color: rgba(153, 213, 254, 0);
  }

}

@keyframes cameraBoxInnerScale {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.95);
  }
}
@keyframes cameraBoxInnerImageScale {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}
</style>
