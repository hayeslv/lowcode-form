import { Search } from "@element-plus/icons-vue";
import { ElDialog, ElIcon, ElInput } from "element-plus";
import type { PropType } from "vue";
import { createVNode, defineComponent, ref, shallowRef, watch } from "vue";
import type { EIconPreSuf } from "~/types";
import { iconMapList } from "~/utils";
import "./index.scss";

export default defineComponent({
  props: {
    visible: { type: Boolean, default: false },
    iconType: { type: String as PropType<EIconPreSuf>, required: true },
    activeName: { type: String, default: "" },
  },
  emits: ["update:visible", "select"],
  setup(props, { emit }) {
    const activeIcon = ref<string>();
    const key = ref<string>("");
    const iconList = shallowRef<any[]>(iconMapList); // 里面是组件，不再进行深层响应式监听（影响性能）

    watch(() => key.value, (newVal) => {
      iconList.value = iconMapList.filter((v: any) => v.name.toLowerCase().includes(newVal.toLowerCase()));
    });

    const dialogMethods = {
      close() {
        emit("update:visible", false);
      },
      open() {
        key.value = "";
        activeIcon.value = props.activeName;
      },
      select(name: string) {
        activeIcon.value = name;
        emit("select", name, props.iconType);
        emit("update:visible", false);
      },
    };

    return () => {
      return <ElDialog
        width="980px"
        modelValue={props.visible}
        closeOnClickModal={false}
        appendToBody={true}
        onClose={dialogMethods.close}
        onOpen={dialogMethods.open}
        v-slots={{
          header: () => <>
            <span style="margin-right: 15px;">选择图标</span>
            <ElInput v-model={key.value} size="small" style="width: 260px;" placeholder="请输入图标名称" clearable prefixIcon={Search} />
          </>,
        }}
      >
        <ul class="icon-ul">
          {
            iconList.value.map((item: any) => <li
              key={item.name}
              class={item.name === activeIcon.value ? "active-item" : ""}
              onClick={() => dialogMethods.select(item.name)}
            >
              <ElIcon size={30} style="height: 50px;">{createVNode(item)}</ElIcon>
              <div>{item.name}</div>
            </li>)
          }
        </ul>
      </ElDialog>;
    };
  },
});
