"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const pipeline_1 = require("./pipeline");
const bound_list_pipeline_1 = require("./bound-list-pipeline");
const list_1 = require("../list");
class BridgeListPipeline {
    constructor(fn, pipeline) {
        this.fn = fn;
        this.pipeline = pipeline;
    }
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    map(fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.map(fn));
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    flatMap(fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.flatMap(fn));
    }
    sort(fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.sort(fn));
    }
    filter(fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.filter(fn));
    }
    filterProperty(field, fn) {
        return new BridgeListPipeline(this.fn, this.pipeline.filterProperty(field, fn));
    }
    reduce(fn) {
        return this.toPipeline().map((list) => list.reduce(fn));
    }
    toFirst() {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    }
    apply(list) {
        return this.pipeline.apply(this.fn(list));
    }
    bind(list) {
        return new bound_list_pipeline_1.BoundListPipeline(list, this);
    }
    toCallable() {
        return this.apply.bind(this);
    }
    toPipeline() {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    }
}
exports.BridgeListPipeline = BridgeListPipeline;
//# sourceMappingURL=bridge-list-pipeline.js.map