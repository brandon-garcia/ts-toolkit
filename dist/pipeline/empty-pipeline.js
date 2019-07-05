"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var bound_pipeline_1 = require("./bound-pipeline");
var optional_1 = require("../optional");
var pipeline_1 = require("./pipeline");
var EmptyPipeline = (function () {
    function EmptyPipeline() {
    }
    EmptyPipeline.prototype.alsoDo = function (fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    };
    EmptyPipeline.prototype.apply = function (param) {
        return param;
    };
    EmptyPipeline.prototype.bind = function (param) {
        return new bound_pipeline_1.BoundPipeline(param, this);
    };
    EmptyPipeline.prototype.filter = function (fn) {
        return this.map(function (val) { return optional_1.Optional.of(val).filter(fn); });
    };
    EmptyPipeline.prototype.filterProperty = function (field, fn) {
        return this.map(function (val) { return optional_1.Optional.of(val).filterProperty(field, fn); });
    };
    EmptyPipeline.prototype.map = function (fn) {
        return pipeline_1.Pipeline.fromCallable(fn);
    };
    EmptyPipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    };
    EmptyPipeline.prototype.toCallable = function () {
        return this.apply.bind(this);
    };
    return EmptyPipeline;
}());
exports.EmptyPipeline = EmptyPipeline;
//# sourceMappingURL=empty-pipeline.js.map