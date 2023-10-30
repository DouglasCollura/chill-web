import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from './services/order.service';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'chill-web';


  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe((e:any)=>{
      console.log(e)
      if(e.order){
        this.getOrder(e?.order)
      }
    })
  }

  order:any = null;
  displayedColumns: string[] = ['Producto', 'Cant.', 'Precio'];
  dataSource = this.order;

  getOrder(id:any){
    this.orderService.getOrder(id)
    .subscribe((e:any)=>{
      console.log(e)
      this.order = e.data
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

}
