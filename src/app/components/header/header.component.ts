import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  activeTab: string = '';
  width: string | number;
  isHamburgerOpen: boolean = false;

  dragging: boolean = false;

  setActiveTab(activeTab: string) {
    console.log(activeTab);
    this.activeTab = activeTab;
  }

  toggleHamburger() {
    this.isHamburgerOpen = !this.isHamburgerOpen;
    let open = this.isHamburgerOpen;
    window.addEventListener('resize', function (event) {
      //   console.log(event!.target!.outerWidth);
      open = true;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log(window);
    this.width = window.innerWidth;
  }
}
