import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { ProcurementService } from '../procurement.service';
import { Location } from "@angular/common";
import { environment } from 'src/environments/environment';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],

})
export class FormComponent implements OnInit {

  public formgroup: FormGroup;
  public formSubmitted = false;
  public disable = false;
  public id: any;
  category: any = [] = [];
  product: any[] = [];
  tableProduct: any = [] = [];
  specification: any = [];
  tableSpec: any = [] = [];
  other: boolean[] = [];
  filter_data: any[] = [];
  baseUrl = environment.baseUrl;
  added_spec: any[] = [];
  public file_info: any[] = [];
  public attachments: any[] = [];
  units: any[] = [];
  comment: any;
  arrayData = [];
  editing = null;
  deleted = [];
  requestStatus: any;
  sending: boolean = false;
  isProductOther: boolean = false;
  plan = null;
  planData = null;
  public showUnit = true;


  public Editor = ClassicEditor;
  public toolbar = ['bold', 'italic', 'undo', 'redo', 'numberedList', 'bulletedList'];

  public isBasicCollapsed = false;
  public isItemFormCollapsed = false;
  public isItemListCollapsed = true;
  public isSpecCollapsed = false;
  public isCommentCollapsed = true;
 

  constructor(public service: ProcurementService, public acti_route: ActivatedRoute, public router: Router, public location: Location) {
    this.formgroup = new FormGroup({
      id: new FormControl(null),
      public_sector_id: new FormControl(localStorage.getItem('userId')),
      description: new FormControl(null, Validators.required),
      type: new FormControl('procurement'),
      status: new FormControl(null),
      detail: new FormArray([]),
    });
  }

  ngOnInit() {
    this.id = this.acti_route.snapshot.paramMap.get('id');
    this.plan = this.acti_route.snapshot.paramMap.get('reqId');

    this.load_category();
    this.filter();

    if (this.plan) {
      this.service.getPlan(this.plan).subscribe((data: any) => {
        this.planData = data;
      });
    }

    if (this.id) {
      this.service.get(this.id).subscribe((data: any) => {
        this.comment = data.comment;
        this.formgroup.patchValue(data);
        this.requestStatus = data.status;
        this.arrayData = data.detail;
        this.arrayData.forEach((el, i) => {
          this.service.load_product(el.product_category_id).subscribe((data: any) => {
            this.tableProduct[i] = data;
          });
          this.service.load_specification(el.product_id).subscribe((data: any) => {
            this.tableSpec[i] = data;
          });
        })
        if (data.status != null) {
          this.formgroup.disable();
          this.disable = true;
        }
      });

    } else {
      this.editRow(null, 0);
    }
  }

  Submit() {
    this.formSubmitted = true;
    this.arrayData.forEach(e => {
      if (e.other && e.other !== '') {
        e.product_id = null;
      }
    })
 if (this.formgroup.get('description').valid && this.arrayData.length) {
      this.sending = true;
      this.disable = true;
      const param = {
        id: this.id ?? null,
        public_sector_id: localStorage.getItem('userId'),
        requested_by: localStorage.getItem('userId'),
        detail: this.arrayData,
        type: 'procurement',
        status: null,
        description: this.GC('description').value,
        deleted: this.deleted
      }

      this.formgroup.getRawValue().detail = this.arrayData;
      this.service.save(param).subscribe((response: any) => {
        if (response.status) {
          this.sending = false;
          this.disable = false;
          alert(response.message);
          this.router.navigateByUrl("request/procurement");

        } else {
          this.sending = false;
          alert(response.message);
          this.disable = false;
        }

      }, (er => {
        this.sending = false;
      }));

    } else{
return;
    }

  }

  GC(name): FormControl {
    return this.formgroup.get(name) as FormControl;
  }

  GA(): FormArray {
    return this.formgroup.get('detail') as FormArray;
  }

  GG(index): FormGroup {
    return this.GA().controls[index] as FormGroup;
  }

