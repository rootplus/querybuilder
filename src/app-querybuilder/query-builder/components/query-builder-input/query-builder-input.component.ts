import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';

import {DATA_TYPE, OPERATORS} from '../../query-builder.model';
import {QueryBuilderValidators} from '../../query-builder-validators';

@Component({
  selector: 'query-builder-input',
  templateUrl: './query-builder-input.component.html',
  styleUrls: ['./query-builder-input.component.css'],
})
export class QueryBuilderInputComponent implements OnInit, OnDestroy {
  @Input() condition: any = [];
  @Input() filter: any = [];

  DATA_TYPES = DATA_TYPE;

  selectedField: FormControl;
  selectedOperator: FormControl;
  inputValues: FormGroup;

  selectedFieldSubscription: Subscription;
  selectedOperatorSubscription: Subscription;
  inputValuesSubscription: Subscription;

  numberOfInputControl = 0;
  pseudoArr = [];
  isOperatorMultiple = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.numberOfInputControl = this.getInputNumberByOperator(this.condition.operator);
    this.pseudoArr = _.range(this.numberOfInputControl);
    this.isOperatorMultiple = this.ifOperatorMultiple(this.condition.operator);

    this.selectedField = new FormControl(this.condition.id);
    this.selectedOperator = new FormControl(this.condition.operator);
    this.inputValues = this.fb.group(this.createInputControlsConfig());

    this.selectedFieldSubscription = this.selectedField.valueChanges.subscribe(e => {
      this.condition.id = e;
      this.condition.operator = null;
      this.condition.value = null;
      this.selectedOperator.reset();
      this.inputValues.reset();
    });

    this.selectedOperatorSubscription = this.selectedOperator.valueChanges.subscribe(o => {
        this.condition.operator = o;
        this.condition.value = null;
        this.inputValues.reset();

        this.numberOfInputControl = this.getInputNumberByOperator(this.condition.operator);
        this.pseudoArr = _.range(this.numberOfInputControl);
        this.isOperatorMultiple = this.ifOperatorMultiple(this.condition.operator);

        if (o) {
          if (this.numberOfInputControl > 1) {
            this.condition.value = _.times(this.numberOfInputControl, _.constant(null));
          } else {
            this.condition.value = null;
          }

          this.inputValues = this.fb.group(
            this.createInputControlsConfig()
          );

          this.inputValuesSubscription.unsubscribe();
          this.inputValuesSubscription = this.inputValues.valueChanges.subscribe(v => {
            if (this.numberOfInputControl > 1) {
              this.condition.value = _.values(v);
            } else if (this.numberOfInputControl === 1 && this.isOperatorMultiple && !!v[0]) {
              this.condition.value =
                this.getDataTypeById(this.condition.id) === this.DATA_TYPES.NUMBER ? v[0].split(',').map(e => Number(e)) : v[0].split(',');
            } else {
              this.condition.value = v[0];
            }
          });
        }
      }
    );

    this.inputValuesSubscription = this.inputValues.valueChanges.subscribe(v => {
      if (this.numberOfInputControl > 1) {
        this.condition.value = _.values(v);
      } else if (this.numberOfInputControl === 1 && this.isOperatorMultiple && !!v[0]) {
        this.condition.value =
          this.getDataTypeById(this.condition.id) === this.DATA_TYPES.NUMBER ? v[0].split(',').map(e => Number(e)) : v[0].split(',');
      } else {
        this.condition.value = v[0];
      }
    });
  }

  ngOnDestroy() {
    this.selectedFieldSubscription.unsubscribe();
    this.selectedOperatorSubscription.unsubscribe();
    this.inputValuesSubscription.unsubscribe();
  }

  createInputControlsConfig() {
    const controlsConfig = {};
    for (let i = 0; i < this.numberOfInputControl; i++) {
      switch (this.getDataTypeById(this.condition.id)) {
        case DATA_TYPE.DATE:
          controlsConfig[i] =
            this.numberOfInputControl > 1
              ? ([this.condition.value[i] ? new Date(this.condition.value[i]) : null, Validators.required])
              : ([this.condition.value ? new Date(this.condition.value) : null, Validators.required]);
          break;
        case DATA_TYPE.STRING:
          if (this.numberOfInputControl > 1) {
            controlsConfig[i] =
              [this.condition.value[i], [Validators.required, QueryBuilderValidators.notAllowedStringValidator('abc')]];
          }
          if (this.numberOfInputControl === 1) {
            if (this.isOperatorMultiple && this.condition.value) {
              controlsConfig[i] =
                [this.condition.value.join(','), [Validators.required, QueryBuilderValidators.notAllowedStringValidator('abc')]];
            } else {
              controlsConfig[i] =
                [this.condition.value, [Validators.required, QueryBuilderValidators.notAllowedStringValidator('abc')]];
            }
          }
          break;
        default:
          if (this.numberOfInputControl > 1) {
            controlsConfig[i] = [this.condition.value[i], Validators.required];
          }
          if (this.numberOfInputControl === 1) {
            if (this.isOperatorMultiple && this.condition.value) {
              controlsConfig[i] = [this.condition.value.join(','), Validators.required];
            } else {
              controlsConfig[i] = [this.condition.value, Validators.required];
            }
          }
      }
    }

    return controlsConfig;
  }


  getDataTypeById(id: string): string {
    const target = this.filter.find(e => e.id === id);
    return _.has(target, 'type') ? target.type : undefined;
  }

  getOperatorsById(id: string): Array<string> {
    const target = this.filter.find(e => e.id === id);
    return (_.has(target, 'type') ? target.operators : undefined)
      || _.filter(OPERATORS, {'apply_to': [this.getDataTypeById(id)]}).map(e => e.type);
  }

  getInputNumberByOperator(operator: string): number {
    return OPERATORS[operator] ? OPERATORS[operator].nb_inputs : 0;
  }

  ifOperatorMultiple(operator: string): boolean {
    return OPERATORS[operator] ? OPERATORS[operator].multiple : false;
  }


  ifShowValidationMessage(control): boolean {
    return control ? (control.invalid && (control.touched || control.dirty)) : false;
  }

  getValidationMessages(control): string {
    let message = '';
    if (this.ifShowValidationMessage(control) && control.errors) {
      if (control.errors.required) {
        message = 'Empty value is not allowed';
      }
      if (control.errors.notAllowedString) {
        message = control.errors.notAllowedString.value + ' is not allowed in string';
      }
    }
    return message;
  }


}

