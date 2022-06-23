import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import * as sha512 from 'js-sha512';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  //========================================== Production =======================================================

  // public NODE_API = "http://13.232.122.39";

//========================================== Production =======================================================
 //========================================== Development =======================================================

 public NODE_API = "http://localhost:8000";
 public NODE_API_SERVICE = "/api/service/";
 public APPLICATION = "IAM";
 public DATEFORMAT = "MM-dd-yyyy HH:mm";
//========================================== Development =======================================================
public MyPage = "";

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/geojson'
    })
  }  

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      // errorMessage = `Error: ${error.error.message}`;
      errorMessage = `Error : Client \nSomething went wrong.`;
    } else {
      // Server-side errors
      // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      errorMessage = `Error : Server \nSomething went wrong.`;
    }
    //   window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getData(url: string){
    
    let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get(url,{headers}).pipe(retry(2),catchError(this.handleError));
  }

  public postData( postObj: any,url: string){

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    
    // var header = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    return this.httpClient.post(url,postObj,{headers}).pipe(retry(2),catchError(this.handleError));
  }

  public patchData( postObj: any, url: string){

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   
 

    
    // var header = new Headers({'Content-Type': 'application/json;charset=utf-8'});
    return this.httpClient.patch(url,postObj,{headers}).pipe(retry(2),catchError(this.handleError));
  }

  public deleteData( postObj: any, url: string){
    return this.httpClient.delete(url,postObj).pipe(retry(2),catchError(this.handleError));
  }

  public generateHash(str: string){
    return sha512.sha512(str);
  }

  public getFlooredFixed(v: any, d: any) {
    return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
  }

  public downloadFile(url:string): any {
		return this.httpClient.get(url, {responseType: 'blob'}).pipe(retry(2),catchError(this.handleError));
  }
  public isEmptyObject(obj:any) {
    return (obj && (Object.keys(obj).length === 0));
  }
}
