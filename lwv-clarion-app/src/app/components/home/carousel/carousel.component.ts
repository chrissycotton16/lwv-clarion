import { Component } from '@angular/core';
import { Image } from './image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  title = 'slick-test';

  constructor() { console.log("in carousel TS");  }

  slides = [
    {img: "http://placehold.it/500x800/666666"},
    {img: "http://placehold.it/500x500/666666"},
    {img: "http://placehold.it/800x500/666666"},
    {img: "http://placehold.it/500x500/666666"}
  ];

  images : Image = [
    {imageString: "http://placehold.it/500x800/666666", caption: "slide 1"},
    {imageString: "http://placehold.it/500x500/666666", caption: "slide 2"},
    {imageString: "http://placehold.it/800x500/666666", caption: "slide 3"},
    {imageString: "http://placehold.it/1920x1080/666666", caption: "slide 4"}

  ]
  

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
    console.log('slick initialized');
    
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }
}

