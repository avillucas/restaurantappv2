import { Injectable } from '@angular/core';
import { Registro } from '../entities/registro';
import { AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';
import { map, filter, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {  waitForAsync } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class RegistrosService {
  readonly COLLECTION = 'registers';

  registros: Observable<Registro[]>;
  private registrosCollection: AngularFirestoreCollection<Registro>;

  constructor(private readonly fireStore: AngularFirestore) {
    this.registrosCollection = fireStore.collection<Registro>(this.COLLECTION);
    this.getRegistros();
  }
  
  delete(registroId: string): Promise<void> {
    return new Promise(
      waitForAsync((resolve, rejects) => {
        try {
          const result = this.registrosCollection.doc(registroId).delete();
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      })
    );
  }
  

  save(registro: Registro, registroId: string): Promise<void> {
    return new Promise((resolve, rejects) => {
        try {
          const id = registroId || this.fireStore.createId();
          const data = { id, ...registro };
          const result = this.registrosCollection.doc(id).set(data);
          resolve(result);
        } catch (err) {
          rejects(err.message);
        }
      });
  }

  async getEstadoRegistroByEmail(email: string) {
    const registro = await this.getByEmail(email);
    return (registro.aprobado === true);
  }

  
  async getByEmail(email: string) {
    let aux: Registro;
    await this.registros
      .pipe(first())
      .toPromise()
      .then((registros) => {
        registros.forEach((registro) => {          
          if (registro.email == email) {
            aux = registro;
          }
        });
      });
    return aux;
  }

  private getRegistros(): void {
    this.registros = this.registrosCollection
      .snapshotChanges()
      .pipe(
        map((actions) => actions.map((a) => a.payload.doc.data() as Registro))
      );
  }
}
