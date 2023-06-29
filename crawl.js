const { JSDOM } = require('jsdom')

async function crawlPage(baseURL, currentURL, pages){
    const baseURLObj = new URL(baseURL)
    const currentURLURLObj = new URL(currentURL)
    // to make sure we are crawling the same website paths and not any external links
    if(baseURLObj.hostname !== currentURLURLObj.hostname){
        return pages
    }
    // to check if the current page is already crawled
    const normalizecurrentURL = normalizeURL(currentURL)
    if(pages[normalizecurrentURL] > 0){
        pages[normalizecurrentURL]++
        return pages
    }

    pages[normalizecurrentURL] = 1;
    console.log(`Actively crawling ${currentURL}`);

    try{
        const response = await fetch(currentURL);

        if(response.status > 399){
            console.log(`Error in fetch with status code: ${response.status} on page: ${currentURL}`);
            return pages
        }

        const contentType = response.headers.get("content-type")
        if(!contentType.includes('text/html')){
            console.log(`Non HTML response, content-type: ${contentType} on page: ${currentURL}`);
            return pages
        }

        const htmlBody = await response.text();
        const nextURLs = getURLfromHTML(htmlBody, baseURL)
        for(const nextURL of nextURLs){
            pages = await crawlPage(baseURL, nextURL, pages)
        }
    }
    catch(err){
        // if a wrong url is provided
        console.log(`Error in fetch: ${err.message}`);
    }
    return pages
}

function getURLfromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const links = dom.window.document.querySelectorAll('a');
    for(const link of links){
        if(link.href.slice(0, 1) === '/'){
            // relative url - contains only pathname
            // need to convert it into absolute url
            try{
            const urlObj = new URL(`${baseURL}${link.href}`);
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
    getURLfromHTML,
    crawlPage
}