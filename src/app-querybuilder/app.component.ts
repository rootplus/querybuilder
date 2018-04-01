import {Component} from '@angular/core';
import * as _ from 'lodash';

import {ScreeningRule} from './query-builder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rule1Original: ScreeningRule;
  rule2Original: ScreeningRule;

  rule1: ScreeningRule = {
    'not': true,
    condition: 'AND',
    rules: [{
      id: 'price',
      operator: 'less',
      value: 100.25
    }, {
      condition: 'OR',
      rules: [{
        id: 'address',
        operator: 'equal',
        value: 'ab'
      },
        {
          id: 'address',
          operator: 'in',
          value: ['abc', 'as', 'sd']
        },
        {
          id: 'issold',
          operator: 'equal',
          value: 'true'
        }, {
          id: 'soldtime',
          operator: 'equal',
          value: '2018-02-20T20:28:38.000Z'
        }]
    }]
  };

  rule2: ScreeningRule = new ScreeningRule();


  filter1 = [
    {
      id: 'price',
      label: 'Price',
      type: 'number',
    },
    {
      id: 'issold',
      label: 'is Sold?',
      type: 'boolean',
      operators: ['equal', 'not_equal']
    }, {
      id: 'soldtime',
      label: 'Sold Time',
      type: 'date'
    }, {
      id: 'address',
      label: 'Address',
      type: 'string'
    }];

  constructor() {
    this.rule1Original = _.cloneDeep(this.rule1);
    this.rule2Original = _.cloneDeep(this.rule2);
  }

  resetRule1() {
    this.rule1 = _.cloneDeep(this.rule1Original);
  }

  resetRule2() {
    this.rule1 = _.cloneDeep(this.rule1Original);
  }
}

