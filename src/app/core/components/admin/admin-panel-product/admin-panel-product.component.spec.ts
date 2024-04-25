import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelProductComponent } from './admin-panel-product.component';

describe('AdminPanelProductComponent', () => {
  let component: AdminPanelProductComponent;
  let fixture: ComponentFixture<AdminPanelProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPanelProductComponent]
    });
    fixture = TestBed.createComponent(AdminPanelProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
