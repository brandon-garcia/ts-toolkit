"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var BoundListPipeline = (function () {
    function BoundListPipeline(list, pipeline) {
        this.list = list;
        this.pipeline = pipeline;
    }
    BoundListPipeline.prototype.alsoDo = function (fn) {
        this.pipeline = this.pipeline.alsoDo(fn);
        return this;
    };
    BoundListPipeline.prototype.map = function (fn) {
        this.pipeline = this.pipeline.map(fn);
        return this;
    };
    BoundListPipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    };
    BoundListPipeline.prototype.flatMap = function (fn) {
        return this.pipeline.flatMap(fn).bind(this.list);
    };
    BoundListPipeline.prototype.sort = function (fn) {
        return this.pipeline.sort(fn).bind(this.list);
    };
    BoundListPipeline.prototype.filter = function (fn) {
        return this.pipeline.filter(fn).bind(this.list);
    };
    BoundListPipeline.prototype.filterProperty = function (field, fn) {
        return this.pipeline.filterProperty(field, fn).bind(this.list);
    };
    BoundListPipeline.prototype.reduce = function (fn) {
        return this.pipeline.reduce(fn).bind(this.list);
    };
    BoundListPipeline.prototype.toFirst = function () {
        return this.pipeline.toFirst().bind(this.list);
    };
    BoundListPipeline.prototype.apply = function () {
        return this.pipeline.apply(this.list);
    };
    BoundListPipeline.prototype.toCallable = function () {
        return this.apply.bind(this);
    };
    BoundListPipeline.prototype.toPipeline = function () {
        return this.pipeline.toPipeline().bind(this.list);
    };
    return BoundListPipeline;
}());
exports.BoundListPipeline = BoundListPipeline;
//# sourceMappingURL=bound-list-pipeline.js.map