# 构建面向使用者的网站

本页面面向开发人员。  
在 Exment 中，通过更改端点（URL 的入口），除了 Exment 的网站之外，还可以构建由开发人员自己制作的、面向普通用户的网站（面向使用者的网站）。

本页面以处理 Exment 的“公告”表的数据为例，制作以下页面。

- 公告数据的列表
- 公告数据的详情显示
- 公告数据的新建
- 公告数据的编辑
- 公告数据的删除

制作的顺序如下。

1. 确认是否可以访问
2. 制作列表页面（路由 → 控制器 → 视图）
3. 依次添加详情、新建、编辑、删除的页面

![面向使用者的网站构建页面](../ja/img/public_site/public_site1.png)

## 确认访问
面向使用者的网站，在构建 Exment 之后也可以访问。

| URL 的末尾 | 打开的网站 |
|---|---|
| “/admin” | 管理员网站(Exment) |
| “/” | 面向使用者的网站 |

- 要把面向使用者的网站放在“/”，请把 `.env` 的 `ADMIN_ROUTE_PREFIX` 设为“admin”。这是因为 v7.2.1 及以后的全新安装，默认情况下 Exment 位于“/”。详情请参阅[更改或删除 URL 中包含的“admin”](/zh/additional_prefix)。

■端点“/”
![面向使用者的网站构建页面](../ja/img/public_site/public_site2.png)

■端点“/admin”
![面向使用者的网站构建页面](../ja/img/public_site/public_site3.png)

## 制作页面
面向使用者的网站，基本上按照与普通的 Laravel 系统开发相同的结构和步骤制作。  
下图是 Laravel 根文件夹的结构。其中，主要在以下文件夹中制作 php 文件。

| 文件夹 | 放置的内容 |
|---|---|
| app/Http/Controllers | 控制器 |
| routes | 端点信息 |
| resources/views | 视图。用 blade 语法书写 |
| public | css、js、图片等 |

![面向使用者的网站构建页面](../ja/img/public_site/public_site4.png)

