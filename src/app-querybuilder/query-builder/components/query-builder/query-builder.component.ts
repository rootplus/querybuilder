import {Component, Input, OnChanges} from '@angular/core';
import * as _ from 'lodash';

import {Condition, ConditionGroup, ScreeningRule, LOGIC_OPERATOR} from '../../query-builder.model';

@Component({
  selector: 'query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.css']
})
export class QueryBuilderComponent implements OnChanges {
  @Input('rule') rule: ScreeningRule;
  @Input('filter') filter: any;

  LOGIC_OPERATORS = LOGIC_OPERATOR;
  currentRule: ScreeningRule;

  constructor() {
  }

  ngOnChanges() {
    this.currentRule = this.rule;
  }

  /**
   * Verify whether a logic operator is applied to a ScreeningRule or a ConditionGroup.
   */
  isLogicOperatorValid(target: ScreeningRule | ConditionGroup, operator: string) {
    if (target && target.condition && typeof target.condition === 'string') {
      switch (operator) {
        case LOGIC_OPERATOR.AND:
          return target.condition.toLowerCase() === LOGIC_OPERATOR.AND && !target.hasOwnProperty(LOGIC_OPERATOR.NOT);
        case LOGIC_OPERATOR.OR:
          return target.condition.toLowerCase() === LOGIC_OPERATOR.OR;
        case LOGIC_OPERATOR.NOT:
          return target.condition.toLowerCase() === LOGIC_OPERATOR.AND && target[LOGIC_OPERATOR.NOT] === true;
        default:
          return false;
      }
    }
  }

  onClickLogicOperator(target: ScreeningRule | ConditionGroup, operator: string) {
    if (operator === LOGIC_OPERATOR.AND || operator === LOGIC_OPERATOR.OR) {
      target.condition = operator;
      if (target.hasOwnProperty(LOGIC_OPERATOR.NOT)) {
        delete target[LOGIC_OPERATOR.NOT];
      }
    }
    if (operator === LOGIC_OPERATOR.NOT) {
      target.condition = LOGIC_OPERATOR.AND;
      target[LOGIC_OPERATOR.NOT] = true;
    }
  }

  addEmptyCondition(target: ScreeningRule | ConditionGroup) {
    if (_.isArray(target.rules)) {
      (<any>target.rules.push)(new Condition());
    }
  }

  addEmptyConditionGroup(target: ScreeningRule | ConditionGroup) {
    if (_.isArray(target.rules)) {
      (<any>target.rules.push)(new ConditionGroup());
    }
  }

  deleteConditionOrGroup(target: ScreeningRule | ConditionGroup, item: Condition | ConditionGroup) {
    if (_.isArray(target.rules)) {
      _.pull(target.rules, item);
    }
  }

}

