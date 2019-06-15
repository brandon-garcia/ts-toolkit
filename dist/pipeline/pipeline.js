"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const optional_1 = require("../optional");
class Pipeline {
    constructor(fn) {
        this.fn = fn;
    }
    static identity() {
        return new EmptyPipeline();
    }
    static bound(param) {
        return new BoundPipeline(param, Pipeline.identity());
    }
    static fromCallable(fn) {
        return new Pipeline(fn);
    }
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    map(fn) {
        return Pipeline.fromCallable(fn_1.FnUtils.compose(this.fn, fn));
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    filter(fn) {
        return this.map((val) => optional_1.Optional.of(val).filter(fn));
    }
    apply(param) {
        return this.fn(param);
    }
    bind(param) {
        return new BoundPipeline(param, this);
    }
    toCallable() {
        return this.fn;
    }
}
exports.Pipeline = Pipeline;
class EmptyPipeline {
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    apply(param) {
        return param;
    }
    bind(param) {
        return new BoundPipeline(param, this);
    }
    filter(fn) {
        return this.map((val) => optional_1.Optional.of(val).filter(fn));
    }
    map(fn) {
        return Pipeline.fromCallable(fn);
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    toCallable() {
        return this.apply.bind(this);
    }
}
class BoundPipeline {
    constructor(param, pipeline) {
        this.param = param;
        this.pipeline = pipeline;
    }
    alsoDo(fn) {
        return this.pipeline.alsoDo(fn).bind(this.param);
    }
    map(fn) {
        return this.pipeline.map(fn).bind(this.param);
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    filter(fn) {
        return this.map((val) => optional_1.Optional.of(val).filter(fn));
    }
    apply() {
        return this.pipeline.apply(this.param);
    }
    toCallable() {
        return this.apply.bind(this);
    }
}
//# sourceMappingURL=pipeline.js.map