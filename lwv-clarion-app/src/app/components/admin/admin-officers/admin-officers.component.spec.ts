import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOfficersComponent } from './admin-officers.component';

describe('AdminOfficersComponent', () => {
  let component: AdminOfficersComponent;
  let fixture: ComponentFixture<AdminOfficersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminOfficersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOfficersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
