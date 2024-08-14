import { Funcionario } from "./funcionario.model";
import { Maquina } from "./maquina.model";
import { Operador } from "./operador.model";
import { Produto } from "./produto.model";

export class Producao {
    id?: number;
    obs?: string;
    dataprevisao: Date;
    quantidade?: number;
    cor?: string;
    perda?: number;
    tempomaquina?: number;
    dataproducao?: Date;
    horainicio?: string;
    horafinal?: string;
    turno?: string;
    status?: boolean;
    operador = new Operador();
    maquina = new Maquina();
    produto = new Produto();
    funcionario = new Funcionario();
    loginusuario: string;
    datagravacao: Date;
}