import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MovieRecommendationService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:4182/';
  getRecommendations(userInput: any, rating: number): Observable<any> {
    return this.http.get(this.baseUrl + 'getMovieRecommendation', {
      params: { userInput, rating: rating.toString() }, // Add rating as a query parameter
    });
  }
}
