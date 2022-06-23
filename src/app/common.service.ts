import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private toasterSubject = new Subject<any>();
    

  constructor(private toastr: ToastrService) { }
  
  triggerToast(toaster:any) {
      console.log(toaster)
      // this.toasterSubject.next(toaster);
      if(toaster.type == 'success'){
          this.toastr.success( toaster.msg,toaster.title);
      }else if(toaster.type == 'error'){
          this.toastr.error( toaster.msg,toaster.title);
      }else{
          this.toastr.info( toaster.msg,toaster.title);
      }
  }

  listenToast(): Observable<any> {
      return this.toasterSubject.asObservable();
  }
}
