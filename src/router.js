export
default (router) => {
	router.map({
		'/': { // 首页
			name: '',
			component: function(resolve) {
				require(['./views/topics.vue'], resolve);
			}
		},
		'/list': { // 首页
			name: 'list',
			component: function(resolve) {
				require(['./views/topics.vue'], resolve);
			}
		},
		'/topic/:id': { // 主题详细页
			name: 'topic',
			component: function(resolve) {
				require(['./views/topic.vue'], resolve);
			}
		},
		'/collect': { // 收藏
			name: 'collect',
			component: function(resolve) {
				require(['./views/collect.vue'], resolve);
			}
		},
		"/message": { // 消息
			name: " message",
			component: function(resolve) {
				require(['./views/message.vue'], resolve);
			},
			auth: true
		},
		"/about": { // 关于
			name: " about",
			component: function(resolve) {
				require(['./views/about.vue'], resolve);
			}
		},
		"/perinfo/:loginname": { // 个人信息
			name: " perinfo",
			component: function(resolve) {
				require(['./views/perinfo.vue'], resolve);
			}
		},
		"/login": { // 登录
			name: " login",
			component: function(resolve) {
				require(['./views/login.vue'], resolve);
			}
		},
		"/new": { // 发帖
			name: " new",
			component: function(resolve) {
				require(['./views/new.vue'], resolve);
			},
			auth: true
		}
	});
}