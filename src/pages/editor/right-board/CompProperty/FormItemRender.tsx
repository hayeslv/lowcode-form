import { CirclePlus, Close, Operation, Pointer, Remove } from "@element-plus/icons-vue";
import type { FormItemRule } from "element-plus";
import { ElButton, ElDivider, ElFormItem, ElIcon, ElInput, ElOption, ElRadioButton, ElRadioGroup, ElSelect } from "element-plus";
import { EventName } from "~/config";
import type { FormNode, FormSelectNode, FormTimeNode } from "~/lowform-meta/instance/Node";
import type { IOptionType } from "~/lowform-meta/type";
import { EOptionsDataType } from "~/lowform-meta/type";
import { events } from "~/plugins/events";
import { EIconPreSuf } from "~/types";
import { dateMethods, ruleMethods, selectMethods } from "./methods";

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
  </>;
};

// 时间选择类组件-配置项渲染
export const timeRender = (node: FormTimeNode) => {
  const instance = node.instance;
  return <>
    {
      (instance.key === "date" || instance.key === "date-range") &&
      <ElFormItem label="时间类型：">
        <ElSelect v-model={instance.dateType} style="width: 100%;" onChange={(value) => dateMethods.dateTypeChange(node, value)}>
          { instance.key === "date" && <>
            <ElOption label="日(date)" value="date" />
            <ElOption label="周(week)" value="week" />
            <ElOption label="月(month)" value="month" />
            <ElOption label="年(year)" value="year" />
            <ElOption label="日期时间(datetime)" value="datetime" />
          </> }
          { instance.key === "date-range" && <>
            <ElOption label="日期范围(daterange)" value="daterange" />
            <ElOption label="月范围(monthrange)" value="monthrange" />
            <ElOption label="日期时间范围(datetimerange)" value="datetimerange" />
          </> }
        </ElSelect>
      </ElFormItem>
    }
    <ElFormItem label="时间格式：">
      <ElInput v-model={instance.format} placeholder="请输入时间格式" clearable />
    </ElFormItem>
  </>;
};

// 验证规则-配置项渲染
export const ruleRender = (node: FormNode) => {
  const instance = node.instance;

  const ItemRender = (item: FormItemRule, index: number) => <div class="reg-item" key={index}>
    <span class="close-btn" onClick={() => ruleMethods.deleteRule(node, index)}>
      <ElIcon><Close /></ElIcon>
    </span>
    <ElFormItem label="表达式">
      <ElInput v-model={item.pattern} placeholder="请输入正则" />
    </ElFormItem>
    <ElFormItem label="错误提示" style="margin-bottom: 0;">
      <ElInput v-model={item.message} placeholder="请输入错误提示" />
    </ElFormItem>
  </div>;
  return <>
    <ElDivider>正则校验</ElDivider>
    {
      // 规则列表
      instance.regList && instance.regList.map((v, i) => ItemRender(v, i))
    }
    <div style="margin-left: 20px;">
      <ElButton icon={CirclePlus} type="primary" text onClick={() => ruleMethods.addRule(node)}>添加规则</ElButton>
    </div>
  </>;
};

// icon-配置项渲染（前图标、后图标）
export const iconRender = (node: FormNode): JSX.Element | null => {
  const instance = node.instance;
  let pre: JSX.Element | null = null;
  let suf: JSX.Element | null = null;
  if (instance.prefixIcon !== undefined) {
    pre = <ElFormItem label="前图标">
      <ElInput v-model={instance.prefixIcon} placeholder="请选择前图标" clearable v-slots={{
        append: () => <ElButton icon={Pointer} onClick={() => events.emit(EventName.IconDialog, { flag: true, iconType: EIconPreSuf.PrefixIcon, node })}>选择</ElButton>,
      }} />
    </ElFormItem>;
  }
  if (instance.suffixIcon !== undefined) {
    suf = <ElFormItem label="后图标">
      <ElInput v-model={instance.suffixIcon} placeholder="请选择后图标" clearable v-slots={{
        append: () => <ElButton icon={Pointer} onClick={() => events.emit(EventName.IconDialog, { flag: true, iconType: EIconPreSuf.SuffixIcon, node })}>选择</ElButton>,
      }} />
    </ElFormItem>;
  }
  if (!pre && !suf) return null;
  return <>
    { pre }
    { suf }
  </>;
};
