import { SliderWithInputNotThrottled, ISliderWithInputProps } from "./SliderWithInputNotThrottled";
import throttleComponent from "utils/throttleComponent";

export default throttleComponent<ISliderWithInputProps, number>(SliderWithInputNotThrottled, "onChange", "value", 500);
