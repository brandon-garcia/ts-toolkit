"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeline_1 = require("./pipeline");
var list_1 = require("../list");
var lift_consumer_1 = require("../fn/lift-consumer");
var lift_property_1 = require("../fn/lift-property");
var BridgeListPipeline = (function () {
    function BridgeListPipeline(fn, pipeline) {
        this.fn = fn;
        this.pipeline = pipeline;
    }
    BridgeListPipeline.prototype.alsoDo = function (fn) {
        return this.map(lift_consumer_1.liftConsumer(fn));
    };
    BridgeListPipeline.prototype.map = function (fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.map(fn));
    };
    BridgeListPipeline.prototype.mapToProperty = function (field) {
        return this.map(lift_property_1.liftProperty(field));
    };
    BridgeListPipeline.prototype.flatMap = function (fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.flatMap(fn));
    };
    BridgeListPipeline.prototype.sort = function (fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.sort(fn));
    };
    BridgeListPipeline.prototype.filter = function (fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.filter(fn));
    };
    BridgeListPipeline.prototype.filterProperty = function (field, fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.filterProperty(field, fn));
    };
    BridgeListPipeline.prototype.reduce = function (fn) {
        return this.toPipeline().map(function (list) { return list.reduce(fn); });
    };
    BridgeListPipeline.prototype.toFirst = function () {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    };
    Object.defineProperty(BridgeListPipeline.prototype, "callable", {
        get: function () {
            var _this = this;
            return function (list) { return _this.pipeline.callable(_this.fn(list)); };
        },
        enumerable: true,
        configurable: true
    });
    BridgeListPipeline.prototype.toPipeline = function () {
        return pipeline_1.Pipeline.fromCallable(this.callable);
    };
    return BridgeListPipeline;
}());
exports.BridgeListPipeline = BridgeListPipeline;
//# sourceMappingURL=bridge-list-pipeline.js.map