import { Empresas } from "./empresas.model";
import { Permissoes } from "./permissoes.model";

export class Usuarios {

    id: number;
    nome: string;
    login: string;
    senha: string;
    csenha: string;
    status: boolean;
    empresaativa: string;
    idEmpresaativa: number;
    permissoes = new Array<Permissoes>();
    empresas = new Array<Empresas>();

}