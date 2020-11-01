import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpdateDialogComponent } from './event-update-dialog.component';

describe('EventUpdateDialogComponent', () => {
  let component: EventUpdateDialogComponent;
  let fixture: ComponentFixture<EventUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
