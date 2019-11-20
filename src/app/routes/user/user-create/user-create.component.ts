import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
//import { } from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
declare let google: any;
//import { RoleService } from '../role/role.service';
import { UserCreateService } from '../user-create/user-create.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {


  //@ViewChild(AgmMap) map: AgmMap;

  title = 'Add User';
  userForm: FormGroup;
  roles: any = [];
  categories: any = [];
  filteredCategories: any = [];
  showCategories = false;
  showDeathdate = false;
  hide = true;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public address: string;
  
  categoryplaceholderLabel = 'Search Categories';
  categorynoEntriesLabel = 'No Categories Found';

  get f() { return this.userForm.controls; }

  get weblinkurl() { return this.userForm.get('weblink'); }

  get videolinkurl() { return this.userForm.get('videolink'); }

  constructor(
    private fb: FormBuilder, 
    //public roleService: RoleService, 
    public userService: UserCreateService, 
    public router: Router,
    public actRoute: ActivatedRoute,
    public _snackBar: MatSnackBar,
    ) { 
  	const reg = '^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$';
    const numReg = "/\\(?\\d{3}\\)?[-\\/\\.\\s]?\\d{3}[-\\/\\.\\s]?/";
  	this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(reg)]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      organisation: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required]],
      role: ['', [Validators.required]],
      weblink: ['', Validators.pattern(reg)],
      videolink: ['', Validators.pattern(reg)],
      date_of_death: [''],
      category: [[], ],
    });
  }

  ngOnInit() {
  	this.zoom = 10;
    this.latitude = 48.864716;
    this.longitude = 2.349014;
    //this.getRoles();
    this.getCategories();
    if (this.router.url.includes('update')) { 
      this.title = 'Update User';
      let id = this.actRoute.snapshot.params['id'];
      this.userService.getUser(id).subscribe((data: any) => {
        let user = data; console.log(user);
        this.userForm.patchValue({
          username: user.data.name.en,
          phone: user.data.phone,
          email: user.data.email,
          password: user.data.password,
          weblink: user.data.weblink,
          videolink: user.data.videolink
        });
      });
    };
  }
  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'You must enter a value'
      : form.get('email').hasError('email')
      ? 'Not a valid email'
      : '';
  }

  checkUrl(event, urlType) {
    const string = event;
    if (!~string.indexOf('http')) {
      const url: any = 'https://' + string;
      if (urlType === 'weblink') {
        let weblink = url;
      } else if (urlType === 'videolink') {
        let videolink = url;
      }
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.address = result.formatted_address;
  }

  onLocationSelected(Location) {
    this.latitude = Location.latitude;
    this.longitude = Location.longitude;
  }

  /*public getRoles() {
    const _this = this;
    this.roleService.getRoles().subscribe((data: any) => {
      const roles = data.data;
      roles.forEach(role => {
        _this.roles.push({ id: role._id, name: role.name });
      });
    });
  }*/

  public getCategories() {
    this.userService.getCategories().subscribe((data: any) => {
      const categories = data.data;
      const _this = this;
      categories.forEach(category => {
        _this.categories.push({ id: category._id, name: category.name });
      });
      this.filteredCategories = this.categories;
    });
  }

  onRoleSelect(event) {
    const _this = this;
    const roles = [];
    event.forEach(role => {
      roles.push(role.name);
    });
    this.showCategories = roles.includes('Expert') ? true : false;
    this.showDeathdate = roles.includes('Artist') ? true : false;
  }

  compareRoles(roles: any, selectedRoles: any) {
    return roles.id === selectedRoles.id;
  }

  compareCategory(categories: any, categoryfetch: any) {
    return categories.id === categoryfetch.id;
  }

  searchCategory(value: string) {
    const filter = value.toLowerCase();
    if (value !== '') {
      return this.categories.filter(option => option.name.toLowerCase().startsWith(filter));
    }
    return this.categories;
  }

  onKeyPress(value) {
    this.filteredCategories = this.searchCategory(value);
  }

  public resetSearch(opened: boolean) {
    if (!opened) {
      this.filteredCategories = this.searchCategory('');
    }
  }

  convertDateTimeStamp(date) { console.log("convertDateTimeStamp",date);
    const datetime = Math.round(new Date(date).getTime());
    return datetime;
  }

  onSubmit(_model: any) { console.log("onSubmit");
    let snackBarRef; 
  	if (this.userForm.valid) {  console.log("valid. valid");
      this.userForm.value.date_of_birth = this.convertDateTimeStamp(this.userForm.value.date);
      this.userForm.value.date_of_death = this.convertDateTimeStamp(this.userForm.value.date_of_death);
      this.userForm.value.location = { type: 'Point', coordinates: [this.longitude, this.latitude] };
      this.userForm.value.full_address = this.address;
  		const user = { user: this.userForm.value };  console.log("user",user);
      this.userService.addUsers(user).subscribe((data: {}) => { console.log("userdata",this.userService);
        snackBarRef = this._snackBar.open('User added successfully wait for page to redirect', '', {
          duration: 2000,
        });
      },
      error => {
        if (error === '404') {
          snackBarRef = this._snackBar.open('user already exist with the given email/phone ', '', {
            duration: 2000,
          });
        }
      }
      );
  	}
  }






}
