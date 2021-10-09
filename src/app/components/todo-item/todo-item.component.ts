import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {Todo} from "../../model/todo";
import {TodosService} from "../../services/todos.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter()

  constructor(private todoService: TodosService) {
  }

  ngOnInit(): void {
  }

  setClasses() {
    return  {
      todo: true,
      'is-complete': this.todo.completed
    }
  }

  onToggle(todo: Todo) {
    // Toggle in UI
    todo.completed = !todo.completed;

    // Toggle on Server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo)
    })
  }

  onDelete(todo:Todo) {
    this.deleteTodo.emit(todo)
  }
}
