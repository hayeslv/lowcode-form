import { createEvent } from "~/plugins";

export const enum EventName {
  DOWNLOAD_VUE_FILE_SHOW_DIALOG = "DownloadVueFileShowDialog", // 下载vue文件
}

const eventNameMap: Record<string, ReturnType<typeof createEvent>> = {};

export const useGlobalEvent = (name: string) => {
  if (!eventNameMap[name]) eventNameMap[name] = createEvent();
  return eventNameMap[name];
};
