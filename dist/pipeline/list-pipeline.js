"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var pipeline_1 = require("./pipeline");
var bridge_list_pipeline_1 = require("./bridge-list-pipeline");
var empty_list_pipeline_1 = require("./empty-list-pipeline");
var bound_list_pipeline_1 = require("./bound-list-pipeline");
var list_1 = require("../list");
var ListPipeline = (function () {
    function ListPipeline(fn) {
        this.fn = fn;
    }
    ListPipeline.identity = function () {
        return new empty_list_pipeline_1.EmptyListPipeline();
    };
    ListPipeline.bound = function (list) {
        return new bound_list_pipeline_1.BoundListPipeline(list, ListPipeline.identity());
    };
    ListPipeline.fromCallable = function (fn) {
        return new ListPipeline(fn);
    };
    ListPipeline.liftCallable = function (fn) {
        return new bridge_list_pipeline_1.BridgeListPipeline(fn, ListPipeline.identity());
    };
    ListPipeline.liftPipeline = function (pipeline) {
        return ListPipeline.liftCallable(pipeline.toCallable());
    };
    ListPipeline.prototype.alsoDo = function (fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    };
    ListPipeline.prototype.map = function (fn) {
        this.fn = fn_1.FnUtils.compose(this.fn, fn);
        return this;
    };
    ListPipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    };
    ListPipeline.prototype.flatMap = function (fn) {
        return new bridge_list_pipeline_1.BridgeListPipeline(this.toCallable(), ListPipeline.liftCallable(fn));
    };
    ListPipeline.prototype.sort = function (fn) {
        return this.flatMap(function (list) { return list.sort(fn); });
    };
    ListPipeline.prototype.filter = function (fn) {
        return this.flatMap(function (list) { return list.filter(fn); });
    };
    ListPipeline.prototype.filterProperty = function (field, fn) {
        return this.filter(fn_1.FnUtils.compose(fn_1.FnUtils.liftProperty(field), fn));
    };
    ListPipeline.prototype.reduce = function (fn) {
        return this.toPipeline().map(function (list) { return list.reduce(fn); });
    };
    ListPipeline.prototype.toFirst = function () {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    };
    ListPipeline.prototype.apply = function (list) {
        return list.map(this.fn);
    };
    ListPipeline.prototype.bind = function (list) {
        return new bound_list_pipeline_1.BoundListPipeline(list, this);
    };
    ListPipeline.prototype.toCallable = function () {
        return this.apply.bind(this);
    };
    ListPipeline.prototype.toPipeline = function () {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    };
    return ListPipeline;
}());
exports.ListPipeline = ListPipeline;
//# sourceMappingURL=list-pipeline.js.map