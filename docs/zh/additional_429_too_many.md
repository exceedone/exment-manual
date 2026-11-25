# API 出现 429 错误时
调用 Exment 的 API 时，可能会出现 429 错误（429 Too Many Requests）。  
本页说明出现的原因，以及更改访问次数上限的方法。

- Exment 对 API 的访问次数有限制：每个用户（未认证时为每个 IP 地址）每分钟最多 60 次。
- 超过上限时，会出现 429 Too Many Requests 错误。
- 这是因为 Exment 使用的框架（Laravel）会对大量的请求加以限制。

### 设置步骤 
**(1)** 打开项目文件夹中的“.env”文件。

**(2)** 在“EXMENT_API_MAX_RATE_LIMIT”中写入每分钟访问次数的上限。默认值是 60。  
※如果已经有同名的键，请改写它的值。

例：每分钟最多允许 120 次时

~~~
EXMENT_API_MAX_RATE_LIMIT=120
~~~

**(3)** 如果使用了设置的缓存，请再执行一次“php artisan config:cache”。

> 设置值的详细说明，请查看 [Exment 设置值一览](/zh/config)。

### 注意事项
- **写了自己的 throttle 时**：如果在“app/Http/Kernel.php”或“bootstrap/app.php”中，给 api 的中间件组设置了直接指定次数的自定义 throttle（如“throttle:60,1”），则以它为准，不会使用“EXMENT_API_MAX_RATE_LIMIT”。要用“EXMENT_API_MAX_RATE_LIMIT”来设置时，请删除自定义 throttle 的写法。
- **v7.0.0 以后**：api 的中间件组中没有 throttle 的设置时，Exment 会自动添加“throttle:api”。因此，即使把“app/Http/Kernel.php”中 throttle 的写法注释掉，也不能解除限制。要放宽限制时，请给“EXMENT_API_MAX_RATE_LIMIT”设置一个较大的值。
- **v6.x 及更早的版本**：由“app/Http/Kernel.php”的 api 中间件组中写的“\Illuminate\Routing\Middleware\ThrottleRequests::class.':api'”（Laravel 10 的默认写法）进行限制。Exment 不会自动添加“throttle:api”，所以把这段写法注释掉，就可以解除限制。
- “EXMENT_API_MAX_RATE_LIMIT”可在 Exment v6.2.4 以后使用。

[←返回追加设置一览](/zh/quickstart_more)
