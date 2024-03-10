import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  apiKey = environment.youtubeApiKey; // Using API key from environment.ts
  arianaSongs: any[] = [];
  videoUrl: SafeResourceUrl | undefined;
  searchResults: any[] | undefined;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  countdownDate: Date;
  countdown: any;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) {
    this.countdownDate = new Date('March 8, 2024 12:00:00');

    this.calculateCountdown();
    this.countdown = setInterval(() => {
      this.calculateCountdown();
    }, 1000);
  }
  calculateCountdown() {
    const now = new Date().getTime();
    const distance = this.countdownDate.getTime() - now;

    if (distance <= 0) {
      clearInterval(this.countdown);
      // Handle countdown completion
    } else {
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    }
  }

  onSearch(): void {
    if (this.searchQuery.trim() !== '') {
        this.searchVideos(); // Call the searchVideos method to navigate to search result page
    }
} 

searchVideos(): void {
  console.log('Search query:', this.searchQuery); // Log search query
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&q=${this.searchQuery}&part=snippet&type=video`;
  this.http.get(apiUrl).subscribe((response: any) => {
      console.log('Search response:', response); // Log search response
      this.router.navigate(['/searchresult'], { queryParams: { q: this.searchQuery, results: JSON.stringify(response.items) } });
  });
}

  ngOnInit(): void {
    this.fetchArianaSongs();
    
  }

  fetchArianaSongs(): void {
    const maxResults = 30;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&q=ariana+grande&part=snippet&type=video&maxResults=${maxResults}`;
    this.http.get(apiUrl).subscribe((response: any) => {
      this.arianaSongs = response.items;
    });
  }

  watchVideo(videoId: string): void {
    const videoUrl = `https://www.youtube.com/embed/${videoId}`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  closeVideoPlayer(): void {
    this.videoUrl = undefined;
  }

  goToVideo(videoId: string): void {
    this.router.navigate(['/video'], { queryParams: { videoId } });
  }
}
