import { Component, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage';
import { APP_CONFIG } from '@pawdopt/config';


@Component({
  selector: 'pawdopt-orgprofile',
  templateUrl: 'orgprofile.page.html',
  styleUrls: ['orgprofile.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo],
  
})
export class orgprofilePageComponent {

  
  inputStartDate!: Date;
  inputEndDate!: Date;
  orgId!:string;
  dateString!: string;
  address!: string;
  logoStr!: string;
  twitter!: string;
  facebook!: string;
  instagram!: string;
  website!: string;

  //stats variables
  maleDogsAdopted = 0;
  femaleDogsAdopted = 0;

  TopBreeds: {
    breed1: string,
    breed2: string,
    breed3: string,
    amount1: number,
    amount2: number,
    amount3: number
  } = {
    breed1: "Breed 1",
    breed2: "Breed 2",
    breed3: "Breed 3",
    amount1: 0,
    amount2: 0,
    amount3: 0
  };

  averageAge = 0;
  mostPopularAge = 0;

  aveTimeAdoptionStart!: string;
  aveTimeAdoptApprove!: string;
  aveTimeAdoptReject!: string;
  aveTimeFullProcess!: string;

  numAdoptStarted = 0;
  numApproval = 0;
  numRejections = 0;

  org:{
    name: string,
    dateFounded: Date,
    location:{
      lat: number,
      lng: number,
    },
    totalDogs: number,
    totalAdoptions: number
  }={
    name: "",
    dateFounded: new Date(),
    location:{
      lat: 0,
      lng: 0,
    },
    totalDogs: 0,
    totalAdoptions: 0
  }

  

  constructor(private router: Router, private apollo: Apollo, @Inject(APP_CONFIG) private appConfig: any){
    this.getOrg();
    this.updateStats();
  }


  async getObject() {
    const ret = await Storage.get({ key: 'orgToPref' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async getOrg(){
    
    this.orgId = (await this.getObject()).name;
    const findOrgByIdQuery = gql`query {
      findOrgById(_id: "${this.orgId}") {
        name
        dateFounded
        location {
          lat
          lng
        }
        totalDogs
        totalAdoptions
        logo
        contactInfo {
          website
          twitter
          facebook
          instagram
        }
      }
    }`;
    this.apollo.watchQuery({
      query: findOrgByIdQuery,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      const data = result.data as {
        findOrgById: {
          name: string,
          dateFounded: Date,
          location: {
            lat: number,
            lng: number,
          },
          totalDogs: number,
          totalAdoptions: number,
          logo: string
          contactInfo: {
            website: string,
            twitter: string,
            facebook: string,
            instagram: string
          }
        }
      };
    this.org = data.findOrgById; //if error then do each var indiv.
    const date = new Date(this.org.dateFounded);
    this.website = data.findOrgById.contactInfo.website;
    if(this.website == ""){
      this.website = "N/A";
    }
    this.twitter = data.findOrgById.contactInfo.twitter;
    if(this.twitter == ""){
      this.twitter = "N/A";
    }
    this.facebook = data.findOrgById.contactInfo.facebook;
    if(this.facebook == ""){
      this.facebook = "N/A";
    }
    this.instagram = data.findOrgById.contactInfo.instagram;
    if(this.instagram == ""){
      this.instagram = "N/A";
    }
    this.logoStr = data.findOrgById.logo;
    this.dateString = (date.getDay()+1 + "/" + (date.getMonth()) + "/" + date.getFullYear()).toString();
    const latLng = data.findOrgById.location.lat + "," + data.findOrgById.location.lng;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${this.appConfig.MAPS_API_KEY}`)
        .then((responseText) => {
            return responseText.json();
        })
        .then(jsonData => {
            this.address = jsonData.results[0].formatted_address;
        })
    });
  }

  async updateStats(){
    //get statistic by org id
    this.orgId = (await this.getObject()).name;
    const getStatsQuery = gql`query {
      getStatistic(orgId: "${this.orgId}") {
        createdTimeStamps
        createdDogs {
          _id
          dob
          breed
          gender
        }
        inProcessTimeStamps
        inProcessDogs {
          _id
          dob
          breed
          gender
        }
        adoptedTimeStamps
        adoptedDogs {
          _id
          dob
          breed
          gender
        }
        rejectedTimeStamps
        rejectedDogs {
          _id
          dob
          breed
          gender
        }
      }
    }`;
    this.apollo.watchQuery({
      query: getStatsQuery,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      const data = result.data as {
        getStatistic: {
          createdTimeStamps: Date[],
          createdDogs: {
            _id: string,
            dob: Date,
            breed: string,
            gender: string
          }[],
          inProcessTimeStamps: Date[],
          inProcessDogs: {
            _id: string,
            dob: Date,
            breed: string,
            gender: string
          }[],
          adoptedTimeStamps: Date[],
          adoptedDogs: {
            _id: string,
            dob: Date,
            breed: string,
            gender: string
          }[],
          rejectedTimeStamps: Date[],
          rejectedDogs: {
            _id: string,
            dob: Date,
            breed: string,
            gender: string
          }[]
        }
      };

      let count = 0;
      data.getStatistic.adoptedDogs.forEach(dog => {
        if(dog.gender == "Male"){
          this.maleDogsAdopted++;
        }
        if(dog.gender == "Female"){
          this.femaleDogsAdopted++;
        }
        //get the current age of the dog from dog.dob
        const ageOfDog = new Date().getFullYear() - new Date(dog.dob).getFullYear();
        this.averageAge += ageOfDog;
        count++;
      });
      this.averageAge = this.averageAge/count;

      //find most popular age in data.getStatistic.adoptedDogs
      let ageCount = 0;
      let age = new Date().getFullYear() - new Date(data.getStatistic.adoptedDogs[0].dob).getFullYear();
      for(let i = 0; i < data.getStatistic.adoptedDogs.length; i++){
        const tempAge = new Date().getFullYear() - new Date(data.getStatistic.adoptedDogs[i].dob).getFullYear();
        let tempCount = 0;
        for(let j = 0; j < data.getStatistic.adoptedDogs.length; j++){
          if(tempAge == new Date().getFullYear() - new Date(data.getStatistic.adoptedDogs[j].dob).getFullYear()){
            tempCount++;
          }
        }
        if(tempCount > ageCount){
          ageCount = tempCount;
          age = tempAge;
        }
      }
      this.mostPopularAge = age;

      //find most popular 3 breeds in data.getStatistic.adoptedDogs
      this.TopBreeds.breed1 = "";
      this.TopBreeds.breed2 = "";
      this.TopBreeds.breed3 = "";
      this.TopBreeds.amount1 = 0;
      this.TopBreeds.amount2 = 0;
      this.TopBreeds.amount3 = 0;

        for(let i = 0; i < data.getStatistic.adoptedDogs.length; i++){
          const tempBreed = data.getStatistic.adoptedDogs[i].breed;
          let tempCount = 0;
          for(let j = 0; j < data.getStatistic.adoptedDogs.length; j++){
            if(tempBreed == data.getStatistic.adoptedDogs[j].breed){
              tempCount++;
            }
          }
          if(tempCount > this.TopBreeds.amount1){
            this.TopBreeds.amount3 = this.TopBreeds.amount2;
            this.TopBreeds.amount2 = this.TopBreeds.amount1;
            this.TopBreeds.amount1 = tempCount;
            this.TopBreeds.breed3 = this.TopBreeds.breed2;
            this.TopBreeds.breed2 = this.TopBreeds.breed1;
            this.TopBreeds.breed1 = tempBreed;
          }
          else if(tempCount > this.TopBreeds.amount2 && tempBreed != this.TopBreeds.breed1){
            this.TopBreeds.amount3 = this.TopBreeds.amount2;
            this.TopBreeds.amount2 = tempCount;
            this.TopBreeds.breed3 = this.TopBreeds.breed2;
            this.TopBreeds.breed2 = tempBreed;
          }
          else if(tempCount > this.TopBreeds.amount3 && tempBreed != this.TopBreeds.breed1 && tempBreed != this.TopBreeds.breed2){
            this.TopBreeds.amount3 = tempCount;
            this.TopBreeds.breed3 = tempBreed;
          }
        }

        this.numAdoptStarted = data.getStatistic.inProcessDogs.length;
        this.numApproval = data.getStatistic.adoptedDogs.length;
        this.numRejections = data.getStatistic.rejectedDogs.length;

        let aveTimeAdoptApproveTemp = 0;
        let aveTimeAdoptApproveCount = 0;
        data.getStatistic.createdDogs.forEach(dog => {
          data.getStatistic.inProcessDogs.forEach(inProcessDog => {
            if(dog._id == inProcessDog._id){
              const date1 = new Date(data.getStatistic.inProcessTimeStamps[data.getStatistic.inProcessDogs.indexOf(inProcessDog)]);
              const date2 = new Date(data.getStatistic.createdTimeStamps[data.getStatistic.createdDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = ((diffTime / (1000 * 60 * 60)) % 24);
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeAdoptionStart = aveTimeAdoptApproveTemp.toFixed(2);

        aveTimeAdoptApproveTemp = 0;
        aveTimeAdoptApproveCount = 0;
        data.getStatistic.inProcessDogs.forEach(dog => {
          data.getStatistic.adoptedDogs.forEach(adoptedDog => {
            if(dog._id == adoptedDog._id){
              const date1 = new Date(data.getStatistic.adoptedTimeStamps[data.getStatistic.adoptedDogs.indexOf(adoptedDog)]);
              const date2 = new Date(data.getStatistic.inProcessTimeStamps[data.getStatistic.inProcessDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = ((diffTime / (1000 * 60 * 60)) % 24);
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeAdoptApprove = aveTimeAdoptApproveTemp.toFixed(2);

        aveTimeAdoptApproveTemp = 0;
        aveTimeAdoptApproveCount = 0;
        data.getStatistic.inProcessDogs.forEach(dog => {
          data.getStatistic.rejectedDogs.forEach(rejectedDog => {
            if(dog._id == rejectedDog._id){
              const date1 = new Date(data.getStatistic.rejectedTimeStamps[data.getStatistic.rejectedDogs.indexOf(rejectedDog)]);
              const date2 = new Date(data.getStatistic.inProcessTimeStamps[data.getStatistic.inProcessDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = ((diffTime / (1000 * 60 * 60)) % 24);
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeAdoptReject = aveTimeAdoptApproveTemp.toFixed(2);

        aveTimeAdoptApproveTemp = 0;
        aveTimeAdoptApproveCount = 0;
        data.getStatistic.createdDogs.forEach(dog => {
          data.getStatistic.adoptedDogs.forEach(adoptedDog => {
            if(dog._id == adoptedDog._id){
              const date1 = new Date(data.getStatistic.adoptedTimeStamps[data.getStatistic.adoptedDogs.indexOf(adoptedDog)]);
              const date2 = new Date(data.getStatistic.createdTimeStamps[data.getStatistic.createdDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = ((diffTime / (1000 * 60 * 60)) % 24);
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeFullProcess = aveTimeAdoptApproveTemp.toFixed(2);
  });
}

  back(){
    this.router.navigate(['/owneddogs']);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/adoptionprocess"]);
  }

  profile(){
    this.router.navigate(["/orgprofile"]);
  }

  preferences(){
    this.router.navigate(["/orgsettings"]);
  }

  gotoChat(){
    this.router.navigate(["/chatlist"]);
  }
}

