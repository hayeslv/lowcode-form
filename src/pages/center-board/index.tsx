import { ElForm, ElScrollbar } from "element-plus";
import { defineComponent, TransitionGroup } from "vue";
import TopBar from "~/pages/top-bar";
import "./index.scss";
import { useNodeList } from "~/hooks";
import { useContainerDragger } from "./hooks/useContainerDragger";
import NodeItem from "./NodeItem";
import type { FormNode } from "~/lowform-meta/instance/Node";

export default defineComponent({
  setup() {
    const { getNodeList } = useNodeList();
    const nodeList = getNodeList();
    const { dragenter, dragover, drop } = useContainerDragger();

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
          // labelPosition={this.formConfig.labelPosition}
          // disabled={this.formConfig.disabled}
          // labelWidth={this.formConfig.labelWidth + "px"}
        >
          <TransitionGroup tag="div" name="myslide" {...{ class: "drawing-board" }}>
            {
              nodeList.map(v => (
                <NodeItem
                  key={v.instance.id}
                  node={v as FormNode}
                ></NodeItem>
              ))
            }
            {/* { this.drawingList.map((component) => (
                <DraggableItem
                  key={component.id}
                  activeId={getActiveId()}
                  component={component}
                  activeItem={this.methodsHandler.activeFormItem}
                  copyItem={this.methodsHandler.drawingItemCopy}
                  deleteItem={this.methodsHandler.drawingItemDelete}></DraggableItem>
              )) } */}
          </TransitionGroup>
          {!nodeList.length && <div class="empty-info">
            从左侧拖入或点选组件进行表单设计
          </div>}
        </ElForm>
        {/* </ElRow> */}
      </ElScrollbar>
    </div>;
  },
});
