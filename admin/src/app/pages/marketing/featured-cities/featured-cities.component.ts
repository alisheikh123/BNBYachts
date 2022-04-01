import { City, MarketData, AddCity } from './../../../shared/interfaces/Market';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NbToastrService } from '@nebular/theme';
import { environment } from '../../../../environments/environment';
import { DatePipe } from '@angular/common';
import { cityPicTransferable } from '../../../shared/interfaces/cityPicTransferable';
import { ActionListComponent } from '../../../shared/common/action-list/action-list.component';

@Component({
  selector: 'ngx-featured-cities',
  templateUrl: './featured-cities.component.html',
  styleUrls: ['./featured-cities.component.scss']
})
export class FeaturedCitiesComponent implements OnInit {
  cityForm: FormGroup;
  assetsUrlCity = environment.S3BUCKET_URL + '/profilePicture/cities/';
  citiesPic : string;
  fileInfo : string ='';
  closeResult: string;
  @ViewChild('contents') delete : ElementRef;
  @ViewChild('contentData') edit : ElementRef;
  featureCityPic : cityPicTransferable;
  source: City[];
  addCity:AddCity;
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'Location',
        type: 'string',
        width: '30%',
      },
      description: {
        title: 'Description',
        type: 'string',
        width: '60%',
        valuePrepareFunction: (value) => { 
           return value.substring(0, 49)+'...';
        } 
      },
      operation:{
        title:"",
        type: 'custom',
        filter : false,
        renderComponent: ActionListComponent,
        onComponentInitFunction:(instance) => {
        instance.actionEmitter.subscribe(row => {
          instance.dataEmitter.subscribe(data => {
            if (row == 'onEditAction') {
              this.onEditAction(this.edit,data);
            }
            if (row == 'onDeleteAction') {
              this.onDeleteAction(this.delete,data.id);
            }
          }) 
        });
       }
     }
  }
};
  constructor(private fb: FormBuilder,private datePipe : DatePipe ,private marketService: MarketData , private modalService : NgbModal, private toaster : NbToastrService) { }
  ngOnInit() {
    this.cityForm = this.fb.group({
      id : [0],
      imagePath: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
    })
    this.getCities();
  }
   openLg(content) {
     this.modalService.open(content, { size: 'lg' });
     this.fileInfo = '';
     this.resetForm();
   }
  get citiesForm() {
    return this.cityForm.controls;
  }
  getCities() {
    this.marketService.getCities().subscribe((res) =>{
      this.source = res;
    });
  }
  onEditAction(contentData , cityData : AddCity){
    this.modalService.open(contentData, { size: 'lg' });
    this.cityForm.patchValue({
      id: cityData.id,
      name: cityData.name,
      imagePath : cityData.imagePath,
      description: cityData.description,
    });
    this.fileInfo = cityData.imagePath;
  }
  onSubmit() {

    var cityData = this.cityForm.value;
    cityData.featuredCityGallery =  this.featureCityPic;
    if (cityData.id > 0 || cityData.id != null) {
      this.marketService.UpdateCity(cityData).subscribe(response =>{
      this.toaster.primary('City updated successfully', 'City');
      this.resetForm();
      this.modalService.dismissAll();
      this.getCities();
      });
    }else{
      cityData.id = 0;
      this.marketService.AddCity(cityData).subscribe(response =>{
        this.toaster.primary('City created successfully', 'City');
        this.resetForm();
        this.modalService.dismissAll();
        this.getCities();
      });
    }
  }
  private getDismissReason(reason: any): string {  
    if (reason === ModalDismissReasons.ESC) {  
      return 'by pressing ESC';  
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {  
      return 'by clicking on a backdrop';  
    } else {  
      return `with: ${reason}`;  
    }  
  }  
  onDeleteAction(contents,cityId) {
    if (cityId > 0) {
      this.modalService.open(contents, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
        this.closeResult = `Closed with: ${result}`;  
        if (result === 'yes') {  
          this.marketService.deleteCity(cityId).subscribe(res =>{
            this.toaster.primary("City Deleted Successfully.", "City");
            this.getCities();
          })
        }  
      }, (reason) => {  
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;  
      });
    }
  }  
  resetForm(){
    this.cityForm.reset();
  }
  onFileChange(fileInput : any) {
    if (fileInput.target.files.length > 0) {
      let fileData: File;
      fileData = <File>fileInput.target.files[0];
      this.fileInfo = fileData.name;
      var mimeType = fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(fileData);
      reader.onload = (_event) => {
        this.featureCityPic = {
          fileData : reader.result,
          fileName: fileData.name,
          fileType: fileData.type,
          isCoverPic:true,
          id : 0
        }
      }
    }
  }
}