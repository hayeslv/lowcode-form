import { ElScrollbar } from "element-plus";
import { defineComponent } from "vue";
import logo from "~/assets/logo.png";
import github from "~/icons/github.svg";
import "./index.scss";

export default defineComponent({
  setup() {
    return () => <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <img src={logo} alt="logo" /> Lowcode Form
          <a class="github" href="https://github.com/hayeslv/lowcode-form" target="_blank">
            <img src={github} alt="github" />
          </a>
        </div>
      </div>
      <ElScrollbar class="left-scrollbar">
        <div class="components-list">
        </div>
      </ElScrollbar>
    </div>;
  },
});
