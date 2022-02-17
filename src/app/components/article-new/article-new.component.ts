import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css'],
  providers: [ArticleService]
})
export class ArticleNewComponent implements OnInit {
  public article!: Article;
  public status!: string
  public page_title!: string;
  public is_edit!: boolean;
  public url!: string;


  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png .gif, .jpeg",
    uploadAPI:  {
      url:Global.url+'upload-image/',
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
   
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
};

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
    this.article = new Article('', '', '', '', null);
    this.page_title =' Crear Articulo';
    this.is_edit =true;
    this.url=Global.url;

  }

  ngOnInit(): void {
  }

  onSubmit() {
    this._articleService.create(this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success'

           //Alerta
           Swal.fire(
            'Articulo Creado!!',
            'El articulo se ha Creado correctamente',
            'success'
          );
          
          this.article = response.article;
          this._router.navigate(['/blog']);
        } else {
          this.status = 'error'
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
        Swal.fire(
          'Articulo no se ha Creado!!',
          'El articulo no se ha Creado correctamente',
          'error'
        );
        

      }

    );
  }
  imageUpload(data: any){
    this.article.image = data.body.image;
  }
}
