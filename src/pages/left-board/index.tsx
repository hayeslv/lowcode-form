import { ElScrollbar } from "element-plus";
import { defineComponent, inject, unref } from "vue";
import logo from "~/assets/logo.png";
import github from "~/icons/github.svg";
import { configKey } from "~/config";
import { useDragging, useNodeList } from "~/hooks";
import { FormNode } from "~/lowform-meta/instance/Node";
import type { IBaseNode } from "~/lowform-meta/type";
import { getGroupNameByKey, getMenuClassify } from "~/utils";
import "./index.scss";

export default defineComponent({
  setup() {
    const config = inject(configKey);
    console.log(config);
    const menuGroup = getMenuClassify(unref(config));
    const { setDragging } = useDragging();
    const { addNode } = useNodeList();

    const menuMethods = {
      click(e: MouseEvent, node: IBaseNode) {
        e.stopPropagation();
        const instance = new FormNode(node);
        addNode(instance);
      },
      dragstart(e: DragEvent, node: IBaseNode) {
        e.dataTransfer!.effectAllowed = "copyMove";
        const instance = new FormNode(node);
        setDragging(instance);
      },
      dragend() {
        setDragging(null);
      },
    };

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
            Object.entries(menuGroup).map(([key, value]) => (
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
                      onDragend={() => menuMethods.dragend()}
                      onClick={(e) => menuMethods.click(e, node)}
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
          }
        </div>
      </ElScrollbar>
    </div>;
  },
});
