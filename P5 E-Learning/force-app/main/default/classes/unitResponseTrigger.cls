public with sharing class unitResponseTrigger {
            
    public static void onBeforeUpdate(List<Progress_Unit_Per_Response__c> progressunitResponseList, Map<Id, Progress_Unit_Per_Response__c> oldUnitRespMap){

        List<Progress_Unit_Per_Response__c> answeredUnitRespList = new  List<Progress_Unit_Per_Response__c>();
        for(Progress_Unit_Per_Response__c unitResp : progressunitResponseList){
            if(unitResp.Status__c == 'Answered' && oldUnitRespMap.get(unitResp.Id).Status__c == 'Draft'){
            answeredUnitRespList.add(unitResp);
            }   
        }
        evaluateAnswers(answeredUnitRespList);
    }

public static void onAfterUpdate(List<Progress_Unit_Per_Response__c> progressunitResponseList, Map<Id,  Progress_Unit_Per_Response__c> oldUnitRespMap){

    List<Progress_Unit_Per_Response__c> successAnsweredUnitRespList = new  List<Progress_Unit_Per_Response__c>();
    for(Progress_Unit_Per_Response__c unitResp : progressunitResponseList){
        if(unitResp.Status__c == 'Success' && oldUnitRespMap.get(unitResp.Id).Status__c == 'Answered'){
            successAnsweredUnitRespList.add(unitResp);
        }
    }  
    
    updateUserScore(successAnsweredUnitRespList);
}


private static void updateUserScore(List<Progress_Unit_Per_Response__c> progressUnitResponseList){

    //recoleto todos los userIs de la lista que viene por parametro.
    Set<Id> userIds = new Set<Id>();
    for(Progress_Unit_Per_Response__c unitResp :progressUnitResponseList){
        userIds.add(unitResp.User__c);
    }
    //busco los usuarios relacionesdos a las unit response

    Map<Id, User> unitRespoByUserId = new Map<Id,User>([SELECT Score__c FROM User WHERE Id IN:userIds]);

    //Actualizo el score en base a la unit response.
    for(Progress_Unit_Per_Response__c unitResp:  progressUnitResponseList){
        User user = unitRespoByUserId.get(unitResp.User__c);

        user.Score__c += unitResp.Score__c;
    }

    update unitRespoByUserId.values();
}

private static void evaluateAnswers(List<Progress_Unit_Per_Response__c> progressUnitResponseList){

    Map<Id, Progress_Unit_Per_Response__c> unitPerRespQueryMap = new Map<Id, Progress_Unit_Per_Response__c>([SELECT Id, Unit__r.Score__c, (SELECT Id, Option__r.Is_Correct__c FROM Answers_For_Progresses__r) FROM Progress_Unit_Per_Response__c WHERE Id IN:progressUnitResponseList  ]);

    for(Progress_Unit_Per_Response__c unitResp : progressUnitResponseList){ 
        
        Progress_Unit_Per_Response__c unitRespFromDb =  unitPerRespQueryMap.get(unitResp.Id);
        
        unitResp.Status__c = 'Success';

        for(Answer_For_Progress__c answerForProgress : unitRespFromDb.Answers_For_Progresses__r){
   
             if(!answerForProgress.Option__r.Is_Correct__c){
                unitResp.Status__c = 'Fail';
                break;
            }
        }

        if(unitResp.Status__c == 'Success'){
            if(unitResp.Tries__c == 1){
                unitResp.Score__c = unitRespFromDb.Unit__r.Score__c;  

            }else if(unitResp.Tries__c == 2){
                unitResp.Score__c = unitRespFromDb.Unit__r.Score__c / 2; 

            }else{
                unitResp.Score__c = unitRespFromDb.Unit__r.Score__c / 4;
            }
        }
    }      
}   



}