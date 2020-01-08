# Template
Import or export Exment tables, columns, form information, menus, dashboards, and other information.  
By importing templates created by other users into this system, you can eliminate the need to create custom tables and other items.  
In addition, you can export custom tables created with this system as templates so that other users can use them.  

## Page display
- Select "Template" from the left menu.  
Or access the following URL.  
http (s): // (Exment URL) / admin / template  
This will display the template screen.  
![Template screen](img/template/template1.png)  


## Export
Export the template.  
Fill out the necessary items in the "Export" item on the page and click "Send" to output a zip file with the required information.
![Template screen](img/template/template_export0.png)  

- Template name: Enter the name to be used in the system when exporting, using alphanumeric characters, "-" or "_".  
Enter a name that does not duplicate with other template files.  

- Template display name: Enter the template name to be displayed on the template screen.  

- Template description: Enter the description to be displayed on the template screen.  

- Thumbnail: Upload the thumbnail to be displayed on the template screen. The recommended size is 256px * 256px.  
If you do not upload, "No Image" image will be displayed on the template screen.

- Export target: Select what to export with this template. When you import a template, the selected items are imported into the system.
![Template screen](img/template/template_export1.png)  

- Export target table: When "Table" or "Menu" is selected in "Export target table", only the contents related to the table selected in this table will be exported.  
Select this if you want to create a template by exporting only the contents related to the table you created.  
※ If not selected, all items will be exported.
![Template screen](img/template/template_export2.png)  

- When you are finished, click Submit.  
The template file will be exported according to the entered information.  
The data format is a zip file.

## Import
Import the template.  
Currently, there are three types of templates that can be imported.  

- Templates provided by Exment
- Template uploaded from screen
- Templates uploaded in the past in the system (can be imported again)
![Template screen](img/template/template_import0.png)  

Execute the import using one of the following methods.  

- Installation templates:  
A list of templates prepared in Exment or templates uploaded in the past is displayed.  
From that, select the template you want to import.  

- Template upload:  
Please upload the Exment template file you have from the screen.  
The file format is zip.  

- After doing either of the above, click "Submit". This will import the selected or uploaded template into the system.  
As a result, information such as tables, forms, views, and dashboards defined in the template is installed on the system.  