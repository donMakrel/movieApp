import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { FontSizeService } from 'src/app/font-size.service';
import { TextToSpeech } from '@capacitor-community/text-to-speech';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  fontSizeSubscription!: Subscription;
  titleFontSize = '16px';
  myText = 'Today is a good day to learn!';
  recording = false;
  movie: any = null;
  imageBaseUrl = environment.images;

  constructor(
    private route: ActivatedRoute, 
    private movieService: MovieService,
    private fontSizeService: FontSizeService
    ) { 
      this.fontSizeSubscription = this.fontSizeService.currentFontSize.subscribe(fontSize => {
        this.titleFontSize = this.getFontSizeValue(fontSize);
      });
    }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.movieService.getMovieDetails(id).subscribe(res => {
      console.log(res);
      this.movie = res;
    });
  }

 async openHomepage(){
    //window.open(this.movie.homepage);
    await Browser.open({ url: this.movie.homepage })
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

  speakText() {
    TextToSpeech.speak({
    text: this.movie.title,
    lang: 'en-US',
  });
  }
}


