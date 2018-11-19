import { Input, OnInit } from "@angular/core";
import { MmrDataStoreService, MmrValueAccessable, MmrDataStore, ViewDataManager } from "../services";
import { Command } from "../services";

export abstract class AbstractView implements MmrValueAccessable, OnInit {

    @Input() id
    @Input() dsName
    @Input() children
    @Input() commands: {[name:string]: Command}
    @Input() viewDataManager: ViewDataManager;

    constructor(protected dataStoreService: MmrDataStoreService) {}

    ngOnInit() {
        this.subcribeDataStoreEvents()
    }

    subcribeDataStoreEvents() {
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

    findCommand(command:string): Command {
        if (this.commands && this.commands[command]) {
            return this.commands[command]
        }
        return null
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