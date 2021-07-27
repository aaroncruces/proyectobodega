import React, { Component } from "react";

/**
 * spinner que muestra la carga de los datos de, y a la DB
 * todo: "fade in and out" en "lifecycle methods"
 * https://stackoverflow.com/questions/40064249/react-animate-mount-and-unmount-of-a-single-component
 */
export default class Throbber extends Component {
  render() {
    return <div className="spinner-border text-secondary" role="status"></div>;
  }
}
