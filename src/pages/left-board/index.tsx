import { ElScrollbar } from "element-plus";
import { defineComponent, ref } from "vue";
import logo from "~/assets/logo.png";
import github from "~/icons/github.svg";
import { ComponentsConfig, ComponentTypes } from "~/config";
import type { IComponent } from "~/types";
import { VisualComponentClick, VisualDragEnd, VisualDragOver, VisualDragStart } from "~/utils";
import "./index.scss";
import { registerComponent } from "~/config/registerComponent";
import type { IBaseNode } from "~/lowform-meta/type";

export default defineComponent({
  setup() {
    const config = ref(ComponentsConfig);

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

    // test：将组件改为class模式
    // const aa = registerComponent().then(files => {
    //   const models = {} as Record<string, IBaseNode>;
    //   for (const key in files) {
    //     files[key]().then(res => {
    //       models[key.replace(/(\.\/data\/|\.ts)/g, "")] = res.default;
    //     });
    //   }
    //   console.log(models);
    //   const groupList = Object.entries(models);
    //   // .reduce((prev, now) => {
    //   //   console.log(now);
    //   //   prev.push(now);
    //   //   return prev;
    //   // }, [] as any[]);
    //   console.log(groupList);
    // });

    return { config, menuDragger };
  },
  render() {
    return <div class="left-board">
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
                  {this.config.componentTypeMap[v.key].map(component => (
                    <div class="component-item"
                      key={component.type}
                      draggable
                      onDragstart={(e) => this.menuDragger.dragstart(e, component)}
                      onDragend={() => this.menuDragger.dragend()}
                      onClick={(e) => this.menuDragger.click(e, component)}>
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
          {
            // this.data.
          }
        </div>
      </ElScrollbar>
    </div>;
  },
});
