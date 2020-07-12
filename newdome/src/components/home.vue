<template>
  <section class="homeClass">
    <el-row class="header">
      <el-col :offset="12" :span="12" class="headerRight pr20px">
        <span>欢迎{{userName}}</span>
        <el-button type="text" class="escBtn" @click="goLogin()">退出</el-button>
      </el-col>
    </el-row>
    <el-row class="tac">
      <el-col :span="4" class="backLeft">
        <aside>
          <div v-for="(item, index) in leftList" @click="changeLeftName(item.name)" :key="index">
            <router-link
              class="leftLi"
              :class="leftName == item.name ? 'actionClass': ''"
              :to="{name: item.name}"
            >{{item.value}}</router-link>
          </div>
        </aside>
      </el-col>
      <el-col :span="20" class="ovouto scrollbar">
        <section class="pl20px">
          <router-view />
        </section>
      </el-col>
    </el-row>
  </section>
</template>
<script>
export default {
  data() {
    return {
      leftName: "",
      leftList: this.$route.params.userRouter,
      userName: sessionStorage.getItem("userName")
    };
  },
  mounted() {
    console.log(this.$route.params)
    document.onkeydown = function() {
      if (window.event && window.event.keyCode == 123) {
        event.keyCode = 0;
        event.returnValue = false;
        return false;
      }
    };
  },
  methods: {
    changeLeftName(name) {
      console.log(name);
      this.leftName = name;
    },
    goLogin(){
      this.$router.replace({
          name: "login"
        });
    }
  }
};
</script>
<style lang="scss">
.homeClass {
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
}
.header {
  background-image: linear-gradient(#90d7ec, #90d7ec);
  border-bottom: 1px solid #a1c5d1;
}
.tac {
  height: 100%;
}
.actionClass {
  background-image: linear-gradient(#62c7e6, #62c7e6);
  cursor: pointer;
  color: #636363 !important;
}
.backLeft {
  background-image: linear-gradient(#90d7ec, #90d7ec);
  height: 100%;
  .leftLi {
    display: block;
    text-decoration: none;
    color: white;
    padding: 5px 0;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    cursor: pointer;
    &:hover {
      background-image: linear-gradient(#b7e0ec, #b7e0ec);
      cursor: pointer;
      color: rgb(184, 184, 184);
    }
  }
  .nobg {
    background: rgba(0, 0, 0, 0) !important;
    border: 0 !important;
    .el-submenu__title {
      &:hover {
        background-color: #94dff0 !important;
      }
    }
    .el-menu-item {
      &:focus {
        background-color: #94dff0 !important;
      }
      &:hover {
        background-color: #94dff0 !important;
      }
    }
    ul {
      background-color: rgba(0, 0, 0, 0) !important;
    }
  }
}
.ovouto {
  height: 92vh;
  overflow: auto;
  section{
    height: 100%;
  }
}
.headerRight {
  height: 100%;
  line-height: 60px;
  text-align: right;
}
.escBtn {
  width: 100px;
  color: white;
  font-size: 26px;
  &:hover {
    color: #1f1f1f;
  }
}
</style>