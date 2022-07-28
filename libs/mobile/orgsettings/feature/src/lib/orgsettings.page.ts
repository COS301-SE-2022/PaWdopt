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

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.t_ID = "";
    this.t_OrgID = "";
    this.orgMembers=[{
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
          }
        }`;
        this.apollo.watchQuery({
          query: findOrganistaionId,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const  data = result.data as {
            findOrgMemberById: {
              organisation: string;
            }
          }
          this.t_OrgID = data.findOrgMemberById.organisation;
    
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
                email
                phone
                website
                facebook
                instagram
                twitter
              }
              logo
              members{
                name
                email
                role
              }
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
                date: Date;
                location: {
                  lat: string;
                  lng: string;
                },
                rulesReq: string;
                contactInfo: {
                  email: string;
                  phone: string;
                  website: string;
                  facebook: string;
                  instagram: string;
                  twitter: string;
                }
                logo: string;
                members: [{
                  name: string;
                  email: string;
                  role: string;
                }]
              }
            }
            this.oName = data.findOrgById.name;
            this.about = data.findOrgById.about;
            this.date = data.findOrgById.date;
            this.lat = data.findOrgById.location.lat;
            this.lng = data.findOrgById.location.lng;
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
        name: "${member.name}",
        email: "${member.email}",
        role: "${member.role}"
      },`;
    });

    const updateOrg = gql`mutation{
      updateOrg(_id: "${this.t_OrgID}",
        org: {
          name: "${this.oName}"
          about: "${this.about}"
          dateFounded: "${this.date}"
          location: {
            lat: "${this.lat}"
            lng: "${this.lng}"
          }
          rulesReq: "${this.rulesReq}"
          contactInfo: {
            email: "${this.email}"
            phone: "${this.phone}"
            website: "${this.website}"
            facebook: "${this.facebook}"
            instagram: "${this.instagram}"
            twitter: "${this.twitter}"
          }
          logo: "${this.logo}"
          members: [${orgMembersString}]
        }
      ){
        _id
      }
    }`;
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
    });
  }

  addOrgMemberCard(){
    this.orgMembers.push({
      name: "",
      email: "",
      role: ""
    });
  }

  updateOrgMemberCard(o: {name: string; email: string; role: string;}){
    const index = this.orgMembers.indexOf(o);
    this.orgMembers.splice(index, 1);
    this.orgMembers.push(o);
  }

  deleteOrgMemberCard(o: {name: string; email: string; role: string;}){
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
    this.router.navigate(["/login"]);
  }
}
