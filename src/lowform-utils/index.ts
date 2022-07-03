import { Emiter } from "~/lowform-utils/Emiter";

export enum GlobalTopic {
  MenuCompDragStart,
  MenuCompDragEnd,
}

export const emiter = new Emiter();
