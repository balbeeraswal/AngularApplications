import {
  AfterViewInit,
  Component, Inject,
  DoCheck,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, Form, FormArray } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validator,
  Validators,
  RequiredValidator,
  FormBuilder,
} from '@angular/forms';
import {
  gte,
  mustMatchTwoFiledsVal,
  ukStaygtAge,
  markAllDirty,
} from 'src/app/customValidations.validator';
import { masterServices } from 'src/app/core/services/masterAPIs/masterServices.service';
import { funcsServices } from 'src/app/core/services/funcsServices.services';
import { DateAdapter } from '@angular/material/core';
import { duplicityCheckingService } from 'src/app/core/services/masterAPIs/duplicityCheck.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DisableDirective } from '../../shared/common-featured-module/directives/Enable_Disable_Div';
import { Subscription } from 'rxjs';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { formatDate } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponentComponent } from 'src/app/shared/common-featured-module/alert-dialog-component.component';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
export interface TabType {
  label: string;
  fields: FormlyFieldConfig[];
}

@Component({
  selector: 'app-applicationRegistration',
  templateUrl: './applicationRegistration.component.html',
 
  styleUrls: ['./applicationRegistration.component.css'],
   encapsulation:ViewEncapsulation.None

})

export class applicationRegistrationComponent implements OnInit, OnDestroy {

  selectedTabIndex = 0;
  registrationForm: FormGroup = new FormGroup({
    DisbM_HusbName: new FormControl(''),
    DisbM_HusbAadhaarNo: new FormControl(''),

  })
  title = 'Registration Form for Old Age Pension';
  submitted = false;
  // registrationForm: FormGroup;
  public categories: any;
  errorMessage = '';
  loading = true;
  WifeFatherfieldsDisabled: boolean = false;
  HusbFatherfieldsDisabled: boolean = false;
  MarriageRegDetailsFieldsDisabled: boolean = false;

  bank_Code: number;
  branch_Code: number;
  bankAccountNo: string;
  maxLengthOfAccount = 0;
  minLengthOfAccount = 0;
  bankAccountNumber: string;
  isDuplcateAccount: boolean = false;
  public districts: any;
  public Occupations: any;
  selectedHusbDistrict = '';
  selectedWifeDistrict = '';
  public Wifetehsils: any;
  public Husbtehsils: any;
  timeout: any = null;
  bankBranches: any = '';
  myVar: any;
  ifscCode: string = '';
  subscription: Subscription;
  appRegistrationResp: any;
  DisbM_IsHusbFatherAlive: any = 'Y';
  DisbM_IsWifeFatherAlive: any = 'Y';
  IsHusbAadhaarChecked: boolean = false;
  Disabilitytypes: any = '';
  AlertBoxTitle: any = '';
  AlertBoxMessage: any = '';
  AlertBoxMessage1: any = '';
  AlertBoxMessage2: any = '';
  AlertBoxMessage3: any = '';
  AlertBoxMessage4: any = '';
  AlertBoxMessage5: any = '';
  ListofAssembliesConst: any = '';
  ListofLoksabhaConst: any = '';
  DisbM_DisabledPersons: any = '';
  IsHusbDisable: boolean = false
  IsWifeDisable: boolean = false
  IsBothHusbWifeDisable: boolean = true
  isMarriageRegInUCC: any = 'Y';
  MarriageRegInUCC: boolean = true
  MarriageRegistrationDate: any;
  DateofMarriage: any;
  DisbM_UCCRegDate: any;
  isSubmitted = false;
  SuccessfullRegistrationmsg: string = '';

  @ViewChild('txtAge', { static: true }) txtAge: ElementRef;
  @ViewChild('bplmemberid', { static: true }) bplmemberid: ElementRef;
  @ViewChild('bplfamilyid', { static: true }) bplfamilyid: ElementRef;
  @ViewChild('informcertno', { static: true }) informcertno: ElementRef;
  @ViewChild('informcertdate', { static: true }) informcertdate: ElementRef;
  @ViewChild('monthlyincome', { static: true }) monthlyincome: ElementRef;

  // --------------------------Code for filling Block Drop Down-----------------------

  @ViewChild('ddlHusbArea', { static: false }) ddlHusbArea: ElementRef;
  @ViewChild('ddlWifeArea', { static: false }) ddlWifeArea: ElementRef;

  @ViewChild('ddlHusbTehsil', { static: false }) ddlHusbTehsil: ElementRef;
  @ViewChild('ddlHusbBlock', { static: false }) ddlHusbBlock: ElementRef;
  @ViewChild('ddlHusbPanchayat', { static: false }) ddlHusbPanchayat: ElementRef;
  @ViewChild('ddlHusbVillage', { static: false }) ddlHusbVillage: ElementRef;

  @ViewChild('ddHusblTown', { static: false }) ddlHusbTown: ElementRef;
  @ViewChild('ddlHusbWard', { static: false }) ddlHusbWard: ElementRef;



  @ViewChild('ddlWifeTehsil', { static: false }) ddlWifeTehsil: ElementRef;
  @ViewChild('ddlWifeBlock', { static: false }) ddlWifeBlock: ElementRef;
  @ViewChild('ddlWifePanchayat', { static: false }) ddlWifePanchayat: ElementRef;
  @ViewChild('ddlWifeVillage', { static: false }) ddlWifeVillage: ElementRef;

  @ViewChild('ddlWifeTown', { static: false }) ddlWifeTown: ElementRef;
  @ViewChild('ddlWifeWard', { static: false }) ddlWifeWard: ElementRef;

  @ViewChild('ddlHusbDistrict', { static: false }) ddlHusbDistrict: ElementRef;
  @ViewChild('ddlWifeDistrict', { static: false }) ddlWifeDistrict: ElementRef;
  @ViewChild('confirmIfsc', { static: false }) confirmIFSC: ElementRef;

  selectedHusbTehsil = '';
  towns: any;
  public blocks: any;
  divUrbanDisabled: boolean = false;
  disableHusbRuralArea: boolean;
  disableWifeRuralArea: boolean;

