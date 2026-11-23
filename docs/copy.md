# Data copy settings
Settings to copy the data of a table to another table (or to the same table).  
For example:

- A "Make an order" button on the data details page of "Quotes". Pressing it makes "Orders" data with the values of the quote.
- Tables with the same columns for each year ("FY2025 data", "FY2026 data"). When entering FY2026 data, find FY2025 data and start from its values.

There are two ways to copy. Both use what this setting says: which column is copied to which column.

| Way | Where the button is | What it does |
|---|---|---|
| [Copy button of the data details page](#copy-button-of-the-data-details-page) | The data details page of the copy-from data | Pressing it **makes** the data in the copy-to table. |
| [Copy from button of the create form](#copy-from-button-of-the-create-form) | The create form of the copy-to table | Find and pick the copy-from data, and its values are put in the form. **Nothing is saved until you save.** |

Note: the "Copy from" button is in Exment v7.3.0 and later.  
Note: those who may make this setting are the users with the "Table settings" permission of the copy-from table (system administrators included).

## Opening the settings
A data copy setting is a setting of the **copy-from table**.

- Open the data list of the copy-from table, and press "Data Copy Setting" from "Table Detail Setting" at the top right.  
Note: the table has to be shown in the menu.
- Or, in "Settings: Data & Screens" → "Custom Table" of the menu, check one row of the copy-from table, and press "Data Copy Setting" from "Table Detail Setting" at the top right.

## Adding
1. On the "Data Copy Setting" page, press [New] at the top right.
1. In the dialog, choose the "Copy-to table".
1. "Pair the columns of the same name" is on at first. With it on, the columns whose name is the same in both tables are put in "Copy column settings" from the start ([Copy column settings](#copy-column-settings)).
1. Fill in the settings and press [Submit].

## Editing and deleting
Use [Edit] and [Delete] of the row in the list.

## The items

### Basic settings
- ##### Copy-from table and copy-to table
The tables to copy from and to. They cannot be changed here.

- ##### Button label
The text of the "Copy" button of the data details page. "Copy" at first. For example "Make an order", "Copy to FY2026".

- ##### Button icon and button HTML class
The icon and the HTML class of the "Copy" button of the data details page.

- ##### Button on the create form
When on, the create form of the copy-to table has a "Copy from" button ([Copy from button of the create form](#copy-from-button-of-the-create-form)). Off at first.  
Note: v7.3.0 and later.

- ##### Child table setting
With the "Copy" button of the data details page, the data of the child tables is copied too. Make the data copy setting between the child tables (one with no input dialog settings) first.  
Note: the "Copy from" button of the create form does not copy child tables.

### Copy column settings
Pairs of a copy-from column and a copy-to column. One pair on each row: "Copy-from column ▶ Copy-to column".

| Copy-from column | | Copy-to column |
|---|---|---|
| Customer | ▶ | Client |
| Amount | ▶ | Quoted amount |
| Person in charge | ▶ | Person in charge |

- The names may differ: a pair is copied.
- A column not in the pairs is not copied. In the copy-to table it is empty (or its default).
- **Put every required column of the copy-to table in the pairs.** Otherwise the setting cannot be saved.
- File and image columns cannot be chosen.

#### Pair the columns of the same name
For tables with the same columns, pairing one by one is work. With "Pair the columns of the same name" on when adding, the **columns with the same column name** are paired from the start. The "Pair the columns of the same name" button at the top right of the adding page puts them in again (what you have typed is lost).

- Auto number columns are not paired.
- Columns whose names differ are not paired: add them by hand if needed. You can change or remove the pairs that were put in.
- The editing page of an existing setting does not have this button.

Note: v7.3.0 and later.

#### When the column types differ
A pair of different column types (for example text → integer) can be chosen, but the value is copied as it is. A value that does not fit is an error of the input check when saving. In a select column, a value the copy-to column has no option for is left unselected.

### Input dialog settings
The columns entered again in a dialog when the "Copy" button of the data details page is pressed. The data is made with the values entered in the dialog.  
Note: the "Copy from" button of the create form does not use them (the values can be changed in the form itself).

## Copy button of the data details page
The data details page of the copy-from data has a button with the "Button label".

1. Press the button.
    - With no input dialog settings, a confirmation is shown.
    - With input dialog settings, a dialog of those columns is shown.
1. The data is made in the copy-to table, and its page opens.

Note: the users who may press it are those who may see the copy-from data and may make data in the copy-to table.

## Copy from button of the create form
With "Button on the create form" on, the create form of the **copy-to table** has a "Copy from" button at the top right.

1. On the create form of the copy-to table (for example FY2026 data), press "Copy from".
1. The data list of the copy-from table (for example FY2025 data) opens in a dialog. It is the same dialog as the "Search" of a select-table column: search, filter and sort it.
1. Press "Select" of the data to copy, and press [Setting].
1. The create form opens with the values of the data. "The values of "..." of ... were copied." is shown at the top.
1. Change what you need, and save. **Nothing is saved until you save.**

- File, image and auto number columns are not copied (the same as "Duplicate as new").
- When two or more settings put the button on the same table, the buttons are "Copy from (copy-from table name)".
- Only the users who may see the data of the copy-from table get the button. The dialog shows only the data they may see.

Note: v7.3.0 and later.

## Copying in the same table
The copy-to table may be the same table. To copy data in the same table without a setting, "Duplicate as new" of the right-click menu of a row of the data list does it too ([Data list](/data_grid)).

## Related
- [Data details](/data_details)
- [Data list](/data_grid)
- [Data form](/data_form)
- [Data update settings](/operation)
- [Relation settings](/relation)
