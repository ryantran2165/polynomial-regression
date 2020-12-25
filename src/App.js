import React, { Component } from "react";
import Myp5 from "./components/my-p5";
import Button from "./components/button";
import Equation from "./components/equation";
import { gradientDescent } from "./logic/gradient-descent";
import GithubCorner from "react-github-corner";

const FRAME_RATE = 60;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weights: [0],
      points: [],
      learningRate: 0.25,
      polynomialDegree: 0,
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.update, 1000 / FRAME_RATE);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * Performs gradient descent and updates the weights.
   */
  update = () => {
    let res = gradientDescent(
      this.state.weights,
      this.state.points,
      this.state.learningRate
    );
    this.setState({
      weights: res,
    });
  };

  /**
   * Clears the screen, resets the weights and points.
   */
  handleOnClickClear = () => {
    this.setState({
      weights: new Array(this.state.polynomialDegree + 1).fill(0),
      points: [],
    });
  };

  /**
   * Adds the point.
   * @param {Object} point The p5.js point to add
   */
  addPoint = (point) => {
    this.setState({
      points: [...this.state.points, point],
    });
  };

  /**
   * Updates the learning rate.
   * @param {Object} e The event object
   */
  handleOnChangeLearningRate = (e) => {
    this.setState({ learningRate: Number(e.target.value) });
  };

  /**
   * Updates the polynomial degree.
   * @param {Object} e The event object
   */
  handleOnChangePolynomialDegree = (e) => {
    let degree = Number(e.target.value);

    this.setState({
      polynomialDegree: degree,
      weights: new Array(degree + 1).fill(0),
    });
  };

  render() {
    return (
      <div className="App container text-center py-5">
        <div className="row">
          <div className="col">
            <h1 className="font-weight-bold">Polynomial Regression</h1>
            <h5>
              Performs and graphs polynomial regression using gradient descent.
              <br />A high learning rate and polynomial degree may cause the
              function to explode.
            </h5>
            <div className="row justify-content-center pt-3">
              <div className="col col-lg-4">
                <input
                  type="range"
                  min={0.01}
                  max={1}
                  step={0.01}
                  defaultValue={this.state.learningRate}
                  id="learningRate"
                  onChange={this.handleOnChangeLearningRate}
                />
                <h5>Learning rate: {this.state.learningRate}</h5>
              </div>
              <div className="col col-lg-4">
                <input
                  type="range"
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={this.state.polynomialDegree}
                  id="polynomialDegree"
                  onChange={this.handleOnChangePolynomialDegree}
                />
                <h5>Polynomial degree: {this.state.polynomialDegree}</h5>
              </div>
            </div>
            <div className="pt-3">
              <Button value="Clear" onClick={this.handleOnClickClear} />
            </div>
            <div className="pt-3">
              <Myp5
                width={500}
                height={500}
                points={this.state.points}
                onClick={(point) => this.addPoint(point)}
                weights={this.state.weights}
              />
            </div>
            <Equation weights={this.state.weights} />
          </div>
        </div>
        <GithubCorner
          href="https://github.com/ryantran2165/polynomial-regression"
          bannerColor="#222"
          octoColor="#7fffd4"
          target="_blank"
        />
      </div>
    );
  }
}

export default App;
