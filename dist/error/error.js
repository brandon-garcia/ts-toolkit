"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeError = exports.isError = void 0;
var utils_1 = require("../types/utils");
var isError = function (error) {
    return utils_1.TypeUtils.object(error) &&
        utils_1.TypeUtils.field(error, "name", utils_1.TypeUtils.nonEmptyString) &&
        utils_1.TypeUtils.field(error, "message", utils_1.TypeUtils.nonEmptyString) &&
        utils_1.TypeUtils.optField(error, "cause", exports.isError);
};
exports.isError = isError;
var normalizeError = function (error, defaultMessage) {
    if (exports.isError(error)) {
        return error;
    }
    if (utils_1.TypeUtils.object(error)) {
        var updatedError = __assign({}, error);
        if (!utils_1.TypeUtils.field(error, "name", utils_1.TypeUtils.nonEmptyString)) {
            updatedError.name = "UNKNOWN";
        }
        if (!utils_1.TypeUtils.field(error, "message", utils_1.TypeUtils.nonEmptyString)) {
            if (defaultMessage != null && defaultMessage.length > 0) {
                updatedError.message = defaultMessage;
            }
            else {
                updatedError.message = "NO MESSAGE";
            }
        }
        if (!utils_1.TypeUtils.optField(error, "cause", exports.isError)) {
            updatedError.cause = exports.normalizeError(updatedError.cause);
        }
        return updatedError;
    }
    if (utils_1.TypeUtils.nonEmptyString(error)) {
        return {
            name: "UNKNOWN",
            message: error,
        };
    }
    if (defaultMessage != null && defaultMessage.length > 0) {
        return {
            name: "UNKNOWN",
            message: defaultMessage,
        };
    }
    return {
        name: "UNKNOWN",
        message: "NO MESSAGE",
    };
};
exports.normalizeError = normalizeError;
//# sourceMappingURL=error.js.map