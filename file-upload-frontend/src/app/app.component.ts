import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { UploadService } from './upload.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  imageUploadForm: FormGroup;
  imageUploadForm2: FormGroup;
  title = 'file-upload-frontend';
  file: any;
  constructor(
              private fb: FormBuilder,
              private messageService: MessageService,
              private uploadService : UploadService) {
    this.imageUploadForm = fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required]
    });
    this.imageUploadForm2 = fb.group({
      name2: ['', Validators.required],
      image2: ['', Validators.required]
    });
  }

  filechange(event: any) {
    console.log(event, '111111');
    this.file = <File>event.target.files[0];
    console.log(this.file);
  }
  filechange2(event: any) {
    console.log(event, '111111');
    this.file = <File>event.target.files[0];
  }

  onSubmit() {
    if(this.imageUploadForm.valid){
    const fileData = new FormData();
    fileData.append('name', this.imageUploadForm.value.name);
    fileData.append('image', this.file, this.file.name);
    this.uploadService.uploadImage(fileData).subscribe(
      res => {
        console.log(res,"from api");
        if(res.code === 200){
          this.messageService.add({severity:'success', summary: 'Success', detail:'Image upload'});
        }
        else {
          this.messageService.add({severity:'warn', summary: 'some error', detail:'something went wrong'});
        }
      }, err => {
        this.messageService.add({severity:'error', summary: 'some error from api', detail:'something went wrong'});
      }
    );
    } else {
      this.messageService.add({severity:'error', summary: 'form not valid', detail:'Validation failed'});
    }
   
  }
  onSubmit2(){
    if(this.imageUploadForm2.valid){
      const fileData = new FormData();
      fileData.append('name', this.imageUploadForm2.value.name);
      fileData.append('image', this.file, this.file.name);
      this.uploadService.uploadImageS3(fileData).subscribe(
        res => {
          console.log(res,"from api");
          if(res.code === 200){
            this.messageService.add({severity:'success', summary: 'Success', detail:'Image upload'});
          }
          else {
            this.messageService.add({severity:'warn', summary: 'some error', detail:'something went wrong'});
          }
        }, err => {
          this.messageService.add({severity:'error', summary: 'some error from api', detail:'something went wrong'});
        }
      );
      } else {
        this.messageService.add({severity:'error', summary: 'form not valid', detail:'Validation failed'});
      }
  }
}
