import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../service/connection.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  rForm: FormGroup;
  titleAlert: string = "Campo requerido";
  conect: any = [];

  constructor(private fb: FormBuilder, private _register: ConnectionService) { 

    this.rForm = fb.group({
      'id': [null, Validators.required],
      'nombre': [null, Validators.required],
      'apellido': [null, Validators.required],
    });

  }

  ngOnInit() {
  }

  registerUser(post){
    console.log(post.nombre)
    if (post) {    
      this.conect = {'id': post.id, 'nombre': post.nombre, 'apellido': post.apellido};
      this._register.signin(this.conect).subscribe(data =>{
        if(data = "Registro creado"){
          swal({
            title: 'Registro creado con éxito',
            text: '',
            type: 'success',
            onClose: function reload() {
                      location.reload();
                    }
          })
        }
      },
      error => {
        swal(
          'Error con tu nombre de usuario y/o contraseña',
          '',
          'warning'
        )
        
      });
    }
  }

}
