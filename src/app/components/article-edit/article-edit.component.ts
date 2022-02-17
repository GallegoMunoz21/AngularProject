import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2'
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';


@Component({
  selector: 'app-article-edit',
  templateUrl: '../article-new/article-new.component.html',
  styleUrls: ['./article-edit.component.css'],
  providers: [ArticleService]
})
export class ArticleEditComponent implements OnInit {
  public article!: Article;
  public status!: string;
  public is_edit!: boolean;
  public page_title!: string;
  public url!: string;
 


  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png .gif, .jpeg",
    uploadAPI: {
      url: Global.url + 'upload-image/',
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
    this.is_edit =true;
    this.page_title='Editar Articulo';
    this.url=Global.url;

  }
  ngOnInit(): void {
    this.getArticle();
  }
  onSubmit() {
    this._articleService.update(this.article._id, this.article).subscribe(
      response => {
        if (response.status == 'success') {
          this.status = 'success'
          this.article = response.article;

          //Alerta
          Swal.fire(
            'Articulo Modificado!!',
            'El articulo se ha Modificado correctamente',
            'success'
          );
          
          this._router.navigate(['/blog/articulo', this.article._id]);
          console.log(this.article);
        } else {
          this.status = 'error'
        }
      },
      error => {
        console.log(error);
        this.status = 'error';
        Swal.fire(
          'Articulo no se ha Editado!!',
          'El articulo no se ha Editado correctamente',
          'error'
        );
        

      }

    );
  }
  imageUpload(data: any) {
    this.article.image = data.body.image;
  }
  getArticle(){
    this._route.params.subscribe(params =>{
      let id =params['id'];
      this._articleService.getArticle(id).subscribe(
        response =>{
          if(response.article){
            this.article = response.article;
          }else{
            this._router.navigate(['/home']);
          }
        },
        error =>{
          console.log(error);
          this._router.navigate(['/home']);
        }
      );
    });
  }
}



