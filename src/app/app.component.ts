import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeAnimation]
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}

getRouteAnimationData() {
  return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
}
  title = 'qualcomm';
  toggleNav(nav: any){
    if(nav.opened){
      nav.close()
    }
    else
    {
      nav.open();
    }
  }
}
