import type { ElementComponent } from "~/config";
import type { FormConfigTotalType } from "~/types";

let globalConfig: FormConfigTotalType; // 全局配置

export const vueTemplate = (str: string) => {
  return `<template>
    <div>
      ${str}
    </div>
  </template>`;
};

export const vueScript = (str: string) => {
  return `<script lang="ts" setup>
    import { reactive } from "vue";
    ${str}
  </script>`;
};

export const vueCssStyle = () => {
  return `<style>
  </style>`;
};

const attrBuilder = (el: ElementComponent) => {
  return {
    tag: `el-${el.type}`,
    vModel: `v-model="${globalConfig.formModel}.${el.__vModel__}"`,
    placeholder: el.placeholder ? `placeholder="${el.placeholder}"` : "",
  };
};

// 组装相对应的tag
const tags = {
  input: (el: ElementComponent) => {
    const { tag, vModel, placeholder } = attrBuilder(el);

    return `<${tag} ${vModel} ${placeholder}></${tag}>`;
  },
};

// span不为24的用el-col包裹
const colWrapper = (component: ElementComponent, str: string) => {
  if (component.__config__.span !== 24) {
    return `<el-col :span="${component.__config__.span}">
      ${str}
    </el-col>`;
  }
  return str;
};

// 布局
const layouts = {
  colFormItem(component: ElementComponent) {
    const config = component.__config__;
    let labelWidth = "";
    const label = `label=${component.label}`;

    if (config.labelWidth && config.labelWidth !== globalConfig.labelWidth) {
      // 当前组件配置的labelWidth存在；并且和全局的labelWidth不一样（如果一样的话也就不需要再配置这里了）
      labelWidth = `label-width="${config.labelWidth}px"`;
    }
    const tagDom = tags[component.type] ? tags[component.type](component) : null;

    let str = `<el-form-item ${labelWidth} ${label} prop="${component.__vModel__}">
      ${tagDom}
    </el-form-item>`;
    str = colWrapper(component, str);
    return str;
  },
};

/**
 * 组装html代码。【入口函数】
 * @param {FormConfigTotalType} formData 整个表单的配置
 */
export const makeUpHtml = (formData: FormConfigTotalType) => {
  globalConfig = formData;
  const htmlList: string[] = [];
  // 遍历渲染每个组件的html
  formData.fileds.forEach(el => {
    htmlList.push(layouts[el.layout](el));
  });

  const htmlStr = htmlList.join("\n");
  // 将组件代码放进form标签
  const template = buildFormTemplate(formData, htmlStr);

  return template;
};

/**
 * 组装Form表单：外层包裹form
 *
 * @param {FormConfigTotalType} formData 整体表单配置
 * @param {string} children 内容
 */
const buildFormTemplate = (formData: FormConfigTotalType, children: string) => {
  const str = `<el-form ref="${formData.formRef}" :model="${formData.formModel}" label-width="${formData.labelWidth}px">
    ${children}
  </el-form>`;
  return str;
};
