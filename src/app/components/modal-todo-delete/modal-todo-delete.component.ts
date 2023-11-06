import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-todo-delete',
  templateUrl: './modal-todo-delete.component.html',
  styleUrls: ['./modal-todo-delete.component.css']
})
export class ModalTodoDeleteComponent {
  @Input() todo: any; // Input to receive data from the parent component

  constructor(public modal: NgbActiveModal) { }

  confirmDelete() {
    this.modal.close('Confirm click');
  }
}
