import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FilterService, LazyLoadEvent, MenuItem, PrimeNGConfig } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FiltrosProducao } from 'src/app/core/models/filtro.model';
import { Operador } from 'src/app/core/models/operador.model';
import { Regex } from 'src/app/core/validators/regex';
import { AuthService } from '../../seguranca/auth.service';
import { ValidationService } from 'src/app/core/service/validation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProducaoService } from '../producao.service';
import * as moment from 'moment';
import { OperadorService } from '../../operador/operador.service';
import { FiltroproducaoService } from 'src/app/core/service/filtros/filtroproducao.service';

@Component({
  selector: 'app-producao-lista',
  templateUrl: './producao-lista.component.html',
  styleUrls: ['./producao-lista.component.css']
})
export class ProducaoListaComponent implements OnInit {

   // @ViewChild('tabela', { static: true }) table: Table;
   @ViewChild('tabela') table: Table;
   @ViewChild('paginator') paginator: Paginator;
   @ViewChild('buttonFilter') buttonFilter: ElementRef;

   regex = new Regex();
  rowsPerPageTable: number[] = [10, 25, 50, 100, 200];
  rangeDates: Date[];
  operador: Operador[];
  producoes = [];
  cols = [];
  colsItens = [];
  sinal = true;
  totalExames: number;
  atendimento: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  restoringFilter: boolean;
  status = 'Ativo';
  messageDrop = 'Nenhum resultado encontrado...';
  valorTooltip = 'Inativos';
  displayExames: boolean;
  messagePageReport = 'Mostrando {first} a {last} de {totalRecords} registros';
  items: MenuItem[];
  selectedProducao: any;
  rangeDatesFiltroDataprivicao: Date[];
  rangeDatesFiltroDataproducao: Date[];
  rangeDatesFiltroGravacao: Date[];
  totalRegistros = 0;
  totalPages = 0;
  first = 1;
  filtro = new FiltrosProducao();
  timeout: any;
  dataprevisaode: string;
  dataprevisaoate: string;
  dataproducaode: string;
  dataproducaoate: string;
  blockBtnFilter = false;
 

  constructor(
    private producaoService: ProducaoService,
    private title: Title,
   // private relatoriosService: RelatoriosService,
    private errorHandler: ErrorHandlerService,
    private filterService: FilterService,
    public auth: AuthService,
    private conf: PrimeNGConfig,
    private validationService: ValidationService,
    private spinner: NgxSpinnerService,
    private filtroProducao: FiltroproducaoService,
    private operadorService: OperadorService
  ) { }


  onClear() {
    this.cols.forEach(col => {
      if (col.qty === null || col.qty === undefined) { } else {
        col.qty = null;
      }
    });
    this.dataprevisaode = null;
    this.dataprevisaoate = null;
    this.dataproducaode = null;
    this.dataproducaoate = null;
    this.filtro = new FiltrosProducao();
    this.filtroDefault();
    this.carregarProducao();
  }


  ngOnInit() {
    this.filtroDefault();
    this.conf.ripple = true;
    this.title.setTitle('Produção');

    this.items = [
      {
        label: 'Ativo / Inativo',
        icon: 'pi pi-sort-alt',
        command: () => {
          this.AlternarLista();
        },
      }
    ];


    this.cols = [
      { field: 'id', header: 'Produção', width: '130px', type: 'numeric' },
      { field: 'nomeOperador', header: 'Operador', width: '200px', type: 'text' },
      { field: 'nomeProduto', header: 'Produto', width: '200px', type: 'text' },
      { field: 'nomeMaquina', header: 'Maquina', width: '110px', type: 'numeric' },
      { field: 'dataprevisao', header: 'Data Previsao', width: '150px', data: true, format: `dd/MM/yyyy`, type: 'date' },
      { field: 'dataproducao', header: 'Data Producao', width: '150px', data: true, format: `dd/MM/yyyy`, type: 'date' },
      { field: 'loginusuario', header: 'Usuário', width: '150px', type: 'text' },
      { field: 'datagravacao', header: 'Data Sistema', width: '150px', data: true, format: `dd/MM/yyyy H:mm`, type: 'date' }
    ];
    /* this.colsItens = [
      { field: 'acesso', header: 'Acesso' },
      { field: 'descricaoexame', header: 'Exame' },
      { field: 'descricaoconvenio', header: 'Convênio' },
      { field: 'dataatendimento', header: 'Data Atendimento', data: true, format: `dd/MM/yyyy` },
      { field: 'preco', header: 'Preço', currency: true, format: `BRL` },
      { field: 'desconto', header: 'Desconto', currency: true, format: `BRL` },
      { field: 'total', header: 'Total', currency: true, format: `BRL` }
    ]; */

    this.filterService.register('customCreatedDateFilter', (value: string, filter) => {

      if (this.dateRangeStart === value && this.dateRangeEnd === undefined) {
        return true;
      }

      if (this.dateRangeStart === value || this.dateRangeEnd === value) {
        return true;
      }

      if (
        this.dateRangeStart !== undefined &&
        this.dateRangeEnd !== undefined &&
        moment(this.dateRangeStart).isBefore(value) &&
        moment(this.dateRangeEnd).isAfter(value)) {
        return true;
      }

      return false;
    });

    //  this.carregarAtendimentos();
    // this.carregarUsers();

  }

