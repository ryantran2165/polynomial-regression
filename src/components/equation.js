import React from "react";
import PropTypes from "prop-types";

const Equation = ({ weights }) => {
  return <h5>y = {getExpression(weights)}</h5>;
};

/**
 * Returns the string or array of strings representing the equation.
 * @param {Array} weights The weights for each degree
 * @return {string | Array} The string or array of strings representing the equation
 */
const getExpression = (weights) => {
  let terms = [];

  for (let degree = 0; degree < weights.length; degree++) {
    // Format to 2 decimals
    let formattedWeight = format(weights[degree]);
    let formattedWeightAbs = Math.abs(formattedWeight);

    // Skip if weight is 0
    if (formattedWeightAbs !== 0) {
      // First term
      if (terms.length === 0) {
        // Negative
        if (formattedWeight < 0) {
          terms.push(<span key={degree + "0"}>-</span>);
        }
      } else {
        terms.push(
          <span key={degree + "1"}>{formattedWeight < 0 ? " - " : " + "}</span>
        );
      }

      // Term
      if (degree > 1) {
        if (formattedWeightAbs === 1) {
          terms.push(
            <span key={degree + "2"}>
              x<sup>{degree}</sup>
            </span>
          );
        } else {
          terms.push(
            <span key={degree + "3"}>
              {formattedWeightAbs}x<sup>{degree}</sup>
            </span>
          );
        }
      } else if (degree === 1) {
        if (formattedWeightAbs === 1) {
          terms.push(<span key={degree + "4"}>x</span>);
        } else {
          terms.push(<span key={degree + "5"}>{formattedWeightAbs}x</span>);
        }
      } else if (degree === 0) {
        terms.push(<span key={degree + "6"}>{formattedWeightAbs}</span>);
      }
    }
  }

  // All terms were 0, just return 0
  if (terms.length === 0) {
    return "0";
  }

  return terms;
};

/**
 * Returns the number rounded to two decimals.
 * @param {number} num The number to format
 * @return {number} the number rounded to two decimals
 */
const format = (num) => {
  return Math.round(num * 100) / 100;
};

Equation.defaultProps = {
  weights: [0],
};

Equation.propTypes = {
  weights: PropTypes.array,
};

export default Equation;
