<template>
  <div class="home">
    <div v-if="keyStatus===-1">
      <h2>Идёт загрузка данных</h2>
    </div>
    <div v-else-if="keyStatus===0">
      <h2 class="error">Такой ссылкы не существует или просрочена/не активна</h2>
    </div>
    <div v-else>
      <div class="info">
        <span>id: {{ user.id }}</span>
        <span>name: {{ user.name }}</span>
        <span>phone: {{ user.phone }}</span>
        <router-link :to='key'>key: {{ key }}</router-link>
      </div>
      <div>
        <br>
        <input type="button" value="Коприровать уник. ссылку" @click="copyLink()">
        <br>
        <input type="button" value="Генерировать новую уник. ссылку" @click="regenerate()">
        <br>
        <input type="button" value="Деактивировать уник. ссылку" @click="deactivate()">
        <br>
        <input type="button" value="Im feeling lucky" @click="imFeelingLucky()">
        <br>
        <span>{{luckyNumber}}</span>
        <br>
        <span>{{(luckyNumber % 2 === 0) ?
            `Win: ${(luckyNumber > 900) ? Math.ceil(luckyNumber*.7) : ((luckyNumber > 600) ? Math.ceil(luckyNumber*.5)
                : ((luckyNumber > 300) ? Math.ceil(luckyNumber*.5): Math.ceil(luckyNumber*.1) ))}`
            : 'Lose'}}</span>
        <br>
        <input type="button" value="История" @click="history()">
        <br>
        <ul>
          <li v-for="item in historyList" :key="item">
            {{ item.number }}
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>

import Constants from "@/plugins/Constants";

export default {
  name: 'HomeView',
  data() {
    return {
      key: '',
      keyStatus: -1,
      user: {
        id: 0,
        name: '',
        phone: ''
      },
      luckyNumber: 0,
      historyList: [],
    };
  },
  methods: {
    checkKey() {
      this.keyStatus = -1;
      this.axios
          .post(Constants.BASE_URL + '/check',
              {
                key: this.key,
              }
          )
          .then((response) => {
            if (response.status === 200){
              this.user.id = response.data.data.id;
              this.user.name = response.data.data.name;
              this.user.phone = response.data.data.phone;
              this.keyStatus = 1;
            } else {
              this.keyStatus = 0;
            }
          })
          .catch(() => {
            this.keyStatus = 0;
          })
    },
    copyLink(){
      navigator.clipboard.writeText(window.location.href)
    },
    regenerate() {
      this.axios
          .post(Constants.BASE_URL + '/regenerate',
              {
                key: this.key,
              }
          )
          .then((response) => {
            if (response.status === 200) {
              this.key = response.data.link;
              this.$router.push({ path:`/${this.key}` });
            }
          })
          .catch(() => {
          })
    },
    deactivate() {
      this.axios
          .post(Constants.BASE_URL + '/deactivate',
              {
                key: this.key,
              }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$router.push({ path:'/' });
            }
          })
          .catch(() => {
          })
    },
    imFeelingLucky() {
      const num = Math.ceil(Math.random() * 1000) + 1;
      this.axios
          .post(Constants.BASE_URL + '/lucky',
              {
                key: this.key,
                lucky: num,
              }
          )
          .then((response) => {
            if (response.status === 200) {
              this.luckyNumber = num;
            }
          })
          .catch(() => {
          })
    },
    history(){
      this.historyList = []
      this.axios
          .post(Constants.BASE_URL + '/history',
              {
                key: this.key,
              }
          )
          .then((response) => {
            if (response.status === 200) {
              this.historyList = response.data.data;
            }
          })
          .catch(() => {
          })
    },
  },
  mounted() {
    this.key = this.$route.params.key;
    this.checkKey();
  },
}
</script>

<style scoped>
.error {
  color: red;
}
.info {
  display: flex;
  flex-direction: column;
}
</style>
