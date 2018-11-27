<template>
    <form @submit.prevent="showData">
        
            <div>
                img
            </div>
            <div><input type="text" placeholder="Full Name..." v-model="newUser.fullName"></div>
            <div><input type="text" placeholder="Nick Name..." v-model="newUser.nickName"></div>
            <div>
                <select v-model="newUser.level">
                    <option>Novice</option>
                    <option>Pro</option>
                </select>
            </div>
        
        
        <div class="instruments">
            <h4>instruments you play on:</h4>
            <input type="checkbox" id="guitar" value="Guitar" v-model="newUser.instruments">
            <label for="guitar">Guitar</label>
            <input type="checkbox" id="bass" value="Bass" v-model="newUser.instruments">
            <label for="bass">Bass</label>
            <input type="checkbox" id="drums" value="Drums" v-model="newUser.instruments">
            <label for="drums">Drums</label>
        </div>
        <div class="musicPrefs">
            <h4>favorite music:</h4>
            <input type="checkbox" id="rock" value="Rock" v-model="newUser.instruments">
            <label for="rock">Rock</label>
            <input type="checkbox" id="classic" value="Classic" v-model="newUser.instruments">
            <label for="classic">Classic</label>
            <input type="checkbox" id="world" value="World" v-model="newUser.instruments">
            <label for="world">World</label>
        </div>
            <textarea placeholder="tell us about yourself..."></textarea>
    
        <button>Submit</button>
    </form>
</template>

<script>
export default {
    data(){
        return {
            newUser: {
                userImgUrl : '',
                fullName: '',
                nickName: '',
                instruments: [],
                level:'',
                musicCategory: [],
                location: ''
            }
        }
    },
    methods: {
        showData(){
            console.log(this.newUser)
        }
       
}
}
</script>

<style>
    form {
        height: 100vh;
        margin: 0 auto;
        width: 80%;
    }
    form div {
        width: 90%
    }
    input[type=text], textarea {
        width: 100%;
        padding: 12px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 4px;
        resize: vertical;
    }

    .instruments, .musicPrefs {
        padding: 12px;
    }

    select {
        width: 30%;
        padding: 12px;
        margin: 10px;
        border: 1px solid black;
        border-radius: 4px;
    }

    textarea {
        height: 20%;
    }

    h4 {
        margin-bottom: 0;
    }
</style>