  constructor(
    private fb: FormBuilder,
    @Optional() private _masterServices: masterServices,
    @Optional() private _funcsServices: funcsServices,
    private dateadapter: DateAdapter<Date>,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.dateadapter.setLocale('en-GB');

    this.registrationForm = this.fb.group(
      {
        DisbM_Applicant: [null, [Validators.required]],
        DisbM_DisabledPersonsDetail: [null, [Validators.required]],
        DisbM_HusbDisabilityType: [null, [Validators.required]],
        DisbM_HusbDisabilityPer: [null, [Validators.required, Validators.min(40), Validators.max(100), Validators.maxLength(5)]],
        DisbM_WifeDisabilityType: [null, [Validators.required]],
        DisbM_WifeDisabilityPer: [null, [Validators.required, Validators.min(40), Validators.max(100), Validators.maxLength(5)]],
        DisbM_HusbGender: [null, [Validators.required]],
        DisbM_WifeGender: [null, [Validators.required]],
        DisbM_HusbName: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
        ]],

        DisbM_HusbNationality: [1],
        DisbM_HusbReligion: [
          null,
          [
            Validators.required
          ]
        ],
        DisbM_HusbCaste: [null, [Validators.required]],
        DisbM_HusbAgeAtTimeOfMarriage: ['', [Validators.required
          , Validators.pattern('^[0-9]+$')
          , Validators.min(21), Validators.max(45)]],
        DisbM_HusbOccupation: [null, [Validators.required]],
        DisbM_HusbDurationStayInUK: ['', [Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.min(0), Validators.max(45)]],
        DisbM_IsHusbFatherAlive: ['Y'],
        DisbM_HusbFatherName: ['', [Validators.maxLength(20), Validators.required
          , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
        ]],
        DisbM_HusbFatherOccupation: [
          null,
          [
            Validators.required
          ]
        ],
        DisbM_HusbFatherLastAddress: [
          '',
          [Validators.maxLength(100), Validators.required
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],
        DisbM_HusbFatherLastOccupation: [
          null,
          [Validators.required]
        ],
        DisbM_HusbFatherNationality: [1],
        DisbM_HusbFatherReligion: [
          null,
          [
            Validators.required
          ]
        ],
        DisbM_HusbFatherCaste: [null, [Validators.required]],
        DisbM_HusbFatherSubCaste: [''],
        DisbM_HusbMobileNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(10), Validators.maxLength(10)
        ]],
        DisbM_HusbAadhaarNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(12), Validators.minLength(12)
        ]],
        DisbM_HusbAadhaarConsent: [false, [Validators.requiredTrue
        ]],


        DisbM_HusbDistrict_Code: [null, [Validators.required]],
        DisbM_HusbTehsil_Code: [null, [Validators.required]],
        DisbM_HusbRuralUrban: [null, [Validators.required]],
        DisbM_HusbBlock_Code: [null, [Validators.required]],
        DisbM_HusbPanchayat_Code: [null, [Validators.required]],
        DisbM_HusbVillage_Code: [null, [Validators.required]],

        DisbM_HusbTown_Code: [null, [Validators.required]],
        DisbM_HusbWard_Code: [null, [Validators.required]],
        DisbM_HusbHouse_number: ['', [
          Validators.pattern('^[a-zA-Z0-9s]*$'),
          Validators.maxLength(20)]],
        DisbM_HusbAreaMohalla: [
          '',
          [
            Validators.maxLength(20)
            , Validators.pattern('^[a-zA-Z0-9s]*$')
          ],
        ],
        DisbM_HusbPostOffice: ['', [Validators.maxLength(50)]],
        DisbM_HusbPinCode: ['', [Validators.required, Validators.pattern("^[0-9]*$"),
        Validators.minLength(6), Validators.maxLength(6)
        ]
        ],
        DisbM_HusbCurrentAddress: [
          '',
          [Validators.maxLength(100), Validators.required
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],
        DisbM_HusbBeforeMarriagAddress: [
          '',
          [Validators.maxLength(100), Validators.required
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],
        DisbM_HusbLokSabhaArea: [null, [Validators.required]],

        DisbM_HusbAssemblyArea: [null, [Validators.required]],

        //    <!---------------------------पत्नी का विवरण -------------- -->
        DisbM_WifeName: ['', [Validators.maxLength(20), Validators.required
          , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
        ]],
        DisbM_WifeNationality: [1],
        DisbM_WifeReligion: [
          null,
          [
            Validators.required
          ]
        ],
        DisbM_WifeCaste: [
          null,
          [
            Validators.required,

          ]
        ],
        DisbM_WifeAgeAtTimeOfMarriage: ['', [Validators.required
          , Validators.pattern('^[0-9]+$')
          , Validators.min(18), Validators.max(45)]],
        DisbM_WifeOccupation: [null, [Validators.required]],
        DisbM_WifeDurationStayInUK: ['', [Validators.required
          , Validators.pattern('^[0-9]+$'), Validators.min(0), Validators.max(45)

        ]],
        DisbM_IsWifeFatherAlive: ['Y'],
        DisbM_WifeFatherName: ['', [Validators.maxLength(50), Validators.required
          , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
        ]],
        DisbM_WifeFatherOccupation: [
          null,
          [
            Validators.required
          ]
        ],
        DisbM_WifeFatherLastAddress: [
          '',
          [Validators.maxLength(100), Validators.required
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],
        DisbM_WifeFatherLastOccupation: [
          null,
          [Validators.required]
        ],
        DisbM_WifeMobileNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)
        ]],
        DisbM_WifeAadhaarNo: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(12), Validators.minLength(12)
        ]],
        DisbM_WifeAadhaarConsent: ['', [Validators.requiredTrue
        ]],

        // <!-------------------- पत्नी का पता (* प्रविष्टियाँ अनिवार्य हैं) -->
        DisbM_WifeDistrict_Code: [null, [Validators.required]],
        DisbM_WifeTehsil_Code: [null, [Validators.required]],
        DisbM_WifeRuralUrban: [null, [Validators.required]],
        DisbM_WifeBlock_Code: [null
          , [Validators.required]],
        DisbM_WifePanchayat_Code: [null, [Validators.required]],
        DisbM_WifeVillage_Code: [null, [Validators.required]],

        DisbM_WifeTown_Code: [null, [Validators.required]],
        DisbM_WifeWard_Code: [null, [Validators.required]],
        DisbM_WifeHouse_number: ['', [
          Validators.pattern('^[a-zA-Z0-9s]*$'),
          Validators.maxLength(20)]],
        DisbM_WifeAreaMohalla: [
          '',
          [
            Validators.maxLength(50)
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],
        DisbM_WifePostOffice: ['', [Validators.maxLength(50)]],
        DisbM_WifePinCode: [
          '',
          [
            Validators.required, Validators.pattern("^[0-9]*$"),
            Validators.minLength(6), Validators.maxLength(6)
          ]
        ],
        DisbM_WifeCurrentAddress: [
          '',
          [Validators.maxLength(100), Validators.required
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],
        DisbM_WifeBeforeMarriagAddress: [
          '',
          [
            Validators.required,
            Validators.pattern('^[A-Za-z0-9- &@/#.\']+$'),
            Validators.maxLength(100)

          ]
        ],
        DisbM_WifeLokSabhaArea: [null, [Validators.required]],

        DisbM_WifeAssemblyArea: [null, [Validators.required]],

        //  ------------------------------- शादी सम्बन्धी सूचना (* प्रविष्टियाँ अनिवार्य हैं) ------------------------------>
        DisbM_MarriageDate: [
          '',
          [
            Validators.required
          ]
        ],


        DisbM_MarriageRegistrationNo: [
          '', [Validators.required, Validators.maxLength(50)]
        ],
        DisbM_MarriageRegistrationDate: [
          '', [Validators.required]
        ],
        DisbM_MarriageRegistrationOfficeName: [
          '', [Validators.maxLength(100), Validators.required
            , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')
          ]
        ],

        DisbM_IsMarriageRegInUCC: ['Y'],

        DisbM_UCCRegNo: ['', [Validators.required, Validators.maxLength(21), Validators.minLength(21)]],
        DisbM_UCCRegDate: ['', [Validators.required]],
        // <!-------------------------------- आवेदक का खाता विवरण(* प्रविष्टियाँ अनिवार्य हैं) ------------------------------>
        DisbM_IFSC: [
          '', [Validators.required
            , Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')
          ]
        ],
        DisbM_ConfirmIFSC: [
          '', [Validators.required
            , Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')
          ]
        ],
        DisbM_Branch: [
          null, [Validators.required]
        ],
        DisbM_BankAccountNo: [
          '', [Validators.maxLength(20), Validators.required]
        ],
        DisbM_ConfirmBankAccountNo: [
          '', [Validators.maxLength(20), Validators.required]
        ],
        DisbM_HusbWifeDeclare: ['', [Validators.requiredTrue]]

      },

      {
        validator: [
          mustMatchTwoFiledsVal('DisbM_IFSC', 'DisbM_ConfirmIFSC'),
          mustMatchTwoFiledsVal('DisbM_BankAccountNo', 'DisbM_ConfirmBankAccountNo'),
        ],
      }

    )
    this._masterServices
      .getCategories()
      .subscribe(

        (x) => {

          (
            this.categories = x


          );
          console.log(this.categories);

        }
      );
    //---Calling Get occupations from API---------------
    this._masterServices.getOccupations().subscribe(
      (resp) => {
        (
          this.Occupations = resp
        );
      });

    this._masterServices.getDistricts().subscribe(
      (res) => {
        this.districts = res;
        this.districts = this._funcsServices.sortDistrictsAlphabatically(
          this.districts

        );
        console.log(this.districts);
      });

    this._masterServices.getDisabilityTypes().subscribe(
      (disTypes) => {
        this.Disabilitytypes = disTypes;
        this.Disabilitytypes = this._funcsServices.sortDisabilityTypesAlphabatically(this.Disabilitytypes);
        console.log("Disability Type:" + this.Disabilitytypes.disability_name);

      });
    // ListofAssembliesConst:any='';
    // ListofLoksabhaConst:any='';
    this._masterServices.getLokSabhaConstyNames().subscribe(
      (resp) => {
        this.ListofLoksabhaConst = resp;
        this.ListofLoksabhaConst = this._funcsServices.sortLoksabhaAreasAlphabatically(this.ListofLoksabhaConst)
      });

    this._masterServices.getAssemblyConstyNames().subscribe(
      (resp) => {
        this.ListofAssembliesConst = resp;
        this.ListofAssembliesConst = this._funcsServices.sortAssemblyConstAlphabatically(this.ListofAssembliesConst)
      });


    //code for disabling fields if Husband Father is Not Dead 
    this.registrationForm.get('DisbM_HusbFatherName')?.setValidators([Validators.maxLength(20), Validators.required
      , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')]);
    this.registrationForm.get('DisbM_HusbFatherName')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_HusbFatherOccupation')?.setValidators([Validators.required]);
    this.registrationForm.get('DisbM_HusbFatherOccupation')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_HusbFatherReligion')?.setValidators([Validators.required]);
    this.registrationForm.get('DisbM_HusbFatherReligion')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_HusbFatherCaste')?.setValidators([Validators.required]);
    this.registrationForm.get('DisbM_HusbFatherCaste')?.updateValueAndValidity();


    this.registrationForm.get('DisbM_HusbFatherLastAddress')?.clearValidators();
    this.registrationForm.get('DisbM_HusbFatherLastAddress')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.clearValidators();
    this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.updateValueAndValidity();


    //code for disabling fields of Wife Father is Not Dead 
    this.registrationForm.get('DisbM_WifeFatherName')?.setValidators([Validators.maxLength(20), Validators.required
      , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')]);
    this.registrationForm.get('DisbM_WifeFatherName')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_WifeFatherOccupation')?.setValidators([Validators.required]);
    this.registrationForm.get('DisbM_WifeFatherOccupation')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_WifeFatherLastAddress')?.clearValidators();
    this.registrationForm.get('DisbM_WifeFatherLastAddress')?.updateValueAndValidity();

    this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.clearValidators();
    this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.updateValueAndValidity();


    //code for disabling fields of if Marriage is registered in UCC 
    this.registrationForm.get('DisbM_UCCRegNo').setValidators([Validators.required]);
    this.registrationForm.get('DisbM_UCCRegNo').updateValueAndValidity();

    this.registrationForm.get('DisbM_UCCRegDate').setValidators([Validators.required]);
    this.registrationForm.get('DisbM_UCCRegDate').updateValueAndValidity();


  }

  onIsHusbFatherAliveChange(event: Event): void {
    this.DisbM_IsHusbFatherAlive = event.target as HTMLInputElement;
    if (this.DisbM_IsHusbFatherAlive.value == 'Y') {

      this.registrationForm.get('DisbM_HusbFatherName')?.setValidators([Validators.maxLength(20), Validators.required
        , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')]);
      this.registrationForm.get('DisbM_HusbFatherName')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherOccupation')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbFatherOccupation')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherReligion')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbFatherReligion')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherCaste')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbFatherCaste')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherLastAddress')?.setValue('')
      this.registrationForm.get('DisbM_HusbFatherLastAddress')?.clearValidators();
      this.registrationForm.get('DisbM_HusbFatherLastAddress')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.setValue(null)
      this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.clearValidators();
      this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.updateValueAndValidity();
      this.HusbFatherfieldsDisabled = false
    }
    else {

      this.registrationForm.get('DisbM_HusbFatherName')?.setValue('');
      this.registrationForm.get('DisbM_HusbFatherName')?.clearValidators();
      this.registrationForm.get('DisbM_HusbFatherName')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherOccupation')?.setValue(null)
      this.registrationForm.get('DisbM_HusbFatherOccupation')?.clearValidators();
      this.registrationForm.get('DisbM_HusbFatherOccupation')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherReligion')?.setValue(null);
      this.registrationForm.get('DisbM_HusbFatherReligion')?.clearValidators();
      this.registrationForm.get('DisbM_HusbFatherReligion')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherCaste')?.setValue(null);
      this.registrationForm.get('DisbM_HusbFatherCaste')?.clearValidators();
      this.registrationForm.get('DisbM_HusbFatherCaste')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherLastAddress')?.setValidators([Validators.required,
      Validators.maxLength(100), Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')]);
      this.registrationForm.get('DisbM_HusbFatherLastAddress')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbFatherLastOccupation')?.updateValueAndValidity();
      this.HusbFatherfieldsDisabled = true
    }
  }



  onIsWifeFatherAliveChange(event: Event): void {
    this.DisbM_IsWifeFatherAlive = event.target as HTMLInputElement;
    if (this.DisbM_IsWifeFatherAlive.value == 'Y') {
      console.log(this.DisbM_IsWifeFatherAlive.value);
      this.registrationForm.get('DisbM_WifeFatherName')?.
        setValidators([Validators.maxLength(20), Validators.required
          , Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')]);
      this.registrationForm.get('DisbM_WifeFatherName')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeFatherOccupation')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeFatherOccupation')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeFatherLastAddress')?.setValue('');
      this.registrationForm.get('DisbM_WifeFatherLastAddress')?.clearValidators();
      this.registrationForm.get('DisbM_WifeFatherLastAddress')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.setValue(null);
      this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.clearValidators();
      this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.updateValueAndValidity();
      this.WifeFatherfieldsDisabled = false
    }
    else {
      this.registrationForm.get('DisbM_WifeFatherName')?.setValue('');
      this.registrationForm.get('DisbM_WifeFatherName')?.clearValidators();
      this.registrationForm.get('DisbM_WifeFatherName')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeFatherOccupation')?.setValue(null);
      this.registrationForm.get('DisbM_WifeFatherOccupation')?.clearValidators();
      this.registrationForm.get('DisbM_WifeFatherOccupation')?.updateValueAndValidity();


      this.registrationForm.get('DisbM_WifeFatherLastAddress')?.setValidators([Validators.required, Validators.maxLength(100), Validators.pattern('^[A-Za-z0-9- &@/#.\']+$')]);
      this.registrationForm.get('DisbM_WifeFatherLastAddress')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeFatherLastOccupation')?.updateValueAndValidity();
      this.WifeFatherfieldsDisabled = true
    }
  }


  DisabledpersonChanged(event: Event): void {
    this.DisbM_DisabledPersons = event.target as HTMLInputElement;
    if (this.DisbM_DisabledPersons.value == 1) {
      this.registrationForm.get('DisbM_HusbDisabilityType')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbDisabilityType')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbDisabilityPer')?.setValidators([Validators.required, Validators.min(40), Validators.max(100), Validators.maxLength(5)]);
      this.registrationForm.get('DisbM_HusbDisabilityPer')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeDisabilityType')?.clearValidators();
      this.registrationForm.get('DisbM_WifeDisabilityType')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeDisabilityPer')?.clearValidators();
      this.registrationForm.get('DisbM_WifeDisabilityPer')?.updateValueAndValidity();


      this.registrationForm.get('DisbM_WifeDisabilityType').reset();
      this.registrationForm.get('DisbM_WifeDisabilityPer').setValue('');

      this.IsHusbDisable = false
      this.IsWifeDisable = true
      this.IsBothHusbWifeDisable = false
    }
    else if (this.DisbM_DisabledPersons.value == 2) {

      this.registrationForm.get('DisbM_WifeDisabilityType')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeDisabilityType')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeDisabilityPer')?.setValidators([Validators.required, Validators.min(40), Validators.max(100), Validators.maxLength(5)]);
      this.registrationForm.get('DisbM_WifeDisabilityPer')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbDisabilityType')?.clearValidators();
      this.registrationForm.get('DisbM_HusbDisabilityType')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbDisabilityPer')?.clearValidators();
      this.registrationForm.get('DisbM_HusbDisabilityPer')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbDisabilityType').reset();
      this.registrationForm.get('DisbM_HusbDisabilityPer').setValue('');

      this.IsHusbDisable = true
      this.IsWifeDisable = false
      this.IsBothHusbWifeDisable = false
    }
    else {
      this.registrationForm.get('DisbM_HusbDisabilityType')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbDisabilityType')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbDisabilityPer')?.setValidators([Validators.required, Validators.min(40), Validators.max(100), Validators.maxLength(5)]);
      this.registrationForm.get('DisbM_HusbDisabilityPer')?.updateValueAndValidity();


      this.registrationForm.get('DisbM_WifeDisabilityType')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeDisabilityType')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeDisabilityPer')?.setValidators([Validators.required, Validators.min(40), Validators.max(100), Validators.maxLength(5)]);
      this.registrationForm.get('DisbM_WifeDisabilityPer')?.updateValueAndValidity();

      this.IsHusbDisable = false
      this.IsWifeDisable = false
      this.IsBothHusbWifeDisable = true
    }
  }


  IsMarriageRegInUCCChange(event: Event): void {
    this.isMarriageRegInUCC = event.target as HTMLInputElement;
    if (this.isMarriageRegInUCC.value == 'Y') {

      this.registrationForm.get('DisbM_UCCRegNo').setValidators([Validators.required]);
      this.registrationForm.get('DisbM_UCCRegNo').updateValueAndValidity();

      this.registrationForm.get('DisbM_UCCRegDate').setValidators([Validators.required]);
      this.registrationForm.get('DisbM_UCCRegDate').updateValueAndValidity();

      this.MarriageRegInUCC = true;
    }
    else {
      this.registrationForm.get('DisbM_UCCRegNo').clearValidators();
      this.registrationForm.get('DisbM_UCCRegNo').updateValueAndValidity();

      this.registrationForm.get('DisbM_UCCRegDate').clearValidators();
      this.registrationForm.get('DisbM_UCCRegDate').updateValueAndValidity();
      this.registrationForm.get('DisbM_UCCRegNo').setValue('');
      this.registrationForm.get('DisbM_UCCRegDate').setValue('');
      this.MarriageRegInUCC = false;

    }
  }


  get f() {
    return this.registrationForm.controls;
  }
  enableField: boolean = false;



  onHubDistrictChange(arg) {
    this.registrationForm.get('DisbM_HusbRuralUrban')?.reset();
    this.registrationForm.get('DisbM_HusbTehsil_Code')?.reset();
    this.registrationForm.get('DisbM_HusbBlock_Code')?.reset();
    this.registrationForm.get('DisbM_HusbPanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_HusbVillage_Code')?.reset();
    this.registrationForm.get('DisbM_HusbTown_Code')?.reset();
    this.registrationForm.get('DisbM_HusbWard_Code')?.reset();
    this.registrationForm.get('DisbM_Branch')?.setValue('');
    this.registrationForm.get('DisbM_IFSC').setValue('');
    this.registrationForm.get('DisbM_ConfirmIFSC').setValue('');
    this.registrationForm.get('DisbM_BankAccountNo').setValue('');
    this.registrationForm.get('DisbM_ConfirmBankAccountNo').setValue('');
    this.selectedHusbDistrict = this.ddlHusbDistrict.nativeElement.value;
    this.selectedHusbTehsil
    this._masterServices
      .getTehsilsOnBasisDist('0', this.selectedHusbDistrict)
      .subscribe(
        (tehdata) => {
          this.Husbtehsils = tehdata;
          this.Husbtehsils = this._funcsServices.sortTehsilsAlphabatically(
            this.Husbtehsils
          );
        }

      );
  }

  onHusbAreaChange(event: Event) {
    this.registrationForm.get('DisbM_HusbTehsil_Code')?.reset();
    this.registrationForm.get('DisbM_HusbBlock_Code')?.reset();
    this.registrationForm.get('DisbM_HusbPanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_HusbVillage_Code')?.reset();
    this.registrationForm.get('DisbM_HusbTown_Code')?.reset();
    this.registrationForm.get('DisbM_HusbWard_Code')?.reset();
    this.registrationForm.get('DisbM_Branch')?.reset();
    this.registrationForm.get('DisbM_IFSC').setValue('');
    this.registrationForm.get('DisbM_ConfirmIFSC').setValue('');
    this.registrationForm.get('DisbM_BankAccountNo').setValue('');
    this.registrationForm.get('DisbM_ConfirmBankAccountNo').setValue('');

    const ddlHusbAreaSelectedValue = event.target as HTMLInputElement;
    if (ddlHusbAreaSelectedValue.value == 'R') {
      this.registrationForm.get('DisbM_HusbBlock_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbBlock_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbPanchayat_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbPanchayat_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbVillage_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbVillage_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbTown_Code')?.clearValidators();
      this.registrationForm.get('DisbM_HusbTown_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbWard_Code')?.clearValidators();
      this.registrationForm.get('DisbM_HusbWard_Code')?.updateValueAndValidity();

      this.disableHusbRuralArea = false

    }
    else if (ddlHusbAreaSelectedValue.value == 'U') {

      this.registrationForm.get('DisbM_HusbBlock_Code')?.clearValidators();
      this.registrationForm.get('DisbM_HusbBlock_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbPanchayat_Code')?.clearValidators();
      this.registrationForm.get('DisbM_HusbPanchayat_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbVillage_Code')?.clearValidators();
      this.registrationForm.get('DisbM_HusbVillage_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbTown_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbTown_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_HusbWard_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_HusbWard_Code')?.updateValueAndValidity();

      this.disableHusbRuralArea = true
    }

  }


  onHusbTehsilChange(arg) {

    this.registrationForm.get('DisbM_HusbBlock_Code')?.reset();
    this.registrationForm.get('DisbM_HusbPanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_HusbVillage_Code')?.reset();
    this.registrationForm.get('DisbM_HusbTown_Code')?.reset();
    this.registrationForm.get('DisbM_HusbWard_Code')?.reset();
    this.selectedHusbTehsil = this.ddlHusbTehsil.nativeElement.value;
    if (this.ddlHusbArea.nativeElement.value == 'R') {
      this.divUrbanDisabled = false;
      this._masterServices
        .getBlocksOnBasisTeh(this.selectedHusbTehsil)
        .subscribe((blks) => {
          this.blocks = blks;
          this.blocks = this._funcsServices.sortBlocksAlphabatically(this.blocks);
        });
    } else if (this.ddlHusbArea.nativeElement.value == 'U') {
      this.divUrbanDisabled = true;
      this._masterServices
        .getTownsOnBasisDistTeh(this.selectedHusbDistrict, this.selectedHusbTehsil)
        .subscribe((town) => {
          this.towns = town;
          this.towns = this._funcsServices.sortTownsAlphabatically(this.towns);
        });
    }
  }

  // --------------------------Code for filling Panchayat Drop Down-----------------------

  selectedBlock = '';

  public panchayats: any;
  onHusbBlockChange(arg) {

    this.registrationForm.get('DisbM_HusbPanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_HusbVillage_Code')?.reset();

    this.selectedBlock = this.ddlHusbBlock.nativeElement.value;
    // console.log(this.selectedBlock);
    this._masterServices
      .getPanchayatsOnBasisTehBlock(this.selectedHusbTehsil, this.selectedBlock)
      .subscribe((panch) => {
        this.panchayats = panch;
        this.panchayats = this._funcsServices.sortPanchayatsAlphabatically(
          this.panchayats
        );
      });
  }

  // --------------------------Code for filling Village Drop Down-----------------------

  public selectedPanchayat: any;
  public villages: any;
  onHusbPanchayatChange(arg) {
    this.registrationForm.get('DisbM_HusbVillage_Code')?.reset();
    this.selectedPanchayat = this.ddlHusbPanchayat.nativeElement.value;
    this._masterServices
      .getVillagesOnBasisTehBlockPanch(
        this.selectedHusbTehsil,
        this.selectedBlock,
        this.selectedPanchayat
      )
      .subscribe((villg) => {
        this.villages = villg;
        this.villages = this._funcsServices.sortVillagesAlphabatically(
          this.villages
        );
      });
  }

  // --------------------------Code for Filling Ward Drop Down-----------------------


  public selectedHusbTown: any;
  public Husbwards: any;
  onHusbTownChange(arg) {
    this.registrationForm.get('DisbM_HusbWard_Code')?.reset();
    this.selectedHusbTown = this.ddlHusbTown.nativeElement.value;
    this._masterServices
      .getWardsOnBasisTown('0', this.selectedHusbTown)
      .subscribe((ward) => {
        this.Husbwards = ward;
        this.Husbwards = this._funcsServices.sortWardsAlphabatically(
          this.Husbwards

        );
      });
  }

  // ------------------------Code for filling Address details of wife--------------------------

  onWifeDistrictChange(arg) {
    this.registrationForm.get('DisbM_WifeRuralUrban')?.reset();
    this.registrationForm.get('DisbM_WifeTehsil_Code')?.reset();
    this.registrationForm.get('DisbM_WifeBlock_Code')?.reset();
    this.registrationForm.get('DisbM_WifePanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_WifeVillage_Code')?.reset();
    this.registrationForm.get('DisbM_WifeTown_Code')?.reset();
    this.registrationForm.get('DisbM_WifeWard_Code')?.reset();
    this.selectedWifeDistrict = this.ddlWifeDistrict.nativeElement.value;
    this._masterServices
      .getTehsilsOnBasisDist('0', this.selectedWifeDistrict)
      .subscribe(
        (tehdata) => {
          this.Wifetehsils = tehdata;
          this.Wifetehsils = this._funcsServices.sortTehsilsAlphabatically(
            this.Wifetehsils
          );
        }
      )
  };


  onWifeAreaChange(event: Event) {

    this.registrationForm.get('DisbM_WifeTehsil_Code')?.reset();
    this.registrationForm.get('DisbM_WifeBlock_Code')?.reset();
    this.registrationForm.get('DisbM_WifePanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_WifeVillage_Code')?.reset();
    this.registrationForm.get('DisbM_WifeTown_Code')?.reset();
    this.registrationForm.get('DisbM_WifeWard_Code')?.reset();
    const ddlWifeAreaSelectedValue = event.target as HTMLInputElement;
    if (ddlWifeAreaSelectedValue.value == 'R') {
      this.disableWifeRuralArea = false

      this.registrationForm.get('DisbM_WifeBlock_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeBlock_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifePanchayat_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifePanchayat_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeVillage_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeVillage_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeTown_Code')?.clearValidators();
      this.registrationForm.get('DisbM_WifeTown_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeWard_Code')?.clearValidators();
      this.registrationForm.get('DisbM_WifeWard_Code')?.updateValueAndValidity();

    }
    else if (ddlWifeAreaSelectedValue.value == 'U') {

      this.disableWifeRuralArea = true
      this.registrationForm.get('DisbM_WifeBlock_Code')?.clearValidators();
      this.registrationForm.get('DisbM_WifeBlock_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifePanchayat_Code')?.clearValidators();
      this.registrationForm.get('DisbM_WifePanchayat_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeVillage_Code')?.clearValidators();
      this.registrationForm.get('DisbM_WifeVillage_Code')?.updateValueAndValidity();


      this.registrationForm.get('DisbM_WifeTown_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeTown_Code')?.updateValueAndValidity();

      this.registrationForm.get('DisbM_WifeWard_Code')?.setValidators([Validators.required]);
      this.registrationForm.get('DisbM_WifeWard_Code')?.updateValueAndValidity();

    }

  }




  selectedWifeTehsil: any
  onWifeTehsilChange(arg) {

    this.registrationForm.get('DisbM_WifeBlock_Code')?.reset();
    this.registrationForm.get('DisbM_WifePanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_WifeVillage_Code')?.reset();
    this.registrationForm.get('DisbM_WifeTown_Code')?.reset();
    this.registrationForm.get('DisbM_WifeWard_Code')?.reset();
    this.selectedWifeTehsil = this.ddlWifeTehsil.nativeElement.value;
    if (this.ddlWifeArea.nativeElement.value == 'R') {
      this.divUrbanDisabled = false;
      this._masterServices
        .getBlocksOnBasisTeh(this.selectedWifeTehsil)
        .subscribe((blks) => {
          this.blocks = blks;
          this.blocks = this._funcsServices.sortBlocksAlphabatically(this.blocks);
        });

    } else if (this.ddlWifeArea.nativeElement.value == 'U') {
      this.divUrbanDisabled = true;
      this._masterServices
        .getTownsOnBasisDistTeh(this.selectedWifeDistrict, this.selectedWifeTehsil)
        .subscribe((town) => {
          this.towns = town;
          this.towns = this._funcsServices.sortTownsAlphabatically(this.towns);
        });
    }
  }




  onWifeBlockChange(arg) {
    this.registrationForm.get('DisbM_WifePanchayat_Code')?.reset();
    this.registrationForm.get('DisbM_WifeVillage_Code')?.reset();
    this.selectedBlock = this.ddlWifeBlock.nativeElement.value;
    this._masterServices
      .getPanchayatsOnBasisTehBlock(this.selectedWifeTehsil, this.selectedBlock)
      .subscribe((panch) => {
        this.panchayats = panch;
        this.panchayats = this._funcsServices.sortPanchayatsAlphabatically(
          this.panchayats
        );
      });
  }

  // --------------------------Code for filling Village Drop Down-----------------------

  onWifeanchayatChange(arg) {
    this.registrationForm.get('DisbM_WifeVillage_Code')?.reset();
    this.selectedPanchayat = this.ddlWifePanchayat.nativeElement.value;
    this._masterServices
      .getVillagesOnBasisTehBlockPanch(
        this.selectedWifeTehsil,
        this.selectedBlock,
        this.selectedPanchayat
      )
      .subscribe((villg) => {
        this.villages = villg;
        this.villages = this._funcsServices.sortVillagesAlphabatically(
          this.villages
        );
      });
  }

  selectedWifeTown: any;
  WifeWards: any;
  onWifeTownChange(arg) {
    this.registrationForm.get('DisbM_WifeWard_Code')?.reset();
    this.selectedWifeTown = this.ddlWifeTown.nativeElement.value;
    this._masterServices
      .getWardsOnBasisTown('0', this.selectedWifeTown)
      .subscribe((ward) => {
        this.WifeWards = ward;
        this.WifeWards = this._funcsServices.sortWardsAlphabatically(
          this.WifeWards
        );
      });
  }


  returnData: any;
  @ViewChild('bankAccountno', { static: false }) bankAcccountno: ElementRef;
  checkDuplicityOfBankAcc(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.checkDuplicateAccountNo(event.target.value);
      }
    }, 1000);
  }

  checkDuplicateAccountNo(value: string) {
    this.bankAccountNumber = this.bankAcccountno.nativeElement.value;
    this._masterServices
      .checkDuplicityOfBankAccountNo(
        this.selectedHusbDistrict,
        this.bank_Code,
        this.branch_Code,
        '0',
        this.bankAccountNumber,
        this.maxLengthOfAccount,
        this.minLengthOfAccount
      )
      .subscribe((duplicateBankAcounts) => {
        this.returnData = duplicateBankAcounts;
        if (this.returnData.statusCode === 'BAMSG002') {
          this.isDuplcateAccount = true;
        } else {
          this.isDuplcateAccount = false;
        }
      });
  }


  searchIFSC(event: any) {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      if (event.keyCode != 13) {
        $this.fillBankBranches(event.target.value);
      }
    }, 1000);
  }

  private fillBankBranches(value: string) {
    this.ifscCode = this.confirmIFSC.nativeElement.value;
    this.errorMessage = '';
    this.loading = true;
    this._masterServices
      .getBankBranchesOnBasisDistIFSC(this.ifscCode + this.selectedHusbDistrict)
      .subscribe(
        (bankbranch) => {
          //next() callback
          this.bankBranches = bankbranch;
          if (this.bankBranches != '') {
            this.maxLengthOfAccount = this.bankBranches[0]['max_AC_Length'];
            this.minLengthOfAccount = this.bankBranches[0]['min_AC_Length'];
            this.bank_Code = this.bankBranches[0]['bank_Code'];
            this.branch_Code = this.bankBranches[0]['branch_Code'];
            this.bankBranches = this._funcsServices.sortBankBranchesAlphabatically(
              this.bankBranches
            );
          }
          else {
            this.AlertBoxTitle = 'बैंक शाखा में त्रुटि!!';
            this.AlertBoxMessage = 'उक्त बैंक की शाखा पोर्टल पर उपलब्ध नहीं हैं। कृपया उक्त शाखा को पोर्टल पर जोड़ने हेतु आईटी सेल की ईमेल आईडी (swditcell@gmail.com)  पर  आवेदक का जिला ,बैंक का नाम ,बैंक का IFSC कोड ,बैंक शाखा का नाम  ईमेल करे।  उक्त बैंक शाखा के पोर्टल पर जुडने के पश्चात् ही आवेदन पत्र भरा जाना सम्भव होगा!';
            this.openAlert();
            return;
          }
        },
        (error) => {
          this.errorMessage = error.errorMessage;
          this.loading = false;
        }
      );
  }

  goToNextTab() {

    if (this.isCurrentStepValid()) {
      this.selectedTabIndex++;
    }


  }

  goToPreviousTab() {
    if (this.isCurrentStepValid()) {
      this.selectedTabIndex--;
    }

  }

  isCurrentStepValid(): boolean {
    
   



    if (this.selectedTabIndex === 0) {
      return (

        this.registrationForm.get('DisbM_Applicant').valid &&
        this.registrationForm.get('DisbM_DisabledPersonsDetail').valid
        && this.registrationForm.get('DisbM_HusbDisabilityType').valid
        && this.registrationForm.get('DisbM_HusbDisabilityPer').valid
        && this.registrationForm.get('DisbM_WifeDisabilityType').valid
        && this.registrationForm.get('DisbM_WifeDisabilityPer').valid
      )
    }
    else if (this.selectedTabIndex === 1) {
      return (

        this.registrationForm.get('DisbM_HusbName').valid &&
        this.registrationForm.get('DisbM_HusbNationality').valid
        && this.registrationForm.get('DisbM_HusbReligion').valid
        && this.registrationForm.get('DisbM_HusbCaste').valid
        && this.registrationForm.get('DisbM_HusbAgeAtTimeOfMarriage').valid
        && this.registrationForm.get('DisbM_HusbOccupation').valid
        && this.registrationForm.get('DisbM_HusbDurationStayInUK').valid

        && this.registrationForm.get('DisbM_HusbFatherName').valid
        && this.registrationForm.get('DisbM_HusbFatherOccupation').valid
        && this.registrationForm.get('DisbM_HusbFatherReligion').valid
        && this.registrationForm.get('DisbM_HusbFatherCaste').valid
        && this.registrationForm.get('DisbM_HusbFatherLastAddress').valid
        && this.registrationForm.get('DisbM_HusbFatherLastOccupation').valid
        && this.registrationForm.get('DisbM_HusbAadhaarConsent').valid
        && this.registrationForm.get('DisbM_HusbGender').valid
        && this.registrationForm.get('DisbM_HusbMobileNo').valid
        && this.registrationForm.get('DisbM_HusbAadhaarNo').valid
      )
    }
    if (this.selectedTabIndex === 2) {
      return (this.registrationForm.get('DisbM_HusbDistrict_Code').valid
        && this.registrationForm.get('DisbM_HusbRuralUrban').valid
        && this.registrationForm.get('DisbM_HusbTehsil_Code').valid
        && this.registrationForm.get('DisbM_HusbBlock_Code').valid
        && this.registrationForm.get('DisbM_HusbPanchayat_Code').valid
        && this.registrationForm.get('DisbM_HusbVillage_Code').valid
        && this.registrationForm.get('DisbM_HusbTown_Code').valid
        && this.registrationForm.get('DisbM_HusbWard_Code').valid
        && this.registrationForm.get('DisbM_HusbHouse_number').valid
        && this.registrationForm.get('DisbM_HusbAreaMohalla').valid
        && this.registrationForm.get('DisbM_HusbPostOffice').valid
        && this.registrationForm.get('DisbM_HusbPinCode').valid
        && this.registrationForm.get('DisbM_HusbCurrentAddress').valid
        && this.registrationForm.get('DisbM_HusbBeforeMarriagAddress').valid
        && this.registrationForm.get('DisbM_HusbCurrentAddress').valid
        && this.registrationForm.get('DisbM_HusbCurrentAddress').valid
        && this.registrationForm.get('DisbM_HusbCurrentAddress').valid
        && this.registrationForm.get('DisbM_HusbLokSabhaArea').valid
        && this.registrationForm.get('DisbM_HusbAssemblyArea').valid
      )
    }
    if (this.selectedTabIndex === 3) {
      return (this.registrationForm.get('DisbM_WifeName').valid &&
        this.registrationForm.get('DisbM_WifeReligion').valid
        && this.registrationForm.get('DisbM_WifeCaste').valid
        && this.registrationForm.get('DisbM_WifeAgeAtTimeOfMarriage').valid
        && this.registrationForm.get('DisbM_WifeOccupation').valid
        && this.registrationForm.get('DisbM_WifeDurationStayInUK').valid
        && this.registrationForm.get('DisbM_WifeMobileNo').valid
        && this.registrationForm.get('DisbM_WifeAadhaarNo').valid
        && this.registrationForm.get('DisbM_WifeFatherName').valid
        && this.registrationForm.get('DisbM_WifeFatherOccupation').valid
        && this.registrationForm.get('DisbM_WifeFatherLastAddress').valid
        && this.registrationForm.get('DisbM_WifeFatherLastOccupation').valid
        && this.registrationForm.get('DisbM_WifeAadhaarConsent').valid
        && this.registrationForm.get('DisbM_WifeGender').valid
      )
    }
    if (this.selectedTabIndex === 4) {
      return (this.registrationForm.get('DisbM_WifeDistrict_Code').valid
        && this.registrationForm.get('DisbM_WifeRuralUrban').valid
        && this.registrationForm.get('DisbM_WifeTehsil_Code').valid
        && this.registrationForm.get('DisbM_WifeBlock_Code').valid
        && this.registrationForm.get('DisbM_WifePanchayat_Code').valid
        && this.registrationForm.get('DisbM_WifeVillage_Code').valid
        && this.registrationForm.get('DisbM_WifeTown_Code').valid
        && this.registrationForm.get('DisbM_WifeWard_Code').valid
        && this.registrationForm.get('DisbM_WifeHouse_number').valid
        && this.registrationForm.get('DisbM_WifeAreaMohalla').valid
        && this.registrationForm.get('DisbM_WifePostOffice').valid
        && this.registrationForm.get('DisbM_WifePinCode').valid
        && this.registrationForm.get('DisbM_WifeCurrentAddress').valid
        && this.registrationForm.get('DisbM_WifeBeforeMarriagAddress').valid
        && this.registrationForm.get('DisbM_WifeLokSabhaArea').valid
        && this.registrationForm.get('DisbM_WifeAssemblyArea').valid)



    }

    if (this.selectedTabIndex === 5) {
      return (this.registrationForm.get('DisbM_MarriageDate').valid
        && this.registrationForm.get('DisbM_MarriageRegistrationNo').valid
        && this.registrationForm.get('DisbM_MarriageRegistrationDate').valid
        && this.registrationForm.get('DisbM_MarriageRegistrationOfficeName').valid
        && this.registrationForm.get('DisbM_IsMarriageRegInUCC').valid
        && this.registrationForm.get('DisbM_UCCRegNo').valid
        && this.registrationForm.get('DisbM_UCCRegDate').valid
      )

    }

    if (this.selectedTabIndex === 6) {
      return (this.registrationForm.get('DisbM_IFSC').valid &&
        this.registrationForm.get('DisbM_ConfirmIFSC').valid
        && this.registrationForm.get('DisbM_Branch').valid
        && this.registrationForm.get('DisbM_BankAccountNo').valid
        && this.registrationForm.get('DisbM_ConfirmBankAccountNo').valid
      )
    }
    return true;
  }




  onSubmit(): void {

    // console.log("registration date:::+"+  this.registrationForm.get('DisbM_MarriageRegistrationDate').value!=''?formatDate(new Date(this.registrationForm.get('DisbM_MarriageRegistrationDate').value), 'yyyy-MM-dd', 'en-US'):'');
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    else {
      console.log("form is valid");
      const today = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');

      this.registrationForm.get('DisbM_WifeAgeAtTimeOfMarriage').value,
        this.registrationForm.get('DisbM_WifeOccupation').value,
        this.registrationForm.get('DisbM_WifeDurationStayInUK').value

      if ((this.registrationForm.get('DisbM_HusbDurationStayInUK').value) > (this.registrationForm.get('DisbM_HusbAgeAtTimeOfMarriage').value)) {
        this.AlertBoxTitle = 'आवेदन पंजीकरण में त्रुटि!!';
        this.AlertBoxMessage = ' "पति/दूल्हा का विवरण" चरण(भाग) में विद्यमान "पति/दूल्हा  के उत्तराखंड में रहने की अवधि", "शादी के समय पति/दूल्हा की आयु" से बड़ी अंकित की गयी है | कृपया "पति/दूल्हा के उत्तराखंड में रहने की अवधि" तथा  "शादी के समय पति/दूल्हा की आयु" सही अंकित करें | ';
        this.openAlert();
        console.log(this.MarriageRegistrationDate);
        return;
      }

      if ((this.registrationForm.get('DisbM_WifeDurationStayInUK').value) > (this.registrationForm.get('DisbM_WifeAgeAtTimeOfMarriage').value)) {
        this.AlertBoxTitle = 'आवेदन पंजीकरण में त्रुटि!!';
        this.AlertBoxMessage = '"पत्नी/दुल्हन का विवरण" चरण(भाग) में विद्यमान "पत्नी/दुल्हन के उत्तराखंड में रहने की अवधि", "शादी के समय पत्नी/दुल्हन की आयु" से बड़ी अंकित की गयी है | कृपया "पत्नी/दुल्हन के उत्तराखंड में रहने की अवधि" तथा  "शादी के समय पत्नी/दुल्हन की आयु" सही अंकित करें | ';
        this.openAlert();
        console.log(this.MarriageRegistrationDate);
        return;
      }

      this.DateofMarriage = formatDate(new Date(this.registrationForm.get('DisbM_MarriageDate').value), 'yyyy-MM-dd', 'en-US')
      if (this.DateofMarriage > today) {
        this.AlertBoxTitle = 'आवेदन पंजीकरण में त्रुटि!!';
        this.AlertBoxMessage = '"शादी सम्बन्धी सूचना" चरण(भाग) में विद्यमान "शादी की तिथि", "आज की तिथि" से बड़ी अंकित की गयी है |  कृपया शादी की सही तिथि अंकित करें | ';
        this.openAlert();
        console.log(this.MarriageRegistrationDate);
        return;
      }





      this.MarriageRegistrationDate = formatDate(new Date(this.registrationForm.get('DisbM_MarriageRegistrationDate').value), 'yyyy-MM-dd', 'en-US')


      if (this.MarriageRegistrationDate < this.DateofMarriage) {
        this.AlertBoxTitle = 'आवेदन पंजीकरण में त्रुटि!!';
        this.AlertBoxMessage = '"शादी सम्बन्धी सूचना" चरण(भाग) में विद्यमान "शादी की पंजीकरण की तिथि", "शादी की तिथि" से छोटी अंकित की गयी है | कृपया "शादी पंजीकरण की सही तिथि" अंकित करें | ';
        this.openAlert();
        return;
      }

      if (this.isMarriageRegInUCC.value == 'Y') {
        this.DisbM_UCCRegDate = formatDate(new Date(this.registrationForm.get('DisbM_UCCRegDate').value), 'yyyy-MM-dd', 'en-US')
        if (this.DisbM_UCCRegDate > today) {
          this.AlertBoxTitle = 'आवेदन पंजीकरण में त्रुटि!!';
          this.AlertBoxMessage = '"शादी सम्बन्धी सूचना" चरण(भाग) में विद्यमान "नागरिक संहिता पंजीकरण की तिथि", "आज की तिथि" से बड़ी अंकित की गयी है | कृपया "नागरिक संहिता पंजीकरण" की सही तिथि अंकित करें | ';
          this.openAlert();
          console.log(this.MarriageRegistrationDate);
          return;
        }
        if (this.DateofMarriage > this.DisbM_UCCRegDate) {
          this.AlertBoxTitle = 'आवेदन पंजीकरण में त्रुटि!!';
          this.AlertBoxMessage = '"शादी सम्बन्धी सूचना" चरण(भाग) में विद्यमान "नागरिक संहिता पंजीकरण की तिथि", "शादी की तिथि" से बड़ी होनी आवश्यक है |कृपया "नागरिक संहिता पंजीकरण" की सही तिथि अंकित करें | ';
          this.openAlert();
          console.log(this.MarriageRegistrationDate);
          return;
        }
      }
      else {
        this.DisbM_UCCRegDate = null;

      }

      this._masterServices
        .DISM_Applicant_Registration(

          // Total parameters in this section are 6
          this.registrationForm.get('DisbM_Applicant').value,
          this.registrationForm.get('DisbM_DisabledPersonsDetail').value,
          this.registrationForm.get('DisbM_HusbDisabilityType').value === '' ? null : this.registrationForm.get('DisbM_HusbDisabilityType').value,
          this.registrationForm.get('DisbM_HusbDisabilityPer').value === '' ? null : this.registrationForm.get('DisbM_HusbDisabilityPer').value,
          this.registrationForm.get('DisbM_WifeDisabilityType').value === '' ? null : this.registrationForm.get('DisbM_WifeDisabilityType').value,
          this.registrationForm.get('DisbM_WifeDisabilityPer').value === '' ? null : this.registrationForm.get('DisbM_WifeDisabilityPer').value,



          // Total parameters in this section are 19
          this.registrationForm.get('DisbM_HusbName').value,
          this.registrationForm.get('DisbM_HusbNationality').value,
          this.registrationForm.get('DisbM_HusbReligion').value,
          this.registrationForm.get('DisbM_HusbCaste').value,
          this.registrationForm.get('DisbM_HusbAgeAtTimeOfMarriage').value,
          this.registrationForm.get('DisbM_HusbOccupation').value,
          this.registrationForm.get('DisbM_HusbDurationStayInUK').value,
          this.registrationForm.get('DisbM_IsHusbFatherAlive').value,
          this.registrationForm.get('DisbM_HusbFatherName').value,
          this.registrationForm.get('DisbM_HusbFatherOccupation').value,
          this.registrationForm.get('DisbM_HusbFatherNationality').value,
          this.registrationForm.get('DisbM_HusbFatherLastAddress').value,
          this.registrationForm.get('DisbM_HusbFatherLastOccupation').value,
          this.registrationForm.get('DisbM_HusbFatherReligion').value,
          this.registrationForm.get('DisbM_HusbFatherCaste').value,
          this.registrationForm.get('DisbM_HusbFatherSubCaste').value,
          this.registrationForm.get('DisbM_HusbMobileNo').value,
          this.registrationForm.get('DisbM_HusbAadhaarNo').value,
          this.registrationForm.get('DisbM_HusbGender').value,


          // Total parameters in this section are 16
          this.registrationForm.get('DisbM_HusbDistrict_Code').value,
          this.registrationForm.get('DisbM_HusbTehsil_Code').value,
          this.registrationForm.get('DisbM_HusbRuralUrban').value,
          this.registrationForm.get('DisbM_HusbBlock_Code').value,
          this.registrationForm.get('DisbM_HusbPanchayat_Code').value,
          this.registrationForm.get('DisbM_HusbVillage_Code').value,
          this.registrationForm.get('DisbM_HusbTown_Code').value,
          this.registrationForm.get('DisbM_HusbWard_Code').value,
          this.registrationForm.get('DisbM_HusbHouse_number').value,
          this.registrationForm.get('DisbM_HusbAreaMohalla').value,
          this.registrationForm.get('DisbM_HusbPostOffice').value,
          this.registrationForm.get('DisbM_HusbPinCode').value,
          this.registrationForm.get('DisbM_HusbCurrentAddress').value,
          this.registrationForm.get('DisbM_HusbBeforeMarriagAddress').value,
          this.registrationForm.get('DisbM_HusbLokSabhaArea').value,
          this.registrationForm.get('DisbM_HusbAssemblyArea').value,

          // Total parameters in this section are 15
          this.registrationForm.get('DisbM_WifeName').value,
          this.registrationForm.get('DisbM_WifeNationality').value,
          this.registrationForm.get('DisbM_WifeReligion').value,
          this.registrationForm.get('DisbM_WifeCaste').value,
          this.registrationForm.get('DisbM_WifeAgeAtTimeOfMarriage').value,
          this.registrationForm.get('DisbM_WifeOccupation').value,
          this.registrationForm.get('DisbM_WifeDurationStayInUK').value,
          this.registrationForm.get('DisbM_WifeMobileNo').value,
          this.registrationForm.get('DisbM_WifeAadhaarNo').value,
          this.registrationForm.get('DisbM_IsWifeFatherAlive').value,
          this.registrationForm.get('DisbM_WifeFatherName').value,
          this.registrationForm.get('DisbM_WifeFatherOccupation').value,
          this.registrationForm.get('DisbM_WifeFatherLastAddress').value,
          this.registrationForm.get('DisbM_WifeFatherLastOccupation').value,
          this.registrationForm.get('DisbM_WifeGender').value,


          // Total parameters in this section are 16
          this.registrationForm.get('DisbM_WifeDistrict_Code').value,
          this.registrationForm.get('DisbM_WifeTehsil_Code').value,
          this.registrationForm.get('DisbM_WifeRuralUrban').value,
          this.registrationForm.get('DisbM_WifeBlock_Code').value,
          this.registrationForm.get('DisbM_WifePanchayat_Code').value,
          this.registrationForm.get('DisbM_WifeVillage_Code').value,
          this.registrationForm.get('DisbM_WifeTown_Code').value,
          this.registrationForm.get('DisbM_WifeWard_Code').value,
          this.registrationForm.get('DisbM_WifeHouse_number').value,
          this.registrationForm.get('DisbM_WifeAreaMohalla').value,
          this.registrationForm.get('DisbM_WifePostOffice').value,
          this.registrationForm.get('DisbM_WifePinCode').value,
          this.registrationForm.get('DisbM_WifeCurrentAddress').value,
          this.registrationForm.get('DisbM_WifeBeforeMarriagAddress').value,
          this.registrationForm.get('DisbM_WifeLokSabhaArea').value,
          this.registrationForm.get('DisbM_WifeAssemblyArea').value,

          // Total parameters in this section are 12
          formatDate(new Date(this.registrationForm.get('DisbM_MarriageDate').value), 'yyyy-MM-dd', 'en-US'),
          this.registrationForm.get('DisbM_MarriageRegistrationNo').value,
          this.registrationForm.get('DisbM_MarriageRegistrationDate').value,
          this.registrationForm.get('DisbM_MarriageRegistrationOfficeName').value,
          this.registrationForm.get('DisbM_IsMarriageRegInUCC').value,
          this.registrationForm.get('DisbM_UCCRegNo').value,
          this.DisbM_UCCRegDate,



          // Total parameters in this section are 4
          this.bank_Code,
          this.branch_Code,
          this.registrationForm.get('DisbM_IFSC').value,
          this.registrationForm.get('DisbM_BankAccountNo').value,
          this.registrationForm.get('DisbM_HusbWifeDeclare').value == true ? 'true' : 'false')


        .subscribe(resp => {
          this.isSubmitted = true;
          this.appRegistrationResp = resp

          if (this.appRegistrationResp.message == 'Success') {


    this.AlertBoxTitle = 'आवेदन पंजीकरण  के सम्बन्ध में!!';
    this.AlertBoxMessage = "आपके द्वारा दिव्यांग व्यक्तियों से विवाह हेतु अनुदान योजनान्तर्गत अनुदान के लिए सफलतापूर्वक आवेदन किया गया है| ";
    this.AlertBoxMessage1 = " \nकृपया विभागीय पेंशन पोर्टल के (https://ssp.uk.gov.in/) आवेदक लॉगिन ( https://ssp.uk.gov.in/Login_Applicant/frmLoginApplicant.aspx) \n के माध्यम से लॉगिन(Login) कर  अपने समस्त आवश्यक\n दस्तावेज अपलोड करें |"
    this.AlertBoxMessage2 = "आपका लॉगिन आई०डी एवं पासवर्ड निम्न प्रकार से है:-"
    this.AlertBoxMessage3 = "लॉगिन आई० डी०:-" + this.appRegistrationResp.result[0].application_No ;
    this.AlertBoxMessage4 = "पासवर्ड        :-"+ this.appRegistrationResp.result[0].password;
    this.openAlert();


            // this.AlertBoxTitle = 'आवेदन पंजीकरण  के सम्बन्ध में!!';
            // this.SuccessfullRegistrationmsg = "आपके द्वारा दिव्यांग व्यक्तियों से विवाह हेतु अनुदान योजनान्तर्गत अनुदान के लिए सफलतापूर्वक आवेदन किया गया है| " +
            //   " \nकृपया विभागीय पेंशन पोर्टल के (https://ssp.uk.gov.in/) आवेदक लॉगिन ( https://ssp.uk.gov.in/Login_Applicant/frmLoginApplicant.aspx) \n के माध्यम से लॉगिन(Login) कर  अपने समस्त आवश्यक\n दस्तावेज अपलोड करें | \nआपका लॉगिन आई०डी एवं पासवर्ड निम्न प्रकार से है:-\n"
            //   + " \n\nApplicant's Login Id :-" + this.appRegistrationResp.result[0].application_No + " \n\npassword:-" + this.appRegistrationResp.result[0].password;
            // this.AlertBoxMessage = this.SuccessfullRegistrationmsg;
            // this.openAlert();
            this.resetControls()
            // window.location.href = 'https://ssp.uk.gov.in/Login_Applicant/frmLoginApplicant.aspx';
          }
          else {
            this.isDuplcateAccount = false;
            this.AlertBoxTitle = 'आवेदन पंजीकरण के सम्बन्ध में!!';
            this.AlertBoxMessage = 'आवेदन पंजीकरण में त्रुटि!!';
            this.openAlert();
          }
        }
        );



    }
  }

  //=================Send SMS to the OldAge Applicant================
  // Dim objSendSMS As New SMS()
  // Dim SMSTemplate As String = "प्रिय आवेदक,आपके द्वारा वृद्धावस्था पेंशन योजना हेतु सफल आवेदन किया जा चुका है, आपकी आवेदन संख्या/लॉग इन आई० डी० " & AppNo & " तथा पासवर्ड " & strPassword & " है| कृपया पोर्टल के आवेदक लॉगिन के माध्यम से लॉगिन कर समस्त आवश्यक दस्तावेजों को पोर्टल पर अपलोड करें | समाज कल्याण विभाग -उत्तराखण्ड"
  // Dim dlt_template_id = "1007690907718087185"
  // objSendSMS.SendSMSByDLT(SMSTemplate, txt_contactNo.Text.Trim(), dlt_template_id)
  // Session("SMSTemplate") = SMSTemplate
  // ''=====================End Code============================

  ngOnDestroy(): void {
    // if (this.subscription) {
    //   this.subscription.unsubscribe();
    // }
  }

  resetControls() {
    this.registrationForm.get('DisbM_Applicant').setValue(''),
      this.registrationForm.get('DisbM_DisabledPersonsDetail').setValue(''),
      this.registrationForm.get('DisbM_HusbDisabilityType').reset(),
      this.registrationForm.get('DisbM_HusbDisabilityPer').setValue(''),
      this.registrationForm.get('DisbM_WifeDisabilityType').reset(),
      this.registrationForm.get('DisbM_WifeDisabilityPer').setValue(''),


      // Total parameters in this section are 18
      this.registrationForm.get('DisbM_HusbName').setValue(''),
      this.registrationForm.get('DisbM_HusbNationality').setValue(1),
      this.registrationForm.get('DisbM_HusbReligion').setValue(null)
    this.registrationForm.get('DisbM_HusbCaste').setValue(null),
      this.registrationForm.get('DisbM_HusbAgeAtTimeOfMarriage').setValue(''),
      this.registrationForm.get('DisbM_HusbOccupation').setValue(null),
      this.registrationForm.get('DisbM_HusbDurationStayInUK').setValue(''),

      this.registrationForm.get('DisbM_HusbFatherName').setValue(''),
      this.registrationForm.get('DisbM_HusbFatherOccupation').setValue(null),
      this.registrationForm.get('DisbM_HusbFatherNationality').setValue(null),
      this.registrationForm.get('DisbM_HusbFatherLastAddress').setValue(''),
      this.registrationForm.get('DisbM_HusbFatherLastOccupation').setValue(null),
      this.registrationForm.get('DisbM_HusbFatherReligion').setValue(null),
      this.registrationForm.get('DisbM_HusbFatherCaste').setValue(null),
      this.registrationForm.get('DisbM_HusbFatherSubCaste').setValue(''),
      this.registrationForm.get('DisbM_HusbMobileNo').setValue(''),
      this.registrationForm.get('DisbM_HusbAadhaarNo').setValue(''),

      // Total parameters in this section are 14
      this.registrationForm.get('DisbM_HusbDistrict_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbTehsil_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbRuralUrban').setValue(null),
      this.registrationForm.get('DisbM_HusbBlock_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbPanchayat_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbVillage_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbTown_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbWard_Code').setValue(null),
      this.registrationForm.get('DisbM_HusbHouse_number').setValue(null),
      this.registrationForm.get('DisbM_HusbAreaMohalla').setValue(''),
      this.registrationForm.get('DisbM_HusbPostOffice').setValue(''),
      this.registrationForm.get('DisbM_HusbPinCode').setValue(''),
      this.registrationForm.get('DisbM_HusbCurrentAddress').setValue(''),
      this.registrationForm.get('DisbM_HusbBeforeMarriagAddress').setValue(''),

      // Total parameters in this section are 14

      this.registrationForm.get('DisbM_WifeName').setValue(''),
      this.registrationForm.get('DisbM_WifeNationality').setValue(null),
      this.registrationForm.get('DisbM_WifeReligion').setValue(null),
      this.registrationForm.get('DisbM_WifeCaste').setValue(null),
      this.registrationForm.get('DisbM_WifeAgeAtTimeOfMarriage').setValue(''),
      this.registrationForm.get('DisbM_WifeOccupation').setValue(null),
      this.registrationForm.get('DisbM_WifeDurationStayInUK').value,
      this.registrationForm.get('DisbM_WifeMobileNo').setValue(''),
      this.registrationForm.get('DisbM_WifeAadhaarNo').setValue(''),
      this.registrationForm.get('DisbM_IsWifeFatherAlive').setValue(''),
      this.registrationForm.get('DisbM_WifeFatherName').setValue(''),
      this.registrationForm.get('DisbM_WifeFatherOccupation').setValue(null),
      this.registrationForm.get('DisbM_WifeFatherLastAddress').setValue(''),
      this.registrationForm.get('DisbM_WifeFatherLastOccupation').setValue(null),


      // Total parameters in this section are 14
      this.registrationForm.get('DisbM_WifeDistrict_Code').setValue(null),
      this.registrationForm.get('DisbM_WifeTehsil_Code').setValue(null),
      this.registrationForm.get('DisbM_WifeRuralUrban').setValue(null),
      this.registrationForm.get('DisbM_WifeBlock_Code').setValue(null),
      this.registrationForm.get('DisbM_WifePanchayat_Code').setValue(null),
      this.registrationForm.get('DisbM_WifeVillage_Code').setValue(null),
      this.registrationForm.get('DisbM_WifeTown_Code').setValue(null),
      this.registrationForm.get('DisbM_WifeWard_Code').setValue(null),
      this.registrationForm.get('DisbM_WifeHouse_number').setValue(''),
      this.registrationForm.get('DisbM_WifeAreaMohalla').setValue(''),
      this.registrationForm.get('DisbM_WifePostOffice').setValue(''),
      this.registrationForm.get('DisbM_WifePinCode').setValue(''),
      this.registrationForm.get('DisbM_WifeCurrentAddress').setValue(''),
      this.registrationForm.get('DisbM_WifeBeforeMarriagAddress').setValue(''),

      // Total parameters in this section are 12
      this.registrationForm.get('DisbM_MarriageDate').setValue(''),
      this.registrationForm.get('DisbM_MarriageRegistrationDate').setValue('');
      this.registrationForm.get('DisbM_MarriageRegistrationNo').setValue(''),
      this.registrationForm.get('DisbM_MarriageRegistrationOfficeName').setValue(''),

      this.registrationForm.get('DisbM_IsMarriageRegInUCC').setValue('Y'),
      this.registrationForm.get('DisbM_UCCRegNo').setValue(''),
      this.registrationForm.get('DisbM_UCCRegDate').setValue(''),


      // Total parameters in this section are 4
      this.branch_Code,
      this.registrationForm.get('DisbM_IFSC').setValue(''),
      this.registrationForm.get('DisbM_ConfirmIFSC').setValue(''),
      this.registrationForm.get('DisbM_BankAccountNo').setValue(''),
      this.registrationForm.get('DisbM_ConfirmBankAccountNo').setValue(''),
      this.registrationForm.get('DisbM_Branch').reset(),
      this.registrationForm.get('DisbM_HusbWifeDeclare').setValue('false')

  }



  openAlert() {
    const dialogRef = this.dialog.open(AlertDialogComponentComponent, {
      // width: '350px',
      data: {
        title: this.AlertBoxTitle,
        message: this.AlertBoxMessage,
        message1: this.AlertBoxMessage1,
        message2: this.AlertBoxMessage2,
        message3: this.AlertBoxMessage3,
        message4: this.AlertBoxMessage4,
        panelClass: 'dialog-responsive',
        disableClose: true
      }
    });

    // dialogRef.afterClosed().subscribe(() => {
    //   console.log('Dialog closed');
    // });
  }

goBack()
{
  window.location.href='http://localhost:57709/OnlineRegistration/FrmOnlineRegisApplicationOldage.aspx';
}

}
