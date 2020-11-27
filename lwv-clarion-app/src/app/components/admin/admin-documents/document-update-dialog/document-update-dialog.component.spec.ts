import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentUpdateDialogComponent } from './document-update-dialog.component';

describe('DocumentUpdateDialogComponent', () => {
  let component: DocumentUpdateDialogComponent;
  let fixture: ComponentFixture<DocumentUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentUpdateDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
