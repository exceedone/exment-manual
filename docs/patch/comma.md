# Bug fixes v1.2.6 Remove comma character string
When updating to version 1.2.6, some special commands are required.
Here are the users who need the steps below, why, and how to update them.

## Reason
Exment has a function to "display as a comma character string" when the column type is "integer", "decimal", or "currency".

![Version update](../img/update/v1_2_6_comma1.png)  

When displaying or entering data, it will be displayed as a comma character string.

![Version update](../img/update/v1_2_6_comma2.png)  

It is displayed as a comma character string on the screen, but when saving data, it was normal to remove the comma and save.

However, there was a bug in this process, and the data was saved with the comma character string included.


As a result, there was a problem that the calculation could not be performed correctly at the time of aggregation.
In the case of the example below, the total amount is calculated for each employee. However, the total amount of employee 1 is displayed as "2" regardless of "2660".

![Version update](../img/update/v1_2_6_comma4.png)    
![Version update](../img/update/v1_2_6_comma5.png)    

The fix is to remove the commas in this data.

## case
When creating a column with the following conditions and saving data.
- Column type is either "integer", "decimal" or "currency"
- "Numeric comma character string" is set to YES in column setting
- (In the corresponding column, it is stored as a numerical value of 4 digits or more)


## How to respond
- Update to v1.2.6 or higher with [Normal update procedure](/update).

- Execute the following command. (* It may take some time depending on the number of registered data.)

~~~
php artisan exment:patchdata rmcomma
~~~

- The commas in the data have now been successfully deleted and calculated successfully.


![Version update](../img/update/v1_2_6_comma7.png)    
