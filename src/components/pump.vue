<template>
  <div>
    <h3>抽籤內容</h3>
    <Input
      class="input"
      type="textarea"
      size="large"
      placeholder="輸入抽籤內容，請用跳行(Enter)分開"
      :autosize="{ minRows: 3 }"
      v-model="lottery"
    />
    <h3>抽出數量</h3>
    <Input
      placeholder="抽出個數"
      v-model.number.trim="number"
      @on-blur="limitNum"
      class="input"
    />
    <Row type="flex" justify="end">
      <Col>
        <Button class="input" @click="pumpHandle">開始抽籤</Button>
      </Col>
    </Row>
  </div>
</template>

<script>
import Bus from "@/bus.js";

export default {
  data() {
    return {
      lottery: "",
      number: 1
    };
  },
  methods: {
    pumpHandle() {
      if (this.lottery === "") {
        this.$Message.warning("請輸入內容再進行抽籤");
        return;
      }

      new Promise(reslove => {
        this.load(reslove);
      }).then(() => {
        const lottery = this.lottery.split("\n");

        if (this.number > lottery.length) {
          this.$Message.warning("沒那麼多籤可以抽!");
          return;
        }

        const result = this.pumping(lottery, this.number);
        Bus.$emit("lottery", result);
      });
    },
    limitNum(e) {
      if (
        this.number === "" ||
        this.number === 0 ||
        typeof this.number !== "number"
      ) {
        this.number = 1;
      }
    },
    load(reslove) {
      const time = Math.floor(Math.random() * 1000 + 100);
      this.$Spin.show();
      setTimeout(() => {
        this.$Spin.hide();
        reslove();
      }, time);
    },
    pumping(arr, ranNum) {
      var result = [];
      for (var i = 0; i < ranNum; i++) {
        var ran = Math.floor(Math.random() * arr.length);
        result.push(arr.splice(ran, 1)[0]);
      }
      return result;
    }
  }
};
</script>

<style scoped lang="scss">
h3 {
  margin-bottom: 0.2rem;
}
.input {
  margin: 0 0 1.2rem 0.2rem;
}
</style>
