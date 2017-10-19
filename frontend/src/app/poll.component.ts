import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'poll-component',
  templateUrl: './poll.component.html',
  styleUrls: ['./app.component.sass']
})

export class PollComponent {
  public selected: any;

  private getPollsURL: string = "http://localhost:5000/api/polls";
  private voteURL: string = "http://localhost:5000/api/polls/vote"
  private pollLength: Number = 6; // Demo use only: Fixed number representing number of questions in polls to reduce calls to database
  private randomPollNumber: Number; 
  private currentPoll: any; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log('form loaded');
    this.generateRandomNumber(this.pollLength);
    this.renderRandomPoll(this.randomPollNumber);
  }


  generateRandomNumber(number: any) {
    let range = parseInt(number);
    this.randomPollNumber = Math.floor(Math.random() * (range) + 1)
  }

  renderRandomPoll(number: any) {
    // GET request to fetch poll with the random number ID
    console.log('random poll number', this.randomPollNumber);
    let currentPollURL = this.getPollsURL + '/' + number.toString();
    this.http.get(currentPollURL).subscribe(data => {
      this.currentPoll = data;
      console.log('polls', this.currentPoll);
    })
  }

  onSubmit() {
    var data = {
      'poll_id': this.currentPoll.id,
      'poll_title': this.currentPoll.title,
      'option': this.selected
    };

    // console.log(this.selected, data);

    // PATCH request to increment counter
    this.http.patch(this.voteURL, {
      data: data
    }).subscribe(
      (val) => {
        console.log('PATCH call successful', val)
        this.router.navigate(['/results', this.currentPoll.id])       
      },
      response => {
        console.log('error', response)
      },
      () => {
        console.log('patch completed')
      }
    )
  }
}
