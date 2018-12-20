import { SliderWithValueNotThrottled, ISliderWithValueProps } from "./SliderWithValueNotThrottled";
import throttleComponent from "utils/throttleComponent";

export default throttleComponent<ISliderWithValueProps, number>(SliderWithValueNotThrottled, "onChange", "value", 500);
