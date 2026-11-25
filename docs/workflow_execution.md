# Workflow execution
The steps for a user to execute the actions of a workflow (apply, approve and so on).  
The administrator must do the [workflow settings](/workflow_setting) beforehand.

## Workflow implementation
1. When you open data, the current status and the working users / organizations who take the next action are displayed.
![Workflow screen](img/workflow/workflow_data2.png)  


2. When the login user has permission to take the next action, action buttons are displayed at the top right of the page.  
![Workflow screen](img/workflow/workflow_data1.png)  


3. Click a button. The confirmation dialog for executing the action is displayed.  
![Workflow screen](img/workflow/workflow_data3.png)  

   - <span class="heading_smaller_than_h5">Action Name</span>  
   The name of the action executed this time is shown.  

   - <span class="heading_smaller_than_h5">Status</span>  
   The statuses before and after executing this action are shown.  

   - <span class="heading_smaller_than_h5">Next Work User</span>  
   The working users / organizations after this action is executed are shown.  

   - <span class="heading_smaller_than_h5">Comment</span>  
   Enter a comment for executing the action.  

4. When the contents are fine, click [Submit]. The action is executed.

5. When the action is executed, the "current status" and the "current working users" change.  
Note: depending on the workflow settings, a key mark is shown on the "current status". In that case, the data is locked and cannot be edited or deleted.

![Workflow screen](img/workflow/workflow_data4.png)  

Note: from v7.1.0, you can also execute the action of several data checked in the data list at once. For details, see [Data list tools](/data_grid_tools?id=run-workflow).

## Checking your pending tasks
The data on which you need to execute an action can be checked across all tables, from the pending task icon at the top right of the page or on the pending task list screen.  
See [Pending tasks](/workflow_task) for details.

## Resetting the workflow of data

The workflow of data in progress can be reset. Do this when the workflow can no longer proceed for some reason.  
The reset is done by a command. Run the following command in the root directory of the project.

~~~
php artisan exment:workflow-clear (table name) (ID)

# Example: reset the workflow progress of the data with table name "estimate" and ID "6"
php artisan exment:workflow-clear estimate 6

# Example: reset the workflow progress of the data with table name "syusseki" and ID "600"
php artisan exment:workflow-clear syusseki 600
~~~
