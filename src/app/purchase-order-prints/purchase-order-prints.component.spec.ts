import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderPrintsComponent } from './purchase-order-prints.component';

describe('PurchaseOrderPrintsComponent', () => {
  let component: PurchaseOrderPrintsComponent;
  let fixture: ComponentFixture<PurchaseOrderPrintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseOrderPrintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderPrintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
