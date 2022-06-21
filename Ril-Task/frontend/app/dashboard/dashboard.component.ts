import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private service: UserService) { }

  ngOnInit(): void {
    this.service.getEmp().subscribe((data) => {
      this.employee = data;
    })
  }

  employee : any[] | undefined = undefined;

  search = new FormControl('');

  searchEmployee(){
    if(this.search.value==""){
      this.service.getEmp().subscribe((data) =>{
        this.employee = data
      });
    }
    else{
      this.service.getEmployeeByName(this.search.value).subscribe((data)=>{
        this.employee = data;
      })
    }
  }
}
