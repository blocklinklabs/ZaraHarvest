module.exports = [
"[project]/components/ui/card.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardAction",
    ()=>CardAction,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Card({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
function CardHeader({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-header",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
function CardTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("leading-none font-semibold", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
function CardDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground text-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function CardAction({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-action",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
function CardContent({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-content",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
function CardFooter({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "card-footer",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex items-center px-6 [.border-t]:pt-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/card.tsx",
        lineNumber: 76,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Select({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
        "data-slot": "select",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 10
    }, this);
}
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 24,
        columnNumber: 10
    }, this);
}
function SelectTrigger({ className, size = "default", children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
function SelectContent({ className, children, position = "popper", ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 72,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 61,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, this);
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 93,
        columnNumber: 5
    }, this);
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/components/ui/select.tsx",
                        lineNumber: 117,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/ui/select.tsx",
                    lineNumber: 116,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/components/ui/select.tsx",
                lineNumber: 120,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/components/ui/select.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/ui/select.tsx",
        lineNumber: 161,
        columnNumber: 5
    }, this);
}
;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/artifacts/contracts/AgriYield.sol/AgriYield.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"_format\":\"hh-sol-artifact-1\",\"contractName\":\"AgriYield\",\"sourceName\":\"contracts/AgriYield.sol\",\"abi\":[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"ERC721IncorrectOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721InsufficientApproval\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"approver\",\"type\":\"address\"}],\"name\":\"ERC721InvalidApprover\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"ERC721InvalidOperator\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"ERC721InvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"receiver\",\"type\":\"address\"}],\"name\":\"ERC721InvalidReceiver\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"ERC721InvalidSender\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ERC721NonexistentToken\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"OwnableInvalidOwner\",\"type\":\"error\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"OwnableUnauthorizedAccount\",\"type\":\"error\"},{\"inputs\":[],\"name\":\"ReentrancyGuardReentrantCall\",\"type\":\"error\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"approved\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Approval\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"ApprovalForAll\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_fromTokenId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_toTokenId\",\"type\":\"uint256\"}],\"name\":\"BatchMetadataUpdate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"location\",\"type\":\"string\"}],\"name\":\"FarmerRegistered\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"FarmerRewarded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"cropType\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"quantity\",\"type\":\"uint256\"}],\"name\":\"HarvestTokenMinted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"loanId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"collateralPredictionId\",\"type\":\"uint256\"}],\"name\":\"LoanCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"loanId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"}],\"name\":\"LoanRepaid\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"MetadataUpdate\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"newScore\",\"type\":\"uint256\"}],\"name\":\"ReputationUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"}],\"name\":\"RewardsFunded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"eventType\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"location\",\"type\":\"string\"}],\"name\":\"SupplyChainEventAdded\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"Transfer\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"predictionId\",\"type\":\"uint256\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"string\",\"name\":\"cropType\",\"type\":\"string\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"predictedYield\",\"type\":\"uint256\"}],\"name\":\"YieldPredictionCreated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint256\",\"name\":\"predictionId\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"actualYield\",\"type\":\"uint256\"}],\"name\":\"YieldVerified\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"_eventType\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_location\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_notes\",\"type\":\"string\"}],\"name\":\"addSupplyChainEvent\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"approve\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"}],\"name\":\"balanceOf\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_cropType\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_predictedYield\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_confidence\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_harvestDate\",\"type\":\"uint256\"}],\"name\":\"createYieldPrediction\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"defaultInterestRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"farmerLoans\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"farmerPredictions\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"farmerTokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"farmers\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"walletAddress\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"location\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"totalFarmSize\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"registrationDate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"reputationScore\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isActive\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"fundRewards\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"getApproved\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_farmer\",\"type\":\"address\"}],\"name\":\"getFarmerLoans\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_farmer\",\"type\":\"address\"}],\"name\":\"getFarmerPredictions\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_farmer\",\"type\":\"address\"}],\"name\":\"getFarmerTokens\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_loanId\",\"type\":\"uint256\"}],\"name\":\"getLoanDetails\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"totalOwed\",\"type\":\"uint256\"},{\"internalType\":\"enum AgriYield.LoanStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"dueDate\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_tokenId\",\"type\":\"uint256\"}],\"name\":\"getSupplyChainEvents\",\"outputs\":[{\"components\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"eventType\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"location\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"actor\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"notes\",\"type\":\"string\"}],\"internalType\":\"struct AgriYield.SupplyChainEvent[]\",\"name\":\"\",\"type\":\"tuple[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"harvestTokens\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"cropType\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"quantity\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"harvestDate\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"qualityGrade\",\"type\":\"string\"},{\"internalType\":\"bool\",\"name\":\"isLocked\",\"type\":\"bool\"},{\"internalType\":\"string\",\"name\":\"metadataURI\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"}],\"name\":\"isApprovedForAll\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"loans\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"loanId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"borrower\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"collateralPredictionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"interestRate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"startDate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"dueDate\",\"type\":\"uint256\"},{\"internalType\":\"enum AgriYield.LoanStatus\",\"name\":\"status\",\"type\":\"uint8\"},{\"internalType\":\"uint256\",\"name\":\"repaidAmount\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"maxLoanDuration\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"minCollateralRatio\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_cropType\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_quantity\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"_qualityGrade\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_metadataURI\",\"type\":\"string\"}],\"name\":\"mintHarvestToken\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"name\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nextLoanId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nextPredictionId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"nextTokenId\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"ownerOf\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"platformFeeRate\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_location\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_totalFarmSize\",\"type\":\"uint256\"}],\"name\":\"registerFarmer\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_loanId\",\"type\":\"uint256\"}],\"name\":\"repayLoan\",\"outputs\":[],\"stateMutability\":\"payable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_collateralPredictionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"requestLoan\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_farmer\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"}],\"name\":\"rewardFarmer\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"safeTransferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"operator\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"approved\",\"type\":\"bool\"}],\"name\":\"setApprovalForAll\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"supplyChainEvents\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"},{\"internalType\":\"string\",\"name\":\"eventType\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"location\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"timestamp\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"actor\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"notes\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"symbol\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"tokenURI\",\"outputs\":[{\"internalType\":\"string\",\"name\":\"\",\"type\":\"string\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"from\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"to\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"tokenId\",\"type\":\"uint256\"}],\"name\":\"transferFrom\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"string\",\"name\":\"_name\",\"type\":\"string\"},{\"internalType\":\"string\",\"name\":\"_location\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"_totalFarmSize\",\"type\":\"uint256\"}],\"name\":\"updateFarmerProfile\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_platformFeeRate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_defaultInterestRate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_maxLoanDuration\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minCollateralRatio\",\"type\":\"uint256\"}],\"name\":\"updatePlatformSettings\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_predictionId\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_actualYield\",\"type\":\"uint256\"}],\"name\":\"verifyYield\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"withdrawPlatformFees\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"yieldPredictions\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"predictionId\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"farmer\",\"type\":\"address\"},{\"internalType\":\"string\",\"name\":\"cropType\",\"type\":\"string\"},{\"internalType\":\"uint256\",\"name\":\"predictedYield\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"confidence\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"predictionDate\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"harvestDate\",\"type\":\"uint256\"},{\"internalType\":\"bool\",\"name\":\"isVerified\",\"type\":\"bool\"},{\"internalType\":\"uint256\",\"name\":\"actualYield\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"stateMutability\":\"payable\",\"type\":\"receive\"}],\"bytecode\":\"0x608060405260016011556001601255600160135560fa6014556104b06015556301e13380601655609660175534801561003757600080fd5b50336040518060400160405280601781526020017f416772695969656c64204861727665737420546f6b656e000000000000000000815250604051806040016040528060048152602001634147524960e01b815250816000908161009b91906101de565b5060016100a882826101de565b5050506001600160a01b0381166100d957604051631e4fbdf760e01b81526000600482015260240160405180910390fd5b6100e2816100ed565b50600160085561029c565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b634e487b7160e01b600052604160045260246000fd5b600181811c9082168061016957607f821691505b60208210810361018957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156101d957806000526020600020601f840160051c810160208510156101b65750805b601f840160051c820191505b818110156101d657600081556001016101c2565b50505b505050565b81516001600160401b038111156101f7576101f761013f565b61020b816102058454610155565b8461018f565b6020601f82116001811461023f57600083156102275750848201515b600019600385901b1c1916600184901b1784556101d6565b600084815260208120601f198516915b8281101561026f578785015182556020948501946001909201910161024f565b508482101561028d5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b61414e806102ab6000396000f3fe6080604052600436106102975760003560e01c806397ba18ae1161015a578063c87b56dd116100c1578063e931d3b41161007a578063e931d3b41461088a578063e985e9c5146108b7578063eeca08f0146108d7578063f1f72d71146108ed578063f2fde38b1461090d578063ff18bf0b1461092d57600080fd5b8063c87b56dd14610777578063d0b7830b14610797578063d8d9292e146107ac578063d9035ef3146107c2578063d9b332c6146107e2578063e1ec3c681461080257600080fd5b8063aa452fa611610113578063aa452fa6146106c4578063aa5e71de146106e4578063ab7b1c8914610704578063b88d4fde14610717578063bc31188b14610737578063c408ea6b1461075757600080fd5b806397ba18ae146105f95780639bf7237a1461062e5780639c9102501461064e578063a22cb4651461066e578063a3c4f2091461068e578063a4be77ee146106ae57600080fd5b80636352211e116101fe57806383c4ee25116101b757806383c4ee251461056457806384da26661461058457806386c1c74d1461059a57806387c51459146105b05780638da5cb5b146105c657806395d89b41146105e457600080fd5b80636352211e146104a857806366877b8d146104c857806370a08231146104f9578063715018a61461051957806375794a3c1461052e578063810699b61461054457600080fd5b806323b872dd1161025057806323b872dd146103b45780632a31c74c146103d457806334a100ce146103f4578063401b21681461042857806342842e0e1461045b5780634c388dd71461047b57600080fd5b806301ffc9a7146102a3578063062cd401146102d857806306fdde031461030a578063081812fc1461032c578063095ea7b3146103645780631d879de61461038657600080fd5b3661029e57005b600080fd5b3480156102af57600080fd5b506102c36102be366004613607565b610935565b60405190151581526020015b60405180910390f35b3480156102e457600080fd5b506102f86102f3366004613624565b610946565b6040516102cf96959493929190613696565b34801561031657600080fd5b5061031f610b45565b6040516102cf91906136f8565b34801561033857600080fd5b5061034c61034736600461370b565b610bd7565b6040516001600160a01b0390911681526020016102cf565b34801561037057600080fd5b5061038461037f366004613740565b610c00565b005b34801561039257600080fd5b506103a66103a1366004613740565b610c0f565b6040519081526020016102cf565b3480156103c057600080fd5b506103846103cf36600461376a565b610c40565b3480156103e057600080fd5b506103846103ef3660046137a7565b610cd0565b34801561040057600080fd5b5061041461040f36600461370b565b610cec565b6040516102cf9897969594939291906137d9565b34801561043457600080fd5b5061044861044336600461384d565b610ed8565b6040516102cf9796959493929190613868565b34801561046757600080fd5b5061038461047636600461376a565b611031565b34801561048757600080fd5b5061049b61049636600461384d565b611051565b6040516102cf91906138c7565b3480156104b457600080fd5b5061034c6104c336600461370b565b6110bd565b3480156104d457600080fd5b506104e86104e336600461370b565b6110c8565b6040516102cf959493929190613942565b34801561050557600080fd5b506103a661051436600461384d565b61111c565b34801561052557600080fd5b50610384611164565b34801561053a57600080fd5b506103a660135481565b34801561055057600080fd5b5061038461055f366004613a2b565b611178565b34801561057057600080fd5b5061049b61057f36600461384d565b6111dc565b34801561059057600080fd5b506103a660175481565b3480156105a657600080fd5b506103a660155481565b3480156105bc57600080fd5b506103a660125481565b3480156105d257600080fd5b506007546001600160a01b031661034c565b3480156105f057600080fd5b5061031f611246565b34801561060557600080fd5b5061061961061436600461370b565b611255565b6040516102cf99989796959493929190613ac6565b34801561063a57600080fd5b50610384610649366004613740565b611334565b34801561065a57600080fd5b506103a6610669366004613740565b6114b5565b34801561067a57600080fd5b50610384610689366004613b27565b6114d1565b34801561069a57600080fd5b506103a66106a9366004613b63565b6114dc565b3480156106ba57600080fd5b506103a660165481565b3480156106d057600080fd5b506103a66106df366004613624565b61187b565b3480156106f057600080fd5b506103846106ff366004613624565b611be0565b61038461071236600461370b565b611d9e565b34801561072357600080fd5b50610384610732366004613bbe565b611f47565b34801561074357600080fd5b5061049b61075236600461384d565b611f5f565b34801561076357600080fd5b506103a6610772366004613c2d565b611fc9565b34801561078357600080fd5b5061031f61079236600461370b565b6122a8565b3480156107a357600080fd5b506103846122b3565b3480156107b857600080fd5b506103a660115481565b3480156107ce57600080fd5b506103a66107dd366004613740565b6122f4565b3480156107ee57600080fd5b506103846107fd366004613c80565b612310565b34801561080e57600080fd5b5061087561081d36600461370b565b600b6020526000908152604090208054600182015460028301546003840154600485015460058601546006870154600788015460089098015496976001600160a01b03909616969495939492939192909160ff169089565b6040516102cf99989796959493929190613cf1565b34801561089657600080fd5b506108aa6108a536600461370b565b612555565b6040516102cf9190613d4d565b3480156108c357600080fd5b506102c36108d2366004613e19565b6127a8565b3480156108e357600080fd5b506103a660145481565b3480156108f957600080fd5b50610384610908366004613c80565b6127d6565b34801561091957600080fd5b5061038461092836600461384d565b61283d565b610384612878565b600061094082612902565b92915050565b600d602052816000526040600020818154811061096257600080fd5b90600052602060002090600602016000915091505080600001549080600101805461098c90613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546109b890613e4c565b8015610a055780601f106109da57610100808354040283529160200191610a05565b820191906000526020600020905b8154815290600101906020018083116109e857829003601f168201915b505050505090806002018054610a1a90613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4690613e4c565b8015610a935780601f10610a6857610100808354040283529160200191610a93565b820191906000526020600020905b815481529060010190602001808311610a7657829003601f168201915b5050505060038301546004840154600585018054949592946001600160a01b03909216935090610ac290613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610aee90613e4c565b8015610b3b5780601f10610b1057610100808354040283529160200191610b3b565b820191906000526020600020905b815481529060010190602001808311610b1e57829003601f168201915b5050505050905086565b606060008054610b5490613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8090613e4c565b8015610bcd5780601f10610ba257610100808354040283529160200191610bcd565b820191906000526020600020905b815481529060010190602001808311610bb057829003601f168201915b5050505050905090565b6000610be282612927565b506000828152600460205260409020546001600160a01b0316610940565b610c0b828233612960565b5050565b600f6020528160005260406000208181548110610c2b57600080fd5b90600052602060002001600091509150505481565b6001600160a01b038216610c6f57604051633250574960e11b8152600060048201526024015b60405180910390fd5b6000610c7c83833361296d565b9050836001600160a01b0316816001600160a01b031614610cca576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610c66565b50505050565b610cd8612a66565b601493909355601591909155601655601755565b600c6020526000908152604090208054600182015460028301805492936001600160a01b0390921692610d1e90613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610d4a90613e4c565b8015610d975780601f10610d6c57610100808354040283529160200191610d97565b820191906000526020600020905b815481529060010190602001808311610d7a57829003601f168201915b505050505090806003015490806004015490806005018054610db890613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610de490613e4c565b8015610e315780601f10610e0657610100808354040283529160200191610e31565b820191906000526020600020905b815481529060010190602001808311610e1457829003601f168201915b5050506006840154600785018054949560ff909216949193509150610e5590613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610e8190613e4c565b8015610ece5780601f10610ea357610100808354040283529160200191610ece565b820191906000526020600020905b815481529060010190602001808311610eb157829003601f168201915b5050505050905088565b600960205260009081526040902080546001820180546001600160a01b039092169291610f0490613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610f3090613e4c565b8015610f7d5780601f10610f5257610100808354040283529160200191610f7d565b820191906000526020600020905b815481529060010190602001808311610f6057829003601f168201915b505050505090806002018054610f9290613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610fbe90613e4c565b801561100b5780601f10610fe05761010080835404028352916020019161100b565b820191906000526020600020905b815481529060010190602001808311610fee57829003601f168201915b505050506003830154600484015460058501546006909501549394919390925060ff1687565b61104c83838360405180602001604052806000815250611f47565b505050565b6001600160a01b0381166000908152601060209081526040918290208054835181840281018401909452808452606093928301828280156110b157602002820191906000526020600020905b81548152602001906001019080831161109d575b50505050509050919050565b600061094082612927565b6000818152600b60205260408120600181015460028201548392839283928392916001600160a01b0316906110fc89612a93565b6007840154600690940154929a919950975060ff90921695509350915050565b60006001600160a01b038216611148576040516322718ad960e21b815260006004820152602401610c66565b506001600160a01b031660009081526003602052604090205490565b61116c612a66565b6111766000612b00565b565b6000848152600260205260409020546001600160a01b031633146111d05760405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b6044820152606401610c66565b610cca84848484612b52565b6001600160a01b0381166000908152600e60209081526040918290208054835181840281018401909452808452606093928301828280156110b1576020028201919060005260206000209081548152602001906001019080831161109d5750505050509050919050565b606060018054610b5490613e4c565b600a6020526000908152604090208054600182015460028301805492936001600160a01b039092169261128790613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546112b390613e4c565b80156113005780601f106112d557610100808354040283529160200191611300565b820191906000526020600020905b8154815290600101906020018083116112e357829003601f168201915b50505060038401546004850154600586015460068701546007880154600890980154969793969295509093509160ff169089565b61133c612a66565b6001600160a01b03821661138b5760405162461bcd60e51b8152602060048201526016602482015275496e76616c6964206661726d6572206164647265737360501b6044820152606401610c66565b600081116113e75760405162461bcd60e51b8152602060048201526024808201527f52657761726420616d6f756e74206d75737420626520677265617465722074686044820152630616e20360e41b6064820152608401610c66565b804710156114375760405162461bcd60e51b815260206004820152601d60248201527f496e73756666696369656e7420636f6e74726163742062616c616e63650000006044820152606401610c66565b6040516001600160a01b0383169082156108fc029083906000818181858888f1935050505015801561146d573d6000803e3d6000fd5b50604080518281524260208201526001600160a01b038416917f0fd0b3d0a7d959be97b96e6b601af5f43aa30cac9c2a7b88f1ed08256d1e5b26910160405180910390a25050565b600e6020528160005260406000208181548110610c2b57600080fd5b610c0b338383612c55565b3360009081526009602052604081206006015460ff1661150e5760405162461bcd60e51b8152600401610c6690613e86565b600085511161155b5760405162461bcd60e51b815260206004820152601960248201527843726f7020747970652063616e6e6f7420626520656d70747960381b6044820152606401610c66565b600084116115ab5760405162461bcd60e51b815260206004820152601f60248201527f5175616e74697479206d7573742062652067726561746572207468616e2030006044820152606401610c66565b60008351116115fc5760405162461bcd60e51b815260206004820152601d60248201527f5175616c6974792067726164652063616e6e6f7420626520656d7074790000006044820152606401610c66565b601380546000918261160d83613ecb565b9091555060408051610100810182528281523360208083019182528284018b8152606084018b905242608085015260a084018a9052600060c0850181905260e085018a9052868152600c9092529390208251815590516001820180546001600160a01b0319166001600160a01b0390921691909117905591519293509160028201906116999082613f2b565b50606082015160038201556080820151600482015560a082015160058201906116c29082613f2b565b5060c082015160068201805460ff191691151591909117905560e082015160078201906116ef9082613f2b565b50503360008181526010602090815260408220805460018101825590835291200183905561171e915082612cf4565b6117288184612d59565b61182e81604051806040016040528060098152602001681a185c9d995cdd195960ba1b81525060096000336001600160a01b03166001600160a01b03168152602001908152602001600020600201805461178190613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546117ad90613e4c565b80156117fa5780601f106117cf576101008083540402835291602001916117fa565b820191906000526020600020905b8154815290600101906020018083116117dd57829003601f168201915b50505050506040518060400160405280601181526020017012185c9d995cdd0818dbdb5c1b195d1959607a1b815250612b52565b336001600160a01b0316817f7f6be1beafd45ff8f8f07b44f66c86bfa5e05918ea2683dcef70cd8b442a68e4888860405161186a929190613fe9565b60405180910390a395945050505050565b3360009081526009602052604081206006015460ff166118ad5760405162461bcd60e51b8152600401610c6690613e86565b6000838152600a6020526040902060018101546001600160a01b0316331461190d5760405162461bcd60e51b81526020600482015260136024820152722737ba103cb7bab910383932b234b1ba34b7b760691b6044820152606401610c66565b600781015460ff16156119775760405162461bcd60e51b815260206004820152602c60248201527f43616e6e6f74207573652076657269666965642070726564696374696f6e206160448201526b1cc818dbdb1b185d195c985b60a21b6064820152608401610c66565b806006015442106119bf5760405162461bcd60e51b8152602060048201526012602482015271141c99591a58dd1a5bdb88195e1c1a5c995960721b6044820152606401610c66565b6000601754826003015460646119d5919061400b565b6119df9190614022565b905080841115611a3d5760405162461bcd60e51b8152602060048201526024808201527f4c6f616e20616d6f756e74206578636565647320636f6c6c61746572616c2076604482015263616c756560e01b6064820152608401610c66565b6012805460009182611a4e83613ecb565b919050559050600060165442611a649190614044565b60408051610120810182528481523360208083019182528284018b8152606084018d8152601554608086019081524260a0870190815260c08701898152600060e089018181526101008a018290528d8252600b90975298909820875181559551600180880180546001600160a01b0319166001600160a01b039093169290921790915593516002870155915160038087019190915590516004860155905160058501559451600684015590516007830180549697509395929490939260ff191691908490811115611b3757611b3761390a565b02179055506101009190910151600890910155336000818152600f6020908152604080832080546001810182559084529183209091018590555188156108fc0291899190818181858888f19350505050158015611b98573d6000803e3d6000fd5b506040805187815260208101899052339184917f3373919ad665425d2cddb4072830e5935b6ee308440fa99b23383648da473bc0910160405180910390a35095945050505050565b6000828152600a6020526040902060018101546001600160a01b03163314611c405760405162461bcd60e51b81526020600482015260136024820152722737ba103cb7bab910383932b234b1ba34b7b760691b6044820152606401610c66565b8060060154421015611c945760405162461bcd60e51b815260206004820152601860248201527f486172766573742064617465206e6f74207265616368656400000000000000006044820152606401610c66565b600781015460ff1615611cdc5760405162461bcd60e51b815260206004820152601060248201526f105b1c9958591e481d995c9a599a595960821b6044820152606401610c66565b60008211611d385760405162461bcd60e51b815260206004820152602360248201527f41637475616c207969656c64206d75737420626520677265617465722074686160448201526206e20360ec1b6064820152608401610c66565b6008810182905560078101805460ff191660011790556003810154611d5f90339084612da9565b827f041362481eac9e998110a97c7b09c2f96366bd12f662604be3ed250786d04e5383604051611d9191815260200190565b60405180910390a2505050565b611da6612ed4565b6000818152600b6020526040902060018101546001600160a01b03163314611e005760405162461bcd60e51b815260206004820152600d60248201526c2737ba103cb7bab9103637b0b760991b6044820152606401610c66565b6000600782015460ff166003811115611e1b57611e1b61390a565b14611e5a5760405162461bcd60e51b815260206004820152600f60248201526e4c6f616e206e6f742061637469766560881b6044820152606401610c66565b6000611e6583612a93565b9050816008015481611e779190614057565b341015611ebd5760405162461bcd60e51b8152602060048201526014602482015273125b9cdd59999a58da595b9d081c185e5b595b9d60621b6044820152606401610c66565b34826008016000828254611ed19190614044565b909155505060088201548111611efe5760078201805460ff19166001908117909155611efe903390612efe565b827f040cee90ee4799897c30ca04e5feb6fa43dbba9b6d084b4b257cdafd84ba013e34604051611f3091815260200190565b60405180910390a25050611f446001600855565b50565b611f52848484610c40565b610cca3385858585612f93565b6001600160a01b0381166000908152600f60209081526040918290208054835181840281018401909452808452606093928301828280156110b1576020028201919060005260206000209081548152602001906001019080831161109d5750505050509050919050565b3360009081526009602052604081206006015460ff16611ffb5760405162461bcd60e51b8152600401610c6690613e86565b60008551116120485760405162461bcd60e51b815260206004820152601960248201527843726f7020747970652063616e6e6f7420626520656d70747960381b6044820152606401610c66565b600084116120a75760405162461bcd60e51b815260206004820152602660248201527f507265646963746564207969656c64206d75737420626520677265617465722060448201526507468616e20360d41b6064820152608401610c66565b6000831180156120b8575060648311155b6121045760405162461bcd60e51b815260206004820181905260248201527f436f6e666964656e6365206d757374206265206265747765656e20312d3130306044820152606401610c66565b42821161215e5760405162461bcd60e51b815260206004820152602260248201527f486172766573742064617465206d75737420626520696e207468652066757475604482015261726560f01b6064820152608401610c66565b601180546000918261216f83613ecb565b9091555060408051610120810182528281523360208083019182528284018b8152606084018b9052608084018a90524260a085015260c08401899052600060e085018190526101008501819052868152600a9092529390208251815590516001820180546001600160a01b0319166001600160a01b0390921691909117905591519293509160028201906122039082613f2b565b50606082015160038201556080820151600482015560a0820151600582015560c0820151600682015560e082015160078201805460ff191691151591909117905561010090910151600890910155336000818152600e60209081526040808320805460018101825590845291909220018390555182907faa8d855ed4bfd5e4635e8b83bda8a57920b14fce6911d0b400a61aee00d9ec8d9061186a908a908a90613fe9565b6060610940826130be565b6122bb612a66565b6007546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015611f44573d6000803e3d6000fd5b60106020528160005260406000208181548110610c2b57600080fd5b3360009081526009602052604090206006015460ff16156123735760405162461bcd60e51b815260206004820152601960248201527f4661726d657220616c72656164792072656769737465726564000000000000006044820152606401610c66565b60008351116123bb5760405162461bcd60e51b81526020600482015260146024820152734e616d652063616e6e6f7420626520656d70747960601b6044820152606401610c66565b600082511161240c5760405162461bcd60e51b815260206004820152601860248201527f4c6f636174696f6e2063616e6e6f7420626520656d70747900000000000000006044820152606401610c66565b6000811161245c5760405162461bcd60e51b815260206004820181905260248201527f4661726d2073697a65206d7573742062652067726561746572207468616e20306044820152606401610c66565b6040805160e081018252338082526020808301878152838501879052606084018690524260808501526101f460a0850152600160c085018190526000938452600990925293909120825181546001600160a01b0319166001600160a01b039091161781559251919291908201906124d39082613f2b565b50604082015160028201906124e89082613f2b565b50606082015160038201556080820151600482015560a0820151600582015560c0909101516006909101805460ff191691151591909117905560405133907f851322da2e414e9965ce5ecef6890861b23f27fe84bd9646b7de8aea70efcb5690611d91908690869061406a565b6060600d6000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561279d57838290600052602060002090600602016040518060c0016040529081600082015481526020016001820180546125c790613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546125f390613e4c565b80156126405780601f1061261557610100808354040283529160200191612640565b820191906000526020600020905b81548152906001019060200180831161262357829003601f168201915b5050505050815260200160028201805461265990613e4c565b80601f016020809104026020016040519081016040528092919081815260200182805461268590613e4c565b80156126d25780601f106126a7576101008083540402835291602001916126d2565b820191906000526020600020905b8154815290600101906020018083116126b557829003601f168201915b50505091835250506003820154602082015260048201546001600160a01b0316604082015260058201805460609092019161270c90613e4c565b80601f016020809104026020016040519081016040528092919081815260200182805461273890613e4c565b80156127855780601f1061275a57610100808354040283529160200191612785565b820191906000526020600020905b81548152906001019060200180831161276857829003601f168201915b5050505050815250508152602001906001019061258a565b505050509050919050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b3360009081526009602052604090206006015460ff166128085760405162461bcd60e51b8152600401610c6690613e86565b336000908152600960205260409020600181016128258582613f2b565b50600281016128348482613f2b565b50600301555050565b612845612a66565b6001600160a01b03811661286f57604051631e4fbdf760e01b815260006004820152602401610c66565b611f4481612b00565b600034116128c85760405162461bcd60e51b815260206004820152601e60248201527f4d7573742073656e64204842415220746f2066756e64207265776172647300006044820152606401610c66565b604080513481524260208201527f2dd743ff6dc3e58c7665f23ce0cd8508028f1da1cf36d0ef53eb6576f1d0dfad910160405180910390a1565b60006001600160e01b03198216632483248360e11b14806109405750610940826131cf565b6000818152600260205260408120546001600160a01b03168061094057604051637e27328960e01b815260048101849052602401610c66565b61104c838383600161321f565b6000828152600260205260408120546001600160a01b039081169083161561299a5761299a818486613325565b6001600160a01b038116156129d8576129b760008560008061321f565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615612a07576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6007546001600160a01b031633146111765760405163118cdaa760e01b8152336004820152602401610c66565b6000818152600b6020526040812060058101548290612ab29042614057565b9050600064496cebb8008284600401548560020154612ad1919061400b565b612adb919061400b565b612ae59190614022565b9050808360020154612af79190614044565b95945050505050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000848152600d60209081526040808320815160c08101835288815280840188815292810187905242606082015233608082015260a08101869052815460018181018455928652939094208451600690940201928355905190820190612bb89082613f2b565b5060408201516002820190612bcd9082613f2b565b506060820151600382015560808201516004820180546001600160a01b0319166001600160a01b0390921691909117905560a08201516005820190612c129082613f2b565b505050837fb7a384b06f421548c9c4f535ecea50f4f86606bb194a429f12f763313057472a8484604051612c4792919061406a565b60405180910390a250505050565b6001600160a01b038216612c8757604051630b61174360e31b81526001600160a01b0383166004820152602401610c66565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038216612d1e57604051633250574960e11b815260006004820152602401610c66565b6000612d2c8383600061296d565b90506001600160a01b0381161561104c576040516339e3563760e11b815260006004820152602401610c66565b6000828152600660205260409020612d718282613f2b565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b6001600160a01b038316600090815260096020526040812090828410612de65783612dd584606461400b565b612ddf9190614022565b9050612dff565b82612df285606461400b565b612dfc9190614022565b90505b605a8110612e2d57612e2382600501546032612e1b9190614044565b6103e8613389565b6005830155612e86565b60508110612e4957612e2382600501546019612e1b9190614044565b60468110612e6557612e238260050154600a612e1b9190614044565b612e8060198360050154612e799190614057565b60006133a1565b60058301555b846001600160a01b03167ffc577563f1b9a0461e24abef1e1fcc0d33d3d881f20b5df6dda59de4aae2c8218360050154604051612ec591815260200190565b60405180910390a25050505050565b600260085403612ef757604051633ee5aeb560e01b815260040160405180910390fd5b6002600855565b6001600160a01b03821660009081526009602052604090208115612f3a57612f308160050154601e612e1b9190614044565b6005820155612f54565b612f4e60328260050154612e799190614057565b60058201555b826001600160a01b03167ffc577563f1b9a0461e24abef1e1fcc0d33d3d881f20b5df6dda59de4aae2c8218260050154604051611d9191815260200190565b6001600160a01b0383163b156130b757604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290612fd590889088908790879060040161408f565b6020604051808303816000875af1925050508015613010575060408051601f3d908101601f1916820190925261300d918101906140cc565b60015b613079573d80801561303e576040519150601f19603f3d011682016040523d82523d6000602084013e613043565b606091505b50805160000361307157604051633250574960e11b81526001600160a01b0385166004820152602401610c66565b805160208201fd5b6001600160e01b03198116630a85bd0160e11b146130b557604051633250574960e11b81526001600160a01b0385166004820152602401610c66565b505b5050505050565b60606130c982612927565b50600082815260066020526040812080546130e390613e4c565b80601f016020809104026020016040519081016040528092919081815260200182805461310f90613e4c565b801561315c5780601f106131315761010080835404028352916020019161315c565b820191906000526020600020905b81548152906001019060200180831161313f57829003601f168201915b50505050509050600061317a60408051602081019091526000815290565b9050805160000361318c575092915050565b8151156131be5780826040516020016131a69291906140e9565b60405160208183030381529060405292505050919050565b6131c7846133b0565b949350505050565b60006001600160e01b031982166380ac58cd60e01b148061320057506001600160e01b03198216635b5e139f60e01b145b8061094057506301ffc9a760e01b6001600160e01b0319831614610940565b808061323357506001600160a01b03821615155b156132f557600061324384612927565b90506001600160a01b0383161580159061326f5750826001600160a01b0316816001600160a01b031614155b8015613282575061328081846127a8565b155b156132ab5760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610c66565b81156132f35783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b613330838383613424565b61104c576001600160a01b03831661335e57604051637e27328960e01b815260048101829052602401610c66565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610c66565b6000818310613398578161339a565b825b9392505050565b6000818311613398578161339a565b60606133bb82612927565b5060006133d360408051602081019091526000815290565b905060008151116133f3576040518060200160405280600081525061339a565b806133fd84613487565b60405160200161340e9291906140e9565b6040516020818303038152906040529392505050565b60006001600160a01b038316158015906131c75750826001600160a01b0316846001600160a01b0316148061345e575061345e84846127a8565b806131c75750506000908152600460205260409020546001600160a01b03908116911614919050565b6060600061349483613519565b60010190506000816001600160401b038111156134b3576134b361397d565b6040519080825280601f01601f1916602001820160405280156134dd576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846134e757509392505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106135585772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310613584576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106135a257662386f26fc10000830492506010015b6305f5e10083106135ba576305f5e100830492506008015b61271083106135ce57612710830492506004015b606483106135e0576064830492506002015b600a83106109405760010192915050565b6001600160e01b031981168114611f4457600080fd5b60006020828403121561361957600080fd5b813561339a816135f1565b6000806040838503121561363757600080fd5b50508035926020909101359150565b60005b83811015613661578181015183820152602001613649565b50506000910152565b60008151808452613682816020860160208601613646565b601f01601f19169290920160200192915050565b86815260c0602082015260006136af60c083018861366a565b82810360408401526136c1818861366a565b606084018790526001600160a01b038616608085015283810360a085015290506136eb818561366a565b9998505050505050505050565b60208152600061339a602083018461366a565b60006020828403121561371d57600080fd5b5035919050565b80356001600160a01b038116811461373b57600080fd5b919050565b6000806040838503121561375357600080fd5b61375c83613724565b946020939093013593505050565b60008060006060848603121561377f57600080fd5b61378884613724565b925061379660208501613724565b929592945050506040919091013590565b600080600080608085870312156137bd57600080fd5b5050823594602084013594506040840135936060013592509050565b8881526001600160a01b0388166020820152610100604082018190526000906138049083018961366a565b87606084015286608084015282810360a0840152613822818761366a565b905084151560c084015282810360e084015261383e818561366a565b9b9a5050505050505050505050565b60006020828403121561385f57600080fd5b61339a82613724565b6001600160a01b038816815260e06020820181905260009061388c9083018961366a565b828103604084015261389e818961366a565b9150508560608301528460808301528360a083015282151560c083015298975050505050505050565b602080825282518282018190526000918401906040840190835b818110156138ff5783518352602093840193909201916001016138e1565b509095945050505050565b634e487b7160e01b600052602160045260246000fd5b6004811061393e57634e487b7160e01b600052602160045260246000fd5b9052565b6001600160a01b0386168152602081018590526040810184905260a0810161396d6060830185613920565b8260808301529695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000806001600160401b038411156139ad576139ad61397d565b50604051601f19601f85018116603f011681018181106001600160401b03821117156139db576139db61397d565b6040528381529050808284018510156139f357600080fd5b83836020830137600060208583010152509392505050565b600082601f830112613a1c57600080fd5b61339a83833560208501613993565b60008060008060808587031215613a4157600080fd5b8435935060208501356001600160401b03811115613a5e57600080fd5b613a6a87828801613a0b565b93505060408501356001600160401b03811115613a8657600080fd5b613a9287828801613a0b565b92505060608501356001600160401b03811115613aae57600080fd5b613aba87828801613a0b565b91505092959194509250565b8981526001600160a01b038916602082015261012060408201819052600090613af19083018a61366a565b606083019890985250608081019590955260a085019390935260c0840191909152151560e0830152610100909101529392505050565b60008060408385031215613b3a57600080fd5b613b4383613724565b915060208301358015158114613b5857600080fd5b809150509250929050565b60008060008060808587031215613b7957600080fd5b84356001600160401b03811115613b8f57600080fd5b613b9b87828801613a0b565b9450506020850135925060408501356001600160401b03811115613a8657600080fd5b60008060008060808587031215613bd457600080fd5b613bdd85613724565b9350613beb60208601613724565b92506040850135915060608501356001600160401b03811115613c0d57600080fd5b8501601f81018713613c1e57600080fd5b613aba87823560208401613993565b60008060008060808587031215613c4357600080fd5b84356001600160401b03811115613c5957600080fd5b613c6587828801613a0b565b97602087013597506040870135966060013595509350505050565b600080600060608486031215613c9557600080fd5b83356001600160401b03811115613cab57600080fd5b613cb786828701613a0b565b93505060208401356001600160401b03811115613cd357600080fd5b613cdf86828701613a0b565b93969395505050506040919091013590565b8981526001600160a01b038916602082015260408101889052606081018790526080810186905260a0810185905260c081018490526101208101613d3860e0830185613920565b826101008301529a9950505050505050505050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b82811015613e0d57603f19878603018452815180518652602081015160c06020880152613da560c088018261366a565b905060408201518782036040890152613dbe828261366a565b9150506060820151606088015260018060a01b03608083015116608088015260a0820151915086810360a0880152613df6818361366a565b965050506020938401939190910190600101613d75565b50929695505050505050565b60008060408385031215613e2c57600080fd5b613e3583613724565b9150613e4360208401613724565b90509250929050565b600181811c90821680613e6057607f821691505b602082108103613e8057634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526015908201527411985c9b595c881b9bdd081c9959da5cdd195c9959605a1b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600060018201613edd57613edd613eb5565b5060010190565b601f82111561104c57806000526020600020601f840160051c81016020851015613f0b5750805b601f840160051c820191505b818110156130b75760008155600101613f17565b81516001600160401b03811115613f4457613f4461397d565b613f5881613f528454613e4c565b84613ee4565b6020601f821160018114613f8c5760008315613f745750848201515b600019600385901b1c1916600184901b1784556130b7565b600084815260208120601f198516915b82811015613fbc5787850151825560209485019460019092019101613f9c565b5084821015613fda5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b604081526000613ffc604083018561366a565b90508260208301529392505050565b808202811582820484141761094057610940613eb5565b60008261403f57634e487b7160e01b600052601260045260246000fd5b500490565b8082018082111561094057610940613eb5565b8181038181111561094057610940613eb5565b60408152600061407d604083018561366a565b8281036020840152612af7818561366a565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906140c29083018461366a565b9695505050505050565b6000602082840312156140de57600080fd5b815161339a816135f1565b600083516140fb818460208801613646565b83519083019061410f818360208801613646565b0194935050505056fea2646970667358221220eac606a14db26cde74151c4fc2995f7d7a937605bd52c9516ac8367ce7a3cc0064736f6c634300081c0033\",\"deployedBytecode\":\"0x6080604052600436106102975760003560e01c806397ba18ae1161015a578063c87b56dd116100c1578063e931d3b41161007a578063e931d3b41461088a578063e985e9c5146108b7578063eeca08f0146108d7578063f1f72d71146108ed578063f2fde38b1461090d578063ff18bf0b1461092d57600080fd5b8063c87b56dd14610777578063d0b7830b14610797578063d8d9292e146107ac578063d9035ef3146107c2578063d9b332c6146107e2578063e1ec3c681461080257600080fd5b8063aa452fa611610113578063aa452fa6146106c4578063aa5e71de146106e4578063ab7b1c8914610704578063b88d4fde14610717578063bc31188b14610737578063c408ea6b1461075757600080fd5b806397ba18ae146105f95780639bf7237a1461062e5780639c9102501461064e578063a22cb4651461066e578063a3c4f2091461068e578063a4be77ee146106ae57600080fd5b80636352211e116101fe57806383c4ee25116101b757806383c4ee251461056457806384da26661461058457806386c1c74d1461059a57806387c51459146105b05780638da5cb5b146105c657806395d89b41146105e457600080fd5b80636352211e146104a857806366877b8d146104c857806370a08231146104f9578063715018a61461051957806375794a3c1461052e578063810699b61461054457600080fd5b806323b872dd1161025057806323b872dd146103b45780632a31c74c146103d457806334a100ce146103f4578063401b21681461042857806342842e0e1461045b5780634c388dd71461047b57600080fd5b806301ffc9a7146102a3578063062cd401146102d857806306fdde031461030a578063081812fc1461032c578063095ea7b3146103645780631d879de61461038657600080fd5b3661029e57005b600080fd5b3480156102af57600080fd5b506102c36102be366004613607565b610935565b60405190151581526020015b60405180910390f35b3480156102e457600080fd5b506102f86102f3366004613624565b610946565b6040516102cf96959493929190613696565b34801561031657600080fd5b5061031f610b45565b6040516102cf91906136f8565b34801561033857600080fd5b5061034c61034736600461370b565b610bd7565b6040516001600160a01b0390911681526020016102cf565b34801561037057600080fd5b5061038461037f366004613740565b610c00565b005b34801561039257600080fd5b506103a66103a1366004613740565b610c0f565b6040519081526020016102cf565b3480156103c057600080fd5b506103846103cf36600461376a565b610c40565b3480156103e057600080fd5b506103846103ef3660046137a7565b610cd0565b34801561040057600080fd5b5061041461040f36600461370b565b610cec565b6040516102cf9897969594939291906137d9565b34801561043457600080fd5b5061044861044336600461384d565b610ed8565b6040516102cf9796959493929190613868565b34801561046757600080fd5b5061038461047636600461376a565b611031565b34801561048757600080fd5b5061049b61049636600461384d565b611051565b6040516102cf91906138c7565b3480156104b457600080fd5b5061034c6104c336600461370b565b6110bd565b3480156104d457600080fd5b506104e86104e336600461370b565b6110c8565b6040516102cf959493929190613942565b34801561050557600080fd5b506103a661051436600461384d565b61111c565b34801561052557600080fd5b50610384611164565b34801561053a57600080fd5b506103a660135481565b34801561055057600080fd5b5061038461055f366004613a2b565b611178565b34801561057057600080fd5b5061049b61057f36600461384d565b6111dc565b34801561059057600080fd5b506103a660175481565b3480156105a657600080fd5b506103a660155481565b3480156105bc57600080fd5b506103a660125481565b3480156105d257600080fd5b506007546001600160a01b031661034c565b3480156105f057600080fd5b5061031f611246565b34801561060557600080fd5b5061061961061436600461370b565b611255565b6040516102cf99989796959493929190613ac6565b34801561063a57600080fd5b50610384610649366004613740565b611334565b34801561065a57600080fd5b506103a6610669366004613740565b6114b5565b34801561067a57600080fd5b50610384610689366004613b27565b6114d1565b34801561069a57600080fd5b506103a66106a9366004613b63565b6114dc565b3480156106ba57600080fd5b506103a660165481565b3480156106d057600080fd5b506103a66106df366004613624565b61187b565b3480156106f057600080fd5b506103846106ff366004613624565b611be0565b61038461071236600461370b565b611d9e565b34801561072357600080fd5b50610384610732366004613bbe565b611f47565b34801561074357600080fd5b5061049b61075236600461384d565b611f5f565b34801561076357600080fd5b506103a6610772366004613c2d565b611fc9565b34801561078357600080fd5b5061031f61079236600461370b565b6122a8565b3480156107a357600080fd5b506103846122b3565b3480156107b857600080fd5b506103a660115481565b3480156107ce57600080fd5b506103a66107dd366004613740565b6122f4565b3480156107ee57600080fd5b506103846107fd366004613c80565b612310565b34801561080e57600080fd5b5061087561081d36600461370b565b600b6020526000908152604090208054600182015460028301546003840154600485015460058601546006870154600788015460089098015496976001600160a01b03909616969495939492939192909160ff169089565b6040516102cf99989796959493929190613cf1565b34801561089657600080fd5b506108aa6108a536600461370b565b612555565b6040516102cf9190613d4d565b3480156108c357600080fd5b506102c36108d2366004613e19565b6127a8565b3480156108e357600080fd5b506103a660145481565b3480156108f957600080fd5b50610384610908366004613c80565b6127d6565b34801561091957600080fd5b5061038461092836600461384d565b61283d565b610384612878565b600061094082612902565b92915050565b600d602052816000526040600020818154811061096257600080fd5b90600052602060002090600602016000915091505080600001549080600101805461098c90613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546109b890613e4c565b8015610a055780601f106109da57610100808354040283529160200191610a05565b820191906000526020600020905b8154815290600101906020018083116109e857829003601f168201915b505050505090806002018054610a1a90613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4690613e4c565b8015610a935780601f10610a6857610100808354040283529160200191610a93565b820191906000526020600020905b815481529060010190602001808311610a7657829003601f168201915b5050505060038301546004840154600585018054949592946001600160a01b03909216935090610ac290613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610aee90613e4c565b8015610b3b5780601f10610b1057610100808354040283529160200191610b3b565b820191906000526020600020905b815481529060010190602001808311610b1e57829003601f168201915b5050505050905086565b606060008054610b5490613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610b8090613e4c565b8015610bcd5780601f10610ba257610100808354040283529160200191610bcd565b820191906000526020600020905b815481529060010190602001808311610bb057829003601f168201915b5050505050905090565b6000610be282612927565b506000828152600460205260409020546001600160a01b0316610940565b610c0b828233612960565b5050565b600f6020528160005260406000208181548110610c2b57600080fd5b90600052602060002001600091509150505481565b6001600160a01b038216610c6f57604051633250574960e11b8152600060048201526024015b60405180910390fd5b6000610c7c83833361296d565b9050836001600160a01b0316816001600160a01b031614610cca576040516364283d7b60e01b81526001600160a01b0380861660048301526024820184905282166044820152606401610c66565b50505050565b610cd8612a66565b601493909355601591909155601655601755565b600c6020526000908152604090208054600182015460028301805492936001600160a01b0390921692610d1e90613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610d4a90613e4c565b8015610d975780601f10610d6c57610100808354040283529160200191610d97565b820191906000526020600020905b815481529060010190602001808311610d7a57829003601f168201915b505050505090806003015490806004015490806005018054610db890613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610de490613e4c565b8015610e315780601f10610e0657610100808354040283529160200191610e31565b820191906000526020600020905b815481529060010190602001808311610e1457829003601f168201915b5050506006840154600785018054949560ff909216949193509150610e5590613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610e8190613e4c565b8015610ece5780601f10610ea357610100808354040283529160200191610ece565b820191906000526020600020905b815481529060010190602001808311610eb157829003601f168201915b5050505050905088565b600960205260009081526040902080546001820180546001600160a01b039092169291610f0490613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610f3090613e4c565b8015610f7d5780601f10610f5257610100808354040283529160200191610f7d565b820191906000526020600020905b815481529060010190602001808311610f6057829003601f168201915b505050505090806002018054610f9290613e4c565b80601f0160208091040260200160405190810160405280929190818152602001828054610fbe90613e4c565b801561100b5780601f10610fe05761010080835404028352916020019161100b565b820191906000526020600020905b815481529060010190602001808311610fee57829003601f168201915b505050506003830154600484015460058501546006909501549394919390925060ff1687565b61104c83838360405180602001604052806000815250611f47565b505050565b6001600160a01b0381166000908152601060209081526040918290208054835181840281018401909452808452606093928301828280156110b157602002820191906000526020600020905b81548152602001906001019080831161109d575b50505050509050919050565b600061094082612927565b6000818152600b60205260408120600181015460028201548392839283928392916001600160a01b0316906110fc89612a93565b6007840154600690940154929a919950975060ff90921695509350915050565b60006001600160a01b038216611148576040516322718ad960e21b815260006004820152602401610c66565b506001600160a01b031660009081526003602052604090205490565b61116c612a66565b6111766000612b00565b565b6000848152600260205260409020546001600160a01b031633146111d05760405162461bcd60e51b815260206004820152600f60248201526e2737ba103a37b5b2b71037bbb732b960891b6044820152606401610c66565b610cca84848484612b52565b6001600160a01b0381166000908152600e60209081526040918290208054835181840281018401909452808452606093928301828280156110b1576020028201919060005260206000209081548152602001906001019080831161109d5750505050509050919050565b606060018054610b5490613e4c565b600a6020526000908152604090208054600182015460028301805492936001600160a01b039092169261128790613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546112b390613e4c565b80156113005780601f106112d557610100808354040283529160200191611300565b820191906000526020600020905b8154815290600101906020018083116112e357829003601f168201915b50505060038401546004850154600586015460068701546007880154600890980154969793969295509093509160ff169089565b61133c612a66565b6001600160a01b03821661138b5760405162461bcd60e51b8152602060048201526016602482015275496e76616c6964206661726d6572206164647265737360501b6044820152606401610c66565b600081116113e75760405162461bcd60e51b8152602060048201526024808201527f52657761726420616d6f756e74206d75737420626520677265617465722074686044820152630616e20360e41b6064820152608401610c66565b804710156114375760405162461bcd60e51b815260206004820152601d60248201527f496e73756666696369656e7420636f6e74726163742062616c616e63650000006044820152606401610c66565b6040516001600160a01b0383169082156108fc029083906000818181858888f1935050505015801561146d573d6000803e3d6000fd5b50604080518281524260208201526001600160a01b038416917f0fd0b3d0a7d959be97b96e6b601af5f43aa30cac9c2a7b88f1ed08256d1e5b26910160405180910390a25050565b600e6020528160005260406000208181548110610c2b57600080fd5b610c0b338383612c55565b3360009081526009602052604081206006015460ff1661150e5760405162461bcd60e51b8152600401610c6690613e86565b600085511161155b5760405162461bcd60e51b815260206004820152601960248201527843726f7020747970652063616e6e6f7420626520656d70747960381b6044820152606401610c66565b600084116115ab5760405162461bcd60e51b815260206004820152601f60248201527f5175616e74697479206d7573742062652067726561746572207468616e2030006044820152606401610c66565b60008351116115fc5760405162461bcd60e51b815260206004820152601d60248201527f5175616c6974792067726164652063616e6e6f7420626520656d7074790000006044820152606401610c66565b601380546000918261160d83613ecb565b9091555060408051610100810182528281523360208083019182528284018b8152606084018b905242608085015260a084018a9052600060c0850181905260e085018a9052868152600c9092529390208251815590516001820180546001600160a01b0319166001600160a01b0390921691909117905591519293509160028201906116999082613f2b565b50606082015160038201556080820151600482015560a082015160058201906116c29082613f2b565b5060c082015160068201805460ff191691151591909117905560e082015160078201906116ef9082613f2b565b50503360008181526010602090815260408220805460018101825590835291200183905561171e915082612cf4565b6117288184612d59565b61182e81604051806040016040528060098152602001681a185c9d995cdd195960ba1b81525060096000336001600160a01b03166001600160a01b03168152602001908152602001600020600201805461178190613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546117ad90613e4c565b80156117fa5780601f106117cf576101008083540402835291602001916117fa565b820191906000526020600020905b8154815290600101906020018083116117dd57829003601f168201915b50505050506040518060400160405280601181526020017012185c9d995cdd0818dbdb5c1b195d1959607a1b815250612b52565b336001600160a01b0316817f7f6be1beafd45ff8f8f07b44f66c86bfa5e05918ea2683dcef70cd8b442a68e4888860405161186a929190613fe9565b60405180910390a395945050505050565b3360009081526009602052604081206006015460ff166118ad5760405162461bcd60e51b8152600401610c6690613e86565b6000838152600a6020526040902060018101546001600160a01b0316331461190d5760405162461bcd60e51b81526020600482015260136024820152722737ba103cb7bab910383932b234b1ba34b7b760691b6044820152606401610c66565b600781015460ff16156119775760405162461bcd60e51b815260206004820152602c60248201527f43616e6e6f74207573652076657269666965642070726564696374696f6e206160448201526b1cc818dbdb1b185d195c985b60a21b6064820152608401610c66565b806006015442106119bf5760405162461bcd60e51b8152602060048201526012602482015271141c99591a58dd1a5bdb88195e1c1a5c995960721b6044820152606401610c66565b6000601754826003015460646119d5919061400b565b6119df9190614022565b905080841115611a3d5760405162461bcd60e51b8152602060048201526024808201527f4c6f616e20616d6f756e74206578636565647320636f6c6c61746572616c2076604482015263616c756560e01b6064820152608401610c66565b6012805460009182611a4e83613ecb565b919050559050600060165442611a649190614044565b60408051610120810182528481523360208083019182528284018b8152606084018d8152601554608086019081524260a0870190815260c08701898152600060e089018181526101008a018290528d8252600b90975298909820875181559551600180880180546001600160a01b0319166001600160a01b039093169290921790915593516002870155915160038087019190915590516004860155905160058501559451600684015590516007830180549697509395929490939260ff191691908490811115611b3757611b3761390a565b02179055506101009190910151600890910155336000818152600f6020908152604080832080546001810182559084529183209091018590555188156108fc0291899190818181858888f19350505050158015611b98573d6000803e3d6000fd5b506040805187815260208101899052339184917f3373919ad665425d2cddb4072830e5935b6ee308440fa99b23383648da473bc0910160405180910390a35095945050505050565b6000828152600a6020526040902060018101546001600160a01b03163314611c405760405162461bcd60e51b81526020600482015260136024820152722737ba103cb7bab910383932b234b1ba34b7b760691b6044820152606401610c66565b8060060154421015611c945760405162461bcd60e51b815260206004820152601860248201527f486172766573742064617465206e6f74207265616368656400000000000000006044820152606401610c66565b600781015460ff1615611cdc5760405162461bcd60e51b815260206004820152601060248201526f105b1c9958591e481d995c9a599a595960821b6044820152606401610c66565b60008211611d385760405162461bcd60e51b815260206004820152602360248201527f41637475616c207969656c64206d75737420626520677265617465722074686160448201526206e20360ec1b6064820152608401610c66565b6008810182905560078101805460ff191660011790556003810154611d5f90339084612da9565b827f041362481eac9e998110a97c7b09c2f96366bd12f662604be3ed250786d04e5383604051611d9191815260200190565b60405180910390a2505050565b611da6612ed4565b6000818152600b6020526040902060018101546001600160a01b03163314611e005760405162461bcd60e51b815260206004820152600d60248201526c2737ba103cb7bab9103637b0b760991b6044820152606401610c66565b6000600782015460ff166003811115611e1b57611e1b61390a565b14611e5a5760405162461bcd60e51b815260206004820152600f60248201526e4c6f616e206e6f742061637469766560881b6044820152606401610c66565b6000611e6583612a93565b9050816008015481611e779190614057565b341015611ebd5760405162461bcd60e51b8152602060048201526014602482015273125b9cdd59999a58da595b9d081c185e5b595b9d60621b6044820152606401610c66565b34826008016000828254611ed19190614044565b909155505060088201548111611efe5760078201805460ff19166001908117909155611efe903390612efe565b827f040cee90ee4799897c30ca04e5feb6fa43dbba9b6d084b4b257cdafd84ba013e34604051611f3091815260200190565b60405180910390a25050611f446001600855565b50565b611f52848484610c40565b610cca3385858585612f93565b6001600160a01b0381166000908152600f60209081526040918290208054835181840281018401909452808452606093928301828280156110b1576020028201919060005260206000209081548152602001906001019080831161109d5750505050509050919050565b3360009081526009602052604081206006015460ff16611ffb5760405162461bcd60e51b8152600401610c6690613e86565b60008551116120485760405162461bcd60e51b815260206004820152601960248201527843726f7020747970652063616e6e6f7420626520656d70747960381b6044820152606401610c66565b600084116120a75760405162461bcd60e51b815260206004820152602660248201527f507265646963746564207969656c64206d75737420626520677265617465722060448201526507468616e20360d41b6064820152608401610c66565b6000831180156120b8575060648311155b6121045760405162461bcd60e51b815260206004820181905260248201527f436f6e666964656e6365206d757374206265206265747765656e20312d3130306044820152606401610c66565b42821161215e5760405162461bcd60e51b815260206004820152602260248201527f486172766573742064617465206d75737420626520696e207468652066757475604482015261726560f01b6064820152608401610c66565b601180546000918261216f83613ecb565b9091555060408051610120810182528281523360208083019182528284018b8152606084018b9052608084018a90524260a085015260c08401899052600060e085018190526101008501819052868152600a9092529390208251815590516001820180546001600160a01b0319166001600160a01b0390921691909117905591519293509160028201906122039082613f2b565b50606082015160038201556080820151600482015560a0820151600582015560c0820151600682015560e082015160078201805460ff191691151591909117905561010090910151600890910155336000818152600e60209081526040808320805460018101825590845291909220018390555182907faa8d855ed4bfd5e4635e8b83bda8a57920b14fce6911d0b400a61aee00d9ec8d9061186a908a908a90613fe9565b6060610940826130be565b6122bb612a66565b6007546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015611f44573d6000803e3d6000fd5b60106020528160005260406000208181548110610c2b57600080fd5b3360009081526009602052604090206006015460ff16156123735760405162461bcd60e51b815260206004820152601960248201527f4661726d657220616c72656164792072656769737465726564000000000000006044820152606401610c66565b60008351116123bb5760405162461bcd60e51b81526020600482015260146024820152734e616d652063616e6e6f7420626520656d70747960601b6044820152606401610c66565b600082511161240c5760405162461bcd60e51b815260206004820152601860248201527f4c6f636174696f6e2063616e6e6f7420626520656d70747900000000000000006044820152606401610c66565b6000811161245c5760405162461bcd60e51b815260206004820181905260248201527f4661726d2073697a65206d7573742062652067726561746572207468616e20306044820152606401610c66565b6040805160e081018252338082526020808301878152838501879052606084018690524260808501526101f460a0850152600160c085018190526000938452600990925293909120825181546001600160a01b0319166001600160a01b039091161781559251919291908201906124d39082613f2b565b50604082015160028201906124e89082613f2b565b50606082015160038201556080820151600482015560a0820151600582015560c0909101516006909101805460ff191691151591909117905560405133907f851322da2e414e9965ce5ecef6890861b23f27fe84bd9646b7de8aea70efcb5690611d91908690869061406a565b6060600d6000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561279d57838290600052602060002090600602016040518060c0016040529081600082015481526020016001820180546125c790613e4c565b80601f01602080910402602001604051908101604052809291908181526020018280546125f390613e4c565b80156126405780601f1061261557610100808354040283529160200191612640565b820191906000526020600020905b81548152906001019060200180831161262357829003601f168201915b5050505050815260200160028201805461265990613e4c565b80601f016020809104026020016040519081016040528092919081815260200182805461268590613e4c565b80156126d25780601f106126a7576101008083540402835291602001916126d2565b820191906000526020600020905b8154815290600101906020018083116126b557829003601f168201915b50505091835250506003820154602082015260048201546001600160a01b0316604082015260058201805460609092019161270c90613e4c565b80601f016020809104026020016040519081016040528092919081815260200182805461273890613e4c565b80156127855780601f1061275a57610100808354040283529160200191612785565b820191906000526020600020905b81548152906001019060200180831161276857829003601f168201915b5050505050815250508152602001906001019061258a565b505050509050919050565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b3360009081526009602052604090206006015460ff166128085760405162461bcd60e51b8152600401610c6690613e86565b336000908152600960205260409020600181016128258582613f2b565b50600281016128348482613f2b565b50600301555050565b612845612a66565b6001600160a01b03811661286f57604051631e4fbdf760e01b815260006004820152602401610c66565b611f4481612b00565b600034116128c85760405162461bcd60e51b815260206004820152601e60248201527f4d7573742073656e64204842415220746f2066756e64207265776172647300006044820152606401610c66565b604080513481524260208201527f2dd743ff6dc3e58c7665f23ce0cd8508028f1da1cf36d0ef53eb6576f1d0dfad910160405180910390a1565b60006001600160e01b03198216632483248360e11b14806109405750610940826131cf565b6000818152600260205260408120546001600160a01b03168061094057604051637e27328960e01b815260048101849052602401610c66565b61104c838383600161321f565b6000828152600260205260408120546001600160a01b039081169083161561299a5761299a818486613325565b6001600160a01b038116156129d8576129b760008560008061321f565b6001600160a01b038116600090815260036020526040902080546000190190555b6001600160a01b03851615612a07576001600160a01b0385166000908152600360205260409020805460010190555b60008481526002602052604080822080546001600160a01b0319166001600160a01b0389811691821790925591518793918516917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4949350505050565b6007546001600160a01b031633146111765760405163118cdaa760e01b8152336004820152602401610c66565b6000818152600b6020526040812060058101548290612ab29042614057565b9050600064496cebb8008284600401548560020154612ad1919061400b565b612adb919061400b565b612ae59190614022565b9050808360020154612af79190614044565b95945050505050565b600780546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b6000848152600d60209081526040808320815160c08101835288815280840188815292810187905242606082015233608082015260a08101869052815460018181018455928652939094208451600690940201928355905190820190612bb89082613f2b565b5060408201516002820190612bcd9082613f2b565b506060820151600382015560808201516004820180546001600160a01b0319166001600160a01b0390921691909117905560a08201516005820190612c129082613f2b565b505050837fb7a384b06f421548c9c4f535ecea50f4f86606bb194a429f12f763313057472a8484604051612c4792919061406a565b60405180910390a250505050565b6001600160a01b038216612c8757604051630b61174360e31b81526001600160a01b0383166004820152602401610c66565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038216612d1e57604051633250574960e11b815260006004820152602401610c66565b6000612d2c8383600061296d565b90506001600160a01b0381161561104c576040516339e3563760e11b815260006004820152602401610c66565b6000828152600660205260409020612d718282613f2b565b506040518281527ff8e1a15aba9398e019f0b49df1a4fde98ee17ae345cb5f6b5e2c27f5033e8ce79060200160405180910390a15050565b6001600160a01b038316600090815260096020526040812090828410612de65783612dd584606461400b565b612ddf9190614022565b9050612dff565b82612df285606461400b565b612dfc9190614022565b90505b605a8110612e2d57612e2382600501546032612e1b9190614044565b6103e8613389565b6005830155612e86565b60508110612e4957612e2382600501546019612e1b9190614044565b60468110612e6557612e238260050154600a612e1b9190614044565b612e8060198360050154612e799190614057565b60006133a1565b60058301555b846001600160a01b03167ffc577563f1b9a0461e24abef1e1fcc0d33d3d881f20b5df6dda59de4aae2c8218360050154604051612ec591815260200190565b60405180910390a25050505050565b600260085403612ef757604051633ee5aeb560e01b815260040160405180910390fd5b6002600855565b6001600160a01b03821660009081526009602052604090208115612f3a57612f308160050154601e612e1b9190614044565b6005820155612f54565b612f4e60328260050154612e799190614057565b60058201555b826001600160a01b03167ffc577563f1b9a0461e24abef1e1fcc0d33d3d881f20b5df6dda59de4aae2c8218260050154604051611d9191815260200190565b6001600160a01b0383163b156130b757604051630a85bd0160e11b81526001600160a01b0384169063150b7a0290612fd590889088908790879060040161408f565b6020604051808303816000875af1925050508015613010575060408051601f3d908101601f1916820190925261300d918101906140cc565b60015b613079573d80801561303e576040519150601f19603f3d011682016040523d82523d6000602084013e613043565b606091505b50805160000361307157604051633250574960e11b81526001600160a01b0385166004820152602401610c66565b805160208201fd5b6001600160e01b03198116630a85bd0160e11b146130b557604051633250574960e11b81526001600160a01b0385166004820152602401610c66565b505b5050505050565b60606130c982612927565b50600082815260066020526040812080546130e390613e4c565b80601f016020809104026020016040519081016040528092919081815260200182805461310f90613e4c565b801561315c5780601f106131315761010080835404028352916020019161315c565b820191906000526020600020905b81548152906001019060200180831161313f57829003601f168201915b50505050509050600061317a60408051602081019091526000815290565b9050805160000361318c575092915050565b8151156131be5780826040516020016131a69291906140e9565b60405160208183030381529060405292505050919050565b6131c7846133b0565b949350505050565b60006001600160e01b031982166380ac58cd60e01b148061320057506001600160e01b03198216635b5e139f60e01b145b8061094057506301ffc9a760e01b6001600160e01b0319831614610940565b808061323357506001600160a01b03821615155b156132f557600061324384612927565b90506001600160a01b0383161580159061326f5750826001600160a01b0316816001600160a01b031614155b8015613282575061328081846127a8565b155b156132ab5760405163a9fbf51f60e01b81526001600160a01b0384166004820152602401610c66565b81156132f35783856001600160a01b0316826001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45b505b5050600090815260046020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b613330838383613424565b61104c576001600160a01b03831661335e57604051637e27328960e01b815260048101829052602401610c66565b60405163177e802f60e01b81526001600160a01b038316600482015260248101829052604401610c66565b6000818310613398578161339a565b825b9392505050565b6000818311613398578161339a565b60606133bb82612927565b5060006133d360408051602081019091526000815290565b905060008151116133f3576040518060200160405280600081525061339a565b806133fd84613487565b60405160200161340e9291906140e9565b6040516020818303038152906040529392505050565b60006001600160a01b038316158015906131c75750826001600160a01b0316846001600160a01b0316148061345e575061345e84846127a8565b806131c75750506000908152600460205260409020546001600160a01b03908116911614919050565b6060600061349483613519565b60010190506000816001600160401b038111156134b3576134b361397d565b6040519080825280601f01601f1916602001820160405280156134dd576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a85049450846134e757509392505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106135585772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef81000000008310613584576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc1000083106135a257662386f26fc10000830492506010015b6305f5e10083106135ba576305f5e100830492506008015b61271083106135ce57612710830492506004015b606483106135e0576064830492506002015b600a83106109405760010192915050565b6001600160e01b031981168114611f4457600080fd5b60006020828403121561361957600080fd5b813561339a816135f1565b6000806040838503121561363757600080fd5b50508035926020909101359150565b60005b83811015613661578181015183820152602001613649565b50506000910152565b60008151808452613682816020860160208601613646565b601f01601f19169290920160200192915050565b86815260c0602082015260006136af60c083018861366a565b82810360408401526136c1818861366a565b606084018790526001600160a01b038616608085015283810360a085015290506136eb818561366a565b9998505050505050505050565b60208152600061339a602083018461366a565b60006020828403121561371d57600080fd5b5035919050565b80356001600160a01b038116811461373b57600080fd5b919050565b6000806040838503121561375357600080fd5b61375c83613724565b946020939093013593505050565b60008060006060848603121561377f57600080fd5b61378884613724565b925061379660208501613724565b929592945050506040919091013590565b600080600080608085870312156137bd57600080fd5b5050823594602084013594506040840135936060013592509050565b8881526001600160a01b0388166020820152610100604082018190526000906138049083018961366a565b87606084015286608084015282810360a0840152613822818761366a565b905084151560c084015282810360e084015261383e818561366a565b9b9a5050505050505050505050565b60006020828403121561385f57600080fd5b61339a82613724565b6001600160a01b038816815260e06020820181905260009061388c9083018961366a565b828103604084015261389e818961366a565b9150508560608301528460808301528360a083015282151560c083015298975050505050505050565b602080825282518282018190526000918401906040840190835b818110156138ff5783518352602093840193909201916001016138e1565b509095945050505050565b634e487b7160e01b600052602160045260246000fd5b6004811061393e57634e487b7160e01b600052602160045260246000fd5b9052565b6001600160a01b0386168152602081018590526040810184905260a0810161396d6060830185613920565b8260808301529695505050505050565b634e487b7160e01b600052604160045260246000fd5b6000806001600160401b038411156139ad576139ad61397d565b50604051601f19601f85018116603f011681018181106001600160401b03821117156139db576139db61397d565b6040528381529050808284018510156139f357600080fd5b83836020830137600060208583010152509392505050565b600082601f830112613a1c57600080fd5b61339a83833560208501613993565b60008060008060808587031215613a4157600080fd5b8435935060208501356001600160401b03811115613a5e57600080fd5b613a6a87828801613a0b565b93505060408501356001600160401b03811115613a8657600080fd5b613a9287828801613a0b565b92505060608501356001600160401b03811115613aae57600080fd5b613aba87828801613a0b565b91505092959194509250565b8981526001600160a01b038916602082015261012060408201819052600090613af19083018a61366a565b606083019890985250608081019590955260a085019390935260c0840191909152151560e0830152610100909101529392505050565b60008060408385031215613b3a57600080fd5b613b4383613724565b915060208301358015158114613b5857600080fd5b809150509250929050565b60008060008060808587031215613b7957600080fd5b84356001600160401b03811115613b8f57600080fd5b613b9b87828801613a0b565b9450506020850135925060408501356001600160401b03811115613a8657600080fd5b60008060008060808587031215613bd457600080fd5b613bdd85613724565b9350613beb60208601613724565b92506040850135915060608501356001600160401b03811115613c0d57600080fd5b8501601f81018713613c1e57600080fd5b613aba87823560208401613993565b60008060008060808587031215613c4357600080fd5b84356001600160401b03811115613c5957600080fd5b613c6587828801613a0b565b97602087013597506040870135966060013595509350505050565b600080600060608486031215613c9557600080fd5b83356001600160401b03811115613cab57600080fd5b613cb786828701613a0b565b93505060208401356001600160401b03811115613cd357600080fd5b613cdf86828701613a0b565b93969395505050506040919091013590565b8981526001600160a01b038916602082015260408101889052606081018790526080810186905260a0810185905260c081018490526101208101613d3860e0830185613920565b826101008301529a9950505050505050505050565b6000602082016020835280845180835260408501915060408160051b86010192506020860160005b82811015613e0d57603f19878603018452815180518652602081015160c06020880152613da560c088018261366a565b905060408201518782036040890152613dbe828261366a565b9150506060820151606088015260018060a01b03608083015116608088015260a0820151915086810360a0880152613df6818361366a565b965050506020938401939190910190600101613d75565b50929695505050505050565b60008060408385031215613e2c57600080fd5b613e3583613724565b9150613e4360208401613724565b90509250929050565b600181811c90821680613e6057607f821691505b602082108103613e8057634e487b7160e01b600052602260045260246000fd5b50919050565b60208082526015908201527411985c9b595c881b9bdd081c9959da5cdd195c9959605a1b604082015260600190565b634e487b7160e01b600052601160045260246000fd5b600060018201613edd57613edd613eb5565b5060010190565b601f82111561104c57806000526020600020601f840160051c81016020851015613f0b5750805b601f840160051c820191505b818110156130b75760008155600101613f17565b81516001600160401b03811115613f4457613f4461397d565b613f5881613f528454613e4c565b84613ee4565b6020601f821160018114613f8c5760008315613f745750848201515b600019600385901b1c1916600184901b1784556130b7565b600084815260208120601f198516915b82811015613fbc5787850151825560209485019460019092019101613f9c565b5084821015613fda5786840151600019600387901b60f8161c191681555b50505050600190811b01905550565b604081526000613ffc604083018561366a565b90508260208301529392505050565b808202811582820484141761094057610940613eb5565b60008261403f57634e487b7160e01b600052601260045260246000fd5b500490565b8082018082111561094057610940613eb5565b8181038181111561094057610940613eb5565b60408152600061407d604083018561366a565b8281036020840152612af7818561366a565b6001600160a01b03858116825284166020820152604081018390526080606082018190526000906140c29083018461366a565b9695505050505050565b6000602082840312156140de57600080fd5b815161339a816135f1565b600083516140fb818460208801613646565b83519083019061410f818360208801613646565b0194935050505056fea2646970667358221220eac606a14db26cde74151c4fc2995f7d7a937605bd52c9516ac8367ce7a3cc0064736f6c634300081c0033\",\"linkReferences\":{},\"deployedLinkReferences\":{}}"));}),
"[project]/lib/contract.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AGRIYIELD_CONTRACT_ADDRESS",
    ()=>CONTRACT_ADDRESS,
    "AgriYieldHelper",
    ()=>AgriYieldHelper,
    "CONTRACT_ABI",
    ()=>CONTRACT_ABI,
    "CONTRACT_ADDRESS",
    ()=>CONTRACT_ADDRESS,
    "getAgriYieldContract",
    ()=>getAgriYieldContract,
    "getServerContractHelper",
    ()=>getServerContractHelper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$contracts$2f$AgriYield$2e$sol$2f$AgriYield$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/artifacts/contracts/AgriYield.sol/AgriYield.json (json)");
