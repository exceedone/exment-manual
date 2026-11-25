# 备份/还原（SQL Server）
这是数据库使用 SQL Server 时，手动备份／还原（恢复原状）Exment 数据的步骤。  

## 概要
使用 SQL Server 时，不能从 Exment 的页面进行备份／还原。请手动进行下面 2 项。

| 对象 | 方法 |
| ---- | ---- |
| 数据库 | 用 Microsoft SQL Server Management Studio (SSMS) 进行备份和还原 |
| 文件（下面 4 种） | 用资源管理器等，把整个文件夹保存到别的位置。需要时再放回原处 |

- 插件文件
- 附件
- 日志文件
- 设置文件

## 数据库的备份
这是备份 SQL Server 的步骤。  
请在自己喜欢的时候执行。  

- 启动 Microsoft SQL Server Management Studio (SSMS)。  
**※请务必用拥有 sysadmin 服务器角色、db_owner 数据库角色、db_backupoperator 数据库角色中任意一个的成员登录。**
![备份页面](../img/backup/sqlserver1.png)  

- 右键点击要备份的数据库，选择 任务→备份。  
![备份页面](../img/backup/sqlserver2.png)  

- 在备份数据库页面中选择“备份类型：完整”，点击备份目标的添加。  
![备份页面](../img/backup/sqlserver3.png)  

- 会出现选择备份目标的对话框，请决定自己喜欢的文件夹和文件名，点击“确定”按钮。  
![备份页面](../img/backup/sqlserver4.png)  

- 回到备份数据库页面，点击“确定”按钮。备份开始。结束后会显示消息。   
![备份页面](../img/backup/sqlserver5.png)  

- 请确认在指定的备份目标中已生成备份文件（.bak）。

## 各种文件的备份
下面的文件在服务器的固定文件夹中。请用资源管理器等，把整个文件夹保存到别的文件夹或外部介质中。
  
~~~
插件文件　：(项目的根目录)/storage/app/plugins
附件　　　：(项目的根目录)/storage/app/admin
日志文件　：(项目的根目录)/storage/logs
设置文件　：(项目的根目录)/config
.env文件　：(项目的根目录)/.env
~~~
    
**※.env 文件是保存 Laravel 重要设置的文件。建议事先备份。但是，还原时请不要直接替换**。

## 数据库的还原
这是把 SQL Server 的备份恢复原状的步骤。  
请务必先确认没有用户正在使用 Exment，然后再进行。  

- 启动 Microsoft SQL Server Management Studio (SSMS)。  
**※请务必用拥有 sysadmin 或 dbcreator 服务器角色的成员，或者数据库的所有者 (dbo) 登录。**
![备份页面](../img/backup/sqlserver1.png)  

- 右键点击要还原的数据库，选择 任务→还原→数据库。  
![备份页面](../img/backup/sqlserver6.png)  

- 在还原数据库页面中选择“源：设备”，点击“...”，打开选择备份设备的对话框。  
![备份页面](../img/backup/sqlserver7.png)  

- 点击添加按钮后，会出现定位备份文件的对话框。选择想恢复的备份文件，点击“确定”。  
![备份页面](../img/backup/sqlserver8.png)  

- 确认选择的文件已添加到选择备份设备的对话框中，再点击一次“确定”。  
![备份页面](../img/backup/sqlserver9.png)  

- 回到还原数据库页面。选择“选择页：选项”，打开选项选项卡。勾选“还原选项：覆盖现有数据库”和“服务器连接：关闭到目标数据库的现有连接”，点击“确定”。  
![备份页面](../img/backup/sqlserver10.png)  

- 还原结束后会显示消息。  
![备份页面](../img/backup/sqlserver11.png)  


### 还原时的注意事项
- 备份时的 Exment 版本与现在安装的 Exment 版本不同时，还原后需要把数据库更新到最新。  
例： 备份时的版本：v1.1.6 现在的版本：v1.2.0  →需要把数据库更新到最新  
这时，请在还原后执行下面的命令。  

~~~
php artisan exment:update
~~~
    
**※用新版本的 Exment 备份的数据库，不能还原到旧版本的 Exment**。


## 各种文件的还原
用资源管理器等，把保存的文件按整个文件夹放回原处。  

- 插件文件和附件与数据库的数据相关联。请把同一时间备份的文件与数据库一起还原。
- 日志文件建议不要直接覆盖，而是另起一个名称，保存在同一个文件夹中。
  
~~~
插件文件　：(项目的根目录)/storage/app/plugins
附件　　　：(项目的根目录)/storage/app/admin
日志文件　：(项目的根目录)/storage/logs
设置文件　：(项目的根目录)/config
~~~
