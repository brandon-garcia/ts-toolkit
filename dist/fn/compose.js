"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compose = function (f1, f2, f3, f4, f5, f6, f7, f8, f9, f10) {
    if (f3) {
        if (f4) {
            if (f5) {
                if (f6) {
                    if (f7) {
                        if (f8) {
                            if (f9) {
                                if (f10) {
                                    return function (p) { return f10(f9(f8(f7(f6(f5(f4(f3(f2(f1(p)))))))))); };
                                }
                                return function (p) { return f9(f8(f7(f6(f5(f4(f3(f2(f1(p))))))))); };
                            }
                            return function (p) { return f8(f7(f6(f5(f4(f3(f2(f1(p)))))))); };
                        }
                        return function (p) { return f7(f6(f5(f4(f3(f2(f1(p))))))); };
                    }
                    return function (p) { return f6(f5(f4(f3(f2(f1(p)))))); };
                }
                return function (p) { return f5(f4(f3(f2(f1(p))))); };
            }
            return function (p) { return f4(f3(f2(f1(p)))); };
        }
        return function (p) { return f3(f2(f1(p))); };
    }
    return function (p) { return f2(f1(p)); };
};
//# sourceMappingURL=compose.js.map