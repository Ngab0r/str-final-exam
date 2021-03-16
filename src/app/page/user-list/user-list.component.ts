import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Sorter } from 'src/app/model/sorter';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  // users$: Observable<User[]> = this.userService.getAll();
  // users$: BehaviorSubject<User[]> = this.userService.getAll();
  users$: BehaviorSubject<User[]> = this.userService.list$;
  filterPhrase: string = '';
  userList: User[] = [];
  list: User[] = [];
  sorter: Sorter = new Sorter();


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.sorter.sortKey = 'name';

    this.userService.getAll();
    this.users$.subscribe(list => {
      this.list = list;
    });
  }


  delete(user: User): void {
    if (confirm("Are you sure to delete " + user.name)) {
      this.userService.remove(user);
    }
  }

  onChangePhrase(event: Event): void {
    this.filterPhrase = (event.target as HTMLInputElement).value;
  }

  selectColumnForSort(col: string): void {
    this.sorter.sortKey === col ? this.sorter.sortAscend = !this.sorter.sortAscend : this.sorter.sortAscend = true;
    this.sorter.sortKey = col;
  }


}
