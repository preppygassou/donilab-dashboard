"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/routes.ts":
/*!***********************!*\
  !*** ./src/routes.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DEFAULT_LOGIN_REDIRECT: () => (/* binding */ DEFAULT_LOGIN_REDIRECT),\n/* harmony export */   apiAuthPrefix: () => (/* binding */ apiAuthPrefix),\n/* harmony export */   authRoutes: () => (/* binding */ authRoutes),\n/* harmony export */   publicRoutes: () => (/* binding */ publicRoutes)\n/* harmony export */ });\n/**\n * An array of routes that are accessible to the public\n * These routes do not require authentication\n * @type {string[]}\n */ const publicRoutes = [\n    \"/error\",\n    \"/auth/verify/[id]/[token]\",\n    \"/auth/verify\"\n];\n/**\n * An array of routes that are used for authentication\n * These routes will redirect logged in users to /settings\n * @type {string[]}\n */ const authRoutes = [\n    \"/\",\n    \"/auth/login\",\n    \"/auth/error\",\n    \"/auth/reset-password/[token]\",\n    \"/auth/forgot-password\"\n];\n/**\n * The prefix for API authentication routes\n * Routes that start with this prefix are used for API authentication purposes\n * @type {string}\n */ const apiAuthPrefix = \"/api/auth\";\n/**\n * The default redirect path after logging in\n * @type {string}\n */ const DEFAULT_LOGIN_REDIRECT = \"/dashboard\";\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL3JvdXRlcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Q0FJQyxHQUNNLE1BQU1BLGVBQWU7SUFDMUI7SUFDQTtJQUNBO0NBQ0QsQ0FBQztBQUVGOzs7O0NBSUMsR0FDTSxNQUFNQyxhQUFhO0lBQ3hCO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7Q0FDRCxDQUFDO0FBRUY7Ozs7Q0FJQyxHQUNNLE1BQU1DLGdCQUFnQixZQUFZO0FBRXpDOzs7Q0FHQyxHQUNNLE1BQU1DLHlCQUF5QixhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9yb3V0ZXMudHM/YzljMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEFuIGFycmF5IG9mIHJvdXRlcyB0aGF0IGFyZSBhY2Nlc3NpYmxlIHRvIHRoZSBwdWJsaWNcbiAqIFRoZXNlIHJvdXRlcyBkbyBub3QgcmVxdWlyZSBhdXRoZW50aWNhdGlvblxuICogQHR5cGUge3N0cmluZ1tdfVxuICovXG5leHBvcnQgY29uc3QgcHVibGljUm91dGVzID0gW1xuICBcIi9lcnJvclwiLFxuICBcIi9hdXRoL3ZlcmlmeS9baWRdL1t0b2tlbl1cIixcbiAgXCIvYXV0aC92ZXJpZnlcIixcbl07XG5cbi8qKlxuICogQW4gYXJyYXkgb2Ygcm91dGVzIHRoYXQgYXJlIHVzZWQgZm9yIGF1dGhlbnRpY2F0aW9uXG4gKiBUaGVzZSByb3V0ZXMgd2lsbCByZWRpcmVjdCBsb2dnZWQgaW4gdXNlcnMgdG8gL3NldHRpbmdzXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKi9cbmV4cG9ydCBjb25zdCBhdXRoUm91dGVzID0gW1xuICBcIi9cIixcbiAgXCIvYXV0aC9sb2dpblwiLFxuICBcIi9hdXRoL2Vycm9yXCIsXG4gIFwiL2F1dGgvcmVzZXQtcGFzc3dvcmQvW3Rva2VuXVwiLFxuICBcIi9hdXRoL2ZvcmdvdC1wYXNzd29yZFwiXG5dO1xuXG4vKipcbiAqIFRoZSBwcmVmaXggZm9yIEFQSSBhdXRoZW50aWNhdGlvbiByb3V0ZXNcbiAqIFJvdXRlcyB0aGF0IHN0YXJ0IHdpdGggdGhpcyBwcmVmaXggYXJlIHVzZWQgZm9yIEFQSSBhdXRoZW50aWNhdGlvbiBwdXJwb3Nlc1xuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGFwaUF1dGhQcmVmaXggPSBcIi9hcGkvYXV0aFwiO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHJlZGlyZWN0IHBhdGggYWZ0ZXIgbG9nZ2luZyBpblxuICogQHR5cGUge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IERFRkFVTFRfTE9HSU5fUkVESVJFQ1QgPSBcIi9kYXNoYm9hcmRcIjsiXSwibmFtZXMiOlsicHVibGljUm91dGVzIiwiYXV0aFJvdXRlcyIsImFwaUF1dGhQcmVmaXgiLCJERUZBVUxUX0xPR0lOX1JFRElSRUNUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(middleware)/./src/routes.ts\n");

/***/ })

});