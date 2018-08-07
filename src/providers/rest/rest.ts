import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { NavParams } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface UserResponse {
  login: string;
  bio: string;
  company: string;
  id: string;
  email: string;
}
@Injectable()
export class RestProvider {
  // apiUrl = 'http://172.17.3.87:8080/apitwo';
  // apiUrl2 = 'http://172.17.3.87:8080/apithree';

  //testing purposes
  apiUrl = 'http://172.20.10.10:8080/apitwo';
  apiUrl2 = 'http://172.20.10.10:8080/apithree';
  iddd:any;
  constructor(public http: HttpClient,private alertCtrl: AlertController) {
    console.log('Hello RestProvider Provider');
  }

//Register
  addUser(data) {
    return new Promise((resolve, reject) => {
      console.log('Got inside the addUser');
      this.http.post(this.apiUrl+'/users', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
//Submit Complaint
  addComplaint(data) {
    return new Promise((resolve, reject) => {
      console.log('Got inside the addUser');
      this.http.post(this.apiUrl+'/complaints', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

//login uawe
  login(user:any){
    let userid:any;
    return new Promise(resolve =>{ this.http.post<UserResponse>(this.apiUrl+'/login', user)
    .subscribe(data =>{
      console.log(data);    
      resolve(data);
      //sample
      userid=data.id;
      console.log("before the userid");
      this.iddd = userid;
      console.log(userid);
      resolve(userid);
      // resolve(data.id);
    },err=>{
      let alert = this.alertCtrl.create({
        title: 'Login Error',
        subTitle: 'Incorrect Useranme And Password',
        buttons: ['Okay']
      });
      alert.present();
    })
  })
  }

  //getcomplaints
  getComplaints() {
    console.log("This is the get complaints");
    console.log("getcomplaints id"+this.iddd);
    return new Promise(resolve => {
      this.http.get(this.apiUrl2+'/complaints/'+this.iddd).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }
    }


