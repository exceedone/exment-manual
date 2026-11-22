# Studio
The Studio makes, changes and shows the screens of the site. As with the apps of kintone, placing parts makes the container of the data (a table), its input screen and its list. The screens made can also be used in the phone app (Exment app).

※All that is written here is in Exment v7.2.1.

## Getting started
- The Studio is off at first. When a system administrator turns "Studio" on in "Admin Setting" > "[Feature Management](/feature)", a "Studio" menu appears under "Admin Setting" (the URL is `/admin/studio`).
- Of those chosen in Feature Management, the Studio opens for those with the permission to set a table, its forms or its views on any table, and for system administrators.

| To | Permission needed |
| --- | --- |
| Make a new app (table) | The system permission "Table" |
| Add a screen to a table, change in the Studio | The permission to set the forms of that table |
| Make buttons, add new items (columns) when changing | The permission to set up that table |

<!-- Screenshot: the list of screens of the Studio (img/studio/studio_index.png). Take it after aa checks the page -->

## The list of screens
Opening the Studio shows the screens of the site on one page.

| Section | Content |
| --- | --- |
| Screens of the tables | For each table, its input screens (forms) and lists (views), with "Open", "Edit" and "Copy", and links to the column and table settings. Filter by the name of a table or screen at the top. |
| Dashboards | The system dashboards and the user dashboards. |
| Plugin pages | The page plugins. |
| Table relation diagram | The one-to-many and many-to-many relations, and the columns that select from other tables, as a diagram. |

- Click the name of an input screen (or the pencil) to open it in [Change in the Studio](/studio?id=change-in-the-studio). The form settings page opens from the cog icon ("Open in the form settings").
- Only the tables you may set, and the screens of them you may set, are listed.

## Make a new app or screen
Press "New app or screen" on the list. There are three ways.

| Way | Content |
| --- | --- |
| Make a new app | The parts you place make the table and its columns, the input screen and the list. When chosen, a kanban, a calendar, a chart and a dashboard are made too ([Make an app in one go](/studio?id=make-an-app-in-one-go)). |
| Add a screen to a table | No table is made. Place the columns that exist to make an input screen (form) only. |
| Make from Excel or CSV | Read an Excel (.xlsx) or CSV file: the first row gives the item names, the rows below the data, and the parts are guessed and placed. Fix what is wrong before saving. With "Take the data in too", the data comes in as well (up to 1,000 rows; the file up to 10 MB). |

Before saving, the page says what will be made (as "Saving makes the app "..." (the table, the input screen and the list)."). After saving, you can enter data on the new screen.

<!-- Screenshot: making a new app (parts, input screen, preview) (img/studio/studio_create.png) -->

### Parts
| Part | Content |
| --- | --- |
| One-Line Text, Multiple-Line Text, URL, Email | Text. |
| Integer, Decimal, Currency | Numbers. |
| Calculation | Calculated from other number items ("Calculation" below). |
| Date, Date and Time, Time | Dates and times. |
| Select (From Static Value), YES/NO | Choose from fixed values. Write one choice per line. |
| Select (From Table) | Choose a record of another table. Set "Table to select from". |
| User, Organization | Choose Exment users or organizations. |
| Auto Number | On saving, a number with the date (as 20261121-0001) is given. |
| File, Image | Attach files or images. |

- Click a part to add it at the end, or drag it to where you want it. Up to 100 items can be placed.
- For each item, set the item name, the column name (letters and numbers) and whether it is required.

### Rows and columns
Choose for each row "1 column", "2 columns", "2 columns (wide left)", "2 columns (wide right)", "3 columns" or "4 columns" to place items side by side. On a phone they stand one under another. Up to 50 rows can be made.

### Shown when
Each item can be shown or hidden by the value of another item ("is", "is not", "is empty", "is not empty"; "Always shown" for none). For example, show "Reason" only when the status is "On hold". A required item cannot have a condition.

