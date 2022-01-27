import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { value } from 'src/app/model/model.league';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-league-teams',
  templateUrl: './team-league.component.html',
  styleUrls: ['./team-league.component.css'],
})
export class LeagueTeamComponent implements OnInit {
  public form!: FormGroup;
  leagueTeams: any;
  teams: any;

  //para obtener datos
  public idLeague!: number;
  public nameLeague!: '';
  public idTeam!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idLeague = parseInt(params['lea_id']);
      this.nameLeague = params['lea_name'];
    });
    this.cargarLeagueTeams();
    this.cargarTeams();
    this.form = this.formBuilder.group({
      teamsSelected: [],
      teamPrincipal: false,
    });
  }

  public cargarLeagueTeams() {}

  public cargarTeams() {}

  public postLeagueTeams() {}

  public deleteLeagueTeams(tea_lea_id: any) {}
}
