# Xây dựng site cho người dùng

Trang này dành cho người phát triển.  
Trong Exment, bằng cách đổi endpoint (lối vào của URL), ngoài site của Exment, bạn có thể tạo site dành cho người dùng thông thường do người phát triển tự làm (site cho người dùng).

Trang này lấy ví dụ tạo các trang sau, làm việc với dữ liệu của bảng "Tin tức" của Exment.

- Danh sách dữ liệu tin tức
- Hiển thị chi tiết dữ liệu tin tức
- Tạo mới dữ liệu tin tức
- Chỉnh sửa dữ liệu tin tức
- Xóa dữ liệu tin tức

Thứ tự làm như sau.

1. Kiểm tra xem có truy cập được không
2. Tạo trang danh sách (routing → controller → view)
3. Lần lượt thêm các trang chi tiết, tạo mới, chỉnh sửa, xóa

![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site1.png)

## Kiểm tra truy cập
Site cho người dùng vẫn truy cập được sau khi đã cài đặt Exment.

| Cuối URL | Site được mở |
|---|---|
| "/admin" | Site quản trị (Exment) |
| "/" | Site cho người dùng |

- Để đặt site cho người dùng ở "/", hãy đặt `ADMIN_ROUTE_PREFIX` trong `.env` thành "admin". Lý do: với bản cài đặt mới từ v7.2.1 trở lên, mặc định Exment nằm ở "/". Chi tiết vui lòng xem [Thay đổi hoặc xóa "admin" trong URL](/vi/additional_prefix).

■ Endpoint "/"
![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site2.png)

■ Endpoint "/admin"
![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site3.png)

## Tạo trang
Về cơ bản, site cho người dùng được tạo với cấu trúc và các bước giống như phát triển hệ thống Laravel thông thường.  
Hình dưới là cấu trúc thư mục gốc của Laravel. Trong đó, chủ yếu ta sẽ tạo các tệp php ở những thư mục sau.

| Thư mục | Nội dung đặt vào |
|---|---|
| app/Http/Controllers | Controller |
| routes | Thông tin endpoint |
| resources/views | View. Viết theo cú pháp blade |
| public | css, js, hình ảnh, v.v. |

![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site4.png)

