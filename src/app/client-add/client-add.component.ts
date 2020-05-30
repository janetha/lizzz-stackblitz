import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {first, map, startWith, take} from 'rxjs/operators';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {ClientService} from '../_services/client.service';

import {StateGroup, _filter} from '../_models/state-group';
import {STATEABBREVIATION, STATEGROUPS} from '../_models/data-state-group';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css']
})
export class ClientAddComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  addedMessageText: string;
  stateGroupOptions$: Observable<StateGroup[]>;
  stateGroups = STATEGROUPS;

  stateGroupControl = this.fb.control(['']);
  clientForm = this.fb.group({
    id: [''],
    companyName: [''],
    contactName: [''],
    email: [''],
    address1: [''],
    address2: [''],
    address3: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    phone1: [''],
    phone2: [''],
    fax1: [''],
    fax2: ['']
  });

  constructor(
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private clientService: ClientService,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.stateGroupOptions$) {
      this.stateGroupOptions$ = this.stateGroupControl!.valueChanges.pipe(
          startWith(''),
          map(value => this.filterGroup(value))
      );
    }

    // any client to be edited
    this.subscription.add(this.clientService.getSentClient().pipe(take(1)).subscribe(c => {
      // this.router.navigate(['.'], {queryParams: {id: c.id}});
      this.clientForm.setValue(c);
      this.stateGroupControl.patchValue(c.state);
    }));
  }

  private filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({letter: group.letter, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }
    return this.stateGroups;
  }

  resetForm() {
    this.stateGroupControl.reset();
    this.clientForm.reset();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: 50000,
      panelClass: 'snackBarBig'
    });
  }

  onSubmit() {
    const stateGroupValue = this.stateGroupControl.value;
    if (typeof (stateGroupValue) === 'string' && stateGroupValue.length > 2) {
      this.clientForm.get('state').patchValue(STATEABBREVIATION.find(s => {
        return s.name === stateGroupValue;
      }).abbreviation);
    }

    this.clientService.upsertClient(this.clientForm.value)
        .pipe(first())
        .subscribe(x => {
          // this.addedMessageText = this.clientForm.get('companyName').value || this.clientForm.get('contactName').value;
          this.openSnackBar('Your changes have been saved');
        });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
