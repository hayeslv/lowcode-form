import { ElForm, ElScrollbar } from "element-plus";
import { defineComponent, ref, TransitionGroup } from "vue";
import TopBar from "~/pages/top-bar";
import "./index.scss";
import { useFormConfig, useNodeList } from "~/hooks";
import { useContainerDragger } from "./hooks/useContainerDragger";
import NodeItem from "./NodeItem";
import type { FormNode } from "~/lowform-meta/instance/Node";
import { EventNodeListUpdate } from "~/plugins/GlobalEvent";

export default defineComponent({
  setup() {
    const { getNodeList } = useNodeList();
    const { dragenter, dragover, drop } = useContainerDragger();
    const { getFormConfig } = useFormConfig();

    const nodeList = ref(getNodeList());
    const formConfig = getFormConfig();

    EventNodeListUpdate.on(() => {
      nodeList.value = getNodeList();
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
          labelPosition={formConfig.labelPosition}
          labelWidth={formConfig.labelWidth + "px"}
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
