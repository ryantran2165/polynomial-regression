/**
 * Returns the new weights after applying one step of gradient descent.
 * @param {Array} weights Array of weights for each degree
 * @param {Array} points Array of p5.js points
 * @param {number} learningRate The learning rate
 * @return {Array} the new weights after applying one step of gradient descent
 */
export function gradientDescent(weights, points, learningRate) {
  for (const point of points) {
    let guess = 0;

    // Calculate weighted sum, w[0] is always bias
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
}
