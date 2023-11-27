import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './services/order.service';
import * as dayjs from 'dayjs';
import * as QRCode from 'qrcode-generator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'chill-web';


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe((e:any)=>{
      console.log(e)
      if(e.order){
        this.getOrder(e?.order)
      }
    })

    console.log(window.location.host)
  }

  order:any = null;
  displayedColumns: string[] = ['Producto', 'Cant.', 'Precio'];
  dataSource = this.order;
  id:any =null

  getOrder(id:any){
    this.orderService.getOrder(id)
    .subscribe((e:any)=>{
      this.order = e.data;
      this.id = id;
      this.generarQR()

    })
  }



  getDate(data:any){
    return data ? dayjs(data).format('DD MMMM YYYY') : null
  }

  getTime(data:any){
    return data ? dayjs(data).format('HH:MM A') : null
  }

  getUSD(data:any){
    if(!data) return;
    console.log('float ',parseFloat(this.order.tasa))
    return (data / parseFloat(this.order.tasa))
  }

  generarQR() {
    const typeNumber = 10; // Tipo de código QR (ajústalo según tus necesidades)
    const errorCorrectionLevel = 'Q';
    const qr2 = QRCode(typeNumber, errorCorrectionLevel);
    const url = `${window.location.host}/?order=${this.id}`;
    qr2.addData(url);
    qr2.make();

    const qrImage2:any = qr2.createImgTag(3);
    let div:any = document.getElementById('qrcode2');
    div.innerHTML = qrImage2;
    const imgElement = div.querySelector('img');
    console.log(imgElement.id = "img")
  }

}
