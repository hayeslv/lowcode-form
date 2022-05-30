import { defineComponent } from "vue";
import logo from "~/assets/logo.png";
import { componentTypeList } from "~/config/component";
import "./index.scss";

export default defineComponent({
  setup() {
  },
  render() {
    return <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <img src={logo} alt="logo" /> Lowcode Form
          <a class="github" href="https://github.com/hayeslv/lowcode-form" target="_blank">
            <img src="https://github.githubassets.com/pinned-octocat.svg" alt="github" />
          </a>
        </div>
      </div>
      <el-scrollbar class="left-scrollbar">
        <div class="components-list">
          {componentTypeList.map((item, index) => <div key={index}>
            <div class="components-title">
              {/* <svg-icon icon-class="component" /> */}
              { item.title }
            </div>
          </div>)}
        </div>
      </el-scrollbar>
    </div>;
  },
});
