# Gantt chart view

Shows records on a timeline, each one as a bar from its start date to its end (due) date.

## What a gantt chart view is

A gantt chart draws the period of each task as a horizontal bar laid over a date scale.  
When each task starts and ends, and which tasks are already past their deadline today, can be seen at a glance.

The Exment gantt chart view can:

- draw each record as one bar, from the start date column to the end (due) date column
- color the bars by the values of a select column
- draw the progress inside the bar, and mark records that are past their deadline and not finished with a red ring
- group the rows by a select column or by a milestone (Select (From Table)), and draw the milestone's deadline as a diamond
- indent child records under their parent
- show the assignee as an avatar

The gantt chart is read only. A bar cannot be dragged on the chart to change its dates; change the dates on the record's edit screen.

## Adding the view

1. Open the custom view setting screen (see [Custom views](/view.md)).
2. Click [New] at the top right.
3. Choose "Gantt chart view new creation" in the dialog.

"Gantt chart view new creation" can also be chosen from the menu of the view button on the data list screen. In that case, the data list is shown in the new view after saving.

"Gantt chart view new creation" is not offered when the table has no "Date" or "Date and Time" column at all.

#### View display name, view permissions, default, Use View Infobox
The setting items are the same as [View settings](/view.md?id=View-settings).

## Basic Setting

#### Start date column
The date column a bar starts from. (Required)  
Only "Date" and "Date and Time" columns can be chosen. For a "Date and Time" column, only the date part is used.

#### End (due) date column
The date column a bar ends on. (Required)  
The bar runs from the start date to the end date, both days included.  
Only "Date" and "Date and Time" columns can be chosen.  
A record whose end date is before today and whose progress is under 100 is treated as overdue: its bar gets a red ring, and the end date on the left of the row turns red. A record is also treated this way when no progress column is set or its progress is empty.

#### Bar color (select column)
Colors the bars by the values of this column. A legend of the values and their colors is shown above the chart.  
Only "Select (From Static Value)" and "Select (Save Value and Label)" columns can be chosen. For a multi-select column, the first value decides the color.  
The colors are the column's own "Color per value" (including a [cell style preset](/cell_style_preset.md) set on the column), used as they are. A value without a color gets one automatically, by the order of the choices.  
Leave it empty and every bar is blue.

#### Progress column (0-100)
Draws the progress (%) as a darker overlay inside the bar.  
Only "Integer", "Decimal" and "Currency" columns can be chosen.  
The value is read as 0 to 100: below 0 is drawn as 0, above 100 as 100.

## Advanced setting

#### Group rows by
Groups the rows by the values of this column. No grouping when left empty.  
Only single-value "Select (From Static Value)", "Select (Save Value and Label)" and "Select (From Table)" columns can be chosen.

The groups are drawn in this order:

| Column type | Order |
| --- | --- |
| Select (From Static Value), Select (Save Value and Label) | The order of the choices |
| Select (From Table) | The closest deadline of the referenced record first; groups without a deadline last |

- With a "Select (From Table)" column (a column referring to a milestone table, for instance), the deadline of the referenced record is shown on the group header row and as a diamond on the chart.
- Records with no value are shown last, in a "No group" group.
- A value that has no records does not get a group.

The deadline of the referenced record is read from the first date column ("Date" or "Date and Time") of the referenced table whose column name contains "due", "end", "limit", "deadline" or "期限". When there is no such column, the last date column is used. When the table has no date column, no diamond is drawn.

#### Parent column (self reference)
Pick a column that references this table itself, and child records are indented with "└" right under their parent.  
Only "Select (From Table)" columns whose target is this table itself can be chosen.  
Only one level is indented. Grandchildren and below are drawn at the end of the group, without indentation.  
A child whose parent is not drawn in the same group is drawn as an ordinary row.

#### Assignee column
Pick a user column to show the assignee's avatar (the first letter of the user name) on each row. Hovering the avatar shows the user name.  
Only "User" columns, and "Select (From Table)" columns whose target is the user table, can be chosen. For a multi-select column, the first user is shown.

#### Max records
The largest number of records drawn on the chart (10 - 2000, 500 by default).  
An empty or out-of-range value is treated as 500.  
When more records match the view filter, "The number of records exceeds the limit (N). Please narrow it down with the display filter." is shown, and the records over the limit are not drawn.

## Sort data and View Filter

The setting items are the same as "Data Sorting" and "Data display conditions" in [View settings](/view.md?id=View-settings).  
"Data display conditions" narrows down the records drawn on the chart.

Whatever the sort setting, the rows on the chart are drawn by start date, earliest first, within each group (records with no start date last). The sort setting decides which records are drawn when they are more than "Max records".

## Using the chart

### Reading the screen

#### Toolbar

| Place | Content |
| --- | --- |
| Left | The legend: the values and colors of "Bar color", "│ Today" for the today line and, when a milestone has a deadline, "◆ Due". |
| Right | The same view button, table menu and [New] button as the data list screen (each shown according to your permissions). |

#### Left side of a row

The left side of each row shows the bar color, the record label, the assignee's avatar and the end date (month/day).

- The record label is a link to the record's detail screen.
- The avatar is shown only when "Assignee column" is set.
- A record with no end date shows "—". An overdue record shows its end date in red.
- The header at the top left shows the name of the "Group rows by" column.

#### Date scale

- The upper line shows the year and month (for example 2026/10), the lower line the date of the Monday of each week (for example 10/19). Where the chart is narrow, the weeks are labeled every other week.
- Saturdays and Sundays have a light grey background.
- Today is marked by a red vertical line and "Today".
- The period shown is worked out automatically so that it covers the start and end dates of the records drawn, the milestone deadlines and today. A few days of margin are added on both sides, and the period is aligned to whole weeks from Monday to Sunday.
- The width of a day is adjusted to the width of the screen (there is no zoom). A long period scrolls horizontally.
- When the screen opens, it scrolls so that today is in view.

A date about three years or more away from today does not widen the period; its bar is cut off at the edge of the chart.

#### Bar

- A bar runs from the start date to the end date.
- When "Progress column" is set, a darker overlay inside the bar shows the progress.
- An overdue record's bar gets a red ring.
- Hovering a bar shows the record label, the period (start ~ end), the progress and the assignee's name.

A record with no start date or no end date gets no bar; only the left side of its row is shown.

#### Group header row

When "Group rows by" is set, each group has a header row.

- The header row shows the group name, the number of records and, for a milestone, its deadline.
- Clicking the header row collapses or expands the rows of that group.

### Opening a record

Clicking a bar, or the record label on the left side of a row, goes to the record's detail screen.

### Messages

| Message | When |
| --- | --- |
| The gantt chart needs both the start date column and the end date column. Pick them on the view setting screen. | "Start date column" or "End (due) date column" is not set, or the column set there is no longer a date column (deleted, for instance). |
| The number of records exceeds the limit (N). Please narrow it down with the display filter. | More records match the view filter than "Max records". |
| There is no data to show. | There is no record to draw. |

## Notes

- The gantt chart is read only. Bars cannot be dragged, and nothing can be edited on the chart.
- Only records the logged-in user may view are shown.
- The [Preview] button on the view setting screen shows the chart before saving (see [Custom views](/view.md?id=Preview)).
- Gantt chart views cannot be chosen in the "List of data" and "chart" boxes of a dashboard (see [Dashboard](/dashboard.md)).

## See also

- [Custom views](/view.md)
- [Kanban view](/view_kanban.md)
- [Cell style presets](/cell_style_preset.md)
- [List of data](/data_grid.md)
