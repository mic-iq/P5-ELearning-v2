import { LightningElement, api } from 'lwc';
const TILE_WRAPPER_SELECTED_CLASS = "tile-wrapper selected";
const TILE_WRAPPER_UNSELECTED_CLASS = "tile-wrapper";

export default class OptionView extends LightningElement {
   
    @api option;
    @api question;
    @api optionsSelected;

    selectOption(){

         let optionId = this.option.Id;//detail .value
         let questionId = this.question.Id;
        
        const optionselect = new CustomEvent('optionselect', {
            detail: {
                optionId, questionId  
            }
        });
    this.dispatchEvent(optionselect);

    }   

    get optionClass() {
    if(this.optionsSelected.includes(this.option.Id)) {
        return TILE_WRAPPER_SELECTED_CLASS; 
    }else{
        return TILE_WRAPPER_UNSELECTED_CLASS;
    }

  }




}