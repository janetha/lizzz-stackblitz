import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormArray, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Observable, of, Subscription} from 'rxjs';
import {debounceTime, first, map, startWith, switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import {StateGroup, _filter} from '../_models/state-group';
import {STATEABBREVIATION, STATEGROUPS} from '../_models/data-state-group';
import {User} from '../_models/user';
import {Client} from '../_models/client';
import {AccountService} from '../_services';
import {ClientService} from '../_services/client.service';
import {PurchaseOrdersService} from '../_services/purchase-orders.service';

@Component({
  selector: 'app-purchase-order-add',
  templateUrl: './purchase-order-add.component.html',
  styleUrls: ['./purchase-order-add.component.css']
})
export class PurchaseOrderAddComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  currentUser: User;
  useCustomShippingAddress = false;
  users: User[];
  clients$: Observable<Client[]>;
  addedMessageText: string;
  selectedClient: Client;
  stateGroups = STATEGROUPS;
  stateGroupOptions$: Observable<StateGroup[]>;
  clientNameSearch = this.fb.control(['', Validators.required]);
  customShippingAddressState = this.fb.control(['']);

  poForm = this.fb.group({
    id: [''],
    date: [''],
    userId: [''],
    status: [''],
    asiNumber: [''],
    description: [''],
    comments: [''],
    client: this.fb.group({
      id: [''],
      name: [''],
      notes: [''],
      shipNotes: [''],
      shipDate: [''],
      shipVia: [''],
      customShippingAddress: this.fb.group({
        attn: [''],
        companyName: [''],
        address1: [''],
        address2: [''],
        address3: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    }),
    supplier: this.fb.group({
      id: [''],
      notes: [''],
      shipNotes: [''],
      shipDate: [''],
      shipVia: [''],
      shipAccountNumber: ['']
    }),
    merchandise: this.fb.array([])
  });

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private accountService: AccountService,
              private clientService: ClientService,
              private purchaseOrderService: PurchaseOrdersService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.poForm.get('date').patchValue(new Date);

    // this.route.queryParams.subscribe(params => {
    //   console.log('check param');
    //   const id = Number(params['id']);
    //   if (id && id > 0) {
    //     this.purchaseOrderService.getPurchaseOrderById(id)
    //     .subscribe(p => {
    //       // this.resetForm();
    //       console.log('loadPurchaseOrder=');
    //       console.log(p);
    //       this.poForm.setValue(p);
    //     });
    //   }
    // });

    this.currentUser = this.accountService.userValue;

    this.accountService.getAll().subscribe(u => {
      this.users = u;
    });

    this.clients$ = this.clientNameSearch.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap(name => {
          if (name !== '') {
            return this.clientService.getClientsByName(name);
          } else {
            return of(null);
          }
        })
    );

    // start with i numbers of rows
    for (let i = 0; i < 1; i++) {
      this.merchandise.push(this.merchandiseForm);
    }

    // purchase order to be edited
    this.subscription.add(this.purchaseOrderService.getSentPurchaseOrder().pipe(
        switchMap(p => {
          this.poForm.setValue(p);
          return this.clientService.getClientById(p.client.id);
        })).subscribe(client => {
        this.selectedClient = client;
    }));
  }

  get client() {
    return this.poForm.get('client') as FormGroup;
  }

  get supplier() {
    return this.poForm.get('supplier') as FormGroup;
  }

  get customShippingAddress() {
    return this.poForm.get('client').get('customShippingAddress') as FormGroup;
  }

  get merchandiseForm() {
    return this.fb.group({
      quantity: [''],
      styleNumber: [''],
      description: [''],
      cost: [''],
      netCost: ['']
    });
  }

  get merchandise() {
    return this.poForm.get('merchandise') as FormArray;
  }

  private filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }
    return this.stateGroups;
  }

  addMerchandise() {
    this.merchandise.push(this.merchandiseForm);
  }

  removeMerchandise(index: number) {
    this.merchandise.removeAt(index);
  }

  displayClientName(client: Client): string {
    return client && client.companyName ? client.companyName : client.contactName;
  }

  customShippingAddressOnChange(event: any) {
    this.useCustomShippingAddress = event.checked;
    if (event.checked) {
      if (!this.stateGroupOptions$) {
        this.stateGroupOptions$ = this.customShippingAddressState!.valueChanges.pipe(
            startWith(''),
            map(value => this.filterGroup(value))
        );
      }

      if (this.selectedClient) {
        this.customShippingAddress.get('attn').patchValue(this.selectedClient.contactName);
        this.customShippingAddress.get('companyName').patchValue(this.selectedClient.companyName);
      }
    } else {
      this.customShippingAddress.reset();
    }
  }

  resetForm() {
    this.customShippingAddressState.reset();
    this.poForm.reset();
    this.poForm.get('date').patchValue(new Date);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 50000,
      panelClass: 'snackBarBig'
    });
  }

  onSubmit() {
    this.client.get('id').patchValue(this.selectedClient.id);

    const stateGroupValue = this.customShippingAddressState.value;
    if (typeof (stateGroupValue) === 'string' && stateGroupValue.length > 2) {
      this.customShippingAddress.get('state').patchValue(STATEABBREVIATION.find(s => {
        return s.name === stateGroupValue;
      }).abbreviation);
    }

    // console.log(this.poForm.value);
    this.subscription.add(this.purchaseOrderService.upsertPurchaseOrder(this.poForm.value)
        .pipe(first())
        .subscribe(x => {
          // this.addedMessageText = this.poForm.get('description').value;
          this.openSnackBar('Your changes have been saved');
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
