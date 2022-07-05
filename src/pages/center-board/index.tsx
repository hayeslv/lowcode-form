import { ElScrollbar } from "element-plus";
import { defineComponent } from "vue";
import TopBar from "./TopBar";
import "./index.scss";

export default defineComponent({
  setup() {

  },
  render() {
    return <div class="center-board">
      {/* 顶部操作栏 */}
      <TopBar></TopBar>
      <ElScrollbar class="center-scrollbar">
        222
        {/* <ElRow class="center-board-row" gutter={this.formConfig.gutter}>
          <ElForm
            labelPosition={this.formConfig.labelPosition}
            disabled={this.formConfig.disabled}
            labelWidth={this.formConfig.labelWidth + "px"}
          >
            <TransitionGroup tag="div" name="myslide"
              {...{
                class: "drawing-board",
                onDragover: ($event) => this.containerHandler.dragover($event),
                onDragenter: ($event) => this.containerHandler.dragenter($event),
              }}
            >
              { this.drawingList.map((component) => (
                <DraggableItem
                  key={component.id}
                  activeId={getActiveId()}
                  component={component}
                  activeItem={this.methodsHandler.activeFormItem}
                  copyItem={this.methodsHandler.drawingItemCopy}
                  deleteItem={this.methodsHandler.drawingItemDelete}></DraggableItem>
              )) }
            </TransitionGroup>
            {!this.drawingList.length && <div class="empty-info">
            从左侧拖入或点选组件进行表单设计
            </div>}
          </ElForm>
        </ElRow> */}
      </ElScrollbar>
    </div>;
  },
});
