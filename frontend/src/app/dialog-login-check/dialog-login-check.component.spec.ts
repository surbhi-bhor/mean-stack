import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoginCheckComponent } from './dialog-login-check.component';

describe('DialogLoginCheckComponent', () => {
  let component: DialogLoginCheckComponent;
  let fixture: ComponentFixture<DialogLoginCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLoginCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLoginCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
