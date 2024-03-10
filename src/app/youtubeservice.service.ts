import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey: string = environment.youtubeApiKey;
  apiUrl: string = 'https://www.googleapis.com/youtube/v3/search';

  constructor(private http: HttpClient) {}

  searchVideos(query: string): Observable<any> {
    const maxResults = 30; // Set the maximum number of results
    const arianaQuery = 'ariana grande'; // Additional query string
    const fullQuery = `${query} ${arianaQuery}`; // Combine the original query with "Ariana Grande"
    const url = `${this.apiUrl}?q=${fullQuery}&part=snippet&type=video&maxResults=${maxResults}&key=${this.apiKey}`;
    return this.http.get(url);
  }
}
