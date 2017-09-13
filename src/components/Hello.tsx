import * as React from "react";
import * as styles from "./Hello.css";

export interface HelloProps { compiler: string; framework: string; }

export const Hello = (props: HelloProps) =>
  <h1 className={styles.foo}>Test1? {props.compiler} and {props.framework}!</h1>;
