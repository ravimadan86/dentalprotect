const indexRouter = require('../routes/index');
const postsRouter = require('../routes/posts');
const adminRouter = require('../routes/admin');
const staffRouter = require('../routes/staff');
const categoryRouter = require('../routes/categories');

module.exports = function (app) {
    app.use('/', indexRouter);
    app.use('/posts', postsRouter);
    app.use('/admin', adminRouter);
    app.use('/staff', staffRouter);
    app.use('/categories', categoryRouter);
}