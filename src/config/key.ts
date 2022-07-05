import type { InjectionKey } from "vue";
import type { IComponentMap } from "~/types";

export const configKey: InjectionKey<IComponentMap> = Symbol("config");
