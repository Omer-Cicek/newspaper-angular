import {
  Component,
  EventEmitter,
  HostListener,
  Output,
  SimpleChanges,
} from '@angular/core';

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

  @Output() headerValueChange: EventEmitter<any> = new EventEmitter();

  // ...

  inputValue(value: any) {
    this.headerValueChange.emit(value); // Emit the value whenever it changes
  }

  setActiveTab(activeTab: string) {
    console.log(activeTab);
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
}
