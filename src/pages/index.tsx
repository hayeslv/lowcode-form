import { defineComponent } from "vue";
import LeftBoard from "~/pages/left-board";
import CenterBoard from "~/pages/center-board";
import "~/style/layout.scss";

export default defineComponent({
  setup() {},
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <div class="right-board">right</div>
    </div>;
  },
});
