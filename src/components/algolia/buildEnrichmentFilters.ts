export const buildEnrichmentFilters = (scores: object) => {
  const fallbackCondition = buildEnrichmentField('interest', '-tag');
  const queryPieces = Object.keys(scores)
    .filter(s => !s.startsWith('subcat_'))
    .map((key: string) => {
      const value = scores[key];
      const filter = buildEnrichmentField('interest', key, value);
      return filter;
    });

  if (queryPieces.length > 0) {
    return [...queryPieces, fallbackCondition];
  }

  return [];
};

export const buildSubcategoryFilters = (scores: object) => {
  const fallbackCondition = buildEnrichmentField('subcategories', '-tag');
  const queryPieces = Object.keys(scores)
    .filter(s => s.startsWith('subcat_'))
    .map((key: string) => {
      const value = scores[key];
      const filter = buildEnrichmentField('subcategories', key, value);
      return filter;
    });

  if (queryPieces.length > 0) {
    return [...queryPieces, fallbackCondition];
  }
  return [];
};

export const buildEnrichmentField = (field: string, value: string, score?: number | string) => {
  let fieldFilter = `${field}:${value}`;
  if (score) {
    fieldFilter += `<score=${score}>`;
  }
  return fieldFilter;
};