  async editRow(data: any, index: any) {
    
    data ? this.showUnit = data.product_id ? false : true : null;

    data ? this.editing = index.toString() : null;
    this.GA().controls[0] =
      new FormGroup({
        id: new FormControl(data ? data.id : null),
        product_category_id: new FormControl(data ? data.product_category_id : null, Validators.required),
        product_id: new FormControl(data ? data.product_id : null, !this.other[index] ? Validators.required : null),
        specification_id: new FormControl(data ? data.specification_id : null, !this.other[index] ? Validators.required : null),
        quantity: new FormControl(data ? data.quantity : 0, Validators.required),
        unit: new FormControl(data ? data.unit : null, Validators.required),
        budget_source: new FormControl(data ? data.budget_source : null, Validators.required),
        budget_amount: new FormControl(data ? data.budget_amount : null, Validators.required),
        estimated_delivery_date: new FormControl(data ? data.estimated_delivery_date : null, Validators.required),
        other: new FormControl(data ? data.other : null, this.other[index] ? Validators.required : null),
        product_name: new FormControl(data ? data.product_name : null, this.other[index] ? Validators.required : null),
        estimated_cost: new FormControl(data ? data.estimated_cost : 0, Validators.required),
        currency: new FormControl(data ? data.currency : null, Validators.required),
        document: new FormControl(data ? data.document : null)
      })

    this.GA().updateValueAndValidity();
    data ? this.load_product(data.product_category_id, index) : null;
    data ? this.load_specification(data.product_id ?? 'other', index, [data], false) : null;
    data ? data.other ? await this.change_specification(true, index, false) : this.change_specification(false, index, false) : null;
    data ? data.other ? null : this.GG(0).get('other').disable() : this.GG(0).get('other').disable();

  }

  async add(data: any, index?: any) {
    data ? this.arrayData.push(data) : null;
    if (this.editing && index.toString()) {
      data ? this.load_product(data.product_category_id, index) : null;
      data ? this.load_specification(data.product_id ?? 'other', index, [data], false) : null;
      data ? data.other ? await this.change_specification(true, index, false) : this.change_specification(false, index, false) : null;
      data ? data.other ? null : this.GG(0).get('other').disable() : this.GG(0).get('other').disable();
    }
    this.clearRow();
  }

  clearRow() {
    const ctrl = [
      "product_category_id", "product_id", "specification_id", "quantity", "unit", "budget_source",
      "budget_amount", "estimated_delivery_date", "other", "product_name", "estimated_cost", "currency", "document",
    ]
    ctrl.forEach(el => {
      this.GA().controls[0].get(el).setValue(null);
    })
    this.specification = [];
    this.editing = null;
    this.specLength();
    this.attachments[0] = null;
    this.file_info[0] = null;
    this.GG(0).get('document').setValue(null);

  }

  remove(id, index) {
    if (confirm('are you sure remove this ?')) {
      if (id) {
        this.disable = true;
        this.service.remove(id).subscribe((response: any) => {
          if (response.status) {
            this.GA().removeAt(index);
          }

          this.disable = false;
          alert(response.message);
        });

      } else {
        this.GA().removeAt(index);
      }
    }
  }

  filter() {
    let data = ['unit', 'budget_source', 'currency'];
    this.service.filter(data).subscribe((data: any) => {
      this.units = data.unit;
      this.filter_data["unit"] = data.unit;
      this.filter_data["budget_source"] = data.budget_source;
      this.filter_data["currency"] = data.currency;
    });
  }

  load_category() {
    this.service.load_category().subscribe((data: any) => {
      this.category = data;
    });
  }

  load_product(id, index) {
    this.product = [];
    this.editing ? this.tableProduct[+this.editing] = [] : this.arrayData.length ? this.tableProduct[this.arrayData.length] = [] : this.tableProduct[0] = [];
    this.service.load_product(id).subscribe((data: any) => {
      this.product = data;
      this.product[this.product.length] = { value: 'other', text: 'Other', unit: null }
      this.editing ? this.tableProduct[+this.editing] = data : this.arrayData.length ? this.tableProduct[this.arrayData.length] = data : this.tableProduct[0] = data;
    });
  }

