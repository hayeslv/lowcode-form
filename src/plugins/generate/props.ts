import { GenerateCodeType } from "~/types";

export const getProps = (pageType: GenerateCodeType) => {
  let propsCode: string | null = null;
  // TODO 目前只有dialog需要用到props.visible，这里先写死，以后再考虑动态化
  if (pageType === GenerateCodeType.Dialog) {
    propsCode = `props: {
        visible: { type: Boolean, default: false },
      }`;
  }
  return propsCode;
};
