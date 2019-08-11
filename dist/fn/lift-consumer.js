"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftConsumer = function (fn) {
    return function (param) {
        fn(param);
        return param;
    };
};
//# sourceMappingURL=lift-consumer.js.map