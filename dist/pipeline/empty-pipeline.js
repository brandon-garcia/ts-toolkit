"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyPipeline = void 0;
var pipeline_1 = require("./pipeline");
var lift_consumer_1 = require("../fn/lift-consumer");
var lift_property_1 = require("../fn/lift-property");
var EmptyPipeline = (function () {
    function EmptyPipeline() {
    }
    EmptyPipeline.prototype.alsoDo = function (fn) {
        return this.map(lift_consumer_1.liftConsumer(fn));
    };
    EmptyPipeline.prototype.map = function (fn) {
        return pipeline_1.Pipeline.fromCallable(fn);
    };
    EmptyPipeline.prototype.mapToProperty = function (field) {
        return this.map(lift_property_1.liftProperty(field));
    };
    Object.defineProperty(EmptyPipeline.prototype, "callable", {
        get: function () {
            return function (param) { return param; };
        },
        enumerable: false,
        configurable: true
    });
    return EmptyPipeline;
}());
exports.EmptyPipeline = EmptyPipeline;
//# sourceMappingURL=empty-pipeline.js.map