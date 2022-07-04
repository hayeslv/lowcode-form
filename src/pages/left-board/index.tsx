import { ElScrollbar } from "element-plus";
import { defineComponent, ref } from "vue";
import logo from "~/assets/logo.png";
import github from "~/icons/github.svg";
import { ComponentsConfig, ComponentTypes } from "~/config";
import type { IComponent } from "~/types";
import { getGroupNameByKey, getMenuClassify, VisualComponentClick, VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";
import "./index.scss";
import type { IBaseNode } from "~/lowform-meta/type";
import { FormNode } from "~/lowform-meta/instance/Node";
import { useDragging } from "~/hooks/useDraggingNew";

export default defineComponent({
  setup() {
    const config = ref(ComponentsConfig);
    const menuGroup = ref({} as Record<string, IBaseNode[]>);

    const { setDraggingValue } = useDragging();

    const menuDragger = (() => { // 菜单中的组件拖拽
      const componentHandler = {
        dragstart: (e: DragEvent, current: IComponent) => {
          // 处理拖拽菜单组件的开始动作
          VisualDragStart.emit(current);
        },
        dragover: () => {
          VisualDragOver.emit();
        },
        dragend: () => {
          // 处理拖拽菜单组件的结束动作
          VisualDragEnd.emit();
        },
        click: (e: MouseEvent, component: IComponent) => {
          e.stopPropagation();
          VisualComponentClick.emit(component);
        },
      };
      return componentHandler;
    })();

    const menuMethods = {
      dragstart(e: DragEvent, node: IBaseNode) {
        e.stopPropagation();
        // 菜单组件，刚拖拽时，即创建实例
        const instance = new FormNode(node);
        setDraggingValue(instance);
        // emiter.emit(GlobalTopic.MenuCompDragStart, instance);
      },
      dragend(e: DragEvent) {
        e.stopPropagation();
        setDraggingValue(null);
        // emiter.emit(GlobalTopic.MenuCompDragEnd);
      },
    };

    getMenuClassify().then(group => (menuGroup.value = group));

    return () => <div class="left-board">
      <div class="logo-wrapper">
        <div class="logo">
          <img src={logo} alt="logo" /> Lowcode Form
          <a class="github" href="https://github.com/hayeslv/lowcode-form" target="_blank">
            <img src={github} alt="github" />
          </a>
        </div>
      </div>
      <ElScrollbar class="left-scrollbar">
        <div class="components-list">
          {
            ComponentTypes.map(v => (
              <div key={v.key}>
                <div class="components-title">
                  <svg-icon icon-class="component" />
                  <span>{ v.value }</span>
                </div>
                <div class="components-draggable">
                  {config.value.componentTypeMap[v.key].map(component => (
                    <div class="component-item"
                      key={component.type}
                      draggable
                      onDragstart={(e) => menuDragger.dragstart(e, component)}
                      onDragend={() => menuDragger.dragend()}
                      onClick={(e) => menuDragger.click(e, component)}>
                      <div class="component-body">
                        <svg-icon icon-class={component.icon} />
                        <span>{component.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
          {/* <div>---------- 下方为测试用 ----------</div>
          {
            Object.entries(menuGroup.value).map(([key, value]) => (
              <div key={key}>
                <div class="components-title">
                  <svg-icon icon-class="component" />
                  <span>{ getGroupNameByKey(key) }</span>
                </div>
                <div class="components-draggable">
                  {value.map(node => (
                    <div class="component-item"
                      key={node.key}
                      draggable
                      onDragstart={(e) => menuMethods.dragstart(e, node)}
                      onDragend={(e) => menuMethods.dragend(e)}
                    // onClick={(e) => this.menuDragger.click(e, component)}
                    >
                      <div class="component-body">
                        <svg-icon icon-class={node.key} />
                        <span>{node.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          } */}
        </div>
      </ElScrollbar>
    </div>;
  },
});
