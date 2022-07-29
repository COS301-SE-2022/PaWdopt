import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'pawdopt-orgsettings',
  templateUrl: 'orgsettings.page.html',
  styleUrls: ['orgsettings.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth]
})
export class OrgSettingsPageComponent {
  oName!: string;
  about!: string;
  date!: Date;
  lat!: string;
  lng!: string;
  rulesReq!: string;
  email!: string;
  phone!: string;
  website!: string;
  facebook!: string;
  instagram!: string;
  twitter!: string;
  logo!: string;

  orgMembers: [{
    _id: string;
    name: string;
    email: string;
    role: string;
  }]
  slideOpts = {
    slidesPerView: 1,
    freeMode: false,
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  }
  t_ID: string;
  t_OrgID: string;
  conInfoId: string;
  totalAdoptions: string;
  totalDogs: string;
  loggedInUserRole: string;

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.t_ID = "";
    this.t_OrgID = "";
    this.conInfoId = "";
    this.totalAdoptions = "";
    this.totalDogs = "";
    this.loggedInUserRole = "";
    this.orgMembers=[{
      _id: "",
      name: "",
      email: "",
      role: ""
      }];
    this.orgMembers.pop();
    this.fireAuth.currentUser.then(user => {
      if(user?.uid){
        this.t_ID = user?.uid;
        
        const findOrganistaionId = gql`query{
          findOrgMemberById(_id: "${this.t_ID}"){
            organisation
            role
          }
        }`;
        this.apollo.watchQuery({
          query: findOrganistaionId,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const  data = result.data as {
            findOrgMemberById: {
              organisation: string;
              role: string;
            }
          }
          this.t_OrgID = data.findOrgMemberById.organisation;
          this.loggedInUserRole = data.findOrgMemberById.role;
          // const nameInput = document.getElementById('org-member-name-field');
          // const emailInput = document.getElementById('org-member-email-field');
          // const roleInput = document.getElementById('org-member-role-field');
          // if(this.loggedInUserRole === "admin"){
          //   nameInput?.removeAttribute('disabled');
          //   emailInput?.removeAttribute('disabled');
          //   roleInput?.removeAttribute('disabled');
          // } else {
          //   nameInput?.setAttribute('disabled', 'true');
          //   emailInput?.setAttribute('disabled', 'true');
          //   roleInput?.setAttribute('disabled', 'true');
          // }
    
          const findOrganistaion = gql`query{
            findOrgById(_id: "${this.t_OrgID}"){
              name
              about
              dateFounded
              location{
                lat
                lng
              }
              rulesReq
              contactInfo{
                _id
                email
                phone
                website
                facebook
                instagram
                twitter
              }
              logo
              members{
                _id
                name
                email
                role
              }
              totalAdoptions
              totalDogs
            }
          }`;
          // console.log(findOrganistaion);
          this.apollo.watchQuery({
            query: findOrganistaion,
            fetchPolicy: 'no-cache'
          }).valueChanges.subscribe((result) => {
            const  data = result.data as {
              findOrgById: {
                name: string;
                about: string;
                dateFounded: Date;
                location: {
                  lat: string;
                  lng: string;
                },
                rulesReq: string;
                contactInfo: {
                  _id: string;
                  email: string;
                  phone: string;
                  website: string;
                  facebook: string;
                  instagram: string;
                  twitter: string;
                }
                logo: string;
                members: [{
                  _id: string;
                  name: string;
                  email: string;
                  role: string;
                }];
                totalAdoptions: string;
                totalDogs: string;
              }
            }
            this.oName = data.findOrgById.name;
            this.about = data.findOrgById.about;
            this.date = data.findOrgById.dateFounded;
            this.lat = data.findOrgById.location.lat;
            this.lng = data.findOrgById.location.lng;
            this.totalAdoptions = data.findOrgById.totalAdoptions;
            this.totalDogs = data.findOrgById.totalDogs;
            this.conInfoId = data.findOrgById.contactInfo._id;
            if(data.findOrgById.rulesReq)
              this.rulesReq = data.findOrgById.rulesReq;
            if(data.findOrgById.contactInfo.email)
              this.email = data.findOrgById.contactInfo.email;
            if(data.findOrgById.contactInfo.phone)
              this.phone = data.findOrgById.contactInfo.phone;
            if(data.findOrgById.contactInfo.website)
              this.website = data.findOrgById.contactInfo.website;
            if(data.findOrgById.contactInfo.facebook)
              this.facebook = data.findOrgById.contactInfo.facebook;
            if(data.findOrgById.contactInfo.instagram)
              this.instagram = data.findOrgById.contactInfo.instagram;
            if(data.findOrgById.contactInfo.twitter)
              this.twitter = data.findOrgById.contactInfo.twitter;
            if(data.findOrgById.logo)
              this.logo = data.findOrgById.logo;
            if(data.findOrgById.members)
              this.orgMembers = data.findOrgById.members;
          });
        });
      }
    });
  }

  updateOrg(){
    //update here
    let orgMembersString = "";
    this.orgMembers.forEach(member => {
      member.email.toLowerCase();
      orgMembersString += `{
        _id: "${member._id}",
        name: "${member.name}",
        email: "${member.email}",
        role: "${member.role}",
        organisation: "${this.t_OrgID}"
      },`;
    });

    const date = new Date(this.date);
    const updateOrg = gql`mutation{
      updateOrg(_id: "${this.t_OrgID}",
        org: {
          _id: "${this.t_OrgID}",
          name: "${this.oName}"
          about: "${this.about}"
          dateFounded: "${date.getFullYear()}-${date.getMonth()}-${date.getDate()}"
          location: {
            lat: ${this.lat}
            lng: ${this.lng}
          }
          contactInfo: {
            _id: "${this.conInfoId}"
          }
          members: [${orgMembersString}]
          totalAdoptions: ${this.totalAdoptions}
          totalDogs: ${this.totalDogs}
        }
      ){
        _id
      }
    }`;
    console.log(updateOrg);
    this.apollo.mutate({
      mutation: updateOrg,
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      const  data = result.data as {
        updateOrg: {
          _id: string;
        }
      }
      console.log(data);
      this.router.navigate(['/owneddogs']);
    });
  }

  addOrgMemberCard(){
    this.orgMembers.push({
      _id: "",
      name: "",
      email: "",
      role: ""
    });
  }

  deleteOrgMemberCard(o: {_id: string; name: string; email: string; role: string;}){
    const index = this.orgMembers.indexOf(o);
    this.orgMembers.splice(index, 1);
  }

  uploadPic(){
    // TODO: Upload pic
  }

  uploadDoc(){
    // TODO: Upload doc
  }

  Back(){
    this.router.navigate(["/owneddogs"]);
  }
}
