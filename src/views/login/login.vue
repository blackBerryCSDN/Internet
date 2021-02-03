<template>
    <div class="login">
      <div class="logo">
        <img class="img" src="../../assets/logo.png"/>
      </div>
      <div class="form-box">
        <van-form @submit="onSubmit">
          <div class="flex-item">
            <div class="flex-name"><van-icon name="manager" /></div>
            <van-field
              v-model="username"
              name="电话号码"
              label=""
              placeholder="电话号码"
              :rules="[{ required: true, message: '请填写电话号码' }]"
            />
            <div class="flex-eye">
<!--              <van-icon name="eye" @fcous="passwordType = 'text'" />-->
            </div>
          </div>
          <div class="flex-item">
            <div class="flex-name"><van-icon name="lock" /></div>
            <van-field
              v-model="password"
              :type="passwordType"
              name="密码"
              label=""
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="flex-eye">
              <van-icon
                :name="passwordType === 'password' ? 'eye-o': 'eye'"
                @touchstart="passwordShow()"
                @touchend="passwordHide()"
              />
            </div>
          </div>

          <div style="margin-top: 50px;">
            <van-button round block type="info" loading-text="登录中..." :loading="loading"  native-type="submit">
              登 录
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      username: 'admin',
      password: '123456'
    }
  },
  mounted() {
  },
  methods: {
    onSubmit(values) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$router.push({
          path: '/voice'
        })
      }, 500)
    },
    passwordShowHide() {
      this.passwordType === 'password' ? this.passwordType = 'text' : this.passwordType = 'password'
    },
    passwordShow() {
      this.passwordType = 'text'
    },
    passwordHide() {
      this.passwordType = 'password'
    },
  }
}
</script>

<style lang="scss" scoped>
.van-cell::after{
  border-bottom: none;
}

.login{
  height: 100vh;
  background: #fff;
  .logo{
    padding: 150px 0px 40px;
    text-align: center;
    .img{
      width: 160px;
      height: 160px;
      -webkit-box-reflect: below 2px -webkit-linear-gradient(transparent,transparent 70%,rgba(0,0,0,.4));
    }
  }
}
.form-box{
  width: 70%;
  margin: 50px auto;
}

.flex-item{
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
  .flex-name{
    width: 100px;
    font-size: 34px;
    text-align: center;
  }

  .flex-eye{
    width: 100px;
    font-size: 34px;
    text-align: center;
  }
}

</style>
