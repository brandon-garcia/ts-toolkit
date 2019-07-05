"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fn_1 = require("../fn");
var optional_1 = require("../optional");
var BoundPipeline = (function () {
    function BoundPipeline(param, pipeline) {
        this.param = param;
        this.pipeline = pipeline;
    }
    BoundPipeline.prototype.alsoDo = function (fn) {
        this.pipeline = this.pipeline.alsoDo(fn);
        return this;
    };
    BoundPipeline.prototype.map = function (fn) {
        this.pipeline = this.pipeline.map(fn);
        return this;
    };
    BoundPipeline.prototype.mapToProperty = function (field) {
        return this.map(fn_1.FnUtils.liftProperty(field));
    };
    BoundPipeline.prototype.filter = function (fn) {
        return this.map(function (val) { return optional_1.Optional.of(val).filter(fn); });
    };
    BoundPipeline.prototype.filterProperty = function (field, fn) {
        return this.map(function (val) { return optional_1.Optional.of(val).filterProperty(field, fn); });
    };
    BoundPipeline.prototype.apply = function () {
        return this.pipeline.apply(this.param);
    };
    BoundPipeline.prototype.toCallable = function () {
        return this.apply.bind(this);
    };
    return BoundPipeline;
}());
exports.BoundPipeline = BoundPipeline;
//# sourceMappingURL=bound-pipeline.js.map