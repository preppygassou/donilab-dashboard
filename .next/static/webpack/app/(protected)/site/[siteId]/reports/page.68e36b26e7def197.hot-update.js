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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Reports; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useReports */ \"(app-pages-browser)/./src/hooks/useReports.ts\");\n/* harmony import */ var _Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Modal */ \"(app-pages-browser)/./src/components/Modal.tsx\");\n/* harmony import */ var _ReportForm__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ReportForm */ \"(app-pages-browser)/./src/components/ReportForm.tsx\");\n/* harmony import */ var _DeleteConfirmation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../DeleteConfirmation */ \"(app-pages-browser)/./src/components/DeleteConfirmation.tsx\");\n/* harmony import */ var _LoadingSpinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../LoadingSpinner */ \"(app-pages-browser)/./src/components/LoadingSpinner.tsx\");\n/* harmony import */ var _ErrorAlert__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../ErrorAlert */ \"(app-pages-browser)/./src/components/ErrorAlert.tsx\");\n/* harmony import */ var _EmptyState__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../EmptyState */ \"(app-pages-browser)/./src/components/EmptyState.tsx\");\n/* harmony import */ var _DataTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../DataTable */ \"(app-pages-browser)/./src/components/DataTable.tsx\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_10__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\n\n\n\nfunction Reports() {\n    _s();\n    const [isCreateModalOpen, setIsCreateModalOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const [editingReport, setEditingReport] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [deletingReport, setDeletingReport] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const params = (0,next_navigation__WEBPACK_IMPORTED_MODULE_10__.useParams)();\n    const { data: reports, isLoading, error } = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useReports)();\n    const createReport = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useCreateReport)();\n    const updateReport = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useUpdateReport)();\n    const deleteReport = (0,_hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useDeleteReport)();\n    if (isLoading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_LoadingSpinner__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n        lineNumber: 23,\n        columnNumber: 25\n    }, this);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ErrorAlert__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n        message: \"Failed to load reports\"\n    }, void 0, false, {\n        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n        lineNumber: 24,\n        columnNumber: 21\n    }, this);\n    const columns = [\n        {\n            key: \"title\",\n            header: \"Title\",\n            render: (value)=>value.en\n        },\n        {\n            key: \"year\",\n            header: \"Year\"\n        },\n        {\n            key: \"site\",\n            header: \"site\",\n            render: (value)=>value.name.en\n        },\n        {\n            key: \"url\",\n            header: \"URL\",\n            render: (value)=>value && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                    href: value,\n                    target: \"_blank\",\n                    rel: \"noopener noreferrer\",\n                    className: \"text-green-600 hover:text-green-900\",\n                    children: \"View Report\"\n                }, void 0, false, {\n                    fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                    lineNumber: 38,\n                    columnNumber: 9\n                }, this)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"sm:flex sm:items-center\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"sm:flex-auto\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                className: \"text-base font-semibold leading-6 text-gray-900\",\n                                children: \"Reports\"\n                            }, void 0, false, {\n                                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                                lineNumber: 54,\n                                columnNumber: 11\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                className: \"mt-2 text-sm text-gray-700\",\n                                children: \"A list of all reports including their title, year, and download link.\"\n                            }, void 0, false, {\n                                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                                lineNumber: 55,\n                                columnNumber: 11\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                        lineNumber: 53,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"mt-4 sm:ml-16 sm:mt-0 sm:flex-none\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            type: \"button\",\n                            onClick: ()=>setIsCreateModalOpen(true),\n                            className: \"block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600\",\n                            children: \"Add report\"\n                        }, void 0, false, {\n                            fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                            lineNumber: 60,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                        lineNumber: 59,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 52,\n                columnNumber: 7\n            }, this),\n            (reports === null || reports === void 0 ? void 0 : reports.length) === 0 ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_EmptyState__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                title: \"No reports\",\n                description: \"Get started by creating a new report.\",\n                buttonText: \"Add report\",\n                onClick: ()=>setIsCreateModalOpen(true)\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 71,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DataTable__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                columns: columns,\n                data: reports,\n                onEdit: setEditingReport,\n                onDelete: setDeletingReport\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 78,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                open: isCreateModalOpen,\n                onClose: ()=>setIsCreateModalOpen(false),\n                title: \"Create Report\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ReportForm__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                    siteId: params.siteId,\n                    onSubmit: async (data)=>{\n                        await createReport.mutateAsync(data);\n                        setIsCreateModalOpen(false);\n                    },\n                    onCancel: ()=>setIsCreateModalOpen(false)\n                }, void 0, false, {\n                    fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                    lineNumber: 91,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 86,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Modal__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                open: !!editingReport,\n                onClose: ()=>setEditingReport(null),\n                title: \"Edit Report\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_ReportForm__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                    siteId: params.siteId,\n                    initialData: editingReport,\n                    onSubmit: async (data)=>{\n                        await updateReport.mutateAsync({\n                            id: editingReport.id,\n                            ...data\n                        });\n                        setEditingReport(null);\n                    },\n                    onCancel: ()=>setEditingReport(null)\n                }, void 0, false, {\n                    fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                    lineNumber: 106,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 101,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_DeleteConfirmation__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                open: !!deletingReport,\n                onClose: ()=>setDeletingReport(null),\n                onConfirm: async ()=>{\n                    await deleteReport.mutateAsync(deletingReport.id);\n                    setDeletingReport(null);\n                },\n                title: \"Delete Report\",\n                message: \"Are you sure you want to delete this report? This action cannot be undone.\"\n            }, void 0, false, {\n                fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n                lineNumber: 117,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/zulu/www/donilab-dashboard/src/components/views/Reports.tsx\",\n        lineNumber: 51,\n        columnNumber: 5\n    }, this);\n}\n_s(Reports, \"rd5m+ht3XZ64W2RQX/bBZNPL29g=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_10__.useParams,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useReports,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useCreateReport,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useUpdateReport,\n        _hooks_useReports__WEBPACK_IMPORTED_MODULE_2__.useDeleteReport\n    ];\n});\n_c = Reports;\nvar _c;\n$RefreshReg$(_c, \"Reports\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL3ZpZXdzL1JlcG9ydHMudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDaUM7QUFDc0U7QUFDMUU7QUFDVTtBQUNnQjtBQUNSO0FBQ1I7QUFDQTtBQUNGO0FBQ087QUFFN0IsU0FBU2E7O0lBQ3RCLE1BQU0sQ0FBQ0MsbUJBQW1CQyxxQkFBcUIsR0FBR2YsK0NBQVFBLENBQUM7SUFDM0QsTUFBTSxDQUFDZ0IsZUFBZUMsaUJBQWlCLEdBQUdqQiwrQ0FBUUEsQ0FBTTtJQUN4RCxNQUFNLENBQUNrQixnQkFBZ0JDLGtCQUFrQixHQUFHbkIsK0NBQVFBLENBQU07SUFDMUQsTUFBTW9CLFNBQVNSLDJEQUFTQTtJQUN4QixNQUFNLEVBQUVTLE1BQU1DLE9BQU8sRUFBRUMsU0FBUyxFQUFFQyxLQUFLLEVBQUUsR0FBR3ZCLDZEQUFVQTtJQUN0RCxNQUFNd0IsZUFBZXZCLGtFQUFlQTtJQUNwQyxNQUFNd0IsZUFBZXZCLGtFQUFlQTtJQUNwQyxNQUFNd0IsZUFBZXZCLGtFQUFlQTtJQUVwQyxJQUFJbUIsV0FBVyxxQkFBTyw4REFBQ2YsdURBQWNBOzs7OztJQUNyQyxJQUFJZ0IsT0FBTyxxQkFBTyw4REFBQ2YsbURBQVVBO1FBQUNtQixTQUFROzs7Ozs7SUFFdEMsTUFBTUMsVUFBVTtRQUNkO1lBQUVDLEtBQUs7WUFBU0MsUUFBUTtZQUFTQyxRQUFRLENBQUNDLFFBQWVBLE1BQU1DLEVBQUU7UUFBQztRQUNsRTtZQUFFSixLQUFLO1lBQVFDLFFBQVE7UUFBTztRQUM5QjtZQUNFRCxLQUFLO1lBQ0xDLFFBQVE7WUFDUkMsUUFBUSxDQUFDQyxRQUFlQSxNQUFNRSxJQUFJLENBQUNELEVBQUU7UUFDdkM7UUFDQTtZQUNFSixLQUFLO1lBQ0xDLFFBQVE7WUFDUkMsUUFBUSxDQUFDQyxRQUFrQkEsdUJBQ3pCLDhEQUFDRztvQkFDQ0MsTUFBTUo7b0JBQ05LLFFBQU87b0JBQ1BDLEtBQUk7b0JBQ0pDLFdBQVU7OEJBQ1g7Ozs7OztRQUlMO0tBQ0Q7SUFFRCxxQkFDRSw4REFBQ0M7OzBCQUNDLDhEQUFDQTtnQkFBSUQsV0FBVTs7a0NBQ2IsOERBQUNDO3dCQUFJRCxXQUFVOzswQ0FDYiw4REFBQ0U7Z0NBQUdGLFdBQVU7MENBQWtEOzs7Ozs7MENBQ2hFLDhEQUFDRztnQ0FBRUgsV0FBVTswQ0FBNkI7Ozs7Ozs7Ozs7OztrQ0FJNUMsOERBQUNDO3dCQUFJRCxXQUFVO2tDQUNiLDRFQUFDSTs0QkFDQ0MsTUFBSzs0QkFDTEMsU0FBUyxJQUFNL0IscUJBQXFCOzRCQUNwQ3lCLFdBQVU7c0NBQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBTUpsQixDQUFBQSxvQkFBQUEsOEJBQUFBLFFBQVN5QixNQUFNLE1BQUssa0JBQ25CLDhEQUFDckMsbURBQVVBO2dCQUNUc0MsT0FBTTtnQkFDTkMsYUFBWTtnQkFDWkMsWUFBVztnQkFDWEosU0FBUyxJQUFNL0IscUJBQXFCOzs7OztxQ0FHdEMsOERBQUNKLGtEQUFTQTtnQkFDUmtCLFNBQVNBO2dCQUNUUixNQUFNQztnQkFDTjZCLFFBQVFsQztnQkFDUm1DLFVBQVVqQzs7Ozs7OzBCQUlkLDhEQUFDZCw4Q0FBS0E7Z0JBQ0pnRCxNQUFNdkM7Z0JBQ053QyxTQUFTLElBQU12QyxxQkFBcUI7Z0JBQ3BDaUMsT0FBTTswQkFFTiw0RUFBQzFDLG1EQUFVQTtvQkFDWGlELFFBQVFuQyxPQUFPbUMsTUFBTTtvQkFDbkJDLFVBQVUsT0FBT25DO3dCQUNmLE1BQU1JLGFBQWFnQyxXQUFXLENBQUNwQzt3QkFDL0JOLHFCQUFxQjtvQkFDdkI7b0JBQ0EyQyxVQUFVLElBQU0zQyxxQkFBcUI7Ozs7Ozs7Ozs7OzBCQUl6Qyw4REFBQ1YsOENBQUtBO2dCQUNKZ0QsTUFBTSxDQUFDLENBQUNyQztnQkFDUnNDLFNBQVMsSUFBTXJDLGlCQUFpQjtnQkFDaEMrQixPQUFNOzBCQUVOLDRFQUFDMUMsbURBQVVBO29CQUNYaUQsUUFBUW5DLE9BQU9tQyxNQUFNO29CQUNuQkksYUFBYTNDO29CQUNid0MsVUFBVSxPQUFPbkM7d0JBQ2YsTUFBTUssYUFBYStCLFdBQVcsQ0FBQzs0QkFBRUcsSUFBSTVDLGNBQWM0QyxFQUFFOzRCQUFFLEdBQUd2QyxJQUFJO3dCQUFDO3dCQUMvREosaUJBQWlCO29CQUNuQjtvQkFDQXlDLFVBQVUsSUFBTXpDLGlCQUFpQjs7Ozs7Ozs7Ozs7MEJBSXJDLDhEQUFDViwyREFBa0JBO2dCQUNqQjhDLE1BQU0sQ0FBQyxDQUFDbkM7Z0JBQ1JvQyxTQUFTLElBQU1uQyxrQkFBa0I7Z0JBQ2pDMEMsV0FBVztvQkFDVCxNQUFNbEMsYUFBYThCLFdBQVcsQ0FBQ3ZDLGVBQWUwQyxFQUFFO29CQUNoRHpDLGtCQUFrQjtnQkFDcEI7Z0JBQ0E2QixPQUFNO2dCQUNOcEIsU0FBUTs7Ozs7Ozs7Ozs7O0FBSWhCO0dBcEh3QmY7O1FBSVBELHVEQUFTQTtRQUNvQlgseURBQVVBO1FBQ2pDQyw4REFBZUE7UUFDZkMsOERBQWVBO1FBQ2ZDLDhEQUFlQTs7O0tBUmRTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9jb21wb25lbnRzL3ZpZXdzL1JlcG9ydHMudHN4Pzg2ZDQiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcbmltcG9ydCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdXNlUmVwb3J0cywgdXNlQ3JlYXRlUmVwb3J0LCB1c2VVcGRhdGVSZXBvcnQsIHVzZURlbGV0ZVJlcG9ydCB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZVJlcG9ydHMnO1xuaW1wb3J0IE1vZGFsIGZyb20gJy4uL01vZGFsJztcbmltcG9ydCBSZXBvcnRGb3JtIGZyb20gJy4uL1JlcG9ydEZvcm0nO1xuaW1wb3J0IERlbGV0ZUNvbmZpcm1hdGlvbiBmcm9tICcuLi9EZWxldGVDb25maXJtYXRpb24nO1xuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJy4uL0xvYWRpbmdTcGlubmVyJztcbmltcG9ydCBFcnJvckFsZXJ0IGZyb20gJy4uL0Vycm9yQWxlcnQnO1xuaW1wb3J0IEVtcHR5U3RhdGUgZnJvbSAnLi4vRW1wdHlTdGF0ZSc7XG5pbXBvcnQgRGF0YVRhYmxlIGZyb20gJy4uL0RhdGFUYWJsZSc7XG5pbXBvcnQgeyB1c2VQYXJhbXMgfSBmcm9tICduZXh0L25hdmlnYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBSZXBvcnRzKCkge1xuICBjb25zdCBbaXNDcmVhdGVNb2RhbE9wZW4sIHNldElzQ3JlYXRlTW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2VkaXRpbmdSZXBvcnQsIHNldEVkaXRpbmdSZXBvcnRdID0gdXNlU3RhdGU8YW55PihudWxsKTtcbiAgY29uc3QgW2RlbGV0aW5nUmVwb3J0LCBzZXREZWxldGluZ1JlcG9ydF0gPSB1c2VTdGF0ZTxhbnk+KG51bGwpO1xuICBjb25zdCBwYXJhbXMgPSB1c2VQYXJhbXM8eyBzaXRlSWQ6IHN0cmluZzsgfT4oKVxuICBjb25zdCB7IGRhdGE6IHJlcG9ydHMsIGlzTG9hZGluZywgZXJyb3IgfSA9IHVzZVJlcG9ydHMoKTtcbiAgY29uc3QgY3JlYXRlUmVwb3J0ID0gdXNlQ3JlYXRlUmVwb3J0KCk7XG4gIGNvbnN0IHVwZGF0ZVJlcG9ydCA9IHVzZVVwZGF0ZVJlcG9ydCgpO1xuICBjb25zdCBkZWxldGVSZXBvcnQgPSB1c2VEZWxldGVSZXBvcnQoKTtcblxuICBpZiAoaXNMb2FkaW5nKSByZXR1cm4gPExvYWRpbmdTcGlubmVyIC8+O1xuICBpZiAoZXJyb3IpIHJldHVybiA8RXJyb3JBbGVydCBtZXNzYWdlPVwiRmFpbGVkIHRvIGxvYWQgcmVwb3J0c1wiIC8+O1xuXG4gIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgeyBrZXk6ICd0aXRsZScsIGhlYWRlcjogJ1RpdGxlJywgcmVuZGVyOiAodmFsdWU6IGFueSkgPT4gdmFsdWUuZW4gfSxcbiAgICB7IGtleTogJ3llYXInLCBoZWFkZXI6ICdZZWFyJyB9LFxuICAgIHtcbiAgICAgIGtleTogJ3NpdGUnLFxuICAgICAgaGVhZGVyOiAnc2l0ZScsXG4gICAgICByZW5kZXI6ICh2YWx1ZTogYW55KSA9PiB2YWx1ZS5uYW1lLmVuICxcbiAgICB9LFxuICAgIHtcbiAgICAgIGtleTogJ3VybCcsXG4gICAgICBoZWFkZXI6ICdVUkwnLFxuICAgICAgcmVuZGVyOiAodmFsdWU6IHN0cmluZykgPT4gdmFsdWUgJiYgKFxuICAgICAgICA8YVxuICAgICAgICAgIGhyZWY9e3ZhbHVlfVxuICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi02MDAgaG92ZXI6dGV4dC1ncmVlbi05MDBcIlxuICAgICAgICA+XG4gICAgICAgICAgVmlldyBSZXBvcnRcbiAgICAgICAgPC9hPlxuICAgICAgKSxcbiAgICB9LFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206ZmxleCBzbTppdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpmbGV4LWF1dG9cIj5cbiAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtc2VtaWJvbGQgbGVhZGluZy02IHRleHQtZ3JheS05MDBcIj5SZXBvcnRzPC9oMT5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0yIHRleHQtc20gdGV4dC1ncmF5LTcwMFwiPlxuICAgICAgICAgICAgQSBsaXN0IG9mIGFsbCByZXBvcnRzIGluY2x1ZGluZyB0aGVpciB0aXRsZSwgeWVhciwgYW5kIGRvd25sb2FkIGxpbmsuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHNtOm1sLTE2IHNtOm10LTAgc206ZmxleC1ub25lXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0NyZWF0ZU1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImJsb2NrIHJvdW5kZWQtbWQgYmctZ3JlZW4tNjAwIHB4LTMgcHktMiB0ZXh0LWNlbnRlciB0ZXh0LXNtIGZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBzaGFkb3ctc20gaG92ZXI6YmctZ3JlZW4tNTAwIGZvY3VzLXZpc2libGU6b3V0bGluZSBmb2N1cy12aXNpYmxlOm91dGxpbmUtMiBmb2N1cy12aXNpYmxlOm91dGxpbmUtb2Zmc2V0LTIgZm9jdXMtdmlzaWJsZTpvdXRsaW5lLWdyZWVuLTYwMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgQWRkIHJlcG9ydFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7cmVwb3J0cz8ubGVuZ3RoID09PSAwID8gKFxuICAgICAgICA8RW1wdHlTdGF0ZVxuICAgICAgICAgIHRpdGxlPVwiTm8gcmVwb3J0c1wiXG4gICAgICAgICAgZGVzY3JpcHRpb249XCJHZXQgc3RhcnRlZCBieSBjcmVhdGluZyBhIG5ldyByZXBvcnQuXCJcbiAgICAgICAgICBidXR0b25UZXh0PVwiQWRkIHJlcG9ydFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNDcmVhdGVNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8RGF0YVRhYmxlXG4gICAgICAgICAgY29sdW1ucz17Y29sdW1uc31cbiAgICAgICAgICBkYXRhPXtyZXBvcnRzfVxuICAgICAgICAgIG9uRWRpdD17c2V0RWRpdGluZ1JlcG9ydH1cbiAgICAgICAgICBvbkRlbGV0ZT17c2V0RGVsZXRpbmdSZXBvcnR9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICA8TW9kYWxcbiAgICAgICAgb3Blbj17aXNDcmVhdGVNb2RhbE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzQ3JlYXRlTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgdGl0bGU9XCJDcmVhdGUgUmVwb3J0XCJcbiAgICAgID5cbiAgICAgICAgPFJlcG9ydEZvcm1cbiAgICAgICAgc2l0ZUlkPXtwYXJhbXMuc2l0ZUlkfVxuICAgICAgICAgIG9uU3VibWl0PXthc3luYyAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgYXdhaXQgY3JlYXRlUmVwb3J0Lm11dGF0ZUFzeW5jKGRhdGEpO1xuICAgICAgICAgICAgc2V0SXNDcmVhdGVNb2RhbE9wZW4oZmFsc2UpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25DYW5jZWw9eygpID0+IHNldElzQ3JlYXRlTW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgLz5cbiAgICAgIDwvTW9kYWw+XG5cbiAgICAgIDxNb2RhbFxuICAgICAgICBvcGVuPXshIWVkaXRpbmdSZXBvcnR9XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldEVkaXRpbmdSZXBvcnQobnVsbCl9XG4gICAgICAgIHRpdGxlPVwiRWRpdCBSZXBvcnRcIlxuICAgICAgPlxuICAgICAgICA8UmVwb3J0Rm9ybVxuICAgICAgICBzaXRlSWQ9e3BhcmFtcy5zaXRlSWR9XG4gICAgICAgICAgaW5pdGlhbERhdGE9e2VkaXRpbmdSZXBvcnR9XG4gICAgICAgICAgb25TdWJtaXQ9e2FzeW5jIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBhd2FpdCB1cGRhdGVSZXBvcnQubXV0YXRlQXN5bmMoeyBpZDogZWRpdGluZ1JlcG9ydC5pZCwgLi4uZGF0YSB9KTtcbiAgICAgICAgICAgIHNldEVkaXRpbmdSZXBvcnQobnVsbCk7XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbkNhbmNlbD17KCkgPT4gc2V0RWRpdGluZ1JlcG9ydChudWxsKX1cbiAgICAgICAgLz5cbiAgICAgIDwvTW9kYWw+XG5cbiAgICAgIDxEZWxldGVDb25maXJtYXRpb25cbiAgICAgICAgb3Blbj17ISFkZWxldGluZ1JlcG9ydH1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0RGVsZXRpbmdSZXBvcnQobnVsbCl9XG4gICAgICAgIG9uQ29uZmlybT17YXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IGRlbGV0ZVJlcG9ydC5tdXRhdGVBc3luYyhkZWxldGluZ1JlcG9ydC5pZCk7XG4gICAgICAgICAgc2V0RGVsZXRpbmdSZXBvcnQobnVsbCk7XG4gICAgICAgIH19XG4gICAgICAgIHRpdGxlPVwiRGVsZXRlIFJlcG9ydFwiXG4gICAgICAgIG1lc3NhZ2U9XCJBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoaXMgcmVwb3J0PyBUaGlzIGFjdGlvbiBjYW5ub3QgYmUgdW5kb25lLlwiXG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufSJdLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZVJlcG9ydHMiLCJ1c2VDcmVhdGVSZXBvcnQiLCJ1c2VVcGRhdGVSZXBvcnQiLCJ1c2VEZWxldGVSZXBvcnQiLCJNb2RhbCIsIlJlcG9ydEZvcm0iLCJEZWxldGVDb25maXJtYXRpb24iLCJMb2FkaW5nU3Bpbm5lciIsIkVycm9yQWxlcnQiLCJFbXB0eVN0YXRlIiwiRGF0YVRhYmxlIiwidXNlUGFyYW1zIiwiUmVwb3J0cyIsImlzQ3JlYXRlTW9kYWxPcGVuIiwic2V0SXNDcmVhdGVNb2RhbE9wZW4iLCJlZGl0aW5nUmVwb3J0Iiwic2V0RWRpdGluZ1JlcG9ydCIsImRlbGV0aW5nUmVwb3J0Iiwic2V0RGVsZXRpbmdSZXBvcnQiLCJwYXJhbXMiLCJkYXRhIiwicmVwb3J0cyIsImlzTG9hZGluZyIsImVycm9yIiwiY3JlYXRlUmVwb3J0IiwidXBkYXRlUmVwb3J0IiwiZGVsZXRlUmVwb3J0IiwibWVzc2FnZSIsImNvbHVtbnMiLCJrZXkiLCJoZWFkZXIiLCJyZW5kZXIiLCJ2YWx1ZSIsImVuIiwibmFtZSIsImEiLCJocmVmIiwidGFyZ2V0IiwicmVsIiwiY2xhc3NOYW1lIiwiZGl2IiwiaDEiLCJwIiwiYnV0dG9uIiwidHlwZSIsIm9uQ2xpY2siLCJsZW5ndGgiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwiYnV0dG9uVGV4dCIsIm9uRWRpdCIsIm9uRGVsZXRlIiwib3BlbiIsIm9uQ2xvc2UiLCJzaXRlSWQiLCJvblN1Ym1pdCIsIm11dGF0ZUFzeW5jIiwib25DYW5jZWwiLCJpbml0aWFsRGF0YSIsImlkIiwib25Db25maXJtIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/components/views/Reports.tsx\n"));

/***/ })

});