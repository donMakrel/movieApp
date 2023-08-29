import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { FontSizeService } from 'src/app/font-size.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  fontSizeSubscription!: Subscription;
  titleFontSize = '16px';
  movies: any[] = [];
  currentPage = 1;
  imageBaseUrl = environment.images;
  items = [];

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController, private fontSizeService: FontSizeService) {
    this.fontSizeSubscription = this.fontSizeService.currentFontSize.subscribe(fontSize => {
      this.titleFontSize = this.getFontSizeValue(fontSize);
    });
   }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });
    await loading.present();


    this.movieService.getTopRatedMovies(this.currentPage).subscribe(res => {
      loading.dismiss();
      // this.movies = [...this.movies, ...res.results];
      this.movies.push(...res.results);
      console.log(res);

      event?.target.complete();
      if (event){
        event.target.disabled = res.total_pages === this.currentPage;
      }
    });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  getFontSizeValue(fontSize: string): string {
    // Implement a mapping logic based on selected font size
    if (fontSize === 'small') return '12px';
    if (fontSize === 'medium') return '16px';
    if (fontSize === 'big') return '20px';
    return '16px'; // Default font size
  }

  ngOnDestroy() {
    this.fontSizeSubscription.unsubscribe();
  }
}
