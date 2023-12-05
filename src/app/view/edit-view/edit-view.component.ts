import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.scss'],
})
export class EditViewComponent {
  constructor(
    private _routerStateSnapshot: ActivatedRoute,
    private _todoSrv: TodoService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    const { _id } = this._routerStateSnapshot.snapshot.params;

    if (!_id) this._router.navigate(['/']);

    this._todoSrv.getElementById(_id).subscribe({
      error: () => {
        this._router.navigate(['']);
      },
    });
  }
}
