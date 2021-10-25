import { ILayout } from './interfaces';

export const DEFAULT_DEBOUNCE_WAIT = 300;

export const REGEXP_SSN: RegExp = /^[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{4}$/;

export const REGEXP_EIN: RegExp = /^\d{2}[-\s]?\d{7}$/;

export const ID_ATTR = 'id';

export const DEFAULT_STATE_OPTION_TYPE = 'us_states';

export const CLASS_PREFIX = 'fields-ant';

export const ANT_FULL_COL_WIDTH = 24;

export const TOAST_DURATION = 10;

export const LAYOUT_TYPES: { [key: string]: ILayout } = {
  HORIZONTAL: 'horizontal',
  INLINE: 'inline',
  VERTICAL: 'vertical',
};