#### routes: Routing
Viết routing của trang danh sách vào routes/web.php như sau.  
※ Về các cách viết routing khác, vui lòng xem [giải thích về routing của Laravel](https://readouble.com/laravel/8.x/ja/routing.html).

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

///// Trang danh sách
Route::get('/', [\App\Http\Controllers\IndexController::class, 'index']);
~~~

#### Controller: Controller
Tạo IndexController.php trong thư mục app/Http/Controllers và viết như sau.

- CustomTable: Model tương ứng với "bảng tùy chỉnh" của Exment.
- CustomTable::getEloquent('information')->getValueModel(): Model dùng cho dữ liệu của bảng trong Exment. Nó biểu thị từng dữ liệu người dùng đã nhập.

※ Về các cách viết controller khác, vui lòng xem [giải thích về controller của Laravel](https://readouble.com/laravel/8.x/ja/controllers.html).

~~~
<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Exceedone\Exment\Model\CustomTable;

class IndexController extends BaseController
{
    //Màn hình danh sách
    public function index(Request $request){
        $items = CustomTable::getEloquent('information')->getValueModel()->get();
        return view('index', [
            'items' => $items,
        ]);
    }
}
~~~

#### view: View
Với view, ta tạo 2 tệp: khung dùng chung (_layout.blade.php) và nội dung của danh sách (index.blade.php).

Tạo _layout.blade.php trong resources/views và viết như sau.  
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

Tạo index.blade.php trong resources/views và viết như sau.  
※ Về các cách viết Blade khác, vui lòng xem [giải thích về Blade của Laravel](https://readouble.com/laravel/8.x/ja/blade.html).

~~~
@extends('_layout')

@section('content')
    <h1>Danh sách tin tức</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Ngày giờ tạo</th>
                <th>Ngày giờ cập nhật</th>
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
                <td><a href="{{asset($item->id)}}">Chi tiết</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div>
        <a href="{{asset('/create')}}">Tạo mới</a>
    </div>
@endsection
~~~

#### Kết quả hiển thị
Nếu đã làm đúng đến đây, danh sách dữ liệu của bảng "Tin tức" của Exment sẽ được hiển thị như sau.  
※ Các liên kết "Tạo mới" và "Chi tiết" lúc này chưa mở được. Ta sẽ tạo ở các bước sau.

![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site5.png)

#### Tạo màn hình chi tiết dữ liệu
Tạo màn hình chi tiết dữ liệu. Viết thêm vào 3 tệp sau.

routes/web.php
~~~
///// Trang chi tiết
Route::get('/{id}', [\App\Http\Controllers\IndexController::class, 'show']);
~~~


app/Http/Controllers/IndexController.php (viết thêm bên dưới hàm index)
~~~
  //Màn hình chi tiết
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


resources/views/show.blade.php (tạo mới)
~~~
@extends('_layout')

@section('content')
    <h1>Chi tiết dữ liệu</h1>
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>Tiêu đề</th>
                <td>{{$item->getValue('title', 'html')}}</td>
            </tr>
            <tr>
                <th>Nội dung</th>
                <td>{!! $item->getValue('body', 'html') !!}</td>
            </tr>
            <tr>
                <th>Cờ hiển thị</th>
                <td>{!! $item->getValue('view_flg', 'html') !!}</td>
            </tr>
            <tr>
                <th>Thứ tự hiển thị</th>
                <td>{!! $item->getValue('order', 'html') !!}</td>
            </tr>
            <tr>
                <th>Mức độ quan trọng</th>
                <td>{!! $item->getValue('priority', 'html') !!}</td>
            </tr>
            <tr>
                <th>Ngày giờ tạo</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>Ngày giờ cập nhật</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

    <div>
        <a href="{{asset('/')}}">Quay lại danh sách</a>
    </div>
@endsection
~~~

#### Kết quả hiển thị
Nếu đã làm đúng, chi tiết của dữ liệu có ID đã chỉ định trong bảng "Tin tức" của Exment sẽ được hiển thị như sau.

![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site6.png)

#### Màn hình tạo mới dữ liệu
Tạo màn hình tạo mới dữ liệu. Viết thêm vào 3 tệp sau.

routes/web.php (viết phía trên trang chi tiết)
~~~
///// Trang tạo mới
Route::get('/create', [\App\Http\Controllers\IndexController::class, 'create']);
Route::post('/', [\App\Http\Controllers\IndexController::class, 'store']);
~~~

app/Http/Controllers/IndexController.php (viết thêm bên dưới hàm show)
~~~
    //Màn hình tạo mới
    public function create(Request $request){
        return view('create');
    }

    //Thực hiện đăng ký mới
    public function store(Request $request){
        //Tạo Model để lưu dữ liệu
        $custom_value = CustomTable::getEloquent('information')->getValueModel();

        //Đặt giá trị
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'view_flg' => $request->get('view_flg'),
            'order' => $request->get('order'),
            'priority' => $request->get('priority'),
        ]);

        //Lưu dữ liệu
        $custom_value->save();

        //Chuyển hướng tới dữ liệu đó
        return redirect($custom_value->id);
    }
~~~


resources/views/create.blade.php (tạo mới)
~~~
@extends('_layout')

@section('content')
    <h1>Tạo mới dữ liệu</h1>

    <form method="post" action="{{asset('/')}}">
        @csrf
        <table>
            <tbody>
                <tr>
                    <th>Tiêu đề</th>
                    <td><input type="text" name="title" value="{{old('title')}}" /></td>
                </tr>
                <tr>
                    <th>Nội dung</th>
                    <td><textarea name="body">{{old('body')}}</textarea></td>
                </tr>
                <tr>
                    <th>Cờ hiển thị</th>
                    <td>
                        <select name="view_flg">
                            <option value="0" selected>NO</option>
                            <option value="1">YES</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Thứ tự hiển thị</th>
                    <td><input type="number" name="order" value="{{old('order')}}"></input></td>
                </tr>
                <tr>
                    <th>Mức độ quan trọng</th>
                    <td>
                        <select name="priority">
                            <option value="{{old('priority')}}" selected></option>
                            <option value="1">Rất thấp</option>
                            <option value="2">Thấp</option>
                            <option value="3">Bình thường</option>
                            <option value="4">Cao</option>
                            <option value="5">Rất cao</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <button type="submit">Gửi</button>
        <br/><br/>
        
        <div>
            <a href="{{asset('/')}}">Quay lại danh sách</a>
        </div>
    </form>
@endsection
~~~


#### Kết quả hiển thị
Nếu đã làm đúng, trang thêm dữ liệu vào bảng "Tin tức" của Exment sẽ được hiển thị như sau.

![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site7.png)

#### Màn hình chỉnh sửa dữ liệu
Tạo màn hình chỉnh sửa dữ liệu. Viết thêm vào (hoặc sửa lại) 5 tệp sau.

routes/web.php (viết phía trên trang chi tiết)
~~~
///// Trang chỉnh sửa
Route::get('/edit/{id}', [\App\Http\Controllers\IndexController::class, 'edit']);
Route::put('/{id}', [\App\Http\Controllers\IndexController::class, 'update']);
~~~


app/Http/Controllers/IndexController.php (viết thêm bên dưới hàm store)
~~~
 // Màn hình chỉnh sửa
    public function edit(Request $request, $id){
        $item = CustomTable::getEloquent('information')->getValueModel()->find($id);
        if(!$item){
            return redirect('');
        }
        return view('edit', [
            'item' => $item,
        ]);
    }

    // Thực hiện chỉnh sửa
    public function update(Request $request, $id){
        // Tạo Model để lưu dữ liệu
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // Đặt giá trị
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'order' => $request->get('order'),
            'view_flg' => $request->get('view_flg'),
            'priority' => $request->get('priority'),
        ]);

        // Lưu dữ liệu
        $custom_value->save();

        // Chuyển hướng tới dữ liệu đó
        return redirect($custom_value->id);
    }
