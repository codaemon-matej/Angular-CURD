import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormArray, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { CategoryService } from '../category/category.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html'
})

export class ModalComponent implements OnInit {
	
  title = 'Add Category';
  categoryDetailsForm: FormGroup;
  category: any = {};
  id = '';
  newCategory: any = {};

  constructor(
  	public dialogRef: MatDialogRef<ModalComponent>,
  	private _fb: FormBuilder,
    public router: Router,
    //public categoryService: CategoryService,
    public actRoute: ActivatedRoute,
    public _snackBar: MatSnackBar) { }

    validation_messages = {
	    'name': [
	      { type: 'required', message: 'Category is required' }
	    ]
	};

  confirmSelection() {
    this.dialogRef.close(this.newCategory);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  	this.categoryDetailsForm = this._fb.group({
      name: [''],
      ordering: [''],
    });
  }

  // When click on submit button in add Category form, control will come here
	/*save() {
		const category = {category: this.categoryDetailsForm.value};
    const snackBarRef = this._snackBar.open('Category added successfully wait for page to redirect');
	  this.categoryService.addCategory(category).subscribe((data: {data: {_id: '', name: ''}}) => {
      this.newCategory = {"id": data.data._id, "name": data.data.name};
      this.dialogRef.close(this.newCategory);
      snackBarRef.dismiss();   
	  });
	} */

}