import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { value } from 'src/app/model/model.team';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  public form!: FormGroup;
  public informacionTeam = {
    tea_id: -1,
    tea_name: '',
    tea_country: '',
    tea_fundation: '',
  };
  private querySubscription!: Subscription;
  teams: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cargarTeams();
    this.form = this.formBuilder.group({
      txtName: [''],
      txtCountry: [''],
      txtFundation: [''],
    });
  }

  public cargarTeams(): void {
    this.querySubscription = this.apollo
      .watchQuery({ query: value.getTeams })
      .valueChanges.subscribe((result: any) => {
        this.teams = result?.data?.getTeam;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  public crearTeam() {
    this.apollo
      .mutate({
        mutation: value.createTeam,
        variables: {
          team: {
            tea_name: this.form.value.txtName,
            tea_country: this.form.value.txtCountry,
            tea_fundation: this.form.value.txtFundation,
          },
        },
      })
      .subscribe((result: any) => {
        console.log('Equipo Creada Correctamente');
        this.cargarTeams();
      });
  }

  public eliminarTeam(tea_id: any) {
    this.apollo
      .mutate({
        mutation: value.deleteTeam,
        variables: {
          tea_id,
        },
      })
      .subscribe((result: any) => {
        console.log('Equipo Eliminada Correctamente');
        this.cargarTeams();
      });
  }

  public actualizarTeam(tea_id: any) {
    this.apollo
      .mutate({
        mutation: value.updateTeam,
        variables: {
          tea_id,
          team: {
            tea_name: this.form.value?.txtName,
            tea_country: this.form.value?.txtCountry,
            tea_fundation: this.form.value?.txtFundation,
          },
        },
      })
      .subscribe((result: any) => {
        console.log('Equipo Actualizada Correctamente');
        this.cargarTeams();
      });
  }

  public infoUpdateTeam(
    tea_id: any,
    tea_name: any,
    tea_country: any,
    tea_fundation: any
  ) {
    this.informacionTeam.tea_id = tea_id;
    this.informacionTeam.tea_name = tea_name;
    this.informacionTeam.tea_country = tea_country;
    this.informacionTeam.tea_fundation = tea_fundation;
  }
}
