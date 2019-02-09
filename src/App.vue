<template>
  <Layout>
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <MenuItem name="1">
          <h1>抽抽樂</h1>
        </MenuItem>
      </Menu>
    </Header>
    <Content class="content">
      <Row type="flex" justify="space-around">
        <Col :md="11" :sm="11" :xs="24">
          <pump></pump>
        </Col>
        <Col :md="11" :sm="12" :xs="24">
          <h3 style="margin-bottom: .2rem;">抽籤結果</h3>
          <transition name="zoom">
            <ul id="result" v-if="results.length" class="input">
              <li v-for="(result, index) in results" :key="index">
                {{ index + 1 }}.
                <Icon type="ios-arrow-round-forward" />
                {{ result }}
              </li>
            </ul>
          </transition>
        </Col>
      </Row>
    </Content>
    <Footer class="footer"
      >2019 &copy; Jay
      <Button
        icon="logo-github"
        type="text"
        to="https://github.com/HappyJayXin/lottery"
        target="_blank"
      ></Button
      >xingyu
    </Footer>
  </Layout>
</template>

<script>
import pump from "./components/pump";
import Bus from "@/bus.js";

export default {
  name: "app",
  components: { pump },
  data() {
    return {
      results: []
    };
  },
  mounted() {
    Bus.$on("lottery", lottery => {
      this.results = lottery;
    });
  },
  destroyed() {
    Bus.$off("lottery");
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}
.content {
  padding: 50px 100px;
}
.footer {
  grid-row-start: 2;
  grid-row-end: 3;
  text-align: center;
}

.input {
  margin: 0 0 1.2rem 0.2rem;
}

#result {
  padding: 1rem;
  border-radius: 5px;
  text-align: left;
  background: #fff;
  li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    list-style: none;
    font-size: 1.5rem;
  }
}

.slide-up-enter-active {
  transition: all 1s ease;
}
.slide-up-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter,
.slide-fade-leave-to {
  transform: translateY(100vh);
  opacity: 0;
}

$bp: (992px 50px), (768px 20px);
@each $b, $p in $bp {
  @media screen and (max-width: $b) {
    .content {
      padding: 50px $p;
    }
  }
}
</style>
