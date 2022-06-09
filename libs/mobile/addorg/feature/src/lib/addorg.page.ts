import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'pawdopt-addorg',
  templateUrl: 'addorg.page.html',
  styleUrls: ['addorg.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class AddorgPageComponent {
  oName!: string;
  pass!: string;
  rePass!: string;
  email!: string;

  constructor(private router: Router, private apollo: Apollo) {}

  addOrg(){
    // TODO Complete login validation
    console.log("organisation validation");

    const orgname = this.oName;
    const password = this.pass;
    const rePassword = this.rePass;
    const email = this.email;

    const checkEmail = gql`query {
      emailExists(email: "${this.email}")
    }`;

    const checkOrgname = gql`query {
      organisationNameExists(name: "${this.oName}")
    }`;

    this.apollo.watchQuery({
      query: checkOrgname,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        orgnameExists: boolean;
      }
      if(data.orgnameExists){
        alert("Organisation name already exists");
      }else{
        this.apollo.watchQuery({
          query: checkEmail,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          console.log(result);
          const data = result.data as {
            emailExists: boolean;
          }
          if(orgname != null){
            if(password == rePassword){ 
              if(email != null){
                if(!data.emailExists){
                  console.log("success");
                  this.addOrganisation();
                }else{
                  console.log("failure");
                  alert("Email already exists");
                }
              }else{
                console.log("failure");
                alert("Please enter an email");
              }
            }else{
              console.log("failure");
              alert("Passwords do not match");
            }
          }else{
            console.log("failure");
            alert("Please enter a Organisation Name");
          }
        });
      }
    });
  }

  addOrganisation(){
    const addOrg = gql`mutation{
      createOrg(org:{
        name: "${this.oName}",
        about: "",
        dateFounded: "2000-01-01",
        members: [{
          name: "initial",
          email: "${this.email}",
          password: "${this.pass}",
          organisation: "ChrisCorp"   
        }],
        location:{
          lat:0,
          lng:0
        },
        rulesReq:[""]
        contactInfo:{
          email: "${this.email}",
          phone: "",
          website: "",
          facebook: "",
          instagram: "",
          twitter: ""
        },
        logo:{
          path: ""
        }
      })
      {
        name
      }
    }`;

    this.apollo.mutate({
      mutation: addOrg,
    }).subscribe(({data}) => {
      console.log('got data', data);
      this.router.navigate(["/dashboard"]);
    });
  }

  Back(){
    this.router.navigate(["/login"]);
  }
}
