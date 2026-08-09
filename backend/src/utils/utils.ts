export function parsePageQuery (pageQuery: unknown){
    if(typeof pageQuery === 'string'){
        const parsed = parseInt(pageQuery,10); 
        return parsed > 0 ? parsed : 1;  
    }
    return 1; 
}


export function parseLimitQuery (limitQuery: unknown){
    if(typeof limitQuery === 'string'){
        const parsed = parseInt(limitQuery,10); 
        return parsed > 0 ? parsed : 10;  
    }
    return 10; 
}

