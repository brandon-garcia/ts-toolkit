"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchCompose = void 0;
var matchCompose = function (matcher, cases) {
    return function (param) { return cases[matcher(param)](param); };
};
exports.matchCompose = matchCompose;
//# sourceMappingURL=match-compose.js.map