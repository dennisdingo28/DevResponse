export default async function copyToClipboard(value: string){
    if(navigator.clipboard && typeof window !=="undefined"){
        navigator.clipboard.writeText(value);
        return value;
    }
    return null;
}