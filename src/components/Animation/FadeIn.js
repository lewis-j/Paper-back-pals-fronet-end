import React from "react";
import styles from "./FadeIn.module.scss";

const FadeIn = ({ children, delay = 1000, duration = "1s" }) => {
  const _style = (index) => ({
    animationDelay: delay * index + "ms",
    animationDuration: duration,
  });

  if (Array.isArray(children)) {
    return children.map((child, i) => {
      return React.cloneElement(child, {
        style: _style(i),
        className: `${child.props.className} ${styles.fadeIn}`,
      });
    });
  }
  return React.cloneElement(children, {
    style: _style(1),
    className: `${children.props.className} ${styles.fadeIn}`,
  });
};

export default FadeIn;