### Details (child tables)
Make details entered in many rows for one record, as the products in an order. Each detail makes a child table, shown as a table under the input screen. Up to 5 details can be made. Calculations and selects from other tables can be used in details too.

### Calculation
In a calculation part, write other number items (Integer, Decimal, Currency, Calculation) in `[ ]`.

- Example: `[Quantity] * [Unit price]`
- The total of a detail: `合計[detail name.item]` (as `合計[Order details.Amount]`)
- Only items, numbers and `+ - * / ( )` can be used.

### Buttons
Make buttons shown on the page of a record. A button sets the value of an item (for example, "Done" sets the status to "done").

- Up to 5 buttons per screen. The item can be a choice, YES/NO, one-line text or integer.
- The button is not shown on a record that has the value already.
- A button is made as a [data operation](/operation) of the table, where it can be changed or deleted later.
- Only those with the permission to set up the table can make buttons.

### More settings
- **Table name (letters and numbers)**: used in the URL of the data and so on. Given automatically when empty. It cannot be changed later.
- **Add to the menu under**: where in the side menu it is added ("Do not add" for none).

## Make an app in one go
In "Make a new app", the screens to look at the data can be made together, in "Made with the app".

| Made | Item used |
| --- | --- |
| Kanban | The item of the lanes (a choice) |
| Calendar | A date item (its search index is turned on, which the calendar needs) |
| Chart (count) | The count by an item (a choice or YES/NO) |
| Dashboard | The list, the chart and the calendar together. Made by a system administrator, everyone sees it; made by others, only they see it. |

- Placing an item that can be used turns them on. They can be turned off.
- Each is made as the view and dashboard settings make it, and can be changed there later.

<!-- Screenshot: "Made with the app" (img/studio/studio_bundle.png) -->

## Change in the Studio
An input screen made in the Studio is changed on the same page it was made on. Click the name of the input screen on the list. Those with the permission to set the forms of the table can change it.

- Move or take off items, add or remove conditions, rename the screen and add buttons.
- An item taken off the screen stays in the table with its data.
- A part added from "New items (the table gets their columns)" makes its column in the table on saving, and the column is shown in the list. Only those with the permission to set up the table can do this. A calculation part cannot be added here (add it in the column settings).
- Items the Studio does not make yet (headings, explanations, HTML, images, lines, system items) are kept. They can be moved or taken off; their content is changed in the form settings.
- Details (child table input) stay as they are. To change them, open the form settings.
- Before saving, the page says what will change (as 'Saving changes this input screen. The table "…" gets the columns "…".').

<!-- Screenshot: changing a screen in the Studio (img/studio/studio_edit.png) -->

## Phone app (Exment app)
Open `/admin/app` in the browser of a phone to use the screens of the Studio as a phone app. "Add to Home screen" to open it like an app.

- **Screens**: the input screens of the tables you may use are listed. Opening one shows its list; "+" at the bottom right adds a record.
- **Photos and files**: in a file or image item, take a photo on the spot. Photos are made smaller on the phone before they are sent.
- **Scan a code**: the button at the top reads QR codes and bar codes with the camera. A 2D barcode of Exment ([2D barcode setting](/2d_barcode)) or a QR code of the URL of a record opens that record. Read from the list of a table, the text, integer and auto number columns of that table are searched. JAN codes are searched too.
- **Without a connection**: When saving fails offline, the input (with details and photos) is kept on the phone as a draft and sent automatically when the app is opened or the connection comes back. A screen opened once opens without a connection, so new data can be entered too. In "Drafts not sent", open and edit, send now or delete a draft. A draft the server did not accept stays, with the reason. Drafts belong to each user.
- "PC" goes back to the usual pages.

<!-- Screenshot: the list and the input screen of the phone app (img/studio/studio_app.png) -->

## Related
- [Feature Management](/feature)
- [Custom form](/form)
- [Custom view](/view)
- [Dashboard](/dashboard)
- [Data operation](/operation)
- [2D barcode setting](/2d_barcode)
