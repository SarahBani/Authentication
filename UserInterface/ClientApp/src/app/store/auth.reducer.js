"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.danceReducer = exports.danceFeatureKey = void 0;
var store_1 = require("@ngrx/store");
var DanceActions = require("./dance.actions");
exports.danceFeatureKey = 'dance';
var initialState = {
    isLoading: false,
    hasApiConnectionProblem: false,
    error: null,
    hasRobotsFetched: false,
    robots: null,
    inOrderRobots: [],
    selectiveRobots: [],
    hasTeamArrangementProblem: false,
    hasTeamsArranged: new Array(2),
    teamsNames: new Array(2),
    teamsMembers: new Array(2),
    winnerTeam: 0,
    competitionResult: [],
    hasCompetitionFinished: false,
    hasLeaderboardFetched: false,
    leaderboard: []
};
exports.danceReducer = store_1.createReducer(initialState, store_1.on(DanceActions.errorRaised, function (state, action) {
    return (__assign(__assign({}, state), { isLoading: false, error: action.error }));
}), store_1.on(DanceActions.clearError, function (state) {
    return (__assign(__assign({}, state), { error: null }));
}), store_1.on(DanceActions.fetchRobots, function (state) {
    return (__assign(__assign({}, state), { isLoading: true, hasApiConnectionProblem: false, hasRobotsFetched: false }));
}), store_1.on(DanceActions.fetchRobotsFailed, function (state) {
    return (__assign(__assign({}, state), { isLoading: false, hasApiConnectionProblem: true }));
}), store_1.on(DanceActions.setRobots, function (state, action) {
    return (__assign(__assign({}, state), { isLoading: false, hasRobotsFetched: true, robots: action.robots, inOrderRobots: action.robots.filter(function (q) { return !q.outOfOrder; }) }));
}), store_1.on(DanceActions.createTeam, function (state, action) {
    var updatedTeamsNames = __spreadArrays(state.teamsNames);
    updatedTeamsNames[action.teamNo - 1] = action.name;
    return (__assign(__assign({}, state), { teamsNames: updatedTeamsNames }));
}), store_1.on(DanceActions.arrangeTeam, function (state, action) {
    var updatedTeamsMembers = __spreadArrays(state.teamsMembers);
    updatedTeamsMembers[action.teamNo - 1] = [];
    var otherTeamMembers = state.teamsMembers[(action.teamNo == 1 ? 1 : 0)];
    var updatedSelectiveRobots = state.inOrderRobots.filter(function (q) { return !(otherTeamMembers === null || otherTeamMembers === void 0 ? void 0 : otherTeamMembers.some(function (x) { return x.id === q.id; })); });
    return (__assign(__assign({}, state), { isLoading: true, selectiveRobots: updatedSelectiveRobots, hasTeamArrangementProblem: false, teamsMembers: updatedTeamsMembers, winnerTeam: 0 }));
}), store_1.on(DanceActions.setTeam, function (state, action) {
    var updatedHasTeamsArranged = __spreadArrays(state.hasTeamsArranged);
    updatedHasTeamsArranged[action.teamNo - 1] = true;
    var updatedTeamsMembers = __spreadArrays(state.teamsMembers);
    updatedTeamsMembers[action.teamNo - 1] = action.members;
    return (__assign(__assign({}, state), { isLoading: false, hasTeamArrangementProblem: false, hasTeamsArranged: updatedHasTeamsArranged, teamsMembers: updatedTeamsMembers }));
}), store_1.on(DanceActions.resetTeam, function (state, action) {
    var updatedHasTeamsArranged = __spreadArrays(state.hasTeamsArranged);
    updatedHasTeamsArranged[action.teamNo - 1] = false;
    var updatedTeamsMembers = __spreadArrays(state.teamsMembers);
    updatedTeamsMembers[action.teamNo - 1] = [];
    return (__assign(__assign({}, state), { isLoading: false, hasTeamsArranged: updatedHasTeamsArranged, teamsMembers: updatedTeamsMembers, winnerTeam: 0 }));
}), store_1.on(DanceActions.startCompetition, function (state) {
    return (__assign(__assign({}, state), { isLoading: true, hasApiConnectionProblem: false, winnerTeam: 0, danceOffResults: [] }));
}), store_1.on(DanceActions.setCompetitionResult, function (state, action) {
    return (__assign(__assign({}, state), { isLoading: false, winnerTeam: action.winnerTeam, danceOffResults: action.result, hasCompetitionFinished: true }));
}), store_1.on(DanceActions.fetchLeaderboard, function (state) {
    return (__assign(__assign({}, state), { isLoading: true, hasApiConnectionProblem: false, hasLeaderboardFetched: false, leaderboard: [] }));
}), store_1.on(DanceActions.fetchLeaderboardFailed, function (state) {
    return (__assign(__assign({}, state), { isLoading: false, hasApiConnectionProblem: true }));
}), store_1.on(DanceActions.setLeaderboard, function (state, action) {
    return (__assign(__assign({}, state), { isLoading: false, hasLeaderboardFetched: true, leaderboard: action.result }));
}));
function reducer(state, action) {
    return exports.danceReducer(state, action);
}
exports.reducer = reducer;
//# sourceMappingURL=dance.reducer.js.map