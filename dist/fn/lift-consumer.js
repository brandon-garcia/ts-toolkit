"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.liftConsumer = void 0;
var liftConsumer = function (fn) {
    return function (param) {
        fn(param);
        return param;
    };
};
exports.liftConsumer = liftConsumer;
//# sourceMappingURL=lift-consumer.js.map