<template>
  <div class="header">
    <!-- 伸缩按钮 -->
    <div class="nav-icon" :style="{transform: 'rotateZ(' + (state.sidebar.opened ?  '0': '-90') + 'deg)'}" @click="toggleSideBar">
      <Icon type="navicon-round" ></Icon>
    </div>
    <!-- 伸缩按钮 /-->
    <!--是否全屏  -->
    <div class="expand-screen" @click="toggleScreen">
      <Icon type="android-expand" v-if="!screen"></Icon>
      <Icon type="android-contract" v-if="screen"></Icon>
    </div>
    <!--是否全屏  /-->
    <!-- 面包屑 -->
    <!--<div style="float: left;line-height: 50px;">-->
      <!--<Breadcrumb>-->
        <!--&lt;!&ndash;<Breadcrumb-item v-if="$route.meta.prevLevelName">&ndash;&gt;-->
          <!--&lt;!&ndash;&lt;!&ndash;<Icon type="ios-home-outline"></Icon>&ndash;&gt;&ndash;&gt;-->
          <!--&lt;!&ndash;{{$route.query.prevLevelName}}&ndash;&gt;-->
        <!--&lt;!&ndash;</Breadcrumb-item>&ndash;&gt;-->
        <!--<Breadcrumb-item>-->
          <!--{{$route.query.name}}-->
        <!--</Breadcrumb-item>-->
      <!--</Breadcrumb>-->
    <!--</div>-->
    <!-- 消息类按钮 -->
    <div class="msg-group-box">
      <slot name='msg-icon'></slot>
      <slot name='right'></slot>
    </div>
    <!-- 消息类按钮 /-->
  </div>
</template>

<script>
  export default {
    name: 't-header',
    data () {
      return {screen: false};
    },
    computed: {
      state () {
        return this.$store.state.app;
      }
    },
    methods: {
      toggleSideBar () {
        this.$store.dispatch('ToggleSideBar');
      },
      toggleScreen () {
        if (!this.screen) {
          var docElm = document.documentElement;
          if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
          } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
          } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
          } else if (docElm.msRequestFullscreen) {
            docElm.msRequestFullscreen();
          } else {
            this.$Message.error({content: '除了让你升级浏览器对方没什么好说的！', duration: 3});
          }
          this.screen = true;
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          } else {
            this.$Message.error({content: '请升级浏览器，不然我是不会理你的！', duration: 3});
          }
          this.screen = false;
        }
      }
    }
  };
</script>
<style>
  .msg-group-box {
    float: right
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
