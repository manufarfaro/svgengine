const path = require('path');
const Koa = require('koa');
var serve = require('koa-static-server');
const logger = require('koa-logger');
const router = require('koa-router')();

const render = require('koa-ejs');

const port = 3000;
const app = new Koa();

app.use(logger());

render(app, {
  root: path.join(__dirname, 'views'),
  viewExt: 'ejs',
});

router
  .get('/', index)
  .get('/simple', simple)
  .get('/loadClass', loadClass)
  .get('/animation', animation);

app.use(router.routes());

app.use(serve({rootDir: './dist', rootPath: '/js'}));
app.use(serve({rootDir: './examples/assets', rootPath: '/assets'}));

async function index(ctx) {
  await ctx.render('index');
}

async function simple(ctx) {
  await ctx.render('simple');
}

async function loadClass(ctx) {
  await ctx.render('loadClass');
}

async function animation(ctx) {
  await ctx.render('animation');
}

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
