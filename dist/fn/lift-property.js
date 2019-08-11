"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftProperty = function (field) {
    return function (param) { return param[field]; };
};
//# sourceMappingURL=lift-property.js.map