import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBuyDialogComponent } from './home-buy-dialog.component';

describe('HomeBuyDialogComponent', () => {
  let component: HomeBuyDialogComponent;
  let fixture: ComponentFixture<HomeBuyDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeBuyDialogComponent]
    });
    fixture = TestBed.createComponent(HomeBuyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
