import { Producto, ProductoTipo } from "./producto";
import { User } from "./user";

export class Pedido {
    uid?: string;
    uidCliente: string;
    producto: Producto[];
    tiempoElaboracionFinal: number;
    estadoPedido: Estado;
    precioFinal:number;
    uidMesa?:string;
    nombreMesa?:string;
}

export enum Estado{
    ENPREPARACION = 'EN PREPARACION',
    LISTO = "LISTO",
    PENDIENTE = "PENDIENTE",
    CONFIRMADO = "CONFIRMADO",
    PREPARADO = 'PREPARADO',
    PAGADO = 'PAGADO',
    ENTREGADO = 'ENTREGADO',
    APAGAR = 'APAGAR',
    PENDIENTEPAGO = 'PENDIENTEPAGO'
}