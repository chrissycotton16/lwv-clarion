import { Component } from '@angular/core';
  import { Image } from 'src/app/models/image';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  title = 'slick-test';

  constructor() { 
    //console.log("in carousel TS");
  }

  slides = [];

  images : Image = [
    {imageString: "./assets/VoterReg2020.jpg", caption: "Picture Caption 1"},
    {imageString: "./assets/FBpicture1.jpg", caption: "Picture Caption 2"},
    {imageString: "./assets/HvS Debate 1.jpg", caption: "Picture Caption 3"},
    {imageString: "./assets/HvS Debate 6.jpg", caption: "Picture Caption 4"},
    {imageString: "./assets/HvS Debate 9.jpg", caption: "Picture Caption 5"},
    {imageString: "./assets/HvS Debate 8.jpg", caption: "Picture Caption 6"}
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
    //console.log('slick initialized');
    
  }
  
  breakpoint(e) {
    //console.log('breakpoint');
  }
  
  afterChange(e) {
    //console.log('afterChange');
  }
  
  beforeChange(e) {
    //console.log('beforeChange');
  }
}

