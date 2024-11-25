"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/(protected)/site/[siteId]/reports/page",{

/***/ "(app-pages-browser)/./src/components/views/Reports.tsx":
/*!******************************************!*\
  !*** ./src/components/views/Reports.tsx ***!
  \******************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Reports; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useReports */ \"(app-pages-browser)/./src/hooks/useReports.ts\");\n/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modal */ \"(app-pages-browser)/./src/components/Modal.tsx\");\n/* harmony import */ var _ReportForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ReportForm */ \"(app-pages-browser)/./src/components/ReportForm.tsx\");\n/* harmony import */ var _DeleteConfirmation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DeleteConfirmation */ \"(app-pages-browser)/./src/components/DeleteConfirmation.tsx\");\n/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../LoadingSpinner */ \"(app-pages-browser)/./src/components/LoadingSpinner.tsx\");\n/* harmony import */ var _ErrorAlert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ErrorAlert */ \"(app-pages-browser)/./src/components/ErrorAlert.tsx\");\n/* harmony import */ var _EmptyState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../EmptyState */ \"(app-pages-browser)/./src/components/EmptyState.tsx\");\n/* harmony import */ var _DataTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../DataTable */ \"(app-pages-browser)/./src/components/DataTable.tsx\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_10__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction Reports() {\n    _s();\n    const [isCreateModalOpen, setIsCreateModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [editingReport, setEditingReport] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [deletingReport, setDeletingReport] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_10__.useParams)();\n    const { data: reports, isLoading, error } = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useReports)();\n    const createReport = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useCreateReport)();\n    const updateReport = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useUpdateReport)();\n    const deleteReport = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useDeleteReport)();\n    if (isLoading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_LoadingSpinner__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n        lineNumber: 23,\n        columnNumber: 25\n    }, this);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ErrorAlert__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        message: \"Failed to load reports\"\n    }, void 0, false, {\n        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n        lineNumber: 24,\n        columnNumber: 21\n    }, this);\n    const columns = [\n        {\n            key: \"title\",\n            header: \"Title\",\n            render: (value)=>value.en\n        },\n        {\n            key: \"year\",\n            header: \"Year\"\n        },\n        {\n            key: \"site\",\n            header: \"Site\",\n            render: (value)=>value.en\n        },\n        {\n            key: \"url\",\n            header: \"URL\",\n            render: (value)=>value && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                    href: value,\n                    target: \"_blank\",\n                    rel: \"noopener noreferrer\",\n                    className: \"text-green-600 hover:text-green-900\",\n                    children: \"View Report\"\n                }, void 0, false, {\n                    fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"sm:flex sm:items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"sm:flex-auto\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-base font-semibold leading-6 text-gray-900\",\n                                children: \"Reports\"\n                            }, void 0, false, {\n                                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"mt-2 text-sm text-gray-700\",\n                                children: \"A list of all reports including their title, year, and download link.\"\n                            }, void 0, false, {\n                                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                                lineNumber: 55,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-4 sm:ml-16 sm:mt-0 sm:flex-none\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"button\",\n                            onClick: ()=>setIsCreateModalOpen(true),\n                            className: \"block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600\",\n                            children: \"Add report\"\n                        }, void 0, false, {\n                            fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                            lineNumber: 60,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, this),\n            (reports === null || reports === void 0 ? void 0 : reports.length) === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_EmptyState__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                title: \"No reports\",\n                description: \"Get started by creating a new report.\",\n                buttonText: \"Add report\",\n                onClick: ()=>setIsCreateModalOpen(true)\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 71,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DataTable__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                columns: columns,\n                data: reports,\n                onEdit: setEditingReport,\n                onDelete: setDeletingReport\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 78,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                open: isCreateModalOpen,\n                onClose: ()=>setIsCreateModalOpen(false),\n                title: \"Create Report\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ReportForm__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                    siteId: params.siteId,\n                    onSubmit: async (data)=>{\n                        await createReport.mutateAsync(data);\n                        setIsCreateModalOpen(false);\n                    },\n                    onCancel: ()=>setIsCreateModalOpen(false)\n                }, void 0, false, {\n                    fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                    lineNumber: 91,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 86,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                open: !!editingReport,\n                onClose: ()=>setEditingReport(null),\n                title: \"Edit Report\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ReportForm__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                    siteId: params.siteId,\n                    initialData: editingReport,\n                    onSubmit: async (data)=>{\n                        await updateReport.mutateAsync({\n                            id: editingReport.id,\n                            ...data\n                        });\n                        setEditingReport(null);\n                    },\n                    onCancel: ()=>setEditingReport(null)\n                }, void 0, false, {\n                    fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                    lineNumber: 106,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 101,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DeleteConfirmation__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                open: !!deletingReport,\n                onClose: ()=>setDeletingReport(null),\n                onConfirm: async ()=>{\n                    await deleteReport.mutateAsync(deletingReport.id);\n                    setDeletingReport(null);\n                },\n                title: \"Delete Report\",\n                message: \"Are you sure you want to delete this report? This action cannot be undone.\"\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 117,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n        lineNumber: 51,\n        columnNumber: 5\n    }, this);\n}\n_s(Reports, \"rd5m+ht3XZ64W2RQX/bBZNPL29g=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_10__.useParams,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useReports,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useCreateReport,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useUpdateReport,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useDeleteReport\n    ];\n});\n_c = Reports;\nvar _c;\n$RefreshReg$(_c, \"Reports\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3ZpZXdzL1JlcG9ydHMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDaUM7QUFDc0U7QUFDMUU7QUFDVTtBQUNnQjtBQUNSO0FBQ1I7QUFDQTtBQUNGO0FBQ087QUFFN0IsU0FBU2E7O0lBQ3RCLE1BQU0sQ0FBQ0MsbUJBQW1CQyxxQkFBcUIsR0FBR2YsK0NBQVFBLENBQUM7SUFDM0QsTUFBTSxDQUFDZ0IsZUFBZUMsaUJBQWlCLEdBQUdqQiwrQ0FBUUEsQ0FBTTtJQUN4RCxNQUFNLENBQUNrQixnQkFBZ0JDLGtCQUFrQixHQUFHbkIsK0NBQVFBLENBQU07SUFDMUQsTUFBTW9CLFNBQVNSLDJEQUFTQTtJQUN4QixNQUFNLEVBQUVTLE1BQU1DLE9BQU8sRUFBRUMsU0FBUyxFQUFFQyxLQUFLLEVBQUUsR0FBR3ZCLDZEQUFVQTtJQUN0RCxNQUFNd0IsZUFBZXZCLGtFQUFlQTtJQUNwQyxNQUFNd0IsZUFBZXZCLGtFQUFlQTtJQUNwQyxNQUFNd0IsZUFBZXZCLGtFQUFlQTtJQUVwQyxJQUFJbUIsV0FBVyxxQkFBTyw4REFBQ2YsdURBQWNBOzs7OztJQUNyQyxJQUFJZ0IsT0FBTyxxQkFBTyw4REFBQ2YsbURBQVVBO1FBQUNtQixTQUFROzs7Ozs7SUFFdEMsTUFBTUMsVUFBVTtRQUNkO1lBQUVDLEtBQUs7WUFBU0MsUUFBUTtZQUFTQyxRQUFRLENBQUNDLFFBQWVBLE1BQU1DLEVBQUU7UUFBQztRQUNsRTtZQUFFSixLQUFLO1lBQVFDLFFBQVE7UUFBTztRQUM5QjtZQUNFRCxLQUFLO1lBQ0xDLFFBQVE7WUFDUkMsUUFBUSxDQUFDQyxRQUFlQSxNQUFNQyxFQUFFO1FBQ2xDO1FBQ0E7WUFDRUosS0FBSztZQUNMQyxRQUFRO1lBQ1JDLFFBQVEsQ0FBQ0MsUUFBa0JBLHVCQUN6Qiw4REFBQ0U7b0JBQ0NDLE1BQU1IO29CQUNOSSxRQUFPO29CQUNQQyxLQUFJO29CQUNKQyxXQUFVOzhCQUNYOzs7Ozs7UUFJTDtLQUNEO0lBRUQscUJBQ0UsOERBQUNDOzswQkFDQyw4REFBQ0E7Z0JBQUlELFdBQVU7O2tDQUNiLDhEQUFDQzt3QkFBSUQsV0FBVTs7MENBQ2IsOERBQUNFO2dDQUFHRixXQUFVOzBDQUFrRDs7Ozs7OzBDQUNoRSw4REFBQ0c7Z0NBQUVILFdBQVU7MENBQTZCOzs7Ozs7Ozs7Ozs7a0NBSTVDLDhEQUFDQzt3QkFBSUQsV0FBVTtrQ0FDYiw0RUFBQ0k7NEJBQ0NDLE1BQUs7NEJBQ0xDLFNBQVMsSUFBTTlCLHFCQUFxQjs0QkFDcEN3QixXQUFVO3NDQUNYOzs7Ozs7Ozs7Ozs7Ozs7OztZQU1KakIsQ0FBQUEsb0JBQUFBLDhCQUFBQSxRQUFTd0IsTUFBTSxNQUFLLGtCQUNuQiw4REFBQ3BDLG1EQUFVQTtnQkFDVHFDLE9BQU07Z0JBQ05DLGFBQVk7Z0JBQ1pDLFlBQVc7Z0JBQ1hKLFNBQVMsSUFBTTlCLHFCQUFxQjs7Ozs7cUNBR3RDLDhEQUFDSixrREFBU0E7Z0JBQ1JrQixTQUFTQTtnQkFDVFIsTUFBTUM7Z0JBQ040QixRQUFRakM7Z0JBQ1JrQyxVQUFVaEM7Ozs7OzswQkFJZCw4REFBQ2QsOENBQUtBO2dCQUNKK0MsTUFBTXRDO2dCQUNOdUMsU0FBUyxJQUFNdEMscUJBQXFCO2dCQUNwQ2dDLE9BQU07MEJBRU4sNEVBQUN6QyxtREFBVUE7b0JBQ1hnRCxRQUFRbEMsT0FBT2tDLE1BQU07b0JBQ25CQyxVQUFVLE9BQU9sQzt3QkFDZixNQUFNSSxhQUFhK0IsV0FBVyxDQUFDbkM7d0JBQy9CTixxQkFBcUI7b0JBQ3ZCO29CQUNBMEMsVUFBVSxJQUFNMUMscUJBQXFCOzs7Ozs7Ozs7OzswQkFJekMsOERBQUNWLDhDQUFLQTtnQkFDSitDLE1BQU0sQ0FBQyxDQUFDcEM7Z0JBQ1JxQyxTQUFTLElBQU1wQyxpQkFBaUI7Z0JBQ2hDOEIsT0FBTTswQkFFTiw0RUFBQ3pDLG1EQUFVQTtvQkFDWGdELFFBQVFsQyxPQUFPa0MsTUFBTTtvQkFDbkJJLGFBQWExQztvQkFDYnVDLFVBQVUsT0FBT2xDO3dCQUNmLE1BQU1LLGFBQWE4QixXQUFXLENBQUM7NEJBQUVHLElBQUkzQyxjQUFjMkMsRUFBRTs0QkFBRSxHQUFHdEMsSUFBSTt3QkFBQzt3QkFDL0RKLGlCQUFpQjtvQkFDbkI7b0JBQ0F3QyxVQUFVLElBQU14QyxpQkFBaUI7Ozs7Ozs7Ozs7OzBCQUlyQyw4REFBQ1YsMkRBQWtCQTtnQkFDakI2QyxNQUFNLENBQUMsQ0FBQ2xDO2dCQUNSbUMsU0FBUyxJQUFNbEMsa0JBQWtCO2dCQUNqQ3lDLFdBQVc7b0JBQ1QsTUFBTWpDLGFBQWE2QixXQUFXLENBQUN0QyxlQUFleUMsRUFBRTtvQkFDaER4QyxrQkFBa0I7Z0JBQ3BCO2dCQUNBNEIsT0FBTTtnQkFDTm5CLFNBQVE7Ozs7Ozs7Ozs7OztBQUloQjtHQXBId0JmOztRQUlQRCx1REFBU0E7UUFDb0JYLHlEQUFVQTtRQUNqQ0MsOERBQWVBO1FBQ2ZDLDhEQUFlQTtRQUNmQyw4REFBZUE7OztLQVJkUyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy92aWV3cy9SZXBvcnRzLnRzeD84NmQ0Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVJlcG9ydHMsIHVzZUNyZWF0ZVJlcG9ydCwgdXNlVXBkYXRlUmVwb3J0LCB1c2VEZWxldGVSZXBvcnQgfSBmcm9tICcuLi8uLi9ob29rcy91c2VSZXBvcnRzJztcbmltcG9ydCBNb2RhbCBmcm9tICcuLi9Nb2RhbCc7XG5pbXBvcnQgUmVwb3J0Rm9ybSBmcm9tICcuLi9SZXBvcnRGb3JtJztcbmltcG9ydCBEZWxldGVDb25maXJtYXRpb24gZnJvbSAnLi4vRGVsZXRlQ29uZmlybWF0aW9uJztcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tICcuLi9Mb2FkaW5nU3Bpbm5lcic7XG5pbXBvcnQgRXJyb3JBbGVydCBmcm9tICcuLi9FcnJvckFsZXJ0JztcbmltcG9ydCBFbXB0eVN0YXRlIGZyb20gJy4uL0VtcHR5U3RhdGUnO1xuaW1wb3J0IERhdGFUYWJsZSBmcm9tICcuLi9EYXRhVGFibGUnO1xuaW1wb3J0IHsgdXNlUGFyYW1zIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUmVwb3J0cygpIHtcbiAgY29uc3QgW2lzQ3JlYXRlTW9kYWxPcGVuLCBzZXRJc0NyZWF0ZU1vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtlZGl0aW5nUmVwb3J0LCBzZXRFZGl0aW5nUmVwb3J0XSA9IHVzZVN0YXRlPGFueT4obnVsbCk7XG4gIGNvbnN0IFtkZWxldGluZ1JlcG9ydCwgc2V0RGVsZXRpbmdSZXBvcnRdID0gdXNlU3RhdGU8YW55PihudWxsKTtcbiAgY29uc3QgcGFyYW1zID0gdXNlUGFyYW1zPHsgc2l0ZUlkOiBzdHJpbmc7IH0+KClcbiAgY29uc3QgeyBkYXRhOiByZXBvcnRzLCBpc0xvYWRpbmcsIGVycm9yIH0gPSB1c2VSZXBvcnRzKCk7XG4gIGNvbnN0IGNyZWF0ZVJlcG9ydCA9IHVzZUNyZWF0ZVJlcG9ydCgpO1xuICBjb25zdCB1cGRhdGVSZXBvcnQgPSB1c2VVcGRhdGVSZXBvcnQoKTtcbiAgY29uc3QgZGVsZXRlUmVwb3J0ID0gdXNlRGVsZXRlUmVwb3J0KCk7XG5cbiAgaWYgKGlzTG9hZGluZykgcmV0dXJuIDxMb2FkaW5nU3Bpbm5lciAvPjtcbiAgaWYgKGVycm9yKSByZXR1cm4gPEVycm9yQWxlcnQgbWVzc2FnZT1cIkZhaWxlZCB0byBsb2FkIHJlcG9ydHNcIiAvPjtcblxuICBjb25zdCBjb2x1bW5zID0gW1xuICAgIHsga2V5OiAndGl0bGUnLCBoZWFkZXI6ICdUaXRsZScsIHJlbmRlcjogKHZhbHVlOiBhbnkpID0+IHZhbHVlLmVuIH0sXG4gICAgeyBrZXk6ICd5ZWFyJywgaGVhZGVyOiAnWWVhcicgfSxcbiAgICB7XG4gICAgICBrZXk6ICdzaXRlJyxcbiAgICAgIGhlYWRlcjogJ1NpdGUnLFxuICAgICAgcmVuZGVyOiAodmFsdWU6IGFueSkgPT4gdmFsdWUuZW4gLFxuICAgIH0sXG4gICAge1xuICAgICAga2V5OiAndXJsJyxcbiAgICAgIGhlYWRlcjogJ1VSTCcsXG4gICAgICByZW5kZXI6ICh2YWx1ZTogc3RyaW5nKSA9PiB2YWx1ZSAmJiAoXG4gICAgICAgIDxhXG4gICAgICAgICAgaHJlZj17dmFsdWV9XG4gICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWdyZWVuLTYwMCBob3Zlcjp0ZXh0LWdyZWVuLTkwMFwiXG4gICAgICAgID5cbiAgICAgICAgICBWaWV3IFJlcG9ydFxuICAgICAgICA8L2E+XG4gICAgICApLFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpmbGV4IHNtOml0ZW1zLWNlbnRlclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmZsZXgtYXV0b1wiPlxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1zZW1pYm9sZCBsZWFkaW5nLTYgdGV4dC1ncmF5LTkwMFwiPlJlcG9ydHM8L2gxPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTIgdGV4dC1zbSB0ZXh0LWdyYXktNzAwXCI+XG4gICAgICAgICAgICBBIGxpc3Qgb2YgYWxsIHJlcG9ydHMgaW5jbHVkaW5nIHRoZWlyIHRpdGxlLCB5ZWFyLCBhbmQgZG93bmxvYWQgbGluay5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgc206bWwtMTYgc206bXQtMCBzbTpmbGV4LW5vbmVcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQ3JlYXRlTW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmxvY2sgcm91bmRlZC1tZCBiZy1ncmVlbi02MDAgcHgtMyBweS0yIHRleHQtY2VudGVyIHRleHQtc20gZm9udC1zZW1pYm9sZCB0ZXh0LXdoaXRlIHNoYWRvdy1zbSBob3ZlcjpiZy1ncmVlbi01MDAgZm9jdXMtdmlzaWJsZTpvdXRsaW5lIGZvY3VzLXZpc2libGU6b3V0bGluZS0yIGZvY3VzLXZpc2libGU6b3V0bGluZS1vZmZzZXQtMiBmb2N1cy12aXNpYmxlOm91dGxpbmUtZ3JlZW4tNjAwXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBBZGQgcmVwb3J0XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtyZXBvcnRzPy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgIDxFbXB0eVN0YXRlXG4gICAgICAgICAgdGl0bGU9XCJObyByZXBvcnRzXCJcbiAgICAgICAgICBkZXNjcmlwdGlvbj1cIkdldCBzdGFydGVkIGJ5IGNyZWF0aW5nIGEgbmV3IHJlcG9ydC5cIlxuICAgICAgICAgIGJ1dHRvblRleHQ9XCJBZGQgcmVwb3J0XCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NyZWF0ZU1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxEYXRhVGFibGVcbiAgICAgICAgICBjb2x1bW5zPXtjb2x1bW5zfVxuICAgICAgICAgIGRhdGE9e3JlcG9ydHN9XG4gICAgICAgICAgb25FZGl0PXtzZXRFZGl0aW5nUmVwb3J0fVxuICAgICAgICAgIG9uRGVsZXRlPXtzZXREZWxldGluZ1JlcG9ydH1cbiAgICAgICAgLz5cbiAgICAgICl9XG5cbiAgICAgIDxNb2RhbFxuICAgICAgICBvcGVuPXtpc0NyZWF0ZU1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNDcmVhdGVNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICB0aXRsZT1cIkNyZWF0ZSBSZXBvcnRcIlxuICAgICAgPlxuICAgICAgICA8UmVwb3J0Rm9ybVxuICAgICAgICBzaXRlSWQ9e3BhcmFtcy5zaXRlSWR9XG4gICAgICAgICAgb25TdWJtaXQ9e2FzeW5jIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCBjcmVhdGVSZXBvcnQubXV0YXRlQXN5bmMoZGF0YSk7XG4gICAgICAgICAgICBzZXRJc0NyZWF0ZU1vZGFsT3BlbihmYWxzZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4gc2V0SXNDcmVhdGVNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICAvPlxuICAgICAgPC9Nb2RhbD5cblxuICAgICAgPE1vZGFsXG4gICAgICAgIG9wZW49eyEhZWRpdGluZ1JlcG9ydH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0RWRpdGluZ1JlcG9ydChudWxsKX1cbiAgICAgICAgdGl0bGU9XCJFZGl0IFJlcG9ydFwiXG4gICAgICA+XG4gICAgICAgIDxSZXBvcnRGb3JtXG4gICAgICAgIHNpdGVJZD17cGFyYW1zLnNpdGVJZH1cbiAgICAgICAgICBpbml0aWFsRGF0YT17ZWRpdGluZ1JlcG9ydH1cbiAgICAgICAgICBvblN1Ym1pdD17YXN5bmMgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGF3YWl0IHVwZGF0ZVJlcG9ydC5tdXRhdGVBc3luYyh7IGlkOiBlZGl0aW5nUmVwb3J0LmlkLCAuLi5kYXRhIH0pO1xuICAgICAgICAgICAgc2V0RWRpdGluZ1JlcG9ydChudWxsKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2FuY2VsPXsoKSA9PiBzZXRFZGl0aW5nUmVwb3J0KG51bGwpfVxuICAgICAgICAvPlxuICAgICAgPC9Nb2RhbD5cblxuICAgICAgPERlbGV0ZUNvbmZpcm1hdGlvblxuICAgICAgICBvcGVuPXshIWRlbGV0aW5nUmVwb3J0fVxuICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXREZWxldGluZ1JlcG9ydChudWxsKX1cbiAgICAgICAgb25Db25maXJtPXthc3luYyAoKSA9PiB7XG4gICAgICAgICAgYXdhaXQgZGVsZXRlUmVwb3J0Lm11dGF0ZUFzeW5jKGRlbGV0aW5nUmVwb3J0LmlkKTtcbiAgICAgICAgICBzZXREZWxldGluZ1JlcG9ydChudWxsKTtcbiAgICAgICAgfX1cbiAgICAgICAgdGl0bGU9XCJEZWxldGUgUmVwb3J0XCJcbiAgICAgICAgbWVzc2FnZT1cIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhpcyByZXBvcnQ/IFRoaXMgYWN0aW9uIGNhbm5vdCBiZSB1bmRvbmUuXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlUmVwb3J0cyIsInVzZUNyZWF0ZVJlcG9ydCIsInVzZVVwZGF0ZVJlcG9ydCIsInVzZURlbGV0ZVJlcG9ydCIsIk1vZGFsIiwiUmVwb3J0Rm9ybSIsIkRlbGV0ZUNvbmZpcm1hdGlvbiIsIkxvYWRpbmdTcGlubmVyIiwiRXJyb3JBbGVydCIsIkVtcHR5U3RhdGUiLCJEYXRhVGFibGUiLCJ1c2VQYXJhbXMiLCJSZXBvcnRzIiwiaXNDcmVhdGVNb2RhbE9wZW4iLCJzZXRJc0NyZWF0ZU1vZGFsT3BlbiIsImVkaXRpbmdSZXBvcnQiLCJzZXRFZGl0aW5nUmVwb3J0IiwiZGVsZXRpbmdSZXBvcnQiLCJzZXREZWxldGluZ1JlcG9ydCIsInBhcmFtcyIsImRhdGEiLCJyZXBvcnRzIiwiaXNMb2FkaW5nIiwiZXJyb3IiLCJjcmVhdGVSZXBvcnQiLCJ1cGRhdGVSZXBvcnQiLCJkZWxldGVSZXBvcnQiLCJtZXNzYWdlIiwiY29sdW1ucyIsImtleSIsImhlYWRlciIsInJlbmRlciIsInZhbHVlIiwiZW4iLCJhIiwiaHJlZiIsInRhcmdldCIsInJlbCIsImNsYXNzTmFtZSIsImRpdiIsImgxIiwicCIsImJ1dHRvbiIsInR5cGUiLCJvbkNsaWNrIiwibGVuZ3RoIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImJ1dHRvblRleHQiLCJvbkVkaXQiLCJvbkRlbGV0ZSIsIm9wZW4iLCJvbkNsb3NlIiwic2l0ZUlkIiwib25TdWJtaXQiLCJtdXRhdGVBc3luYyIsIm9uQ2FuY2VsIiwiaW5pdGlhbERhdGEiLCJpZCIsIm9uQ29uZmlybSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/views/Reports.tsx\n"));

/***/ })

});