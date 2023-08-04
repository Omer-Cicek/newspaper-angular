import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeTab: string = '';
  setActiveTab(activeTab: string) {
    console.log(activeTab);
    this.activeTab = activeTab;
  }
}
