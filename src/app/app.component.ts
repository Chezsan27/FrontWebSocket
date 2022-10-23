import {Component, OnInit} from '@angular/core';
import {concatMap, map, Observable} from "rxjs";
import {SocketServiceService} from "./socket-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontWebSocket';
  users: Observable<any[]> | undefined;
  news: Observable<any[]> | undefined;
  userName: string = "asanchezr";
  name: string = 'Alberto';
  isOnline: boolean = false;

  constructor(private socket: SocketServiceService) {}

  ngOnInit(): void {
    this.users = this.socket
      .getClientId()
      .pipe(
        concatMap((clientId) =>
          this.socket
            .getUsersOnline()
            .pipe(map((users) => (users = users.filter((u) => u.id !== clientId)))
            )));
    this.news =  this.socket.getNews()
    console.log(this.news)
    this.news.subscribe((respose:any)=>{
      console.log(respose);
    });
  }
}
