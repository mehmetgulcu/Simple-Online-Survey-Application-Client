import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePollComponentComponent } from './create-poll-component.component';

describe('CreatePollComponentComponent', () => {
  let component: CreatePollComponentComponent;
  let fixture: ComponentFixture<CreatePollComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePollComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePollComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
