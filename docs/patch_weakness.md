# Patch / Vulnerability List

## Patch
This is a list of bugs that need to be dealt with manually and a list of their actions.

| Contents | Applicable version | Details |
| ---- | ---- | ---- |
| [Comma string removal](/patch/comma) | ~ v1.2.6 | This is a fix for the problem that comma strings are registered in the database. |
| [Search index including hyphen](/patch/index_hyphen) | ~ v1.3.0 | Correspondence of error occurrence in search index including hyphen. |
| [Notification screen does not open](/patch/remove_deleted_table_notify) | ~ v2.1.1 | This is a bug that the notification screen does not open when the table to which the notification is added is deleted. |
| [Menu characters can be up to 50 characters](/patch/menu_uri_length) | ~ v3.0.2 | This is a solution to the problem that 51 characters or more cannot be registered in the menu URL. |
| [Revision at API execution](/patch/api_revision) | ~ v3.0.9 | This is a bug that the revision is not displayed when new data is added / updated via API. |
| [Cannot SSO with Google account](/patch/sso_google) | ~ v3.0.16 | This is a solution to the problem that SSO cannot be done with Google account due to the termination of Google+ service. |
| [By deleting the relation, the parent-child relationship form remains](/patch/remove_deleted_relation) | ~ v3.0.16 | This is a bug fix when the relationship is deleted when the parent-child relationship form is set. |
| [Refine settings for fields with parent-child relationship of form and delete](/patch/relation_filter) | ~ v3.3.1 | This section describes the refinement settings for relations when the parent-child relationship form has been set. |
| [Files backed up in v3.6.7 cannot be restored in v3.6.7](/patch/resotre_ignore_view) | v3.6.7 | How to deal with the problem that files backed up in v3.6.7 cannot be restored in v3.6.7 I will describe about. |


## Vulnerability list
This is a list of vulnerabilities that have occurred in the past.

| Information release date | Applicable version | Details |
| ---- | ---- | ---- | 
| [2020/08/19](/weakness/20200819) | ~ v3.5.4 | Cross-site scripting and script execution policy for screen input |
| [2020/08/19](/weakness/20200819_2) | ~ v3.5.4 | Script execution when the attached file is clicked |
| [2020/03/25](/weakness/20200325) | ~ v3.1.6 | Cross-site scripting on the list screen |
| [2021/04/13](/weakness/20210413) | facade/ignition < 1.16.15 | Response to Laravel's Arbitrary Code Execution Vulnerability |
| [2022/08/17](/weakness/20220817) | ～v5.0.2 | Cross-site scripting and SQL injection |
| [2024/10/09](/ja/weakness/20241009) | ~v6.1.4 | Cross-site scripting
| [2024/10/09](/ja/weakness/20241009_2) | ~v6.1.4 | Unauthorized custom table setting change