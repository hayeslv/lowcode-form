import { defineComponent } from "vue";
import LeftBoard from "./left-board";
import CenterBoard from "./center-board";
import RightBoard from "./right-board";

export default defineComponent({
  setup() {},
  render() {
    return <div class="container">
      <LeftBoard />
      <CenterBoard />
      <RightBoard />
    </div>;
  },
});
