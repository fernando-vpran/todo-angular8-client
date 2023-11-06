import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTodoDeleteComponent } from './modal-todo-delete.component';

describe('ModalTodoDeleteComponent', () => {
  let component: ModalTodoDeleteComponent;
  let fixture: ComponentFixture<ModalTodoDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalTodoDeleteComponent]
    });
    fixture = TestBed.createComponent(ModalTodoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
