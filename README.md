# JS practice with mortgage calculator
Self-improved simple mortgage calculator based on video tutorial.
## Why this project was made
I have been interested in making a calculator with Javascript and studied one tutorial (https://www.youtube.com/watch?v=jQsFSKpk3dk).

I have reproduced the code and then I found several moments that I can improve.
## Improvments
- Long prices are now splited by triades (190 000₽).
- Number input and range input are now properly connected.
  - Before: Changing number inputs have no effect to the range input.
  - After: User can edit both inputs. Number input is limited with the same min and max values as range input.
- Reduced dependency of inputs count.
  - Before: Each value is assigned separately:
  ```javascript
  const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
  }
  ```
  - After: All input elements are collected by class in one two-dimensional array. Each of the field values is now assigned in a loop:
  ```javascript
  // Set number value to range value
  const assignNumberValue = () => {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i][1].value = inputs[i][0].value || inputs[i][1].min;
    }
  }
  ```
## [Demo page](https://heirat.github.io/mortgage_calculator_js/)

	
