# 官方插件
官方插件是由 Exceed One 开发、测试并提供支持的 Exment 免费插件。所有插件都公开了源代码（[exceedone/exment-plugins](https://github.com/exceedone/exment-plugins)，GPL-3.0）。

| 插件 | 可以做的事 |
| --- | --- |
| [项目管理](/zh/plugin_pm) | 项目和课题（工单）、看板、甘特图、Wiki、文件 |
| [IT 支持](/zh/plugin_it_support) | 服务台。用工单管理来自邮件、受理表单和电话的请求，并与客户共享进展，客户无需登录 |
| [Groupware](/zh/plugin_groupware) | Web 邮件，以及在浏览器中打开、编辑文件共享里的 Office 文件 |

## 安装方法
### Exment v7.2.1 及以上版本
官方插件随 Exment 一起提供。系统管理员在“管理员设置”→“功能管理”的“[免费官方插件（随 Exment 附带）](/zh/feature)”一栏中点击“使用（安装）”后即可安装。在点击之前，既不会安装，也不会加载。

- Exment 7.2.1 附带的是项目管理（ExmentPM）1.7.15、IT 支持（ExmentITSupport）1.0.9 和 Groupware（ExmentGroupware）0.4.7（软件包 exceedone/exment-plugins-release 7.2.14）。
- 附带的插件会在确认 Exceed One 的签名之后再安装。
- 有新版本时，只会给出提示。用“更新到此版本”更新，用“恢复到上一版本（○○）”恢复。
- 有包含安全修复的新版本时，会通知系统管理员。详情请参阅[功能管理](/zh/feature)。
- Groupware 在安装时会在左侧菜单中创建“メール”（邮件）。
- 更新 Exment 会带来新的附带版本，但正在使用的插件不会自动切换（[更新与附带的官方插件](/zh/update?id=更新与附带的官方插件)）。

### 更早版本的 Exment
从 GitHub 的 [Releases](https://github.com/exceedone/exment-plugins/releases) 下载 zip，在“管理员设置”→“[插件](/zh/plugin)”中上传。不要解压（请不要使用绿色的“Code → Download ZIP”）。

### Exment SaaS
在 Exment SaaS（`*.exments.com`）上也一样，租户的系统管理员在“功能管理”中点击“使用”后，会自动完成安装和初始设置。升级到新版本由运营方进行，数据结构的更新等也在那时一并完成。

## 相关项目
- [插件](/zh/plugin)
- [功能管理](/zh/feature)
