module.exports = (res, error) => {
    const { response } = error
    
    if(response) {
        const {status, data} = response

        const statusCode = status || 404
        const errorMessage = data.error || 'Country not found '
        
        res.status(statusCode).json({error:errorMessage})
    } else {
        res.satus(500).send('Error interno de servidor')
    }
}