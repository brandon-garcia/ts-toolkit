"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var pipeline_1 = require("./pipeline");
var list_pipeline_1 = require("./list-pipeline");
var bound_list_pipeline_1 = require("./bound-list-pipeline");
var list_1 = require("../list");
var EmptyListPipeline = (function () {
    function EmptyListPipeline() {
    }
    EmptyListPipeline.prototype.alsoDo = function (fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    };
    EmptyListPipeline.prototype.map = function (fn) {
        return list_pipeline_1.ListPipeline.fromCallable(fn);
    };
    EmptyListPipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
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
        return this.filter(fn_1.FnUtils.compose(fn_1.FnUtils.liftProperty(field), fn));
    };
    EmptyListPipeline.prototype.reduce = function (fn) {
        return this.toPipeline().map(function (list) { return list.reduce(fn); });
    };
    EmptyListPipeline.prototype.toFirst = function () {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    };
    EmptyListPipeline.prototype.apply = function (list) {
        return list;
    };
    EmptyListPipeline.prototype.bind = function (list) {
        return new bound_list_pipeline_1.BoundListPipeline(list, this);
    };
    EmptyListPipeline.prototype.toCallable = function () {
        return this.apply.bind(this);
    };
    EmptyListPipeline.prototype.toPipeline = function () {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    };
    return EmptyListPipeline;
}());
exports.EmptyListPipeline = EmptyListPipeline;
//# sourceMappingURL=empty-list-pipeline.js.map