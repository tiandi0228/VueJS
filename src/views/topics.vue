<style>
.topic-list ul {
    padding: 20px 0;
}

.topic-list li {
    padding: 10px 8px;
    overflow: hidden;
    background-color: #fff;
    border-bottom: 3px solid #e1e1e1;
    font-size: 14px;
}

.topic-list .userPanel {
    width: 82%;
}

.topic-list h3 {
    width: 100%;
    margin-bottom: 7px;
    font-size: 16px;
    font-weight: normal;
    overflow: hidden;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.topic-list .tab {
    border-radius: 4px;
    padding: 0px 6px;
    color: #fff;
    font-size: 12px;
    margin-right: 6px;
}

.topic-list .good .tab {
    background-color: #5bb12f;
}

.topic-list .weex .tab {
    background-color: #ff5003;
}

.topic-list .share .tab {
    background-color: #1abc9c;
}

.topic-list .ask .tab {
    background-color: #3498db;
}

.topic-list .top .tab {
    background-color: #e74c3c;
}

.topic-list .job .tab {
    background-color: #9b59b6;
}

.topic-list p {
    margin-bottom: 0;
}

.topic-list .reply-count {
    background: #42b983;
    padding: 0px 8px;
    border-radius: 40%;
    color: #fff;
    display: block;
}

.topic-list img {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    margin-right: 6px;
}

.loadingbox {
    margin: auto;
    width: 50px;
    height: 20px;
    text-align: center;
    font-size: 10px;
}

.loadingbox>div {
    background-color: #67CF22;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: stretchdelay 1.2s infinite ease-in-out;
    animation: stretchdelay 1.2s infinite ease-in-out;
}

.loadingbox .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
}

.loadingbox .rect3 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
}

.loadingbox .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
}

.loadingbox .rect5 {
    -webkit-animation-delay: -0.8s;
    animation-delay: -0.8s;
}

@-webkit-keyframes stretchdelay {
    0%,
    40%,
    100% {
        -webkit-transform: scaleY(0.4)
    }
    20% {
        -webkit-transform: scaleY(1.0)
    }
}

@keyframes stretchdelay {
    0%,
    40%,
    100% {
        transform: scaleY(0.4);
        -webkit-transform: scaleY(0.4);
    }
    20% {
        transform: scaleY(1.0);
        -webkit-transform: scaleY(1.0);
    }
}
</style>

<template>
<div class="topic-list">
    <ul>
        <li :class="topic.top ? 'top' : (topic.tab || 'unknow')" v-for="topic in topics">
            <img class="pull-left" :src="topic.author.avatar_url" v-link="{path: '/user/' + topic.author.loginname}">
            <div class="pull-left userPanel">
                <div style="overflow:hidden;">
                    <h3 class="tit pull-left" style="width:70%;" v-link="{path: '/topic/' + topic.id}">
                        {{topic.title}}
                    </h3>
                    <p class="reply-count pull-right">{{topic.reply_count}}</p>
                </div>
                <span class="tab pull-left">{{tabName(topic)}}</span>
                <span class="pull-left" style="padding-right:5px;color:#ccc;">By •</span>
                <span class="one pull-left" v-link="{path: '/user/' + topic.author.loginname}">{{topic.author.loginname}}</span>
                <p class="latest_reply_time pull-right">{{topic.last_reply_at | getLastTimeStr true}}</p>
            </div>
        </li>
    </ul>
</div>
<div class="loadingbox" v-show="showLoading">
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
</div>
</template>

<script>
export default {
    data() {
        return {
            topics: [],
            page: 1,
            limit: 20,
            tab: 'all',
            scroll: true,
            showLoading: false
        }
    },
    route: {
        data(transition) {
            let query = transition.to.query
            this.limit = 20
            this.tab = query.tab
            this.getTopics({
                tab: this.tab
            })

            $(window).on('scroll', () => {
                this.scrollArtlist()
            })
        }
    },
    methods: {
        // 分类名称
        tabName(topic) {
            let name = ""
            if (topic.top === true) {
                name = "置顶"
            } else if (topic.good === true) {
                name = "精华"
            } else {
                switch (topic.tab) {
                    case "weex":
                        name = "weex";
                        break;
                    case "ask":
                        name = "问答";
                        break;
                    case "share":
                        name = "分享";
                        break;
                    case "job":
                        name = "招聘";
                        break;
                }
            }
            return name
        },
        // 列表数据
        getTopics(key) {
            this.$http.get('http://www.vue-js.com/api/v1/topics?', {
                params: {
                    tab: key.tab || this.tab,
                    page: key.page || this.page,
                    limit: key.limit || this.limit
                }
            }).then(function(res) {
                if (res && res.data) {
                    this.topics = res.data.data
                    this.scroll = true
                    this.showLoading = false
                }
            })
        },
        // 加载数据
        scrollArtlist() {
            if (this.scroll) {
                let totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop())
                if ($(document).height() <= totalheight + 200) {
                    this.scroll = false
                    this.limit += 20
                    this.showLoading = true
                    setTimeout(() => {
                        this.getTopics({
                            tab: this.tab
                        })
                    }, 2000)
                }
            }
        }
    }
}
</script>
