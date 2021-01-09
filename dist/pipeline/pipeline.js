"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
var fn_1 = require("../fn");
var empty_pipeline_1 = require("./empty-pipeline");
var lift_consumer_1 = require("../fn/lift-consumer");
var lift_property_1 = require("../fn/lift-property");
var Pipeline = (function () {
    function Pipeline(fn) {
        this.fnList = [fn];
        this.fnCount = 0;
    }
    Pipeline.identity = function () {
        return new empty_pipeline_1.EmptyPipeline();
    };
    Pipeline.fromCallable = function (fn) {
        return new Pipeline(fn);
    };
    Pipeline.prototype.alsoDo = function (fn) {
        return this.map(lift_consumer_1.liftConsumer(fn));
    };
    Pipeline.prototype.map = function (fn) {
        this.fnList.push(fn);
        this.fnCount++;
        if (this.fnCount > 9) {
            this.fnList = [this.callable];
            this.fnCount = 1;
        }
        return this;
    };
    Pipeline.prototype.mapToProperty = function (field) {
        return this.map(lift_property_1.liftProperty(field));
    };
    Object.defineProperty(Pipeline.prototype, "callable", {
        get: function () {
            if (this.fnList.length > 1) {
                return fn_1.compose.apply(void 0, this.fnList);
            }
            return this.fnList[0];
        },
        enumerable: false,
        configurable: true
    });
    return Pipeline;
}());
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map