  load_specification(id, index, unit: any[] = [], reset = true) {

    this.specification = [];
    this.editing ? this.tableSpec[+this.editing] = [] : this.arrayData.length ? this.tableSpec[this.arrayData.length] = [] : this.tableSpec[0] = [];

    if (id !== 'other') {
      this.GG(0).get('product_name').setValue(null);
      this.isProductOther = false;
      this.GG(0).get('product_name').disable();
      reset ? this.GG(0).get('specification_id').setValue(null) : null;

      this.service.load_specification(id).subscribe((data: any) => {
        this.specification = data;
        this.editing ? this.tableSpec[+this.editing] = data : this.arrayData.length ? this.tableSpec[this.arrayData.length] = data : this.tableSpec[0] = data;
      });

      this.GG(0).get('product_id').setValidators(Validators.required);
      this.GG(0).get('product_id').updateValueAndValidity();

      if (!unit.length) {
        this.product.length ? unit = this.product.filter((x: any) => { return x.value === id; }) : null;
      }

      unit.length > 0 ? this.GG(0).get('unit').setValue(unit[0].unit) : null;
      this.GG(0).get('unit').disable();

      this.showUnit = false;

    } else {
      this.showUnit = true;

      // this.other[index] = true;
      this.other[index] = this.GG(0).get('other').value;
      this.isProductOther = true;
      // this.change_specification(true, index);
      this.GG(0).get('unit').setValue(null)
      this.GG(0).get('unit').enable();
      this.GG(0).get('other').enable();
      this.GG(0).get('product_name').enable();
      this.GG(0).get('other').setValidators(Validators.required);
      this.GG(0).get('other').updateValueAndValidity();
      this.GG(0).get('product_name').setValidators(Validators.required);
      this.GG(0).get('product_name').updateValueAndValidity();
      this.GG(0).get('specification_id').clearValidators();
      this.GG(0).get('specification_id').updateValueAndValidity();

    }

  }
  setRadio(i){
  
      this.GG(0).get('specification_id').setValue(this.specification[i].value);
    
  }
  specLength() {
    return this.specification.length;
  }

  cancel() {
    this.location.back();
  }

  fileChangeEvent(file: any, index) {
    this.file_info[index] = file[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.GG(0).get('document').setValue(reader.result.toString());
    };

    reader.readAsDataURL(this.file_info[index]);
    this.GG(0).get('document').setValue(this.file_info[index]);

  }

  isBase64(index) {
    if (/^data:*/.test(this.GG(0).get('document').value)) {
      return this.attachments[index];

    } else {
      return environment.baseUrl + "/" + this.GG(0).get('document').value;

    }

  }

  change_specification(checked, index, reset = true) {
    if (checked) {
      reset ? this.GG(0).get('specification_id').setValue(null) : null;
      this.GG(0).get('specification_id').disable();
      this.GG(0).get('other').enable();

      this.GG(0).get('other').setValidators(Validators.required);
      this.GG(0).get('other').updateValueAndValidity();
      this.GG(0).get('other').setValue(this.other[index]);

    } else {
      if (!this.GG(0).get('other').value) {
        this.clearOther(index, reset);

      } else {
        this.other[index] = this.GG(0).get('other').value;
        this.clearOther(index, reset);

      }

    }

  }

  budgetAmountUpdate(){
    const value = (this.GG(0).get('quantity').value) * (this.GG(0).get('estimated_cost').value);
    this.GG(0).get('budget_amount').setValue(value);
  }
  
  readMore(index, value){
    this.specification[index].readmore = value;
    this.specification[index].text = value ? this.specification[index].longTxt : this.specification[index].shortTxt;
  }

  clearOther(index, reset) {
    this.specification = [];
    this.editing ? this.tableSpec[+this.editing] = [] : this.arrayData.length ? this.tableSpec[this.arrayData.length] = [] : this.tableSpec[0] = [];

    this.GG(0).get('other').setValue(null);
    this.GG(0).get('other').disable();
    this.GG(0).get('specification_id').enable();

    this.GG(0).get('specification_id').setValidators(Validators.required);
    this.GG(0).get('specification_id').updateValueAndValidity();

    this.load_specification(this.GG(0).get('product_id').value, index, [], reset);

  }

  getText(data: any, val: any) {
    return data?.filter((e: any) => e.value === val)[0]?.text;
  }

  async deleteArray() {
    this.GA().removeAt(0);
    this.editing = null;
    this.specification = [];
  }

  updateRow() {
    this.arrayData[+this.editing] = this.GA().getRawValue()[0];
    this.editing = null;
    this.clearRow();
  }

  async deleteRow(index: number) {
    
    const id = this.arrayData[index].id;
    if (id) {
      this.deleted.push(id);
      this.arrayData.splice(index, 1);
    }
    else {
      this.arrayData.splice(index, 1);
    }
    this.arrayData.length ? null : this.editRow(null, 0);
  }

}