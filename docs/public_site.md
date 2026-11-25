# Building a site for end users

This page is for developers.  
In Exment, by changing the endpoint (the entrance of the URL), you can build, besides the Exment site, a site for general users that the developer makes (a site for end users).

As an example, this page makes the following pages, which handle the data of the "Information" table of Exment.

- A list of the Information data
- The details of one piece of Information data
- Creating new Information data
- Editing Information data
- Deleting Information data

The order of the work is as follows.

1. Check that you can access the site
2. Make the list page (routing → controller → view)
3. Add the details, create, edit and delete pages, one after another

![Screen of a site for end users](ja/img/public_site/public_site1.png)

## Checking the access
You can access the site for end users even after Exment has been set up.

| End of the URL | Site that opens |
|---|---|
| "/admin" | The administrator site (Exment) |
| "/" | The site for end users |

- To put the site for end users at "/", set `ADMIN_ROUTE_PREFIX` in `.env` to "admin". This is because, in a new installation of v7.2.1 or later, Exment is at "/" by default. See [Change / delete "admin" included in URL](/additional_prefix) for details.

■ Endpoint "/"
![Screen of a site for end users](ja/img/public_site/public_site2.png)

■ Endpoint "/admin"
![Screen of a site for end users](ja/img/public_site/public_site3.png)

## Making the pages
A site for end users is basically made with the same structure and steps as usual system development with Laravel.  
The image below shows the structure of the root folder of Laravel. You will make php files mainly in the following folders.

| Folder | What to put there |
|---|---|
| app/Http/Controllers | Controllers |
| routes | Endpoint information |
| resources/views | Views. Written in the blade syntax |
| public | css, js, images and so on |

![Screen of a site for end users](ja/img/public_site/public_site4.png)

