import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, App,ToastController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import {HomePage} from '../home/home';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { RestProvider } from '../../providers/rest/rest';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// export interface NativeGeocoderResultModel {
//   subAdministrativeArea: string,
//   postalCode: number,
//   locality: string,
//   subLocality: string,
//   subThoroughfare: string,
//   countryCode: string,
//   countryName: string,
//   administrativeArea: string,
//   thoroughfare: string,
//   street: string
// }

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {
imageData: any;
public base64Image: string;
imageFileName:any;
imageURI: any;
lat: any;
long: any;
lattt: any;
longgg: any;
s: any;
c: any;
ucomplaint:string;
   apiUrl2 = 'http://192.168.1.8:8080/apithree';
complaints:any;
// complaint = {user_complaint: ''};

  constructor( public restProvider: RestProvider, public navCtrl: NavController, public navParams: NavParams, public app: App,public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, public toaster: ToastController,private camera: Camera,private transfer: FileTransfer,public http: HttpClient,public platform: Platform) {
    
  }

submit(){

  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";

   var options: FileUploadOptions = {
      fileName: newFileName,
      fileKey: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { "user_id":this.navParams.get('id_'),"user_complaint":this.ucomplaint,"lat":this.lat,"long":this.long }
    };

 const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.base64Image,this.apiUrl2+"/upload",options).then(data => {
        console.log("success")
        }, err => {
        console.log("error")
        });

}


  takePhoto(){

    const options : CameraOptions = {
      quality: 90,
      allowEdit:true,
      targetHeight: 300,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
   
    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      // this.base64Image =imageData;
      this.geolocation.getCurrentPosition().then((resp) => {
      this.lat= resp.coords.latitude
      this.long=resp.coords.longitude

       }).catch((error) => {
         console.log('Error getting location', error);
       });


      
    });
  }

  getComplaints(){
    this.restProvider.getComplaints()
    .then(data => {
      this.complaints = data;
      console.log(this.complaints);
    });
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
  }

  logout(){
    const root = this.app.getRootNav();
	  root.popToRoot();
  }


}
