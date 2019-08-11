"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matchCompose = function (matcher, cases) {
    return function (param) { return cases[matcher(param)](param); };
};
//# sourceMappingURL=match-compose.js.map