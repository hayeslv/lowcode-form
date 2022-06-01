import { ElButton } from "element-plus";
import { VideoPlay } from "@element-plus/icons-vue";
import { defineComponent } from "vue";
import "./index.scss";

export default defineComponent({
  setup() {},
  render() {
    return <div class="action-bar">
      <ElButton icon={VideoPlay} text>运行</ElButton>
    </div>;
  },
});
