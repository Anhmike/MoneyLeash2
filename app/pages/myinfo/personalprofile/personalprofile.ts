import {Component} from '@angular/core';
import {NavController, Alert, ActionSheet, Modal, Loading} from 'ionic-angular';
import {ChangeEmailPage} from '../../myinfo/changeemail/changeemail';
import {ChangePasswordPage} from '../../myinfo/changepassword/changepassword';
import {ResetPasswordPage} from '../../myinfo/resetpassword/resetpassword';
import {RemoveUserPage} from '../../myinfo/removeuser/removeuser';
import {TutorialPage} from '../../tutorial/tutorial';
import {MyInput} from '../../mydirectives/my-input/my-input';

// Firebase service
import {FirebaseService} from '../../../providers/firebaseService'

@Component({
  templateUrl: 'build/pages/myinfo/personalprofile/personalprofile.html',
  directives: [MyInput]
})

export class PersonalProfilePage {
  user: {
    firstname?: string, 
    lastname?: string,
    title?: string,
    picture?: string,
    phone?: string,
    admin?: string,
    groupid?: string,
    groupname?: string,
    groupjoincode?: string,
    paymentplan?: string
  } = {};
  useremail: string;
      
  constructor(
      private nav: NavController,
      public fbservice: FirebaseService) {
        
        // populate screen here
        this.refreshUser();
      }
   
  private refreshUser() {
    this.fbservice.getUserProfile().then(thisUser => {
      this.user = thisUser;
    })
  }
  
  private saveUser() {
    this.fbservice.saveUserProfile(this.user);
    let alert = Alert.create({
      title: 'Saved Successfully',
      buttons: [{
        text: 'OK',
        handler: () => {
        }
      }]
    });
    this.nav.present(alert);
  }
    
  private presentActionSheet() {
    let actionSheet = ActionSheet.create({
      title: 'Manage your Account',
      buttons: [
        {
          text: 'Change Email',
          handler: () => {
            this.modalChangeEmail();
          }
        },
        {
          text: 'Change Password',
          handler: () => {
            this.modalChangePassword();
          }
        },
        {
          text: 'Reset Password',
          handler: () => {
            this.modalResetPassword();
          }
        },
        {
          text: 'Delete Account',
          role: 'destructive',
          handler: () => {
            new Promise(function(resolve, reject) {
              setTimeout(() => resolve(), 400);
            })
            .then(res => {
              this.nav.present(
                Alert.create({
                  title: 'Please Confirm',
                  message: 'Delete your account and ALL your data?',
                  buttons: [
                    {
                      text: 'Cancel',
                      handler: () => {
                        console.log('Cancel RemoveUser clicked');
                      }
                    },
                    {
                      text: 'Delete',
                      handler: () => {
                        this.modalRemoveUser();
                      }
                    }
                  ]
                }))
            });
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        }
      ]
    });
    this.nav.present(actionSheet);
  }
  
  private modalChangeEmail() {
    let modal = Modal.create(ChangeEmailPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doChangeEmail(data);
      }
    });
  }
  
  private modalChangePassword() {
    let modal = Modal.create(ChangePasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doChangePassword(data);
      }
    });
  }
  
  private modalResetPassword() {
    let modal = Modal.create(ResetPasswordPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doResetPassword(data);
      }
    });
  }
  
  private modalRemoveUser() {
    let modal = Modal.create(RemoveUserPage);
    this.nav.present(modal);
    modal.onDismiss((data: any[]) => {
      if (data) {
        this.doRemoveUser(data);
      }
    });
  }
  
  private doRemoveUser(data): void {
    
    /*// Remove user consists of 3 steps
    // 1) Remove personal profile info under members node
    this.auth.ref.child('members').child(this.auth.id).remove();
    
    // 2) Remove account information under houses node
    if (this.user.groupid != null) {
      this.auth.ref.child('houses').child(this.user.groupid).remove();
    }
    
    // 3) Remove user from Firebase
    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};
    this.auth.ref.removeUser({
      email: this.auth.authData.password.email,
      password: data.password
    }, (error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          case "INVALID_PASSWORD":
            console.log("The specified user account password is incorrect.");
            break;
          default:
            console.log("Error removing user:", error);
        }
      } else {
        console.log("User account deleted successfully!");
      }
    });
    // Navigate out of the app
    this.nav.setRoot(TutorialPage, {}, {animate: true, direction: 'reverse'});*/
  }
  
  private doChangeEmail(data): void {
    
    /*// Show loading component due to the time it takes Firebase to complete
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
    
    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};
    this.auth.ref.changeEmail({
      oldEmail: data.oldemail,
      newEmail: data.newemail,
      password: data.password
    }, (error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            myAlert.title = 'Invalid Password';
            myAlert.subtitle = 'The specified user account password is incorrect.';
            break;
          case "INVALID_USER":
            myAlert.title = 'Invalid User';
            myAlert.subtitle = 'The specified user account does not exist.';
            break;
          default:
            myAlert.title = 'Error creating user';
            myAlert.subtitle = error;
        }
      } else {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User email changed successfully!';
      }
      
      // We need to authenticate user again with new email to refresh auth token
      this.auth.signInWithEmailPassword(data.newemail, data.password)
      .then(() => this.DisplayResult(myAlert, loading))
      .catch(() => this.DisplayResult(myAlert, loading));
    });*/
  }
  
  private doChangePassword(data): void {
    
    /*// Show loading component due to the time it takes Firebase to complete
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
    
    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};
    this.auth.ref.changePassword({
      email: data.email,
      oldPassword: data.oldpassword,
      newPassword: data.newpassword
    }, (error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            myAlert.title = 'Invalid Password';
            myAlert.subtitle = 'The specified user account password is incorrect.';
            break;
          case "INVALID_USER":
            myAlert.title = 'Invalid User';
            myAlert.subtitle = 'The specified user account does not exist.';
            break;
          default:
            myAlert.title = 'Error changing password';
            myAlert.subtitle = error;
        }
      } else {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'User password changed successfully!';
      }
      this.DisplayResult(myAlert, loading);      
    });*/
    
  }
  
  private doResetPassword(data): void {
    
    /*// Show loading component due to the time it takes Firebase to complete
    let loading = Loading.create({
      content: 'Please wait...'
    });
    this.nav.present(loading);
    
    var myAlert: {
      title?: string, 
      subtitle?: string
    } = {};
    this.auth.ref.resetPassword({
      email: data.email
    }, (error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            myAlert.title = 'Invalid User';
            myAlert.subtitle = 'The specified user account does not exist.';
            break;
          default:
            myAlert.title = 'Error resetting password';
            myAlert.subtitle = error;
        }
      } else {
        myAlert.title = 'DONE';
        myAlert.subtitle = 'Password reset email sent successfully!';
      }
      this.DisplayResult(myAlert, loading);      
    });*/
    
  }
  
  private DisplayResult(myAlert, loading): void {
    loading.dismiss();
    let alert = Alert.create({
      title: myAlert.title,
      subTitle: myAlert.subtitle,
      buttons: [{
        text: 'OK',
        handler: () => {
          let navTransition = alert.dismiss();
          navTransition.then(() => {
            this.nav.pop();
          });
        }
      }]
    });
    this.nav.present(alert);
  } 
  
}