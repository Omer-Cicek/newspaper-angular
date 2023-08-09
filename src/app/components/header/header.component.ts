import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  activeTab: string = this.router.url.replace('/', '');
  isHamburgerOpen: boolean = false;
  smaller850px: boolean = false;
  dragging: boolean = false;
  searchInputValue: string = '';

  @Output() headerValueChange: EventEmitter<any> = new EventEmitter();

  inputValue(value: any) {
    console.log(value);
    this.searchInputValue = value;
    console.log(this.router.url.replace('/', ''));
    console.log(this.activeTab);
  }

  setActiveTab(activeTab: string) {
    this.activeTab = activeTab;
    this.isHamburgerOpen = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
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

  ngOnInit() {
    this.setActiveTab(window.location.pathname.replace('/', '')); //set active tab when page reload(It was not  showing active tab in some cases)
  }
}
