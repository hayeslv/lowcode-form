import { ElForm, ElScrollbar } from "element-plus";
import { defineComponent, ref, TransitionGroup } from "vue";
import TopBar from "~/pages/top-bar";
import "./index.scss";
import { useFormConfig, useNodeList } from "~/hooks";
import { useContainerDragger } from "./hooks/useContainerDragger";
import NodeItem from "./NodeItem";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { events } from "~/plugins/events";
import { EventName } from "~/config";

export default defineComponent({
  setup() {
    const { getNodeList } = useNodeList();
    const { dragenter, dragover, drop } = useContainerDragger();
    const { getFormConfig } = useFormConfig();

    const nodeList = ref(getNodeList());
    const formConfig = ref(getFormConfig());

    events.on(EventName.NodeListUpdate, () => {
      nodeList.value = getNodeList();
    });
    events.on(EventName.ActiveNodeUpdate, () => {
      nodeList.value = getNodeList(); // TODO 这里是全部重新获取了，可以做成只更新activeNode的对应参数内容
    });
    events.on(EventName.FormConfigUpdate, () => {
      formConfig.value = getFormConfig();
    });

    return () => <div class="center-board">
      {/* 顶部操作栏 */}
      <TopBar></TopBar>
      <ElScrollbar class="center-scrollbar">
        <ElForm
          class="form-board"
          {...{
            onDragenter: (e: DragEvent) => dragenter(e),
            onDragover: (e: DragEvent) => dragover(e),
            onDrop: (e: DragEvent) => drop(e),
          }}
          labelPosition={formConfig.value.labelPosition}
          labelWidth={formConfig.value.labelWidth + "px"}
        >
          <TransitionGroup tag="div" name="myslide" {...{ class: "drawing-board" }}>
            {
              nodeList.value.map(v => (
                <NodeItem
                  key={v.instance.id}
                  node={v as FormNode}
                ></NodeItem>
              ))
            }
          </TransitionGroup>
          {!nodeList.value.length && <div class="empty-info">
            从左侧拖入或点选组件进行表单设计
          </div>}
        </ElForm>
        {/* </ElRow> */}
      </ElScrollbar>
    </div>;
  },
});
