# 利用者向けサイト構築

Exmentでは、エンドポイントを変えることによって、Exmentサイトの他に、開発者が独自に開発した一般ユーザー向けサイトを構築することが出来ます。  

今回当マニュアルで作成するページは、以下のものです。  
・お知らせデータの一覧  
・お知らせデータの詳細表示  
・お知らせデータの新規作成  
・お知らせデータの編集  
・お知らせデータの削除  

![利用者向けサイト構築画面](img/public_site/public_site1.png)

## アクセス確認
利用者向けサイトは、Exment構築後であってもアクセス出来ます。  
URL末尾に「/admin」を付与することで管理者サイト(Exment)に、「/」で利用者向けサイトにアクセスします。  

■エンドポイント「/」
![利用者向けサイト構築画面](img/public_site/public_site2.png)

■エンドポイント「/admin」
![利用者向けサイト構築画面](img/public_site/public_site3.png)

## ページ作成
利用者向けサイトは、基本的に一般的なLaravelによるシステム開発と同じ構成・手順で開発していきます。  
Laravelのルートフォルダ構成です。この内、主に以下のフォルダに対し、phpファイルを作成していきます。  
・app/Http/Controllers：コントローラー  
・routes：エンドポイント情報  
・resources/views：ビューを作成。blade記法に倣って作成する  
・public：css、js、画像など

![利用者向けサイト構築画面](img/public_site/public_site4.png)

