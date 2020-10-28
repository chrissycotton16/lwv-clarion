import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAddDialogComponent } from './member-add-dialog.component';

describe('MemberAddDialogComponent', () => {
  let component: MemberAddDialogComponent;
  let fixture: ComponentFixture<MemberAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
