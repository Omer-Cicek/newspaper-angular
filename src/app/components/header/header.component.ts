import { Component, HostListener, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeTab: string = '';
  isHamburgerOpen: boolean = false;
  smaller850px: boolean = false;

  dragging: boolean = false;

  setActiveTab(activeTab: string) {
    console.log(activeTab);
    this.activeTab = activeTab;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    console.log('sa');
    if (window.innerWidth < 850) {
      this.smaller850px = true;
      this.isHamburgerOpen = false;
    } else if (window.innerWidth >= 850) {
      this.smaller850px = false;
      this.isHamburgerOpen = false;
    }
  }

  toggleHamburger() {
    this.isHamburgerOpen = !this.isHamburgerOpen;
  }
}
