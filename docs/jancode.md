# JAN Barcode Settings
This page explains the screen that decides, for each table, what happens when a JAN barcode is read (which form is opened, and which screen is shown after saving).

The flow of the setting is as follows.

1. Open the JAN barcode setting screen
2. Set and save
3. Press the "Activate" button

## Overview of the JAN Barcode Functionality
For an overview of the JAN barcode function, see the [official website post](https://exment.net/release_v6-2-0/).

## Page Display
- In the custom table list, check the table to set and click "Table Detail Setting" at the top right.  
![JAN code page](img/jancode/jancode1.png)

> Note: you can also go there directly from the data list screen or the data registration screen of that custom table. In that case too, click "Table Detail Setting" at the top right.  
![JAN code page](img/jancode/jancode2.png)

- On the Table Detail Setting screen, click the icon of the Jancode Setting to show the JAN barcode setting screen.  
![JAN code page](img/jancode/jancode3.png)

## JAN Barcode Configuration Items
![JAN code page](img/jancode/jancode4.png)


### JAN Barcode Reading
Set what happens when a JAN barcode is read. 

- #### Registration Form  
Select the registration form opened after a JAN barcode is read.  
You can select from the custom forms registered for that table. 

- #### Action After Data Registration  
Select the screen shown after the data is registered.  
You can select from the TOP screen, the list screen, the details screen, the edit screen and the camera screen.

- #### Edit Form
Select the edit form opened after a JAN barcode is read.  
You can select from the custom forms registered for that table.

- #### Action After Data Editing
Select the screen shown after the data is edited.  
You can select from the TOP screen, the list screen, the details screen, the edit screen and the camera screen.

After setting, click the "Save" button.  

### Enabling JAN Barcode Settings  
- To make the JAN barcode function usable on that table, you need to "Activate" it. Save once, then click the "Activate" button at the top right of the page.  
- Only one of the 2D barcode and the JAN barcode can be activated.  
When the 2D barcode is activated, the "Activate" button of the JAN barcode function is not shown and it cannot be activated. In the same way, when the JAN barcode is activated, the 2D barcode cannot be activated.  

![JAN code page](img/jancode/jancode5.png)

### Disabling JAN Barcode Settings  
- To stop managing with JAN barcodes, or to manage JAN barcodes in another table, click the "Deactivate" button at the top right of the page.  
- The JAN barcode information linked while it was active remains. Therefore, when such a JAN barcode is read, the data of this table is shown.  

![JAN code page](img/jancode/jancode6.png)

## Launching the Camera Screen from Exment
- From the Exment dashboard, you can launch the camera screen for reading 2D/JAN barcodes.  

- For how to add the item "2D/JAN Barcode" to the dashboard, see [Dashboard](/dashboard).
