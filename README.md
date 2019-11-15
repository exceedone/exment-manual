# Exment Manual
This is manual repository for <a href="https://github.com/exceedone/exment">Exment</a>.
Please check this repository if you want to interest Exment.

# How to debug manual
this manual uses [docsify](https://docsify.js.org/#/)

- Install node.js

- Install docsify-cli

~~~
npm i docsify-cli -g
~~~

- Clone this repository

- Execute this command on root directory

~~~
docsify serve docs
~~~

- Show http://localhost:3000 on browser.


# How to make WebAPI 
We use [redoc-cli](https://github.com/Redocly/redoc/tree/master/cli) and [Stoplight Studio](https://stoplight.io/studio/) to make WebAPI reference.

- Install node.js

- Install Stoplight Studio.

- Install redoc-cli

- Create html page. Execute this command on root directory

~~~
redoc-cli bundle reference/webapi/yaml/webapi.v1.yaml -o reference/webapi/webapi.html
~~~