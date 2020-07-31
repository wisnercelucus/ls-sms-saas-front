import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';;
import { NgForm } from '@angular/forms';

export class UploadAdapter {
  constructor( public loader ) {
     this.loader = loader;
  }

  upload() {
     return this.loader.file
           .then( file => new Promise( ( resolve, reject ) => {
                 var myReader= new FileReader();
                 myReader.onloadend = (e) => {
                    resolve({ default: myReader.result });
                 }
                 myReader.readAsDataURL(file);
           } ) );
  };
}



@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  public Editor = ClassicEditor;
  config;

  constructor() {
    this.config = {
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'indent',
          'outdent',
          '|',
          'imageUpload',
          'blockQuote',
          'insertTable',
          'mediaEmbed',
          'undo',
          'redo'
        ]
      },
      image: {
        toolbar: [
          'imageStyle:full',
          'imageStyle:side',
          '|',
          'imageTextAlternative'
        ]
      },
      table: {
        contentToolbar: [
          'tableColumn',
          'tableRow',
          'mergeTableCells'
        ]
      },
      // This value must be kept in sync with the language defined in webpack.config.js.
      language: 'en'
    };
   }

  ngOnInit(): void {
  }

  uploadFile(file){
    let name = '';
    let formData:FormData = new FormData();
    let headers = new Headers();
    name = file.name;
    formData.append('attachment', file, name);
    const dotIndex = name.lastIndexOf('.');
    const fileName  = dotIndex>0?name.substring(0,dotIndex):name;
    formData.append('name', fileName);

    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    console.log('formData',formData);

    return 0;
  }



  onSubmitPost(f:NgForm){
    console.log(f.value)
  }

  onReady(eventData) {
      eventData.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new UploadAdapter(loader);
    };
  }

}
