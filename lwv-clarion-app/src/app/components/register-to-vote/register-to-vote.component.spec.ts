import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterToVoteComponent } from './register-to-vote.component';

describe('RegisterToVoteComponent', () => {
  let component: RegisterToVoteComponent;
  let fixture: ComponentFixture<RegisterToVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterToVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterToVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
