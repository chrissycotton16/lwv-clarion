import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMemberDialogComponent } from './new-member-dialog.component';

describe('NewMemberDialogComponent', () => {
  let component: NewMemberDialogComponent;
  let fixture: ComponentFixture<NewMemberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMemberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMemberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
