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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch_1 = require("@libs/fetch");
var filterInputs_1 = require("@libs/filterInputs");
var novelStatus_1 = require("@libs/novelStatus");
var defaultCover_1 = require("@libs/defaultCover");
var storage_1 = require("@libs/storage");
var KavitaComparison;
(function (KavitaComparison) {
    KavitaComparison[KavitaComparison["Equal"] = 0] = "Equal";
    KavitaComparison[KavitaComparison["GreaterThan"] = 1] = "GreaterThan";
    KavitaComparison[KavitaComparison["GreaterThanEqual"] = 2] = "GreaterThanEqual";
    KavitaComparison[KavitaComparison["LessThan"] = 3] = "LessThan";
    KavitaComparison[KavitaComparison["LessThanEqual"] = 4] = "LessThanEqual";
    KavitaComparison[KavitaComparison["Contains"] = 5] = "Contains";
    KavitaComparison[KavitaComparison["MustContains"] = 6] = "MustContains";
    KavitaComparison[KavitaComparison["Matches"] = 7] = "Matches";
    KavitaComparison[KavitaComparison["NotContains"] = 8] = "NotContains";
    KavitaComparison[KavitaComparison["NotEqual"] = 9] = "NotEqual";
    KavitaComparison[KavitaComparison["BeginsWith"] = 10] = "BeginsWith";
    KavitaComparison[KavitaComparison["EndsWith"] = 11] = "EndsWith";
    KavitaComparison[KavitaComparison["IsBefore"] = 12] = "IsBefore";
    KavitaComparison[KavitaComparison["IsAfter"] = 13] = "IsAfter";
    KavitaComparison[KavitaComparison["IsInLast"] = 14] = "IsInLast";
    KavitaComparison[KavitaComparison["IsNotInLast"] = 15] = "IsNotInLast";
    KavitaComparison[KavitaComparison["IsEmpty"] = 16] = "IsEmpty";
})(KavitaComparison || (KavitaComparison = {}));
var KavitaField;
(function (KavitaField) {
    KavitaField[KavitaField["Summary"] = 0] = "Summary";
    KavitaField[KavitaField["SeriesName"] = 1] = "SeriesName";
    KavitaField[KavitaField["PublicationStatus"] = 2] = "PublicationStatus";
    KavitaField[KavitaField["Languages"] = 3] = "Languages";
    KavitaField[KavitaField["AgeRating"] = 4] = "AgeRating";
    KavitaField[KavitaField["UserRating"] = 5] = "UserRating";
    KavitaField[KavitaField["Tags"] = 6] = "Tags";
    KavitaField[KavitaField["CollectionTags"] = 7] = "CollectionTags";
    KavitaField[KavitaField["Translators"] = 8] = "Translators";
    KavitaField[KavitaField["Characters"] = 9] = "Characters";
    KavitaField[KavitaField["Publisher"] = 10] = "Publisher";
    KavitaField[KavitaField["Editor"] = 11] = "Editor";
    KavitaField[KavitaField["Artist"] = 12] = "Artist";
    KavitaField[KavitaField["Letterer"] = 13] = "Letterer";
    KavitaField[KavitaField["Colorist"] = 14] = "Colorist";
    KavitaField[KavitaField["Inker"] = 15] = "Inker";
    KavitaField[KavitaField["Penciller"] = 16] = "Penciller";
    KavitaField[KavitaField["Writers"] = 17] = "Writers";
    KavitaField[KavitaField["Genres"] = 18] = "Genres";
    KavitaField[KavitaField["Libraries"] = 19] = "Libraries";
    KavitaField[KavitaField["ReadingProgress"] = 20] = "ReadingProgress";
    KavitaField[KavitaField["Formats"] = 21] = "Formats";
    KavitaField[KavitaField["ReleaseYear"] = 22] = "ReleaseYear";
    KavitaField[KavitaField["ReadTime"] = 23] = "ReadTime";
    KavitaField[KavitaField["Path"] = 24] = "Path";
    KavitaField[KavitaField["FilePath"] = 25] = "FilePath";
    KavitaField[KavitaField["WantToRead"] = 26] = "WantToRead";
    KavitaField[KavitaField["ReadDate"] = 27] = "ReadDate";
    KavitaField[KavitaField["AverageRating"] = 28] = "AverageRating";
    KavitaField[KavitaField["Imprint"] = 29] = "Imprint";
    KavitaField[KavitaField["Team"] = 30] = "Team";
    KavitaField[KavitaField["Location"] = 31] = "Location";
    KavitaField[KavitaField["LastRead"] = 32] = "LastRead";
    KavitaField[KavitaField["FileSize"] = 33] = "FileSize";
})(KavitaField || (KavitaField = {}));
var KavitaCombination;
(function (KavitaCombination) {
    KavitaCombination[KavitaCombination["MatchAny"] = 0] = "MatchAny";
    KavitaCombination[KavitaCombination["MatchAll"] = 1] = "MatchAll";
})(KavitaCombination || (KavitaCombination = {}));
var KavitaSortField;
(function (KavitaSortField) {
    KavitaSortField[KavitaSortField["SortName"] = 1] = "SortName";
    KavitaSortField[KavitaSortField["Created"] = 2] = "Created";
    KavitaSortField[KavitaSortField["LastModified"] = 3] = "LastModified";
    KavitaSortField[KavitaSortField["ItemAdded"] = 4] = "ItemAdded";
    KavitaSortField[KavitaSortField["TimeToRead"] = 5] = "TimeToRead";
    KavitaSortField[KavitaSortField["ReleaseYear"] = 6] = "ReleaseYear";
    KavitaSortField[KavitaSortField["LastRead"] = 7] = "LastRead";
    KavitaSortField[KavitaSortField["AverageRating"] = 8] = "AverageRating";
    KavitaSortField[KavitaSortField["Random"] = 9] = "Random";
})(KavitaSortField || (KavitaSortField = {}));
var KavitaFilterBuilder = (function () {
    function KavitaFilterBuilder(name) {
        this._combination = KavitaCombination.MatchAll;
        this._statements = [];
        this._sortField = KavitaSortField.SortName;
        this._sortAscending = true;
        this._limitTo = 0;
        this._name = name;
    }
    KavitaFilterBuilder.prototype.combination = function (type) {
        this._combination = type;
        return this;
    };
    KavitaFilterBuilder.prototype.sortBy = function (field, ascending) {
        if (ascending === void 0) { ascending = true; }
        this._sortField = field;
        this._sortAscending = ascending;
        return this;
    };
    KavitaFilterBuilder.prototype.limitTo = function (limit) {
        this._limitTo = limit;
        return this;
    };
    KavitaFilterBuilder.prototype.whereGenresInclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Genres,
            comparison: KavitaComparison.MustContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereGenresExclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Genres,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.wherePublicationStatusInclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.PublicationStatus,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.wherePublicationStatusExclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.PublicationStatus,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereLibrariesInclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Libraries,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereLibrariesExclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Libraries,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereFormatsContains = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Formats,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereReleaseYear = function (comparison, year) {
        var raw = year != null ? String(year).trim() : '';
        if (!raw)
            return this;
        this._statements.push({
            field: KavitaField.ReleaseYear,
            comparison: comparison,
            value: raw,
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereSeriesName = function (comparison, text) {
        var raw = (text !== null && text !== void 0 ? text : '').trim();
        if (!raw)
            return this;
        this._statements.push({
            field: KavitaField.SeriesName,
            comparison: comparison,
            value: raw,
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereWantToRead = function (value) {
        var normalized = typeof value === 'string' ? value.trim().toLowerCase() : value;
        if (normalized === true || normalized === false) {
            this._statements.push({
                field: KavitaField.WantToRead,
                comparison: KavitaComparison.Equal,
                value: normalized ? 'true' : 'false',
            });
        }
        else if (normalized === 'true' || normalized === 'false') {
            this._statements.push({
                field: KavitaField.WantToRead,
                comparison: KavitaComparison.Equal,
                value: normalized,
            });
        }
        return this;
    };
    KavitaFilterBuilder.prototype.whereTagsInclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Tags,
            comparison: KavitaComparison.MustContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereTagsExclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Tags,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereCollectionTagsInclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.CollectionTags,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.whereCollectionTagsExclude = function (ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.CollectionTags,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    };
    KavitaFilterBuilder.prototype.build = function () {
        return {
            name: this._name,
            combination: this._combination,
            statements: this._statements,
            sortOptions: {
                sortField: this._sortField,
                isAscending: this._sortAscending,
            },
            limitTo: this._limitTo,
        };
    };
    return KavitaFilterBuilder;
}());
var KavitaApiPlugin = (function () {
    function KavitaApiPlugin() {
        var _this = this;
        this.id = 'kavita-api';
        this.name = 'Kavita';
        this.icon = 'src/multi/kavita/icon.png';
        this.version = '0.0.9';
        this.site = storage_1.storage.get('url');
        this.apiKey = storage_1.storage.get('apiKey');
        this._filtersLoaded = false;
        this._presetFilterMap = new Map();
        this._filters = {
            presetFilter: {
                label: 'Preset filter',
                type: filterInputs_1.FilterTypes.Picker,
                options: [{ label: 'None', value: '' }],
                value: '',
            },
            filterCombination: {
                label: 'Filter combination',
                type: filterInputs_1.FilterTypes.Picker,
                options: [
                    {
                        label: 'Match any (OR)',
                        value: String(KavitaCombination.MatchAny),
                    },
                    {
                        label: 'Match all (AND)',
                        value: String(KavitaCombination.MatchAll),
                    },
                ],
                value: String(KavitaCombination.MatchAll),
            },
            sortField: {
                label: 'Sort by',
                type: filterInputs_1.FilterTypes.Picker,
                options: [
                    { label: 'Sort Name', value: String(KavitaSortField.SortName) },
                    { label: 'Created', value: String(KavitaSortField.Created) },
                    { label: 'Last Modified', value: String(KavitaSortField.LastModified) },
                    { label: 'Item Added', value: String(KavitaSortField.ItemAdded) },
                    { label: 'Time to Read', value: String(KavitaSortField.TimeToRead) },
                    { label: 'Release Year', value: String(KavitaSortField.ReleaseYear) },
                    { label: 'Last Read', value: String(KavitaSortField.LastRead) },
                    {
                        label: 'Average Rating',
                        value: String(KavitaSortField.AverageRating),
                    },
                    { label: 'Random', value: String(KavitaSortField.Random) },
                ],
                value: String(KavitaSortField.SortName),
            },
            sortDirection: {
                label: 'Sort direction',
                type: filterInputs_1.FilterTypes.Picker,
                options: [
                    { label: 'Ascending', value: 'true' },
                    { label: 'Descending', value: 'false' },
                ],
                value: 'true',
            },
            limitTo: {
                label: 'Limit results (0 = no limit)',
                type: filterInputs_1.FilterTypes.TextInput,
                value: '0',
            },
            libraries: {
                label: 'Libraries',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [],
                value: {
                    include: [],
                    exclude: [],
                },
            },
            publicationStatus: {
                label: 'Publication status',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [],
                value: {
                    include: [],
                    exclude: [],
                },
            },
            collectionTags: {
                label: 'Collections',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [],
                value: {
                    include: [],
                    exclude: [],
                },
            },
            wantToRead: {
                label: 'Want to read',
                type: filterInputs_1.FilterTypes.Picker,
                options: [
                    { label: 'Any', value: '' },
                    { label: 'Must be marked', value: 'true' },
                    { label: 'Must NOT be marked', value: 'false' },
                ],
                value: '',
            },
            seriesNameComparison: {
                label: 'Series name operator',
                type: filterInputs_1.FilterTypes.Picker,
                options: [
                    { label: 'Equal', value: String(KavitaComparison.Equal) },
                    { label: 'Not equal', value: String(KavitaComparison.NotEqual) },
                    { label: 'Begins with', value: String(KavitaComparison.BeginsWith) },
                    { label: 'Ends with', value: String(KavitaComparison.EndsWith) },
                    { label: 'Matches', value: String(KavitaComparison.Matches) },
                ],
                value: String(KavitaComparison.Matches),
            },
            seriesNameValue: {
                label: 'Series name',
                type: filterInputs_1.FilterTypes.TextInput,
                value: '',
            },
            releaseYearComparison: {
                label: 'Release year operator',
                type: filterInputs_1.FilterTypes.Picker,
                options: [
                    { label: 'Equal', value: String(KavitaComparison.Equal) },
                    { label: 'Not equal', value: String(KavitaComparison.NotEqual) },
                    { label: 'Less than', value: String(KavitaComparison.LessThan) },
                    {
                        label: 'Less than or equal',
                        value: String(KavitaComparison.LessThanEqual),
                    },
                    { label: 'Greater than', value: String(KavitaComparison.GreaterThan) },
                    {
                        label: 'Greater than or equal',
                        value: String(KavitaComparison.GreaterThanEqual),
                    },
                    { label: 'Is before', value: String(KavitaComparison.IsBefore) },
                    { label: 'Is after', value: String(KavitaComparison.IsAfter) },
                ],
                value: String(KavitaComparison.Equal),
            },
            releaseYearValue: {
                label: 'Release year',
                type: filterInputs_1.FilterTypes.TextInput,
                value: '',
            },
            genres: {
                label: 'Genres',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [],
                value: {
                    include: [],
                    exclude: [],
                },
            },
            tags: {
                label: 'Tagy',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [],
                value: {
                    include: [],
                    exclude: [],
                },
            },
        };
        this.imageRequestInit = undefined;
        this.webStorageUtilized = true;
        this.jwtToken = null;
        this.chapterTargets = new Map();
        this.resolveUrl = function (path, isNovel) {
            if (path.startsWith('http'))
                return path;
            return "".concat(_this.baseUrl).concat(path.startsWith('/') ? '' : '/').concat(path);
        };
        this.pluginSettings = {
            url: {
                value: '',
                label: 'Base URL (e.g. https://kavita.example.com)',
                type: 'Text',
            },
            apiKey: {
                value: '',
                label: 'Kavita API Key (from Kavita → API / OPDS)',
                type: 'Text',
            },
            formatEpub: {
                value: false,
                label: 'EPUB',
                type: 'Switch',
            },
            formatPdf: {
                value: false,
                label: 'PDF',
                type: 'Switch',
            },
            formatImage: {
                value: false,
                label: 'Image',
                type: 'Switch',
            },
            formatArchive: {
                value: false,
                label: 'Archive',
                type: 'Switch',
            },
        };
    }
    KavitaApiPlugin.prototype.ensureFilterOptionsLoaded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var presetFilters, presetOptions, _a, _b, preset, idStr, e_1, tags, e_2, genres, e_3, statuses, e_4, libraries, e_5, collections, e_6;
            var e_7, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (this._filtersLoaded)
                            return [2];
                        if (typeof fetch_1.fetchApi !== 'function') {
                            this._filtersLoaded = true;
                            return [2];
                        }
                        return [4, this.ensureToken()];
                    case 1:
                        _d.sent();
                        _d.label = 2;
                    case 2:
                        _d.trys.push([2, 4, , 5]);
                        return [4, this.apiGet('/api/Filter')];
                    case 3:
                        presetFilters = _d.sent();
                        this._presetFilterMap.clear();
                        presetOptions = [
                            {
                                label: 'None',
                                value: '',
                            },
                        ];
                        try {
                            for (_a = __values(presetFilters || []), _b = _a.next(); !_b.done; _b = _a.next()) {
                                preset = _b.value;
                                if (!preset || preset.id == null || typeof preset.filter !== 'string')
                                    continue;
                                idStr = String(preset.id);
                                this._presetFilterMap.set(idStr, preset.filter);
                                presetOptions.push({
                                    label: preset.name || "Filter ".concat(idStr),
                                    value: idStr,
                                });
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                        this._filters.presetFilter.options = presetOptions;
                        return [3, 5];
                    case 4:
                        e_1 = _d.sent();
                        console.warn('Kavita: failed to load preset filters', e_1);
                        return [3, 5];
                    case 5:
                        _d.trys.push([5, 7, , 8]);
                        return [4, this.apiGet('/api/metadata/tags')];
                    case 6:
                        tags = _d.sent();
                        this._filters.tags.options = tags.map(function (t) { return ({
                            label: t.title,
                            value: String(t.id),
                        }); });
                        return [3, 8];
                    case 7:
                        e_2 = _d.sent();
                        console.warn('Kavita: failed to load tags', e_2);
                        return [3, 8];
                    case 8:
                        _d.trys.push([8, 10, , 11]);
                        return [4, this.apiGet('/api/metadata/genres')];
                    case 9:
                        genres = _d.sent();
                        this._filters.genres.options = genres.map(function (g) { return ({
                            label: g.title,
                            value: String(g.id),
                        }); });
                        return [3, 11];
                    case 10:
                        e_3 = _d.sent();
                        console.warn('Kavita: failed to load genres', e_3);
                        return [3, 11];
                    case 11:
                        _d.trys.push([11, 13, , 14]);
                        return [4, this.apiGet('/api/metadata/publication-status')];
                    case 12:
                        statuses = _d.sent();
                        this._filters.publicationStatus.options = statuses.map(function (s) { return ({
                            label: s.title,
                            value: String(s.value),
                        }); });
                        return [3, 14];
                    case 13:
                        e_4 = _d.sent();
                        console.warn('Kavita: failed to load publication statuses', e_4);
                        return [3, 14];
                    case 14:
                        _d.trys.push([14, 16, , 17]);
                        return [4, this.apiGet('/api/library/libraries')];
                    case 15:
                        libraries = _d.sent();
                        this._filters.libraries.options = libraries.map(function (l) { return ({
                            label: l.name,
                            value: String(l.id),
                        }); });
                        return [3, 17];
                    case 16:
                        e_5 = _d.sent();
                        console.warn('Kavita: failed to load libraries', e_5);
                        return [3, 17];
                    case 17:
                        _d.trys.push([17, 19, , 20]);
                        return [4, this.apiGet('/api/collection?ownedOnly=false')];
                    case 18:
                        collections = _d.sent();
                        this._filters.collectionTags.options = collections.map(function (c) { return ({
                            label: c.title,
                            value: String(c.id),
                        }); });
                        return [3, 20];
                    case 19:
                        e_6 = _d.sent();
                        console.warn('Kavita: failed to load collections', e_6);
                        return [3, 20];
                    case 20:
                        this._filtersLoaded = true;
                        return [2];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.decodePresetFilter = function (encodedFilter) {
        return __awaiter(this, void 0, void 0, function () {
            var text, res, e_8, parsed, combinationValue, combination, statements, sortFieldRaw, sortAscendingRaw, sortAscending, sortOptions, limitToRaw, id;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!encodedFilter)
                            return [2, null];
                        return [4, this.ensureToken()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        return [4, (0, fetch_1.fetchApi)("".concat(this.baseUrl, "/api/Filter/decode"), {
                                method: 'POST',
                                headers: __assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, this.getAuthHeaders()),
                                body: JSON.stringify({ encodedFilter: encodedFilter }),
                            })];
                    case 3:
                        res = _c.sent();
                        return [4, res.text()];
                    case 4:
                        text = _c.sent();
                        return [3, 6];
                    case 5:
                        e_8 = _c.sent();
                        console.warn('Kavita: failed to decode preset filter (request)', e_8);
                        return [2, null];
                    case 6:
                        try {
                            parsed = JSON.parse(text);
                            combinationValue = Number(parsed === null || parsed === void 0 ? void 0 : parsed.combination);
                            combination = combinationValue === KavitaCombination.MatchAny
                                ? KavitaCombination.MatchAny
                                : KavitaCombination.MatchAll;
                            statements = Array.isArray(parsed === null || parsed === void 0 ? void 0 : parsed.statements)
                                ? parsed.statements
                                    .map(function (stmt) {
                                    var field = Number(stmt === null || stmt === void 0 ? void 0 : stmt.field);
                                    var comparison = Number(stmt === null || stmt === void 0 ? void 0 : stmt.comparison);
                                    if (Number.isNaN(field) || Number.isNaN(comparison))
                                        return null;
                                    return {
                                        field: field,
                                        comparison: comparison,
                                        value: (stmt === null || stmt === void 0 ? void 0 : stmt.value) === null || (stmt === null || stmt === void 0 ? void 0 : stmt.value) === undefined
                                            ? undefined
                                            : String(stmt.value),
                                    };
                                })
                                    .filter(Boolean)
                                : [];
                            sortFieldRaw = Number((_a = parsed === null || parsed === void 0 ? void 0 : parsed.sortOptions) === null || _a === void 0 ? void 0 : _a.sortField);
                            sortAscendingRaw = (_b = parsed === null || parsed === void 0 ? void 0 : parsed.sortOptions) === null || _b === void 0 ? void 0 : _b.isAscending;
                            sortAscending = typeof sortAscendingRaw === 'boolean'
                                ? sortAscendingRaw
                                : typeof sortAscendingRaw === 'string'
                                    ? sortAscendingRaw.toLowerCase() === 'true'
                                    : true;
                            sortOptions = {
                                sortField: Number.isNaN(sortFieldRaw)
                                    ? KavitaSortField.SortName
                                    : sortFieldRaw,
                                isAscending: sortAscending,
                            };
                            limitToRaw = Number(parsed === null || parsed === void 0 ? void 0 : parsed.limitTo);
                            id = typeof (parsed === null || parsed === void 0 ? void 0 : parsed.id) === 'number' && Number.isFinite(parsed.id)
                                ? parsed.id
                                : undefined;
                            return [2, {
                                    id: id,
                                    name: (parsed === null || parsed === void 0 ? void 0 : parsed.name) || 'Preset filter',
                                    combination: combination,
                                    statements: statements,
                                    sortOptions: sortOptions,
                                    limitTo: Number.isNaN(limitToRaw) ? 0 : limitToRaw,
                                }];
                        }
                        catch (e) {
                            console.warn('Kavita: failed to decode preset filter (parse)', e, text);
                            return [2, null];
                        }
                        return [2];
                }
            });
        });
    };
    Object.defineProperty(KavitaApiPlugin.prototype, "filters", {
        get: function () {
            void this.ensureFilterOptionsLoaded();
            return this._filters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KavitaApiPlugin.prototype, "baseUrl", {
        get: function () {
            return this.site;
        },
        enumerable: false,
        configurable: true
    });
    KavitaApiPlugin.prototype.getBoolSetting = function (key, defaultVal) {
        var raw = storage_1.storage.get(key);
        if (typeof raw === 'boolean')
            return raw;
        if (typeof raw === 'string') {
            var v = raw.toLowerCase().trim();
            if (['true', '1', 'yes', 'on'].includes(v))
                return true;
            if (['false', '0', 'no', 'off'].includes(v))
                return false;
        }
        return defaultVal;
    };
    KavitaApiPlugin.prototype.ensureToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, text, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.jwtToken)
                            return [2];
                        if (typeof fetch_1.fetchApi !== 'function') {
                            throw new Error('fetchApi is not available in this runtime');
                        }
                        url = "".concat(this.baseUrl, "/api/Plugin/authenticate?apiKey=").concat(encodeURIComponent(this.apiKey), "&pluginName=lnreader-kavita");
                        return [4, (0, fetch_1.fetchApi)(url, { method: 'POST' })];
                    case 1:
                        res = _a.sent();
                        return [4, res.text()];
                    case 2:
                        text = _a.sent();
                        try {
                            data = JSON.parse(text);
                        }
                        catch (_b) {
                            throw new Error("Authentication failed, non-JSON response: ".concat(text));
                        }
                        if (!(data === null || data === void 0 ? void 0 : data.token)) {
                            throw new Error('Authentication failed: token missing in response');
                        }
                        console.log("Kavita API: Authenticated successfully - ".concat(data.token));
                        this.jwtToken = data.token;
                        return [2];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.getAuthHeaders = function () {
        return this.jwtToken ? { Authorization: "Bearer ".concat(this.jwtToken) } : {};
    };
    KavitaApiPlugin.prototype.apiGet = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var url, res, text;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.ensureToken()];
                    case 1:
                        _a.sent();
                        url = path.startsWith('http')
                            ? path
                            : "".concat(this.baseUrl).concat(path.startsWith('/') ? '' : '/').concat(path);
                        return [4, (0, fetch_1.fetchApi)(url, {
                                method: 'GET',
                                headers: __assign({ Accept: 'application/json' }, this.getAuthHeaders()),
                            })];
                    case 2:
                        res = _a.sent();
                        return [4, res.text()];
                    case 3:
                        text = _a.sent();
                        try {
                            return [2, JSON.parse(text)];
                        }
                        catch (_b) {
                            return [2, text];
                        }
                        return [2];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.popularNovels = function (pageNo_1, _a) {
        return __awaiter(this, arguments, void 0, function (pageNo, _b) {
            var pageSize, presetFilterRaw, presetFilterId, presetFilterBody, encodedPreset, presetFilterSelected, hasUserFilters, body, applyIncludeExcludeFilter, combination, combinationRaw, parsed, limitTo, limitToRaw, raw, parsed, sortField, sortAscending, sortFieldRaw, parsed, sortDirectionRaw, fb_1, releaseYearValueRaw, releaseYearComparisonRaw, rawYear, comparison, parsed, seriesNameValueRaw, seriesNameComparisonRaw, rawName, comparison, parsed, wantToReadRaw, v, formatImageOn, formatArchiveOn, formatEpubOn, formatPdfOn, selectedFormatIds, useLatestEndpoint, endpoint, url, res, text, data, novels;
            var _this = this;
            var _c, _d, _e;
            var showLatestNovels = _b.showLatestNovels, filters = _b.filters;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4, this.ensureToken()];
                    case 1:
                        _f.sent();
                        return [4, this.ensureFilterOptionsLoaded()];
                    case 2:
                        _f.sent();
                        pageSize = 30;
                        presetFilterRaw = filters === null || filters === void 0 ? void 0 : filters.presetFilter;
                        presetFilterId = presetFilterRaw &&
                            presetFilterRaw.type === filterInputs_1.FilterTypes.Picker &&
                            typeof presetFilterRaw.value === 'string'
                            ? presetFilterRaw.value.trim()
                            : '';
                        presetFilterBody = null;
                        if (!presetFilterId) return [3, 5];
                        encodedPreset = this._presetFilterMap.get(presetFilterId);
                        if (!encodedPreset) return [3, 4];
                        return [4, this.decodePresetFilter(encodedPreset)];
                    case 3:
                        presetFilterBody = _f.sent();
                        return [3, 5];
                    case 4:
                        console.warn("Kavita: preset filter ".concat(presetFilterId, " missing from cache"));
                        _f.label = 5;
                    case 5:
                        presetFilterSelected = Boolean(presetFilterId);
                        hasUserFilters = presetFilterSelected;
                        if (presetFilterBody) {
                            hasUserFilters = true;
                            body = presetFilterBody;
                        }
                        else if (presetFilterSelected) {
                            body = new KavitaFilterBuilder('LNReader: Preset (fallback)')
                                .combination(KavitaCombination.MatchAll)
                                .sortBy(KavitaSortField.SortName, true)
                                .limitTo(0)
                                .build();
                        }
                        else {
                            applyIncludeExcludeFilter = function (key, includeHandler, excludeHandler) {
                                var raw = filters === null || filters === void 0 ? void 0 : filters[key];
                                if (!raw ||
                                    raw.type !== filterInputs_1.FilterTypes.ExcludableCheckboxGroup ||
                                    typeof raw !== 'object') {
                                    return false;
                                }
                                var value = (raw.value || {});
                                var updated = false;
                                var includeIds = Array.isArray(value.include) ? value.include : [];
                                if (includeIds.length > 0) {
                                    includeHandler(includeIds);
                                    updated = true;
                                }
                                var excludeIds = Array.isArray(value.exclude) ? value.exclude : [];
                                if (excludeIds.length > 0) {
                                    excludeHandler(excludeIds);
                                    updated = true;
                                }
                                return updated;
                            };
                            combination = KavitaCombination.MatchAll;
                            combinationRaw = filters === null || filters === void 0 ? void 0 : filters.filterCombination;
                            if (combinationRaw &&
                                combinationRaw.type === filterInputs_1.FilterTypes.Picker &&
                                typeof combinationRaw.value === 'string') {
                                parsed = Number(combinationRaw.value);
                                if (parsed === KavitaCombination.MatchAny ||
                                    parsed === KavitaCombination.MatchAll) {
                                    combination = parsed;
                                }
                            }
                            hasUserFilters = false;
                            limitTo = 0;
                            limitToRaw = filters === null || filters === void 0 ? void 0 : filters.limitTo;
                            if (limitToRaw && limitToRaw.type === filterInputs_1.FilterTypes.TextInput) {
                                raw = String((_c = limitToRaw.value) !== null && _c !== void 0 ? _c : '').trim();
                                if (raw) {
                                    parsed = Number(raw);
                                    if (Number.isFinite(parsed) && parsed >= 0) {
                                        limitTo = parsed;
                                        if (parsed > 0)
                                            hasUserFilters = true;
                                    }
                                }
                            }
                            sortField = KavitaSortField.SortName;
                            sortAscending = true;
                            sortFieldRaw = filters === null || filters === void 0 ? void 0 : filters.sortField;
                            if (sortFieldRaw &&
                                sortFieldRaw.type === filterInputs_1.FilterTypes.Picker &&
                                typeof sortFieldRaw.value === 'string') {
                                parsed = Number(sortFieldRaw.value);
                                if (!Number.isNaN(parsed)) {
                                    sortField = parsed;
                                }
                            }
                            sortDirectionRaw = filters === null || filters === void 0 ? void 0 : filters.sortDirection;
                            if (sortDirectionRaw &&
                                sortDirectionRaw.type === filterInputs_1.FilterTypes.Picker &&
                                typeof sortDirectionRaw.value === 'string') {
                                sortAscending = sortDirectionRaw.value.toLowerCase() === 'true';
                            }
                            if (sortField !== KavitaSortField.SortName || sortAscending !== true) {
                                hasUserFilters = true;
                            }
                            fb_1 = new KavitaFilterBuilder('LNReader: Recently Added')
                                .combination(combination)
                                .sortBy(sortField, sortAscending)
                                .limitTo(limitTo);
                            if (applyIncludeExcludeFilter('genres', function (ids) { return fb_1.whereGenresInclude(ids); }, function (ids) { return fb_1.whereGenresExclude(ids); })) {
                                hasUserFilters = true;
                            }
                            if (applyIncludeExcludeFilter('publicationStatus', function (ids) { return fb_1.wherePublicationStatusInclude(ids); }, function (ids) { return fb_1.wherePublicationStatusExclude(ids); })) {
                                hasUserFilters = true;
                            }
                            if (applyIncludeExcludeFilter('libraries', function (ids) { return fb_1.whereLibrariesInclude(ids); }, function (ids) { return fb_1.whereLibrariesExclude(ids); })) {
                                hasUserFilters = true;
                            }
                            releaseYearValueRaw = filters === null || filters === void 0 ? void 0 : filters.releaseYearValue;
                            releaseYearComparisonRaw = filters === null || filters === void 0 ? void 0 : filters.releaseYearComparison;
                            if (releaseYearValueRaw &&
                                releaseYearValueRaw.type === filterInputs_1.FilterTypes.TextInput) {
                                rawYear = ((_d = releaseYearValueRaw.value) !== null && _d !== void 0 ? _d : '').trim();
                                if (rawYear) {
                                    comparison = KavitaComparison.Equal;
                                    if (releaseYearComparisonRaw &&
                                        releaseYearComparisonRaw.type === filterInputs_1.FilterTypes.Picker &&
                                        typeof releaseYearComparisonRaw.value === 'string') {
                                        parsed = Number(releaseYearComparisonRaw.value);
                                        if (!Number.isNaN(parsed)) {
                                            comparison = parsed;
                                        }
                                    }
                                    fb_1.whereReleaseYear(comparison, rawYear);
                                    hasUserFilters = true;
                                }
                            }
                            seriesNameValueRaw = filters === null || filters === void 0 ? void 0 : filters.seriesNameValue;
                            seriesNameComparisonRaw = filters === null || filters === void 0 ? void 0 : filters.seriesNameComparison;
                            if (seriesNameValueRaw &&
                                seriesNameValueRaw.type === filterInputs_1.FilterTypes.TextInput) {
                                rawName = ((_e = seriesNameValueRaw.value) !== null && _e !== void 0 ? _e : '').trim();
                                if (rawName) {
                                    comparison = KavitaComparison.Matches;
                                    if (seriesNameComparisonRaw &&
                                        seriesNameComparisonRaw.type === filterInputs_1.FilterTypes.Picker &&
                                        typeof seriesNameComparisonRaw.value === 'string') {
                                        parsed = Number(seriesNameComparisonRaw.value);
                                        if (!Number.isNaN(parsed)) {
                                            comparison = parsed;
                                        }
                                    }
                                    fb_1.whereSeriesName(comparison, rawName);
                                    hasUserFilters = true;
                                }
                            }
                            if (applyIncludeExcludeFilter('tags', function (ids) { return fb_1.whereTagsInclude(ids); }, function (ids) { return fb_1.whereTagsExclude(ids); })) {
                                hasUserFilters = true;
                            }
                            if (applyIncludeExcludeFilter('collectionTags', function (ids) { return fb_1.whereCollectionTagsInclude(ids); }, function (ids) { return fb_1.whereCollectionTagsExclude(ids); })) {
                                hasUserFilters = true;
                            }
                            wantToReadRaw = filters === null || filters === void 0 ? void 0 : filters.wantToRead;
                            if (wantToReadRaw &&
                                wantToReadRaw.type === filterInputs_1.FilterTypes.Picker &&
                                typeof wantToReadRaw.value === 'string') {
                                v = wantToReadRaw.value.trim().toLowerCase();
                                if (v === 'true' || v === 'false') {
                                    fb_1.whereWantToRead(v);
                                    hasUserFilters = true;
                                }
                            }
                            formatImageOn = this.getBoolSetting('formatImage', false);
                            formatArchiveOn = this.getBoolSetting('formatArchive', false);
                            formatEpubOn = this.getBoolSetting('formatEpub', false);
                            formatPdfOn = this.getBoolSetting('formatPdf', false);
                            selectedFormatIds = [];
                            if (formatImageOn)
                                selectedFormatIds.push('0');
                            if (formatArchiveOn)
                                selectedFormatIds.push('1');
                            if (formatEpubOn)
                                selectedFormatIds.push('3');
                            if (formatPdfOn)
                                selectedFormatIds.push('4');
                            if (selectedFormatIds.length > 0) {
                                fb_1.whereFormatsContains(selectedFormatIds);
                            }
                            body = fb_1.build();
                        }
                        console.log('Kavita API: popularNovels', {
                            pageNo: pageNo,
                            showLatestNovels: showLatestNovels,
                            hasUserFilters: hasUserFilters,
                            usingPresetFilter: Boolean(presetFilterBody),
                            presetFilterSelected: presetFilterSelected,
                        });
                        useLatestEndpoint = showLatestNovels && !hasUserFilters;
                        endpoint = useLatestEndpoint
                            ? '/api/Series/recently-added-v2'
                            : '/api/Series/v2';
                        url = "".concat(this.baseUrl).concat(endpoint, "?PageNumber=").concat(pageNo, "&PageSize=").concat(pageSize);
                        return [4, (0, fetch_1.fetchApi)(url, {
                                method: 'POST',
                                headers: __assign({ Accept: 'text/plain', 'Content-Type': 'application/json' }, this.getAuthHeaders()),
                                body: JSON.stringify(body),
                            })];
                    case 6:
                        res = _f.sent();
                        return [4, res.text()];
                    case 7:
                        text = _f.sent();
                        data = [];
                        try {
                            data = JSON.parse(text);
                        }
                        catch (_g) {
                            console.warn('Kavita API: popularNovels - invalid JSON response');
                            return [2, []];
                        }
                        novels = (data || []).map(function (series) {
                            var _a, _b, _c;
                            var seriesId = (_a = series.id) !== null && _a !== void 0 ? _a : series.seriesId;
                            var name = (_c = (_b = series.name) !== null && _b !== void 0 ? _b : series.seriesName) !== null && _c !== void 0 ? _c : 'Unknown series';
                            var cover = seriesId
                                ? "".concat(_this.baseUrl, "/api/image/series-cover?seriesId=").concat(seriesId).concat(_this.apiKey ? "&apiKey=".concat(_this.apiKey) : '')
                                : defaultCover_1.defaultCover;
                            return {
                                name: name,
                                path: String(seriesId),
                                cover: cover,
                            };
                        });
                        return [2, novels];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.stableBookKey = function (bookInfo, chapter, volume) {
        var _a, _b, _c, _d, _e, _f;
        var title = (_d = (_c = (_b = (_a = bookInfo === null || bookInfo === void 0 ? void 0 : bookInfo.bookTitle) !== null && _a !== void 0 ? _a : chapter === null || chapter === void 0 ? void 0 : chapter.titleName) !== null && _b !== void 0 ? _b : volume === null || volume === void 0 ? void 0 : volume.name) !== null && _c !== void 0 ? _c : volume === null || volume === void 0 ? void 0 : volume.title) !== null && _d !== void 0 ? _d : 'book';
        var volumeNumber = (_f = (_e = bookInfo === null || bookInfo === void 0 ? void 0 : bookInfo.volumeNumber) !== null && _e !== void 0 ? _e : volume === null || volume === void 0 ? void 0 : volume.number) !== null && _f !== void 0 ? _f : '';
        return "".concat(String(title), "\u001F").concat(String(volumeNumber));
    };
    KavitaApiPlugin.prototype.makeStableChapterPath = function (seriesId, bookKey, page) {
        return "stable2:".concat(seriesId, ":").concat(encodeURIComponent(bookKey), ":").concat(page);
    };
    KavitaApiPlugin.prototype.parseStableChapterPath = function (chapterPath) {
        var match = /^stable2:(\d+):([^:]+):(\d+)$/.exec(chapterPath);
        if (!match)
            return null;
        var seriesId = Number(match[1]);
        var page = Number(match[3]);
        if (!Number.isFinite(seriesId) || !Number.isFinite(page))
            return null;
        try {
            return {
                seriesId: seriesId,
                bookKey: decodeURIComponent(match[2]),
                page: page,
            };
        }
        catch (_a) {
            return null;
        }
    };
    KavitaApiPlugin.prototype.resolveStableChapterTarget = function (seriesId, bookKey, page, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var stablePath, cached, volumesRes, volumes, _a, _b, vol, _c, _d, ch, bookInfo, currentBookKey, totalPages, target, e_9_1, e_10_1;
            var e_10, _e, e_9, _f;
            var _g, _h, _j, _k;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        stablePath = this.makeStableChapterPath(seriesId, bookKey, page);
                        cached = this.chapterTargets.get(stablePath);
                        if (cached)
                            return [2, cached];
                        return [4, (0, fetch_1.fetchApi)("".concat(this.site, "/api/Series/volumes?seriesId=").concat(seriesId), { headers: headers })];
                    case 1:
                        volumesRes = _l.sent();
                        return [4, volumesRes.json()];
                    case 2:
                        volumes = _l.sent();
                        _l.label = 3;
                    case 3:
                        _l.trys.push([3, 14, 15, 16]);
                        _a = __values(Array.isArray(volumes) ? volumes : []), _b = _a.next();
                        _l.label = 4;
                    case 4:
                        if (!!_b.done) return [3, 13];
                        vol = _b.value;
                        _l.label = 5;
                    case 5:
                        _l.trys.push([5, 10, 11, 12]);
                        _c = (e_9 = void 0, __values((_g = vol.chapters) !== null && _g !== void 0 ? _g : [])), _d = _c.next();
                        _l.label = 6;
                    case 6:
                        if (!!_d.done) return [3, 9];
                        ch = _d.value;
                        if (!(ch === null || ch === void 0 ? void 0 : ch.id))
                            return [3, 8];
                        return [4, (0, fetch_1.fetchApi)("".concat(this.site, "/api/Book/").concat(ch.id, "/book-info"), { headers: headers }).then(function (res) { return res.json(); })];
                    case 7:
                        bookInfo = _l.sent();
                        currentBookKey = this.stableBookKey(bookInfo, ch, vol);
                        if (currentBookKey !== bookKey)
                            return [3, 8];
                        totalPages = Number((_k = (_j = (_h = bookInfo.pages) !== null && _h !== void 0 ? _h : ch.pages) !== null && _j !== void 0 ? _j : vol.pages) !== null && _k !== void 0 ? _k : 0);
                        if (page < 0 || page >= totalPages)
                            return [2, null];
                        target = { chapterId: Number(ch.id), page: page };
                        this.chapterTargets.set(stablePath, target);
                        return [2, target];
                    case 8:
                        _d = _c.next();
                        return [3, 6];
                    case 9: return [3, 12];
                    case 10:
                        e_9_1 = _l.sent();
                        e_9 = { error: e_9_1 };
                        return [3, 12];
                    case 11:
                        try {
                            if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                        }
                        finally { if (e_9) throw e_9.error; }
                        return [7];
                    case 12:
                        _b = _a.next();
                        return [3, 4];
                    case 13: return [3, 16];
                    case 14:
                        e_10_1 = _l.sent();
                        e_10 = { error: e_10_1 };
                        return [3, 16];
                    case 15:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_10) throw e_10.error; }
                        return [7];
                    case 16: return [2, null];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.flattenBookChapters = function (toc) {
        var flat = [];
        var walk = function (item) {
            var _a;
            if (typeof item.page === 'number') {
                flat.push({
                    page: item.page,
                    title: (_a = item.title) !== null && _a !== void 0 ? _a : '',
                });
            }
            if (Array.isArray(item.children)) {
                item.children.forEach(walk);
            }
        };
        if (Array.isArray(toc)) {
            toc.forEach(walk);
        }
        flat.sort(function (a, b) { return a.page - b.page; });
        return flat;
    };
    KavitaApiPlugin.prototype.getTitleForPage = function (flatToc, page) {
        var e_11, _a;
        var current = null;
        try {
            for (var flatToc_1 = __values(flatToc), flatToc_1_1 = flatToc_1.next(); !flatToc_1_1.done; flatToc_1_1 = flatToc_1.next()) {
                var item = flatToc_1_1.value;
                if (item.page <= page) {
                    current = item.title || null;
                }
                else {
                    break;
                }
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (flatToc_1_1 && !flatToc_1_1.done && (_a = flatToc_1.return)) _a.call(flatToc_1);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return current;
    };
    KavitaApiPlugin.prototype.parseNovel = function (novelPath) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, seriesId, _a, seriesRes, metaRes, volumesRes, series, metadata, volumes, novel, writers, firstVolume, firstChapter, genreSet, _b, _c, vol, _d, _e, ch, _f, _g, g, title, rating, status, chapters, globalIndex, _h, _j, vol, volChapters, volChapters_1, volChapters_1_1, ch, chapterId, _k, bookInfo, tocJson, totalPages, flatToc, bookKey, page, tocTitle, nameParts, volNum, volumeTitle, stablePath, e_12_1, e_13_1;
            var e_14, _l, e_15, _m, e_16, _o, e_13, _p, e_12, _q;
            var _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
            return __generator(this, function (_14) {
                switch (_14.label) {
                    case 0: return [4, this.ensureToken()];
                    case 1:
                        _14.sent();
                        headers = __assign({ Accept: 'application/json' }, this.getAuthHeaders());
                        seriesId = Number(novelPath.startsWith('/api/Series/')
                            ? novelPath.split('/').pop()
                            : novelPath);
                        return [4, Promise.all([
                                (0, fetch_1.fetchApi)("".concat(this.site, "/api/Series/").concat(seriesId), { headers: headers }),
                                (0, fetch_1.fetchApi)("".concat(this.site, "/api/Series/metadata?seriesId=").concat(seriesId), {
                                    headers: headers,
                                }),
                                (0, fetch_1.fetchApi)("".concat(this.site, "/api/Series/volumes?seriesId=").concat(seriesId), {
                                    headers: headers,
                                }),
                            ])];
                    case 2:
                        _a = __read.apply(void 0, [_14.sent(), 3]), seriesRes = _a[0], metaRes = _a[1], volumesRes = _a[2];
                        return [4, seriesRes.json()];
                    case 3:
                        series = _14.sent();
                        return [4, metaRes.json()];
                    case 4:
                        metadata = _14.sent();
                        return [4, volumesRes.json()];
                    case 5:
                        volumes = _14.sent();
                        novel = {
                            path: String(seriesId),
                            name: (_s = (_r = series.name) !== null && _r !== void 0 ? _r : metadata.title) !== null && _s !== void 0 ? _s : 'Untitled',
                            cover: "".concat(this.site, "/api/image/series-cover?seriesId=").concat(seriesId).concat(this.apiKey ? "&apiKey=".concat(this.apiKey) : ''),
                            chapters: [],
                        };
                        if (Array.isArray(metadata.people) && metadata.people.length) {
                            writers = metadata.people.filter(function (p) {
                                return String(p.role || '')
                                    .toLowerCase()
                                    .includes('writer');
                            });
                            if (writers.length) {
                                novel.author = writers.map(function (w) { return w.name; }).join(', ');
                            }
                        }
                        else {
                            firstVolume = Array.isArray(volumes) ? volumes[0] : null;
                            firstChapter = firstVolume && Array.isArray(firstVolume.chapters)
                                ? firstVolume.chapters[0]
                                : null;
                            if (firstChapter && Array.isArray(firstChapter.writers)) {
                                novel.author = firstChapter.writers.map(function (w) { return w.name; }).join(', ');
                            }
                        }
                        switch (metadata.publicationStatus) {
                            case 0:
                                novel.status = novelStatus_1.NovelStatus.Ongoing;
                                break;
                            case 1:
                                novel.status = novelStatus_1.NovelStatus.OnHiatus;
                                break;
                            case 2:
                                novel.status = novelStatus_1.NovelStatus.Completed;
                                break;
                            case 3:
                                novel.status = novelStatus_1.NovelStatus.Cancelled;
                                break;
                            default:
                                novel.status = novelStatus_1.NovelStatus.Unknown;
                        }
                        if (Array.isArray(metadata.genres) && metadata.genres.length) {
                            novel.genres = metadata.genres
                                .map(function (g) { var _a, _b, _c; return (_c = (_b = (_a = g.title) !== null && _a !== void 0 ? _a : g.name) !== null && _b !== void 0 ? _b : g.label) !== null && _c !== void 0 ? _c : g.value; })
                                .filter(Boolean)
                                .join(', ');
                        }
                        else {
                            genreSet = new Set();
                            try {
                                for (_b = __values(volumes), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    vol = _c.value;
                                    try {
                                        for (_d = (e_15 = void 0, __values((_t = vol.chapters) !== null && _t !== void 0 ? _t : [])), _e = _d.next(); !_e.done; _e = _d.next()) {
                                            ch = _e.value;
                                            try {
                                                for (_f = (e_16 = void 0, __values((_u = ch.genres) !== null && _u !== void 0 ? _u : [])), _g = _f.next(); !_g.done; _g = _f.next()) {
                                                    g = _g.value;
                                                    title = (_v = g.title) !== null && _v !== void 0 ? _v : g.name;
                                                    if (title)
                                                        genreSet.add(title);
                                                }
                                            }
                                            catch (e_16_1) { e_16 = { error: e_16_1 }; }
                                            finally {
                                                try {
                                                    if (_g && !_g.done && (_o = _f.return)) _o.call(_f);
                                                }
                                                finally { if (e_16) throw e_16.error; }
                                            }
                                        }
                                    }
                                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                                    finally {
                                        try {
                                            if (_e && !_e.done && (_m = _d.return)) _m.call(_d);
                                        }
                                        finally { if (e_15) throw e_15.error; }
                                    }
                                }
                            }
                            catch (e_14_1) { e_14 = { error: e_14_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_l = _b.return)) _l.call(_b);
                                }
                                finally { if (e_14) throw e_14.error; }
                            }
                            if (genreSet.size) {
                                novel.genres = Array.from(genreSet).join(', ');
                            }
                        }
                        novel.summary =
                            (_z = (_y = (_x = (_w = metadata.summary) !== null && _w !== void 0 ? _w : metadata.description) !== null && _x !== void 0 ? _x : series.summary) !== null && _y !== void 0 ? _y : series.description) !== null && _z !== void 0 ? _z : undefined;
                        rating = (_2 = (_1 = (_0 = metadata.userRating) !== null && _0 !== void 0 ? _0 : metadata.averageRating) !== null && _1 !== void 0 ? _1 : series.userRating) !== null && _2 !== void 0 ? _2 : series.averageRating;
                        if (typeof rating === 'number')
                            novel.rating = rating;
                        status = (_5 = (_4 = (_3 = metadata.seriesStatus) !== null && _3 !== void 0 ? _3 : metadata.status) !== null && _4 !== void 0 ? _4 : series.status) !== null && _5 !== void 0 ? _5 : series.seriesStatus;
                        if (status)
                            novel.status = String(status);
                        chapters = [];
                        globalIndex = 1;
                        _14.label = 6;
                    case 6:
                        _14.trys.push([6, 17, 18, 19]);
                        _h = __values(volumes), _j = _h.next();
                        _14.label = 7;
                    case 7:
                        if (!!_j.done) return [3, 16];
                        vol = _j.value;
                        volChapters = (_6 = vol.chapters) !== null && _6 !== void 0 ? _6 : [];
                        if (!volChapters.length)
                            return [3, 15];
                        _14.label = 8;
                    case 8:
                        _14.trys.push([8, 13, 14, 15]);
                        volChapters_1 = (e_12 = void 0, __values(volChapters)), volChapters_1_1 = volChapters_1.next();
                        _14.label = 9;
                    case 9:
                        if (!!volChapters_1_1.done) return [3, 12];
                        ch = volChapters_1_1.value;
                        chapterId = ch.id;
                        if (!chapterId)
                            return [3, 11];
                        return [4, Promise.all([
                                (0, fetch_1.fetchApi)("".concat(this.site, "/api/Book/").concat(chapterId, "/book-info"), {
                                    headers: headers,
                                }).then(function (res) { return res.json(); }),
                                (0, fetch_1.fetchApi)("".concat(this.site, "/api/Book/").concat(chapterId, "/chapters"), {
                                    headers: headers,
                                }).then(function (res) { return res.json(); }),
                            ])];
                    case 10:
                        _k = __read.apply(void 0, [_14.sent(), 2]), bookInfo = _k[0], tocJson = _k[1];
                        totalPages = (_9 = (_8 = (_7 = bookInfo.pages) !== null && _7 !== void 0 ? _7 : ch.pages) !== null && _8 !== void 0 ? _8 : vol.pages) !== null && _9 !== void 0 ? _9 : 0;
                        if (!totalPages)
                            return [3, 11];
                        flatToc = this.flattenBookChapters(tocJson);
                        bookKey = this.stableBookKey(bookInfo, ch, vol);
                        for (page = 0; page < totalPages; page++) {
                            tocTitle = this.getTitleForPage(flatToc, page);
                            nameParts = [];
                            nameParts.push("".concat(page + 1, " / ").concat(totalPages));
                            if (tocTitle)
                                nameParts.push(tocTitle);
                            volNum = (_10 = bookInfo.volumeNumber) !== null && _10 !== void 0 ? _10 : vol.number;
                            volumeTitle = bookInfo.bookTitle ||
                                ch.titleName ||
                                (volNum != null ? "".concat(series.name, ", Vol. ").concat(volNum) : series.name);
                            if (volumeTitle)
                                nameParts.push(volumeTitle);
                            stablePath = this.makeStableChapterPath(seriesId, bookKey, page);
                            this.chapterTargets.set(stablePath, {
                                chapterId: Number(chapterId),
                                page: page,
                            });
                            chapters.push({
                                name: nameParts.join(' - '),
                                path: stablePath,
                                chapterNumber: globalIndex++,
                                releaseTime: (_13 = (_12 = (_11 = ch.releaseDate) !== null && _11 !== void 0 ? _11 : ch.created) !== null && _12 !== void 0 ? _12 : ch.createdUtc) !== null && _13 !== void 0 ? _13 : null,
                            });
                        }
                        _14.label = 11;
                    case 11:
                        volChapters_1_1 = volChapters_1.next();
                        return [3, 9];
                    case 12: return [3, 15];
                    case 13:
                        e_12_1 = _14.sent();
                        e_12 = { error: e_12_1 };
                        return [3, 15];
                    case 14:
                        try {
                            if (volChapters_1_1 && !volChapters_1_1.done && (_q = volChapters_1.return)) _q.call(volChapters_1);
                        }
                        finally { if (e_12) throw e_12.error; }
                        return [7];
                    case 15:
                        _j = _h.next();
                        return [3, 7];
                    case 16: return [3, 19];
                    case 17:
                        e_13_1 = _14.sent();
                        e_13 = { error: e_13_1 };
                        return [3, 19];
                    case 18:
                        try {
                            if (_j && !_j.done && (_p = _h.return)) _p.call(_h);
                        }
                        finally { if (e_13) throw e_13.error; }
                        return [7];
                    case 19:
                        novel.chapters = chapters;
                        return [2, novel];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.parseChapter = function (chapterPath) {
        return __awaiter(this, void 0, void 0, function () {
            var headers, stable, target, _a, chapterIdStr, pageStr, chapterId, page, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.ensureToken()];
                    case 1:
                        _b.sent();
                        headers = __assign({ Accept: 'text/plain,application/json' }, this.getAuthHeaders());
                        stable = this.parseStableChapterPath(chapterPath);
                        target = null;
                        if (!stable) return [3, 3];
                        return [4, this.resolveStableChapterTarget(stable.seriesId, stable.bookKey, stable.page, headers)];
                    case 2:
                        target = _b.sent();
                        if (!target) {
                            throw new Error("Could not resolve stable chapterPath: ".concat(chapterPath));
                        }
                        return [3, 4];
                    case 3:
                        _a = __read(chapterPath.split(':'), 2), chapterIdStr = _a[0], pageStr = _a[1];
                        chapterId = Number(chapterIdStr);
                        page = Number(pageStr || '0');
                        if (!chapterId || Number.isNaN(chapterId)) {
                            throw new Error("Invalid chapterPath: ".concat(chapterPath));
                        }
                        target = { chapterId: chapterId, page: page };
                        _b.label = 4;
                    case 4: return [4, (0, fetch_1.fetchApi)("".concat(this.site, "/api/Book/").concat(target.chapterId, "/book-page?page=").concat(target.page), { headers: headers })];
                    case 5:
                        res = _b.sent();
                        return [4, res.text()];
                    case 6: return [2, _b.sent()];
                }
            });
        });
    };
    KavitaApiPlugin.prototype.searchNovels = function (searchTerm, pageNo) {
        return __awaiter(this, void 0, void 0, function () {
            var query, pageSize, currentPage, fb, formatImageOn, formatArchiveOn, formatEpubOn, formatPdfOn, selectedFormatIds, body, url, res, text, data, seriesResults, novels;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = searchTerm.trim();
                        if (!query) {
                            return [2, []];
                        }
                        return [4, this.ensureToken()];
                    case 1:
                        _a.sent();
                        pageSize = 12;
                        currentPage = Math.max(pageNo || 1, 1);
                        fb = new KavitaFilterBuilder('LNReader: Search')
                            .combination(KavitaCombination.MatchAll)
                            .sortBy(KavitaSortField.SortName, true)
                            .limitTo(0)
                            .whereSeriesName(KavitaComparison.Matches, query);
                        formatImageOn = this.getBoolSetting('formatImage', false);
                        formatArchiveOn = this.getBoolSetting('formatArchive', false);
                        formatEpubOn = this.getBoolSetting('formatEpub', true);
                        formatPdfOn = this.getBoolSetting('formatPdf', true);
                        selectedFormatIds = [];
                        if (formatImageOn)
                            selectedFormatIds.push('0');
                        if (formatArchiveOn)
                            selectedFormatIds.push('1');
                        if (formatEpubOn)
                            selectedFormatIds.push('3');
                        if (formatPdfOn)
                            selectedFormatIds.push('4');
                        if (selectedFormatIds.length > 0) {
                            fb.whereFormatsContains(selectedFormatIds);
                        }
                        body = fb.build();
                        url = "".concat(this.baseUrl, "/api/Series/v2?PageNumber=").concat(currentPage, "&PageSize=").concat(pageSize);
                        return [4, (0, fetch_1.fetchApi)(url, {
                                method: 'POST',
                                headers: __assign({ Accept: 'text/plain', 'Content-Type': 'application/json' }, this.getAuthHeaders()),
                                body: JSON.stringify(body),
                            })];
                    case 2:
                        res = _a.sent();
                        return [4, res.text()];
                    case 3:
                        text = _a.sent();
                        data = [];
                        try {
                            data = JSON.parse(text);
                        }
                        catch (_b) {
                            console.warn('Kavita API: searchNovels - invalid JSON response');
                            return [2, []];
                        }
                        seriesResults = Array.isArray(data)
                            ? data
                            : (data === null || data === void 0 ? void 0 : data.series) || (data === null || data === void 0 ? void 0 : data.seriesResults) || (data === null || data === void 0 ? void 0 : data.seriesDtos) || [];
                        novels = seriesResults
                            .filter(Boolean)
                            .map(function (series) {
                            var _a, _b, _c;
                            var seriesId = (_a = series === null || series === void 0 ? void 0 : series.seriesId) !== null && _a !== void 0 ? _a : series === null || series === void 0 ? void 0 : series.id;
                            var name = (_c = (_b = series === null || series === void 0 ? void 0 : series.name) !== null && _b !== void 0 ? _b : series === null || series === void 0 ? void 0 : series.seriesName) !== null && _c !== void 0 ? _c : 'Unknown series';
                            var cover = seriesId
                                ? "".concat(_this.baseUrl, "/api/image/series-cover?seriesId=").concat(seriesId).concat(_this.apiKey ? "&apiKey=".concat(_this.apiKey) : '')
                                : defaultCover_1.defaultCover;
                            return {
                                name: name,
                                path: String(seriesId),
                                cover: cover,
                            };
                        });
                        return [2, novels];
                }
            });
        });
    };
    return KavitaApiPlugin;
}());
exports.default = new KavitaApiPlugin();
