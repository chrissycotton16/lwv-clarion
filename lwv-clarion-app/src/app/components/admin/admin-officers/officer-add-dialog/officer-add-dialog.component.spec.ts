import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficerAddDialogComponent } from './officer-add-dialog.component';

describe('OfficerAddDialogComponent', () => {
  let component: OfficerAddDialogComponent;
  let fixture: ComponentFixture<OfficerAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfficerAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficerAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
