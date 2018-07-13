import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from '../service/connection.service';
import swal from 'sweetalert2';
import {IMyDpOptions, IMyDateModel, IMyInputFocusBlur, IMyDate} from 'mydatepicker';


declare let jQuery: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  titleAlert: string = "Campo requerido";
  conect: any = [];
  _date: any; model: any;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  constructor(private fb: FormBuilder, private _register: ConnectionService, private _route: Router) { 

    this.rForm = fb.group({
      'id': [null, Validators.required],
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
      'fecha': [null, Validators.required]
    });

  }

  ngOnInit() {

  }

  registerUser(post){
    if (post) {    
      let splitted;
      splitted = this.model.split('-',3);
      console.dir(splitted)
      let res = 2018 - Number(splitted[0]) ;
      console.log(res)
      if(res > 18){
        this.conect = {'id': post.id, 'nombre': post.nombre, 'apellido': post.apellido, 'fecha': this.model};
        this._register.signin(this.conect).subscribe(data =>{
          console.log(data._body)
          if(data._body == "Registro creado"){
            swal({
              title: 'Registro creado con éxito',
              text: '',
              type: 'success',
            }).then((result) => {
              if (result.value) {
                this._route.navigate(['/consult'])
              } 
            })
          } else if (data._body == "Duplicado"){
            swal(
              '¡Ya se encuentra registrado!',
              '',
              'warning'
            )
          } 
        },
        error => {
          swal(
            'Datos incorrectos',
            '',
            'warning'
          )
          
        });
      } else {
        swal(
          '¡Debes ser mayor de 18 años para registrarte!',
          '',
          'warning'
        )
      }
      }
  }

  onDateChanged(event: IMyDateModel) {
    this.model = event.formatted ;
    console.log(this.model)
  }


}
