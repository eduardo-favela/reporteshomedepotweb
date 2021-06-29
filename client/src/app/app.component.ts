import { Component, Input, OnInit } from '@angular/core';
import { on } from 'events';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  curDate: Date = new Date()
  public sessionStorage=sessionStorage;

  ngOnInit(){
    
  }
}
