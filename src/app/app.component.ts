import { Component,OnInit,HostListener  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isMobile: boolean = false;
  title = 'Grande-Vibes';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { // or onResize(event: ResizeEvent)
    this.isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  }
}
