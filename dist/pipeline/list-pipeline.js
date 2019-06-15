"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
const optional_1 = require("../optional");
const pipeline_1 = require("./pipeline");
const getFirst = (list) => {
    if (list.length) {
        return optional_1.Optional.some(list[0]);
    }
    return optional_1.Optional.none();
};
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
        return this.toPipeline().map(getFirst);
    }
    apply(list) {
        return this.pipeline.apply(this.fn(list));
    }
    bind(list) {
        return new BoundListPipeline(list, this);
    }
    toCallable() {
        return this.apply.bind(this);
    }
    toPipeline() {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    }
}
class ListPipeline {
    constructor(fn) {
        this.fn = fn;
    }
    static identity() {
        return new EmptyListPipeline();
    }
    static bound(list) {
        return new BoundListPipeline(list, ListPipeline.identity());
    }
    static fromCallable(fn) {
        return new ListPipeline(fn);
    }
    static liftCallable(fn) {
        return new BridgeListPipeline(fn, ListPipeline.identity());
    }
    static liftPipeline(pipeline) {
        return ListPipeline.liftCallable(pipeline.toCallable());
    }
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    map(fn) {
        return new ListPipeline(fn_1.FnUtils.compose(this.fn, fn));
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    flatMap(fn) {
        return new BridgeListPipeline(this.toCallable(), ListPipeline.liftCallable(fn));
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
        return this.toPipeline().map(getFirst);
    }
    apply(list) {
        return list.map(this.fn);
    }
    bind(list) {
        return new BoundListPipeline(list, this);
    }
    toCallable() {
        return this.apply.bind(this);
    }
    toPipeline() {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    }
}
exports.ListPipeline = ListPipeline;
class EmptyListPipeline {
    alsoDo(fn) {
        return this.map(fn_1.FnUtils.liftConsumer(fn));
    }
    map(fn) {
        return ListPipeline.fromCallable(fn);
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    flatMap(fn) {
        return ListPipeline.liftCallable(fn);
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
        return this.toPipeline().map(getFirst);
    }
    apply(list) {
        return list;
    }
    bind(list) {
        return new BoundListPipeline(list, this);
    }
    toCallable() {
        return this.apply.bind(this);
    }
    toPipeline() {
        return pipeline_1.Pipeline.fromCallable(this.toCallable());
    }
}
class BoundListPipeline {
    constructor(list, pipeline) {
        this.list = list;
        this.pipeline = pipeline;
    }
    alsoDo(fn) {
        return this.pipeline.alsoDo(fn).bind(this.list);
    }
    map(fn) {
        return this.pipeline.map(fn).bind(this.list);
    }
    mapToProperty(field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    }
    flatMap(fn) {
        return this.pipeline.flatMap(fn).bind(this.list);
    }
    sort(fn) {
        return this.pipeline.sort(fn).bind(this.list);
    }
    filter(fn) {
        return this.pipeline.filter(fn).bind(this.list);
    }
    filterProperty(field, fn) {
        return this.pipeline.filterProperty(field, fn).bind(this.list);
    }
    reduce(fn) {
        return this.pipeline.reduce(fn).bind(this.list);
    }
    toFirst() {
        return this.pipeline.toFirst().bind(this.list);
    }
    apply() {
        return this.pipeline.apply(this.list);
    }
    toCallable() {
        return this.apply.bind(this);
    }
    toPipeline() {
        return this.pipeline.toPipeline().bind(this.list);
    }
}
//# sourceMappingURL=list-pipeline.js.map