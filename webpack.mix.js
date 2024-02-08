const mix = require("laravel-mix");

require("laravel-mix-tailwind");

mix
  .js("resources/js/app.js", "public/js")
  .react()
  .postCss("resources/css/app.css", "public/css")
  .tailwind();

if (mix.inProduction()) {
  mix.version();
}

mix.disableNotifications();
