export function parsePageQuery (pageQuery: unknown){
    if(typeof pageQuery === 'string'){
        const parsed = parseInt(pageQuery,10); 
        return parsed > 0 ? parsed : 1;  
    }
    return 1; 
}