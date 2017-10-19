import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { RouterModule, Routes }  from '@angular/router';
import { AppComponent } from './app.component';
import { PollComponent } from './poll.component';
import { PollResultsComponent } from './poll-results.component';

@NgModule({
  declarations: [
    AppComponent,
    PollComponent,
    PollResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'results/:id',
        component: PollResultsComponent
      },
      {
        path: 'home',
        component: PollComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
