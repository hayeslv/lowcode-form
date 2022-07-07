import type { ComputedRef, InjectionKey } from "vue";
import type { IComponentMap } from "~/types";

export const configKey: InjectionKey<ComputedRef<IComponentMap>> = Symbol("config");
