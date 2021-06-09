import { Injectable } from '@angular/core';
import { LectorqrService } from './lectorqr.service';
import { SupportedFormat } from '@capacitor-community/barcode-scanner';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class LectorQrListaEsperaService  extends LectorqrService{

  constructor(
    alertService:AlertService
    ) { 
    super(alertService);    
  }

  protected traerFormatosAceptados(): [SupportedFormat] {
    return [SupportedFormat.QR_CODE];
  }

  async escanear(){
    const codigo = await super.scan();
    const json = JSON.parse( codigo);
    console.log('codigo:',json);
    //@todo probar esto para ver si se lo puede leer asi 
    return (json.agregarListaEspera == true);
  }

  
}