~~~

resources/views/edit.blade.php (tạo mới)
~~~
@extends('_layout')

@section('content')
    <h1>Chỉnh sửa dữ liệu</h1>

    <form method="post" action="{{asset('/' . $item->id)}}">
        @csrf
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>Tiêu đề</th>
                <td><input type="text" name="title" value="{{old('title', $item->getValue('title', 'html'))}}" /></td>
            </tr>
            <tr>
                <th>Nội dung</th>
                <td>
                    <textarea name="body">{{old('body', $item->getValue('body', 'html'))}}</textarea>
                </td>
            </tr>
            <tr>
                <th>Cờ hiển thị</th>
                <td>
                    <select name="view_flg">
                    <option value="{{old('view_flg', $item->getValue('view_flg', 'html'))}}" selected>{{old('view_flg', $item->getValue('view_flg', 'html'))}}</option>
                            <option value="0">NO</option>
                            <option value="1">YES</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Thứ tự hiển thị</th>
                <td>
                    <input type="number" name="order" value="{{old('order', $item->getValue('order', 'html'))}}"></input>
                </td>
            </tr>
            <tr>
                <th>Mức độ quan trọng</th>
                <td>
                    <select name="priority">
                            <option value="{{old('priority', $item->getValue('priority', 'html'))}}" selected>{{old('priority', $item->getValue('priority', 'html'))}}</option>
                            <option value="1">Rất thấp</option>
                            <option value="2">Thấp</option>
                            <option value="3">Bình thường</option>
                            <option value="4">Cao</option>
                            <option value="5">Rất cao</option>
                        </select>
                </td>
            </tr>
            <tr>
                <th>Ngày giờ tạo</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>Ngày giờ cập nhật</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

        <button type="submit">Gửi</button>
        <br/><br/>
        @method('PUT')
    </form>

    
    <div>
        <a href="{{asset('/')}}">Quay lại danh sách</a>
    </div>
@endsection
~~~

resources/views/show.blade.php (thêm phía trên thẻ div của "Quay lại danh sách")
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">Chỉnh sửa</a>  
    </div>
~~~

resources/views/index.blade.php (sửa lại nội dung trong thẻ td)
~~~
<td><a href="{{asset($item->id)}}">Chi tiết</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">Chỉnh sửa</a></td>
~~~

#### Kết quả hiển thị

![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site8.png)

#### Màn hình xóa dữ liệu
Làm cho dữ liệu có thể xóa được. Viết thêm vào (hoặc sửa lại) 4 tệp sau.

routes/web.php
~~~
///// Xóa
Route::get('/delete/{id}', [\App\Http\Controllers\IndexController::class, 'delete']);
~~~

app/Http/Controllers/IndexController.php (viết thêm bên dưới hàm update)
~~~
// Thực hiện xóa
    public function delete(Request $request, $id){
        // Lấy dữ liệu cần xóa
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // Xóa dữ liệu
        $custom_value->delete();

        // Chuyển hướng tới danh sách
        return redirect('/');
    }
~~~

resources/views/show.blade.php (sửa lại nội dung trong thẻ div thứ nhất)
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">Chỉnh sửa</a>
        &nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">Xóa</a>
    </div>
~~~

resources/views/index.blade.php (sửa lại nội dung trong thẻ td)
~~~
<td><a href="{{asset($item->id)}}">Chi tiết</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">Chỉnh sửa</a>&nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">Xóa</a></td>
~~~

#### Kết quả hiển thị
![Màn hình xây dựng site cho người dùng](../ja/img/public_site/public_site9.png)