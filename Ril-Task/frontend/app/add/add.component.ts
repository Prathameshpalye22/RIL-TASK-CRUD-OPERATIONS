import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private service : UserService) { }

  ngOnInit(): void {
  }
  data: any | undefined=undefined
  employee:any | undefined=undefined
  _id=new FormControl('');
  emp_name=new FormControl('');
  dept=new FormControl('');
  email=new FormControl('');
  level=new FormControl('');

  handleAdd(){
    let id=this._id.value;
    let name=this.emp_name.value;
    let dept=this.dept.value;
    let email=this.email.value;
    let level=this.level.value;
    this.service.addEmp(id,name,dept,email,level).subscribe((data)=> {
      this.employee=data
    })
  }

}