"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const optional_1 = require("../optional");
class BoundPipeline {
    constructor(param, pipeline) {
        this.param = param;
        this.pipeline = pipeline;
    }
    alsoDo(fn) {
        this.pipeline = this.pipeline.alsoDo(fn);
        return this;
    }
    map(fn) {
        this.pipeline = this.pipeline.map(fn);
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
    apply() {
        return this.pipeline.apply(this.param);
    }
    toCallable() {
        return this.apply.bind(this);
    }
}
exports.BoundPipeline = BoundPipeline;
//# sourceMappingURL=bound-pipeline.js.map