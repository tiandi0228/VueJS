<style>
.user-info {
    text-align: center;
    overflow: hidden;
    padding: 20px 0;
    background: #fff;
    margin-top: 30px;
    border-radius: 5px;
}

.user-info img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    box-shadow: 0 0 8px rgba(0, 0, 0, .5)
}

.user-info p {
    margin: 5px 0 0 0;
}

.user-tab {
    margin-top: 20px;
    background: #fff;
    padding: 10px;
    border-radius: 5px;
}

.user-tab .tab-nav {
    height: 40px;
    padding: 0;
    text-align: center;
}

.user-tab .tab-nav li {
    float: left;
    width: 50%;
    border-bottom: solid 1px #d4d4d4;
    position: relative;
    line-height: 37px;
    font-size: 14px;
    padding-bottom: 2px;
    cursor: pointer;
}

.user-tab .tab-nav li:not(:last-child):after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #d4d4d4;
}

.user-tab .tab-nav li.selected {
    border-bottom: 2px solid #42b983;
    color: #42b983;
    padding-bottom: 1px;
}

.user-tab .tab-content {
    padding: 10px 0;
    overflow: hidden;
    border-bottom: 1px #ccc solid;
}

.user-tab .tab-content .t-title {
    font-size: 14px;
    padding-bottom: 10px;
}

.user-tab .tab-content .avatar {
    width: 48px;
    height: 48px;
    margin-right: 10px;
}

.user-tab .tab-content p {
    margin: 0;
}

.user-tab .tab-content .name {
    font-size: 14px;
}

.user-tab .tab-content .time {
    font-size: 14px;
    padding: 5px 0 0 0;
}

.user-tab .no-data {
    text-align: center;
    padding: 20px 0;
}
</style>

<template>
<div class="user-info">
    <img :src="user.avatar_url">
    <p>{{user.loginname}}</p>
    <p>注册时间：{{user.create_at | getLastTimeStr true}}</p>
    <p>积分：{{user.score}}</p>
</div>

<div class="user-tab">
    <ul class="tab-nav">
        <li class="item" :class='{"selected":selectItem === 1}' @click="changeItem(1)">最近回复</li>
        <li class="item" :class='{"selected":selectItem === 2}' @click="changeItem(2)">最新发布</li>
    </ul>
    <div class="tab-content" v-for="item in currentData">
        <div class="user">
            <div class="t-title" v-link="{path: '/topic/' + item.id}">{{item.title}}</div>
            <div class="info" v-link="{path: '/user/' + item.author.loginname}">
                <img class="avatar pull-left" :src="item.author.avatar_url" />
                <div class="pull-left">
                    <p class="name">{{item.author.loginname}}</p>
                    <p class="time">{{item.last_reply_at | getLastTimeStr true}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="no-data" v-show="currentData.length === 0">
        暂无数据!
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            currentData: [],
            selectItem: 1
        }
    },
    route: {
        data(transition) {
            let loginname = this.$route.params.loginname || this.loginname
            this.$http.get('http://www.vue-js.com/api/v1/user/' + loginname).then(function(res) {
                if (res && res.data) {
                    let data = res.data.data;
                    this.user = data;
                    if (data.recent_replies.length > 0) {
                        this.currentData = data.recent_replies
                    } else {
                        this.currentData = data.recent_topics
                        this.selectItem = 2
                    }
                }
            })
        }
    },
    methods: {
        //切换tab
        changeItem(idx) {
            this.selectItem = idx
            this.currentData = idx === 1 ? this.user.recent_replies : this.user.recent_topics
        }
    }
}
</script>
