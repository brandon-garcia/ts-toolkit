"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var pipeline_1 = require("./pipeline");
var bound_list_pipeline_1 = require("./bound-list-pipeline");
var list_1 = require("../list");
var BridgeListPipeline = (function () {
    function BridgeListPipeline(fn, pipeline) {
        this.fn = fn;
        this.pipeline = pipeline;
    }
    BridgeListPipeline.prototype.alsoDo = function (fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    };
    BridgeListPipeline.prototype.map = function (fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.map(fn));
    };
    BridgeListPipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
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
    BridgeListPipeline.prototype.apply = function (list) {
        return this.pipeline.apply(this.fn(list));
    };
    BridgeListPipeline.prototype.bind = function (list) {
        return new bound_list_pipeline_1.BoundListPipeline(list, this);
    };
    BridgeListPipeline.prototype.toCallable = function () {
        return this.apply.bind(this);
    };
    BridgeListPipeline.prototype.toPipeline = function () {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    };
    return BridgeListPipeline;
}());
exports.BridgeListPipeline = BridgeListPipeline;
//# sourceMappingURL=bridge-list-pipeline.js.map