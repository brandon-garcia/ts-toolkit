"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftProperty = void 0;
var liftProperty = function (field) {
    return function (param) { return param[field]; };
};
exports.liftProperty = liftProperty;
//# sourceMappingURL=lift-property.js.map