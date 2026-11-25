# Exment 手册
<p align="center">
<img src="https://exment.net/docs/img/common/exment_logo_side.png" alt="Exment" style="border:none;">
</p>

## 什么是 Exment
### 告别 Excel 和零散的文件。
Exment 是**不写代码就能做出自己公司业务应用的、免费的开源 Web 数据库**。把客户、项目、申请、任务集中到一个地方，让团队一起使用。

- **不写代码，很快成形**：表、表单、列表、看板、甘特图、汇总，只用页面上的设置就能做出来。
- **从申请到审批，团队一起推进**：工作流、通知、公开表单、API 都已备齐。
- **免费。人数增加，费用也不变**：因为是开源（GPL），费用不会随用户数增加。
- **自己的服务器和云都可以**：可以在自己公司的服务器、租用服务器、AWS、Azure 等环境中运行，数据由自己公司保管。

## 先试用一下
- **试用演示**：登录后马上就能试用项目管理、商谈、工作流和公开表单。登录信息在 <a href="https://exment.net/zh/demo-env/" target="_blank">演示站点一览</a> 中。
- **免费开始**：安装步骤请从 [开始之前](/zh/quickstart) 看起。
- **看看能做什么**：<a href="https://exment.net/zh/functions/" target="_blank">功能和截图</a>／<a href="https://exment.net/zh/whats-new/" target="_blank">What's new</a>（各版本的新功能）／[发行说明](/release_note)（英语）
- **咨询**：<a href="https://exment.net/assets/exment-flyer-en.pdf" target="_blank">资料（PDF）</a>／<a href="https://exment.net/zh/inquiry/" target="_blank">联系我们</a>（关于导入和从其他工具迁移的咨询）

<a href="https://exment.net/en/" target="_blank">Exment 官方网站</a>

## 关于本手册
本手册始终按最新版的 Exment 编写。
对于后来的版本中增加的功能和命令，有时没有写明从哪个版本起可以使用。敬请谅解。


## 手册菜单
带有“<span style="color:red;">*</span>”的菜单是特别重要的内容。

