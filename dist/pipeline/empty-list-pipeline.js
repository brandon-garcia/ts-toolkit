"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeline_1 = require("./pipeline");
var list_pipeline_1 = require("./list-pipeline");
var list_1 = require("../list");
var compose_1 = require("../fn/compose");
var lift_consumer_1 = require("../fn/lift-consumer");
var lift_property_1 = require("../fn/lift-property");
var EmptyListPipeline = (function () {
    function EmptyListPipeline() {
    }
    EmptyListPipeline.prototype.alsoDo = function (fn) {
        return this.map(lift_consumer_1.liftConsumer(fn));
    };
    EmptyListPipeline.prototype.map = function (fn) {
        return list_pipeline_1.ListPipeline.fromCallable(fn);
    };
    EmptyListPipeline.prototype.mapToProperty = function (field) {
        return this.map(lift_property_1.liftProperty(field));
    };
    EmptyListPipeline.prototype.flatMap = function (fn) {
        return list_pipeline_1.ListPipeline.liftCallable(fn);
    };
    EmptyListPipeline.prototype.sort = function (fn) {
        return this.flatMap(function (list) { return list.sort(fn); });
    };
    EmptyListPipeline.prototype.filter = function (fn) {
        return this.flatMap(function (list) { return list.filter(fn); });
    };
    EmptyListPipeline.prototype.filterProperty = function (field, fn) {
        return this.filter(compose_1.compose(lift_property_1.liftProperty(field), fn));
    };
    EmptyListPipeline.prototype.reduce = function (fn) {
        return this.toPipeline().map(function (list) { return list.reduce(fn); });
    };
    EmptyListPipeline.prototype.toFirst = function () {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    };
    Object.defineProperty(EmptyListPipeline.prototype, "callable", {
        get: function () {
            return function (list) { return list; };
        },
        enumerable: true,
        configurable: true
    });
    EmptyListPipeline.prototype.toPipeline = function () {
        return pipeline_1.Pipeline.fromCallable(this.callable);
    };
    return EmptyListPipeline;
}());
exports.EmptyListPipeline = EmptyListPipeline;
//# sourceMappingURL=empty-list-pipeline.js.map