import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private service :UserService, private _router : Router) { }

  ngOnInit(): void {
  }
  employee: any | undefined=undefined

  _id=new FormControl('')
  handleGet(id:number){
    console.log(id)
    this.service.delete(id).subscribe((data)=>{
      this.employee=data;
    })
  }

}
