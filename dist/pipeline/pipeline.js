"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var optional_1 = require("../optional");
var bound_pipeline_1 = require("./bound-pipeline");
var empty_pipeline_1 = require("./empty-pipeline");
var Pipeline = (function () {
    function Pipeline(fn) {
        this.fn = fn;
    }
    Pipeline.identity = function () {
        return new empty_pipeline_1.EmptyPipeline();
    };
    Pipeline.bound = function (param) {
        return new bound_pipeline_1.BoundPipeline(param, Pipeline.identity());
    };
    Pipeline.fromCallable = function (fn) {
        return new Pipeline(fn);
    };
    Pipeline.prototype.alsoDo = function (fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    };
    Pipeline.prototype.map = function (fn) {
        this.fn = fn_1.FnUtils.compose(this.fn, fn);
        return this;
    };
    Pipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    };
    Pipeline.prototype.filter = function (fn) {
        return this.map(function (val) { return optional_1.Optional.of(val).filter(fn); });
    };
    Pipeline.prototype.filterProperty = function (field, fn) {
        return this.map(function (val) { return optional_1.Optional.of(val).filterProperty(field, fn); });
    };
    Pipeline.prototype.apply = function (param) {
        return this.fn(param);
    };
    Pipeline.prototype.bind = function (param) {
        return new bound_pipeline_1.BoundPipeline(param, this);
    };
    Pipeline.prototype.toCallable = function () {
        return this.fn;
    };
    return Pipeline;
}());
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map