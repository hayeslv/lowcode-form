import { ElScrollbar } from "element-plus";
import { defineComponent, inject, ref, watch } from "vue";
import logo from "~/assets/logo.png";
import { configKey } from "~/config";
import github from "~/icons/github.svg";
import { getGroupNameByKey, getMenuClassify } from "~/utils";
// import { getMenuClassify } from "~/utils";
import "./index.scss";

export default defineComponent({
  setup() {
    const config = inject(configKey);
    const menuGroup = getMenuClassify(config);

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
                      // onDragstart={(e) => menuMethods.dragstart(e, node)}
                      // onDragend={(e) => menuMethods.dragend(e)}
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
          }
        </div>
      </ElScrollbar>
    </div>;
  },
});
