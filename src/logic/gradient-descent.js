const GradientDescent = (weights, points, learningRate) => {
  for (let point of points) {
    // Calculate weighted sum, w[0] is always bias
    let guess = 0;
    for (let degree = 0; degree < weights.length; degree++) {
      guess += weights[degree] * Math.pow(point.x, degree);
    }

    // Calculate the error
    let error = guess - point.y;

    // Adjust weights
    for (let degree = 0; degree < weights.length; degree++) {
      weights[degree] -= error * Math.pow(point.x, degree) * learningRate;
    }
  }
  return weights;
};

export default GradientDescent;
