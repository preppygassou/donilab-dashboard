"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(protected)/site/[siteId]/posts/page",{

/***/ "(app-pages-browser)/./src/hooks/usePosts.ts":
/*!*******************************!*\
  !*** ./src/hooks/usePosts.ts ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useCreatePost: function() { return /* binding */ useCreatePost; },\n/* harmony export */   useDeletePost: function() { return /* binding */ useDeletePost; },\n/* harmony export */   usePost: function() { return /* binding */ usePost; },\n/* harmony export */   usePosts: function() { return /* binding */ usePosts; },\n/* harmony export */   useUpdatePost: function() { return /* binding */ useUpdatePost; }\n/* harmony export */ });\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/useQuery.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js\");\n/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tanstack/react-query */ \"(app-pages-browser)/./node_modules/@tanstack/react-query/build/modern/useMutation.js\");\n/* harmony import */ var _services_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/services/api */ \"(app-pages-browser)/./src/services/api.ts\");\n\n\nfunction usePosts() {\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({\n        queryKey: [\n            \"posts\"\n        ],\n        queryFn: async ()=>{\n            const { data } = await _services_api__WEBPACK_IMPORTED_MODULE_0__.api.get(\"/posts\");\n            return data;\n        }\n    });\n}\nfunction usePost(id) {\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_1__.useQuery)({\n        queryKey: [\n            \"posts\",\n            id\n        ],\n        queryFn: async ()=>{\n            const { data } = await _services_api__WEBPACK_IMPORTED_MODULE_0__.api.get(\"/posts/\".concat(id));\n            return data;\n        }\n    });\n}\nfunction useCreatePost() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: async (postData)=>{\n            const { data } = await _services_api__WEBPACK_IMPORTED_MODULE_0__.api.post(\"/posts\", postData, {\n            });\n            return data;\n        },\n        onSuccess: ()=>{\n            queryClient.invalidateQueries({\n                queryKey: [\n                    \"posts\"\n                ]\n            });\n        }\n    });\n}\nfunction useUpdatePost() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: async (param)=>{\n            let { id, ...postData } = param;\n            const { data } = await _services_api__WEBPACK_IMPORTED_MODULE_0__.api.put(\"/posts/\".concat(id), postData, {\n            });\n            return data;\n        },\n        onSuccess: ()=>{\n            queryClient.invalidateQueries({\n                queryKey: [\n                    \"posts\"\n                ]\n            });\n        }\n    });\n}\nfunction useDeletePost() {\n    const queryClient = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_2__.useQueryClient)();\n    return (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_3__.useMutation)({\n        mutationFn: async (id)=>{\n            await _services_api__WEBPACK_IMPORTED_MODULE_0__.api.delete(\"/posts/\".concat(id));\n        },\n        onSuccess: ()=>{\n            queryClient.invalidateQueries({\n                queryKey: [\n                    \"posts\"\n                ]\n            });\n        }\n    });\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9ob29rcy91c2VQb3N0cy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEU7QUFDMUM7QUFFN0IsU0FBU0k7SUFDZCxPQUFPSiwrREFBUUEsQ0FBQztRQUNkSyxVQUFVO1lBQUM7U0FBUTtRQUNuQkMsU0FBUztZQUNQLE1BQU0sRUFBRUMsSUFBSSxFQUFFLEdBQUcsTUFBTUosOENBQUdBLENBQUNLLEdBQUcsQ0FBQztZQUMvQixPQUFPRDtRQUNUO0lBQ0Y7QUFDRjtBQUVPLFNBQVNFLFFBQVFDLEVBQVU7SUFDaEMsT0FBT1YsK0RBQVFBLENBQUM7UUFDZEssVUFBVTtZQUFDO1lBQVNLO1NBQUc7UUFDdkJKLFNBQVM7WUFDUCxNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHLE1BQU1KLDhDQUFHQSxDQUFDSyxHQUFHLENBQUMsVUFBYSxPQUFIRTtZQUN6QyxPQUFPSDtRQUNUO0lBQ0Y7QUFDRjtBQUVPLFNBQVNJO0lBQ2QsTUFBTUMsY0FBY1YscUVBQWNBO0lBQ2xDLE9BQU9ELGtFQUFXQSxDQUFDO1FBQ2pCWSxZQUFZLE9BQU9DO1lBQ2pCLE1BQU0sRUFBRVAsSUFBSSxFQUFFLEdBQUcsTUFBTUosOENBQUdBLENBQUNZLElBQUksQ0FBQyxVQUFVRCxVQUFVO1lBRXBEO1lBQ0EsT0FBT1A7UUFDVDtRQUNBUyxXQUFXO1lBQ1RKLFlBQVlLLGlCQUFpQixDQUFDO2dCQUFFWixVQUFVO29CQUFDO2lCQUFRO1lBQUM7UUFDdEQ7SUFDRjtBQUNGO0FBRU8sU0FBU2E7SUFDZCxNQUFNTixjQUFjVixxRUFBY0E7SUFDbEMsT0FBT0Qsa0VBQVdBLENBQUM7UUFDakJZLFlBQVk7Z0JBQU8sRUFBRUgsRUFBRSxFQUFFLEdBQUdJLFVBQWU7WUFDekMsTUFBTSxFQUFFUCxJQUFJLEVBQUUsR0FBRyxNQUFNSiw4Q0FBR0EsQ0FBQ2dCLEdBQUcsQ0FBQyxVQUFhLE9BQUhULEtBQU1JLFVBQVU7WUFFekQ7WUFDQSxPQUFPUDtRQUNUO1FBQ0FTLFdBQVc7WUFDVEosWUFBWUssaUJBQWlCLENBQUM7Z0JBQUVaLFVBQVU7b0JBQUM7aUJBQVE7WUFBQztRQUN0RDtJQUNGO0FBQ0Y7QUFFTyxTQUFTZTtJQUNkLE1BQU1SLGNBQWNWLHFFQUFjQTtJQUNsQyxPQUFPRCxrRUFBV0EsQ0FBQztRQUNqQlksWUFBWSxPQUFPSDtZQUNqQixNQUFNUCw4Q0FBR0EsQ0FBQ2tCLE1BQU0sQ0FBQyxVQUFhLE9BQUhYO1FBQzdCO1FBQ0FNLFdBQVc7WUFDVEosWUFBWUssaUJBQWlCLENBQUM7Z0JBQUVaLFVBQVU7b0JBQUM7aUJBQVE7WUFBQztRQUN0RDtJQUNGO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2hvb2tzL3VzZVBvc3RzLnRzP2Y2M2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlUXVlcnksIHVzZU11dGF0aW9uLCB1c2VRdWVyeUNsaWVudCB9IGZyb20gJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSc7XG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAL3NlcnZpY2VzL2FwaSdcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZVBvc3RzKCkge1xuICByZXR1cm4gdXNlUXVlcnkoe1xuICAgIHF1ZXJ5S2V5OiBbJ3Bvc3RzJ10sXG4gICAgcXVlcnlGbjogYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBhcGkuZ2V0KCcvcG9zdHMnKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlUG9zdChpZDogbnVtYmVyKSB7XG4gIHJldHVybiB1c2VRdWVyeSh7XG4gICAgcXVlcnlLZXk6IFsncG9zdHMnLCBpZF0sXG4gICAgcXVlcnlGbjogYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBhcGkuZ2V0KGAvcG9zdHMvJHtpZH1gKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlQ3JlYXRlUG9zdCgpIHtcbiAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICByZXR1cm4gdXNlTXV0YXRpb24oe1xuICAgIG11dGF0aW9uRm46IGFzeW5jIChwb3N0RGF0YTogRm9ybURhdGEpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXBpLnBvc3QoJy9wb3N0cycsIHBvc3REYXRhLCB7XG4gICAgICAgIC8qICAqL1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9LFxuICAgIG9uU3VjY2VzczogKCkgPT4ge1xuICAgICAgcXVlcnlDbGllbnQuaW52YWxpZGF0ZVF1ZXJpZXMoeyBxdWVyeUtleTogWydwb3N0cyddIH0pO1xuICAgIH0sXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlVXBkYXRlUG9zdCgpIHtcbiAgY29uc3QgcXVlcnlDbGllbnQgPSB1c2VRdWVyeUNsaWVudCgpO1xuICByZXR1cm4gdXNlTXV0YXRpb24oe1xuICAgIG11dGF0aW9uRm46IGFzeW5jICh7IGlkLCAuLi5wb3N0RGF0YSB9OiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXBpLnB1dChgL3Bvc3RzLyR7aWR9YCwgcG9zdERhdGEsIHtcbiAgICAgICAgLyogICovXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG4gICAgb25TdWNjZXNzOiAoKSA9PiB7XG4gICAgICBxdWVyeUNsaWVudC5pbnZhbGlkYXRlUXVlcmllcyh7IHF1ZXJ5S2V5OiBbJ3Bvc3RzJ10gfSk7XG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VEZWxldGVQb3N0KCkge1xuICBjb25zdCBxdWVyeUNsaWVudCA9IHVzZVF1ZXJ5Q2xpZW50KCk7XG4gIHJldHVybiB1c2VNdXRhdGlvbih7XG4gICAgbXV0YXRpb25GbjogYXN5bmMgKGlkOiBudW1iZXIpID0+IHtcbiAgICAgIGF3YWl0IGFwaS5kZWxldGUoYC9wb3N0cy8ke2lkfWApO1xuICAgIH0sXG4gICAgb25TdWNjZXNzOiAoKSA9PiB7XG4gICAgICBxdWVyeUNsaWVudC5pbnZhbGlkYXRlUXVlcmllcyh7IHF1ZXJ5S2V5OiBbJ3Bvc3RzJ10gfSk7XG4gICAgfSxcbiAgfSk7XG59Il0sIm5hbWVzIjpbInVzZVF1ZXJ5IiwidXNlTXV0YXRpb24iLCJ1c2VRdWVyeUNsaWVudCIsImFwaSIsInVzZVBvc3RzIiwicXVlcnlLZXkiLCJxdWVyeUZuIiwiZGF0YSIsImdldCIsInVzZVBvc3QiLCJpZCIsInVzZUNyZWF0ZVBvc3QiLCJxdWVyeUNsaWVudCIsIm11dGF0aW9uRm4iLCJwb3N0RGF0YSIsInBvc3QiLCJvblN1Y2Nlc3MiLCJpbnZhbGlkYXRlUXVlcmllcyIsInVzZVVwZGF0ZVBvc3QiLCJwdXQiLCJ1c2VEZWxldGVQb3N0IiwiZGVsZXRlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/hooks/usePosts.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/services/api.ts":
