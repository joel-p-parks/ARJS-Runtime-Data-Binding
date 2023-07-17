import { Component, ViewChild } from "@angular/core";

import { ViewerComponent, AR_EXPORTS, PdfExportService, HtmlExportService, TabularDataExportService } from "@grapecity/activereports-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: AR_EXPORTS,
      useClass: PdfExportService,
      multi: true,
    },
    {
      provide: AR_EXPORTS,
      useClass: HtmlExportService,
      multi: true,
    },
    {
      provide: AR_EXPORTS,
      useClass: TabularDataExportService,
      multi: true,
    },
  ],
})
export class AppComponent {
  @ViewChild(ViewerComponent, { static: false }) reportViewer: ViewerComponent;
  dataSetFields = [
    {
      "Name": "orderId",
      "DataField": "orderId"
    },
    {
      "Name": "customerId",
      "DataField": "customerId"
    },
    {
      "Name": "employeeId",
      "DataField": "employeeId"
    },
    {
      "Name": "orderDate",
      "DataField": "orderDate"
    },
    {
      "Name": "requiredDate",
      "DataField": "requiredDate"
    },
    {
      "Name": "shippedDate",
      "DataField": "shippedDate"
    },
    {
      "Name": "shipVia",
      "DataField": "shipVia"
    },
    {
      "Name": "freight",
      "DataField": "freight"
    },
    {
      "Name": "shipName",
      "DataField": "shipName"
    },
    {
      "Name": "shipAddress",
      "DataField": "shipAddress"
    },
    {
      "Name": "shipCity",
      "DataField": "shipCity"
    },
    {
      "Name": "shipRegion",
      "DataField": "shipRegion"
    },
    {
      "Name": "shipPostalCode",
      "DataField": "shipPostalCode"
    },
    {
      "Name": "shipCountry",
      "DataField": "shipCountry"
    },
  ];
  async loadData() {
    const headers = new Headers();
    const dataRequest = new Request(
      "https://demodata.grapecity.com/northwind/api/v1/Orders",
      {
        headers: headers,
      }
    );
    const response = await fetch(dataRequest);
    const data = await response.json();
    return data;
  }

  async loadReport() {
    const reportResponse = await fetch(
      "/assets/DynamicDataBinding.rdlx-json"
    );
    const report = await reportResponse.json();
    return report;
  }

  async onViewerInit() {
    const data = await this.loadData();
    const report = await this.loadReport();
    report.DataSources[0].ConnectionProperties.ConnectString = "jsondata=" + JSON.stringify(data);
    report.DataSets[0].Fields = this.dataSetFields;
    report.DataSets[0].Query.CommandText = "jpath=$.*";
    this.reportViewer.open(report);
  }
}
