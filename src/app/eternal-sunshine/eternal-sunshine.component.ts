import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eternal-sunshine',
  templateUrl: './eternal-sunshine.component.html',
  styleUrls: ['./eternal-sunshine.component.css']
})
export class EternalSunshineComponent implements OnInit {
  searchQuery: string = '';
  apiKey = environment.youtubeApiKey; // Using API key from environment.ts
  arianaSongs: any[] = [];
  videoUrl: SafeResourceUrl | undefined;
  searchResults: any[] | undefined;
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private router: Router) { }

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
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&q=ariana+grand+eternal+sunshine&part=snippet&type=video&maxResults=${maxResults}`;
    this.http.get(apiUrl).subscribe((response: any) => {
      this.arianaSongs = response.items; 
    });
  }

  watchVideo(videoId: string): void {
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  closeVideoPlayer(): void {
    this.videoUrl = undefined;
  }

  goToVideo(videoId: string): void {
    this.router.navigate(['/video'], { queryParams: { videoId } });
  }

}
