import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  public title = 'Polling Fun';

  constructor() {}

  ngOnInit() {
    console.log('app loaded')
  }
}
