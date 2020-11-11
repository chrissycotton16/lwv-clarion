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
  displayedColumns: string[] = ['ImageID', 'imageString', 'caption', 'Edit'];
  @Input() image ={ ImageID:0, imageString:'', caption:''}; //this is for storing purposes
  images: Image[];
  imageLength: number;
  error = '';
  success = '';
  @Input() newImage: Image ={ ImageID:0, imageString:'', caption:''};
  baseUrl = 'http://localhost/api/lwv/image/testUpload';
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

  

  public imagePath;
  imgURL: any;
  public message: string;
  picturePreviewed:boolean = false;
  newImageURL: string;
  newImageCaption: string;
  
  preview(files) {
    if (files.length === 0)
      return;
 
    var docType = files[0].type;
    if (docType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
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

  submitForm(){
    const formData =  new  FormData();
    formData.append("file",  this.files[0]);

    this.httpClient.post(this.baseUrl, formData, {responseType: "text"}).subscribe(res =>  {
        this.addtoDatabase(res);

        alert('Files uploaded Successfully!');
        this.uploadForm = new  FormGroup({
          name:  new  FormControl('',  [Validators.required,  Validators.minLength(3)]),
          file:  new  FormControl('',  [Validators.required])
        });
        this.picturePreviewed = false;
        this.imgURL = "";
    });
  }

  addtoDatabase(result){
    console.log(result);
  }
  //database crud operations
  getImages():void {
    this.imageService.getAll().subscribe(
      (res: Image[]) => {
        this.images = res;
        this.imageLength = this.images.length;
        console.log(this.images);
      },
      (err) => {
        this.error = err;
      }
    );
  }
  deleteImage(ImageID) {
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
  }
  resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
