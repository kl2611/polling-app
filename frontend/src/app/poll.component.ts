import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'poll-component',
  templateUrl: './poll.component.html',
  styleUrls: ['./app.component.css']
})

export class PollComponent {
  public submitted = false;
  public selected: any;

  private getPollsURL: string = "http://localhost:5000/api/polls";
  private pollLength: Number = 2;
  // Fixed number representing number of questions in polls to reduce calls to database
  private randomPollNumber: Number; 
  private currentPoll: any; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    console.log('form loaded')
    this.generateRandomNumber(this.pollLength);
    this.renderRandomPoll(this.randomPollNumber);
  }

  generateRandomNumber(number: any) {
    let range = parseInt(number);
    this.randomPollNumber = Math.floor(Math.random() * (range) + 1)
    console.log(this.randomPollNumber);
  }

  renderRandomPoll(number: any) {
    console.log(this.randomPollNumber);
    let currentPollURL = this.getPollsURL + '/' + number.toString();
    this.http.get(currentPollURL).subscribe(data => {
      this.currentPoll = data;
      console.log('polls', this.currentPoll);
    })
  }

  onSubmit() {
    console.log(this.selected);
    // this.submitted = true;
  }
}
