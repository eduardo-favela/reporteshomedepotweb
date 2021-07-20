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
  tipomaq = null
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
  nomEmp = null
  reporteid = null
  responsereporte : any
  dia : any = null
  hora : any = null
  ///////////////////////////////////VARIABLES Y PROPIEDADES GLOBALES DE LA CLASE///////////////////////////////////

  ngOnInit(): void {
    this.getPuntosVentaVending()
    this.getProblemasComunesVending()
    this.getTiposMaq()
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

  getPuntosVentaVending(){
    this.inputsDisabled = true
    this.centroscostosService.verCentrosCostosTodos().subscribe(
      res=>{
        console.log(res)
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
    this.nomEmp=null
    this.idpventa=""
    this.problema=""
    this.correo=null
    this.telefono=null
    this.comentarios=null
    this.plaza=null
    this.tipomaq=null
    $('#telefono').removeClass('is-valid')
    $('#telefono').removeClass('is-invalid')
  }

  registraReporte(){
    if(this.nomEmp&&this.idpventa&&this.problema&&this.correo&&this.telefono&&this.comentarios){
      if(this.telefono.toString().length==10){
        this.reportesService.registraReporte({estatus:1,tipomaq:this.tipomaq,problema_reportado:this.problema, puntoventa:this.idpventa, nombre_report:this.nomEmp, comentarios:this.comentarios, correo_contacto:this.correo, telcontacto:this.telefono.toString()}).subscribe(
          res=>{
            console.log(res)
            this.responsereporte=res
            this.reporteid=this.responsereporte.insertId
            this.registrahistorial(this.reporteid)
            this.enviarCorreo({email:this.correo,folioreporte:this.reporteid})
            this.enviarCorreoInterno({email:this.correo,folioreporte:this.reporteid})
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
        alert("El número de teléfono no es válido")
      }
    }
    else{
      console.log(this.nomEmp,this.idpventa,this.problema,this.correo,this.telefono,this.comentarios)
      alert('Se deben llenar todos los campos para registrar un reporte')
    }
  }
  
  registrahistorial(reporte){
    this.reportesService.registrahistorial({estatus:1,reportevending:reporte}).subscribe(
      res=>{
        console.log('historial registrado con exito')
      },
      err=>{
        console.log('ocurrió un error')
      }
    )
  }

  enviarCorreo(reporte){
    this.reportesService.enviarEmail({fecha:moment().format('DD-MM-YYYY'),folio:reporte.folioreporte,hora:moment().format('hh:mm A'),email:reporte.email}).subscribe(
      res=>{
        if(res.hasOwnProperty('Ok')){
          console.log('se envió el correo con éxito')
        }
      },
      err=>{
        alert('ocurrió un error')
      }
    )
  }
  enviarCorreoInterno(reporte){
    let emailspruebas='e.favela@kiosko.com.mx'
    let sucursal=$('#inputSucursal').find('input:text').val()
    let problema=$('#problema option:selected').text()
    let maquina=$('#tipomaq option:selected').text()
    let ciudad= $('#plaza').val() 
    let reportecontents = {comments:this.comentarios,ciudad:ciudad,maq:maquina,problema:problema,correo:this.correo,telefono:this.telefono.toString(), persona:this.nomEmp, sucursal:sucursal,
      fecha:moment().format('DD-MM-YYYY'),folio:reporte.folioreporte,hora:moment().format('hh:mm A'),email:emailspruebas}
    console.log(reportecontents)  
    this.reportesService.enviarEmailinterno(reportecontents).subscribe(
      res=>{
        if(res.hasOwnProperty('Ok')){
          console.log('se envió el correo con éxito')
        }
      },
      err=>{
        alert('ocurrió un error')
      }
    )
  }

  getTiposMaq(){
    this.centroscostosService.gettiposmaqvending().subscribe(
      res=>{
        this.tiposmaqselect=res
      },
      err=>{
        alert('Ocurrió un error')
      }
    )
  }

  onKeyUpNoTel(){
    if(this.telefono){
      let telefono=this.telefono.toString()
      if(telefono.length < 10 || telefono.length > 10){
        $('#telefono').removeClass('is-valid')
        $('#telefono').addClass('is-invalid')
      }
      else if(telefono.length==10){
        $('#telefono').removeClass('is-invalid')
        $('#telefono').addClass('is-valid')
      }
    }
    else{
      $('#telefono').removeClass('is-valid')
      $('#telefono').removeClass('is-invalid')
    }
  }

  ///////////////////////////////////AUTOCOMPLETES///////////////////////////////////
  selectEventPventaVending(item){
    this.plaza=item.plaza
    this.idpventa=item.idtienda
    /* this.getTiposMaq(item.descripcion) */
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
