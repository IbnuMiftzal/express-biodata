function logger(request, respons, next){
    console.log(`Ada request dari ${request.url}`);

    next();
}

module.exports = {logger};