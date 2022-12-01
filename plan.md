To compute function will be modified in the following ways to handle the  `&`,  `CONCAT`, and  `SUBSTITUTE` formulas:
* **&**: This function will be executed only if the previous and next values are of type string. We will then merge the strings using the "+" operator.
* **CONCAT**: Use a reducer that checks for string values and use the **&** operator to merge the strings. 
	* Note: We could also use the existing `concat()` method JavaScript provides.
* **SUBSTITUTE**: We will use the method `replace()` that Javascript provides for strings.

The values must be of type `function`. We don't want to confuse a **"&"** of type `string` with a **"&"** of type `function`.