#### routes：ルーティング
routes/web.phpにて、以下のように今回作成する一覧ページのルーティングを記載します。  
※その他のルーティング記法は[こちら](https://readouble.com/laravel/8.x/ja/routing.html)

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

///// 一覧ページ
Route::get('/', [\App\Http\Controllers\IndexController::class, 'index']);
~~~

#### Controller：コントローラー
app/Http/Controllersフォルダに、IndexController.phpを作成します。  
IndexController.phpにて、以下のように記載します。  
・CustomTable：Exmentの「カスタムテーブル」に該当するModel  
・CustomTable::getEloquent('information')->getValueModel()：Exmentのテーブルのデータ用Model。ユーザーが記入した各データ。  
※その他のコントローラーの記法は[こちら](https://readouble.com/laravel/8.x/ja/controllers.html)

~~~
<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Exceedone\Exment\Model\CustomTable;

class IndexController extends BaseController
{
    //一覧画面
    public function index(Request $request){
        $items = CustomTable::getEloquent('information')->getValueModel()->get();
        return view('index', [
            'items' => $items,
        ]);
    }
}
~~~

#### view：ビュー
resources/viewに、_layout.blade.phpを作成し、以下のように記載します。  
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

resources/viewに、index.blade.phpを作成し、以下のように記載します。  
※その他のBladeの記法は[こちら](https://readouble.com/laravel/8.x/ja/blade.html)

~~~
@extends('_layout')

@section('content')
    <h1>お知らせ一覧</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>タイトル</th>
                <th>作成日時</th>
                <th>更新日時</th>
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
                <td><a href="{{asset($item->id)}}">詳細</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div>
        <a href="{{asset('/create')}}">新規作成する</a>
    </div>
@endsection
~~~

#### 結果表示
ここまでの開発が正常に完了していれば、以下のようにExmentの「お知らせ」テーブルのデータ一覧が表示されます。  
※「新規作成する」「詳細」のリンクは現時点ではまだリンク切れとなります。

![利用者向けサイト構築画面](img/public_site/public_site5.png)

#### データ詳細画面作成
データ詳細画面を作成していきます。以下のような追記をしていきます。

routes/web.php
~~~
///// 詳細ページ
Route::get('/{id}', [\App\Http\Controllers\IndexController::class, 'show']);
~~~


app/Http/Controllers/IndexController.php（index関数の下に追記）
~~~
  //詳細画面
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


resources/views/show.blade.php（新規作成）
~~~
@extends('_layout')

@section('content')
    <h1>データ詳細</h1>
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>タイトル</tr>
                <td>{{$item->getValue('title', 'html')}}</td>
            </tr>
            <tr>
                <th>本文</th>
                <td>{!! $item->getValue('body', 'html') !!}</td>
            </tr>
            <tr>
                <th>表示フラグ</th>
                <td>{!! $item->getValue('view_flg', 'html') !!}</td>
            </tr>
            <tr>
                <th>表示順</th>
                <td>{!! $item->getValue('order', 'html') !!}</td>
            </tr>
            <tr>
                <th>重要度</th>
                <td>{!! $item->getValue('priority', 'html') !!}</td>
            </tr>
            <tr>
                <th>作成日時</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>更新日時</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

    <div>
        <a href="{{asset('/')}}">一覧に戻る</a>
    </div>
@endsection
~~~

#### 結果表示
開発が正常に完了していれば、以下のようにExmentの「お知らせ」テーブルの、指定のIDのデータ詳細が表示されます。

![利用者向けサイト構築画面](img/public_site/public_site6.png)

#### データ新規作成画面
データ新規作成画面を作成していきます。以下のような追記をしていきます。

routes/web.php（詳細ページより上に記載する）
~~~
///// 新規作成ページ
Route::get('/create', [\App\Http\Controllers\IndexController::class, 'create']);
Route::post('/', [\App\Http\Controllers\IndexController::class, 'store']);
~~~

app/Http/Controllers/IndexController.php（show関数の下に追記）
~~~
    //新規画面
    public function create(Request $request){
        return view('create');
    }

    //新規登録実施
    public function store(Request $request){
        //データ保存のModel作成
        $custom_value = CustomTable::getEloquent('information')->getValueModel();

        //値のセット
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'view_flg' => $request->get('view_flg'),
            'order' => $request->get('order'),
            'priority' => $request->get('priority'),
        ]);

        //データ保存
        $custom_value->save();

        //該当のデータへリダイレクト
        return redirect($custom_value->id);
    }
~~~


resources/views/create.blade.php（新規作成）
~~~
@extends('_layout')

@section('content')
    <h1>データ新規作成</h1>

    <form method="post" action="{{asset('/')}}">
        @csrf
        <table>
            <tbody>
                <tr>
                    <th>タイトル</th>
                    <td><input type="text" name="title" value="{{old('title')}}" /></td>
                </tr>
                <tr>
                    <th>詳細</th>
                    <td><textarea name="body" value="{{old('body')}}"></textarea></td>
                </tr>
                <tr>
                    <th>表示フラグ</th>
                    <td>
                        <select name="view_flg">
                            <option value="0" selected>NO</option>
                            <option value="1">YES</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>表示順</th>
                    <td><input type="number" name="order" value="{{old('order')}}"></input></td>
                </tr>
                <tr>
                    <th>重要度</th>
                    <td>
                        <select name="priority">
                            <option value="{{old('priority')}}" selected></option>
                            <option value="1">非常に低い</option>
                            <option value="2">低い</option>
                            <option value="3">通常</option>
                            <option value="4">高い</option>
                            <option value="5">非常に高い</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <button type="submit">送信</button>
        <br/><br/>
        
        <div>
            <a href="{{asset('/')}}">一覧に戻る</a>
        </div>
    </form>
@endsection
~~~


#### 結果表示
開発が正常に完了していれば、以下のようにExmentの「お知らせ」テーブルにデータを追加するページが表示されます。

![利用者向けサイト構築画面](img/public_site/public_site7.png)

#### データ編集画面
データ編集画面を作成していきます。以下のような追記をしていきます。

routes/web.php（詳細ページより上に記載する）
~~~
///// 編集ページ
Route::get('/edit/{id}', [\App\Http\Controllers\IndexController::class, 'edit']);
Route::put('/{id}', [\App\Http\Controllers\IndexController::class, 'update']);
~~~


app/Http/Controllers/IndexController.php（store関数の下に追記）
~~~
 // 編集画面
    public function edit(Request $request, $id){
        $item = CustomTable::getEloquent('information')->getValueModel()->find($id);
        if(!$item){
            return redirect('');
        }
        return view('edit', [
            'item' => $item,
        ]);
    }

    // 編集実施
    public function update(Request $request, $id){
        // データ保存のModel作成
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // 値のセット
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'order' => $request->get('order'),
            'view_flg' => $request->get('view_flg'),
            'priority' => $request->get('priority'),
        ]);

        // データ保存
        $custom_value->save();

        // 該当のデータへリダイレクト
        return redirect($custom_value->id);
    }
