import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL = "http://localhost:3001/user"
  empURL= "http://localhost:3001/emp";
  constructor( private http : HttpClient) { }

  // 1-login of the user 
  public login(username:string, pass : any) : Observable<any>{
    let url = `${this.userURL}/${username}/${pass}`;
    return this.http.get(url);
  }

  //2-getting all employee
  public getEmp() : Observable<any>{
    let url = `${this.empURL}`;
    return this.http.get(url);

  }

  //3-adding employee
  // public addEmp(id:number,name:string,dept:string,email:string,level:string) : Observable<any>{
  //   let url = `${this.empURL}/${id}/${name}/${dept}/${email}/${level}`;
  //   return this.http.get(url);
  // }


  public addEmp(id:number,name:string,dept:string,email:string,level:string) : Observable<any>{
    let obj = {
      id:id,
      name:name,
      dept:dept,
      email:email,
      level:level
    }
    return this.http.post(`${this.empURL}/add`, obj);
  }


  //4-editing employee
  // public editEmp(id:number,name:string,dept:string,email:string,level:string) : Observable<any>{
  //   let url = `${this.empURL}/${id}/${name}/${dept}/${email}/${level}`;
  //   return this.http.get(url);
  // }

  //5-deleting employee
  public delete(id: number) : Observable<any>{
    //let url = `${this.empURL}/${id}`;
    let url = `http://localhost:3001/deleteUser/${id}`
    return this.http.get(url);
  }

  //6- Searching employee by name
  public getEmployeeByName(name:string):Observable<any>{
    let url = `${this.empURL}/name/${name}`;
    return this.http.get(url);
  }

//   // All Updating Api's
//   // 7-Updating employee by name
//   public updateName(id:number,name:string):Observable<any>{
//     let url = `${this.empURL}/${id}/name/${name}`;
//     return this.http.put(url, name);
//   }


  // 8-Updating employee by department
  public updateDept(id:any,dept:any,data:any):Observable<any>{
    console.log(id,dept);
   return this.http.put(`${this.empURL}/update/${id}/${dept}`,data)
  }




//   // 9-Updating employee by email
//   public updateEmail(id:number,email:string):Observable<any>{
//     let url = `${this.empURL}/${id}/email/${email}`;
//     return this.http.put(url, email);
//   }
//   // 10-Updating employee by level
//   public updateLevel(id:number,level:string):Observable<any>{
//     let url = `${this.empURL}/${id}/name/${level}`;
//     return this.http.put(url, level);
//   }

}