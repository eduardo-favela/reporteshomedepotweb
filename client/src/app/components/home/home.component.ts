import { Component, OnInit, ViewChild } from '@angular/core';
import { CentroscostosService } from 'src/app/services/centroscostos.service';
import { ProblemasService } from 'src/app/services/problemas.service';

import { ReportesService } from 'src/app/services/reportes.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private centroscostosService:CentroscostosService,private problemascomunesService:ProblemasService,private reportesService:ReportesService) { }
  ///////////////////////////////////AUTOCOMPLETES///////////////////////////////////
  keyword='descripcion'
  placeholder='Buscar una sucursal...'
  puntosventavending : any = []
  placeholderRegion='Seleccionar una sucursal'
  inputsDisabled = false
  @ViewChild('inputRegiones') inputpventas;
  ///////////////////////////////////AUTOCOMPLETES///////////////////////////////////

  ///////////////////////////////////VARIABLES Y PROPIEDADES GLOBALES DE LA CLASE///////////////////////////////////
  tipomaq = ""
  plaza = null
  problemascomunes : any = null
  selectDisabled = false
  correo = null
  comentarios = null
  idpventa = ""
  problema = ""
  tiposmaq : any = null
  tiposmaqselect : any = []
  telefono=null
  numEmp = null
  nomEmp = null
  reporteid = null
  responsereporte : any
  dia : any = null
  hora : any = null
  ///////////////////////////////////VARIABLES Y PROPIEDADES GLOBALES DE LA CLASE///////////////////////////////////

  ngOnInit(): void {
    this.getPuntosVentaKiosko()
    this.getProblemasComunesVending()
  }

  getProblemasComunesVending(){
    this.selectDisabled=true
    this.problemascomunesService.getProblemasVending().subscribe(
      res=>{
        this.problemascomunes=res
        this.selectDisabled=false
      },
      err=>{
        console.log('ocurrió un error')
      }
    )
  }

  getPuntosVentaKiosko(){
    this.inputsDisabled = true
    this.centroscostosService.verCentrosCostosTodos().subscribe(
      res=>{
        this.puntosventavending = res
        this.inputsDisabled = false
      },
      err=>{
        console.log('ocurrió un error')
      }
    )
  }
  
  clearInputs(){
    this.inputpventas.clear()
    this.numEmp=null
    this.nomEmp=null
    this.idpventa=""
    this.problema=""
    this.correo=null
    this.telefono=null
    this.comentarios=null
    this.plaza=null
  }

  registraReporte(){
    /* console.log(moment().format('hh:mm A')) */
    if(this.numEmp&&this.nomEmp&&this.idpventa&&this.problema&&this.correo&&this.telefono&&this.comentarios){
      this.reportesService.registraReporte({problema_reportado:this.problema, puntoventa:this.idpventa, fecha:moment().format('YYYY-MM-DD'), num_emp:this.numEmp, nombre_report:this.nomEmp, comentarios:this.comentarios, correo_contacto:this.correo, telcontacto:this.telefono}).subscribe(
        res=>{
          console.log(res)
          this.responsereporte=res
          this.reporteid=this.responsereporte.insertId
          this.enviarCorreo({email:this.correo,folioreporte:this.reporteid})
          this.dia=moment().format('DD-MM-YYYY')
          this.hora=moment().format('hh:mm A')
          this.clearInputs()
          $('#nuevoReporteModal').modal('show')
        },
        err=>{
          alert('Ocurrió un error al registrar el reporte')
        }
      )
    }
    else{
      alert('Se deben llenar todos los campos para registrar un reporte')
    }
  }

  enviarCorreo(reporte){
    this.reportesService.enviarEmail({fecha:moment().format('DD-MM-YYYY'),folio:reporte.folioreporte,hora:moment().format('hh:mm A'),email:reporte.email}).subscribe(
      res=>{
        if(res.hasOwnProperty('Ok')){
          console.log('se envió el correo con éxito')
        }
      },
      err=>{
        console.log('ocurrió un error')
      }
    )
  }

  getTiposMaq(sucursal){
    this.centroscostosService.gettiposmaqvending({sucursal:sucursal}).subscribe(
      res=>{
        this.tiposmaq=res
        this.tiposmaqselect=[]
        for (let index = 0; index < this.tiposmaq.length; index++) {
          if (!this.tiposmaqselect.some(e => e.tipo_maq === this.tiposmaq[index].tipo_maq)) {
            /* barChartData contains the element we're looking for */
            this.tiposmaqselect.push(this.tiposmaq[index])
          }
        }
      },
      err=>{
        console.log('Ocurrió un error')
      }
    )
  }

  ///////////////////////////////////AUTOCOMPLETES///////////////////////////////////
  selectEventPventaVending(item){
    this.plaza=item.plaza
    this.getTiposMaq(item.descripcion)
  }



  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onCleared(e){
    this.inputpventas.close()
  }

  onFocusedRegion(e){
    // do something when input is focused
    this.inputpventas.open()
  }
  ///////////////////////////////////AUTOCOMPLETES///////////////////////////////////
}
