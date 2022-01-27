import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { value } from 'src/app/model/model.league';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leagues',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
})
export class LeagueComponent implements OnInit {
  public form!: FormGroup;
  public informacionLeague = {
    lea_id: -1,
    lea_name: '',
    lea_country: '',
    lea_creation: '',
  };
  private querySubscription!: Subscription;
  leagues: any;
  loading = true;
  error: any;

  constructor(private apollo: Apollo, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.cargarLeagues();
    this.form = this.formBuilder.group({
      txtName: [''],
      txtCountry: [''],
      txtCreation: [''],
    });
  }

  public cargarLeagues(): void {
    this.querySubscription = this.apollo
      .watchQuery({ query: value.getLeagues })
      .valueChanges.subscribe((result: any) => {
        this.leagues = result?.data?.getLeague;
        this.loading = result.loading;
        this.error = result.error;
      });
  }

  public crearLeague() {
    this.apollo
      .mutate({
        mutation: value.createLeague,
        variables: {
          league: {
            lea_name: this.form.value.txtName,
            lea_country: this.form.value.txtCountry,
            lea_creation: this.form.value.txtCreation,
          },
        },
      })
      .subscribe((result: any) => {
        console.log('Liga Creada Correctamente');
        this.cargarLeagues();
        location.reload();
      });
  }

  public eliminarLeague(lea_id: any) {
    this.apollo
      .mutate({
        mutation: value.deleteLeague,
        variables: {
          lea_id,
        },
      })
      .subscribe((result: any) => {
        console.log('Liga Eliminada Correctamente');
        this.cargarLeagues();
        location.reload();
      });
  }

  public actualizarLeague(lea_id: any) {
    this.apollo
      .mutate({
        mutation: value.updateLeague,
        variables: {
          lea_id,
          league: {
            lea_name: this.form.value?.txtName,
            lea_country: this.form.value?.txtCountry,
            lea_creation: this.form.value?.txtCreation,
          },
        },
      })
      .subscribe((result: any) => {
        console.log('Liga Actualizada Correctamente');
        this.cargarLeagues();
        location.reload();
      });
  }

  public infoUpdateLeague(
    lea_id: any,
    lea_name: any,
    lea_country: any,
    lea_creation: any
  ) {
    this.informacionLeague.lea_id = lea_id;
    this.informacionLeague.lea_name = lea_name;
    this.informacionLeague.lea_country = lea_country;
    this.informacionLeague.lea_creation = lea_creation;
  }
}
