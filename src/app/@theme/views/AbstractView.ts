import { Input, OnInit } from "@angular/core";
import { MmrDataStoreService, MmrValueAccessable, MmrDataStore } from "../services";

export abstract class AbstractView implements MmrValueAccessable, OnInit {

    @Input() id
    @Input() dsName
    @Input() children

    constructor(protected dataStoreService: MmrDataStoreService) {
        
    }

    ngOnInit() {
        this.subcribeDataStoreEvents()
    }

    subcribeDataStoreEvents() {
        console.log(this.dsName)
        if (this.dsName == null || this.dsName == '') return

        const ds = this.dataStoreService.getDataStoreManager().lookupDataStore(this.dsName);
        if (ds != null) {
          ds.recordsChanged.subscribe(evt => {
            if (evt.source != this) {
              this.applyValues(ds)
            }
          })
        }
    }
    
    applyValues(ds: MmrDataStore) {
        if (ds.id == this.dsName) {
            this.applyValuesIfMatch(ds)
        }
    }
    updateValues(ds: MmrDataStore) {
        if (ds.id == this.dsName) {
            this.updateValuesIfMatch(ds)
        }
    }

    applyValuesIfMatch(ds: MmrDataStore) {}
    updateValuesIfMatch(ds: MmrDataStore) {}
}