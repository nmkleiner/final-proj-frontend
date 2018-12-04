<template>
  <div class="conversation">
    <div class="conversation-container" ref="conversationRef">
      <div v-for="(msg, idx) in msgs" :key="idx" class="message">
        <div class="container">
          <p class="msg">{{msg.from}}: {{msg.txt}}</p>
        </div>
      </div>
    </div>

    <form class="conversation-compose">
      <input
        v-model="newMsg.txt"
        class="input-msg"
        name="input"
        placeholder="Type a message"
        autocomplete="off"
        autofocus
      >
      
      <button @click.prevent="send">send</button>
    </form>
  </div>
</template>

<script>
import ioClient from "socket.io-client";
import msgService from "@/service/msg.service.js";
export default {
  props: ["currEvent"],
  data() {
    return {
      msgs: [],
      nickName: null,
      newMsg: null,
      typeMsg: ""
      // socket: ioClient("http://localhost:3000")
    };
  },
  methods: {
    send() {
      console.log("oom", this.currEvent._id);
      this.$socket.emit("assignMsg", {
        msg: this.newMsg,
        room: this.currEvent._id
      });
      this.pushMsgToHistory(this.newMsg);
      this.newMsg = msgService.createEmptyMsg(this.nickName);
      this.scrollToEnd();
    },
    scrollToEnd() {
      var container = this.$refs.conversationRef;
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
    pushMsgToHistory(msg) {
      this.$emit("pushMsgToHistory", msg);
    }
  },
  created() {
    this.msgs = JSON.parse(JSON.stringify(this.$store.getters.currEvent.msgs));
    this.nickName = this.$store.getters.loggedInUser.name;
    this.newMsg = msgService.createEmptyMsg(this.nickName);

    const room = this.currEvent._id;

    this.$socket.emit("chatJoined", room);
  },
  sockets: {
    renderMsg(msg) {
      console.log({ msg });
      this.msgs.push(msg);
    }
  },
  mounted() {
    this.scrollToEnd();
  },
  destroyed() {
    // this.feedCurrEvent = null;
    // console.log('after des', this.currEvent)
  }
};
</script>

<style scoped lang='scss'>
.conversation {
  border: 1px solid lightgray;
  border-radius: 6px;
  padding: 10px;
}

.conversation-container {
  padding: 10px;
  height: 300px;
  overflow: auto;
  background-color: lighten(lightgray, 8%);
}

.container {
  border: 1px solid black;
  background-color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 10px;
}

.container::after {
  content: "";
  clear: both;
  display: table;
}

.msg {
  color: black;
}
</style>
