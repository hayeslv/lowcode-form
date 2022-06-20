import { ElLoading } from "element-plus";
import loadScript from "./loadScript";
import pluginConfig from "./pluginConfig";

let beautifierObj;

export function loadBeautifier(cb) {
  const { beautifierUrl } = pluginConfig;
  if (beautifierObj) {
    cb(beautifierObj);
    return;
  }

  const loading = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "格式化资源加载中...",
    spinner: "el-icon-loading",
    background: "rgba(255,255,255,0.5",
  });

  loadScript(beautifierUrl, () => {
    loading.close();
    beautifierObj = (window as any).beautifier;
    cb(beautifierObj);
  });
}