~~~

resources/views/edit.blade.php（新規作成）
~~~
@extends('_layout')

@section('content')
    <h1>データ編集</h1>

    <form method="post" action="{{asset('/' . $item->id)}}">
        @csrf
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>タイトル</th>
                <td><input type="text" name="title" value="{{old('title', $item->getValue('title', 'html'))}}" /></td>
            </tr>
            <tr>
                <th>本文</th>
                <td>
                    <textarea name="body">{{old('body', $item->getValue('body', 'html'))}}</textarea>
                </td>
            </tr>
            <tr>
                <th>表示フラグ</th>
                <td>
                    <select name="view_flg">
                    <option value="{{old('view_flg', $item->getValue('view_flg', 'html'))}}" selected>{{old('view_flg', $item->getValue('view_flg', 'html'))}}</option>
                            <option value="0">NO</option>
                            <option value="1">YES</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>表示順</th>
                <td>
                    <input type="number" name="order" value="{{old('order', $item->getValue('order', 'html'))}}"></input>
                </td>
            </tr>
            <tr>
                <th>重要度</th>
                <td>
                    <select name="priority">
                            <option value="{{old('priority', $item->getValue('priority', 'html'))}}" selected>{{old('priority', $item->getValue('priority', 'html'))}}</option>
                            <option value="1">非常に低い</option>
                            <option value="2">低い</option>
                            <option value="3">通常</option>
                            <option value="4">高い</option>
                            <option value="5">非常に高い</option>
                        </select>
                </select>
                </td>
            </tr>
            <tr>
                <th>作成日時</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>更新日時</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

        <button type="submit">送信</button>
        <br/><br/>
        @method('PUT')
    </form>

    
    <div>
        <a href="{{asset('/')}}">一覧に戻る</a>
    </div>
@endsection
~~~

resources/views/show.blade.php（一覧に戻る のdivタグの上に追加）
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">編集</a>  
    </div>
~~~

resources/view/index.blade.php（td タグの中身を書き換え）
~~~
<td><a href="{{asset($item->id)}}">詳細</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">編集</a></td>
~~~

#### 結果表示

![利用者向けサイト構築画面](img/public_site/public_site8.png)

#### データ削除画面
データ削除画面を作成していきます。以下のような追記をしていきます。

routes/web.php
~~~
///// 削除
Route::get('/delete/{id}', [\App\Http\Controllers\IndexController::class, 'delete']);
~~~

app/Http/Controllers/IndexController.php（update関数の下に追記）
~~~
// 削除実施
    public function delete(Request $request, $id){
        // データ保存のModel作成
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // データ削除
        $custom_value->delete();

        // 該当のデータへリダイレクト
        return redirect('/');
    }
~~~

resources/views/show.blade.php（１つ目の div タグの中身を書き換え）
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">編集</a>
        &nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">削除</a>
    </div>
~~~

resources/view/index.blade.php（td タグの中身を書き換え）
~~~
<td><a href="{{asset($item->id)}}">詳細</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">編集</a>&nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">削除</a></td>
~~~

#### 結果表示
![利用者向けサイト構築画面](img/public_site/public_site9.png)