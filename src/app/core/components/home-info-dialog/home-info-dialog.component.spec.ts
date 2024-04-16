import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInfoDialogComponent } from './home-info-dialog.component';

describe('HomeInfoDialogComponent', () => {
  let component: HomeInfoDialogComponent;
  let fixture: ComponentFixture<HomeInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeInfoDialogComponent]
    });
    fixture = TestBed.createComponent(HomeInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
