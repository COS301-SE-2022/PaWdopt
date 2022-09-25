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

  aveTimeAdoptionStart = 0;
  aveTimeAdoptApprove = 0;
  aveTimeAdoptReject = 0;
  aveTimeFullProcess = 0;

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
  }


  async getObject() {
    const ret = await Storage.get({ key: 'orgToPref' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async getOrg(){
    
    this.orgId = (await this.getObject()).name;
    console.log(this.orgId);
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
      }
    }`;
    this.apollo.watchQuery({
      query: findOrgByIdQuery,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      console.log(result);
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
        }
      };
    this.org = data.findOrgById; //if error then do each var indiv.
    const date = new Date(this.org.dateFounded);
    this.logoStr = data.findOrgById.logo;
    this.dateString = (date.getDay()+1 + "/" + (date.getMonth()) + "/" + date.getFullYear()).toString();
    const latLng = data.findOrgById.location.lat + "," + data.findOrgById.location.lng;
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng}&key=${this.appConfig.MAPS_API_KEY}`)
        .then((responseText) => {
            return responseText.json();
        })
        .then(jsonData => {
            this.address = jsonData.results[0].formatted_address;
            console.log("Address:" + this.address);
        })
        .catch(error => {
            console.log(error);
        })
    });
  }

  updateStats(){
    //get statistic by org id
    const getStatsQuery = gql`query {
      getStatistic(orgId: "${this.orgId}") {
        createdTimeStamps
        createdDogs {
          age
          breed
          gender
        }
        inProcessTimeStamps
        inProcessDogs {
          age
          breed
          gender
        }
        adoptedTimeStamps
        adoptedDogs {
          age
          breed
          gender
        }
        rejectedTimeStamps
        rejectedDogs {
          age
          breed
          gender
        }
      }
    }`;
    this.apollo.watchQuery({
      query: getStatsQuery,
      fetchPolicy: 'network-only'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        getStatistic: {
          createdTimeStamps: Date[],
          createdDogs: {
            age: number,
            breed: string,
            gender: string
          }[],
          inProcessTimeStamps: Date[],
          inProcessDogs: {
            age: number,
            breed: string,
            gender: string
          }[],
          adoptedTimeStamps: Date[],
          adoptedDogs: {
            age: number,
            breed: string,
            gender: string
          }[],
          rejectedTimeStamps: Date[],
          rejectedDogs: {
            age: number,
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
          this.maleDogsAdopted++;
        }
        this.averageAge += dog.age;
        count++;
      });
      this.averageAge = this.averageAge/count;

      //find most popular age in data.getStatistic.adoptedDogs
      let ageCount = 0;
      let age = data.getStatistic.adoptedDogs[0].age;
      for(let i = 0; i < data.getStatistic.adoptedDogs.length; i++){
        const tempAge = data.getStatistic.adoptedDogs[i].age;
        let tempCount = 0;
        for(let j = 0; j < data.getStatistic.adoptedDogs.length; j++){
          if(tempAge == data.getStatistic.adoptedDogs[j].age){
            tempCount++;
          }
        }
        if(tempCount > ageCount){
          ageCount = tempCount;
          age = tempAge;
        }
      }
      this.mostPopularAge = age;

      //find most popular 5 breeds in data.getStatistic.adoptedDogs
      this.TopBreeds.breed1 = data.getStatistic.adoptedDogs[0].breed;
      this.TopBreeds.breed2 = data.getStatistic.adoptedDogs[0].breed;
      this.TopBreeds.breed3 = data.getStatistic.adoptedDogs[0].breed;
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
          else if(tempCount > this.TopBreeds.amount2){
            this.TopBreeds.amount3 = this.TopBreeds.amount2;
            this.TopBreeds.amount2 = tempCount;
            this.TopBreeds.breed3 = this.TopBreeds.breed2;
            this.TopBreeds.breed2 = tempBreed;
          }
          else if(tempCount > this.TopBreeds.amount3){
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
            if(dog == inProcessDog){
              const date1 = new Date(data.getStatistic.inProcessTimeStamps[data.getStatistic.inProcessDogs.indexOf(inProcessDog)]);
              const date2 = new Date(data.getStatistic.createdTimeStamps[data.getStatistic.createdDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeAdoptionStart = aveTimeAdoptApproveTemp;

        aveTimeAdoptApproveTemp = 0;
        aveTimeAdoptApproveCount = 0;
        data.getStatistic.inProcessDogs.forEach(dog => {
          data.getStatistic.adoptedDogs.forEach(adoptedDog => {
            if(dog == adoptedDog){
              const date1 = new Date(data.getStatistic.adoptedTimeStamps[data.getStatistic.adoptedDogs.indexOf(adoptedDog)]);
              const date2 = new Date(data.getStatistic.inProcessTimeStamps[data.getStatistic.inProcessDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeAdoptApprove = aveTimeAdoptApproveTemp;

        aveTimeAdoptApproveTemp = 0;
        aveTimeAdoptApproveCount = 0;
        data.getStatistic.inProcessDogs.forEach(dog => {
          data.getStatistic.rejectedDogs.forEach(rejectedDog => {
            if(dog == rejectedDog){
              const date1 = new Date(data.getStatistic.rejectedTimeStamps[data.getStatistic.rejectedDogs.indexOf(rejectedDog)]);
              const date2 = new Date(data.getStatistic.inProcessTimeStamps[data.getStatistic.inProcessDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeAdoptReject = aveTimeAdoptApproveTemp;

        aveTimeAdoptApproveTemp = 0;
        aveTimeAdoptApproveCount = 0;
        data.getStatistic.createdDogs.forEach(dog => {
          data.getStatistic.adoptedDogs.forEach(adoptedDog => {
            if(dog == adoptedDog){
              const date1 = new Date(data.getStatistic.adoptedTimeStamps[data.getStatistic.adoptedDogs.indexOf(adoptedDog)]);
              const date2 = new Date(data.getStatistic.createdTimeStamps[data.getStatistic.createdDogs.indexOf(dog)]);
              //get the difference between the two dates, and convert to days
              const diffTime = Math.abs(date2.getTime() - date1.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              aveTimeAdoptApproveTemp += diffDays;
              aveTimeAdoptApproveCount++;
            }
          });
        });
        aveTimeAdoptApproveTemp = aveTimeAdoptApproveTemp / aveTimeAdoptApproveCount;
        this.aveTimeFullProcess = aveTimeAdoptApproveTemp;
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
    // this.router.navigate(["/preferences"]); 
  }

}

