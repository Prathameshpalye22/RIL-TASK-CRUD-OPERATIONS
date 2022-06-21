import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  constructor(private service: UserService) { }
  ngOnInit(): void {
  }

  data :any | undefined=undefined
  employee:any | undefined=undefined
  id=new FormControl('');
  dept=new FormControl('');

  handleUpdate(){
    let id=this.id.value;
    let dept=this.dept.value;
    console.log(id);
    console.log(dept);
    this.service.updateDept(id,dept,this.data).subscribe((data)=>{
      this.employee=data;
    })
  }
}