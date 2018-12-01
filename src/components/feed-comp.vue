<template>
  <div class="conversation">
    <div class="conversation-container" ref="conversationRef">
      <div v-for="(msg, idx) in msgs" :key="idx" class="message" :class="msgClass(msg)">
        <div class="container">
          <p>{{msg.from}}: {{msg.txt}}</p>
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
import msgService from "@/service/msg.service.js";
export default {
  data() {
    return {
      msgs: [],
      nickName: null,
      newMsg: null,
      typeMsg: ""
    };
  },
  created() {
    const room = this.$route.params.eventId;
    msgService.roomJoin(room);
    this.nickName = this.$store.getters.loggedInUser.name;
    this.newMsg = msgService.createEmptyMsg(this.nickName);
    this.msgs = msgService.getMsgs();
  },
  mounted(){
    this.scrollToEnd();
  },
  methods: {
    msgClass(msg) {
      return msg.from !== this.nickName ? "received" : "sent";
    },
    send() {
      this.scrollToEnd()
      msgService.send(this.newMsg);
      this.newMsg = msgService.createEmptyMsg(this.nickname);
    },
    msgType() {
      msgService.msgType();
    },
    scrollToEnd(){
      var container = this.$refs.conversationRef;
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    }
  }
};
</script>

<style scoped>

.conversation{
  border: 3px solid black;
  border-radius: 6px;
  padding: 10px;
}

.conversation-container{
  height: 300px;
  overflow: auto;
}

.container {
    border: 2px solid #dedede;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
}


.container::after {
    content: "";
    clear: both;
    display: table;
}

</style>
