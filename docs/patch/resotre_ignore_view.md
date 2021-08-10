# Bug fix An error occurs when restoring to v3.6.7 with a backup file in the v3.6.7 environment.
### Defect occurrence conditions
- Perform backup in v3.6.7 environment
- Perform a restore in the v3.6.7 environment. * It doesn't matter if the environment is the same or different.
- Failed in the middle of restore

### Bug version
v3.6.7

### Cause
- In v3.6.7, a database view was added for some purposes, but that database view was also included in the backup target.
- Therefore, when performing the restore, an error occurred because you were trying to add data to the database view.


### How to fix
Please do one of the following.  
#### 1. Remove unnecessary files after zip
- Unzip the zip file backed up in v3.6.7.  
- Delete the following files from the unzipped folder.  
    - view_workflow_start.sql  
    - view_workflow_value_unions.sql  
- Zip the unzipped folder again.  
- Perform a restore.  

#### 2. Fundamental treatment
Exclude database view files from restoration.
- Open vendor \ excitedone \ extension \ src \ Database \ MySqlConnection.php.
- Correct the following description.
``` php
// L.253付近。バージョンにより行番号に差異があります
// get insert sql file for each tables
$files = array_filter(\File::files($dirFullPath), function ($file) {
    return preg_match('/.+\.sql$/i', $file);
});

// 修正前
//return preg_match('/.+\.sql$/i', $file);

// 修正後
$filename = $file->getFilename();
return preg_match('/.+\.sql$/i', $filename) && !preg_match('/^view_.*/i', $filename);
```

### v3.6.8 or later
- Since v3.6.8, the process of excluding the database view from the backup target has been added.
- Also, if you restore the backup file created with v3.6.7 with v3.6.8 or later, the process to exclude the view file has been added, so you can restore without any problem.