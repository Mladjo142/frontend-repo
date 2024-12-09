import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MovieRecommendationService } from './movie-recommendation.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-movie-recommendation',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './movie-recommendation.component.html',
  styleUrls: ['./movie-recommendation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieRecommendationComponent {
  recommendationForm: FormGroup;
  recommendation = signal<any>([]);
  ratings = [1, 2, 3, 4, 5]; // Dropdown options for rating

  disableButton = signal<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private movieRecommendationService: MovieRecommendationService
  ) {
    this.recommendationForm = this.fb.group({
      movieName: ['', Validators.required],
      rating: [5, Validators.required],  // Default rating
    });
  }

  getMovieRecommendations() {
    if (this.recommendationForm.invalid) {
      return;
    }

    this.disableButton.set(true);
    const { movieName, rating } = this.recommendationForm.value;

    this.movieRecommendationService
      .getRecommendations(movieName.trim(), rating)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.recommendation.set(result.recommendations);
          this.disableButton.set(false);
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.disableButton.set(false);
        },
      });
  }
}
