import { VerticalSliderNotThrottled, IVerticalSliderProps } from "./NotThrottledVerticalSlider";
import throttleComponent from "utils/throttleComponent";

export default throttleComponent<IVerticalSliderProps, number>(VerticalSliderNotThrottled, "onChange", "value", 500);
