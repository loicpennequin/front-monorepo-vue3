export const CONTEXT_KEYS = {
  BREADCRUMB: 'breadcrumb',
  DATATABLE: 'dataTable'
};

export const USER_DETAILS_TABS = {
  INFOS: 'infos',
  ORDERS: 'orders',
  ITEMS: 'items'
};

export const EVENTS = {
  DATA_TABLE: {
    COLUMN_UPDATE: 'DataTableColumn:update'
  }
};

export const DATATABLE_COLUMN_TYPES = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE'
};

export const DATATABLE_HIGHLIGHT_OPERATORS = {
  [DATATABLE_COLUMN_TYPES.STRING]: {
    EQUALS: 'STRINGEQUALS',
    INCLUDES: 'INCLUDES',
    STARTS_WITH: 'STARTSWIDTH',
    ENDS_WITH: 'ENDSWITH'
  },
  [DATATABLE_COLUMN_TYPES.NUMBER]: {
    EQUALS: 'NUMBEREQUALS',
    GREATER_THAN: 'GREATER_THAN',
    LOWER_THAN: 'LOWER_THAN'
  },
  [DATATABLE_COLUMN_TYPES.BOOLEAN]: {
    TRUE: 'TRUE',
    FALSE: 'FALSE'
  },
  [DATATABLE_COLUMN_TYPES.DATE]: {
    BEFORE: 'BEFORE',
    AFTER: 'AFTER'
  }
};

export const ORDER_DETAILS_TABS = {
  INFOS: 'infos',
  ITEMS: 'items'
};
