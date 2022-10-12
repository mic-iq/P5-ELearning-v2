import { api, LightningElement, wire } from 'lwc';
import getTrailWrapper from '@salesforce/apex/UnitService.getTrailWrapper';




export default class TrailView extends LightningElement {

@api recordId;

modulesList;
passedModuleIds;
trail
progressTrail
moduleId
passedUnitsIds
unitList
objectData
mapOfValues


@wire(getTrailWrapper, { trailId: '$recordId' })
    wiredData(result) {
       const {data,error} = result;    
      if (data) { 
        console.log('ESTO ES TODO----------',JSON.stringify(data));
        this.objectData= JSON.stringify({data});
        this.mapOfValues= JSON.parse(this.objectData);
        this.trail= data.trail;   
        this.passedUnitsIds = this.mapOfValues.data.passedUnitIds;
        this.passedModuleIds = this.mapOfValues.data.passedModuleIds;
        this.unitList = this.mapOfValues.data.modulesList[0].Units__r;
        this.modulesList = data.modulesList;
        this.progressTrail = data.progressTrail;
        console.log('ESTO ES MODULE LIST----------',this.modulesList);
        console.log('ESTO ES MODULE COMPLETED LIST----------',this.passedModuleIds);
        console.log('ESTO ES TRAILLLLLLL----------',this.trail);
        console.log('ESTO ES lista de unidades----------',this.passedUnitsIds); 
      
      
        
              } else if (error) {
         console.error('Error-->', error);
      }
    }



}