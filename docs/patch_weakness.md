# Patch / Vulnerability List

## Patch
This is a list of bugs that need to be dealt with by hand, and what to do for them.  
If your version falls under the "Applicable version", please check what to do on the linked page.

| Contents | Applicable version | Details |
| ---- | ---- | ---- |
| [Comma string removal](/patch/comma) | ~ v1.2.6 | A fix for the problem that comma strings are registered in the database. |
| [Search index including hyphen](/patch/index_hyphen) | ~ v1.3.0 | A fix for the error that occurs with a search index including a hyphen. |
| [Notification screen does not open](/patch/remove_deleted_table_notify) | ~ v2.1.1 | A fix for the problem that the notification screen does not open after a table with a notification is deleted. |
| [Menu characters can be up to 50 characters](/patch/menu_uri_length) | ~ v3.0.2 | A fix for the problem that 51 characters or more cannot be registered in the menu URL. |
| [Revision at API execution](/patch/api_revision) | ~ v3.0.9 | A fix for the problem that the revision is not displayed when data is added or updated via the API. |
| [Cannot SSO with Google account](/patch/sso_google) | ~ v3.0.16 | A fix for the problem that SSO with a Google account does not work, because the Google+ service has ended. |
| [By deleting the relation, the parent-child relationship form remains](/patch/remove_deleted_relation) | ~ v3.0.16 | A fix for the problem when a relation is deleted while a parent-child relationship form is set. |
| [Refine settings for fields with parent-child relationship of form and delete](/patch/relation_filter) | ~ v3.3.1 | Describes the refinement settings of relations when a parent-child relationship form is set. |
| [Files backed up in v3.6.7 cannot be restored in v3.6.7](/patch/resotre_ignore_view) | v3.6.7 | Describes what to do for the problem that files backed up in v3.6.7 cannot be restored in v3.6.7. |
| [Wrong executor shown in the notification of a data comment or attachment](/patch/mail_template_comment_attachment) | ~ v3.7.5 | Describes how to fix the executor shown in the notification of a data comment or attachment. |
| [Deleting files tied to physically deleted data](/patch/file_deleting) | ~ v4.0.6 | Describes how to delete files that are no longer tied to any data because the data has already been physically deleted. |
| [When the custom column "Select (From Table)" was imported from Excel with "User" or "Organization" as the target table](/ja/patch/select_table_user_org) (Japanese) | All versions | What to do when the custom column "Select (From Table)" was imported from Excel with "User" or "Organization" as the target table. |
| [The value registered in the database can be a number type for the custom columns "Select (From Table)", "User" and "Organization"](/ja/patch/select_table_integer) (Japanese) | ~ v4.1.0 | For the custom columns "Select (From Table)", "User" and "Organization", this converts data saved as a number type into a string type, when the data was registered from somewhere other than the screen. |


## Vulnerability list
This is a list of the vulnerabilities (security weaknesses that could be abused) found so far.  
Please check the contents and what to do from the link on the date.

| Information release date | Applicable version | Details |
| ---- | ---- | ---- |
| [2020/08/19](/weakness/20200819) | ~ v3.5.4 | Cross-site scripting, and the policy on script execution in screen input |
| [2020/08/19](/weakness/20200819_2) | ~ v3.5.4 | Script execution when an attached file is clicked |
| [2020/03/25](/weakness/20200325) | ~ v3.1.6 | Cross-site scripting on the list screen |
| [2021/04/13](/weakness/20210413) | facade/ignition < 1.16.15 | Response to the vulnerability that allows arbitrary code execution in Laravel |
| [2022/08/17](/weakness/20220817) | ~ v5.0.2 | Cross-site scripting and SQL injection |
| [2024/10/10](/weakness/20241010) | ~ v6.1.4 | Cross-site scripting |
| [2024/10/10](/weakness/20241010_2) | ~ v6.1.4 | Changing the settings of a custom table without permission |