;
;
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Placeholder - deploy to Hedera Testnet
const CONTRACT_ABI = __TURBOPACK__imported__module__$5b$project$5d2f$artifacts$2f$contracts$2f$AgriYield$2e$sol$2f$AgriYield$2e$json__$28$json$29$__["default"].abi;
function getAgriYieldContract(provider) {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
}
class AgriYieldHelper {
    contract;
    constructor(provider){
        this.contract = getAgriYieldContract(provider);
    }
    // Farmer operations
    async registerFarmer(name, location, totalFarmSize) {
        const tx = await this.contract.registerFarmer(name, location, totalFarmSize);
        return await tx.wait();
    }
    async getFarmer(address) {
        return await this.contract.farmers(address);
    }
    async getYieldPrediction(predictionId) {
        return await this.contract.yieldPredictions(predictionId);
    }
    // Harvest token operations
    async mintHarvestToken(cropType, quantity, qualityGrade, metadataURI) {
        try {
            const tx = await this.contract.mintHarvestToken(cropType, quantity, qualityGrade, metadataURI);
            const receipt = await tx.wait();
            return {
                hash: tx.hash,
                receipt,
                success: true
            };
        } catch (error) {
            console.error("Error minting harvest token:", error);
            throw error;
        }
    }
    async getHarvestToken(tokenId) {
        return await this.contract.harvestTokens(tokenId);
    }
    // Yield Prediction operations
    async createYieldPrediction(cropType, predictedYield, confidence, harvestDate) {
        try {
            console.log("Creating yield prediction with:", {
                cropType,
                predictedYield,
                confidence,
                harvestDate
            });
            const tx = await this.contract.createYieldPrediction(cropType, predictedYield, confidence, harvestDate);
            const receipt = await tx.wait();
            return {
                hash: tx.hash,
                receipt,
                success: true,
                predictionId: receipt.logs[0]?.args?.predictionId || 1
            };
        } catch (error) {
            console.error("Failed to create yield prediction:", error);
            return {
                success: false,
                error: error.message
            };
        }
    }
    // Lending operations
    async requestLoan(collateralPredictionId, amount) {
        try {
            console.log("Contract requestLoan called with:", {
                collateralPredictionId,
                amount,
                amountType: typeof amount,
                isNaN: Number.isNaN(amount)
            });
            const tx = await this.contract.requestLoan(collateralPredictionId, amount);
            const receipt = await tx.wait();
            return {
                hash: tx.hash,
                receipt,
                success: true,
                loanId: receipt.logs[0]?.args?.loanId || null
            };
        } catch (error) {
            console.error("Error requesting loan:", error);
            throw error;
        }
    }
    async repayLoan(loanId, amount) {
        try {
            const tx = await this.contract.repayLoan(loanId, {
                value: amount
            });
            const receipt = await tx.wait();
            return {
                hash: tx.hash,
                receipt,
                success: true,
                amount: amount
            };
        } catch (error) {
            console.error("Error repaying loan:", error);
            throw error;
        }
    }
    async getLoan(loanId) {
        return await this.contract.loans(loanId);
    }
    async getLoanDetails(loanId) {
        return await this.contract.getLoanDetails(loanId);
    }
    // Supply chain operations
    async addSupplyChainEvent(tokenId, eventType, location, notes) {
        const tx = await this.contract.addSupplyChainEvent(tokenId, eventType, location, notes);
        return await tx.wait();
    }
    async getSupplyChainEvents(tokenId) {
        try {
            return await this.contract.getSupplyChainEvents(tokenId);
        } catch (error) {
            console.log("⚠️  getSupplyChainEvents not available in current ABI");
            return [];
        }
    }
    // View functions
    async getFarmerPredictions(farmer) {
        return await this.contract.getFarmerPredictions(farmer);
    }
    async getFarmerTokens(farmer) {
        return await this.contract.getFarmerTokens(farmer);
    }
    async getFarmerLoans(farmer) {
        return await this.contract.getFarmerLoans(farmer);
    }
    // Reward System
    async rewardFarmer(farmer, amount) {
        try {
            const tx = await this.contract.rewardFarmer(farmer, amount);
            await tx.wait();
            return {
                hash: tx.hash,
                success: true,
                amount: amount,
                farmer: farmer
            };
        } catch (error) {
            console.error("Error rewarding farmer:", error);
            throw error;
        }
    }
    async fundRewards(amount) {
        try {
            const tx = await this.contract.fundRewards(amount || 0n);
            await tx.wait();
            return {
                hash: tx.hash,
                success: true,
                amount: amount || 0n
            };
        } catch (error) {
            console.error("Error funding rewards:", error);
            throw error;
        }
    }
    // Platform info
    async getPlatformSettings() {
        const [feeRate, interestRate, maxDuration, collateralRatio] = await Promise.all([
            this.contract.platformFeeRate(),
            this.contract.defaultInterestRate(),
            this.contract.maxLoanDuration(),
            this.contract.minCollateralRatio()
        ]);
        return {
            feeRate: Number(feeRate),
            interestRate: Number(interestRate),
            maxDuration: Number(maxDuration),
            collateralRatio: Number(collateralRatio)
        };
    }
}
function getServerContractHelper() {
    // Use Hedera Testnet
    const rpcUrl = process.env.HEDERA_TESTNET_RPC_URL || "https://testnet.hashio.io/api";
    const privateKey = process.env.HEDERA_TESTNET_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("HEDERA_TESTNET_PRIVATE_KEY not set in environment");
    }
    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].JsonRpcProvider(rpcUrl);
    const signer = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Wallet(privateKey, provider);
    return new AgriYieldHelper(signer);
}
;
}),
"[project]/components/ui/alert.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current", {
    variants: {
        variant: {
            default: "bg-card text-card-foreground",
            destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Alert({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert",
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function AlertTitle({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-title",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
function AlertDescription({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "alert-description",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/alert.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/NetworkSetup.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NetworkSetup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/alert.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function NetworkSetup() {
    const [networkStatus, setNetworkStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        connected: false
    });
    const checkNetwork = async ()=>{
        try {
            if (!window.ethereum) {
                setNetworkStatus({
                    connected: false,
                    error: "MetaMask not installed"
                });
                return;
            }
            const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            const balance = await provider.getBalance(address);
            setNetworkStatus({
                connected: true,
                chainId: network.chainId.toString(),
                balance: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatEther(balance),
                address
            });
        } catch (error) {
            setNetworkStatus({
                connected: false,
                error: error.message
            });
        }
    };
    const addHederaTestnet = async ()=>{
        try {
            await window.ethereum?.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x128",
                        chainName: "Hedera Testnet",
                        nativeCurrency: {
                            name: "HBAR",
                            symbol: "HBAR",
                            decimals: 18
                        },
                        rpcUrls: [
                            "https://testnet.hashio.io/api"
                        ],
                        blockExplorerUrls: [
                            "https://hashscan.io/testnet"
                        ]
                    }
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Hedera Testnet network added to MetaMask!");
            checkNetwork();
        } catch (error) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to add network: " + error.message);
        }
    };
    const switchToHedera = async ()=>{
        try {
            await window.ethereum?.request({
                method: "wallet_switchEthereumChain",
                params: [
                    {
                        chainId: "0x128"
                    }
                ]
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Switched to Hedera Testnet network!");
            checkNetwork();
        } catch (error) {
            if (error.code === 4902) {
                // Network not added yet
                addHederaTestnet();
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to switch network: " + error.message);
            }
        }
    };
    const copyTestAccount = ()=>{
        // This should be your actual Hedera Testnet account private key
        const message = "Please use your own Hedera Testnet account private key. You can get testnet HBAR from the Hedera faucet.";
        navigator.clipboard.writeText(message);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Instructions copied to clipboard!");
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkNetwork();
    }, []);
    const isCorrectNetwork = networkStatus.chainId === "296"; // Hedera Testnet
    const hasBalance = parseFloat(networkStatus.balance || "0") > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
        className: "mb-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                        className: "flex items-center gap-2",
                        children: [
                            isCorrectNetwork && hasBalance ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                className: "h-5 w-5 text-green-600"
                            }, void 0, false, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 113,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-5 w-5 text-yellow-600"
                            }, void 0, false, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 115,
                                columnNumber: 13
                            }, this),
                            "Blockchain Network Setup"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NetworkSetup.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                        children: "Configure MetaMask for Hedera Testnet"
                    }, void 0, false, {
                        fileName: "[project]/components/NetworkSetup.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NetworkSetup.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "space-y-4",
                children: [
                    networkStatus.error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Alert"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                children: networkStatus.error
                            }, void 0, false, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NetworkSetup.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this),
                    networkStatus.connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 dark:text-gray-300",
                                        children: "Network:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: [
                                            "Chain ID ",
                                            networkStatus.chainId,
                                            isCorrectNetwork ? " ✅" : " ❌"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 133,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 131,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 dark:text-gray-300",
                                        children: "Balance:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 139,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: [
                                            networkStatus.balance,
                                            " ETH",
                                            hasBalance ? " ✅" : " ❌"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 140,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 138,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NetworkSetup.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            !isCorrectNetwork && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-300 mb-2",
                                        children: "You need to connect to Hedera Testnet (Chain ID: 296)"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 151,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        onClick: switchToHedera,
                                        size: "sm",
                                        children: "Add/Switch to Hedera Testnet"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this),
                            isCorrectNetwork && !hasBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-gray-600 dark:text-gray-300 mb-2",
                                        children: "You need HBAR to pay for transactions. Get testnet HBAR from the faucet:"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 162,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: ()=>window.open("https://portal.hedera.com/faucet", "_blank"),
                                                size: "sm",
                                                variant: "outline",
                                                children: "Get Testnet HBAR"
                                            }, void 0, false, {
                                                fileName: "[project]/components/NetworkSetup.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                onClick: copyTestAccount,
                                                size: "sm",
                                                variant: "outline",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                        className: "h-4 w-4 mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/NetworkSetup.tsx",
                                                        lineNumber: 177,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Copy Instructions"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/NetworkSetup.tsx",
                                                lineNumber: 176,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500 mt-1",
                                        children: "Use the Hedera faucet to get testnet HBAR"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 181,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            isCorrectNetwork && hasBalance && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Alert"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 189,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                        children: "✅ Ready for blockchain transactions! You're connected to Hedera Testnet with sufficient HBAR."
                                    }, void 0, false, {
                                        fileName: "[project]/components/NetworkSetup.tsx",
                                        lineNumber: 190,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/NetworkSetup.tsx",
                                lineNumber: 188,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/NetworkSetup.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        onClick: checkNetwork,
                        variant: "outline",
                        size: "sm",
                        children: "Refresh Status"
                    }, void 0, false, {
                        fileName: "[project]/components/NetworkSetup.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/NetworkSetup.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/NetworkSetup.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/lending/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Lending
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/wallet-provider.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/contract.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-ssr] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NetworkSetup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/NetworkSetup.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-ssr] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield.js [app-ssr] (ecmascript) <export default as Shield>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-ssr] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/coins.js [app-ssr] (ecmascript) <export default as Coins>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-ssr] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function Lending() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isConnected, account } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$wallet$2d$provider$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWalletStore"])();
    const [yieldPredictions, setYieldPredictions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loans, setLoans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [harvestTokens, setHarvestTokens] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Tokenization form state
    const [selectedPrediction, setSelectedPrediction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [harvestAmount, setHarvestAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [qualityGrade, setQualityGrade] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("A");
    const [isTokenizing, setIsTokenizing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Loan form state
    const [selectedToken, setSelectedToken] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loanAmount, setLoanAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Repayment state
    const [repayAmount, setRepayAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isRepaying, setIsRepaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [repayModalOpen, setRepayModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isConnected) {
            router.push("/");
        } else {
            fetchData();
        }
    }, [
        isConnected,
        router,
        account
    ]);
    const fetchData = async ()=>{
        if (!account?.address) return;
        setIsLoading(true);
        try {
            // Fetch yield predictions
            const predictionsResponse = await fetch(`/api/yield-predictions?walletAddress=${account.address}`);
            if (predictionsResponse.ok) {
                const predictionsResult = await predictionsResponse.json();
                setYieldPredictions(predictionsResult.data || []);
            }
            // Fetch loans
            const loansResponse = await fetch(`/api/loans?walletAddress=${account.address}`);
            if (loansResponse.ok) {
                const loansResult = await loansResponse.json();
                setLoans(loansResult.data || []);
            }
            // Fetch harvest tokens
            const tokensResponse = await fetch(`/api/harvest-tokens?walletAddress=${account.address}`);
            if (tokensResponse.ok) {
                const tokensResult = await tokensResponse.json();
                setHarvestTokens(tokensResult.data || []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to load data");
        } finally{
            setIsLoading(false);
        }
    };
    const handleTokenizeHarvest = async ()=>{
        if (!selectedPrediction || !harvestAmount) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please select a yield prediction and enter harvest amount");
            return;
        }
        if (!account?.address) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Wallet not connected");
            return;
        }
        setIsTokenizing(true);
        try {
            const prediction = yieldPredictions.find((p)=>p.id === selectedPrediction);
            if (!prediction) {
                throw new Error("Selected prediction not found");
            }
            const response = await fetch("/api/harvest-tokens", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    walletAddress: account.address,
                    yieldPredictionId: selectedPrediction,
                    cropType: prediction.cropType,
                    amount: harvestAmount,
                    qualityGrade: qualityGrade
                })
            });
            if (!response.ok) {
                throw new Error("Failed to tokenize harvest");
            }
            const result = await response.json();
            if (result.success) {
                console.log("Database token created successfully:", result.data);
                // Now handle blockchain interaction on client side
                try {
                    console.log("Starting blockchain interaction...");
                    // Check if wallet is connected
                    if (!window.ethereum) {
                        throw new Error("No wallet detected. Please install MetaMask or connect your wallet.");
                    }
                    // Connect to local Hardhat network for real blockchain interaction
                    console.log("Connecting to local blockchain network...");
                    try {
                        const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
                        console.log("Provider created successfully");
                        // Check network
                        const network = await provider.getNetwork();
                        console.log("Connected to network:", {
                            name: network.name,
                            chainId: network.chainId.toString()
                        });
                        // Check if we're on the correct network (Hedera Testnet = 296)
                        if (network.chainId !== 296n) {
                            throw new Error(`Wrong network! Please connect to Hedera Testnet (Chain ID: 296). Currently on Chain ID: ${network.chainId}`);
                        }
                        const signer = await provider.getSigner();
                        const signerAddress = await signer.getAddress();
                        console.log("Signer address:", signerAddress);
                        // Check balance
                        const balance = await provider.getBalance(signerAddress);
                        console.log("Signer balance:", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].formatEther(balance), "ETH");
                        if (balance === 0n) {
                            throw new Error("No ETH balance! Please import a Hardhat test account with ETH.");
                        }
                        const contractHelper = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AgriYieldHelper"](signer);
                        console.log("Contract helper created successfully");
                        // Mint harvest token on smart contract
                        const quantity = Math.floor(parseFloat(harvestAmount) * 100); // Convert to kg (scaled by 100)
                        console.log("Minting token with params:", {
                            cropType: prediction.cropType,
                            quantity,
                            qualityGrade,
                            metadataURI: result.data.metadataURI
                        });
                        // Add timeout to prevent hanging
                        const blockchainPromise = contractHelper.mintHarvestToken(prediction.cropType, quantity, qualityGrade, result.data.metadataURI);
                        const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error("Blockchain transaction timeout after 30 seconds")), 30000 // Reduced to 30 seconds
                            ));
                        console.log("Starting blockchain transaction...");
                        const blockchainResult = await Promise.race([
                            blockchainPromise,
                            timeoutPromise
                        ]);
                        console.log("Blockchain result:", blockchainResult);
                        if (blockchainResult.success) {
                            // Update the token with blockchain data
                            const updatedToken = {
                                ...result.data,
                                status: "tokenized",
                                blockchainTokenId: blockchainResult.receipt?.logs[0]?.args?.tokenId?.toString(),
                                blockchainTxHash: blockchainResult.hash
                            };
                            // Add the new token to the list
                            setHarvestTokens((prev)=>[
                                    updatedToken,
                                    ...prev
                                ]);
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Harvest tokenized successfully!");
                            // Reset form
                            setSelectedPrediction("");
                            setHarvestAmount("");
                            setQualityGrade("A");
                        } else {
                            throw new Error("Blockchain transaction failed");
                        }
                    } catch (providerError) {
                        console.error("Provider/Network error:", providerError);
                        throw providerError;
                    }
                } catch (blockchainError) {
                    console.error("Blockchain error:", blockchainError);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(`Token created in database but blockchain transaction failed: ${blockchainError.message}`);
                    // Still add the token to the list with pending status
                    setHarvestTokens((prev)=>[
                            result.data,
                            ...prev
                        ]);
                }
            } else {
                throw new Error(result.error || "Failed to tokenize harvest");
            }
        } catch (error) {
            console.error("Failed to tokenize harvest:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to tokenize harvest. Please try again.");
        } finally{
            setIsTokenizing(false);
        }
    };
    const handleRequestLoan = async ()=>{
        if (!selectedToken || !loanAmount) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please select a harvest token and enter loan amount");
            return;
        }
        if (!account?.address) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Wallet not connected");
            return;
        }
        setIsProcessing(true);
        try {
            const token = harvestTokens.find((t)=>t.id === selectedToken);
            if (!token) {
                throw new Error("Selected token not found");
            }
            // Find the associated yield prediction
            const prediction = yieldPredictions.find((p)=>p.id === token.yieldPredictionId);
            if (!prediction) {
                throw new Error("Associated yield prediction not found");
            }
            const response = await fetch("/api/loans", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    walletAddress: account.address,
                    collateralTokenId: selectedToken,
                    amount: loanAmount,
                    collateralPredictionId: prediction.id
                })
            });
            if (!response.ok) {
                const errorData = await response.json().catch(()=>({}));
                console.error("Loan request failed:", {
                    status: response.status,
                    statusText: response.statusText,
                    error: errorData
                });
                throw new Error(`Failed to request loan: ${errorData.error || response.statusText}`);
            }
            const result = await response.json();
            console.log("Database result:", result);
            if (result.success) {
                // Now handle blockchain interaction on client side
                try {
                    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const contractHelper = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AgriYieldHelper"](signer);
                    // Request loan from smart contract
                    console.log("Loan amount (string):", loanAmount);
                    const loanAmountWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseEther(loanAmount);
                    console.log("Loan amount (wei):", loanAmountWei);
                    // For now, we need to create the prediction in the smart contract first
                    // Let's create it and then use its ID
                    console.log("Creating yield prediction in smart contract...");
                    // Create prediction in smart contract
                    const createResult = await contractHelper.createYieldPrediction(prediction.cropType || "Wheat", Math.floor((prediction.predictedYield || 100) * 100), Math.floor((prediction.confidence || 80) * 100), Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 // 30 days from now
                    );
                    console.log("Prediction created:", createResult);
                    if (!createResult.success) {
                        throw new Error(`Failed to create prediction: ${createResult.error}`);
                    }
                    const blockchainPredictionId = createResult.predictionId || 1;
                    const blockchainResult = await contractHelper.requestLoan(blockchainPredictionId, loanAmountWei);
                    console.log("Blockchain result:", blockchainResult);
                    if (blockchainResult.success) {
                        // Update the loan with blockchain data
                        const updatedLoan = {
                            ...result.data,
                            status: "active",
                            blockchainLoanId: blockchainResult.loanId?.toString(),
                            blockchainTxHash: blockchainResult.hash
                        };
                        console.log("Updated loan:", updatedLoan);
                        // TODO: Update loan status in database via API call
                        // For now, just update local state
                        // Add the new loan to the list
                        setLoans((prev)=>[
                                updatedLoan,
                                ...prev
                            ]);
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(`Loan of ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(parseFloat(loanAmount))} approved!`);
                        // Reset form
                        setSelectedToken("");
                        setLoanAmount("");
                    } else {
                        throw new Error(`Blockchain transaction failed: ${blockchainResult.error}`);
                    }
                } catch (blockchainError) {
                    console.error("Blockchain error:", blockchainError);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Loan created in database but blockchain transaction failed");
                    // Still add the loan to the list with pending status
                    setLoans((prev)=>[
                            result.data,
                            ...prev
                        ]);
                }
            } else {
                throw new Error(result.error || "Failed to request loan");
            }
        } catch (error) {
            console.error("Failed to request loan:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to request loan. Please try again.");
        } finally{
            setIsProcessing(false);
        }
    };
    const handleRepayLoan = async (loanId)=>{
        if (!repayAmount) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Please enter repayment amount");
            return;
        }
        if (!account?.address) {
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Wallet not connected");
            return;
        }
        setIsRepaying(true);
        try {
            const response = await fetch(`/api/loans/${loanId}/repay`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    walletAddress: account.address,
                    amount: repayAmount
                })
            });
            if (!response.ok) {
                throw new Error("Failed to repay loan");
            }
            const result = await response.json();
            if (result.success) {
                // Now handle blockchain interaction on client side
                try {
                    const provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const contractHelper = new __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$contract$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AgriYieldHelper"](signer);
                    // Repay loan on smart contract
                    const repayAmountWei = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].parseEther(repayAmount);
                    const blockchainResult = await contractHelper.repayLoan(parseInt(activeLoan?.blockchainLoanId || "0"), repayAmountWei);
                    if (blockchainResult.success) {
                        // Update the loan in the list with blockchain data
                        setLoans((prev)=>prev.map((loan)=>loan.id === loanId ? {
                                    ...loan,
                                    repaidAmount: result.data.repaidAmount,
                                    status: result.data.status,
                                    blockchainTxHash: blockchainResult.hash
                                } : loan));
                        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success("Loan repayment successful!");
                        setRepayAmount("");
                        setRepayModalOpen(false);
                    } else {
                        throw new Error("Blockchain transaction failed");
                    }
                } catch (blockchainError) {
                    console.error("Blockchain error:", blockchainError);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Repayment recorded in database but blockchain transaction failed");
                    // Still update the loan in the list
                    setLoans((prev)=>prev.map((loan)=>loan.id === loanId ? {
                                ...loan,
                                repaidAmount: result.data.repaidAmount,
                                status: result.data.status
                            } : loan));
                }
            } else {
                throw new Error(result.error || "Failed to repay loan");
            }
        } catch (error) {
            console.error("Failed to repay loan:", error);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error("Failed to repay loan. Please try again.");
        } finally{
            setIsRepaying(false);
        }
    };
    const activeLoan = loans.find((loan)=>loan.status === "active");
    const availableCollateral = harvestTokens.filter((token)=>token.status === "tokenized" && !token.isLocked);
    // Debug logging (can be removed after testing)
    // console.log("Debug - Harvest tokens:", harvestTokens);
    // console.log("Debug - Available collateral:", availableCollateral);
    const totalCollateralValue = availableCollateral.reduce((sum, token)=>sum + token.tokenizedAmount, 0);
    const maxLoanAmount = totalCollateralValue * 0.7; // 70% of collateral value
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-center h-64",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 596,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600",
                                children: "Loading lending data..."
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 597,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 595,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/lending/page.tsx",
                    lineNumber: 594,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 593,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/lending/page.tsx",
            lineNumber: 592,
            columnNumber: 7
        }, this);
    }
    if (!isConnected) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        size: "sm",
                        onClick: ()=>router.push("/dashboard"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                className: "h-4 w-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this),
                            "Back"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold text-foreground",
                                children: "Lending & Tokenization"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 622,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-muted-foreground",
                                children: "Access loans using your harvest as collateral"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 625,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 621,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 612,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$NetworkSetup$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 632,
                columnNumber: 7
            }, this),
            activeLoan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "dashboard-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/app/lending/page.tsx",
                                    lineNumber: 639,
                                    columnNumber: 15
                                }, this),
                                "Active Loan"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lending/page.tsx",
                            lineNumber: 638,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 637,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-blue-50 dark:bg-blue-950 rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-semibold text-lg",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(activeLoan.amount)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 647,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-600 dark:text-gray-300",
                                                    children: [
                                                        "Interest Rate: ",
                                                        activeLoan.interestRate,
                                                        "% APR"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 650,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 646,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "default",
                                            children: "Active"
                                        }, void 0, false, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 654,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lending/page.tsx",
                                    lineNumber: 645,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4 text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 dark:text-gray-300",
                                                    children: "Start Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 658,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: activeLoan.startDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(activeLoan.startDate) : "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 659,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 657,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 dark:text-gray-300",
                                                    children: "Due Date"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 666,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: activeLoan.endDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(activeLoan.endDate) : "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 667,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 665,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 dark:text-gray-300",
                                                    children: "Repaid Amount"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 674,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(activeLoan.repaidAmount || 0)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 677,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-gray-600 dark:text-gray-300",
                                                    children: "Remaining"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 682,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "font-semibold",
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])((activeLoan.amount || 0) - (activeLoan.repaidAmount || 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 681,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lending/page.tsx",
                                    lineNumber: 656,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-4 border-t border-gray-200 dark:border-gray-700",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-semibold mb-3",
                                            children: "Make a Payment"
                                        }, void 0, false, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 693,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                    type: "number",
                                                    placeholder: "Enter amount",
                                                    value: repayAmount,
                                                    onChange: (e)=>setRepayAmount(e.target.value),
                                                    className: "flex-1"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 695,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    onClick: ()=>handleRepayLoan(activeLoan.id),
                                                    disabled: isRepaying || !repayAmount,
                                                    children: isRepaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/lending/page.tsx",
                                                                lineNumber: 708,
                                                                columnNumber: 25
                                                            }, this),
                                                            "Processing..."
                                                        ]
                                                    }, void 0, true) : "Repay"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 702,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 694,
                                            columnNumber: 17
                                        }, this),
                                        activeLoan.blockchainTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>window.open(`https://hashscan.io/testnet/transaction/${activeLoan.blockchainTxHash}`, "_blank"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        className: "h-3 w-3 mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 728,
                                                        columnNumber: 23
                                                    }, this),
                                                    "View Loan on HashScan"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 718,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 717,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/lending/page.tsx",
                                    lineNumber: 692,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/lending/page.tsx",
                            lineNumber: 644,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 643,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 636,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        className: "dashboard-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 744,
                                                columnNumber: 15
                                            }, this),
                                            "Tokenize Your Harvest"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 743,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: "Convert your harvest into tradeable tokens for collateral"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 747,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 742,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium",
                                                children: "Select Yield Prediction"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 753,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                value: selectedPrediction,
                                                onValueChange: setSelectedPrediction,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                            placeholder: "Choose prediction to tokenize"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 761,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 760,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                        children: yieldPredictions.map((prediction)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: prediction.id,
                                                                children: [
                                                                    prediction.cropType,
                                                                    " - ",
                                                                    prediction.predictedYield,
                                                                    " tons"
                                                                ]
                                                            }, prediction.id, true, {
                                                                fileName: "[project]/app/lending/page.tsx",
                                                                lineNumber: 765,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 763,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 756,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 752,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium",
                                                        children: "Harvest Amount (tons)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 775,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                        type: "number",
                                                        placeholder: "Enter amount",
                                                        value: harvestAmount,
                                                        onChange: (e)=>setHarvestAmount(e.target.value)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 778,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 774,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium",
                                                        children: "Quality Grade"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 786,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: qualityGrade,
                                                        onValueChange: setQualityGrade,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                    fileName: "[project]/app/lending/page.tsx",
                                                                    lineNumber: 791,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/lending/page.tsx",
                                                                lineNumber: 790,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: "A",
                                                                        children: "Grade A (Premium)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/lending/page.tsx",
                                                                        lineNumber: 794,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: "B",
                                                                        children: "Grade B (Standard)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/lending/page.tsx",
                                                                        lineNumber: 795,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: "C",
                                                                        children: "Grade C (Basic)"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/lending/page.tsx",
                                                                        lineNumber: 796,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/lending/page.tsx",
                                                                lineNumber: 793,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 789,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 785,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 773,
                                        columnNumber: 13
                                    }, this),
                                    selectedPrediction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-green-50 dark:bg-green-950 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                                                        className: "h-4 w-4 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 805,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: "Yield Prediction Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 806,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 804,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: [
                                                    "Predicted yield:",
                                                    " ",
                                                    yieldPredictions.find((p)=>p.id === selectedPrediction)?.predictedYield,
                                                    " ",
                                                    "tons",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Confidence:",
                                                    " ",
                                                    ((yieldPredictions.find((p)=>p.id === selectedPrediction)?.confidence || 0) * 100).toFixed(1),
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 810,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 803,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full btn-primary",
                                        onClick: handleTokenizeHarvest,
                                        disabled: isTokenizing || !selectedPrediction || !harvestAmount,
                                        children: isTokenizing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 19
                                                }, this),
                                                "Tokenizing..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                    className: "mr-2 h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 840,
                                                    columnNumber: 19
                                                }, this),
                                                "Tokenize Harvest"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 828,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 751,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 741,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 852,
                                                columnNumber: 15
                                            }, this),
                                            "Apply for Loan"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 851,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                        children: "Request a loan using your tokenized harvest as collateral"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 855,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 850,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-blue-50 dark:bg-blue-950 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        className: "h-4 w-4 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 862,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: "Available Collateral"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 863,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 861,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: [
                                                    "Total Value: ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalCollateralValue),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 869,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Max Loan Amount: ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(maxLoanAmount)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 867,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 860,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium",
                                                children: "Select Collateral Token"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 875,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                value: selectedToken,
                                                onValueChange: setSelectedToken,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                            placeholder: "Choose harvest token"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 880,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 879,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                        children: availableCollateral.map((token)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                value: token.id,
                                                                children: [
                                                                    token.cropType,
                                                                    " - ",
                                                                    token.amount,
                                                                    " tons (Grade",
                                                                    " ",
                                                                    token.qualityGrade,
                                                                    ")"
                                                                ]
                                                            }, token.id, true, {
                                                                fileName: "[project]/app/lending/page.tsx",
                                                                lineNumber: 884,
                                                                columnNumber: 21
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 882,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 878,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 874,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-sm font-medium",
                                                children: "Loan Amount (USD)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 894,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                                                type: "number",
                                                placeholder: "Enter loan amount",
                                                value: loanAmount,
                                                onChange: (e)=>setLoanAmount(e.target.value),
                                                max: maxLoanAmount
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 897,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    "Maximum: ",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(maxLoanAmount)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 904,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 893,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        className: "h-4 w-4 text-yellow-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 911,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        children: "Loan Terms"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 912,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 910,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-600 dark:text-gray-300",
                                                children: [
                                                    "Interest Rate: 12% APR",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 916,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Term: 12 months",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 918,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Collateral will be locked during loan period"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 914,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 909,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        className: "w-full",
                                        onClick: handleRequestLoan,
                                        disabled: isProcessing || !!activeLoan || !selectedToken || !loanAmount,
                                        children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 932,
                                                    columnNumber: 19
                                                }, this),
                                                "Processing..."
                                            ]
                                        }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                    className: "mr-2 h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 937,
                                                    columnNumber: 19
                                                }, this),
                                                "Request Loan"
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 923,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 859,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 849,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 739,
                columnNumber: 7
            }, this),
            harvestTokens.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 951,
                                        columnNumber: 15
                                    }, this),
                                    "Your Tokenized Assets"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 950,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                children: "Manage your tokenized harvest assets"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 954,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 949,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: harvestTokens.map((token)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold",
                                                            children: token.cropType
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 967,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: token.status === "tokenized" ? "default" : token.status === "locked" ? "destructive" : "secondary",
                                                            children: token.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 968,
                                                            columnNumber: 23
                                                        }, this),
                                                        token.isLocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: "outline",
                                                            className: "text-red-600",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                                    className: "h-3 w-3 mr-1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/lending/page.tsx",
                                                                    lineNumber: 981,
                                                                    columnNumber: 27
                                                                }, this),
                                                                "Locked"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 980,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 966,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-500",
                                                    children: token.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(new Date(token.createdAt)) : "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 986,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 965,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Physical Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 994,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                token.amount,
                                                                " tons"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 997,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 993,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Tokenized Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1000,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(token.tokenizedAmount)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1003,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 999,
                                                    columnNumber: 21
                                                }, this),
                                                token.qualityGrade && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Quality Grade"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1009,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "Grade ",
                                                                token.qualityGrade
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1012,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1008,
                                                    columnNumber: 23
                                                }, this),
                                                token.blockchainTokenId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Token ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1019,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "#",
                                                                token.blockchainTokenId
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1022,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1018,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 992,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 flex gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: "outline",
                                                    children: "View QR Code"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1029,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: "outline",
                                                    children: "Track Supply Chain"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1032,
                                                    columnNumber: 21
                                                }, this),
                                                token.blockchainTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                    size: "sm",
                                                    variant: "outline",
                                                    onClick: ()=>window.open(`https://hashscan.io/testnet/transaction/${token.blockchainTxHash}`, "_blank"),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                            className: "h-3 w-3 mr-1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1046,
                                                            columnNumber: 25
                                                        }, this),
                                                        "View on HashScan"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 1028,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, token.id, true, {
                                    fileName: "[project]/app/lending/page.tsx",
                                    lineNumber: 961,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/lending/page.tsx",
                            lineNumber: 959,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 958,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 948,
                columnNumber: 9
            }, this),
            loans.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "mt-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                        className: "h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 1063,
                                        columnNumber: 15
                                    }, this),
                                    "Loan History"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 1062,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                                children: "View all your loan transactions"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 1066,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 1061,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-4",
                            children: loans.map((loan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 border border-gray-200 dark:border-gray-700 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-semibold",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(loan.amount)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1077,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: loan.status === "active" ? "default" : loan.status === "completed" ? "secondary" : loan.status === "defaulted" ? "destructive" : "outline",
                                                            children: loan.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1076,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm text-gray-500",
                                                    children: loan.createdAt ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(new Date(loan.createdAt)) : "N/A"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1094,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 1075,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-4 text-sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Interest Rate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1102,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                loan.interestRate,
                                                                "% APR"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1105,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1101,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Repaid Amount"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1108,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(loan.repaidAmount)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1111,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1107,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Due Date"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1116,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: loan.endDate ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatDate"])(new Date(loan.endDate)) : "N/A"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1119,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1115,
                                                    columnNumber: 21
                                                }, this),
                                                loan.blockchainLoanId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600 dark:text-gray-300",
                                                            children: "Blockchain Loan ID"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold",
                                                            children: [
                                                                "#",
                                                                loan.blockchainLoanId
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/lending/page.tsx",
                                                            lineNumber: 1130,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/lending/page.tsx",
                                                    lineNumber: 1126,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 1100,
                                            columnNumber: 19
                                        }, this),
                                        loan.blockchainTxHash && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>window.open(`https://hashscan.io/testnet/transaction/${loan.blockchainTxHash}`, "_blank"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                                        className: "h-3 w-3 mr-1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1148,
                                                        columnNumber: 25
                                                    }, this),
                                                    "View on HashScan"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1138,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/lending/page.tsx",
                                            lineNumber: 1137,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, loan.id, true, {
                                    fileName: "[project]/app/lending/page.tsx",
                                    lineNumber: 1071,
                                    columnNumber: 17
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/lending/page.tsx",
                            lineNumber: 1069,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 1068,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 1060,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "mt-8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardContent"], {
                    className: "pt-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold mb-4",
                                children: "How It Works"
                            }, void 0, false, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 1164,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6 text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-blue-50 dark:bg-blue-950 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coins$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Coins$3e$__["Coins"], {
                                                        className: "h-5 w-5 text-blue-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1168,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "1. Tokenize"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1169,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 dark:text-gray-300",
                                                children: "Convert your harvest into blockchain tokens"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1171,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 1166,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-green-50 dark:bg-green-950 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Shield$3e$__["Shield"], {
                                                        className: "h-5 w-5 text-green-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1177,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "2. Collateral"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1178,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1176,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 dark:text-gray-300",
                                                children: "Use tokens as collateral for loans"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1180,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 1175,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 bg-purple-50 dark:bg-purple-950 rounded-lg",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"], {
                                                        className: "h-5 w-5 text-purple-600"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1186,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: "3. Access Funds"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/lending/page.tsx",
                                                        lineNumber: 1187,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1185,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 dark:text-gray-300",
                                                children: "Get immediate access to capital"
                                            }, void 0, false, {
                                                fileName: "[project]/app/lending/page.tsx",
                                                lineNumber: 1189,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/lending/page.tsx",
                                        lineNumber: 1184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/lending/page.tsx",
                                lineNumber: 1165,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/lending/page.tsx",
                        lineNumber: 1163,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/lending/page.tsx",
                    lineNumber: 1162,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/lending/page.tsx",
                lineNumber: 1161,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/lending/page.tsx",
        lineNumber: 610,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__74e59a4c._.js.map