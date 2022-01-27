import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-leagues',
  template: `
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="error">Error :(</div>
    <div *ngIf="leagues">
      <div *ngFor="let league of leagues">
        <p>{{ league.name }}: {{ league.country }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./league.component.css'],
})
export class LeagueComponent implements OnInit {
  leagues: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getLeague(id: 1) {
              lea_name
              lea_country
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.leagues = result?.data?.leagues;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
