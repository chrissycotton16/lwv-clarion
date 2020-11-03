import { Component, OnInit, Input } from '@angular/core';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private imageService: ImageService, public dialog:MatDialog){
    this.ngOnInit();
  }

  ngOnInit(){
    this.getImages();
  }

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
  // openDialog(): void{
  //   const dialogRef = this.dialog.open(OfficerAddDialogComponent, {
  //     width: '450px',
  //     data:{ newOfficer: this.newOfficer },
  //     autoFocus: false
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     this.newOfficer = result;
  //     if(result != undefined){
  //       this.addOfficer(this.newOfficer);
  //     }
  //   });
  // } 

  // addOfficer(off:Officer){
  //   off = this.newOfficer;
  //   this.resetErrors();
  //   this.officerService.store(off)
  //     .subscribe(
  //       (res: Officer[]) => {
  //         // Update the list of officers
  //         this.officers = res;
  //         // Inform the user
  //         this.success = 'Created successfully';
  //       },
  //       (err) => this.error = err
  //     );
  //   this.getOfficers();
  // }


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

  // openUpdateDialog(off){
  //   const dialogRef = this.dialog.open(OfficerUpdateDialogComponent, {
  //     width: '450px',
  //     data:{ updateOfficerID: off.OfficerID, updateFirstName: off.FirstName, updateLastName: off.LastName, updatePosition: off.Position,  
  //            updateEmail: off.Email, updateTermStart: off.TermStart},
  //     autoFocus: false
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result != undefined){
  //       this.officerToUpdate = result;
  //       this.updateOfficer(this.officerToUpdate);
  //     }
  //   });
  //   this.getOfficers();
  // }

  // updateOfficer(off){
  //   this.resetErrors();
  //   this.officerService.update({OfficerID: off.OfficerID, FirstName: off.FirstName, LastName: off.LastName, 
  //       Position: off.Position, Email: off.Email, TermStart: off.TermStart})
  //   .subscribe(
  //     (res) => {
  //       this.officers = res;
  //       this.success = 'Updated successfully';
  //     },
  //     (err) => this.error = err
  //   );
  // }

  resetErrors() {
    this.success = '';
    this.error   = '';
  }

}
