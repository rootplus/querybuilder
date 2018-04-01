// enum string < typescript 2.4 causes compilation error
export const LOGIC_OPERATOR = {
  AND: 'and',
  OR: 'or',
  NOT: 'not',
};

export const DATA_TYPE = {
  STRING: 'string',
  NUMBER: 'number',
  DATE: 'date',
  BOOLEAN: 'boolean'
};

export const OPERATORS = {
  equal:            { type: 'equal',            nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'date', 'boolean'] },
  not_equal:        { type: 'not_equal',        nb_inputs: 1, multiple: false, apply_to: ['string', 'number', 'date', 'boolean'] },
  in:               { type: 'in',               nb_inputs: 1, multiple: true,  apply_to: ['string', 'number'] },
  not_in:           { type: 'not_in',           nb_inputs: 1, multiple: true,  apply_to: ['string', 'number'] },
  less:             { type: 'less',             nb_inputs: 1, multiple: false, apply_to: ['number', 'date'] },
  less_or_equal:    { type: 'less_or_equal',    nb_inputs: 1, multiple: false, apply_to: ['number', 'date'] },
  greater:          { type: 'greater',          nb_inputs: 1, multiple: false, apply_to: ['number', 'date'] },
  greater_or_equal: { type: 'greater_or_equal', nb_inputs: 1, multiple: false, apply_to: ['number', 'date'] },
  between:          { type: 'between',          nb_inputs: 2, multiple: false, apply_to: ['number', 'date'] },
  not_between:      { type: 'not_between',      nb_inputs: 2, multiple: false, apply_to: ['number', 'date'] },
  begins_with:      { type: 'begins_with',      nb_inputs: 1, multiple: false, apply_to: ['string'] },
  not_begins_with:  { type: 'not_begins_with',  nb_inputs: 1, multiple: false, apply_to: ['string'] },
  contains:         { type: 'contains',         nb_inputs: 1, multiple: false, apply_to: ['string'] },
  not_contains:     { type: 'not_contains',     nb_inputs: 1, multiple: false, apply_to: ['string'] },
  ends_with:        { type: 'ends_with',        nb_inputs: 1, multiple: false, apply_to: ['string'] },
  not_ends_with:    { type: 'not_ends_with',    nb_inputs: 1, multiple: false, apply_to: ['string'] },
  is_empty:         { type: 'is_empty',         nb_inputs: 0, multiple: false, apply_to: ['string'] },
  is_not_empty:     { type: 'is_not_empty',     nb_inputs: 0, multiple: false, apply_to: ['string'] },
  is_null:          { type: 'is_null',          nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'date', 'boolean'] },
  is_not_null:      { type: 'is_not_null',      nb_inputs: 0, multiple: false, apply_to: ['string', 'number', 'date', 'boolean'] }
};


export class Condition {
  id: string | null = null;
  operator: string | null = null;
  value: any | null = null;
}

export class ConditionGroup {
  condition: string | null = LOGIC_OPERATOR.AND;
  rules: Array<Condition> | null = [new Condition()];
  not?: boolean | null;
}

export class ScreeningRule {
  condition: string | null = LOGIC_OPERATOR.AND;
  rules: Array<Condition|ConditionGroup> | null = [new Condition()];
  not?: boolean | null;
}

