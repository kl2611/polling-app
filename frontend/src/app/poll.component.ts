import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'poll-question',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class PollComponent {
  public title = 'Polling Fun';
  private getPollsURL: string = "http://localhost:5000/api/polls";
  private polls: any;
  private pollLength: Number = 0;
  private randomPollNumber;
  private currentPoll: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('app loaded')
    this.http.get(this.getPollsURL).subscribe(data => {
      this.polls = data;
      console.log('polls', this.polls);
      this.pollLength = this.polls.length;
      this.generateRandomNumber(this.pollLength);
      this.renderRandomPoll(this.randomPollNumber);
    })
  }

  generateRandomNumber(number: any) {
    let range = parseInt(number);
    this.randomPollNumber = Math.floor(Math.random() * (range))
    console.log(this.randomPollNumber);
  }

  renderRandomPoll(number: any) {
    this.currentPoll = this.polls[number];
    console.log(this.currentPoll);
  }
}