<div class="container-fluid" style="margin-bottom:2em;">
    <div>
        <h4>1. 开始之前</h4>
        <div class="row">
            <div class="col-sm-6 tile tile">
                <a href="#/zh/concept">
                    <div class="tile-inner">
                        <h5>Exment 的理念</h5>
                        <p>介绍 Exment 的想法和理念。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/start_flow">
                    <div class="tile-inner">
                        <h5>开始业务之前的流程</h5>
                        <p>介绍使用 Exment 开始业务之前的标准步骤。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>2. 安装和初始设置</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/quickstart">
                    <div class="tile-inner important-topic">
                        <h5>开始之前</h5>
                        <p>介绍开始使用 Exment 之前需要先确认的步骤概要。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/server">
                    <div class="tile-inner important-topic">
                        <h5>服务器设置</h5>
                        <p>为安装 Exment 设置 Web 服务器和数据库。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/quickstart_easy">
                    <div class="tile-inner important-topic">
                        <h5>Exment 应用程序的安装步骤</h5>
                        <p>开始使用 Exment 所需的安装步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/first_setting">
                    <div class="tile-inner important-topic">
                        <h5>初始设置</h5>
                        <p>安装之后的初始设置步骤，例如设置第一个管理员的登录 ID。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/update">
                    <div class="tile-inner important-topic">
                        <h5>更新</h5>
                        <p>Exment 的更新步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/quickstart_more">
                    <div class="tile-inner">
                        <h5>追加设置</h5>
                        <p>更改“/admin”路径、设置任务计划等，进行 Exment 追加设置时的步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/mailsend_setting">
                    <div class="tile-inner">
                        <h5>邮件发送设置</h5>
                        <p>向用户发送邮件时的步骤。也写有发送测试邮件的步骤。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>3. 登录设置</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/login_setting">
                    <div class="tile-inner">
                        <h5>登录设置</h5>
                        <p>进行登录 Exment 时的各种登录设置。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/login_sso">
                    <div class="tile-inner">
                        <h5>SSO 认证设置</h5>
                        <p>SSO 认证的管理员一侧的设置方法。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/login_2factor_setting">
                    <div class="tile-inner">
                        <h5>双重验证设置</h5>
                        <p>双重验证的管理员一侧的设置方法。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/login_2factor">
                    <div class="tile-inner">
                        <h5>登录（双重验证）</h5>
                        <p>介绍使用双重验证登录的步骤。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>4. 表设置</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/table">
                    <div class="tile-inner important-topic">
                        <h5>表设置</h5>
                        <p>Exment 最基本的设置。用来保存数据的自定义表的设置步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/column">
                    <div class="tile-inner important-topic">
                        <h5>自定义列设置</h5>
                        <p>属于自定义表的自定义列的设置。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/relation">
                    <div class="tile-inner">
                        <h5>关联设置</h5>
                        <p>让表和表建立关系的关联设置。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/form">
                    <div class="tile-inner">
                        <h5>自定义表单设置</h5>
                        <p>管理数据登记页面中使用的表单项目。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/view">
                    <div class="tile-inner important-topic">
                        <h5>自定义视图设置</h5>
                        <p>管理数据列表页面中使用的视图项目。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/operation">
                    <div class="tile-inner">
                        <h5>数据更新事件设置</h5>
                        <p>在新建或更新数据时、点击按钮时等，更新列的值。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>5. 数据管理</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/data">
                    <div class="tile-inner important-topic">
                        <h5>数据</h5>
                        <p>对已创建的表中的数据进行列表显示、新建、编辑、查看、删除的步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/data_grid">
                    <div class="tile-inner important-topic">
                        <h5>数据列表</h5>
                        <p>以列表显示已登记的数据。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/data_form">
                    <div class="tile-inner important-topic">
                        <h5>数据表单（数据详情）</h5>
                        <p>在目标表中登记和编辑数据。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/data_import_export">
                    <div class="tile-inner">
                        <h5>数据导入和导出</h5>
                        <p>从 CSV、Excel 文件向目标表批量登记、更新、删除数据。也可以把目标表的数据输出到 CSV、Excel 文件。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/data_cmd_import_export">
                    <div class="tile-inner">
                        <h5>数据导入和导出（命令）</h5>
                        <p>用命令执行数据的导入和导出。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/data_bulk_insert">
                    <div class="tile-inner">
                        <h5>数据导入（大量数据）</h5>
                        <p>向目标表批量登记 CSV 数据。支持大量数据。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/search">
                    <div class="tile-inner">
                        <h5>数据搜索</h5>
                        <p>搜索已登记数据的步骤。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>6. 用户、组织、角色和权限</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/permission">
                    <div class="tile-inner important-topic">
                        <h5>角色和权限的概要</h5>
                        <p>说明 Exment 中角色和权限的概要。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/user">
                    <div class="tile-inner important-topic">
                        <h5>用户和登录用户管理</h5>
                        <p>管理用户信息以及设置登录系统的方法的步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/organization">
                    <div class="tile-inner important-topic">
                        <h5>组织管理</h5>
                        <p>设置用户所属组织的步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/role_group">
                    <div class="tile-inner">
                        <h5>角色组和权限</h5>
                        <p>让特定的数据和页面只能由特定用户管理的设置。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/multiuser">
                    <div class="tile-inner">
                        <h5>面向外部门户网站的设置</h5>
                        <p>在数据列表页面和编辑页面中显示用户、组织时，如果想设置为“只显示登录用户所属的组织及其所属用户”，推荐阅读本页内容。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>7. 工作流</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/workflow_setting">
                    <div class="tile-inner important-topic">
                        <h5>工作流设置示例</h5>
                        <p>介绍工作流的设置示例。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/workflow_example">
                    <div class="tile-inner">
                        <h5>工作流设置</h5>
                        <p>由管理员设置工作流。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/workflow_execution">
                    <div class="tile-inner">
                        <h5>执行工作流</h5>
                        <p>各用户执行工作流的步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/workflow_task">
                    <div class="tile-inner">
                        <h5>待办任务</h5>
                        <p>从所有表中集中确认需要自己执行操作的工作流数据。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>8. 公开表单</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/publicform">
                    <div class="tile-inner">
                        <h5>公开表单</h5>
                        <p>设置一般用户（未登录的用户）可以输入数据的公开表单。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>9. 其他标准功能</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/template">
                    <div class="tile-inner">
                        <h5>模板</h5>
                        <p>导入或导出自定义表、列等信息。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/backup">
                    <div class="tile-inner">
                        <h5>备份和还原</h5>
                        <p>备份和还原已保存的数据及数据库信息。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/menu">
                    <div class="tile-inner">
                        <h5>菜单</h5>
                        <p>管理左侧菜单中显示的项目。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/dashboard">
                    <div class="tile-inner">
                        <h5>仪表板</h5>
                        <p>管理登录后最先显示的首页内容。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/mail">
                    <div class="tile-inner">
                        <h5>通知模板</h5>
                        <p>设置向用户发送邮件时的主题和正文。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/notify">
                    <div class="tile-inner">
                        <h5>通知</h5>
                        <p>在更新数据时或点击按钮时发送邮件的设置步骤。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/line">
                    <div class="tile-inner">
                        <h5>LINE 关联</h5>
                        <p>与 LINE 官方账号关联，在 LINE 中接收通知和执行工作流的操作。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/safety_check">
                    <div class="tile-inner">
                        <h5>安全确认</h5>
                        <p>在地震等紧急情况下，用 LINE 和邮件确认员工是否安全。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/logs">
                    <div class="tile-inner">
                        <h5>日志</h5>
                        <p>介绍 Exment 的各种日志。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>10. 功能扩展</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/api">
                    <div class="tile-inner">
                        <h5>API</h5>
                        <p>与其他系统联动的 API 的使用方法。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/plugin">
                    <div class="tile-inner">
                        <h5>插件</h5>
                        <p>自行开发的插件的管理方法。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/plugin_quickstart">
                    <div class="tile-inner">
                        <h5>插件的制作方法</h5>
                        <p>按种类介绍插件的制作方法。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <div>
        <h4>11. 参考</h4>
        <div class="row">
            <div class="col-sm-6 tile">
                <a href="#/zh/params">
                    <div class="tile-inner">
                        <h5>参数变量</h5>
                        <p>在自动编号、文档输出等处把参数替换为值时使用的变量一览。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="https://exment.net/reference/webapi.html">
                    <div class="tile-inner">
                        <h5>API 参考</h5>
                        <p>Web API 的参考。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/func_reference">
                    <div class="tile-inner">
                        <h5>函数参考</h5>
                        <p>自定义表、自定义列、自定义数据等的类和函数的参考。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/column_reference">
                    <div class="tile-inner">
                        <h5>自定义列参考</h5>
                        <p>自定义列的详细规格，以及在插件中获取和设置列值时的参考。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/plugin_reference">
                    <div class="tile-inner">
                        <h5>插件参考</h5>
                        <p>开发自己的插件时使用的类和函数的参考。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/config">
                    <div class="tile-inner">
                        <h5>设置值一览</h5>
                        <p>Exment 中可以设置的设置值一览。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/command">
                    <div class="tile-inner">
                        <h5>命令一览</h5>
                        <p>Exment 中可以执行的命令一览。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/release_note">
                    <div class="tile-inner">
                        <h5>发行说明（英语）</h5>
                        <p>过去的发布历史。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/patch_weakness">
                    <div class="tile-inner">
                        <h5>补丁和漏洞列表</h5>
                        <p>需要手动处理的过去的缺陷，以及过去发生的漏洞的一览。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/troubleshooting">
                    <div class="tile-inner">
                        <h5>故障排除</h5>
                        <p>回答 Exment 的故障解决方法和 Exment 技术方面的常见问题。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/license">
                    <div class="tile-inner">
                        <h5>许可证</h5>
                        <p>Exment 中使用的开源库。</p>
                    </div>
                </a>
            </div>
            <div class="col-sm-6 tile">
                <a href="#/zh/develop_memo">
                    <div class="tile-inner">
                        <h5>开发备忘</h5>
                        <p>细小规格等零散内容的汇总。</p>
                    </div>
                </a>
            </div>
        </div>
    </div>
</div>
