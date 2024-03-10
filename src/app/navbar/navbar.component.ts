import { Component, OnInit ,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  {
  searchQuery: string = '';
  videoUrl: SafeResourceUrl | undefined;
  isMobile: boolean = false;
  constructor(private youtubeService: YoutubeService, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { // or onResize(event: ResizeEvent)
    this.isMobile = window.innerWidth < 768; // Adjust the breakpoint as needed
  }
  searchVideos() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }


}
