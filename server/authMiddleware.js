function authenticate(req,res,next) {
    let headers = req.headers["authorization"]

    console.log(headers)

    next()
}

module.exports = authenticate