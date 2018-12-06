module.exports  = {
    authentication: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', 'You must have admin permissions to access that page. Please login!');
            res.redirect('/');
        }
    } 
}