#### routes：路由
在 routes/web.php 中，按如下方式写出列表页面的路由。  
※其他路由的写法，请参阅 [Laravel 的路由说明](https://readouble.com/laravel/8.x/ja/routing.html)（日语）。

~~~
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('welcome');
//});

///// 列表页面
Route::get('/', [\App\Http\Controllers\IndexController::class, 'index']);
~~~

#### Controller：控制器
在 app/Http/Controllers 文件夹中制作 IndexController.php，按如下方式书写。

- CustomTable：相当于 Exment 的“自定义表”的 Model。
- CustomTable::getEloquent('information')->getValueModel()：Exment 的表的数据用的 Model。表示用户输入的各条数据。

※其他控制器的写法，请参阅 [Laravel 的控制器说明](https://readouble.com/laravel/8.x/ja/controllers.html)（日语）。

~~~
<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Exceedone\Exment\Model\CustomTable;

class IndexController extends BaseController
{
    //列表页面
    public function index(Request $request){
        $items = CustomTable::getEloquent('information')->getValueModel()->get();
        return view('index', [
            'items' => $items,
        ]);
    }
}
~~~

#### view：视图
视图要制作 2 个文件。即通用的框架（_layout.blade.php）和列表的内容（index.blade.php）。

在 resources/views 中制作 _layout.blade.php，按如下方式书写。  
~~~
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">

        <!-- Styles -->
        <style>
            /*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}a{background-color:transparent}[hidden]{display:none}html{font-family:system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}*,:after,:before{box-sizing:border-box;border:0 solid #e2e8f0}a{color:inherit;text-decoration:inherit}svg,video{display:block;vertical-align:middle}video{max-width:100%;height:auto}.bg-white{--bg-opacity:1;background-color:#fff;background-color:rgba(255,255,255,var(--bg-opacity))}.bg-gray-100{--bg-opacity:1;background-color:#f7fafc;background-color:rgba(247,250,252,var(--bg-opacity))}.border-gray-200{--border-opacity:1;border-color:#edf2f7;border-color:rgba(237,242,247,var(--border-opacity))}.border-t{border-top-width:1px}.flex{display:flex}.grid{display:grid}.hidden{display:none}.items-center{align-items:center}.justify-center{justify-content:center}.font-semibold{font-weight:600}.h-5{height:1.25rem}.h-8{height:2rem}.h-16{height:4rem}.text-sm{font-size:.875rem}.text-lg{font-size:1.125rem}.leading-7{line-height:1.75rem}.mx-auto{margin-left:auto;margin-right:auto}.ml-1{margin-left:.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.ml-2{margin-left:.5rem}.mt-4{margin-top:1rem}.ml-4{margin-left:1rem}.mt-8{margin-top:2rem}.ml-12{margin-left:3rem}.-mt-px{margin-top:-1px}.max-w-6xl{max-width:72rem}.min-h-screen{min-height:100vh}.overflow-hidden{overflow:hidden}.p-6{padding:1.5rem}.py-4{padding-top:1rem;padding-bottom:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.pt-8{padding-top:2rem}.fixed{position:fixed}.relative{position:relative}.top-0{top:0}.right-0{right:0}.shadow{box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06)}.text-center{text-align:center}.text-gray-200{--text-opacity:1;color:#edf2f7;color:rgba(237,242,247,var(--text-opacity))}.text-gray-300{--text-opacity:1;color:#e2e8f0;color:rgba(226,232,240,var(--text-opacity))}.text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.text-gray-500{--text-opacity:1;color:#a0aec0;color:rgba(160,174,192,var(--text-opacity))}.text-gray-600{--text-opacity:1;color:#718096;color:rgba(113,128,150,var(--text-opacity))}.text-gray-700{--text-opacity:1;color:#4a5568;color:rgba(74,85,104,var(--text-opacity))}.text-gray-900{--text-opacity:1;color:#1a202c;color:rgba(26,32,44,var(--text-opacity))}.underline{text-decoration:underline}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.w-5{width:1.25rem}.w-8{width:2rem}.w-auto{width:auto}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}@media (min-width:640px){.sm\:rounded-lg{border-radius:.5rem}.sm\:block{display:block}.sm\:items-center{align-items:center}.sm\:justify-start{justify-content:flex-start}.sm\:justify-between{justify-content:space-between}.sm\:h-20{height:5rem}.sm\:ml-0{margin-left:0}.sm\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\:pt-0{padding-top:0}.sm\:text-left{text-align:left}.sm\:text-right{text-align:right}}@media (min-width:768px){.md\:border-t-0{border-top-width:0}.md\:border-l{border-left-width:1px}.md\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}@media (min-width:1024px){.lg\:px-8{padding-left:2rem;padding-right:2rem}}@media (prefers-color-scheme:dark){.dark\:bg-gray-800{--bg-opacity:1;background-color:#2d3748;background-color:rgba(45,55,72,var(--bg-opacity))}.dark\:bg-gray-900{--bg-opacity:1;background-color:#1a202c;background-color:rgba(26,32,44,var(--bg-opacity))}.dark\:border-gray-700{--border-opacity:1;border-color:#4a5568;border-color:rgba(74,85,104,var(--border-opacity))}.dark\:text-white{--text-opacity:1;color:#fff;color:rgba(255,255,255,var(--text-opacity))}.dark\:text-gray-400{--text-opacity:1;color:#cbd5e0;color:rgba(203,213,224,var(--text-opacity))}.dark\:text-gray-500{--tw-text-opacity:1;color:#6b7280;color:rgba(107,114,128,var(--tw-text-opacity))}}
        </style>

        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body class="antialiased">
        <div class="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
            @if (Route::has('login'))
                <div class="hidden fixed top-0 right-0 px-6 py-4 sm:block">
                    @auth
                        <a href="{{ url('/home') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Home</a>
                    @else
                        <a href="{{ route('login') }}" class="text-sm text-gray-700 dark:text-gray-500 underline">Log in</a>

                        @if (Route::has('register'))
                            <a href="{{ route('register') }}" class="ml-4 text-sm text-gray-700 dark:text-gray-500 underline">Register</a>
                        @endif
                    @endauth
                </div>
            @endif

            <main>
                @yield('content')
            </main>
        </div>
    </body>
</html>

~~~

在 resources/views 中制作 index.blade.php，按如下方式书写。  
※其他 Blade 的写法，请参阅 [Laravel 的 Blade 说明](https://readouble.com/laravel/8.x/ja/blade.html)（日语）。

~~~
@extends('_layout')

@section('content')
    <h1>公告列表</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>标题</th>
                <th>创建时间</th>
                <th>更新时间</th>
                <th></th>
            </tr>
        </thead>

        <tbody>
        @foreach($items as $item)
            <tr>
                <td>{{$item->id}}</td>
                <td>{{$item->getValue('title', 'html')}}</td>
                <td>{{$item->created_at}}</td>
                <td>{{$item->updated_at}}</td>
                <td><a href="{{asset($item->id)}}">详情</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div>
        <a href="{{asset('/create')}}">新建</a>
    </div>
@endsection
~~~

#### 显示结果
到这里为止都正确的话，会像下面这样显示 Exment 的“公告”表的数据列表。  
※“新建”“详情”的链接，此时还不能打开。稍后再制作。

![面向使用者的网站构建页面](../ja/img/public_site/public_site5.png)

#### 制作数据详情页面
制作数据详情页面。在以下 3 个文件中追加内容。

routes/web.php
~~~
///// 详情页面
Route::get('/{id}', [\App\Http\Controllers\IndexController::class, 'show']);
~~~


app/Http/Controllers/IndexController.php（追加在 index 函数的下面）
~~~
  //详情页面
    public function show(Request $request, $id){
        $item = CustomTable::getEloquent('information')->getValueModel()->find($id);
        if(!$item){
            return redirect('');
        }
        return view('show', [
            'item' => $item,
        ]);
    }
~~~


resources/views/show.blade.php（新建）
~~~
@extends('_layout')

@section('content')
    <h1>数据详情</h1>
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>标题</th>
                <td>{{$item->getValue('title', 'html')}}</td>
            </tr>
            <tr>
                <th>正文</th>
                <td>{!! $item->getValue('body', 'html') !!}</td>
            </tr>
            <tr>
                <th>显示标志</th>
                <td>{!! $item->getValue('view_flg', 'html') !!}</td>
            </tr>
            <tr>
                <th>显示顺序</th>
                <td>{!! $item->getValue('order', 'html') !!}</td>
            </tr>
            <tr>
                <th>重要度</th>
                <td>{!! $item->getValue('priority', 'html') !!}</td>
            </tr>
            <tr>
                <th>创建时间</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>更新时间</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

    <div>
        <a href="{{asset('/')}}">返回列表</a>
    </div>
@endsection
~~~

#### 显示结果
正确的话，会像下面这样显示 Exment 的“公告”表中指定 ID 的数据的详情。

![面向使用者的网站构建页面](../ja/img/public_site/public_site6.png)

#### 数据新建页面
制作数据新建页面。在以下 3 个文件中追加内容。

routes/web.php（写在详情页面的上面）
~~~
///// 新建页面
Route::get('/create', [\App\Http\Controllers\IndexController::class, 'create']);
Route::post('/', [\App\Http\Controllers\IndexController::class, 'store']);
~~~

app/Http/Controllers/IndexController.php（追加在 show 函数的下面）
~~~
    //新建页面
    public function create(Request $request){
        return view('create');
    }

    //执行新建登记
    public function store(Request $request){
        //创建用于保存数据的 Model
        $custom_value = CustomTable::getEloquent('information')->getValueModel();

        //设置值
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'view_flg' => $request->get('view_flg'),
            'order' => $request->get('order'),
            'priority' => $request->get('priority'),
        ]);

        //保存数据
        $custom_value->save();

        //重定向到该数据
        return redirect($custom_value->id);
    }
~~~


resources/views/create.blade.php（新建）
~~~
@extends('_layout')

@section('content')
    <h1>新建数据</h1>

    <form method="post" action="{{asset('/')}}">
        @csrf
        <table>
            <tbody>
                <tr>
                    <th>标题</th>
                    <td><input type="text" name="title" value="{{old('title')}}" /></td>
                </tr>
                <tr>
                    <th>正文</th>
                    <td><textarea name="body">{{old('body')}}</textarea></td>
                </tr>
                <tr>
                    <th>显示标志</th>
                    <td>
                        <select name="view_flg">
                            <option value="0" selected>NO</option>
                            <option value="1">YES</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>显示顺序</th>
                    <td><input type="number" name="order" value="{{old('order')}}"></input></td>
                </tr>
                <tr>
                    <th>重要度</th>
                    <td>
                        <select name="priority">
                            <option value="{{old('priority')}}" selected></option>
                            <option value="1">非常低</option>
                            <option value="2">低</option>
                            <option value="3">普通</option>
                            <option value="4">高</option>
                            <option value="5">非常高</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <button type="submit">提交</button>
        <br/><br/>
        
        <div>
            <a href="{{asset('/')}}">返回列表</a>
        </div>
    </form>
@endsection
~~~


#### 显示结果
正确的话，会像下面这样显示向 Exment 的“公告”表添加数据的页面。

![面向使用者的网站构建页面](../ja/img/public_site/public_site7.png)

#### 数据编辑页面
制作数据编辑页面。在以下 5 个文件中追加内容（或改写内容）。

routes/web.php（写在详情页面的上面）
~~~
///// 编辑页面
Route::get('/edit/{id}', [\App\Http\Controllers\IndexController::class, 'edit']);
Route::put('/{id}', [\App\Http\Controllers\IndexController::class, 'update']);
~~~


app/Http/Controllers/IndexController.php（追加在 store 函数的下面）
~~~
 // 编辑页面
    public function edit(Request $request, $id){
        $item = CustomTable::getEloquent('information')->getValueModel()->find($id);
        if(!$item){
            return redirect('');
        }
        return view('edit', [
            'item' => $item,
        ]);
    }

    // 执行编辑
    public function update(Request $request, $id){
        // 创建用于保存数据的 Model
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // 设置值
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'order' => $request->get('order'),
            'view_flg' => $request->get('view_flg'),
            'priority' => $request->get('priority'),
        ]);

        // 保存数据
        $custom_value->save();

        // 重定向到该数据
        return redirect($custom_value->id);
    }
~~~

resources/views/edit.blade.php（新建）
~~~
@extends('_layout')

@section('content')
    <h1>编辑数据</h1>

    <form method="post" action="{{asset('/' . $item->id)}}">
        @csrf
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>标题</th>
                <td><input type="text" name="title" value="{{old('title', $item->getValue('title', 'html'))}}" /></td>
            </tr>
            <tr>
                <th>正文</th>
                <td>
                    <textarea name="body">{{old('body', $item->getValue('body', 'html'))}}</textarea>
                </td>
            </tr>
            <tr>
                <th>显示标志</th>
                <td>
                    <select name="view_flg">
                    <option value="{{old('view_flg', $item->getValue('view_flg', 'html'))}}" selected>{{old('view_flg', $item->getValue('view_flg', 'html'))}}</option>
                            <option value="0">NO</option>
                            <option value="1">YES</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>显示顺序</th>
                <td>
                    <input type="number" name="order" value="{{old('order', $item->getValue('order', 'html'))}}"></input>
                </td>
            </tr>
            <tr>
                <th>重要度</th>
                <td>
                    <select name="priority">
                            <option value="{{old('priority', $item->getValue('priority', 'html'))}}" selected>{{old('priority', $item->getValue('priority', 'html'))}}</option>
                            <option value="1">非常低</option>
                            <option value="2">低</option>
                            <option value="3">普通</option>
                            <option value="4">高</option>
                            <option value="5">非常高</option>
                        </select>
                </td>
            </tr>
            <tr>
                <th>创建时间</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>更新时间</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

        <button type="submit">提交</button>
        <br/><br/>
        @method('PUT')
    </form>

    
    <div>
        <a href="{{asset('/')}}">返回列表</a>
    </div>
@endsection
~~~

resources/views/show.blade.php（添加在“返回列表”的 div 标签的上面）
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">编辑</a>  
    </div>
~~~

resources/views/index.blade.php（改写 td 标签的内容）
~~~
<td><a href="{{asset($item->id)}}">详情</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">编辑</a></td>
~~~

#### 显示结果

![面向使用者的网站构建页面](../ja/img/public_site/public_site8.png)

#### 数据删除页面
使数据可以删除。在以下 4 个文件中追加内容（或改写内容）。

routes/web.php
~~~
///// 删除
Route::get('/delete/{id}', [\App\Http\Controllers\IndexController::class, 'delete']);
~~~

app/Http/Controllers/IndexController.php（追加在 update 函数的下面）
~~~
// 执行删除
    public function delete(Request $request, $id){
        // 获取要删除的数据
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // 删除数据
        $custom_value->delete();

        // 重定向到列表
        return redirect('/');
    }
~~~

resources/views/show.blade.php（改写第 1 个 div 标签的内容）
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">编辑</a>
        &nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">删除</a>
    </div>
~~~

resources/views/index.blade.php（改写 td 标签的内容）
~~~
<td><a href="{{asset($item->id)}}">详情</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">编辑</a>&nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">删除</a></td>
~~~

#### 显示结果
![面向使用者的网站构建页面](../ja/img/public_site/public_site9.png)