/*!*****************************!*\
  !*** ./src/services/api.ts ***!
  \*****************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   api: function() { return /* binding */ api; },\n/* harmony export */   apiOnServer: function() { return /* binding */ apiOnServer; }\n/* harmony export */ });\n/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./axios */ \"(app-pages-browser)/./src/services/axios.ts\");\n\nconst api = (0,_axios__WEBPACK_IMPORTED_MODULE_0__.getAPIClient)();\nconst apiOnServer = (0,_axios__WEBPACK_IMPORTED_MODULE_0__.getAPIServer)();\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zZXJ2aWNlcy9hcGkudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQW9EO0FBRTdDLE1BQU1FLE1BQU1GLG9EQUFZQSxHQUFFO0FBQzFCLE1BQU1HLGNBQWNGLG9EQUFZQSxHQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9zZXJ2aWNlcy9hcGkudHM/OTU2ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRBUElDbGllbnQgLGdldEFQSVNlcnZlcn0gZnJvbSBcIi4vYXhpb3NcIjtcblxuZXhwb3J0IGNvbnN0IGFwaSA9IGdldEFQSUNsaWVudCgpXG5leHBvcnQgY29uc3QgYXBpT25TZXJ2ZXIgPSBnZXRBUElTZXJ2ZXIoKVxuIl0sIm5hbWVzIjpbImdldEFQSUNsaWVudCIsImdldEFQSVNlcnZlciIsImFwaSIsImFwaU9uU2VydmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/services/api.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/services/axios.ts":
