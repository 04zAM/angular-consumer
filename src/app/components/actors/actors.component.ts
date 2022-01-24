import { Component, OnInit } from '@angular/core';
import { ModelActors } from 'src/app/model/model.actors';
import { ActorsService } from 'src/app/services/actors.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent implements OnInit {
  actors: ModelActors[] = [];

  public form!: FormGroup;

  public informacionActor = {
    act_id: -1,
    act_name: '',
    act_country: '',
    act_state: true,
  };

  constructor(
    private actorsService: ActorsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarActores();
    this.form = this.formBuilder.group({
      txtname: [''],
      txtcountry: [''],
      txtstate: [true],
    });
  }

  public cargarActores() {
    this.actorsService
      .getActors()
      .subscribe((actor: any) => (this.actors = actor));
  }

  public crearActor() {
    this.actorsService
      .postActor({
        act_name: this.form.value.txtname,
        act_country: this.form.value.txtcountry,
        act_state: this.form.value.txtstate,
      })
      .subscribe((res) => {
        console.log('Actor creado correctamente');
        this.cargarActores();
      });
  }

  public eliminarActor(act_id: any) {
    this.actorsService.deleteActor(act_id).subscribe((res) => {
      console.log('Actor eliminado correctamente');
      this.cargarActores();
    });
  }

  public actualizarActor(act_id: any) {
    this.actorsService
      .putUpdateActor({
        act_id: act_id,
        act_name: this.form.value.txtname,
        act_country: this.form.value.txtcountry,
        act_state: this.form.value.txtstate,
      })
      .subscribe((res) => {
        console.log('Actor actualizado correctamente');
        this.cargarActores();
      });
  }

  public infoUpdateActors(
    act_id: any,
    act_name: any,
    act_country: any,
    act_state: any
  ) {
    this.informacionActor.act_id = act_id;
    this.informacionActor.act_name = act_name;
    this.informacionActor.act_country = act_country;
    this.informacionActor.act_state = act_state;
  }
}
