import type { DatePickType } from "element-plus";
import type { FormNode, FormSelectNode, FormTimeNode } from "~/lowform-meta/instance/Node";
import { EOptionsDataType } from "~/lowform-meta/type";

// 选择型组件事件
export const selectMethods = {
  removeSelectOptions(node: FormNode, value: any) {
    const index = node.instance.options!.findIndex(v => v.value === value);
    node.instance.options?.splice(index, 1);
  },
  addSelectOption(node: FormNode) {
    node.instance.options?.push({ label: "", value: "" });
  },
  // 更新动态选项数据
  async updateDynamicOptions(node: FormSelectNode) {
    const instance = node!.instance;
    if (!instance.optionsDataType || instance.optionsDataType === EOptionsDataType.STATIC) return;
    try {
      const res = await fetch(instance.optionsUrl!, { method: instance.optionsUrlMethod });
      const json = await res.json();
      if (!json || json.code) throw new Error("没有数据");
      instance.reqOptions = json;
    } catch (error) {
      console.log(error);
      instance.reqOptions = [];
    }
  },
};

// 日期型组件事件
export const dateMethods = {
  dateTypeChange(node: FormTimeNode, newVal: DatePickType) {
    const instance = node.instance;
    switch (newVal) {
      case "date": {
        instance.format = "YYYY-MM-DD";
        instance.valueFormat = "YYYY-MM-DD";
        break;
      }
      case "daterange": {
        instance.format = "YYYY-MM-DD";
        instance.valueFormat = "YYYY-MM-DD";
        break;
      }
      case "week": {
        instance.format = "YYYY年第ww周";
        instance.valueFormat = "YYYY-MM-DD";
        break;
      }
      case "month": {
        instance.format = "YYYY-MM";
        instance.valueFormat = "YYYY-MM";
        break;
      }
      case "monthrange": {
        instance.format = "YYYY-MM";
        instance.valueFormat = "YYYY-MM";
        break;
      }
      case "year": {
        instance.format = "YYYY";
        instance.valueFormat = "YYYY";
        break;
      }
      case "datetime": {
        instance.format = "YYYY-MM-DD HH:mm:ss";
        instance.valueFormat = "YYYY-MM-DD HH:mm:ss";
        break;
      }
      case "datetimerange": {
        instance.format = "YYYY-MM-DD HH:mm:ss";
        instance.valueFormat = "YYYY-MM-DD HH:mm:ss";
        break;
      }
    }
  },
};

// 规则事件
export const ruleMethods = {
  addRule(node: FormNode) {
    node.instance.regList.push({ pattern: "", message: "", trigger: "blur" });
  },
};
