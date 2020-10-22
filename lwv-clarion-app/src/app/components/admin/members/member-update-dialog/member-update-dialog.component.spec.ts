import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpdateDialogComponent } from './member-update-dialog.component';

describe('MemberUpdateDialogComponent', () => {
  let component: MemberUpdateDialogComponent;
  let fixture: ComponentFixture<MemberUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
