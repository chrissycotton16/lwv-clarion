import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-picture',
  templateUrl: './admin-picture.component.html',
  styleUrls: ['./admin-picture.component.scss']
})
export class AdminPictureComponent implements OnInit {
  displayedColumns: string[] = ['imageString', 'caption', 'Edit'];
  images: Image[];
  imageLength: number;
  error = '';
  success = '';
  public imagePath;
  imgURL: any;
  public message: string;
  picturePreviewed:boolean = false;
  newImageURL: string;
  newImageCaption: string = '';
  baseUrl = 'http://localhost/api/lwv/image/';
  files:string[]  = [];

  uploadForm =  new  FormGroup({
    name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
    file:  new  FormControl('',  [Validators.required])
  });

  constructor(private imageService: ImageService, public dialog:MatDialog, private httpClient:  HttpClient){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getImages();
  }
  
  preview(files) {
    if (files.length === 0)
      return;
 
    var docType = files[0].type;
    if (docType.match(/image\/*/) == null) {
      //this.message = "Only images are supported. Please select a .png, .jpeg or .jpg";
      alert("Only images are supported. Please select a .png, .jpeg or .jpg");
      this.uploadForm = new  FormGroup({
        name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
        file:  new  FormControl('',  [Validators.required])
      });
      this.picturePreviewed = false;
      this.imgURL = "";
      this.newImageCaption = "";
      return;
    }
 
    var read = new FileReader();
    this.imagePath = files;
    read.readAsDataURL(files[0]); 
    read.onload = (_event) => { 
      this.imgURL = read.result; 
      this.picturePreviewed = true;
    }
    
  }
 
  onFileChange(event)  {
      this.files = [];
      this.files.push(event.target.files[0]);
      this.preview(this.files);
  }
  
  imageStringResult: string;
  submitForm(){
    this.resetErrors();
    const formData =  new  FormData();
    formData.append("file",  this.files[0]);
    this.httpClient.post((this.baseUrl+"testUpload"), formData, {responseType: "text"}).subscribe(res =>  {
      if(res != 'failure'){
        alert('File uploaded Successfully!');
        this.imageStringResult = res;
        //this.newImage = {ImageID: 0, imageString: res.toString(), caption: this.newImageCaption};  
        this.uploadForm = new  FormGroup({
          name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
          file:  new  FormControl('',  [Validators.required])
        });
        this.picturePreviewed = false;
        this.imgURL = "";
        this.addtoDatabase(this.imageStringResult, this.newImageCaption);
        this.newImageCaption = "";
      }
      else{
        alert('File did not upload successfully. Please make sure the file you are submitting is an image and that it doesnt already exist in the folder.');
        this.uploadForm = new  FormGroup({
          name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
          file:  new  FormControl('',  [Validators.required])
        });
        this.picturePreviewed = false;
        this.imgURL = "";
        this.newImageCaption = "";
      }
    });
  }

  addtoDatabase(imgString, caption){
    this.imageService.store(imgString, caption);
    this.getImages();
  }

  getImages():void {
    this.imageService.getAll().subscribe(
      (res: Image[]) => {
        this.images = res;
        this.imageLength = this.images.length;
      },
      (err) => {
        this.error = err;
      }
    );
  }
  
  deleteImage(ImageID, imageString) {
    if(window.confirm('Are you sure you want to delete this item?')){
      this.resetErrors();
      this.imageService.delete(+ImageID)
        .subscribe(
          (res: Image[]) => {
            this.images = res;
            this.success = 'Deleted successfully';
          },
          (err) => this.error = err
        );
      this.getImages();
    }
    this.imageService.deleteFromFolder(imageString);
  }
  
  resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
