import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.service.getEmp().subscribe((data) => {
      this.employee = data;
    })
  }
  employee :any[] | undefined = undefined

  search = new FormControl('');

  searchEmployee(){
    if(this.search.value==""){
      this.service.getEmp().subscribe((data)=>{
        this.employee = data;
        console.log(data);
      })
    }
  //   else if(Number(this.search.value)==this.search.value){
  //     this.service.getEmp(Number(this.search.value)).subscribe((data)=>{
  //       this.employee = data;
  //       console.log(data);
  //     })
  //   }
  //   else{
  //     this.service.getEmp(this.search.value).subscribe((data)=>{
  //       this.employee = data;
  //     })
  //   }
  // }
  }
}
