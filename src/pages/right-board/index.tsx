import { Link } from "@element-plus/icons-vue";
import { ElIcon, ElScrollbar, ElTabPane, ElTabs } from "element-plus";
import { defineComponent, ref } from "vue";
import { useActiveComp, useDrawingList } from "~/hooks";
import CompProperty from "./CompProperty";
import FormProperty from "./FormProperty";
import "./index.scss";

const enum TabItem {
  Field = "field",
  Form = "form",
}

export default defineComponent({
  setup() {
    const currentTab = ref(TabItem.Field);

    return {  currentTab };
  },
  render() {
    const { drawingList } =  useDrawingList();
    const { getActiveComp, setActiveComp } = useActiveComp();
    const component = getActiveComp();
    if (!component && drawingList.value.length) setActiveComp(drawingList.value[0]);

    return <div class="right-board">
      <ElTabs v-model={this.currentTab} class="center-tabs">
        <ElTabPane label="组件属性" name={TabItem.Field} />
        <ElTabPane label="表单属性" name={TabItem.Form} />
      </ElTabs>
      <div class="field-box">
        <a class="document-link" target="_blank" href="https://element-plus.gitee.io/zh-CN/component/button.html" title="查看组件文档">
          <ElIcon><Link /></ElIcon>
        </a>
        <ElScrollbar class="right-scrollbar">
          {/* 组件属性 */}
          {this.currentTab === TabItem.Field && component && <CompProperty></CompProperty>}
          {/* 表单属性 */}
          {this.currentTab === TabItem.Form && <FormProperty></FormProperty>}
        </ElScrollbar>
      </div>
    </div>;
  },
});
