import React, { Component } from "react";
import p5 from "p5";
import PropTypes from "prop-types";

class Myp5 extends Component {
  componentDidMount() {
    this.newSketch();
    window.addEventListener("resize", this.newSketch);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.newSketch);
  }

  newSketch = () => {
    // If sketch already exists, remove it to add a new one
    if (this.hasOwnProperty("myp5")) {
      this.myp5.remove();
    }

    // Adds property myp5
    this.myp5 = new p5((sketch) => {
      sketch.setup = () => {
        let width = Math.min(this.props.width, window.innerWidth * 0.8);
        let height = this.props.isSquare
          ? width
          : Math.min(this.props.height, window.innerHeight * 0.8);
        sketch.createCanvas(width, height);
      };

      sketch.draw = () => {
        sketch.background("#d3d3d3");
        drawPoints();
        drawPolynomial();
      };

      /**
       * Draws the points on the sketch.
       */
      const drawPoints = () => {
        sketch.fill("#7fffd4");
        sketch.stroke("#222");
        sketch.strokeWeight(2);

        for (const point of this.props.points) {
          const pointSize = 8;
          sketch.ellipse(
            dataToScreenX(point.x),
            dataToScreenY(point.y),
            pointSize,
            pointSize
          );
        }
      };

      /**
       * Draws the polynomial on the sketch.
       */
      const drawPolynomial = () => {
        sketch.stroke("#7fffd4");
        sketch.strokeWeight(3);

        // Create points
        let increment = 10;
        let polynomialPoints = [];
        for (
          let screenX = 0;
          screenX <= sketch.width + increment;
          screenX += increment
        ) {
          let dataX = screenToDataX(screenX);
          let dataY = 0;

          // Weighted sum polynomial
          for (let degree = 0; degree < this.props.weights.length; degree++) {
            dataY += this.props.weights[degree] * Math.pow(dataX, degree);
          }

          // Add new point
          polynomialPoints.push(sketch.createVector(dataX, dataY));
        }

        // Draw lines between each point
        for (let i = 0; i < polynomialPoints.length - 1; i++) {
          let p1 = polynomialPoints[i];
          let p2 = polynomialPoints[i + 1];
          sketch.line(
            dataToScreenX(p1.x),
            dataToScreenY(p1.y),
            dataToScreenX(p2.x),
            dataToScreenY(p2.y)
          );
        }
      };

      sketch.mouseClicked = () => {
        if (
          sketch.mouseX > 0 &&
          sketch.mouseX < sketch.width &&
          sketch.mouseY > 0 &&
          sketch.mouseY < sketch.height
        ) {
          this.props.onClick(
            sketch.createVector(
              screenToDataX(sketch.mouseX),
              screenToDataY(sketch.mouseY)
            )
          );
        }
      };

      /**
       * Returns the x-coordinate scaled between 0 and 1.
       * @param {number} screenX Screen x-coordinate
       * @return {number} the x-coordinate scaled between 0 and 1
       */
      const screenToDataX = (screenX) => {
        return screenX / sketch.width;
      };

      /**
       * Returns the y-coordinate scaled between 0 and 1.
       * @param {number} screenY Screen x-coordinate
       * @return {number} the y-coordinate scaled between 0 and 1
       */
      const screenToDataY = (screenY) => {
        return (sketch.height - screenY) / sketch.height;
      };

      /**
       * Returns the x-coordinate scaled to the screen coordinate.
       * @param {number} dataX Data x-coordinate
       * @return {number} the x-coordinate scaled to the screen coordinate
       */
      const dataToScreenX = (dataX) => {
        return dataX * sketch.width;
      };

      /**
       * Returns the y-coordinate scaled to the screen coordinate.
       * @param {number} dataY Data y-coordinate
       * @return {number} the y-coordinate scaled to the screen coordinate
       */
      const dataToScreenY = (dataY) => {
        return sketch.height - dataY * sketch.height;
      };
    }, "p5sketch");
  };

  render() {
    return <div id="p5sketch"></div>;
  }
}

Myp5.defaultProps = {
  width: 100,
  height: 100,
  point: [],
  weights: [0],
  isSquare: true,
};

Myp5.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  points: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  weights: PropTypes.array,
  isSquare: PropTypes.bool,
};

export default Myp5;
