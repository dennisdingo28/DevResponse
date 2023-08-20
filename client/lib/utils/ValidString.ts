export default function ValidString(text:any){
    if(!text || text.trim()==='' || text===undefined)
        return false;
    return true;
}