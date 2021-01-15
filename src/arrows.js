"use strict";

import React from "react";
import classnames from "classnames";
import { canGoNext } from "./utils/innerSliderUtils";

/**
 * PrevArrow
 * @param {boolean} arrowVisibleFlag Arrows are hidden when not possible to scroll further or previous
 * @returns {JSX.Element} Returns null if arrowVisibleFlag is false
 */
export class PrevArrow extends React.PureComponent {
  clickHandler(options, e) {
    if (e) {
      e.preventDefault();
    }
    this.props.clickHandler(options, e);
  }
  render() {
    let prevClasses = { "slick-arrow": true, "slick-prev": true };
    let prevHandler = this.clickHandler.bind(this, { message: "previous" });

    if (
      !this.props.infinite &&
      (this.props.currentSlide === 0 ||
        this.props.slideCount <= this.props.slidesToShow)
    ) {
      prevClasses["slick-disabled"] = true;
      prevHandler = null;
      if (!this.props.arrowVisibleFlag) return null;
    }

    let prevArrowProps = {
      key: "0",
      "data-role": "none",
      className: classnames(prevClasses),
      style: { display: "block" },
      onClick: prevHandler
    };
    let customProps = {
      currentSlide: this.props.currentSlide,
      slideCount: this.props.slideCount
    };
    let prevArrow;

    if (this.props.prevArrow) {
      prevArrow = React.cloneElement(this.props.prevArrow, {
        ...prevArrowProps,
        ...customProps
      });
    } else {
      prevArrow = (
        <button key="0" type="button" {...prevArrowProps}>
          {" "}
          Previous
        </button>
      );
    }

    return prevArrow;
  }
}

/**
 * NextArrow
 *
 * @param {boolean} arrowVisibleFlag
 * @returns {JSX.Element} returns null if arrowVisibleFlag false
 */
export class NextArrow extends React.PureComponent {
  clickHandler(options, e) {
    if (e) {
      e.preventDefault();
    }
    this.props.clickHandler(options, e);
  }
  render() {
    let nextClasses = { "slick-arrow": true, "slick-next": true };
    let nextHandler = this.clickHandler.bind(this, { message: "next" });

    if (!canGoNext(this.props)) {
      nextClasses["slick-disabled"] = true;
      nextHandler = null;
      if (!this.props.arrowVisibleFlag) return null;
    }

    let nextArrowProps = {
      key: "1",
      "data-role": "none",
      className: classnames(nextClasses),
      style: { display: "block" },
      onClick: nextHandler
    };
    let customProps = {
      currentSlide: this.props.currentSlide,
      slideCount: this.props.slideCount
    };

    let nextArrow;

    if (this.props.nextArrow) {
      nextArrow = React.cloneElement(this.props.nextArrow, {
        ...nextArrowProps,
        ...customProps
      });
    } else {
      nextArrow = (
        <button key="1" type="button" {...nextArrowProps}>
          {" "}
          Next
        </button>
      );
    }

    return nextArrow;
  }
}
