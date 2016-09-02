<template>
	<div class="loginBox">
		<input type="text" v-model="accessTokenInput" placeholder="请输入accessToken">
		<button type="submit" @click="signIn">登录</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			accessTokenInput: ''
		}
	},
	created(){
		this.isShowSidebar = false
	},
	methods: {
		signIn() {
			this.token = this.accessTokenInput.trim()
			if(this.token.length > 0) {
           	 			this.$http.post('http://www.vue-js.com/api/v1/accesstoken/', {accesstoken: this.token}).then((res) => {
		           	 		if(res.data.success) {
		           	 			localStorage.loginname = res.data.loginname
						localStorage.avatar_url = res.data.avatar_url
						localStorage.userId = res.data.id
						localStorage.accesstoken = this.token
						this.isLogin = true
						console.log(res.data)
						var redirect = decodeURIComponent(this.$route.query.redirect || '/')
						this.$route.router.go(redirect)
		           	 		}
				})
           			}
   		}
	}
}
</script>

<style>
	.loginBox{
		margin: -45px 2% 0 2%;
		width: 96%;
		height: 90px;
		position: fixed;
		top: 50%;
		left: 0;
	}
	.loginBox input{
		width: 100%;
		height: 40px;
		padding: 0 10px;
		line-height: 40px;
		font-size: 14px;
		color: #ccc;
		border-radius: 5px;
	}
	.loginBox button{
		font-size: 16px;
		width: 100%;
		height: 36px;
		border: none;
		background-color: #80bd01;
		color: #fff;
		font-weight: bold;
		letter-spacing: 8px;
		border-radius: 5px;
	}
</style>