import { defineComponent } from "vue";
import logo from "~/assets/logo.png";
import "./index.scss";

export default defineComponent({
  setup() {},
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
    </div>;
  },
});
