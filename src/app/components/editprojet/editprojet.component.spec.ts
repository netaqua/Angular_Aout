import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprojetComponent } from './editprojet.component';

describe('EditprojetComponent', () => {
  let component: EditprojetComponent;
  let fixture: ComponentFixture<EditprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
