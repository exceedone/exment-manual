# 插件参考
本页面面向开发插件的人员。  
这里按插件的类型，列出要继承的类，以及在该类中可以使用的函数和属性。

- 自定义表、自定义列、自定义数据的函数，请参阅[函数参考](/zh/func_reference)。
- 插件(CRUD页面)的详细说明，请参阅[插件参考(CRUD页面)](/zh/plugin_reference_crud)。
- 管理页面库的类，按 Exment v7.0.0 及以后的命名空间(“ExmentAdminCore\Admin”)书写。使用 v6.x 及以前版本时，请替换为“Encore\Admin”。详情请参阅[更新步骤 v7.0.0](/update/v7_0_0)（英语）。



## PluginBase / 插件通用类

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| plugin | Plugin | 插件的 Eloquent 实例 |
| pluginOptions | PluginOptionBase | 保存插件各种属性的类实例（继承 PluginOptionBase） |
| useCustomOption | bool | 是否使用插件自己的设置。初始值为 false |

※ 以前是按插件的类型，在抽象类中直接定义属性。但这种方式可能与用户自己定义的属性发生名称冲突。  
因此，v4.2.2 及以后新增的属性，都定义在 pluginOptions 中。  可以用“$this->pluginOptions->属性名”访问。另外，为了保持兼容，已有的属性仍可像以前一样使用。

### 函数列表

#### setCustomOptionForm
定义插件自己的设置。详情请参阅[这里](/zh/plugin_quickstart)。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | 管理页面库(exment-admin-core，v6.x 及以前为 laravel-admin)的表单实例 |

##### 返回值
无

##### 使用示例
请参阅[这里](/zh/plugin_quickstart)。

---



## PluginApiBase
插件(API)的抽象类。开发 API 插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_api)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Controllers\ApiTrait

##### 属性
无

### 函数列表

#### getRouteUri
获取自定义 API 的端点。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $endpoint | string | 要追加的端点 URL。初始值为 null |


##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 自定义 API 的端点 |


---




## PluginBatchBase
插件(批处理)的抽象类。开发批处理插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_batch)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 属性

##### PluginOptionBatch（继承 PluginOptionBase）
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| command_options | array | 传给批处理的命令行参数 |

### 函数列表

#### execute
执行批处理。请把要执行的处理写在此函数中。

##### 参数
无

##### 返回值
无

---




## PluginButtonBase
插件(按钮)的抽象类。开发按钮插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_button)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginButtonTrait
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |
| custom_value | CustomValue | 在详情页面按下按钮时，该页面的自定义数据的 Eloquent 实例 |
| selected_custom_values | array | 在列表页面按下按钮时，所选自定义数据的 Eloquent 实例的数组 |


### 函数列表

#### execute
执行按下按钮时的处理。请把要执行的处理写在此函数中。

##### 参数
无

##### 返回值
无

---

#### render
自行绘制按钮。  
需要特殊的外观或要嵌入专用脚本时，请写在此函数中。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string,Renderable | 自行绘制的按钮 |


---



## PluginDashboardBase
插件(仪表板)的抽象类。开发仪表板插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_dashboard)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| dashboard_box | DashboardBox | 所放置的仪表板 Box 的实例 |


### 函数列表

#### header
返回仪表板 BOX 页眉部分的 HTML。  
要在页眉部分输出 HTML 时，请在继承的插件文件中，在此函数里添加返回 HTML 的处理。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 页眉部分的 HTML |

---


#### body
返回仪表板 BOX 主体部分的 HTML。  
要在主体部分输出 HTML 时，请在继承的插件文件中，在此函数里添加返回 HTML 的处理。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 主体部分的 HTML |

---


#### footer
返回仪表板 BOX 页脚部分的 HTML。  
要在页脚部分输出 HTML 时，请在继承的插件文件中，在此函数里添加返回 HTML 的处理。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 页脚部分的 HTML |

---

#### getDashboardUri
获取各个仪表板 BOX 的端点。  
在仪表板 BOX 内对值进行 GET、POST、PUT 等操作时，请使用此函数获取 URI 部分。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $endpoint | string | 要追加的端点 URL。初始值为 null |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 到仪表板 BOX 为止的端点 |


---



