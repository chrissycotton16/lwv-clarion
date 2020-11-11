import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateDialogComponent } from './admin-update-dialog.component';

describe('AdminUpdateDialogComponent', () => {
  let component: AdminUpdateDialogComponent;
  let fixture: ComponentFixture<AdminUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
