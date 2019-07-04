"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const pipeline_1 = require("./pipeline");
const list_pipeline_1 = require("./list-pipeline");
const bound_list_pipeline_1 = require("./bound-list-pipeline");
const list_1 = require("../list");
class EmptyListPipeline {
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    map(fn) {
        return list_pipeline_1.ListPipeline.fromCallable(fn);
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    flatMap(fn) {
        return list_pipeline_1.ListPipeline.liftCallable(fn);
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
        return list;
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
exports.EmptyListPipeline = EmptyListPipeline;
//# sourceMappingURL=empty-list-pipeline.js.map