import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
@Component({
  selector: 'pawdopt-addorg',
  templateUrl: 'addorg.page.html',
  styleUrls: ['addorg.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth]
})
export class AddorgPageComponent {
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

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.orgMembers=[{
      name: "",
      email: "",
      role: ""
      }];
    this.orgMembers.pop();
  }

  addOrg(){
    //TODO: Add validation

    if(this.rulesReq == null || this.rulesReq == undefined){
      this.rulesReq = "";
    }
    if(this.email == null || this.email == undefined){
      this.email = "";
    }
    if(this.phone == null || this.phone == undefined){
      this.phone = "";
    }
    if(this.website == null || this.website == undefined){
      this.website = "";
    }
    if(this.facebook == null || this.facebook == undefined){
      this.facebook = "";
    }
    if(this.instagram == null || this.instagram == undefined){
      this.instagram = "";
    }
    if(this.twitter == null || this.twitter == undefined){
      this.twitter = "";
    }


    const orgMembersForQuery: [{
      _id?: string;
      name: string;
      email: string;
      role: string;
      verification: string;
    }] = [{
      _id: "asdfasdf",
      name: this.orgMembers[0].name,
      email: this.orgMembers[0].email,
      role: this.orgMembers[0].role,
      verification: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
    }];
    orgMembersForQuery.pop();

    this.orgMembers.forEach(o => {
      this.fireAuth.createUserWithEmailAndPassword(o.email, "123456").then((user) => {
        console.log("User created");
        console.log(user);
        user.user?.updateProfile({
          displayName: "OrgMember",
        });
        orgMembersForQuery.push({
          _id: user.user?.uid,
          name: o.name,
          email: o.email,
          role: o.role,
          verification: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
        });
      }).catch((error) => {
        console.log(error);
        //TODO: Toast error message
      });
    });

    const addOrg = gql`mutation{
      createOrg(org:{
        _id: "",
        name: "${this.oName}",
        about: "${this.about}",
        dateFounded: "${this.date}",
        members: [${orgMembersForQuery.map(o => `{
          _id: "${o._id}",
          name: "${o.name}",
          email: "${o.email}",
          organisation: "",
          role: "${o.role}",
          verification: "${o.verification}"
        }`).join(",")}],
        }],
        }],
        location:{
          lat: ${Number(this.lat)},
          lng: ${Number(this.lng)}
        },
        rulesReq: "${this.rulesReq}",
        contactInfo:{
          email: "${this.email}",
          phone: "${this.phone}",
          website: "${this.website}",
          facebook: "${this.facebook}",
          instagram: "${this.instagram}",
          twitter: "${this.twitter}"
        },
        logo: "${this.logo}"
      })
      {
        name
      }
    }`;

    console.log(addOrg);
    this.apollo.mutate({
      mutation: addOrg,
    }).subscribe(({data}) => {
      console.log('got data', data);
      this.router.navigate(["/dashboard"]);
    });
  }

  addOrgMemberCard(){
    this.orgMembers.push({
      name: "",
      email: "",
      role: ""
    });
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
