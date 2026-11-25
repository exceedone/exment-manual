# List of data
This page explains the screen that shows the data saved in a table as a list.

- The list shows the data you created and the data you have been given permission for.  
- When the "permission to edit and view all data" is registered for a user or an organization, all data is shown, regardless of the condition above. For details on permissions, see [Roles and authorities](/permission).

## Functions list
![Data screen](img/data/data_grid1.png)  

Note: the data list also lets you switch the columns shown, pin columns, group rows, edit in place and so on. See [Data list tools](/data_grid_tools) for details.

##### Auto refresh  
The rightmost of the five tool icons at the top right. It reloads the list at the interval you choose (Off, 30 seconds, 1 minute, 5 minutes). See [Data list tools](/data_grid_tools) for details.

##### Filter  
Narrows down the data list now shown. See "filter" below for details.

##### View  
The view button of the custom table now shown. See "The view" below for details.  

##### Import / Export  
The button to export the data of the custom table now shown, or to import data. See [Data import / export](/data_import_export) for details.

##### List  
The data list.  
The rows shown are narrowed down by the user's permissions, the filter setting of the view, and the filter setting of the list screen.  
The columns shown change with the column setting of the view.  

##### Batch update  
Updates the data of several selected rows in one go.  
The columns to update and the update values must be set beforehand in the [Batch update settings](/mass_update).


## detail of function

### filter
Narrows down the data list now shown.  
![Data screen](img/data/data_grid_filter1.png)  
Click the [Filter] button to show the items for narrowing down.  

- The items that can be used for narrowing down are decided as follows.  
  - When the view specifies "Filter" items ("Specifying "Filter" Items in the View" in [Custom views](/view)), only those items.  
  - When it does not: the system items (ID, created date, updated date and so on; except the ones checked in "Disable Grid Filter" of the [System setting](/system_setting)), the parent table of a child table, the workflow status of a table that has a workflow, the comment when comments are used, and the columns where "Index Enabled" (search index) is ON in the custom column setting.
[The manual of the custom column setting is here](/column)

- Enter a keyword in each item and click the [Search] button: only the matching rows are shown.  

- To put the filter back, click the [Reset] button.

- When a user other than an administrator narrows down, the data is narrowed down from the data that user has permission for. Data without permission is not a target of the filter.  

- The filter is applied in addition to the narrowing conditions of the view shown.

- For text-type columns, whether the entered keyword matches the beginning of the value (forward match) or a part of it (partial match) follows "Data search method" in the [System setting](/system_setting?id=data-search-method). The initial value is forward match.

>Among the items shown as choices, the words of an item that has a relation setting can be changed in the [Heading display column setting](/table?id=heading-display-column-setting).

### The view
The view button of the custom table now shown.  
The button shows the name of the view now shown.  
Click it to show the view menu.
![Data screen](img/data/data_grid_view1.png ':size=284')  

##### System View  
The list of the views registered in the system is shown.  
Click an item to switch to that view.

##### Setting - Edit Current View Setting  
Changes the setting of the view now shown.  
Click the item to switch to the screen for changing the setting of that view.  
Note: this item is shown only to users who have the administrator permission of the table.  

##### Setting - Create View  
Makes a new view.  
Click the item to switch to the screen for creating a new view.  
Note: this item is shown only to users who have the administrator permission of the table.  

### Bulk update
Updates several selected records in one go.  
When you select rows with the checkbox at the left of each row, the number of selected rows and a ▼ icon are shown at the top left.
![Data screen](img/data/data_grid_mass_update1.png)  

- Click the ▼ icon: batch deletion and the batch update settings already made are shown as choices.  

- Click the choice of what you want to update: a message asks whether the batch update may be run. Click the confirmation button. The columns specified in the [Batch update settings](/mass_update) change to the update values.
![Data screen](img/data/data_grid_mass_update2.png)  
