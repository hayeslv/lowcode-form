import { Link } from "@element-plus/icons-vue";
import { ElIcon, ElTabPane, ElTabs } from "element-plus";
import { defineComponent, ref } from "vue";
import "./index.scss";

export default defineComponent({
  setup() {
    const currentTab = ref("field");

    return { currentTab };
  },
  render() {
    return <div class="right-board">
      <ElTabs v-model={this.currentTab} class="center-tabs">
        <ElTabPane label="组件属性" name="field" />
        <ElTabPane label="表单属性" name="form" />
      </ElTabs>
      <div class="field-box">
        <a class="document-link" target="_blank" href="https://element-plus.gitee.io/zh-CN/component/button.html" title="查看组件文档">
          <ElIcon><Link /></ElIcon>
        </a>
      </div>
    </div>;
  },
});
