import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryBuilderInputComponent } from './query-builder-input.component';

describe('QueryBuilderInputComponent', () => {
  let component: QueryBuilderInputComponent;
  let fixture: ComponentFixture<QueryBuilderInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryBuilderInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryBuilderInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
