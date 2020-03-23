[![Netlify Status](https://api.netlify.com/api/v1/badges/d992e6f2-de9b-4ed2-b9ec-1c72014a1a1a/deploy-status)](https://app.netlify.com/sites/sealab-no/deploys)

# SEALAB WEBSITE - Built with Gatsbyjs
**Note:** This starter uses [Gatsby v2](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/).

This repo contains an SEALABS business website that is built with [Gatsby](https://www.gatsbyjs.org/), and [Netlify CMS](https://www.netlifycms.org): **[Live Link](http://sealab.no/)**.

It follows the [JAMstack architecture](https://jamstack.org) by using Git as a single source of truth, and [Netlify](https://www.netlify.com) for continuous deployment, and CDN distribution.

## Prerequisites

- Node (I recommend using v8.2.0 or higher)
- [Gatsby CLI](https://www.gatsbyjs.org/docs/)
- `.env.development` file containing following environment variables: `GOOGLE_MAPS_KEY`, `GTM`, `GOOGLE_ANALYTICS_KEY`, `GOOGLE_TAG_MANAGER_ID`. Ask maintainer for these secrets. 

## Getting Started (Recommended)

Netlify CMS can run in any frontend web environment, but the quickest way to try it out is by running it on a pre-configured starter site with Netlify. Use the button below to build and deploy your own copy of the repository:

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/netlify-templates/gatsby-starter-netlify-cms&amp;stack=cms"><img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"></a>

After clicking that button, you’ll authenticate with GitHub and choose a repository name. Netlify will then automatically create a repository in your GitHub account with a copy of the files from the template. Next, it will build and deploy the new site on Netlify, bringing you to the site dashboard when the build is complete. Next, you’ll need to set up Netlify’s Identity service to authorize users to log in to the CMS.

### Access Locally
```
$ git clone https://github.com/[GITHUB_USERNAME]/[REPO_NAME].git
$ cd [REPO_NAME]
$ yarn
$ npm run start
```
To test the CMS locally, you'll need run a production build of the site:
```
$ npm run build
$ npm run serve
```

## Getting Started (Without Netlify)
```
$ gatsby new [SITE_DIRECTORY_NAME] https://github.com/netlify-templates/gatsby-starter-netlify-cms/
$ cd [SITE_DIRECTORY_NAME]
$ npm run build
$ npm run serve
```

### Setting up the CMS
Follow the [Netlify CMS Quick Start Guide](https://www.netlifycms.org/docs/quick-start/#authentication) to set up authentication, and hosting.

## Debugging
Windows users might encounter ```node-gyp``` errors when trying to npm install.
To resolve, make sure that you have both Python 2.7 and the Visual C++ build environment installed.
```
npm config set python python2.7
npm install --global --production windows-build-tools
```

[Full details here](https://www.npmjs.com/package/node-gyp 'NPM node-gyp page')

## Purgecss
This plugin uses [gatsby-plugin-purgecss](https://www.gatsbyjs.org/packages/gatsby-plugin-purgecss/) and [bulma](https://bulma.io/). The bulma builds are usually ~170K but reduced 90% by purgecss.


# gatsbyjs/gatsby     [![Travis CI Build Status](https://travis-ci.org/gatsbyjs/gatsby-docker.svg?branch=master)](https://travis-ci.org/gatsbyjs/gatsby-docker)
Docker image that builds hosts a Gatsby site

This image has two major tags:

1. `latest` - will serve your assets on production using up an nginx server

2. `onbuild` - builds your project and creates a new docker image

## Usage

1. Build your project's public assets with `gatsby build`
1. Create a `Dockerfile`, as below, at the root of your project:
    ```dockerfile
    FROM gatsbyjs/gatsby:onbuild
    ```
1. Build your project's docker image:
    ```bash
    docker build -t myproject/website .
    ```
1. Upload to the registry
    ```bash
    docker push myproject/website
    ```
1. Use it
    ```bash
    docker run --rm -p 80:80 myproject/website
    # Open your browser at http://localhost
    ```

## Configuration

The way Nginx behaves can be configured using environment variables.

_Please refer the docker run command options for the --env-file flag where you can specify all required environment variables in a single file. This will save you from writing a potentially long docker run command. Alternatively you can use docker-compose._

Below is the complete list of available options that can be used to customize your Nginx configuration:

| Environment variable      | Default                                                                                                      | Description                                                                                                                                                                                                                                                                            |
|---------------------------|--------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `CACHE_IGNORE`            | `html`                                                                                                       | Regular expression to specify which paths shouldn't be cachable (header `Cache-Control` set to `no-store`).                                                                                                                                                                            |
| `CACHE_PUBLIC`            | `ico\|jpg\|jpeg\|png\|gif\|svg\|js\|jsx\|css\|less\|swf\|eot\|ttf\|otf\|woff\|woff2`                                        | Regular expression to specify which paths should be cachable (headers `Cache-Control` set to `public` and `Expires` set to the value of `$CACHE_PUBLIC_EXPIRATION`).                                                                                                                   |
| `CACHE_PUBLIC_EXPIRATION` | `1y`                                                                                                         | Time to set for header `Expires`. See http://nginx.org/en/docs/http/ngx_http_headers_module.html#expires                                                                                                                                                                               |
| `CHARSET`                 | `utf-8`                                                                                                      | Charset being used in `Content-Type` response header field. See http://nginx.org/en/docs/http/ngx_http_charset_module.html                                                                                                                                                             |
| `CUSTOM_SERVER_CONFIG`          | ` `                                                                                                       | Need to add some advanced/custom nginx config? No problem, you can inject through this environment variable. **NOTE:** would be discarded if `/etc/nginx/server.conf` is present. |
| `DEBUG`                   | `false`                                                                                                      | If set to `true` the configuration is being printed before the server starts.                                                                                                                                                                                                          |
| `GZIP_LEVEL`              | `6`                                                                                                          | Gzip compression level of a response. See http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_comp_level                                                                                                                                                                      |
| `GZIP_TYPES`              | `application/javascript application/x-javascript application/rss+xml text/javascript text/css image/svg+xml` | MIME types in addition to `text/html` for which gzip compression should be enabled. See http://nginx.org/en/docs/http/ngx_http_gzip_module.html#gzip_types                                                                                                                             |
| `HTTP_PORT`               | `80`                                                                                                         | The address and / or port for IP, or the path for a UNIX-domain socket on which the server will accept requests. See http://nginx.org/en/docs/http/ngx_http_core_module.html#listen                                                                                                    |
| `PUBLIC_PATH`             | `/pub`                                                                                                       | The path to the directory from which files are being served. See http://nginx.org/en/docs/http/ngx_http_core_module.html#root                                                                                                                                                          |
| `TRAILING_SLASH`          | `true`                                                                                                       | Specifies if paths should end with a trailing slash or not. Prevents [duplicated content](https://moz.com/learn/seo/duplicate-content) by redirecting requests to URLs ending with a slash to its non-trailing-slash equivalent if set to `true` and the other way around for `false`. |
| `WORKER_CONNECTIONS`      | `1024`                                                                                                       | The maximum number of simultaneous connections that can be opened by a worker process. See http://nginx.org/en/docs/ngx_core_module.html#worker_connections                                                                                                                            |

### Append rules for the server block in nginx config

You can mount a file to `/etc/nginx/server.conf` to extend the server block in nginx config. This could be useful if you have defined client only routes in GatsbyJS. For example for client only rules on path `/client-only` the content of your mounted file should be like:

  ```
  rewrite ^/client-only/([^.]*?/)$ /client-only/index.html;
  ```

Alternatively you can use a custom Dockerfile and copy the file on build:

  ```Dockerfile
  FROM gatsbyjs/gatsby:latest
  COPY nginx-server-rules.conf /etc/nginx/server.conf
  ```
  
**NOTE:** By adding the file `/etc/nginx/server.conf`, all the contents of the `CUSTOM_SERVER_CONFIG` environment variable will be discarded.