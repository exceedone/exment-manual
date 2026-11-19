# Data details
Click the target data in [Data List](/data_grid.md) to display the data details.  
In the data list, only the contents specified in [Display column selection](/view?Id=Display-Column-Selection) in the view settings are displayed.  
In the data details, matching form items are displayed according to the priority set in the [form priority](/form?Id=form-priority-settings) settings.

The following four types of information are displayed on the data details screen.  

- Details of contents  
- Attachment  
- Comment  
- Change log  


## Details of contents
![Data screen](img/data/data_details1.png)
- Displays details registered as data.

## Back to the list
On the data show and edit pages, a [← Back to the list] button is shown on the right of the title (table name) row. Click it to go back to the data list of the table (the same place as the [List] button at the top right).

![Back to the list](img/data/data_back_to_list.png)

※Available from v7.1.0. The button is blue in the "Classic" design, and the accent color of the [Site skin](/system_setting?id=site-skin) in the "Modern" design.

## Attachment
![Data screen](img/data/data_attached_file.png)  

- ①.Click the "Browse" button and select the file you want to attach.  
②.Click "Upload".  
The file can be attached to the data detail screen by the above procedure.  

- The attached file can be deleted from the "Delete" button.  

## comment
![Data screen](img/data/data_comment.png)  

- By clicking the "Send" button after entering a comment, you can make a comment on the data.  
- The date and time when the comment was made and the user name are automatically entered.  
- The comment made can be deleted from the "Delete" button.  

※You can only delete comments made by the logged-in user.  
In the example of the image, since you are logged in as user, the "Delete" button of the comment made by admin is not displayed.

#### Markdown and images (from v7.1.0)
Comments can be written in Markdown: headings, lists, bold, code, links and tables (GitHub Flavored Markdown). A line break is shown as a line break.

![Markdown in a comment](img/data/comment_markdown.png)

- With [Write] and [Preview] of the comment box, you can check how it looks before sending.
- Paste or drag and drop an image (PNG, JPEG, GIF, WebP) into the comment box. It is uploaded as an attachment of the data and put in the comment as `![alt](URL)`. The size limit is 10 MB by default (it can be changed with a [setting value](/config?id=maximum-size-of-an-image-pasted-into-a-comment)).
- An image written as `![alt](/files/(uuid of the file))` in a body (custom column "Editor") is also shown as an image on the data show page (in the list it stays as text, as before). The url returned by "Create a document (attachment)" of the API can be written as it is.

※**Comments written before the update to v7.1.0 are shown as plain text, as before** (they are not read as Markdown). Comments written after the update are shown as Markdown.  
※HTML written in a comment is shown as text, not as HTML. Links to other sites open in a new tab.  
※An image is shown only to users who are logged in and can see the data the file belongs to. SVG images and images of other sites are shown as links, not as images, in comments.  
※Comments can also be listed, added and deleted with the API. See the [API reference](https://exment.net/reference/en/webapi.html) for details.

#### Mentions (notify a member with @)
You can name users in a comment to notify them.

- Type "@" (the full-width "＠" also works) in the comment box, and a list of users appears.  
Keep typing to narrow the list down. Click a user (or pick one with the up / down keys and press Enter), and "@user code" is entered.  
- When the comment is sent, each user named there receives an in-system alert (the notification icon at the top right of the page) titled "You were mentioned in a comment: (label of the data)". The body of the notification shows the comment text.

※ The list appears when "@" is typed at the start of a line or right after a space.  
※ Only users who have a user code are listed. Up to 20 users are listed at a time (following the setting value `EXMENT_API_DEFAULT_DATA_COUNT`).  
※ The notification is sent only to users who have permission to view the data. Naming yourself sends no notification.

## Change log

![Data screen](img/data/data_history1.png)  

- The update history is displayed when [Use data change history](/table?Id=Use-Data-Change-History) in the table settings is set to YES.
- When you edit the data, the date and time of the edit and the user name are automatically described.  
- When you edit the data, the date and time of the edit and the user name are automatically described.  

#### Revision
![Data screen](img/data/data_history2.png)  
- In "Revision selection", select the data you want to compare from the history.  
- "Selected history data" is displayed on the left, and "Latest data" is displayed on the right, and items that differ in data registration are colored with a background color.  
- Click the "Restore This Revision" button at the bottom of the page to restore with the selected data content.  

![Data screen](img/data/data_history3.png)  

## Data sharing
Share the saved data to other users / organizations.  
※In [Role group setting](/role_ group), it can be executed only if you have "Data sharing" authority.

#### Sharing method
- On the data details screen, the "Share" button is displayed. Click it.
![Data screen](img/data/data_share1.png)  

- A data sharing dialog appears.
![Data screen](img/data/data_share2.png)  

- Add the users you want to share and click "Submit" to complete the sharing.  
![Data screen](img/data/data_share3.png)  

※システム管理者が、[通知設定](/ja/notify)で「データ新規作成・更新・共有・コメント」による通知設定を行うことで、共有を行ったユーザーに通知を行うことができます。
