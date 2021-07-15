import { nullSafeIsEquivalent, THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

import { CentroscostosService } from 'src/app/services/centroscostos.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-verreportes',
  templateUrl: './verreportes.component.html',
  styleUrls: ['./verreportes.component.css']
})
export class VerreportesComponent implements OnInit {

  constructor(private centrosCostosService:CentroscostosService,private reportesService:ReportesService) { }

  ngOnInit(): void {
    this.getSucursales()
    this.getEstatus()
  }
  
  ///////////////////////////////////VARIABLES Y PROPIEDADES GLOBALES DE LA CLASE///////////////////////////////////
  sucursales=null
  estatus=null
  folioreporte=null
  responsereportes : any = []
  reportes : any = []
  noInfo=true
  fecha1=null
  fecha2=null
  sucursal=null
  estatusrep=null
  ///////////////////////////////////VARIABLES Y PROPIEDADES GLOBALES DE LA CLASE///////////////////////////////////

  ///////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////

  getSucursales(){
    this.centrosCostosService.getsucursales().subscribe(
      res=>{
        this.sucursales=res
      },
      err=>{

      }
    )
  }

  getEstatus(){
    this.reportesService.getestatus().subscribe(
      res=>{
        //console.log(res)
        this.estatus=res
      },
      err=>{
        alert("ocurrió un error al obtener los estatus")
      }
    )
  }

  buscaReporteFolio(folioreporte){
    this.folioreporte=folioreporte
    this.reportesService.getreportefolio({folio:this.folioreporte}).subscribe(
      res=>{
        //console.log(res)
        this.responsereportes=res
        if(this.responsereportes.length>0){
          this.reportes=this.responsereportes
          this.noInfo=false
          $('#folioreporte').val('')
        }
        else{
          this.noInfo=true
          $('#noreportemodal').modal('show')
        }
      },
      err=>{
        alert("Ocurrió un error con la consulta")
      }
    )
  }

  buscaReportes(){
    if(this.fecha1&&this.fecha2&&this.sucursal&&this.estatusrep){
      let sucursal, estatusrep
      sucursal=(this.sucursal=="Todos"?(this.sucursales.map(a => a.estado)):(this.sucursal))
      estatusrep=(this.estatusrep=="Todos"?(this.estatus.map(a => a.idestatus)):(this.estatusrep))
      this.reportesService.getreportesvending({fecha1:this.fecha1,fecha2:this.fecha2,sucursal:sucursal,estatus:estatusrep}).subscribe(
        res=>{
          console.log(res)
          this.responsereportes=res
          if(this.responsereportes.length>0){
            this.reportes=this.responsereportes
            this.noInfo=false
          }
        },
        err=>{
  
        }
      )
    }
    else{
      alert("Se deben llenar todos los campos pra la búsqueda (fechas, sucursal y estatus)")
    }
  }

  ///////////////////////////////////////////////////FUNCIONES//////////////////////////////////////////////////////
}