/*!*******************************!*\
  !*** ./src/services/axios.ts ***!
  \*******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getAPIClient: function() { return /* binding */ getAPIClient; },\n/* harmony export */   getAPIServer: function() { return /* binding */ getAPIServer; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"(app-pages-browser)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nookies */ \"(app-pages-browser)/./node_modules/nookies/dist/index.js\");\n/* harmony import */ var nookies__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nookies__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction getAPIClient() {\n    const token = nookies__WEBPACK_IMPORTED_MODULE_0___default().get(null)[\"donilabauth.token\"];\n    const api = axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n        baseURL: \"\".concat(\"http://localhost:3334/api\")\n    });\n    api.interceptors.request.use((config)=>{\n        return config;\n    });\n    if (token) {\n        api.defaults.headers[\"Authorization\"] = \"Bearer \".concat(token);\n    }\n    return api;\n}\nfunction getAPIServer() {\n    const token = nookies__WEBPACK_IMPORTED_MODULE_0___default().get(null)[\"donilabauth.token\"];\n    const api = axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].create({\n        baseURL: \"\".concat(\"http://localhost:3334/api\")\n    });\n    api.interceptors.request.use((config)=>{\n        return config;\n    });\n    if (token) {\n        api.defaults.headers[\"Authorization\"] = \"Bearer \".concat(token);\n    }\n    return api;\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9zZXJ2aWNlcy9heGlvcy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUEwQjtBQUNJO0FBRXZCLFNBQVNFO0lBQ2QsTUFBTUMsUUFBUUYsa0RBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CO0lBRXBELE1BQU1JLE1BQU1MLDZDQUFLQSxDQUFDTSxNQUFNLENBQUM7UUFDdkJDLFNBQVMsR0FBa0MsT0FBL0JDLDJCQUE4QjtJQUM1QztJQUVBSCxJQUFJTSxZQUFZLENBQUNDLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDQyxDQUFBQTtRQUMzQixPQUFPQTtJQUNUO0lBRUEsSUFBSVgsT0FBTztRQUNURSxJQUFJVSxRQUFRLENBQUNDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxVQUFnQixPQUFOYjtJQUNwRDtJQUVBLE9BQU9FO0FBQ1Q7QUFDTyxTQUFTWTtJQUNkLE1BQU1kLFFBQVFGLGtEQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQjtJQUVwRCxNQUFNSSxNQUFNTCw2Q0FBS0EsQ0FBQ00sTUFBTSxDQUFDO1FBQ3ZCQyxTQUFTLEdBQWtDLE9BQS9CQywyQkFBOEI7SUFDNUM7SUFFQUgsSUFBSU0sWUFBWSxDQUFDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0MsQ0FBQUE7UUFDM0IsT0FBT0E7SUFDVDtJQUVBLElBQUlYLE9BQU87UUFDVEUsSUFBSVUsUUFBUSxDQUFDQyxPQUFPLENBQUMsZ0JBQWdCLEdBQUcsVUFBZ0IsT0FBTmI7SUFDcEQ7SUFFQSxPQUFPRTtBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9zZXJ2aWNlcy9heGlvcy50cz8xZThmIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcyBmcm9tIFwiYXhpb3NcIjtcbmltcG9ydCBub29raWVzIGZyb20gXCJub29raWVzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRBUElDbGllbnQoKSB7XG4gIGNvbnN0IHRva2VuID0gbm9va2llcy5nZXQobnVsbClbJ2RvbmlsYWJhdXRoLnRva2VuJ107XG4gXG4gIGNvbnN0IGFwaSA9IGF4aW9zLmNyZWF0ZSh7XG4gICAgYmFzZVVSTDogYCR7cHJvY2Vzcy5lbnYuUkVBQ1RfQVBQX0JBU0VfVVJMfWBcbiAgfSlcbiBcbiAgYXBpLmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShjb25maWcgPT4ge1xuICAgIHJldHVybiBjb25maWc7XG4gIH0pXG4gXG4gIGlmICh0b2tlbikge1xuICAgIGFwaS5kZWZhdWx0cy5oZWFkZXJzWydBdXRob3JpemF0aW9uJ10gPSBgQmVhcmVyICR7dG9rZW59YDtcbiAgfVxuIFxuICByZXR1cm4gYXBpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEFQSVNlcnZlcigpIHtcbiAgY29uc3QgdG9rZW4gPSBub29raWVzLmdldChudWxsKVsnZG9uaWxhYmF1dGgudG9rZW4nXTtcbiBcbiAgY29uc3QgYXBpID0gYXhpb3MuY3JlYXRlKHtcbiAgICBiYXNlVVJMOiBgJHtwcm9jZXNzLmVudi5SRUFDVF9BUFBfQkFTRV9VUkx9YFxuICB9KVxuIFxuICBhcGkuaW50ZXJjZXB0b3JzLnJlcXVlc3QudXNlKGNvbmZpZyA9PiB7XG4gICAgcmV0dXJuIGNvbmZpZztcbiAgfSlcbiBcbiAgaWYgKHRva2VuKSB7XG4gICAgYXBpLmRlZmF1bHRzLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xuICB9XG4gXG4gIHJldHVybiBhcGk7XG59Il0sIm5hbWVzIjpbImF4aW9zIiwibm9va2llcyIsImdldEFQSUNsaWVudCIsInRva2VuIiwiZ2V0IiwiYXBpIiwiY3JlYXRlIiwiYmFzZVVSTCIsInByb2Nlc3MiLCJlbnYiLCJSRUFDVF9BUFBfQkFTRV9VUkwiLCJpbnRlcmNlcHRvcnMiLCJyZXF1ZXN0IiwidXNlIiwiY29uZmlnIiwiZGVmYXVsdHMiLCJoZWFkZXJzIiwiZ2V0QVBJU2VydmVyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/services/axios.ts\n"));

/***/ })

});