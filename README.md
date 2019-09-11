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


# How to make WebAPI reference
We use [API Blueprint](https://apiblueprint.org/)to make WebAPI reference.

- Install node.js

- Install aglio

~~~
npm install -g aglio
~~~

- Preview single page. Execute this command on root directory

~~~
aglio -i reference/CustomValue.md --server
~~~

- Create merged html page. Execute this command on root directory

~~~
aglio -i reference/merge_webapi.txt -o reference/webapi.html
~~~