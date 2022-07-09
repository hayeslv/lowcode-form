import type { ComputedRef, InjectionKey } from "vue";
import type { IComponentMap } from "~/types";

export const configKey: InjectionKey<ComputedRef<IComponentMap>> = Symbol("config");

export const enum EventName {
  NodeListUpdate = "NodeListUpdate",
  FormConfigUpdate = "FormConfigUpdate",
  ActiveNodeUpdate = "ActiveNodeUpdate",
}
