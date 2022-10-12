import { getObjectInfos } from 'lightning/uiObjectInfoApi';
import { LightningElement, api } from 'lwc';
import registerUnitResponse from '@salesforce/apex/UnitService.registerUnitResponse'

export default class QuestionView extends LightningElement {


/* @api question; */
@api questionList; 
@api unitId;
@api question;
questionAnsweredJson={};
optionsSelected=[];

handleOption(event){

    this.questionAnsweredJson[event.detail.questionId] = event.detail.optionId;
    this.optionsSelected= Object.values(this.questionAnsweredJson);
    console.log('ESTO ES EL MAPA PARA PADRE'+JSON.stringify(this.questionAnsweredJson));
}

      handleSubmit(){
    registerUnitResponse({unitId: this.unitId, jsonAnswer: JSON.stringify(this.questionAnsweredJson)});
  }

}