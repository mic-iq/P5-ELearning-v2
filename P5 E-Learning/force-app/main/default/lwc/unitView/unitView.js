import { api, LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';



export default class UnitView extends NavigationMixin(LightningElement) {
@api unit
@api passedUnitsIds;

passedUnitList;
subscription;

    get checkUnitIcon(){

       if(this.passedUnitsIds.includes(this.unit.Id)){
        return 'action:approval';
       }
       return 'standard:dataset';
    } 

    handleToUnit(){

        // Navigate to Unit__c record page
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                "recordId": this.unit.Id,
                "objectApiName": "Unit__c",
                "actionName": "view"
            },
        });
    }
        
        
}