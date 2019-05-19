"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fn_1 = require("./fn");
class Pipeline {
    constructor(fn) {
        this.fn = fn;
    }
    static of(fn) {
        return new Pipeline(fn);
    }
    pipe(fn) {
        return Pipeline.of(fn_1.FnUtils.compose(this.fn, fn));
    }
    toCallable() {
        return this.fn;
    }
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=pipeline.js.map