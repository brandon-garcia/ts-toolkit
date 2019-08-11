"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pipeline_1 = require("./pipeline");
var bridge_list_pipeline_1 = require("./bridge-list-pipeline");
var empty_list_pipeline_1 = require("./empty-list-pipeline");
var list_1 = require("../list");
var compose_1 = require("../fn/compose");
var lift_consumer_1 = require("../fn/lift-consumer");
var lift_property_1 = require("../fn/lift-property");
var ListPipeline = (function () {
    function ListPipeline(fn) {
        this.fn = fn;
    }
    ListPipeline.identity = function () {
        return new empty_list_pipeline_1.EmptyListPipeline();
    };
    ListPipeline.fromCallable = function (fn) {
        return new ListPipeline(fn);
    };
    ListPipeline.liftCallable = function (fn) {
        return new bridge_list_pipeline_1.BridgeListPipeline(fn, ListPipeline.identity());
    };
    ListPipeline.liftPipeline = function (pipeline) {
        return ListPipeline.liftCallable(pipeline.callable);
    };
    ListPipeline.prototype.alsoDo = function (fn) {
        return this.map(lift_consumer_1.liftConsumer(fn));
    };
    ListPipeline.prototype.map = function (fn) {
        this.fn = compose_1.compose(this.fn, fn);
        return this;
    };
    ListPipeline.prototype.mapToProperty = function (field) {
        return this.map(lift_property_1.liftProperty(field));
    };
    ListPipeline.prototype.flatMap = function (fn) {
        return new bridge_list_pipeline_1.BridgeListPipeline(this.callable, ListPipeline.liftCallable(fn));
    };
    ListPipeline.prototype.sort = function (fn) {
        return this.flatMap(function (list) { return list.sort(fn); });
    };
    ListPipeline.prototype.filter = function (fn) {
        return this.flatMap(function (list) { return list.filter(fn); });
    };
    ListPipeline.prototype.filterProperty = function (field, fn) {
        return this.filter(compose_1.compose(lift_property_1.liftProperty(field), fn));
    };
    ListPipeline.prototype.reduce = function (fn) {
        return this.toPipeline().map(function (list) { return list.reduce(fn); });
    };
    ListPipeline.prototype.toFirst = function () {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    };
    Object.defineProperty(ListPipeline.prototype, "callable", {
        get: function () {
            var _this = this;
            return function (list) { return list.map(_this.fn); };
        },
        enumerable: true,
        configurable: true
    });
    ListPipeline.prototype.toPipeline = function () {
        return pipeline_1.Pipeline.fromCallable(this.callable);
    };
    return ListPipeline;
}());
exports.ListPipeline = ListPipeline;
//# sourceMappingURL=list-pipeline.js.map