import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DisposalService } from '../disposal.service';
import { Location } from '@angular/common'
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public fg: FormGroup;
  public formSubmitted = false;
  public disable = false;
  public ID: any;
  categories: any = [] = [];
  products: any[] = [];
  // specifications = [];
  lookupData = []
  isMachine: boolean;
  other: boolean[] = [];
  fileInfo: any[] = [];
  ids = { item_id: [], disposal_id: [], detail_id: [] }
  attachments: any[] = [];
  public requestStatus: any = {};
  libreInfo: any[] = [{ value: 'has_libre', text: 'Has libre' }, { value: 'no_libre', text: 'No libre' }];
  declarasionInfo: any[] = [{ value: 'has_declarasion', text: 'Has declarasion' }, { value: 'no_declarasion', text: 'No declarasion' }];
  baseUrl = environment.baseUrl;
  arrayData = [];
  editing = null;
  deleted = [];
  comment: any;
  unknownProduct = null;
  serviceStatuses = [{
    text: 'New',
    value: 'new'
  },
  {
    text: 'Used',
    value: 'used'
  }
  ]
  plan = null;
  planData = null;
  sending: boolean = false;

  public showUnit = true;

  public Editor = ClassicEditor;
  public toolbar = ['bold', 'italic', 'undo', 'redo', 'numberedList', 'bulletedList'];

  public isBasicCollapsed = false;
  public isItemFormCollapsed = false;
  public isItemListCollapsed = true;
  public isSpecCollapsed = false;
  public isCommentCollapsed = true;
  public isvehicleCollapsed = false;
  public isPropDescCollapsed = false;

  constructor(private service: DisposalService, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private location: Location, private translate: TranslateService) {
    this.createForm();
  }

  ngOnInit() {
    this.ID = this.activatedRoute.snapshot.paramMap.get('id');
    this.plan = this.activatedRoute.snapshot.paramMap.get('reqId');

    this.loadCategory();
    this.loadLookup();

    if (this.ID) {
      this.service.get(this.ID).subscribe((data: any) => {
        console.log('i\'m the new ',data)
        this.initializeForm(data);

        this.comment = data.comment;
        this.requestStatus.classified = data.cls_id;
        this.requestStatus.status = +data.status;
        
      });
    }

    if (this.plan) {
      this.service.getPlan(this.plan).subscribe((data: any) => {
        this.planData = data;
      });
    }

  }

  createForm() {
    this.fg = this.fb.group({
      description: ['', Validators.required],
      productArray: this.fb.array([this.requestArray()]),
    })
  }

  requestArray() {
    return this.fb.group({
      category: [null, Validators.required],
      product: [null, Validators.required],
      productName: [null],
      quantity: [null, Validators.required],
      reason: [null],
      conditionDesc: [null],
      serviceStatus: [null, Validators.required],
      propertyCondition: [null, Validators.required],
      desirability: [null, Validators.required],
      currentPrice: [null, Validators.required],
      serviceYear: [null, Validators.required],
      other: [null, Validators.required],
      serial: [null],
      shansi: [null],
      motorNumber: [null],
      hasLibre: [null],
      hasDeclarasion: [null],
      yearMade: [null],
      countryMade: [null],
      fuel: [null],
      motorStatus: [null],
      model: [null],
      productStatus: [null],
      productType: [null],
      vehicleMachineryType: [null],
      attachment: [null],
      plateNumber: [null],
      manufacturer: [null],
      dateOfPurchase: [null],
      ownerOfVehicle: [null],
      unit: [null],
      vehicleCurrentPlace: [null],
      code: [null]
    });
  }

  initializeForm(data: any) {
    this.fg = this.fb.group({
      description: [data.description, Validators.required],
      productArray: this.fb.array([]),
    })
    delete data.comment;
    this.arrayData = data.detail;
  
    this.arrayData.forEach(el => {
      delete el.comment
      delete el.requested_by
      el.category = this.categories.filter((e: any) => el.product_category_id === e.value)[0].text;
      this.service.load_product(el.product_category_id).subscribe((data: any) => {
        el.product = data.length ? data.filter((e: any) => el.product_id === e.value)[0].text : null;
      });
    });
  }


  initializeArray(data: any) {
    this.productArray.updateValueAndValidity();

    this.showUnit = data.product_id ? false : true;

    return this.fb.group({
      id: data.item_id,
      category: [data.product_category_id, Validators.required],
      product: [data.product_id ? data.product_id : 'other', Validators.required],
      productName: [data.product_name],
      quantity: [data.quantity, Validators.required],
      reason: [data.reason],
      conditionDesc: [data.property_condition_desc],
      serviceStatus: [data.service_status, Validators.required],
      propertyCondition: [data.property_condition, Validators.required],
      desirability: [data.desirability, Validators.required],
      currentPrice: [data.current_price, Validators.required],
      serviceYear: [data.service_year, Validators.required],
      other: [data.other, Validators.required],
      serial: [data.serial],
      shansi: [data.shansi],
      motorNumber: [data.motor_number],
      hasLibre: [data.has_libre],
      hasDeclarasion: [data.has_declarasion],
      yearMade: [data.year_made],
      countryMade: [data.country],
      fuel: [data.fuel],
      motorStatus: [data.motor_status],
      model: [data.model],
      productStatus: [data.status],
      productType: [data.type],
      vehicleMachineryType: [data.vehicle_machinery_type],
      attachment: [data.document],
      unit: [data.unit],
      plateNumber: [data.plate_number],
      manufacturer: [data.manufacturer],
      dateOfPurchase: [data.date_of_purchase],
      ownerOfVehicle: [data.owner],
      vehicleCurrentPlace: [data.vehicle_current_place],
      code: [data.code]
    });

  }

  fc(name: any): FormControl {
    return this.fg.get(name) as FormControl;
  }

  get productArray(): FormArray {
    return this.fg.get('productArray') as FormArray;
  }

  fileChangeEvent(file: any, index) {
    this.fileInfo[index] = file[0];
    // this.productArray.controls[index].get('attachment').setValue(this.fileInfo[index]);
    const reader = new FileReader();
    reader.onloadend = () => { this.productArray.controls[index].get('attachment').setValue(reader.result.toString()); };
    reader.readAsDataURL(this.fileInfo[index]);
    this.productArray.controls[index].get('attachment').setValue(this.fileInfo[index]);
  }

  loadLookup() {
    let lookup = ['desirability', 'property_condition', 'country', 'fuel', 'motor_status', 'model', 'product_status', 'product_type', 'vehicle_machinery_type', 'unit'];
    this.service.filter(lookup).subscribe((data: any) => {
      this.lookupData = data;
    });
  }

  loadCategory() {
    this.service.load_category().subscribe((data: any) => {
      this.categories = data;
    });
  }

  loadProduct(id: any) {
    this.products = [];
    if (id && id !== '') {
      this.service.load_product(id).subscribe((data: any) => {
        this.products = data;
        this.products[this.products.length - 1] = { value: 'other', text: 'Other' };
      });
    }
  }

  onProductChange(args: any) {
    this.isMachine = false;
    
    let pro = this.products.find((ele) => ele.value === args);

    if (args === 'other') {
      this.unknownProduct = true;
      this.productArray.controls[0].get('productName').setValidators(Validators.required);

      this.productArray.controls[0].get('unit').setValue(null);
      this.productArray.controls[0].get('unit').enable();

      this.showUnit = true;

    } else {
      this.unknownProduct = false;
      // this.productArray.controls[0].get('productName').setValue(null);
      // this.productArray.controls[0].get('productName').clearValidators();

      this.productArray.controls[0].get('unit').setValue(pro.unit);
      // this.productArray.controls[0].get('unit').disable();

      this.showUnit = false;

    }

    this.productArray.controls[0].get('productName').updateValueAndValidity();

    this.propertyTypeChange(+pro.is_vehicle_machinery)

  }

  propertyTypeChange(value: any) {
    this.isMachine = value;

    if (this.isMachine) {
      this.productArray.controls[0].get('motorStatus').setValidators(Validators.required);
      this.productArray.controls[0].get('fuel').setValidators(Validators.required);
      this.productArray.controls[0].get('countryMade').setValidators(Validators.required);
      this.productArray.controls[0].get('yearMade').setValidators(Validators.required);
      this.productArray.controls[0].get('hasDeclarasion').setValidators(Validators.required);
      this.productArray.controls[0].get('hasLibre').setValidators(Validators.required);
      this.productArray.controls[0].get('motorNumber').setValidators(Validators.required);
      this.productArray.controls[0].get('shansi').setValidators(Validators.required);
      this.productArray.controls[0].get('model').setValidators(Validators.required);
      this.productArray.controls[0].get('productStatus').setValidators(Validators.required);
      this.productArray.controls[0].get('vehicleMachineryType').setValidators(Validators.required);

      this.updateMachineValidator();
    }
    else {
      this.productArray.controls[0].get('motorStatus').setValue(null);
      this.productArray.controls[0].get('fuel').setValue(null);
      this.productArray.controls[0].get('countryMade').setValue(null);
      this.productArray.controls[0].get('yearMade').setValue(null);
      this.productArray.controls[0].get('hasDeclarasion').setValue(null);
      this.productArray.controls[0].get('hasLibre').setValue(null);
      this.productArray.controls[0].get('motorNumber').setValue(null);
      this.productArray.controls[0].get('shansi').setValue(null);
      this.productArray.controls[0].get('model').setValue(null);
      this.productArray.controls[0].get('productStatus').setValue(null);
      this.productArray.controls[0].get('serial').setValue(null);
      this.productArray.controls[0].get('vehicleMachineryType').setValue(null);
      this.productArray.controls[0].get('plateNumber').setValue(null);
      this.productArray.controls[0].get('dateOfPurchase').setValue(null);
      this.productArray.controls[0].get('manufacturer').setValue(null);
      this.productArray.controls[0].get('ownerOfVehicle').setValue(null);
      this.productArray.controls[0].get('vehicleCurrentPlace').setValue(null);


      this.productArray.controls[0].get('motorStatus').clearValidators();
      this.productArray.controls[0].get('fuel').clearValidators();
      this.productArray.controls[0].get('countryMade').clearValidators();
      this.productArray.controls[0].get('yearMade').clearValidators();
      this.productArray.controls[0].get('hasDeclarasion').clearValidators();
      this.productArray.controls[0].get('hasLibre').clearValidators();
      this.productArray.controls[0].get('motorNumber').clearValidators();
      this.productArray.controls[0].get('shansi').clearValidators();
      this.productArray.controls[0].get('model').clearValidators();
      this.productArray.controls[0].get('productStatus').clearValidators();
      this.productArray.controls[0].get('vehicleMachineryType').clearValidators();
      this.productArray.controls[0].get('plateNumber').clearValidators();
      this.productArray.controls[0].get('dateOfPurchase').clearValidators();
      this.productArray.controls[0].get('manufacturer').clearValidators();
      this.productArray.controls[0].get('ownerOfVehicle').clearValidators();
      this.productArray.controls[0].get('vehicleCurrentPlace').clearValidators();
      this.updateMachineValidator();
    }
  }

  updateMachineValidator() {
    this.productArray.controls[0].get('motorStatus').updateValueAndValidity();
    this.productArray.controls[0].get('fuel').updateValueAndValidity();
    this.productArray.controls[0].get('countryMade').updateValueAndValidity();
    this.productArray.controls[0].get('yearMade').updateValueAndValidity();
    this.productArray.controls[0].get('hasDeclarasion').updateValueAndValidity();
    this.productArray.controls[0].get('hasLibre').updateValueAndValidity();
    this.productArray.controls[0].get('motorNumber').updateValueAndValidity();
    this.productArray.controls[0].get('shansi').updateValueAndValidity();
    this.productArray.controls[0].get('model').updateValueAndValidity();
    this.productArray.controls[0].get('productStatus').updateValueAndValidity();
    this.productArray.controls[0].get('vehicleMachineryType').updateValueAndValidity();
  }

  prepareData() {
    let arrayDataToSend = [];
    arrayDataToSend = this.arrayData;

    arrayDataToSend.forEach(e => {
      delete e.category;
      delete e.product;
      e.detail = e.product_type == 'other' ? null : JSON.stringify({ type: e.type, country: e.country_made, status: e.status, model: e.model });
      delete e.model;
      delete e.status;
      delete e.country_made;
      delete e.type; /* this infos will be deleted only after the above changed to string */
      delete e.country;

    })

    const data = {
      id: this.ID ? this.ID : null,
      type: 'disposal',
      public_sector_id: localStorage.getItem('userId'),
      requested_by: localStorage.getItem('userId'),
      description: this.fc('description').value,
      detail: arrayDataToSend,
      deleted: this.deleted

    }

    return data;
    
  }

  onSubmit() {
    this.formSubmitted = true;

    if (this.fg.get('description').valid && this.arrayData.length) {
      const payload = this.prepareData();

      this.sending = true;

        this.service.save(payload).subscribe((arg: any) => {
          if (arg.status) {
            alert(arg.message);
            this.cancel();
            this.sending = false;
          }
          else {
            this.sending = false;
            alert(arg.message);
          }
        }, (er => {
          this.sending = false;
        }));
      

    } else {
      return;

    }

  }

  cancel() {
    this.location.back();
  }

  addArray() {
    this.productArray.controls.push(this.requestArray());
  }

  addRow(): void {
  
    this.productArray.controls.forEach(elem => {
      console.log('product',elem)
      this.arrayData.push({
        id: +this.editing >= 0 ? null : elem.value.id ? elem.value.id : null,
        product_type: this.isMachine ? 'vehicle_machine' : 'other',
        product_category_id: elem.value.category,
        category: this.categories.filter((e: any) => e.value === elem.value.category)[0].text,
        product_id: elem.value.product === 'other' ? null : elem.value.product,
        product: this.products.filter((e: any) => e.value === elem.value.product)[0].text,
        quantity: elem.value.quantity,
        product_name: elem.value.productName,
        reason: elem.value.reason,
        property_condition_desc: elem.value.conditionDesc,
        service_status: elem.value.serviceStatus,
        property_condition: elem.value.propertyCondition,
        desirability: elem.value.desirability,
        current_price: elem.value.currentPrice,
        service_year: elem.value.serviceYear,
        serial: elem.value.serial,
        shansi: elem.value.shansi,
        motor_number: elem.value.motorNumber,
        has_libre: elem.value.hasLibre,
        has_declarasion: elem.value.hasDeclarasion,
        year_made: elem.value.yearMade,
        country_made: elem.value.countryMade,
        fuel: elem.value.fuel,
        motor_status: elem.value.motorStatus,
        other: elem.value.other,
        document: elem.value.attachment,
        unit: elem.value.unit,
        plate_number: elem.value.plateNumber,
        manufacturer: elem.value.manufacturer,
        date_of_purchase: elem.value.dateOfPurchase,
        owner: elem.value.ownerOfVehicle,
        vehicle_current_place: elem.value.vehicleCurrentPlace,
        code: elem.value.code,
        vehicle_machinery_type: elem.value.vehicleMachineryType,
        model: elem.value.model,
        type: elem.value.productType,
        status: elem.value.productStatus,
        item_id: null,
        disposal_id: null,
        detail_id: null,
      })
    })
    this.clearRow();
  }

  clearRow() {
    const ctrl = [
      "category", "product", "productName", "quantity", "reason", "serviceStatus", "propertyCondition",
      "desirability", "currentPrice", "serviceYear", "serial", "shansi", "motorNumber",
      "hasLibre", "hasDeclarasion", "yearMade", "countryMade", "fuel", "motorStatus",
      "other", "attachment", "unit", "plateNumber", "manufacturer", "dateOfPurchase",
      "ownerOfVehicle", "vehicleCurrentPlace", "code", "vehicleMachineryType",
      "model", "productType", "productStatus", "conditionDesc",
    ]

    ctrl.forEach(el => {
      this.productArray.controls[0].get(el).setValue(null);
    })
    this.editing = null;
    this.fileInfo = null;
  }

  editRow(i: any) {

    this.editing = i.toString();

    this.loadProduct(this.arrayData[i].product_category_id);
    this.productArray.controls[0] = this.initializeArray(this.arrayData[i]);

    if (this.arrayData[i].product_type === 'other') {
      this.isMachine = false;

    } else if (this.arrayData[i].product_type === 'vehicle_machine') {
      this.isMachine = true;
    }

    this.onSelectServiceStatus(this.productArray.controls[0].get("serviceStatus").value);

    this.propertyTypeChange(this.isMachine ? 1 : 0)

  }

  updateRow() {
    this.productArray.controls.forEach((elem) => {
      this.arrayData[+this.editing] = {
        id: elem.value.id ? elem.value.id : null,
        product_type: this.isMachine ? 'vehicle_machine' : 'other',
        product_category_id: elem.value.category,
        category: this.categories.filter((e: any) => e.value === elem.value.category)[0].text,
        product_id: elem.value.product === 'other' ? null : elem.value.product,
        product: this.products.filter((e: any) => e.value === elem.value.product)[0].text,
        quantity: elem.value.quantity,
        product_name: elem.value.productName,
        reason: elem.value.reason,
        service_status: elem.value.serviceStatus,
        property_condition: elem.value.propertyCondition,
        desirability: elem.value.desirability,
        current_price: elem.value.currentPrice,
        service_year: elem.value.serviceYear,
        serial: elem.value.serial,
        shansi: elem.value.shansi,
        motor_number: elem.value.motorNumber,
        has_libre: elem.value.hasLibre,
        has_declarasion: elem.value.hasDeclarasion,
        year_made: elem.value.yearMade,
        country_made: elem.value.countryMade,
        fuel: elem.value.fuel,
        motor_status: elem.value.motorStatus,
        other: elem.value.other,
        document: elem.value.attachment,
        unit: elem.value.unit,
        plate_number: elem.value.plateNumber,
        manufacturer: elem.value.manufacturer,
        date_of_purchase: elem.value.dateOfPurchase,
        owner: elem.value.ownerOfVehicle,
        vehicle_current_place: elem.value.vehicleCurrentPlace,
        code: elem.value.code,
        vehicle_machinery_type: elem.value.vehicleMachineryType,
        model: elem.value.model,
        type: elem.value.productType,
        status: elem.value.productStatus,
        item_id: this.arrayData[+this.editing].item_id ? this.arrayData[+this.editing].item_id : null,
        disposal_id: this.arrayData[+this.editing].disposal_id ? this.arrayData[+this.editing].disposal_id : null,
        detail_id: this.arrayData[+this.editing].detail_id ? this.arrayData[+this.editing].detail_id : null,
      };
    });
    this.editing = null;
    this.clearRow();
  }

  async deleteRow(index: number) {
    const id = this.arrayData[index].item_id;

    if(confirm('are you sure want to delete this item ?')){
      if (id) {
        this.deleted.push(id);
        this.arrayData.splice(index, 1);

      } else {
        this.arrayData.splice(index, 1);
      }

    }

  }

  async deleteArray() {
    this.productArray.removeAt(0);
    this.editing = null;
  }

  onSelectServiceStatus(value: any) {
    if (value === 'new') {
      this.productArray.controls[0].get('desirability').setValidators(Validators.required);
      this.productArray.controls[0].get('serviceYear').clearValidators();
      this.productArray.controls[0].get('propertyCondition').clearValidators();
    }
    else if (value === 'used') {
      this.productArray.controls[0].get('desirability').clearValidators();
      this.productArray.controls[0].get('serviceYear').setValidators(Validators.required);
      this.productArray.controls[0].get('propertyCondition').setValidators(Validators.required);
    }
    this.productArray.controls[0].get('desirability').updateValueAndValidity();
    this.productArray.controls[0].get('serviceYear').updateValueAndValidity();
    this.productArray.controls[0].get('propertyCondition').updateValueAndValidity();
  }

}