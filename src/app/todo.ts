export class Todo{
    id:number;
    text:string;
    completed:boolean;
    isEditing:boolean;
    constructor(obj : Object={}){
        Object.assign(this,obj)
    }
}