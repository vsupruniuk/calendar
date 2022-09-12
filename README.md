# Calendar

### Here is the [DEMO LINK](https://vsupruniuk.github.io/calendar/)

### To run project locally:
- Fork a repo
- Clone a project
- Open project, then open a terminal and type a `npm start`
- Open `http://localhost:3000/` in your browser

### Technologies used:
- React 18.2.0
- TypeScript 4.8.2
- SASS 7.0.1
- React-router 6.3.0
- HTML5
- CSS3

## Description

## Application - Calendar of events.

### New user of the application:
- ### Go to the application page and see a page that consists of:
  - Form opening button.
  - Filter by date. By default, the current month is selected.
  - Calendar grid of the selected month in the filter. It consists of days (cells).
    The cell includes:
    - Number of the day of the month (1, 2, 3)
    - Weekday
    - List of events
    - The cell corresponding to the current day is probably the department.
- ### Filter by date
  - buttons "<" and ">" change the month cyclically
  - the calendar button opens the date picker with the ability to select the year and month
- ### Creating an event
  - click on the event creation button
  - an unfilled form will open. The form consists of 4 fields:
    - Title (required)
    - Description
    - Date (required)
    - Time
    - The "Save" button saves and closes the form
- ### Editing/deleting events
  - Clicking the event opens the completed form in editing mode. It is on the form created at/ updated at
  - the "save" button updates the event and closes the form
  - the "delete" button deletes the event and closes the form

### Requirements:
- Do not use ready-made calendars.
- The application saves the state of the filters after reloading the page
- The application uses localstorage as data storage. Provide a replacement storage implementations such as REST API (do not implement).
- The application may visually differ from the attached references
