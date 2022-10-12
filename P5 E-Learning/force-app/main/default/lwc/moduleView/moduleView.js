import { api, LightningElement } from 'lwc';

export default class ModuleView extends LightningElement {

@api module;
@api passedModuleIds;
@api passedUnitsIds;


get checkIcon() {
   if(this.passedModuleIds.includes(this.module.Id))
        return 'action:approval';
        }


        
}