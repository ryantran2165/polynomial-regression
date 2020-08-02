import React, { Component } from "react";
import Title from "./components/title";
import Description from "./components/description";
import Myp5 from "./components/my-p5";
import Button from "./components/button";
import RangeInput from "./components/range-input";
import Label from "./components/label";
import Equation from "./components/equation";
import GradientDescent from "./logic/gradient-descent";
import GithubCorner from "react-github-corner";

const frameRate = 60;

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
    this.timer = setInterval(this.update, 1000 / frameRate);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  update = () => {
    let res = GradientDescent(
      this.state.weights,
      this.state.points,
      this.state.learningRate
    );
    this.setState({
      weights: res,
    });
  };

  clear = (e) => {
    e.target.blur();

    this.setState({
      weights: new Array(this.state.polynomialDegree + 1).fill(0),
      points: [],
    });
  };

  addPoint = (point) => {
    this.setState({
      points: [...this.state.points, point],
    });
  };

  updateLearningRate = (e) => {
    this.setState({ learningRate: Number(e.target.value) });
  };

  updatePolynomialDegree = (e) => {
    let degree = Number(e.target.value);

    this.setState({
      polynomialDegree: degree,
      weights: new Array(degree + 1).fill(0),
    });
  };

  render() {
    return (
      <div className="App container text-center pt-5">
        <div className="row">
          <div className="col">
            <Title text="Polynomial Regression" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Description
              text={
                "Demonstrates polynomial regression using gradient descent.\nClick to add points and watch the regression polynomial form.\nA high learning rate paired with a high polynomial degree may blow up the function."
              }
            />
          </div>
        </div>
        <div className="row justify-content-center pt-3">
          <div className="col col-lg-4">
            <div className="row">
              <div className="col">
                <RangeInput
                  min={0.01}
                  max={1}
                  step={0.01}
                  defaultValue={this.state.learningRate}
                  id="learningRate"
                  onChange={this.updateLearningRate}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Label text="Learning rate" value={this.state.learningRate} />
              </div>
            </div>
          </div>
          <div className="col col-lg-4">
            <div className="row">
              <div className="col">
                <RangeInput
                  min={0}
                  max={10}
                  step={1}
                  defaultValue={this.state.polynomialDegree}
                  id="polynomialDegree"
                  onChange={this.updatePolynomialDegree}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Label
                  text="Polynomial degree"
                  value={this.state.polynomialDegree}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <Button value="Clear" onClick={(e) => this.clear(e)} />
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <Myp5
              width={500}
              height={500}
              points={this.state.points}
              onClick={(point) => this.addPoint(point)}
              weights={this.state.weights}
            />
          </div>
        </div>
        <div className="row pb-5">
          <div className="col">
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
