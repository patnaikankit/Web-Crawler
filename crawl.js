const { JSDOM } = require('jsdom')

function getURLfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a')
    for(const link of links){
        if(link.href.slice(0, 1) === '/'){
            // relative url - contains only pathname
            // need to convert it into absolute url
            try{
            const urlObj = new URL(`${baseURL}${link.href}`)
            urls.push(urlObj.href);
            }
            catch(err){
                console.log(`Error with relative url :${err.message}`);
            }
        }
        else{
            // absolute url
            try{
                const urlObj = new URL(link.href)
                urls.push(urlObj.href);
            }
            catch(err){
                console.log(`Error with absolute url :${err.message}`);
            }
        }
    }
    return urls
}

function normalizeURL(url){
    const urlObj = new URL(url)
    // striping the protocol
    const path = `${urlObj.hostname}${urlObj.pathname}`
    // striping the trailing slash
    if(path.length > 0 && path.slice(-1) === '/'){
        return path.slice(0, -1)
    }
    return path
}

module.exports = {
    normalizeURL,
    getURLfromHTML
}