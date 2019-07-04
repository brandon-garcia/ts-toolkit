"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const pipeline_1 = require("./pipeline");
const bridge_list_pipeline_1 = require("./bridge-list-pipeline");
const empty_list_pipeline_1 = require("./empty-list-pipeline");
const bound_list_pipeline_1 = require("./bound-list-pipeline");
const list_1 = require("../list");
class ListPipeline {
    constructor(fn) {
        this.fn = fn;
    }
    static identity() {
        return new empty_list_pipeline_1.EmptyListPipeline();
    }
    static bound(list) {
        return new bound_list_pipeline_1.BoundListPipeline(list, ListPipeline.identity());
    }
    static fromCallable(fn) {
        return new ListPipeline(fn);
    }
    static liftCallable(fn) {
        return new bridge_list_pipeline_1.BridgeListPipeline(fn, ListPipeline.identity());
    }
    static liftPipeline(pipeline) {
        return ListPipeline.liftCallable(pipeline.toCallable());
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
    flatMap(fn) {
        return new bridge_list_pipeline_1.BridgeListPipeline(this.toCallable(), ListPipeline.liftCallable(fn));
    }
    sort(fn) {
        return this.flatMap((list) => list.sort(fn));
    }
    filter(fn) {
        return this.flatMap((list) => list.filter(fn));
    }
    filterProperty(field, fn) {
        return this.filter(fn_1.FnUtils.compose(fn_1.FnUtils.liftProperty(field), fn));
    }
    reduce(fn) {
        return this.toPipeline().map((list) => list.reduce(fn));
    }
    toFirst() {
        return this.toPipeline().map(list_1.ListUtils.getFirst);
    }
    apply(list) {
        return list.map(this.fn);
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
exports.ListPipeline = ListPipeline;
//# sourceMappingURL=list-pipeline.js.map