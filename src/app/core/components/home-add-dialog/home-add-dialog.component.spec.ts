import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAddDialogComponent } from './home-add-dialog.component';

describe('HomeAddDialogComponent', () => {
  let component: HomeAddDialogComponent;
  let fixture: ComponentFixture<HomeAddDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAddDialogComponent]
    });
    fixture = TestBed.createComponent(HomeAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