  filtroDefault() {
    this.filtro.pagina = 0;
    this.filtro.itensPorPagina = 10;
    this.filtro.status = 'Ativos';
  }

  changePage(event: LazyLoadEvent) {
    this.filtro.pagina = event.first / event.rows;
    this.filtro.itensPorPagina = event?.rows;
    this.carregarProducao();
  }

  refresh() {
    this.carregarProducao();
  }

 /*  showItens(maquinaId: number) {
    this.producaoService.listarmaquinas(maquinaId)
      .then(obj => {
        this.itensAtend = obj;
      });
    this.displayExames = true;
  }
 */

/*   gerarAtendimento(atend: any) {
    this.relatoriosService.atendimento(atend.id.toString())
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        window.open(url);
      });
  } */


  carregarOperadores() {
    return this.operadorService.listarMoldes()
      .then(obj => {
        this.operador = obj
          .map(mp => ({ label: mp.nome, value: mp.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarProducao() {
    this.spinner.show();
    this.producaoService.listarComFiltro(this.filtro)
      .then(obj => {
        this.producoes = obj.content;
        this.totalRegistros = obj.totalElements;
        this.totalPages = obj.totalPages;
        this.producoes = this.validationService.formataAtivoeInativo(this.producoes);
        this.spinner.hide();
      })
      .catch((erro) => {
        this.spinner.hide();
        this.errorHandler.handle(erro);
      });

  }

  AlternarLista() {
    if (this.filtro.status === 'Ativos') {
      this.filtro.status = 'Inativos';
    } else {
      this.filtro.status = 'Ativos';
    }
    this.carregarProducao();
  }


  searchData(tipo: string) {
    if (tipo === 'dataprevisaode') {
      if (this.dataprevisaode && this.dataprevisaode.length === 10) {
        const dia = this.dataprevisaode.substring(0, 2);
        const mes = this.dataprevisaode.substring(3, 5);
        const ano = this.dataprevisaode.substring(6, 10);
        this.filtro.dataprevisaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.dataprevisaode = '';
      }
    }
    if (tipo === 'dataprevisaoate') {
      if (this.dataprevisaoate && this.dataprevisaoate.length === 10) {
        const dia = this.dataprevisaoate.substring(0, 2);
        const mes = this.dataprevisaoate.substring(3, 5);
        const ano = this.dataprevisaoate.substring(6, 10);
        this.filtro.dataprevisaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.dataprevisaoate = '';
      }
    }
    if (tipo === 'dataproducaode') {
      if (this.dataproducaode && this.dataproducaode.length === 10) {
        const dia = this.dataproducaode.substring(0, 2);
        const mes = this.dataproducaode.substring(3, 5);
        const ano = this.dataproducaode.substring(6, 10);
        this.filtro.dataproducaode = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.dataproducaode = '';
      }
    }
    if (tipo === 'dataproducaoate') {
      if (this.dataproducaoate && this.dataproducaoate.length === 10) {
        const dia = this.dataproducaoate.substring(0, 2);
        const mes = this.dataproducaoate.substring(3, 5);
        const ano = this.dataproducaoate.substring(6, 10);
        this.filtro.dataproducaoate = ano + '-' + mes + '-' + dia;
      } else {
        this.filtro.dataproducaoate = '';
      }
    }
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.carregarProducao();
      this.FirstPage();
    }, 800);
  }


  search(value: any) {
    if (this.timeout) { clearTimeout(this.timeout); }
    this.timeout = setTimeout(() => {
      this.applySearch(value);
    }, 800);
  }


  applySearch(value: any) {
    this.blockBtnFilter = true;
    if (
      value.qty === null ||
      value.qty === undefined
    ) {
      this.btnBlock();
    } else {
      this.filtroProducao.filtro(value, this.filtro).then((obj) => {
        this.filtro = obj;
        this.carregarProducao();
        this.FirstPage();
        this.btnBlock();
      }).catch((erro) => {
        this.spinner.hide();
        this.btnBlock();
        this.errorHandler.handle(erro);
      });
    }
  }

  FirstPage() {
    this.paginator.changePage(0);
  }

  verifyFocus() {
    this.buttonFilter.nativeElement.focus();
  }

  btnBlock() {
    setTimeout(() => {
      this.blockBtnFilter = false;
    }, 680);
  }


  limparData(tipo: string) {
    if (tipo === 'dataprevisao') {
      this.filtro.dataprevisaode = '';
      this.filtro.dataprevisaoate = '';
      this.dataprevisaode = '';
      this.dataprevisaoate = '';
    }
    if (tipo === 'dataproducao') {
      this.filtro.dataproducaode = '';
      this.filtro.dataproducaoate = '';
      this.dataproducaode = '';
      this.dataproducaoate = '';
    }

    this.carregarProducao();
  }

}
