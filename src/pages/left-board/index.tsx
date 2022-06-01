import { ElScrollbar } from "element-plus";
import { defineComponent } from "vue";
import logo from "~/assets/logo.png";
import type { EditorComponent } from "~/config/component";
import { componentTypeList } from "~/config/component";
import { VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";
import "./index.scss";

export default defineComponent({
  setup() {
    const menuDragger = (() => { // 菜单中的组件拖拽
      let component = null as null | EditorComponent;
      const componentHandler = {
        dragstart: (e: DragEvent, current: EditorComponent) => {
          // 处理拖拽菜单组件的开始动作
          VisualDragStart.emit();
          component = current; // 更新当前组件
        },
        dragover: () => {
          VisualDragOver.emit();
        },
        dragend: () => {
          VisualDragEnd.emit();
          // 处理拖拽菜单组件的结束动作
          // component = null;

          // console.log("enenend");
        },
      };
      return componentHandler;
    })();

    return { menuDragger };
  },
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
      <ElScrollbar class="left-scrollbar">
        <div class="components-list">
          {componentTypeList.map((item, index) => <div key={index}>
            <div class="components-title">
              <svg-icon icon-class="component" />
              <span>{ item.title }</span>
            </div>
            <div class="components-draggable">
              {item.list.map(component => (
                <div class="component-item"
                  key={component.key}
                  draggable
                  onDragend={this.menuDragger.dragend}>
                  {/* onDragstart={(e) => this.menuDragger.dragstart(e, component)}
                  onDragend={this.menuDragger.dragend}
                  onDragover={this.menuDragger.dragover}> */}
                  <div class="component-body">
                    <svg-icon icon-class={component.icon} />
                    <span>{component.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>)}
        </div>
      </ElScrollbar>
    </div>;
  },
});
