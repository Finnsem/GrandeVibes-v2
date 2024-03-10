import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtubeservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  videos: any[] = [];
  query: string = '';

  constructor(private route: ActivatedRoute, private youtubeService: YoutubeService,private router: Router) {}

  searchQuery: string = '';



  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      this.searchVideos();
    });
  }

  searchVideos() {

    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    
    }
  }
}
