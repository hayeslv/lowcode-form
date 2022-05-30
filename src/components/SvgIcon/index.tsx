import { computed, defineComponent } from "vue";
import "./index.scss";

// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export default defineComponent({
  name: "SvgIcon",
  props: {
    iconClass: { type: String, required: true },
    className: { type: String, default: "" },
  },
  setup(props) {
    const external = computed(() => isExternal(props.iconClass));
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => props.className ? `svg-icon ${props.className}` : "svg-icon");
    const styleExternalIcon = computed(() => ({
      mask: `url(${props.iconClass}) no-repeat 50% 50%`,
      "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`,
    }));

    return { external, iconName, svgClass, styleExternalIcon };
  },
  render() {
    return this.external
      ? <div style={this.styleExternalIcon} class="svg-external-icon svg-icon" {...this.$attrs}/>
      : <svg class={this.svgClass} aria-hidden="true" {...this.$attrs}>
        <use xlinkHref={this.iconName} />
      </svg>;
  },
});
