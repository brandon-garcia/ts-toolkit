"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("../fn");
class BoundListPipeline {
    constructor(list, pipeline) {
        this.list = list;
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
exports.BoundListPipeline = BoundListPipeline;
//# sourceMappingURL=bound-list-pipeline.js.map