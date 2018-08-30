import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
// import {MetaModule} from './meta/meta.module';
import { CommonModule } from '@angular/common';
import { DepositoryWorkAreaComponent } from './depository/depository-work-area/depository-work-area.component';
import { ViewAssetsComponent } from './depository/view-assets/view-assets.component';
import { CreateOwnershipComponent } from './depository/create-ownership/create-ownership.component';
import { OwnershipTransferRequestComponent } from './depository/ownership-transfer-request/ownership-transfer-request.component';
import { ViewMatchesComponent } from './depository/view-matches/view-matches.component';
import { AddAssetComponent } from './investor/add-asset/add-asset.component';
import { InvestorWorkAreaComponent } from './investor/investor-work-area/investor-work-area.component';
import { CreateOrderComponent } from './investor/create-order/create-order.component';
import { MatchedAssetsComponent } from './match/matched-assets/matched-assets.component';
import { UtilModule } from './util/util.module';
import { ViewOwnershipsComponent } from './depository/view-ownerships/view-ownerships.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ViewInventoryComponent } from './investor/view-inventory/view-inventory.component';

const appRoutes: Routes = [
  {
    path: 'investorWorkArea', component: InvestorWorkAreaComponent, children:
      [
        { path: 'viewInventory', component: ViewInventoryComponent },
        { path: 'addAsset', component: AddAssetComponent },
        { path: 'createOrder', component: CreateOrderComponent }
      ]
  },
  {
    path: 'depositoryWorkArea', component: DepositoryWorkAreaComponent, children:
      [
        { path: 'createOwnership', component: CreateOwnershipComponent },
        { path: 'viewMatches', component: ViewMatchesComponent, children: [
          { path: 'ownershipTransferRequests', component: OwnershipTransferRequestComponent }
        ] },
        { path: 'viewAssets', component: ViewAssetsComponent },
        { path: 'viewOwnerships', component: ViewOwnershipsComponent }
      ]
  },
  { path: 'match', component: MatchedAssetsComponent },
  { path: 'orders', component: ViewOrdersComponent },
  { path: '', redirectTo: '/investor/investorWorkArea', pathMatch: 'full' },
  { path: '**', redirectTo: '/investor/investorWorkArea', pathMatch: 'full' }

]

@NgModule({
  declarations: [
    AppComponent,
    DepositoryWorkAreaComponent,
    ViewAssetsComponent,
    CreateOwnershipComponent,
    OwnershipTransferRequestComponent,
    ViewMatchesComponent,
    AddAssetComponent,
    InvestorWorkAreaComponent,
    CreateOrderComponent,
    MatchedAssetsComponent,
    ViewOwnershipsComponent,
    ViewOrdersComponent,
    ViewInventoryComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    UtilModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
