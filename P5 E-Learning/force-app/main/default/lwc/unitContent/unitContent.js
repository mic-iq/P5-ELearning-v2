import { LightningElement, wire, api } from 'lwc';
import getUnitWrapper from '@salesforce/apex/UnitService.getUnitWrapper';

export default class UnitContent extends LightningElement {

@api recordId
unit;
questionList;


@wire(getUnitWrapper, { unitId:'$recordId'})//'$recordId'
    wiredData(result) {
       const {data,error} = result;    
      if (data) { 
        debugger
        console.log('ESTO ES TODO UNIT CONTENT----------',JSON.stringify(data));
        //this.objectData= JSON.stringify({data});
        //this.mapOfValues= JSON.parse(this.objectData);
        this.unit= data.unit;   
        this.questionList = data.questionsList;
        console.log('ESTO ES QUESTION LIST----------',this.questionList);
        console.log('ESTO ES unit----------',this.unit);
     
              } else if (error) {
         console.error('Error-->', error);
      }
    }





}