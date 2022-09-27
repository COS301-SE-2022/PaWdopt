import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from 'firebase/auth';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'pawdopt-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth],
})
export class LoginPageComponent {

  inputEmail!: string;
  inputPassword!: string;
 
  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth, private alertController: AlertController, private loadingCtrl: LoadingController) {
    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 650,
    });

    loading.present();
  }
  
  getUserType(id?: string){
    console.log("running");
    const getUserType = gql`query {
      getUserType(id: "${id}")
    }`;
  
   this.apollo.watchQuery({
      query: getUserType,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        getUserType: string
      }
      if(data.getUserType == "Adopter")
        {
          this.router.navigate(['/home']);
        }
        else if(data.getUserType == "OrgMember")
        {
          this.router.navigate(['/owneddogs']);
        }
        else{
          throw new Error("User type not found");
        }
    });
  }

  login()
  {
    this.showLoading();
    const email = this.inputEmail;
    const password = this.inputPassword;
    
    this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      try{
        this.getUserType(user.user?.uid);
      }
      catch(e){
        console.log(e);
      }
    }).catch(async (error) => {
      const alert = await this.alertController.create({
        header: 'Incorrect credentials',
        subHeader: '',
        message: 'Please try again with the correct information.',
        backdropDismiss: true,
        buttons: [
        {
          text: 'Ok',
        }
      ]
      });
      await alert.present();
      console.log("Error signing in");
      console.log(error);
    });
}

googleSignin(){
  return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then((user) => {
    console.log("running");
    const getUserType = gql`query {
      getUserType(id: "${user.user?.uid}")
    }`;
  
   this.apollo.watchQuery({
      query: getUserType,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        getUserType: string
      }
      if(data.getUserType == "Adopter")
        {
          this.router.navigate(['/home']);
        }
        else if(data.getUserType == "OrgMember")
        {
          this.router.navigate(['/owneddogs']);
        }
        else{
          let photoURL = user.user?.photoURL;
          if(photoURL == null)
            photoURL = "";
            
          const addUser = gql`mutation {
            createAdopter(adopter: {
              _id: "${user.user?.uid}",
              name: "${user.user?.displayName}",
              email: "${user.user?.email}",
              pic: "${photoURL}",
              uploadedDocs: false,
            })
            {
              name
            }
          }`;
          this.apollo.mutate({
            mutation: addUser,
          }).subscribe(() => {
            user.user?.sendEmailVerification();
            this.router.navigate(["/home"]);
          });
        }
    });
  }).catch((error) => {
    console.log("Error signing in");
    console.log(error);
  }
);}

signup(){
  // Done in signup
  this.router.navigate(["/signup"]);
}
  
addorg(){
  this.router.navigate(["/addorg"]);
}

}

