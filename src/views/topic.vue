<style>
.con {
    background: #fff;
    border-radius: 5px;
}

.topic-header {
    overflow: hidden;
    margin-top: 30px;
    padding: 0 10px;
}

.topic-header h3 {
    padding-top: 10px;
    font-size: 18px;
    font-weight: 600;
    color: #000;
}

.topic-header .userPanel {
    padding: 0 0 10px 0;
}

.topic-header p {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 0;
}

.topic-header p.author {
    padding: 0 10px;
}

.topic-content {
    padding: 10px;
    margin: 0;
    color: #000;
}

.topic-content p {
    color: #000;
}

.topic-content a {
    color: #4078c0;
    text-decoration: none;
}

.topic-content a:hover {
    text-decoration: underline;
}

.topic-content ul {
    list-style: inside disc;
    line-height: 1.42
}

.topic-content h1 {
    font-size: 32.5px;
    margin: 30px 0 15px;
    border-bottom: 1px solid #eee
}

.topic-content p {
    font-size: 15px;
    line-height: 1.6
}

.reply-form {
    margin-top: 15px;
    background: #fff;
    border-radius: 5px;
    padding: 10px;
}

.reply-form textarea {
    min-height: 80px;
    border: 1px solid #ccc;
    padding: 4px 6px;
    border-radius: 4px;
    color: #666;
    margin-bottom: 0;
}

.reply-form button {
    background-color: #80bd01;
    border: 0;
    color: #fff;
    width: 100%;
    padding: 0 16px;
    line-height: 40px;
    border-radius: 5px;
}

.markdown-text p {
    font-size: 14px;
    margin-bottom: 0;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: 1.4em;
    color: #000;
}

.markdown-text img {
    vertical-align: middle;
}

.markdown-text .prettyprint {
    background-color: #2d2d2d;
    color: #ccc;
    overflow: hidden;
    padding: 0.6em;
    white-space: pre-wrap;
    word-break: break-word;
    word-wrap: break-word;
}

.markdown-text .prettyprint code {
    font-size: 100%;
    padding: 15px 0;
    line-height: 1.6;
    font-family: "consolas", "Menlo", "PingFang SC", "Microsoft YaHei", monospace;
}
</style>

<template>
<div class="con">
    <div class="topic-header">
        <h3>{{topic.title}}</h3>
        <div class="userPanel">
            <p class="time pull-left">发布于{{topic.create_at | getLastTimeStr true}}</p>
            <p class="author pull-left">作者{{topic.author.loginname}}</p>
            <p class="pull-left">{{topic.visit_count}}次浏览</p>
        </div>
    </div>
    <div class="topic-content">
        <div class="markdown-text">
            {{{topic.content}}}
        </div>
    </div>
</div>
<replylist :replies="topic.replies" :topic-id="topic.id"></replylist>
<form @submit.prevent="replyHandler" class="reply-form">
    <textarea v-model="replyContent"></textarea>
    <button type="submit">回复</button>
</form>
</template>

<script>
import ReplyList from "../components/ReplyList.vue"
export default {
    components: {
        replylist: ReplyList
    },
    data() {
        return {
            topic: {},
            replyContent: ""
        }
    },
    route: {
        data(transition) {
            var topicId = transition.to.params.id
            this.getTopic(topicId)
        }
    },
    methods: {
        // 分类名称
        tabName(topic) {
            let name = ""
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
            return name
        },
        getTopic(id) {
            this.$http.get('http://www.vue-js.com/api/v1/topic/' + id).then(function(res) {
                if (res && res.data) {
                    this.topic = res.data.data
                }
            })
        }
    }
}
</script>
