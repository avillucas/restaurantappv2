import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../services/turnos.service';
import { Turno } from '../../entities/turno';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { UsersService } from '../../services/users.service';
import { EmailService } from '../../services/email.service';
import { ToastService } from '../../services/toast.service';
import { SpinnerService } from '../../services/spinner.service';
import { SysError } from '../../entities/sysError';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  turnos:Observable<Turno[]>;

  constructor(
    public turnosService: TurnosService,
    public loginService: LoginService,
    public usersService: UsersService,
    public emailService: EmailService,
    public toastService:ToastService,
    private spinnerService:SpinnerService,    
  ) { 
    this.turnos = this.turnosService.turnos;    
  }

  ngOnInit() {
  }

  aceptarCliente(turno: Turno) {
    this.spinnerService.mostrarSpinner();
    this.turnosService.aceptarCliente(turno.uid).then( turnos => {        
        this.usersService.moverAListaEspera(turno.uid);
        this.spinnerService.ocultarSpinner();        
        this.toastService.presentSuccess('El usuario fue movido a la lista de espera.');
    }).catch((error) => {
      throw new SysError('No pudo autenticarse al nuevo usuario.');
    });    
  }

}