## PluginDocumentBase
插件(文档)的抽象类。开发文档插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_document)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |
| custom_value | CustomValue | 自定义数据的实例 |
| document_value | CustomValue | 已输出的文档数据的实例（只能在 executed 函数内引用） |


### 函数列表

#### (protected)executing
在输出文档之前调用的函数。  
需要单独处理时（例如想在执行前把值保存到自定义数据），请使用此函数。

##### 参数
无

##### 返回值
无

---

#### (protected)executed
在输出文档之后调用的函数。  
需要单独处理时，请使用此函数。

##### 参数
无

##### 返回值
无

---




## PluginEventBase
插件(事件)的抽象类。开发事件插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_event)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginEventTrait

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |
| custom_value | CustomValue | 自定义数据的 Eloquent 实例（与自定义数据无关的事件时为 null） |
| isCreate | bool | 是否为新建的数据 |
| isDelete | bool | 是否为已删除的数据 |

##### PluginOptionEvent（继承 PluginOptionBase）
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| is_modal | bool | 发生事件的页面是否为模态表单 |
| event_type | PluginEventType | 事件的类型<br>（loading：加载时、saving：保存前、saved：保存后、workflow_action_executing：工作流即将执行时、workflow_action_executed：工作流刚执行后、notify_executing：通知即将执行时、notify_executed：通知执行后） |
| page_type | PluginPageType | 发生事件的页面的类型<br>（list：列表页面、create：新建页面、edit：编辑页面、show：详情页面） |


### 函数列表

#### execute
请把事件发生时要执行的处理写在此函数中。

##### 参数
无

##### 返回值
无

---



## PluginExportBase
插件(导出)的抽象类。开发导出插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_export)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |


### 函数列表

#### defaultProvider
设置默认导出提供程序的函数。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| default_provider | ProviderBase | 导出提供程序的实例 |


##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| PluginExportBase | 本类的实例 |

---

#### viewProvider
设置视图提供程序的函数。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| view_provider | ProviderBase | 导出用的视图提供程序的实例 |


##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| PluginExportBase | 本类的实例 |

---


#### execute
作为导出处理被调用的函数。  
请在此函数中实现导出处理。

##### 参数
无

##### 返回值
无

---


#### getFileName
设置导出处理的结果所下载的文件名称的函数。  

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 导出结果的下载文件名 |


---






## PluginImportBase
插件(导入)的抽象类。开发导入插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_import)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |
| file | File | 从页面导入的文件 |


### 函数列表

#### execute
作为导入处理被调用的函数。  
请在此函数中添加导入处理。

##### 参数
无

##### 返回值
无

---




## PluginPageBase
插件(页面)的抽象类。开发页面插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_page)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| showHeader | bool | 是否在页面上部的页眉部分显示图标和标题。true:显示 / false:不显示。初始值为 true |

### 函数列表

#### getRouteUri
获取自定义页面的端点。  
在自定义页面中进行 GET、POST、PUT 等操作时，请使用此函数获取 URI 部分。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $endpoint | string | 要追加的端点 URL。初始值为 null |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string | 自定义页面的端点 |

---



## PluginPublicBase
插件(脚本、样式)的抽象类。开发脚本插件或样式插件时，请继承此类。  
详情请参阅[插件(脚本)](/zh/plugin_quickstart_script)或[插件(样式)](/zh/plugin_quickstart_style)。

- namespace Exceedone\Exment\Services\Plugin

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| plugin | Plugin | 插件的 Eloquent 实例 |

### 函数列表

#### css
获取 CSS 文件路径的函数。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| skipPath | bool | css 文件直接放在 public 文件夹下时设为 true。（初始值为 false） |


##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| array | CSS 文件路径的数组 |

---

#### js
获取 js 文件路径的函数。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| skipPath | bool | js 文件直接放在 public 文件夹下时设为 true。（初始值为 false） |


##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| array | js 文件路径的数组 |


---



## PluginValidatorBase
插件(验证)的抽象类。开发验证插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_validate)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |
| original_value | CustomValue | 自定义数据变更前的实例 |
| input_value | array | 保存页面输入值的关联数组（键：列名、值：输入值） |
| called_type | ValidateCalledType | 调用方的类型<br>（form：表单、import：导入、api：API） |
| messages | array | 保存错误消息<br>（键：列名、值：错误消息※有多个时为数组） |


