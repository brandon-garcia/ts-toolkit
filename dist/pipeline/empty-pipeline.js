"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const bound_pipeline_1 = require("./bound-pipeline");
const optional_1 = require("../optional");
const pipeline_1 = require("./pipeline");
class EmptyPipeline {
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    apply(param) {
        return param;
    }
    bind(param) {
        return new bound_pipeline_1.BoundPipeline(param, this);
    }
    filter(fn) {
        return this.map((val) => optional_1.Optional.of(val).filter(fn));
    }
    filterProperty(field, fn) {
        return this.map((val) => optional_1.Optional.of(val).filterProperty(field, fn));
    }
    map(fn) {
        return pipeline_1.Pipeline.fromCallable(fn);
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    toCallable() {
        return this.apply.bind(this);
    }
}
exports.EmptyPipeline = EmptyPipeline;
//# sourceMappingURL=empty-pipeline.js.map