import { Component, OnInit } from '@angular/core';

import {Client} from '../_models/client';
import {ClientService} from '../_services/client.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Client[];
  pageLength = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [2, 5, 10, 25, 100];
  pageEvent: PageEvent;
  showSearchArea = false;

  constructor(
      private router: Router,
      private service: ClientService
  ) { }

  ngOnInit(): void {
    this.getClients(0);
  }

  getClients(pageIndex: number) {
    this.service.getClients(pageIndex, this.pageSize)
    .subscribe(v => {
        this.clients = v;
    });
  }

  editClient(client: Client) {
    this.service.sendClient(client);
    this.router.navigate(['/client-add']);
  }

  getPage(event?: PageEvent) {
    if (event) {
      this.getClients(event.pageIndex);
    }
    return event;
  }

  searchClient() {

  }
}