### 函数列表

#### validate
执行验证。请把要执行的处理写在此函数中。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| boolean | 验证的结果（true：正常、false：有错误） |

#### validateDestroy
在删除自定义数据之前执行验证。请把要执行的处理写在此函数中。

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $custom_value | CustomValue | 自定义数据的实例  |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| array | 验证的结果和消息（true：正常、false：有错误） |

~~~ php
        [
            'status'  => false,
            'message' =>  '重要度高的数据不能删除。',
        ]
~~~


---





## PluginViewBase
插件(视图)的抽象类。开发视图插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_view)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| custom_table | CustomTable | 自定义表的实例 |
| custom_view | CustomView | 自定义视图的实例 |
| useBox | bool | 是否在列表中显示按钮 |
| useBoxButtons | array | 显示哪些按钮<br>（newButton：新建、menuButton：菜单、viewButton：视图） |


### 函数列表

#### grid
作为列表显示处理被调用的函数。  

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| string,Renderable | 显示在网格中的内容 |

---

#### setViewOptionForm
定义视图自己的设置。详情请参阅[这里](/zh/plugin_quickstart)。  

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| &$form | \ExmentAdminCore\Admin\Form | 管理页面库(exment-admin-core，v6.x 及以前为 laravel-admin)的表单实例 |

##### 返回值
无

---






## PluginCrudBase
插件(CRUD页面)的抽象类。开发 CRUD 页面插件时，请继承此类。  
详情请参阅[这里](/zh/plugin_quickstart_crud)。

- namespace Exceedone\Exment\Services\Plugin
- trait Exceedone\Exment\Services\Plugin\PluginBase
- trait Exceedone\Exment\Services\Plugin\PluginPageTrait

##### 属性
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| title | string | 显示在插件各页面上的标题 |
| description  | string | 显示在插件各页面上的说明文字 |
| icon | string | 显示在插件各页面上的图标 |


### 函数列表(需要开发人员实现)

#### getFieldDefinitions
以关联数组返回列定义的函数。请写出各页面中要显示的项目的定义。

##### 参数
无

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| array | 以关联数组返回各页面的项目的定义 |

##### 返回值-关联数组的定义
| 类型 | 说明 |
| ---- | ---- |
| key | 用于获取数据、设置 HTML 各元素的 name 等的项目名。请用英文和数字输入 |
| label | 用作列表页面等的项目名的文字 |
| grid | 为列表页面中要显示的项目设置。请按显示顺序填写整数 |
| show | 为详情页面中要显示的项目设置。请按显示顺序填写整数 |
| create | 为新建页面中要显示的项目设置。请按显示顺序填写整数 |
| edit | 为编辑页面中要显示的项目设置。请按显示顺序填写整数 |


##### 实现示例

``` php
/**
     * Get fields definitions
     *
     * @return array|Collection
     */
    public function getFieldDefinitions()
    {
        return [
            ['key' => 'ID', 'label' => 'ID', 'primary' => true, 'grid' => 1, 'show' => 1, 'edit' => 1],
            ['key' => 'Name', 'label' => '城市名', 'grid' => 2,'show' => 2, 'create' => 1, 'edit' => 2],
            ['key' => 'CountryCode', 'label' => '国家代码', 'grid' => 3, 'show' => 3, 'create' => 2,'edit' => 3],
            ['key' => 'Population', 'label' => '人口', 'show' => 5, 'create' => 4,'edit' => 5],
        ];
    }
```

#### getPaginate
以分页形式获取数据列表的函数。  
请以 LengthAwarePaginator 形式返回获取的数据。  
另外，列表的各元素应为关联数组，该关联数组的键值应与 getFieldDefinitions 中设置的键值相同。  
※在页面上进行搜索时，参数 $options 中会设置值

##### 参数
| 名称 | 类型 | 说明 |
| ---- | ---- | ---- |
| $options | array | 设置在列表页面调用时的选项值 |

##### 返回值
| 类型 | 说明 |
| ---- | ---- |
| LengthAwarePaginator | 获取的数据的列表 |

##### 实现示例
请参阅[插件参考(CRUD页面)](/zh/plugin_reference_crud)。






