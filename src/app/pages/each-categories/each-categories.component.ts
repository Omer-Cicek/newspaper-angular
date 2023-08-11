import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-each-categories',
  templateUrl: './each-categories.component.html',
  styleUrls: ['./each-categories.component.css'],
})
export class EachCategoriesComponent {
  @ViewChild(HeaderComponent) child;
}
