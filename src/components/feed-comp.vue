<template>
  <div class="conversation">
    <div class="conversation-container" ref="conversationRef">
      <div v-for="(msg, idx) in currEvent.msgs" :key="idx" class="message">
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
  props:['currEvent'],
  data() {
    return {
      msgs: [],
      nickName: null,
      newMsg: null,
      typeMsg: ""
    };
  },
  methods: {
    send() {
      msgService.send(this.newMsg);

      console.log(this.currEvent.msgs)
      this.currEvent.msgs.push(this.newMsg)
      console.log('event after send', this.currEvent)
      this.newMsg = msgService.createEmptyMsg(this.nickName);
      this.sendUpdatedEvent(this.currEvent);
      this.scrollToEnd()
    },
    scrollToEnd(){
      var container = this.$refs.conversationRef;
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
    },
    sendUpdatedEvent(event){
      this.$emit('sendUpdatedEvent', event)
    }
  },
  created() {
    // this.msgs = this.currEvent.msgs;
    console.log('event', this.currEvent)
    const room = this.currEvent._id;
    msgService.roomJoin(room);
    this.nickName = this.$store.getters.loggedInUser.name;
    this.newMsg = msgService.createEmptyMsg(this.nickName);
  },
  mounted(){
    this.scrollToEnd();
  },
  destroyed(){
    // this.feedCurrEvent = null;
    // console.log('after des', this.currEvent)
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
