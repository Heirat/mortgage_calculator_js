# JS practice with mortgage calculator
Simple mortgage calculator based on video tutorial and self-improved.
## Why this project was made
I have been interested in how to do calculator with Javascript and researched one tutorial (https://www.youtube.com/watch?v=jQsFSKpk3dk).

I repeated the code and then I found several moments that I can improve.
## Improvments
- Long prices are splited by triades (190 000₽).
- Number input and range input are fully connected.
  - Was: Number input changing doesn't affect on range input.
  - Became: User can edit both inputs. Number input limited with the same min and max values as range input.
- Reduced dependency of inputs count.
  - Was: All range and number inputs are assigning manually.
  ```javascript
  const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
  }
  ```
  - Became: All input elements are collected by class in one two-dimensional array. Assignment function became independent of elements count.
  ```javascript
  // Set number value to range value
  const assignNumberValue = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i][1].value = inputs[i][0].value || inputs[i][1].min;
    }
  }
  ```
## [Demo page](https://heirat.github.io/mortgage_calculator_js/)
Thanks for watching!
	
