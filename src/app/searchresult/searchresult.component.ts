import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})
export class SearchResultComponent implements OnInit {
  videos: any[] = [];
  query: string = '';
  videoUrl?: SafeResourceUrl; // Store the sanitized video URL

  constructor(private route: ActivatedRoute, private youtubeService: YoutubeService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.searchVideos();
    });
  }

  searchVideos() {
   
    if (this.query.trim() !== '') {
      this.youtubeService.searchVideos(this.query).subscribe((response: any) => {
        this.videos = response.items;
   
      });
    }
  }

  watchVideo(videoId: string): void {
    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // Append ?autoplay=1 to URL
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }

  closeVideoPlayer(): void {
    this.videoUrl = undefined;
  }
}
