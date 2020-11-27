import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterUpdateDialogComponent } from './newsletter-update-dialog.component';

describe('NewsletterUpdateDialogComponent', () => {
  let component: NewsletterUpdateDialogComponent;
  let fixture: ComponentFixture<NewsletterUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsletterUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
