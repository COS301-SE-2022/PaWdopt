import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'pawdopt-adoptionprocess',
  templateUrl: 'adoptionprocess.page.html',
  styleUrls: ['adoptionprocess.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade, AngularFireAuth]
})
export class adoptionprocessPageComponent {

  orgId!:string;
  adopterEmail!:string;

  listedAdoptions:{
    _idUser: string;
    _idDog: string;
    nameUser: string;
    nameDog: string;
    picsUser: string;
    picsDog: string;
  }[] = [];

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private afAuth: AngularFireAuth){
    this.getAdoptions();
  }

  getAdoptions(){
    const userId = this.afAuth.currentUser.then(user => {
      return user?.uid;
    });

    if(userId){
      const findOrgMemberByIdQuery = gql`query {
        findOrgMemberById(_id: "${userId}") {
          _id
          organisation{
            _id
          }
        }`

      this.apollo.watchQuery({
        query: findOrgMemberByIdQuery,
        fetchPolicy: 'no-cache'
      }).valueChanges.subscribe((result) => {
        const data = result.data as {
          findOrgMemberById: {
            _id: string;
            organisation: {
              _id: string;
            }
          }
        }
        this.orgId = data.findOrgMemberById.organisation._id;

        const getOrgByNameQuery = gql`
          query findOrgById(_id: "${this.orgId}") {
            potentialAdopters{
              _id
              name
              pics
              dogsLiked{
                _id
                name
                pics
              }[]
            }`
        this.apollo.watchQuery({
          query: getOrgByNameQuery,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          console.log(result);
          const data = result.data as {
            findOrgByName: {
              potentialAdopters: {
                _id: string;
                name: string;
                pics: string[];
                dogsLiked: {
                  _id: string;
                  name: string;
                  pics: string[];
                }[]
              }[]
            }
          };

          data.findOrgByName.potentialAdopters.forEach(adopter => {
            adopter.dogsLiked.forEach(dog => {
              this.listedAdoptions.push({
                _idUser: adopter._id,
                _idDog: dog._id,
                nameUser: adopter.name,
                nameDog: dog.name,
                picsUser: adopter.pics[0],
                picsDog: dog.pics[0]
              });
            });
          });
        });
      });
    }
  }

  clickedSwiper(userId: string, dogID: string){
    this.varsFacade.setUserID(userId);
    this.varsFacade.setDogID(dogID);
    this.router.navigate(["/useradoption"]);
  }


  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

}

