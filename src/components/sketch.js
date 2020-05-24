import React, { Component } from "react";
import p5 from "p5";
import PropTypes from "prop-types";

class Sketch extends Component {
  constructor(props) {
    super(props);
    this.renderRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("resize", this.newSketch);
    this.newSketch();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.newSketch);
  }

  newSketch = () => {
    if (this.hasOwnProperty("sketch")) {
      this.sketch.remove();
    }

    this.sketch = new p5((p) => {
      p.setup = () => {
        let width = Math.min(this.props.width, window.innerWidth * 0.8);
        let height = this.props.isSquare
          ? width
          : Math.min(this.props.height, window.innerHeight * 0.8);
        p.createCanvas(width, height).parent(this.renderRef.current);
      };

      p.draw = () => {
        p.background("#d3d3d3");
        drawPoints();
        drawPolynomial();
      };

      let drawPoints = () => {
        p.fill("#7fffd4");
        p.stroke("#222");
        p.strokeWeight(2);

        for (let point of this.props.points) {
          const pointSize = 8;
          p.ellipse(
            dataToScreenX(point.x),
            dataToScreenY(point.y),
            pointSize,
            pointSize
          );
        }
      };

      const drawPolynomial = () => {
        p.stroke("#7fffd4");
        p.strokeWeight(3);

        // Create points
        let increment = 10;
        let polynomialPoints = [];
        for (
          let screenX = 0;
          screenX <= p.width + increment;
          screenX += increment
        ) {
          let dataX = screenToDataX(screenX);
          let dataY = 0;

          // Weighted sum polynomial
          for (let degree = 0; degree < this.props.weights.length; degree++) {
            dataY += this.props.weights[degree] * Math.pow(dataX, degree);
          }

          // Add new point
          polynomialPoints.push(p.createVector(dataX, dataY));
        }

        // Draw lines between each point
        for (let i = 0; i < polynomialPoints.length - 1; i++) {
          let p1 = polynomialPoints[i];
          let p2 = polynomialPoints[i + 1];
          p.line(
            dataToScreenX(p1.x),
            dataToScreenY(p1.y),
            dataToScreenX(p2.x),
            dataToScreenY(p2.y)
          );
        }
      };

      p.mouseClicked = () => {
        if (
          p.mouseX > 0 &&
          p.mouseX < p.width &&
          p.mouseY > 0 &&
          p.mouseY < p.height
        ) {
          this.props.onClick(
            p.createVector(screenToDataX(p.mouseX), screenToDataY(p.mouseY))
          );
        }
      };

      const screenToDataX = (screenX) => {
        return screenX / p.width;
      };

      const screenToDataY = (screenY) => {
        return (p.height - screenY) / p.height;
      };

      const dataToScreenY = (dataY) => {
        return p.height - dataY * p.height;
      };

      const dataToScreenX = (dataX) => {
        return dataX * p.width;
      };
    });
  };

  render() {
    return <div ref={this.renderRef}></div>;
  }
}

Sketch.defaultProps = {
  width: 100,
  height: 100,
  point: [],
  weights: [0],
  isSquare: true,
};

Sketch.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  points: PropTypes.array,
  onClick: PropTypes.func.isRequired,
  weights: PropTypes.array,
  isSquare: PropTypes.bool,
};

export default Sketch;
