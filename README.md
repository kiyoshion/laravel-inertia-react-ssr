# Laravel + Inertia + React + SSR on VPS

This is a sample Laravel app for SSR on VPS.

[Inertia](https://inertiajs.com/)

## Deploy app

I made docker compose for this stack, PHP, Node.js, Nginx and MySQL. You can use [kiyoshion
/
laravel-dokcer-compose](https://github.com/kiyoshion/laravel-dokcer-compose) if you want.

## Use pm2

I use pm2 insted of Forever. Check more details [pm2](https://pm2.keymetrics.io/).

```
npm install -g pm2
pm2 start bootstrap/ssr/ssr.mjs --name inertia_test -i 1
pm2 list
```

Check meta tags at [here](https://rakko.tools/tools/9/) or somewhere.
