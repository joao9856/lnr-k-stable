import { fetchApi } from '@libs/fetch';
import { Plugin } from '@/types/plugin';
import { Filters, FilterTypes, FilterOption } from '@libs/filterInputs';
import { NovelStatus } from '@libs/novelStatus';
import { defaultCover } from '@libs/defaultCover';
import { storage } from '@libs/storage';

// ========== KAVITA FILTER INFRA ==========

enum KavitaComparison {
  Equal = 0,
  GreaterThan = 1,
  GreaterThanEqual = 2,
  LessThan = 3,
  LessThanEqual = 4,
  Contains = 5,
  MustContains = 6,
  Matches = 7,
  NotContains = 8,
  NotEqual = 9,
  BeginsWith = 10,
  EndsWith = 11,
  IsBefore = 12,
  IsAfter = 13,
  IsInLast = 14,
  IsNotInLast = 15,
  IsEmpty = 16,
}

enum KavitaField {
  Summary = 0,
  SeriesName = 1,
  PublicationStatus = 2,
  Languages = 3,
  AgeRating = 4,
  UserRating = 5,
  Tags = 6,
  CollectionTags = 7,
  Translators = 8,
  Characters = 9,
  Publisher = 10,
  Editor = 11,
  Artist = 12,
  Letterer = 13,
  Colorist = 14,
  Inker = 15,
  Penciller = 16,
  Writers = 17,
  Genres = 18,
  Libraries = 19,
  ReadingProgress = 20,
  Formats = 21,
  ReleaseYear = 22,
  ReadTime = 23,
  Path = 24,
  FilePath = 25,
  WantToRead = 26,
  ReadDate = 27,
  AverageRating = 28,
  Imprint = 29,
  Team = 30,
  Location = 31,
  LastRead = 32,
  FileSize = 33,
}

enum KavitaCombination {
  MatchAny = 0,
  MatchAll = 1,
}

enum KavitaSortField {
  SortName = 1,
  Created = 2,
  LastModified = 3,
  ItemAdded = 4,
  TimeToRead = 5,
  ReleaseYear = 6,
  LastRead = 7,
  AverageRating = 8,
  Random = 9,
}

type KavitaFilterStatementDto = {
  field: KavitaField;
  comparison: KavitaComparison;
  value?: string | null;
};

type KavitaFilterV2Dto = {
  id?: number;
  name: string;
  combination: KavitaCombination;
  statements: KavitaFilterStatementDto[];
  sortOptions: {
    sortField: number;
    isAscending: boolean;
  };
  limitTo: number;
};

class KavitaFilterBuilder {
  private _name: string;
  private _combination: KavitaCombination = KavitaCombination.MatchAll;
  private _statements: KavitaFilterStatementDto[] = [];
  private _sortField: number = KavitaSortField.SortName;
  private _sortAscending = true;
  private _limitTo = 0;

  constructor(name: string) {
    this._name = name;
  }

  combination(type: KavitaCombination) {
    this._combination = type;
    return this;
  }

  sortBy(field: number, ascending = true) {
    this._sortField = field;
    this._sortAscending = ascending;
    return this;
  }

  limitTo(limit: number) {
    this._limitTo = limit;
    return this;
  }

  whereGenresInclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Genres,
      comparison: KavitaComparison.MustContains,
      value: ids.join(','),
    });
    return this;
  }

  whereGenresExclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Genres,
      comparison: KavitaComparison.NotContains,
      value: ids.join(','),
    });
    return this;
  }

  wherePublicationStatusInclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.PublicationStatus,
      comparison: KavitaComparison.Contains,
      value: ids.join(','),
    });
    return this;
  }

  wherePublicationStatusExclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.PublicationStatus,
      comparison: KavitaComparison.NotContains,
      value: ids.join(','),
    });
    return this;
  }

  whereLibrariesInclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Libraries,
      comparison: KavitaComparison.Contains,
      value: ids.join(','),
    });
    return this;
  }

  whereLibrariesExclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Libraries,
      comparison: KavitaComparison.NotContains,
      value: ids.join(','),
    });
    return this;
  }

  whereFormatsContains(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Formats,
      comparison: KavitaComparison.Contains,
      value: ids.join(','),
    });
    return this;
  }

  whereReleaseYear(comparison: KavitaComparison, year?: string | number) {
    const raw = year != null ? String(year).trim() : '';
    if (!raw) return this;

    this._statements.push({
      field: KavitaField.ReleaseYear,
      comparison,
      value: raw,
    });
    return this;
  }

  whereSeriesName(comparison: KavitaComparison, text?: string) {
    const raw = (text ?? '').trim();
    if (!raw) return this;

    this._statements.push({
      field: KavitaField.SeriesName,
      comparison,
      value: raw,
    });
    return this;
  }

  whereWantToRead(value: boolean | string) {
    const normalized =
      typeof value === 'string' ? value.trim().toLowerCase() : value;

    if (normalized === true || normalized === false) {
      this._statements.push({
        field: KavitaField.WantToRead,
        comparison: KavitaComparison.Equal,
        value: normalized ? 'true' : 'false',
      });
    } else if (normalized === 'true' || normalized === 'false') {
      this._statements.push({
        field: KavitaField.WantToRead,
        comparison: KavitaComparison.Equal,
        value: normalized,
      });
    }

    return this;
  }

  whereTagsInclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Tags,
      comparison: KavitaComparison.MustContains,
      value: ids.join(','),
    });
    return this;
  }

  whereTagsExclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.Tags,
      comparison: KavitaComparison.NotContains,
      value: ids.join(','),
    });
    return this;
  }

  whereCollectionTagsInclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.CollectionTags,
      comparison: KavitaComparison.Contains,
      value: ids.join(','),
    });
    return this;
  }

  whereCollectionTagsExclude(ids: string[]) {
    if (!ids || ids.length === 0) return this;
    this._statements.push({
      field: KavitaField.CollectionTags,
      comparison: KavitaComparison.NotContains,
      value: ids.join(','),
    });
    return this;
  }

  build(): KavitaFilterV2Dto {
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

class KavitaApiPlugin implements Plugin.PluginBase {
  id = 'kavita-api';
  name = 'Kavita';
  icon = 'src/multi/kavita/icon.png';
  version = '0.0.13';
  site = storage.get('url');
  apiKey = storage.get('apiKey');

  private _filtersLoaded = false;
  private _presetFilterMap = new Map<string, string>();

  private async ensureFilterOptionsLoaded() {
    if (this._filtersLoaded) return;
    if (typeof fetchApi !== 'function') {
      // The manifest build runs outside of LNReader and cannot hit the API.
      this._filtersLoaded = true;
      return;
    }

    await this.ensureToken();

    try {
      const presetFilters = await this.apiGet<any[]>('/api/Filter');

      this._presetFilterMap.clear();

      const presetOptions: FilterOption[] = [
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

      (this._filters.presetFilter as any).options = presetOptions;
    } catch (e) {
      console.warn('Kavita: failed to load preset filters', e);
    }

    try {
      const tags = await this.apiGet<any[]>('/api/metadata/tags');
      (this._filters.tags as any).options = tags.map(t => ({
        label: t.title,
        value: String(t.id),
      }));
    } catch (e) {
      console.warn('Kavita: failed to load tags', e);
    }

    try {
      const genres = await this.apiGet<any[]>('/api/metadata/genres');
      (this._filters.genres as any).options = genres.map(g => ({
        label: g.title,
        value: String(g.id),
      }));
    } catch (e) {
      console.warn('Kavita: failed to load genres', e);
    }

    try {
      const statuses = await this.apiGet<any[]>(
        '/api/metadata/publication-status',
      );
      (this._filters.publicationStatus as any).options = statuses.map(s => ({
        label: s.title,
        value: String(s.value),
      }));
    } catch (e) {
      console.warn('Kavita: failed to load publication statuses', e);
    }

    try {
      const libraries = await this.apiGet<any[]>('/api/library/libraries');
      (this._filters.libraries as any).options = libraries.map(l => ({
        label: l.name,
        value: String(l.id),
      }));
    } catch (e) {
      console.warn('Kavita: failed to load libraries', e);
    }

    try {
      const collections = await this.apiGet<any[]>(
        '/api/collection?ownedOnly=false',
      );
      (this._filters.collectionTags as any).options = collections.map(c => ({
        label: c.title,
        value: String(c.id),
      }));
    } catch (e) {
      console.warn('Kavita: failed to load collections', e);
    }

    this._filtersLoaded = true;
  }

  private async decodePresetFilter(
    encodedFilter: string,
  ): Promise<KavitaFilterV2Dto | null> {
    if (!encodedFilter) return null;

    await this.ensureToken();

    let text: string | undefined;
    try {
      const res = await fetchApi(`${this.baseUrl}/api/Filter/decode`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...this.getAuthHeaders(),
        },
        body: JSON.stringify({ encodedFilter }),
      });

      text = await res.text();
    } catch (e) {
      console.warn('Kavita: failed to decode preset filter (request)', e);
      return null;
    }

    try {
      const parsed = JSON.parse(text as string) as any;

      const combinationValue = Number(parsed?.combination);
      const combination =
        combinationValue === KavitaCombination.MatchAny
          ? KavitaCombination.MatchAny
          : KavitaCombination.MatchAll;

      const statements: KavitaFilterStatementDto[] = Array.isArray(
        parsed?.statements,
      )
        ? (parsed.statements
            .map((stmt: any) => {
              const field = Number(stmt?.field);
              const comparison = Number(stmt?.comparison);

              if (Number.isNaN(field) || Number.isNaN(comparison)) return null;

              return {
                field: field as KavitaField,
                comparison: comparison as KavitaComparison,
                value:
                  stmt?.value === null || stmt?.value === undefined
                    ? undefined
                    : String(stmt.value),
              };
            })
            .filter(Boolean) as KavitaFilterStatementDto[])
        : [];

      const sortFieldRaw = Number(parsed?.sortOptions?.sortField);
      const sortAscendingRaw = parsed?.sortOptions?.isAscending;

      const sortAscending =
        typeof sortAscendingRaw === 'boolean'
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

      const limitToRaw = Number(parsed?.limitTo);

      const id =
        typeof parsed?.id === 'number' && Number.isFinite(parsed.id)
          ? parsed.id
          : undefined;

      return {
        id,
        name: parsed?.name || 'Preset filter',
        combination,
        statements,
        sortOptions,
        limitTo: Number.isNaN(limitToRaw) ? 0 : limitToRaw,
      };
    } catch (e) {
      console.warn('Kavita: failed to decode preset filter (parse)', e, text);
      return null;
    }
  }

  // ---- Filters exposed to the LNReader UI ----
  private _filters: Filters = {
    presetFilter: {
      label: 'Preset filter',
      type: FilterTypes.Picker,
      options: [{ label: 'None', value: '' }] as readonly FilterOption[],
      value: '',
    },

    filterCombination: {
      label: 'Filter combination',
      type: FilterTypes.Picker,
      options: [
        {
          label: 'Match any (OR)',
          value: String(KavitaCombination.MatchAny),
        },
        {
          label: 'Match all (AND)',
          value: String(KavitaCombination.MatchAll),
        },
      ] as readonly FilterOption[],
      value: String(KavitaCombination.MatchAll),
    },

    sortField: {
      label: 'Sort by',
      type: FilterTypes.Picker,
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
      ] as const,
      value: String(KavitaSortField.SortName),
    },

    sortDirection: {
      label: 'Sort direction',
      type: FilterTypes.Picker,
      options: [
        { label: 'Ascending', value: 'true' },
        { label: 'Descending', value: 'false' },
      ] as const,
      value: 'true',
    },

    // ---------- Limit ----------
    limitTo: {
      label: 'Limit results (0 = no limit)',
      type: FilterTypes.TextInput,
      value: '0',
    },

    // ---------- Libraries (loaded from /api/library/libraries) ----------
    libraries: {
      label: 'Libraries',
      type: FilterTypes.ExcludableCheckboxGroup,
      options: [] as readonly FilterOption[], // populated dynamically
      value: {
        include: [],
        exclude: [],
      },
    },

    // ---------- Publication Status (loaded from /api/metadata/publication-status) ----------
    publicationStatus: {
      label: 'Publication status',
      type: FilterTypes.ExcludableCheckboxGroup,
      options: [] as readonly FilterOption[], // populated dynamically
      value: {
        include: [],
        exclude: [],
      },
    },

    collectionTags: {
      label: 'Collections',
      type: FilterTypes.ExcludableCheckboxGroup,
      options: [] as readonly FilterOption[], // populated dynamically
      value: {
        include: [],
        exclude: [],
      },
    },

    wantToRead: {
      label: 'Want to read',
      type: FilterTypes.Picker,
      options: [
        { label: 'Any', value: '' },
        { label: 'Must be marked', value: 'true' },
        { label: 'Must NOT be marked', value: 'false' },
      ] as const,
      value: '',
    },

    // ---------- Series Name ----------
    seriesNameComparison: {
      label: 'Series name operator',
      type: FilterTypes.Picker,
      options: [
        { label: 'Equal', value: String(KavitaComparison.Equal) },
        { label: 'Not equal', value: String(KavitaComparison.NotEqual) },
        { label: 'Begins with', value: String(KavitaComparison.BeginsWith) },
        { label: 'Ends with', value: String(KavitaComparison.EndsWith) },
        { label: 'Matches', value: String(KavitaComparison.Matches) },
      ] as readonly FilterOption[],
      value: String(KavitaComparison.Matches),
    },
    seriesNameValue: {
      label: 'Series name',
      type: FilterTypes.TextInput,
      value: '',
    },

    // ---------- Release Year ----------
    releaseYearComparison: {
      label: 'Release year operator',
      type: FilterTypes.Picker,
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
      ] as readonly FilterOption[],
      value: String(KavitaComparison.Equal),
    },
    releaseYearValue: {
      label: 'Release year',
      type: FilterTypes.TextInput,
      value: '',
    },

    // ---------- Genres (loaded from /api/metadata/genres) ----------
    genres: {
      label: 'Genres',
      type: FilterTypes.ExcludableCheckboxGroup,
      options: [] as readonly FilterOption[], // populated dynamically
      value: {
        include: [],
        exclude: [],
      },
    },

    // ---------- Tags (loaded from /api/metadata/tags) ----------
    tags: {
      label: 'Tagy',
      type: FilterTypes.ExcludableCheckboxGroup,
      options: [] as readonly FilterOption[], // populated dynamically
      value: {
        include: [],
        exclude: [],
      },
    },
  };

  get filters(): Filters {
    // Always kick off lazy loading so the options appear as soon as possible.
    void this.ensureFilterOptionsLoaded();
    return this._filters;
  }

  imageRequestInit?: Plugin.ImageRequestInit | undefined = undefined;
  webStorageUtilized = true;
  private jwtToken: string | null = null;

  private get baseUrl() {
    return this.site;
  }

  private getBoolSetting(key: string, defaultVal: boolean): boolean {
    const raw = storage.get(key) as any;

    if (typeof raw === 'boolean') return raw;

    if (typeof raw === 'string') {
      const v = raw.toLowerCase().trim();
      if (['true', '1', 'yes', 'on'].includes(v)) return true;
      if (['false', '0', 'no', 'off'].includes(v)) return false;
    }

    return defaultVal;
  }

  // ---------- AUTH / REQUEST HELPERY ----------

  private async ensureToken(): Promise<void> {
    if (this.jwtToken) return;
    if (typeof fetchApi !== 'function') {
      throw new Error('fetchApi is not available in this runtime');
    }

    const url = `${this.baseUrl}/api/Plugin/authenticate?apiKey=${encodeURIComponent(
      this.apiKey,
    )}&pluginName=lnreader-kavita`;

    const res = await fetchApi(url, { method: 'POST' });
    const text = await res.text();

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error(`Authentication failed, non-JSON response: ${text}`);
    }

    if (!data?.token) {
      throw new Error('Authentication failed: token missing in response');
    }

    console.log(`Kavita API: Authenticated successfully - ${data.token}`);
    this.jwtToken = data.token;
  }

  private getAuthHeaders() {
    return this.jwtToken ? { Authorization: `Bearer ${this.jwtToken}` } : {};
  }

  private async apiGet<T = any>(path: string): Promise<T> {
    await this.ensureToken();

    const url = path.startsWith('http')
      ? path
      : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;

    const res = await fetchApi(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...this.getAuthHeaders(),
      },
    });

    const text = await res.text();
    try {
      return JSON.parse(text) as T;
    } catch {
      return text as unknown as T;
    }
  }

  // ---------- POPULAR NOVELS WITH FILTER SUPPORT ----------

  async popularNovels(
    pageNo: number,
    {
      showLatestNovels,
      filters,
    }: Plugin.PopularNovelsOptions<typeof this.filters>,
  ): Promise<Plugin.NovelItem[]> {
    await this.ensureToken();
    await this.ensureFilterOptionsLoaded();

    const pageSize = 30;
    const presetFilterRaw = (filters as any)?.presetFilter as
      | {
          type: FilterTypes.Picker;
          value?: string;
        }
      | undefined;

    const presetFilterId =
      presetFilterRaw &&
      presetFilterRaw.type === FilterTypes.Picker &&
      typeof presetFilterRaw.value === 'string'
        ? presetFilterRaw.value.trim()
        : '';

    let presetFilterBody: KavitaFilterV2Dto | null = null;

    if (presetFilterId) {
      const encodedPreset = this._presetFilterMap.get(presetFilterId);
      if (encodedPreset) {
        presetFilterBody = await this.decodePresetFilter(encodedPreset);
      } else {
        console.warn(
          `Kavita: preset filter ${presetFilterId} missing from cache`,
        );
      }
    }

    const presetFilterSelected = Boolean(presetFilterId);
    let hasUserFilters = presetFilterSelected;
    let body: KavitaFilterV2Dto;

    if (presetFilterBody) {
      hasUserFilters = true;
      body = presetFilterBody;
    } else if (presetFilterSelected) {
      body = new KavitaFilterBuilder('LNReader: Preset (fallback)')
        .combination(KavitaCombination.MatchAll)
        .sortBy(KavitaSortField.SortName, true)
        .limitTo(0)
        .build();
    } else {
      // Build a FilterV2 body that mirrors what the Kavita web UI would receive.
      // Helper to apply include/exclude arrays from the ExcludableCheckboxGroup filters.
      const applyIncludeExcludeFilter = (
        key: keyof Filters,
        includeHandler: (ids: string[]) => void,
        excludeHandler: (ids: string[]) => void,
      ): boolean => {
        const raw = (filters as any)?.[key];
        if (
          !raw ||
          raw.type !== FilterTypes.ExcludableCheckboxGroup ||
          typeof raw !== 'object'
        ) {
          return false;
        }

        const value = (raw.value || {}) as {
          include?: string[];
          exclude?: string[];
        };

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
      let combination: KavitaCombination = KavitaCombination.MatchAll;

      const combinationRaw = (filters as any)?.filterCombination as
        | {
            type: FilterTypes.Picker;
            value?: string;
          }
        | undefined;

      if (
        combinationRaw &&
        combinationRaw.type === FilterTypes.Picker &&
        typeof combinationRaw.value === 'string'
      ) {
        const parsed = Number(combinationRaw.value);
        if (
          parsed === KavitaCombination.MatchAny ||
          parsed === KavitaCombination.MatchAll
        ) {
          combination = parsed;
        }
      }

      // Track whether the user actually set any filter (genres/status/libraries/year/name/tags)
      hasUserFilters = false;

      // --- Result limit ---
      let limitTo = 0;
      const limitToRaw = (filters as any)?.limitTo as
        | { type: FilterTypes.TextInput; value?: string }
        | undefined;
      if (limitToRaw && limitToRaw.type === FilterTypes.TextInput) {
        const raw = String(limitToRaw.value ?? '').trim();
        if (raw) {
          const parsed = Number(raw);
          if (Number.isFinite(parsed) && parsed >= 0) {
            limitTo = parsed;
            if (parsed > 0) hasUserFilters = true;
          }
        }
      }

      // --- Sorting (Picker + Picker) ---
      let sortField: number = KavitaSortField.SortName;
      let sortAscending = true;

      const sortFieldRaw = (filters as any)?.sortField as
        | {
            type: FilterTypes.Picker;
            value?: string;
          }
        | undefined;

      if (
        sortFieldRaw &&
        sortFieldRaw.type === FilterTypes.Picker &&
        typeof sortFieldRaw.value === 'string'
      ) {
        const parsed = Number(sortFieldRaw.value);
        if (!Number.isNaN(parsed)) {
          sortField = parsed;
        }
      }

      const sortDirectionRaw = (filters as any)?.sortDirection as
        | {
            type: FilterTypes.Picker;
            value?: string;
          }
        | undefined;

      if (
        sortDirectionRaw &&
        sortDirectionRaw.type === FilterTypes.Picker &&
        typeof sortDirectionRaw.value === 'string'
      ) {
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

      if (
        applyIncludeExcludeFilter(
          'genres',
          ids => fb.whereGenresInclude(ids),
          ids => fb.whereGenresExclude(ids),
        )
      ) {
        hasUserFilters = true;
      }

      if (
        applyIncludeExcludeFilter(
          'publicationStatus',
          ids => fb.wherePublicationStatusInclude(ids),
          ids => fb.wherePublicationStatusExclude(ids),
        )
      ) {
        hasUserFilters = true;
      }

      if (
        applyIncludeExcludeFilter(
          'libraries',
          ids => fb.whereLibrariesInclude(ids),
          ids => fb.whereLibrariesExclude(ids),
        )
      ) {
        hasUserFilters = true;
      }

      // --- Release Year (TextInput + Picker) ---
      const releaseYearValueRaw = (filters as any)?.releaseYearValue as
        | {
            type: FilterTypes.TextInput;
            value?: string;
          }
        | undefined;

      const releaseYearComparisonRaw = (filters as any)
        ?.releaseYearComparison as
        | {
            type: FilterTypes.Picker;
            value?: string;
          }
        | undefined;

      if (
        releaseYearValueRaw &&
        releaseYearValueRaw.type === FilterTypes.TextInput
      ) {
        const rawYear = (releaseYearValueRaw.value ?? '').trim();

        if (rawYear) {
          let comparison = KavitaComparison.Equal;

          if (
            releaseYearComparisonRaw &&
            releaseYearComparisonRaw.type === FilterTypes.Picker &&
            typeof releaseYearComparisonRaw.value === 'string'
          ) {
            const parsed = Number(releaseYearComparisonRaw.value);
            if (!Number.isNaN(parsed)) {
              comparison = parsed as KavitaComparison;
            }
          }

          fb.whereReleaseYear(comparison, rawYear);
          hasUserFilters = true;
        }
      }

      // --- Series Name (TextInput + Picker) ---
      const seriesNameValueRaw = (filters as any)?.seriesNameValue as
        | {
            type: FilterTypes.TextInput;
            value?: string;
          }
        | undefined;

      const seriesNameComparisonRaw = (filters as any)?.seriesNameComparison as
        | {
            type: FilterTypes.Picker;
            value?: string;
          }
        | undefined;

      if (
        seriesNameValueRaw &&
        seriesNameValueRaw.type === FilterTypes.TextInput
      ) {
        const rawName = (seriesNameValueRaw.value ?? '').trim();

        if (rawName) {
          let comparison = KavitaComparison.Matches;

          if (
            seriesNameComparisonRaw &&
            seriesNameComparisonRaw.type === FilterTypes.Picker &&
            typeof seriesNameComparisonRaw.value === 'string'
          ) {
            const parsed = Number(seriesNameComparisonRaw.value);
            if (!Number.isNaN(parsed)) {
              comparison = parsed as KavitaComparison;
            }
          }

          fb.whereSeriesName(comparison, rawName);
          hasUserFilters = true;
        }
      }

      if (
        applyIncludeExcludeFilter(
          'tags',
          ids => fb.whereTagsInclude(ids),
          ids => fb.whereTagsExclude(ids),
        )
      ) {
        hasUserFilters = true;
      }

      if (
        applyIncludeExcludeFilter(
          'collectionTags',
          ids => fb.whereCollectionTagsInclude(ids),
          ids => fb.whereCollectionTagsExclude(ids),
        )
      ) {
        hasUserFilters = true;
      }

      // --- Want To Read (Picker) ---
      const wantToReadRaw = (filters as any)?.wantToRead as
        | { type: FilterTypes.Picker; value?: string }
        | undefined;

      if (
        wantToReadRaw &&
        wantToReadRaw.type === FilterTypes.Picker &&
        typeof wantToReadRaw.value === 'string'
      ) {
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

      const selectedFormatIds: string[] = [];
      // Map the boolean switches to the numeric identifiers used by Kavita.
      if (formatImageOn) selectedFormatIds.push('0'); // Image
      if (formatArchiveOn) selectedFormatIds.push('1'); // Archive
      if (formatEpubOn) selectedFormatIds.push('3'); // EPUB
      if (formatPdfOn) selectedFormatIds.push('4'); // PDF

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

    const res = await fetchApi(url, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    let data: any[] = [];
    try {
      data = JSON.parse(text);
    } catch {
      console.warn('Kavita API: popularNovels - invalid JSON response');
      return [];
    }

    const novels: Plugin.NovelItem[] = (data || []).map((series: any) => {
      const seriesId = series.id ?? series.seriesId;
      const name = series.name ?? series.seriesName ?? 'Unknown series';

      const cover = seriesId
        ? `${this.baseUrl}/api/image/series-cover?seriesId=${seriesId}${
            this.apiKey ? `&apiKey=${this.apiKey}` : ''
          }`
        : defaultCover;

      return {
        name,
        path: String(seriesId),
        cover,
      };
    });

    return novels;
  }

  // ---------- BOOK / CHAPTER HELPERS ----------

  // LNReader uses ChapterItem.path as the persistent chapter identity.
  // Do not put Kavita's internal Book ID in that path: Kavita can assign
  // a new Book ID when a monolithic EPUB is re-indexed.
  private readonly chapterTargets = new Map<
    string,
    { chapterId: number; page: number }
  >();

  private stableBookKey(bookInfo: any, chapter: any, volume: any): string {
    const title =
      bookInfo?.bookTitle ??
      chapter?.titleName ??
      volume?.name ??
      volume?.title ??
      'book';
    const volumeNumber = bookInfo?.volumeNumber ?? volume?.number ?? '';

    // For the normal monolithic-EPUB case this stays unchanged when Kavita
    // re-indexes the file, while still separating distinct books/volumes.
    return `${String(title)}\u001f${String(volumeNumber)}`;
  }

  private makeStableChapterPath(
    seriesId: number,
    bookKey: string,
    page: number,
  ): string {
    return `stable2:${seriesId}:${encodeURIComponent(bookKey)}:${page}`;
  }

  private parseStableChapterPath(chapterPath: string): {
    seriesId: number;
    bookKey: string;
    page: number;
  } | null {
    const match = /^stable2:(\d+):([^:]+):(\d+)$/.exec(chapterPath);
    if (!match) return null;

    const seriesId = Number(match[1]);
    const page = Number(match[3]);
    if (!Number.isFinite(seriesId) || !Number.isFinite(page)) return null;

    try {
      return {
        seriesId,
        bookKey: decodeURIComponent(match[2]),
        page,
      };
    } catch {
      return null;
    }
  }

  private async resolveStableChapterTarget(
    seriesId: number,
    bookKey: string,
    page: number,
    headers: Record<string, string>,
  ): Promise<{ chapterId: number; page: number } | null> {
    const stablePath = this.makeStableChapterPath(seriesId, bookKey, page);
    const cached = this.chapterTargets.get(stablePath);
    if (cached) return cached;

    const volumesRes = await fetchApi(
      `${this.site}/api/Series/volumes?seriesId=${seriesId}`,
      { headers },
    );
    const volumes = await volumesRes.json();

    for (const vol of Array.isArray(volumes) ? volumes : []) {
      for (const ch of vol.chapters ?? []) {
        if (!ch?.id) continue;

        const bookInfo = await fetchApi(
          `${this.site}/api/Book/${ch.id}/book-info`,
          { headers },
        ).then(res => res.json());

        const currentBookKey = this.stableBookKey(bookInfo, ch, vol);
        if (currentBookKey !== bookKey) continue;

        const totalPages = Number(
          bookInfo.pages ?? ch.pages ?? vol.pages ?? 0,
        );
        if (page < 0 || page >= totalPages) return null;

        const target = { chapterId: Number(ch.id), page };
        this.chapterTargets.set(stablePath, target);
        return target;
      }
    }

    return null;
  }

  private flattenBookChapters(toc: any[]): { page: number; title: string }[] {
    const flat: { page: number; title: string }[] = [];

    const walk = (item: any) => {
      if (typeof item.page === 'number') {
        flat.push({
          page: item.page,
          title: item.title ?? '',
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

  private getTitleForPage(
    flatToc: { page: number; title: string }[],
    page: number,
  ): string | null {
    let current: string | null = null;
    for (const item of flatToc) {
      if (item.page <= page) {
        current = item.title || null;
      } else {
        break;
      }
    }
    return current;
  }

  // ---------- PARSE NOVEL ----------

  async parseNovel(novelPath: string): Promise<Plugin.SourceNovel> {
    await this.ensureToken();
    const headers = {
      Accept: 'application/json',
      ...this.getAuthHeaders(),
    };

    const seriesId = Number(
      novelPath.startsWith('/api/Series/')
        ? novelPath.split('/').pop()
        : novelPath,
    );

    const [seriesRes, metaRes, volumesRes] = await Promise.all([
      // Pull the core series objects in parallel to minimize round-trips.
      fetchApi(`${this.site}/api/Series/${seriesId}`, { headers }),
      fetchApi(`${this.site}/api/Series/metadata?seriesId=${seriesId}`, {
        headers,
      }),
      fetchApi(`${this.site}/api/Series/volumes?seriesId=${seriesId}`, {
        headers,
      }),
    ]);

    const series = await seriesRes.json();
    const metadata = await metaRes.json();
    const volumes = await volumesRes.json();

    const novel: Plugin.SourceNovel = {
      path: String(seriesId),
      name: series.name ?? metadata.title ?? 'Untitled',
      cover: `${this.site}/api/image/series-cover?seriesId=${seriesId}${
        this.apiKey ? `&apiKey=${this.apiKey}` : ''
      }`,
      chapters: [],
    };

    // ---------- author ----------
    if (Array.isArray(metadata.people) && metadata.people.length) {
      const writers = metadata.people.filter((p: any) =>
        String(p.role || '')
          .toLowerCase()
          .includes('writer'),
      );
      if (writers.length) {
        novel.author = writers.map((w: any) => w.name).join(', ');
      }
    } else {
      const firstVolume = Array.isArray(volumes) ? volumes[0] : null;
      const firstChapter =
        firstVolume && Array.isArray(firstVolume.chapters)
          ? firstVolume.chapters[0]
          : null;
      if (firstChapter && Array.isArray(firstChapter.writers)) {
        novel.author = firstChapter.writers.map((w: any) => w.name).join(', ');
      }
    }

    // ---------- status ----------
    switch (metadata.publicationStatus) {
      case 0:
        novel.status = NovelStatus.Ongoing;
        break;
      case 1:
        novel.status = NovelStatus.OnHiatus;
        break;
      case 2:
        novel.status = NovelStatus.Completed;
        break;
      case 3:
        novel.status = NovelStatus.Cancelled;
        break;
      default:
        novel.status = NovelStatus.Unknown;
    }

    // ---------- genres ----------
    if (Array.isArray(metadata.genres) && metadata.genres.length) {
      novel.genres = metadata.genres
        .map((g: any) => g.title ?? g.name ?? g.label ?? g.value)
        .filter(Boolean)
        .join(', ');
    } else {
      const genreSet = new Set<string>();
      for (const vol of volumes as any[]) {
        for (const ch of vol.chapters ?? []) {
          for (const g of ch.genres ?? []) {
            const title = g.title ?? g.name;
            if (title) genreSet.add(title);
          }
        }
      }
      if (genreSet.size) {
        novel.genres = Array.from(genreSet).join(', ');
      }
    }

    // ---------- summary ----------
    novel.summary =
      metadata.summary ??
      metadata.description ??
      series.summary ??
      series.description ??
      undefined;

    // ---------- rating ----------
    const rating =
      metadata.userRating ??
      metadata.averageRating ??
      series.userRating ??
      series.averageRating;
    if (typeof rating === 'number') novel.rating = rating;

    const status =
      metadata.seriesStatus ??
      metadata.status ??
      series.status ??
      series.seriesStatus;
    if (status) novel.status = String(status);

    // ---------- chapters: treat every page as an individual chapter ----------
    const chapters: Plugin.ChapterItem[] = [];
    let globalIndex = 1;

    for (const vol of volumes as any[]) {
      const volChapters: any[] = vol.chapters ?? [];
      if (!volChapters.length) continue;

      // Each page inside every book becomes one LNReader chapter entry.
      for (const ch of volChapters) {
        const chapterId = ch.id;
        if (!chapterId) continue;

        const [bookInfo, tocJson] = await Promise.all([
          fetchApi(`${this.site}/api/Book/${chapterId}/book-info`, {
            headers,
          }).then(res => res.json()),
          fetchApi(`${this.site}/api/Book/${chapterId}/chapters`, {
            headers,
          }).then(res => res.json()),
        ]);

        const totalPages: number = bookInfo.pages ?? ch.pages ?? vol.pages ?? 0;
        if (!totalPages) continue;

        const flatToc = this.flattenBookChapters(tocJson);
        const bookKey = this.stableBookKey(bookInfo, ch, vol);

        for (let page = 0; page < totalPages; page++) {
          const tocTitle = this.getTitleForPage(flatToc, page);

          // Use Kavita's TOC title, but remove a leading page-count prefix
          // such as "1 / 450 - " if Kavita has embedded it in the title.
          // Do not otherwise rewrite the title.
          const chapterName = (tocTitle || `Chapter ${page + 1}`)
            .replace(/^\s*\d+\s*\/\s*\d+\s*(?:-\s*)?/, '')
            .trim() || `Chapter ${page + 1}`;

          const stablePath = this.makeStableChapterPath(
            seriesId,
            bookKey,
            page,
          );
          this.chapterTargets.set(stablePath, {
            chapterId: Number(chapterId),
            page,
          });

          chapters.push({
            name: chapterName,
            path: stablePath,
            chapterNumber: globalIndex++,
            releaseTime: ch.releaseDate ?? ch.created ?? ch.createdUtc ?? null,
          });
        }
      }
    }

    novel.chapters = chapters;
    return novel;
  }

  // ---------- PARSE CHAPTER ----------

  async parseChapter(chapterPath: string): Promise<string> {
    await this.ensureToken();
    const headers = {
      Accept: 'text/plain,application/json',
      ...this.getAuthHeaders(),
    };

    const stable = this.parseStableChapterPath(chapterPath);
    let target: { chapterId: number; page: number } | null = null;

    if (stable) {
      target = await this.resolveStableChapterTarget(
        stable.seriesId,
        stable.bookKey,
        stable.page,
        headers,
      );
      if (!target) {
        throw new Error(`Could not resolve stable chapterPath: ${chapterPath}`);
      }
    } else {
      // Backwards compatibility for paths created by older plugin versions.
      const [chapterIdStr, pageStr] = chapterPath.split(':');
      const chapterId = Number(chapterIdStr);
      const page = Number(pageStr || '0');

      if (!chapterId || Number.isNaN(chapterId)) {
        throw new Error(`Invalid chapterPath: ${chapterPath}`);
      }

      target = { chapterId, page };
    }

    const res = await fetchApi(
      `${this.site}/api/Book/${target.chapterId}/book-page?page=${target.page}`,
      { headers },
    );
    return await res.text();
  }

  // ---------- SEARCH ----------

  async searchNovels(
    searchTerm: string,
    pageNo: number,
  ): Promise<Plugin.NovelItem[]> {
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

    const selectedFormatIds: string[] = [];
    if (formatImageOn) selectedFormatIds.push('0'); // Image
    if (formatArchiveOn) selectedFormatIds.push('1'); // Archive
    if (formatEpubOn) selectedFormatIds.push('3'); // EPUB
    if (formatPdfOn) selectedFormatIds.push('4'); // PDF

    if (selectedFormatIds.length > 0) {
      fb.whereFormatsContains(selectedFormatIds);
    }

    const body = fb.build();

    const url = `${this.baseUrl}/api/Series/v2?PageNumber=${currentPage}&PageSize=${pageSize}`;

    const res = await fetchApi(url, {
      method: 'POST',
      headers: {
        Accept: 'text/plain',
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    let data: any = [];
    try {
      data = JSON.parse(text);
    } catch {
      console.warn('Kavita API: searchNovels - invalid JSON response');
      return [];
    }

    const seriesResults: any[] = Array.isArray(data)
      ? data
      : data?.series || data?.seriesResults || data?.seriesDtos || [];

    const novels: Plugin.NovelItem[] = seriesResults
      .filter(Boolean)
      .map((series: any) => {
        const seriesId = series?.seriesId ?? series?.id;
        const name = series?.name ?? series?.seriesName ?? 'Unknown series';

        const cover = seriesId
          ? `${this.baseUrl}/api/image/series-cover?seriesId=${seriesId}${
              this.apiKey ? `&apiKey=${this.apiKey}` : ''
            }`
          : defaultCover;

        return {
          name,
          path: String(seriesId),
          cover,
        };
      });

    return novels;
  }

  resolveUrl = (path: string, isNovel?: boolean) => {
    if (path.startsWith('http')) return path;
    return `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  pluginSettings = {
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

export default new KavitaApiPlugin();
