import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {IMyDpOptions, IMyDateModel, IMyInputFocusBlur, IMyDate} from 'mydatepicker';

declare let jQuery: any;

@Component({
  selector: 'app-consult',
  templateUrl: './consult.component.html',
  styleUrls: ['./consult.component.css']
})
export class ConsultComponent implements OnInit {

  rForm: FormGroup;
  model:any;
  titleAlert: string = "Campo requerido";
  date: Date = new Date();

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
    disableSince: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()}
  };

  constructor(private fb: FormBuilder, private _route: Router) { 

    this.rForm = fb.group({
      'empresa': [null, Validators.required],
      'nit': [null, Validators.required],
      'salario': [null, Validators.required],
      'fecha': [null, Validators.required]
    });

  }

  ngOnInit() {
    console.log(this.date.getMonth() + 1, this.date.getDate(), this.date.getFullYear(), this.date.getUTCDate, this.date)
  }

  consultCredit(post){
    console.log(post)
    let date = post.fecha.formatted;
    let val = this.validateDate(date);
    let valorAprobado;
    console.log(Number(post.salario))
    if(val > 18 && Number(post.salario) > 800000){
      if(Number(post.salario) > 800000 && Number(post.salario) < 1000000) {
        valorAprobado = 5000000;
      } else { if(Number(post.salario) > 1000000 && Number(post.salario) < 4000000) {
        valorAprobado = 20000000;
      } else if(Number(post.salario) > 4000000) {
        valorAprobado = 50000000;      
      }
      }
    } else{
      valorAprobado = 0;
    }
    this.printMessage(valorAprobado);
  }

  printMessage(valor){
    if(valor == 0){
      swal(
        '¡Lo sentimos!, tu crédito no fue aprobado',
        '',
        'warning'
      )
    } else {
      swal({
        title: '¡Felicitaciones!, Tu crédito ha sido aprobado por un valor de $' + valor,
        text: '',
        type: 'success',
      }).then((result) => {
        if (result.value) {
          this._route.navigate(['/register'])
        } 
      })
    }
  }

  validateDate(fechaingreso){
    let splitted = fechaingreso.split('-',3)
    let fecha = new Date( )
    fecha.setDate(splitted[2]);
    fecha.setFullYear(splitted[0]);
    fecha.setMonth(splitted[1])
    this.date.setMonth( this.date.getMonth() + 1);
    var diff =(this.date.getTime() - fecha.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7 * 4);
    return Math.abs(Math.round(diff));
  }

  onDateChanged(event: IMyDateModel) {
    this.model = event.formatted ;
    console.log(this.model)
  }

  validate(salario){
    if(Number(salario) > 100000000){
      swal(
        '¡El salario no debe exceder $100.000.000!',
        '',
        'warning'
      )
    }
  }

}