#### routes: routing
Write the routing of the list page in routes/web.php as follows.  
Note: For other ways to write routing, see the [Laravel description of routing](https://readouble.com/laravel/8.x/ja/routing.html) (in Japanese).

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

///// List page
Route::get('/', [\App\Http\Controllers\IndexController::class, 'index']);
~~~

#### Controller
Make IndexController.php in the app/Http/Controllers folder and write it as follows.

- CustomTable: the Model for a "custom table" of Exment.
- CustomTable::getEloquent('information')->getValueModel(): the Model for the data of an Exment table. It stands for each piece of data that users entered.

Note: For other ways to write controllers, see the [Laravel description of controllers](https://readouble.com/laravel/8.x/ja/controllers.html) (in Japanese).

~~~
<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Exceedone\Exment\Model\CustomTable;

class IndexController extends BaseController
{
    //List screen
    public function index(Request $request){
        $items = CustomTable::getEloquent('information')->getValueModel()->get();
        return view('index', [
            'items' => $items,
        ]);
    }
}
~~~

#### view
Make two files for the view: the common frame (_layout.blade.php) and the content of the list (index.blade.php).

Make _layout.blade.php in resources/views and write it as follows.  
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

Make index.blade.php in resources/views and write it as follows.  
Note: For other ways to write Blade, see the [Laravel description of Blade](https://readouble.com/laravel/8.x/ja/blade.html) (in Japanese).

~~~
@extends('_layout')

@section('content')
    <h1>Information list</h1>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Created at</th>
                <th>Updated at</th>
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
                <td><a href="{{asset($item->id)}}">Details</a></td>
            </tr>
        @endforeach
        </tbody>
    </table>

    <div>
        <a href="{{asset('/create')}}">Create new</a>
    </div>
@endsection
~~~

#### Result
If everything so far is correct, a list of the data of the "Information" table of Exment is shown, as below.  
Note: The "Create new" and "Details" links cannot be opened yet at this point. You will make them next.

![Screen of a site for end users](ja/img/public_site/public_site5.png)

#### Making the data details screen
Make the data details screen. Add to the following three files.

routes/web.php
~~~
///// Details page
Route::get('/{id}', [\App\Http\Controllers\IndexController::class, 'show']);
~~~


app/Http/Controllers/IndexController.php (add below the index function)
~~~
  //Details screen
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


resources/views/show.blade.php (new file)
~~~
@extends('_layout')

@section('content')
    <h1>Data details</h1>
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>Title</th>
                <td>{{$item->getValue('title', 'html')}}</td>
            </tr>
            <tr>
                <th>Body</th>
                <td>{!! $item->getValue('body', 'html') !!}</td>
            </tr>
            <tr>
                <th>Display flag</th>
                <td>{!! $item->getValue('view_flg', 'html') !!}</td>
            </tr>
            <tr>
                <th>Display order</th>
                <td>{!! $item->getValue('order', 'html') !!}</td>
            </tr>
            <tr>
                <th>Priority</th>
                <td>{!! $item->getValue('priority', 'html') !!}</td>
            </tr>
            <tr>
                <th>Created at</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>Updated at</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

    <div>
        <a href="{{asset('/')}}">Back to the list</a>
    </div>
@endsection
~~~

#### Result
If it is correct, the details of the data with the given ID in the "Information" table of Exment are shown, as below.

![Screen of a site for end users](ja/img/public_site/public_site6.png)

#### The data create screen
Make the data create screen. Add to the following three files.

routes/web.php (write it above the details page)
~~~
///// Create page
Route::get('/create', [\App\Http\Controllers\IndexController::class, 'create']);
Route::post('/', [\App\Http\Controllers\IndexController::class, 'store']);
~~~

app/Http/Controllers/IndexController.php (add below the show function)
~~~
    //Create screen
    public function create(Request $request){
        return view('create');
    }

    //Save the new data
    public function store(Request $request){
        //Create the Model to save the data
        $custom_value = CustomTable::getEloquent('information')->getValueModel();

        //Set the values
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'view_flg' => $request->get('view_flg'),
            'order' => $request->get('order'),
            'priority' => $request->get('priority'),
        ]);

        //Save the data
        $custom_value->save();

        //Redirect to the data
        return redirect($custom_value->id);
    }
~~~


resources/views/create.blade.php (new file)
~~~
@extends('_layout')

@section('content')
    <h1>Create data</h1>

    <form method="post" action="{{asset('/')}}">
        @csrf
        <table>
            <tbody>
                <tr>
                    <th>Title</th>
                    <td><input type="text" name="title" value="{{old('title')}}" /></td>
                </tr>
                <tr>
                    <th>Body</th>
                    <td><textarea name="body">{{old('body')}}</textarea></td>
                </tr>
                <tr>
                    <th>Display flag</th>
                    <td>
                        <select name="view_flg">
                            <option value="0" selected>NO</option>
                            <option value="1">YES</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>Display order</th>
                    <td><input type="number" name="order" value="{{old('order')}}"></input></td>
                </tr>
                <tr>
                    <th>Priority</th>
                    <td>
                        <select name="priority">
                            <option value="{{old('priority')}}" selected></option>
                            <option value="1">Very low</option>
                            <option value="2">Low</option>
                            <option value="3">Normal</option>
                            <option value="4">High</option>
                            <option value="5">Very high</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <button type="submit">Submit</button>
        <br/><br/>
        
        <div>
            <a href="{{asset('/')}}">Back to the list</a>
        </div>
    </form>
@endsection
~~~


#### Result
If it is correct, a page that adds data to the "Information" table of Exment is shown, as below.

![Screen of a site for end users](ja/img/public_site/public_site7.png)

#### The data edit screen
Make the data edit screen. Add to (or rewrite) the following five files.

routes/web.php (write it above the details page)
~~~
///// Edit page
Route::get('/edit/{id}', [\App\Http\Controllers\IndexController::class, 'edit']);
Route::put('/{id}', [\App\Http\Controllers\IndexController::class, 'update']);
~~~


app/Http/Controllers/IndexController.php (add below the store function)
~~~
 // Edit screen
    public function edit(Request $request, $id){
        $item = CustomTable::getEloquent('information')->getValueModel()->find($id);
        if(!$item){
            return redirect('');
        }
        return view('edit', [
            'item' => $item,
        ]);
    }

    // Save the edit
    public function update(Request $request, $id){
        // Create the Model to save the data
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // Set the values
        $custom_value->setValueStrictly([
            'title' => $request->get('title'),
            'body' => $request->get('body'),
            'order' => $request->get('order'),
            'view_flg' => $request->get('view_flg'),
            'priority' => $request->get('priority'),
        ]);

        // Save the data
        $custom_value->save();

        // Redirect to the data
        return redirect($custom_value->id);
    }
~~~

resources/views/edit.blade.php (new file)
~~~
@extends('_layout')

@section('content')
    <h1>Edit data</h1>

    <form method="post" action="{{asset('/' . $item->id)}}">
        @csrf
    <table>
        <tbody>
            <tr>
                <th>ID</th>
                <td>{{$item->id}}</td>
            </tr>
            <tr>
                <th>Title</th>
                <td><input type="text" name="title" value="{{old('title', $item->getValue('title', 'html'))}}" /></td>
            </tr>
            <tr>
                <th>Body</th>
                <td>
                    <textarea name="body">{{old('body', $item->getValue('body', 'html'))}}</textarea>
                </td>
            </tr>
            <tr>
                <th>Display flag</th>
                <td>
                    <select name="view_flg">
                    <option value="{{old('view_flg', $item->getValue('view_flg', 'html'))}}" selected>{{old('view_flg', $item->getValue('view_flg', 'html'))}}</option>
                            <option value="0">NO</option>
                            <option value="1">YES</option>
                    </select>
                </td>
            </tr>
            <tr>
                <th>Display order</th>
                <td>
                    <input type="number" name="order" value="{{old('order', $item->getValue('order', 'html'))}}"></input>
                </td>
            </tr>
            <tr>
                <th>Priority</th>
                <td>
                    <select name="priority">
                            <option value="{{old('priority', $item->getValue('priority', 'html'))}}" selected>{{old('priority', $item->getValue('priority', 'html'))}}</option>
                            <option value="1">Very low</option>
                            <option value="2">Low</option>
                            <option value="3">Normal</option>
                            <option value="4">High</option>
                            <option value="5">Very high</option>
                        </select>
                </td>
            </tr>
            <tr>
                <th>Created at</th>
                <td>{{$item->created_at}}</td>
            </tr>
            <tr>
                <th>Updated at</th>
                <td>{{$item->updated_at}}</td>
            </tr>
        </tbody>
    </table>

        <button type="submit">Submit</button>
        <br/><br/>
        @method('PUT')
    </form>

    
    <div>
        <a href="{{asset('/')}}">Back to the list</a>
    </div>
@endsection
~~~

resources/views/show.blade.php (add above the div tag of "Back to the list")
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">Edit</a>  
    </div>
~~~

resources/views/index.blade.php (rewrite the content of the td tag)
~~~
<td><a href="{{asset($item->id)}}">Details</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">Edit</a></td>
~~~

#### Result

![Screen of a site for end users](ja/img/public_site/public_site8.png)

#### The data delete screen
Make it possible to delete data. Add to (or rewrite) the following four files.

routes/web.php
~~~
///// Delete
Route::get('/delete/{id}', [\App\Http\Controllers\IndexController::class, 'delete']);
~~~

app/Http/Controllers/IndexController.php (add below the update function)
~~~
// Run the delete
    public function delete(Request $request, $id){
        // Get the data to delete
        $custom_value = CustomTable::getEloquent('information')->getValueModel()->find($id);

        // Delete the data
        $custom_value->delete();

        // Redirect to the list
        return redirect('/');
    }
~~~

resources/views/show.blade.php (rewrite the content of the first div tag)
~~~
    <div>
        <a href="{{asset('/edit/' . $item->id)}}">Edit</a>
        &nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">Delete</a>
    </div>
~~~

resources/views/index.blade.php (rewrite the content of the td tag)
~~~
<td><a href="{{asset($item->id)}}">Details</a>&nbsp;&nbsp;<a href="{{asset('edit/'.$item->id)}}">Edit</a>&nbsp;&nbsp;<a href="{{asset('/delete/' . $item->id)}}">Delete</a></td>
~~~

#### Result
![Screen of a site for end users](ja/img/public_site/public_site9.png)
