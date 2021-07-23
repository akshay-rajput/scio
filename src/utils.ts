
// function to group objects by a given property
export function groupBy(objectArray: any[], property: string | number, nestedObj?: string) {


    return objectArray.reduce(function (acc, obj) {
        let key = obj[property];

        if(nestedObj){
            key = obj[nestedObj][property];
        }

        if(!key){
            console.log('key not found');
        }
        else{
            // if group array doesn't exist create one
            if (!acc[key]) {
                acc[key] = []
            }
            
            // push to array
            acc[key].push(obj)
        }
        
        return acc;
    }, {});
}