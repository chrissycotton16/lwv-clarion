import { Component } from '@angular/core';
  import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  title = 'slick-test';
  images: Image [];
  constructor(private imageService: ImageService) { 
    this.getImages();
  }

  getImages():void {
    this.imageService.getAll().subscribe(
      (res: Image[]) => {
        this.images = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  slides = [];

  slideConfig = {"slidesToShow": 1, 
                "slidesToScroll": 1, 
                'dots': true, 
                'arrows': true,
                "infinite": true, 
                "autoplay": true, 
                "autoplayspeed": 1000,  
                "centerMode": true,
                "variableWidth": true      
                };

  
  addSlide() {
    this.slides.push({img: "http://placehold.it/350x150/777777"})
  }
  
  removeSlide() {
    this.slides.length = this.slides.length - 1;
  }
  
  slickInit(e) {    
  }
  
  breakpoint(e) {
  }
  
  afterChange(e) {
  }
  
  beforeChange(e) {
  }
}

