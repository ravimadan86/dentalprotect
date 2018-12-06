// Removing try catch repetition on every route
module.exports =  function (handler, api) {
    return async (req, res) => {
        try {
            await handler(req, res);
        } catch (err) {
            req.flash('error_msg', 'Something went wrong');
            // res.redirect('/' + api + '/addcategory');
            res.redirect(`/${api}`);
        }
    }
}