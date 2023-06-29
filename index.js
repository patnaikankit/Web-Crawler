function main(){
    if(process.argv.length < 3){
        console.log("No link provided")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("Too many arguements")
        process.exit(1)
    }
    const url = process.argv[2]
    console.log(`Initiating crawl of ${url}`);
}

main()