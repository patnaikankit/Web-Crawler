function printReport(pages){
    console.log("!-------------------------!");
    console.log("          REPORT");
    console.log("!-------------------------!");
    const sortedPages = sortPages(pages)
    for(const sortedPage of sortedPages){
        const link = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links on page: ${link}`);
    }
    console.log("!-------------------------!");
    console.log("           END");
    console.log("!-------------------------!");
}

function sortPages(pages){
    const collection = Object.entries(pages)
    collection.sort((x, y) => {
        X = x[1]
        Y = y[1]
        return y[1] - x[1]
    })
    return collection
}

module.exports = {
    sortPages,
    printReport
}