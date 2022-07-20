import { CirclePlus, Operation, Remove } from "@element-plus/icons-vue";
import { ElButton, ElDivider, ElFormItem, ElIcon, ElInput, ElOption, ElRadioButton, ElRadioGroup, ElSelect } from "element-plus";
import type { FormNode, FormSelectNode, FormTimeNode } from "~/lowform-meta/instance/Node";
import type { IOptionType } from "~/lowform-meta/type";
import { EOptionsDataType } from "~/lowform-meta/type";
import { dateMethods, selectMethods } from "./methods";

// 列数渲染
export const columnRender = (node: FormNode) => {
  const instance = node.instance;
  // 组件默认占据一列
  !instance.column && (instance.column = 1);

  return <ElFormItem label="列数：">
    <ElRadioGroup class="form-column-radio-group" v-model={instance.column}>
      <ElRadioButton label={1}>1列</ElRadioButton>
      <ElRadioButton label={2}>2列</ElRadioButton>
    </ElRadioGroup>
  </ElFormItem>;
};

// options（选项类虚假）-配置项渲染
export const optionsRender = (node: FormNode, options: IOptionType[]) => {
  // “数据类型”初始化为“静态”
  !node.instance.optionsDataType && (node.instance.optionsDataType = EOptionsDataType.STATIC);
  // 请求方式默认为“get”
  !node.instance.optionsUrlMethod && (node.instance.optionsUrlMethod = "get");

  // options项（静态数据中）
  const ItemRender = (item: IOptionType) => {
    return <div key={item.value} class="select-item">
      <ElIcon class="operation-btn" size={22}><Operation /></ElIcon>
      <ElInput v-model={item.label} placeholder="选项名" />
      <ElInput v-model={item.value} placeholder="选项值" />
      <ElIcon class="close-btn" size={22} {...{
        onClick: () => selectMethods.removeSelectOptions(node, item.value),
      }}><Remove /></ElIcon>
    </div>;
  };
  // 静态数据渲染
  const staticRender = (node: FormNode) => <>
    {options.map(v => ItemRender(v))}
    <div style="margin-left: 20px;">
      <ElButton icon={CirclePlus} type="primary" text onClick={() => selectMethods.addSelectOption(node)}>添加选项</ElButton>
    </div>
  </>;
  // 动态数据渲染
  const dynamicRender = (node: FormSelectNode) => {
    const instance = node.instance;
    return <>
      <ElFormItem label="接口地址：">
        <ElInput v-model={instance.optionsUrl}
          v-slots= {{
            prepend: () => <ElSelect style="width: 80px;" v-model={instance.optionsUrlMethod}>
              <ElOption label="get" value="get"></ElOption>
              <ElOption label="post" value="post"></ElOption>
            </ElSelect>,
          }}
          {...{
            title: instance.optionsUrl,
          }}
          onBlur={() => selectMethods.updateDynamicOptions(node)}
        ></ElInput>
      </ElFormItem>
      <ElFormItem label="数据位置：">
        <ElInput v-model={instance.reqDataPosition} placeholder="请输入数据位置" clearable />
      </ElFormItem>
      <ElFormItem label="标题键名：">
        <ElInput v-model={instance.reqLabelName} placeholder="请输入标题键名" clearable />
      </ElFormItem>
      <ElFormItem label="值键名：">
        <ElInput v-model={instance.reqValueName} placeholder="请输入值键名" clearable />
      </ElFormItem>
    </>;
  };

  return <>
    <ElDivider>选项</ElDivider>
    <ElFormItem label="数据类型：">
      <ElRadioGroup class="form-column-radio-group" v-model={node.instance.optionsDataType}>
        <ElRadioButton label={EOptionsDataType.STATIC}>静态</ElRadioButton>
        <ElRadioButton label={EOptionsDataType.DYNAMIC}>动态</ElRadioButton>
      </ElRadioGroup>
    </ElFormItem>

    {/* 静态数据 */}
    { node.instance.optionsDataType === EOptionsDataType.STATIC && staticRender(node) }
    {/* 动态数据 */}
    { node.instance.optionsDataType === EOptionsDataType.DYNAMIC && dynamicRender(node as FormSelectNode) }
    <ElDivider />
  </>;
};

// 时间选择类组件-配置项渲染
export const timeRender = (node: FormTimeNode) => {
  const instance = node.instance;

  return <>
    <ElFormItem label="时间类型：">
      <ElSelect v-model={instance.dateType} style="width: 100%;" onChange={(value) => dateMethods.dateTypeChange(node, value)}>
        <ElOption label="日(date)" value="date" />
        <ElOption label="周(week)" value="week" />
        <ElOption label="月(month)" value="month" />
        <ElOption label="年(year)" value="year" />
        <ElOption label="日期时间(datetime)" value="datetime" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem label="时间格式：">
      <ElInput v-model={instance.format} placeholder="请输入时间格式" clearable />
    </ElFormItem>
  </>;
};
