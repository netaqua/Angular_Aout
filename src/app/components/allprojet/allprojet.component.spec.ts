import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllprojetComponent } from './allprojet.component';

describe('AllprojetComponent', () => {
  let component: AllprojetComponent;
  let fixture: ComponentFixture<AllprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
