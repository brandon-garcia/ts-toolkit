"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const maybe_1 = require("../maybe");
class Pipeline {
    constructor(fn) {
        this.fn = fn;
    }
    static fromCallable(fn) {
        return new Pipeline(fn);
    }
    alsoDo(fn) {
        return this.map((param) => {
            fn(param);
            return param;
        });
    }
    map(fn) {
        return Pipeline.fromCallable(fn_1.FnUtils.compose(this.fn, fn));
    }
    filter(fn) {
        return this.map((val) => fn(val) ? maybe_1.Maybe.of(val) : maybe_1.Maybe.empty());
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
    filter(fn) {
        return this.map((val) => fn(val) ? maybe_1.Maybe.of(val) : maybe_1.Maybe.empty());
    }
    apply() {
        return this.pipeline.apply(this.param);
    }
    toCallable() {
        return this.apply.bind(this);
    }
}
//# sourceMappingURL=pipeline.js.map