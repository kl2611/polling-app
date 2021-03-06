import { Component, AfterContentInit, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'poll-results',
  templateUrl: './poll-results.component.html',
  styleUrls: ['./app.component.sass']
})

export class PollResultsComponent {
  constructor(private http: HttpClient, 
              private route: ActivatedRoute,
              private elementRef: ElementRef) {}
  id: number;
  private sub: any;
  private getPollsURL: string = "http://localhost:5000/api/polls";
  private resultsPoll: any;
  private total_vote_count: number;

  ngOnInit() {
    // Init results page for id passed after submit
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      // console.log(params)
      this.getData();
    });
  }

  getData() {
    if (this.id) {
      let currentPollURL = this.getPollsURL + '/' + this.id;
      this.http.get(currentPollURL).subscribe(data => {
        this.resultsPoll = data;
        this.total_vote_count = this.resultsPoll.total_vote_count;
        // console.log('polls', this.resultsPoll);
        this.renderGraph();
      })
    }
  }

  renderGraph() {
    // Stores a percentage calculation and CSS property to option property
    var total_vote_count = this.total_vote_count;
    for (var i = 0; i < this.resultsPoll.options.length; i++) {
      this.resultsPoll.options[i].progress = Math.round((this.resultsPoll.options[i].vote_count / total_vote_count) * 100) || 0
      this.resultsPoll.options[i].current = {width: this.resultsPoll.options[i].progress+"%"}
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
