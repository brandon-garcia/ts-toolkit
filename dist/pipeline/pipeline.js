"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const optional_1 = require("../optional");
const bound_pipeline_1 = require("./bound-pipeline");
const empty_pipeline_1 = require("./empty-pipeline");
class Pipeline {
    constructor(fn) {
        this.fn = fn;
    }
    static identity() {
        return new empty_pipeline_1.EmptyPipeline();
    }
    static bound(param) {
        return new bound_pipeline_1.BoundPipeline(param, Pipeline.identity());
    }
    static fromCallable(fn) {
        return new Pipeline(fn);
    }
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    map(fn) {
        this.fn = fn_1.FnUtils.compose(this.fn, fn);
        return this;
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    filter(fn) {
        return this.map((val) => optional_1.Optional.of(val).filter(fn));
    }
    filterProperty(field, fn) {
        return this.map((val) => optional_1.Optional.of(val).filterProperty(field, fn));
    }
    apply(param) {
        return this.fn(param);
    }
    bind(param) {
        return new bound_pipeline_1.BoundPipeline(param, this);
    }
    toCallable() {
        return this.fn;
    }
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map