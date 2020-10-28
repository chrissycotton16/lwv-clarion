import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerUpdateDialogComponent } from './officer-update-dialog.component';

describe('OfficerUpdateDialogComponent', () => {
  let component: OfficerUpdateDialogComponent;
  let fixture: ComponentFixture<OfficerUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
