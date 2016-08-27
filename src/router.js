export
default (router) => {
	router.map({
		'/': {
			name: '',
			component: function(resolve) {
				require(['./views/topics.vue'], resolve);
			}
		},
		'/list': {
			name: 'list',
			component: function(resolve) {
				require(['./views/topics.vue'], resolve);
			}
		},
		'/topic/:id': {
			name: 'topic',
			component: function(resolve) {
				require(['./views/topic.vue'], resolve);
			}
		},
		'/collect': {
			name: 'collect',
			component: function(resolve) {
				require(['./views/collect.vue'], resolve);
			}
		},
		'/user': {
			name: 'user',
			component: function(resolve) {
				require(['./views/user.vue'], resolve);
			}
		},
		"/message": {
			name: " message",
			component: function(resolve) {
				require(['./views/message.vue'], resolve);
			},
			auth: true
		},
		"/about": {
			name: " about",
			component: function(resolve) {
				require(['./views/about.vue'], resolve);
			}
		},
		"/perinfo/:loginname": {
			name: " perinfo",
			component: function(resolve) {
				require(['./views/perinfo.vue'], resolve);
			}
		},
		"/login": {
			name: " login",
			component: function(resolve) {
				require(['./views/login.vue'], resolve);
			}
		}
	});
}