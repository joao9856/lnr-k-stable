"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("@libs/fetch");
const filterInputs_1 = require("@libs/filterInputs");
const novelStatus_1 = require("@libs/novelStatus");
const defaultCover_1 = require("@libs/defaultCover");
const storage_1 = require("@libs/storage");
// ========== KAVITA FILTER INFRA ==========
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
class KavitaFilterBuilder {
    constructor(name) {
        this._combination = KavitaCombination.MatchAll;
        this._statements = [];
        this._sortField = KavitaSortField.SortName;
        this._sortAscending = true;
        this._limitTo = 0;
        this._name = name;
    }
    combination(type) {
        this._combination = type;
        return this;
    }
    sortBy(field, ascending = true) {
        this._sortField = field;
        this._sortAscending = ascending;
        return this;
    }
    limitTo(limit) {
        this._limitTo = limit;
        return this;
    }
    whereGenresInclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Genres,
            comparison: KavitaComparison.MustContains,
            value: ids.join(','),
        });
        return this;
    }
    whereGenresExclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Genres,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    }
    wherePublicationStatusInclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.PublicationStatus,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    }
    wherePublicationStatusExclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.PublicationStatus,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    }
    whereLibrariesInclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Libraries,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    }
    whereLibrariesExclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Libraries,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    }
    whereFormatsContains(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Formats,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    }
    whereReleaseYear(comparison, year) {
        const raw = year != null ? String(year).trim() : '';
        if (!raw)
            return this;
        this._statements.push({
            field: KavitaField.ReleaseYear,
            comparison,
            value: raw,
        });
        return this;
    }
    whereSeriesName(comparison, text) {
        const raw = (text !== null && text !== void 0 ? text : '').trim();
        if (!raw)
            return this;
        this._statements.push({
            field: KavitaField.SeriesName,
            comparison,
            value: raw,
        });
        return this;
    }
    whereWantToRead(value) {
        const normalized = typeof value === 'string' ? value.trim().toLowerCase() : value;
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
    }
    whereTagsInclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Tags,
            comparison: KavitaComparison.MustContains,
            value: ids.join(','),
        });
        return this;
    }
    whereTagsExclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.Tags,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    }
    whereCollectionTagsInclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.CollectionTags,
            comparison: KavitaComparison.Contains,
            value: ids.join(','),
        });
        return this;
    }
    whereCollectionTagsExclude(ids) {
        if (!ids || ids.length === 0)
            return this;
        this._statements.push({
            field: KavitaField.CollectionTags,
            comparison: KavitaComparison.NotContains,
            value: ids.join(','),
        });
        return this;
    }
    build() {
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
    }
}
// ========== PLUGIN ==========
class KavitaApiPlugin {
    constructor() {
        this.id = 'kavita-api-k';
        this.name = 'Kavita';
        this.icon = 'src/multi/kavita/icon.png';
        this.version = '0.0.17';
        this.site = storage_1.storage.get('url');
        this.apiKey = storage_1.storage.get('apiKey');
        this._filtersLoaded = false;
        this._presetFilterMap = new Map();
        // ---- Filters exposed to the LNReader UI ----
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
            // ---------- Limit ----------
            limitTo: {
                label: 'Limit results (0 = no limit)',
                type: filterInputs_1.FilterTypes.TextInput,
                value: '0',
            },
            // ---------- Libraries (loaded from /api/library/libraries) ----------
            libraries: {
                label: 'Libraries',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [], // populated dynamically
                value: {
                    include: [],
                    exclude: [],
                },
            },
            // ---------- Publication Status (loaded from /api/metadata/publication-status) ----------
            publicationStatus: {
                label: 'Publication status',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [], // populated dynamically
                value: {
                    include: [],
                    exclude: [],
                },
            },
            collectionTags: {
                label: 'Collections',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [], // populated dynamically
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
            // ---------- Series Name ----------
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
            // ---------- Release Year ----------
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
            // ---------- Genres (loaded from /api/metadata/genres) ----------
            genres: {
                label: 'Genres',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [], // populated dynamically
                value: {
                    include: [],
                    exclude: [],
                },
            },
            // ---------- Tags (loaded from /api/metadata/tags) ----------
            tags: {
                label: 'Tagy',
                type: filterInputs_1.FilterTypes.ExcludableCheckboxGroup,
                options: [], // populated dynamically
                value: {
                    include: [],
                    exclude: [],
                },
            },
        };
        this.imageRequestInit = undefined;
        this.webStorageUtilized = true;
        this.jwtToken = null;
        // ---------- BOOK / CHAPTER HELPERS ----------
        // LNReader uses ChapterItem.path as the persistent chapter identity.
        // Do not put Kavita's internal Book ID in that path: Kavita can assign
        // a new Book ID when a monolithic EPUB is re-indexed.
        this.chapterTargets = new Map();
        this.resolveUrl = (path, isNovel) => {
            if (path.startsWith('http'))
                return path;
            return `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
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
            // Formats – global toggles
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
    async ensureFilterOptionsLoaded() {
        if (this._filtersLoaded)
            return;
        if (typeof fetch_1.fetchApi !== 'function') {
            // The manifest build runs outside of LNReader and cannot hit the API.
            this._filtersLoaded = true;
            return;
        }
        await this.ensureToken();
        try {
            const presetFilters = await this.apiGet('/api/Filter');
            this._presetFilterMap.clear();
            const presetOptions = [
                {
                    label: 'None',
                    value: '',
                },
            ];
            for (const preset of presetFilters || []) {
                if (!preset || preset.id == null || typeof preset.filter !== 'string')
                    continue;
                const idStr = String(preset.id);
                this._presetFilterMap.set(idStr, preset.filter);
                presetOptions.push({
                    label: preset.name || `Filter ${idStr}`,
                    value: idStr,
                });
            }
            this._filters.presetFilter.options = presetOptions;
        }
        catch (e) {
            console.warn('Kavita: failed to load preset filters', e);
        }
        try {
            const tags = await this.apiGet('/api/metadata/tags');
            this._filters.tags.options = tags.map(t => ({
                label: t.title,
                value: String(t.id),
            }));
        }
        catch (e) {
            console.warn('Kavita: failed to load tags', e);
        }
        try {
            const genres = await this.apiGet('/api/metadata/genres');
            this._filters.genres.options = genres.map(g => ({
                label: g.title,
                value: String(g.id),
            }));
        }
        catch (e) {
            console.warn('Kavita: failed to load genres', e);
        }
        try {
            const statuses = await this.apiGet('/api/metadata/publication-status');
            this._filters.publicationStatus.options = statuses.map(s => ({
                label: s.title,
                value: String(s.value),
            }));
        }
        catch (e) {
            console.warn('Kavita: failed to load publication statuses', e);
        }
        try {
            const libraries = await this.apiGet('/api/library/libraries');
            this._filters.libraries.options = libraries.map(l => ({
                label: l.name,
                value: String(l.id),
            }));
        }
        catch (e) {
            console.warn('Kavita: failed to load libraries', e);
        }
        try {
            const collections = await this.apiGet('/api/collection?ownedOnly=false');
            this._filters.collectionTags.options = collections.map(c => ({
                label: c.title,
                value: String(c.id),
            }));
        }
        catch (e) {
            console.warn('Kavita: failed to load collections', e);
        }
        this._filtersLoaded = true;
    }
    async decodePresetFilter(encodedFilter) {
        var _a, _b;
        if (!encodedFilter)
            return null;
        await this.ensureToken();
        let text;
        try {
            const res = await (0, fetch_1.fetchApi)(`${this.baseUrl}/api/Filter/decode`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    ...this.getAuthHeaders(),
                },
                body: JSON.stringify({ encodedFilter }),
            });
            text = await res.text();
        }
        catch (e) {
            console.warn('Kavita: failed to decode preset filter (request)', e);
            return null;
        }
        try {
            const parsed = JSON.parse(text);
            const combinationValue = Number(parsed === null || parsed === void 0 ? void 0 : parsed.combination);
            const combination = combinationValue === KavitaCombination.MatchAny
                ? KavitaCombination.MatchAny
                : KavitaCombination.MatchAll;
            const statements = Array.isArray(parsed === null || parsed === void 0 ? void 0 : parsed.statements)
                ? parsed.statements
                    .map((stmt) => {
                    const field = Number(stmt === null || stmt === void 0 ? void 0 : stmt.field);
                    const comparison = Number(stmt === null || stmt === void 0 ? void 0 : stmt.comparison);
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
            const sortFieldRaw = Number((_a = parsed === null || parsed === void 0 ? void 0 : parsed.sortOptions) === null || _a === void 0 ? void 0 : _a.sortField);
            const sortAscendingRaw = (_b = parsed === null || parsed === void 0 ? void 0 : parsed.sortOptions) === null || _b === void 0 ? void 0 : _b.isAscending;
            const sortAscending = typeof sortAscendingRaw === 'boolean'
                ? sortAscendingRaw
                : typeof sortAscendingRaw === 'string'
                    ? sortAscendingRaw.toLowerCase() === 'true'
                    : true;
            const sortOptions = {
                sortField: Number.isNaN(sortFieldRaw)
                    ? KavitaSortField.SortName
                    : sortFieldRaw,
                isAscending: sortAscending,
            };
            const limitToRaw = Number(parsed === null || parsed === void 0 ? void 0 : parsed.limitTo);
            const id = typeof (parsed === null || parsed === void 0 ? void 0 : parsed.id) === 'number' && Number.isFinite(parsed.id)
                ? parsed.id
                : undefined;
            return {
                id,
                name: (parsed === null || parsed === void 0 ? void 0 : parsed.name) || 'Preset filter',
                combination,
                statements,
                sortOptions,
                limitTo: Number.isNaN(limitToRaw) ? 0 : limitToRaw,
            };
        }
        catch (e) {
            console.warn('Kavita: failed to decode preset filter (parse)', e, text);
            return null;
        }
    }
    get filters() {
        // Always kick off lazy loading so the options appear as soon as possible.
        void this.ensureFilterOptionsLoaded();
        return this._filters;
    }
    get baseUrl() {
        return this.site;
    }
    getBoolSetting(key, defaultVal) {
        const raw = storage_1.storage.get(key);
        if (typeof raw === 'boolean')
            return raw;
        if (typeof raw === 'string') {
            const v = raw.toLowerCase().trim();
            if (['true', '1', 'yes', 'on'].includes(v))
                return true;
            if (['false', '0', 'no', 'off'].includes(v))
                return false;
        }
        return defaultVal;
    }
    // ---------- AUTH / REQUEST HELPERY ----------
    async ensureToken() {
        if (this.jwtToken)
            return;
        if (typeof fetch_1.fetchApi !== 'function') {
            throw new Error('fetchApi is not available in this runtime');
        }
        const url = `${this.baseUrl}/api/Plugin/authenticate?apiKey=${encodeURIComponent(this.apiKey)}&pluginName=lnreader-kavita`;
        const res = await (0, fetch_1.fetchApi)(url, { method: 'POST' });
        const text = await res.text();
        let data;
        try {
            data = JSON.parse(text);
        }
        catch (_a) {
            throw new Error(`Authentication failed, non-JSON response: ${text}`);
        }
        if (!(data === null || data === void 0 ? void 0 : data.token)) {
            throw new Error('Authentication failed: token missing in response');
        }
        console.log(`Kavita API: Authenticated successfully - ${data.token}`);
        this.jwtToken = data.token;
    }
    getAuthHeaders() {
        return this.jwtToken ? { Authorization: `Bearer ${this.jwtToken}` } : {};
    }
    async apiGet(path) {
        await this.ensureToken();
        const url = path.startsWith('http')
            ? path
            : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
        const res = await (0, fetch_1.fetchApi)(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                ...this.getAuthHeaders(),
            },
        });
        const text = await res.text();
        try {
            return JSON.parse(text);
        }
        catch (_a) {
            return text;
        }
    }
    // ---------- POPULAR NOVELS WITH FILTER SUPPORT ----------
    async popularNovels(pageNo, { showLatestNovels, filters, }) {
        var _a, _b, _c;
        await this.ensureToken();
        await this.ensureFilterOptionsLoaded();
        const pageSize = 30;
        const presetFilterRaw = filters === null || filters === void 0 ? void 0 : filters.presetFilter;
        const presetFilterId = presetFilterRaw &&
            presetFilterRaw.type === filterInputs_1.FilterTypes.Picker &&
            typeof presetFilterRaw.value === 'string'
            ? presetFilterRaw.value.trim()
            : '';
        let presetFilterBody = null;
        if (presetFilterId) {
            const encodedPreset = this._presetFilterMap.get(presetFilterId);
            if (encodedPreset) {
                presetFilterBody = await this.decodePresetFilter(encodedPreset);
            }
            else {
                console.warn(`Kavita: preset filter ${presetFilterId} missing from cache`);
            }
        }
        const presetFilterSelected = Boolean(presetFilterId);
        let hasUserFilters = presetFilterSelected;
        let body;
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
            // Build a FilterV2 body that mirrors what the Kavita web UI would receive.
            // Helper to apply include/exclude arrays from the ExcludableCheckboxGroup filters.
            const applyIncludeExcludeFilter = (key, includeHandler, excludeHandler) => {
                const raw = filters === null || filters === void 0 ? void 0 : filters[key];
                if (!raw ||
                    raw.type !== filterInputs_1.FilterTypes.ExcludableCheckboxGroup ||
                    typeof raw !== 'object') {
                    return false;
                }
                const value = (raw.value || {});
                let updated = false;
                const includeIds = Array.isArray(value.include) ? value.include : [];
                if (includeIds.length > 0) {
                    includeHandler(includeIds);
                    updated = true;
                }
                const excludeIds = Array.isArray(value.exclude) ? value.exclude : [];
                if (excludeIds.length > 0) {
                    excludeHandler(excludeIds);
                    updated = true;
                }
                return updated;
            };
            // 1) read combination from Picker
            let combination = KavitaCombination.MatchAll;
            const combinationRaw = filters === null || filters === void 0 ? void 0 : filters.filterCombination;
            if (combinationRaw &&
                combinationRaw.type === filterInputs_1.FilterTypes.Picker &&
                typeof combinationRaw.value === 'string') {
                const parsed = Number(combinationRaw.value);
                if (parsed === KavitaCombination.MatchAny ||
                    parsed === KavitaCombination.MatchAll) {
                    combination = parsed;
                }
            }
            // Track whether the user actually set any filter (genres/status/libraries/year/name/tags)
            hasUserFilters = false;
            // --- Result limit ---
            let limitTo = 0;
            const limitToRaw = filters === null || filters === void 0 ? void 0 : filters.limitTo;
            if (limitToRaw && limitToRaw.type === filterInputs_1.FilterTypes.TextInput) {
                const raw = String((_a = limitToRaw.value) !== null && _a !== void 0 ? _a : '').trim();
                if (raw) {
                    const parsed = Number(raw);
                    if (Number.isFinite(parsed) && parsed >= 0) {
                        limitTo = parsed;
                        if (parsed > 0)
                            hasUserFilters = true;
                    }
                }
            }
            // --- Sorting (Picker + Picker) ---
            let sortField = KavitaSortField.SortName;
            let sortAscending = true;
            const sortFieldRaw = filters === null || filters === void 0 ? void 0 : filters.sortField;
            if (sortFieldRaw &&
                sortFieldRaw.type === filterInputs_1.FilterTypes.Picker &&
                typeof sortFieldRaw.value === 'string') {
                const parsed = Number(sortFieldRaw.value);
                if (!Number.isNaN(parsed)) {
                    sortField = parsed;
                }
            }
            const sortDirectionRaw = filters === null || filters === void 0 ? void 0 : filters.sortDirection;
            if (sortDirectionRaw &&
                sortDirectionRaw.type === filterInputs_1.FilterTypes.Picker &&
                typeof sortDirectionRaw.value === 'string') {
                sortAscending = sortDirectionRaw.value.toLowerCase() === 'true';
            }
            if (sortField !== KavitaSortField.SortName || sortAscending !== true) {
                hasUserFilters = true;
            }
            // 2) builder pro FilterV2Dto
            const fb = new KavitaFilterBuilder('LNReader: Recently Added')
                .combination(combination)
                .sortBy(sortField, sortAscending)
                .limitTo(limitTo);
            if (applyIncludeExcludeFilter('genres', ids => fb.whereGenresInclude(ids), ids => fb.whereGenresExclude(ids))) {
                hasUserFilters = true;
            }
            if (applyIncludeExcludeFilter('publicationStatus', ids => fb.wherePublicationStatusInclude(ids), ids => fb.wherePublicationStatusExclude(ids))) {
                hasUserFilters = true;
            }
            if (applyIncludeExcludeFilter('libraries', ids => fb.whereLibrariesInclude(ids), ids => fb.whereLibrariesExclude(ids))) {
                hasUserFilters = true;
            }
            // --- Release Year (TextInput + Picker) ---
            const releaseYearValueRaw = filters === null || filters === void 0 ? void 0 : filters.releaseYearValue;
            const releaseYearComparisonRaw = filters === null || filters === void 0 ? void 0 : filters.releaseYearComparison;
            if (releaseYearValueRaw &&
                releaseYearValueRaw.type === filterInputs_1.FilterTypes.TextInput) {
                const rawYear = ((_b = releaseYearValueRaw.value) !== null && _b !== void 0 ? _b : '').trim();
                if (rawYear) {
                    let comparison = KavitaComparison.Equal;
                    if (releaseYearComparisonRaw &&
                        releaseYearComparisonRaw.type === filterInputs_1.FilterTypes.Picker &&
                        typeof releaseYearComparisonRaw.value === 'string') {
                        const parsed = Number(releaseYearComparisonRaw.value);
                        if (!Number.isNaN(parsed)) {
                            comparison = parsed;
                        }
                    }
                    fb.whereReleaseYear(comparison, rawYear);
                    hasUserFilters = true;
                }
            }
            // --- Series Name (TextInput + Picker) ---
            const seriesNameValueRaw = filters === null || filters === void 0 ? void 0 : filters.seriesNameValue;
            const seriesNameComparisonRaw = filters === null || filters === void 0 ? void 0 : filters.seriesNameComparison;
            if (seriesNameValueRaw &&
                seriesNameValueRaw.type === filterInputs_1.FilterTypes.TextInput) {
                const rawName = ((_c = seriesNameValueRaw.value) !== null && _c !== void 0 ? _c : '').trim();
                if (rawName) {
                    let comparison = KavitaComparison.Matches;
                    if (seriesNameComparisonRaw &&
                        seriesNameComparisonRaw.type === filterInputs_1.FilterTypes.Picker &&
                        typeof seriesNameComparisonRaw.value === 'string') {
                        const parsed = Number(seriesNameComparisonRaw.value);
                        if (!Number.isNaN(parsed)) {
                            comparison = parsed;
                        }
                    }
                    fb.whereSeriesName(comparison, rawName);
                    hasUserFilters = true;
                }
            }
            if (applyIncludeExcludeFilter('tags', ids => fb.whereTagsInclude(ids), ids => fb.whereTagsExclude(ids))) {
                hasUserFilters = true;
            }
            if (applyIncludeExcludeFilter('collectionTags', ids => fb.whereCollectionTagsInclude(ids), ids => fb.whereCollectionTagsExclude(ids))) {
                hasUserFilters = true;
            }
            // --- Want To Read (Picker) ---
            const wantToReadRaw = filters === null || filters === void 0 ? void 0 : filters.wantToRead;
            if (wantToReadRaw &&
                wantToReadRaw.type === filterInputs_1.FilterTypes.Picker &&
                typeof wantToReadRaw.value === 'string') {
                const v = wantToReadRaw.value.trim().toLowerCase();
                if (v === 'true' || v === 'false') {
                    fb.whereWantToRead(v);
                    hasUserFilters = true;
                }
            }
            // --- Formats sourced from pluginSettings (Switch) ---
            // These are global toggles, not per-request filters, so they do not flip hasUserFilters.
            const formatImageOn = this.getBoolSetting('formatImage', false);
            const formatArchiveOn = this.getBoolSetting('formatArchive', false);
            const formatEpubOn = this.getBoolSetting('formatEpub', false);
            const formatPdfOn = this.getBoolSetting('formatPdf', false);
            const selectedFormatIds = [];
            // Map the boolean switches to the numeric identifiers used by Kavita.
            if (formatImageOn)
                selectedFormatIds.push('0'); // Image
            if (formatArchiveOn)
                selectedFormatIds.push('1'); // Archive
            if (formatEpubOn)
                selectedFormatIds.push('3'); // EPUB
            if (formatPdfOn)
                selectedFormatIds.push('4'); // PDF
            if (selectedFormatIds.length > 0) {
                fb.whereFormatsContains(selectedFormatIds);
                // hasUserFilters stays unchanged because this is a global preference
            }
            body = fb.build();
        }
        console.log('Kavita API: popularNovels', {
            pageNo,
            showLatestNovels,
            hasUserFilters,
            usingPresetFilter: Boolean(presetFilterBody),
            presetFilterSelected,
        });
        // When the "latest" toggle is on and no filters were supplied, hit the dedicated endpoint.
        const useLatestEndpoint = showLatestNovels && !hasUserFilters;
        const endpoint = useLatestEndpoint
            ? '/api/Series/recently-added-v2'
            : '/api/Series/v2';
        const url = `${this.baseUrl}${endpoint}?PageNumber=${pageNo}&PageSize=${pageSize}`;
        const res = await (0, fetch_1.fetchApi)(url, {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
            body: JSON.stringify(body),
        });
        const text = await res.text();
        let data = [];
        try {
            data = JSON.parse(text);
        }
        catch (_d) {
            console.warn('Kavita API: popularNovels - invalid JSON response');
            return [];
        }
        const novels = (data || []).map((series) => {
            var _a, _b, _c;
            const seriesId = (_a = series.id) !== null && _a !== void 0 ? _a : series.seriesId;
            const name = (_c = (_b = series.name) !== null && _b !== void 0 ? _b : series.seriesName) !== null && _c !== void 0 ? _c : 'Unknown series';
            const cover = seriesId
                ? `${this.baseUrl}/api/image/series-cover?seriesId=${seriesId}${this.apiKey ? `&apiKey=${this.apiKey}` : ''}`
                : defaultCover_1.defaultCover;
            return {
                name,
                path: String(seriesId),
                cover,
            };
        });
        return novels;
    }
    // Stable chapter identity is anchored only to the Kavita Series ID and the
    // chapter's ordinal position within the series. The Kavita Book ID is
    // deliberately NOT part of the persisted path because Kavita can assign a
    // different Book ID after re-indexing an updated monolithic EPUB.
    //
    // Example:
    //   stable3:<seriesId>:1
    //   stable3:<seriesId>:2
    //   ...
    //
    // When the EPUB is updated, the plugin resolves that ordinal against the
    // current book/EPUB in the same series. Existing ordinals therefore remain
    // the same LNReader chapters, while newly appended ordinals appear as new
    // chapters. If the chapter content changed, LNReader requests the same
    // stable path and receives the current content for that chapter.
    makeStableChapterPath(seriesId, chapterIndex) {
        return `stable3:${seriesId}:${chapterIndex}`;
    }
    parseStableChapterPath(chapterPath) {
        const match = /^stable3:(\d+):(\d+)$/.exec(chapterPath);
        if (!match)
            return null;
        const seriesId = Number(match[1]);
        const chapterIndex = Number(match[2]);
        if (!Number.isFinite(seriesId) || !Number.isFinite(chapterIndex)) {
            return null;
        }
        if (seriesId <= 0 || chapterIndex <= 0)
            return null;
        return { seriesId, chapterIndex };
    }
    async resolveStableChapterTarget(seriesId, chapterIndex, headers) {
        var _a, _b, _c, _d;
        const stablePath = this.makeStableChapterPath(seriesId, chapterIndex);
        const cached = this.chapterTargets.get(stablePath);
        if (cached)
            return cached;
        const volumesRes = await (0, fetch_1.fetchApi)(`${this.site}/api/Series/volumes?seriesId=${seriesId}`, { headers });
        const volumes = await volumesRes.json();
        // Walk the current series in exactly the same volume/book order used by
        // parseNovel(), and count pages as LNReader chapters. This intentionally
        // ignores Kavita Book IDs as persistent identity.
        let currentIndex = 0;
        for (const vol of Array.isArray(volumes) ? volumes : []) {
            for (const ch of (_a = vol.chapters) !== null && _a !== void 0 ? _a : []) {
                if (!(ch === null || ch === void 0 ? void 0 : ch.id))
                    continue;
                const bookInfo = await (0, fetch_1.fetchApi)(`${this.site}/api/Book/${ch.id}/book-info`, { headers }).then(res => res.json());
                const totalPages = Number((_d = (_c = (_b = bookInfo.pages) !== null && _b !== void 0 ? _b : ch.pages) !== null && _c !== void 0 ? _c : vol.pages) !== null && _d !== void 0 ? _d : 0);
                if (!Number.isFinite(totalPages) || totalPages <= 0)
                    continue;
                if (chapterIndex > currentIndex + totalPages) {
                    currentIndex += totalPages;
                    continue;
                }
                const page = chapterIndex - currentIndex - 1;
                if (page < 0 || page >= totalPages)
                    return null;
                const target = { chapterId: Number(ch.id), page };
                this.chapterTargets.set(stablePath, target);
                return target;
            }
        }
        return null;
    }
    // Backward-compatible resolver for old stable2 paths. New chapters emitted
    // by this version use stable3 and do not depend on the legacy book key.
    async resolveLegacyStable2ChapterTarget(seriesId, bookKey, page, headers) {
        var _a, _b, _c, _d, _e, _f;
        const volumesRes = await (0, fetch_1.fetchApi)(`${this.site}/api/Series/volumes?seriesId=${seriesId}`, { headers });
        const volumes = await volumesRes.json();
        for (const vol of Array.isArray(volumes) ? volumes : []) {
            for (const ch of (_a = vol.chapters) !== null && _a !== void 0 ? _a : []) {
                if (!(ch === null || ch === void 0 ? void 0 : ch.id))
                    continue;
                const bookInfo = await (0, fetch_1.fetchApi)(`${this.site}/api/Book/${ch.id}/book-info`, { headers }).then(res => res.json());
                const title = (_d = (_c = (_b = bookInfo === null || bookInfo === void 0 ? void 0 : bookInfo.bookTitle) !== null && _b !== void 0 ? _b : ch === null || ch === void 0 ? void 0 : ch.titleName) !== null && _c !== void 0 ? _c : vol === null || vol === void 0 ? void 0 : vol.name) !== null && _d !== void 0 ? _d : vol === null || vol === void 0 ? void 0 : vol.title;
                const safeTitle = title !== null && title !== void 0 ? title : 'book';
                const volumeNumber = (_f = (_e = bookInfo === null || bookInfo === void 0 ? void 0 : bookInfo.volumeNumber) !== null && _e !== void 0 ? _e : vol === null || vol === void 0 ? void 0 : vol.number) !== null && _f !== void 0 ? _f : '';
                const currentBookKey = `${String(safeTitle)}\u001f${String(volumeNumber)}`;
                if (currentBookKey !== bookKey)
                    continue;
                const totalPages = Number((_f = (_e = (_d = bookInfo.pages) !== null && _d !== void 0 ? _d : ch.pages) !== null && _e !== void 0 ? _e : vol.pages) !== null && _f !== void 0 ? _f : 0);
                if (page < 0 || page >= totalPages)
                    return null;
                return { chapterId: Number(ch.id), page };
            }
        }
        return null;
    }
    flattenBookChapters(toc) {
        const flat = [];
        const walk = (item) => {
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
        flat.sort((a, b) => a.page - b.page);
        return flat;
    }
    getTitleForPage(flatToc, page) {
        let current = null;
        for (const item of flatToc) {
            if (item.page <= page) {
                current = item.title || null;
            }
            else {
                break;
            }
        }
        return current;
    }
    // ---------- PARSE NOVEL ----------
    async parseNovel(novelPath) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        await this.ensureToken();
        const headers = {
            Accept: 'application/json',
            ...this.getAuthHeaders(),
        };
        const seriesId = Number(novelPath.startsWith('/api/Series/')
            ? novelPath.split('/').pop()
            : novelPath);
        const [seriesRes, metaRes, volumesRes] = await Promise.all([
            // Pull the core series objects in parallel to minimize round-trips.
            (0, fetch_1.fetchApi)(`${this.site}/api/Series/${seriesId}`, { headers }),
            (0, fetch_1.fetchApi)(`${this.site}/api/Series/metadata?seriesId=${seriesId}`, {
                headers,
            }),
            (0, fetch_1.fetchApi)(`${this.site}/api/Series/volumes?seriesId=${seriesId}`, {
                headers,
            }),
        ]);
        const series = await seriesRes.json();
        const metadata = await metaRes.json();
        const volumes = await volumesRes.json();
        const novel = {
            path: String(seriesId),
            name: (_b = (_a = series.name) !== null && _a !== void 0 ? _a : metadata.title) !== null && _b !== void 0 ? _b : 'Untitled',
            cover: `${this.site}/api/image/series-cover?seriesId=${seriesId}${this.apiKey ? `&apiKey=${this.apiKey}` : ''}`,
            chapters: [],
        };
        // ---------- author ----------
        if (Array.isArray(metadata.people) && metadata.people.length) {
            const writers = metadata.people.filter((p) => String(p.role || '')
                .toLowerCase()
                .includes('writer'));
            if (writers.length) {
                novel.author = writers.map((w) => w.name).join(', ');
            }
        }
        else {
            const firstVolume = Array.isArray(volumes) ? volumes[0] : null;
            const firstChapter = firstVolume && Array.isArray(firstVolume.chapters)
                ? firstVolume.chapters[0]
                : null;
            if (firstChapter && Array.isArray(firstChapter.writers)) {
                novel.author = firstChapter.writers.map((w) => w.name).join(', ');
            }
        }
        // ---------- status ----------
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
        // ---------- genres ----------
        if (Array.isArray(metadata.genres) && metadata.genres.length) {
            novel.genres = metadata.genres
                .map((g) => { var _a, _b, _c; return (_c = (_b = (_a = g.title) !== null && _a !== void 0 ? _a : g.name) !== null && _b !== void 0 ? _b : g.label) !== null && _c !== void 0 ? _c : g.value; })
                .filter(Boolean)
                .join(', ');
        }
        else {
            const genreSet = new Set();
            for (const vol of volumes) {
                for (const ch of (_c = vol.chapters) !== null && _c !== void 0 ? _c : []) {
                    for (const g of (_d = ch.genres) !== null && _d !== void 0 ? _d : []) {
                        const title = (_e = g.title) !== null && _e !== void 0 ? _e : g.name;
                        if (title)
                            genreSet.add(title);
                    }
                }
            }
            if (genreSet.size) {
                novel.genres = Array.from(genreSet).join(', ');
            }
        }
        // ---------- summary ----------
        novel.summary =
            (_j = (_h = (_g = (_f = metadata.summary) !== null && _f !== void 0 ? _f : metadata.description) !== null && _g !== void 0 ? _g : series.summary) !== null && _h !== void 0 ? _h : series.description) !== null && _j !== void 0 ? _j : undefined;
        // ---------- rating ----------
        const rating = (_m = (_l = (_k = metadata.userRating) !== null && _k !== void 0 ? _k : metadata.averageRating) !== null && _l !== void 0 ? _l : series.userRating) !== null && _m !== void 0 ? _m : series.averageRating;
        if (typeof rating === 'number')
            novel.rating = rating;
        const status = (_q = (_p = (_o = metadata.seriesStatus) !== null && _o !== void 0 ? _o : metadata.status) !== null && _p !== void 0 ? _p : series.status) !== null && _q !== void 0 ? _q : series.seriesStatus;
        if (status)
            novel.status = String(status);
        // ---------- chapters: treat every page as an individual chapter ----------
        const chapters = [];
        let globalIndex = 1;
        for (const vol of volumes) {
            const volChapters = (_r = vol.chapters) !== null && _r !== void 0 ? _r : [];
            if (!volChapters.length)
                continue;
            // Each page inside every book becomes one LNReader chapter entry.
            for (const ch of volChapters) {
                const chapterId = ch.id;
                if (!chapterId)
                    continue;
                const [bookInfo, tocJson] = await Promise.all([
                    (0, fetch_1.fetchApi)(`${this.site}/api/Book/${chapterId}/book-info`, {
                        headers,
                    }).then(res => res.json()),
                    (0, fetch_1.fetchApi)(`${this.site}/api/Book/${chapterId}/chapters`, {
                        headers,
                    }).then(res => res.json()),
                ]);
                const totalPages = (_u = (_t = (_s = bookInfo.pages) !== null && _s !== void 0 ? _s : ch.pages) !== null && _t !== void 0 ? _t : vol.pages) !== null && _u !== void 0 ? _u : 0;
                if (!totalPages)
                    continue;
                const flatToc = this.flattenBookChapters(tocJson);
                for (let page = 0; page < totalPages; page++) {
                    const tocTitle = this.getTitleForPage(flatToc, page);
                    // Use Kavita's TOC title, but normalize known duplicated numbering
                    // that Kavita can return in page-derived/book-derived titles.
                    let chapterName = (tocTitle || `Chapter ${page + 1}`).trim();
                    // Remove a leading page-count prefix such as:
                    //   1 / 512 - Chapter 1: Title
                    // while leaving the actual chapter title intact.
                    chapterName = chapterName.replace(/^\s*\d+\s*\/\s*\d+\s*[-–—:]\s*/, '').trim();
                    // Remove repeated chapter labels on the same chapter only, e.g.:
                    //   Chapter 1: Chapter 1: Title
                    //   Chapter 1 - Chapter 1 - Title
                    // Stop as soon as the repeated label is gone so unrelated titles
                    // are not altered.
                    const repeatedChapterLabel = /^(Chapter\s+\d+(?:\.\d+)?\s*[:：\-–—])\s*/i;
                    while (repeatedChapterLabel.test(chapterName)) {
                        const match = chapterName.match(repeatedChapterLabel);
                        if (!match)
                            break;
                        const label = match[1];
                        const rest = chapterName.slice(match[0].length).trim();
                        const normalizedLabel = label.replace(/\s*[:：\-–—]\s*$/, '').trim().toLowerCase();
                        const restMatch = rest.match(/^(Chapter\s+\d+(?:\.\d+)?)(?:\s*[:：\-–—])\s*(.*)$/i);
                        if (!restMatch || restMatch[1].trim().toLowerCase() !== normalizedLabel)
                            break;
                        chapterName = `Chapter ${restMatch[1].replace(/^Chapter\s+/i, '')} - ${restMatch[2].trim()}`.trim();
                    }
                    if (!chapterName) {
                        chapterName = `Chapter ${page + 1}`;
                    }
                    const chapterIndex = globalIndex;
                    const stablePath = this.makeStableChapterPath(seriesId, chapterIndex);
                    this.chapterTargets.set(stablePath, {
                        chapterId: Number(chapterId),
                        page,
                    });
                    chapters.push({
                        name: chapterName,
                        path: stablePath,
                        chapterNumber: globalIndex++,
                        releaseTime: (_x = (_w = (_v = ch.releaseDate) !== null && _v !== void 0 ? _v : ch.created) !== null && _w !== void 0 ? _w : ch.createdUtc) !== null && _x !== void 0 ? _x : null,
                    });
                }
            }
        }
        novel.chapters = chapters;
        return novel;
    }
    // ---------- PARSE CHAPTER ----------
    async parseChapter(chapterPath) {
        await this.ensureToken();
        const headers = {
            Accept: 'text/plain,application/json',
            ...this.getAuthHeaders(),
        };
        const stable = this.parseStableChapterPath(chapterPath);
        let target = null;
        if (stable) {
            target = await this.resolveStableChapterTarget(stable.seriesId, stable.chapterIndex, headers);
            if (!target) {
                throw new Error(`Could not resolve stable chapterPath: ${chapterPath}`);
            }
        }
        else {
            // Backwards compatibility for paths created by older plugin versions.
            const legacyMatch = /^stable2:(\d+):([^:]+):(\d+)$/.exec(chapterPath);
            if (legacyMatch) {
                let bookKey;
                try {
                    bookKey = decodeURIComponent(legacyMatch[2]);
                }
                catch (_a) {
                    throw new Error(`Invalid legacy stable chapterPath: ${chapterPath}`);
                }
                target = await this.resolveLegacyStable2ChapterTarget(Number(legacyMatch[1]), bookKey, Number(legacyMatch[3]), headers);
                if (!target) {
                    throw new Error(`Could not resolve legacy stable chapterPath: ${chapterPath}`);
                }
            }
            else {
                const [chapterIdStr, pageStr] = chapterPath.split(':');
                const chapterId = Number(chapterIdStr);
                const page = Number(pageStr || '0');
                if (!chapterId || Number.isNaN(chapterId)) {
                    throw new Error(`Invalid chapterPath: ${chapterPath}`);
                }
                target = { chapterId, page };
            }
        }
        const res = await (0, fetch_1.fetchApi)(`${this.site}/api/Book/${target.chapterId}/book-page?page=${target.page}`, { headers });
        return await res.text();
    }
    // ---------- SEARCH ----------
    async searchNovels(searchTerm, pageNo) {
        const query = searchTerm.trim();
        if (!query) {
            return [];
        }
        await this.ensureToken();
        const pageSize = 12;
        const currentPage = Math.max(pageNo || 1, 1);
        const fb = new KavitaFilterBuilder('LNReader: Search')
            .combination(KavitaCombination.MatchAll)
            .sortBy(KavitaSortField.SortName, true)
            .limitTo(0)
            .whereSeriesName(KavitaComparison.Matches, query);
        const formatImageOn = this.getBoolSetting('formatImage', false);
        const formatArchiveOn = this.getBoolSetting('formatArchive', false);
        const formatEpubOn = this.getBoolSetting('formatEpub', true);
        const formatPdfOn = this.getBoolSetting('formatPdf', true);
        const selectedFormatIds = [];
        if (formatImageOn)
            selectedFormatIds.push('0'); // Image
        if (formatArchiveOn)
            selectedFormatIds.push('1'); // Archive
        if (formatEpubOn)
            selectedFormatIds.push('3'); // EPUB
        if (formatPdfOn)
            selectedFormatIds.push('4'); // PDF
        if (selectedFormatIds.length > 0) {
            fb.whereFormatsContains(selectedFormatIds);
        }
        const body = fb.build();
        const url = `${this.baseUrl}/api/Series/v2?PageNumber=${currentPage}&PageSize=${pageSize}`;
        const res = await (0, fetch_1.fetchApi)(url, {
            method: 'POST',
            headers: {
                Accept: 'text/plain',
                'Content-Type': 'application/json',
                ...this.getAuthHeaders(),
            },
            body: JSON.stringify(body),
        });
        const text = await res.text();
        let data = [];
        try {
            data = JSON.parse(text);
        }
        catch (_a) {
            console.warn('Kavita API: searchNovels - invalid JSON response');
            return [];
        }
        const seriesResults = Array.isArray(data)
            ? data
            : (data === null || data === void 0 ? void 0 : data.series) || (data === null || data === void 0 ? void 0 : data.seriesResults) || (data === null || data === void 0 ? void 0 : data.seriesDtos) || [];
        const novels = seriesResults
            .filter(Boolean)
            .map((series) => {
            var _a, _b, _c;
            const seriesId = (_a = series === null || series === void 0 ? void 0 : series.seriesId) !== null && _a !== void 0 ? _a : series === null || series === void 0 ? void 0 : series.id;
            const name = (_c = (_b = series === null || series === void 0 ? void 0 : series.name) !== null && _b !== void 0 ? _b : series === null || series === void 0 ? void 0 : series.seriesName) !== null && _c !== void 0 ? _c : 'Unknown series';
            const cover = seriesId
                ? `${this.baseUrl}/api/image/series-cover?seriesId=${seriesId}${this.apiKey ? `&apiKey=${this.apiKey}` : ''}`
                : defaultCover_1.defaultCover;
            return {
                name,
                path: String(seriesId),
                cover,
            };
        });
        return novels;
    }
}
exports.default = new KavitaApiPlugin();
