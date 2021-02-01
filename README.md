# ![Scale-Up Velocity](./src/images/todo-logo.png) Pre Course Project - Todo List 📋

## Introduction

In this website you can manage your tasks in much simpler way!
All you need to do is insert task, pick the priority of the task, and click ENTER key or on the add button!

## Manage Your Way Threw The Site

### Sort Button

The items will be added be the order of creation, but if you like to sort by priority all you need to do is click on the sort button.

![sort button](./readme-files/gifs/sort.gif)

### Done Button

After finishing a task, you can mark the task and click the "Done" button.
The task will go to the "Done" section and you could check your done tasks there.

![done button](./readme-files/gifs/done-item.gif)

### Done section

In the "Done" section you can see the tasks you finished and delete them if you wish.
The logo on the top off the page will be different and the "Done" section on the Nav-Bar will be bold so you could tell the difference.

![done section](./readme-files/gifs/done-sec.gif)

### Delete button

In the main page, you can check items you wish to delete, and after clicking the "Delete" button the will be gone forever.
Its recommended to use the delete button only on tasks you added unintentionally.

![delete button](./readme-files/gifs/delete-button.gif)

## Running tests

We have created automated tests for your convenience, use it to check your progression.

Note that the automated tests rely on your code having the exact class names, Ids and objects structures as specified below.

To run the tests locally simply run `npm run test` in the terminal

Note that each commit to `main` branch will trigger a github [action](https://docs.github.com/en/actions). You can easily see the action tests result on each commit:

![Commits test](./readme-files/commit-tests.png)

## Guidelines

- The Todo list should have two sections: _Control_ section and _View_ section
- The _Control_ section is where the user adds his todo task and priority, and should have three elements:
  - [\<input\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) with id `text-input`.
  - [\<select\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) with id `priority-selector` (options will be: 1-5).
  - [\<button\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) with id `add-button`.
- The _View_ section is where we display the list of added todo tasks and data. The list should start empty and each added todo should be inserted to the end of the list.
- After the user clicks on the 'add' button, the todo input field should be "reset"
- Every todo item should have a "container" div with class `todo-container` that will contain 3 sub-elements:

  - An element with a class `todo-text` with the text of the todo task
  - An element with a class `todo-created-at` that will hold the creation time of the task in a [SQL format](https://www.w3schools.com/sql/sql_dates.asp#:~:text=SQL%20Date%20Data%20Types&text=DATE%20%2D%20format%20YYYY%2DMM%2D,YEAR%20%2D%20format%20YYYY%20or%20YY)
  - An element for showing the numeric priority value of the task, with a class `todo-priority`

  Good way 👍🏿:

  ```
    <div class="todo-container">
      <div class="todo-priority">
        1
      </div>
      <div class="todo-created-at">
        2020-06-18 11:51:12
      </div>
      <div class="todo-text">
        the todo text
      </div>
    </div>
  ```

  Bad way 👎🏿:

  ```
    <div class="todo-container">
      <div class="todo-priority">
        1
      </div>
      <div class="todo-created-at">
        2020-06-18 11:51:12
      </div>
      <div class="todo-text">
        <span>the todo text</span>
      </div>
    </div>
  ```

- Add a counter element to reflect the **current** number of todos stored in the app. This element should have an id of `counter`.

- Add a button with id `sort-button`. Clicking this element should resort the todo list by their todos priority (DESC)

  ![alt text](./readme-files/todo.gif)

- **Make your todo-list persistent!**

  Save your todo-list as JSON (see `todo-list-example.json`) and store it in a persistent way, you have to options:

  1. Use the `localStorage` browser api to save / load the todo-list JSON **with the 'my-todo' key**. This option will make it persist between _page reloads_.

  2. Use the [jsonbin.io](https://jsonbin.io/) service api (using async/await fetch GET & PUT requests) to save / load your todo-list JSON. This option will make it persist across _devices and browsers_.

**Note** You can add extra properties to the todo objects in the JSON that you want to be persistent.

## Bonus

- jsonbin.io - see explanation above
- Freestyle - add any feature you desire. Some ideas:
  - [drag n' drop functionality](https://htmldom.dev/drag-and-drop-element-in-a-list)
  - Delete + Edit a todo
  - Undo action
  - Search and highlight results
  - Loading spinner for network request
  - Mark/Unmark todo as done
  - Something awesome we didn't think of...
- For added value, you can add jest/puppeteer test to test any bonus feature you implemented

**Add an explanation in `README.md` for each bonus feature you add and a link to any resoure you used**

## Grading policy

- Your project will be graded by the number of automatic tests you pass
- Using jsonbin.io
- Extra freestyle features - Please add an explanation about the bonus features you added to the readme.md
- new jest/puppeteer test
- Code quality and style: indentation, Meaningful and non-disambiguate variable names, Comments documentation
- Visual creativity, use css to make this app look awesome 💅🏿
- Division to reusable functions, no code duplication
- Git usage: meaningful commit messages, small commits, folder and file structures

## Submitting

- Change this file (README.md) and style it to showcase your solution (gifs, explanations, link to the github page, links to resources you used, etc...)
- Submit your solution repo to the [ChallengeMe](http://challengeme.suvelocity.org/) system
- Submit your repo link and github page and video to Google Classroom
- Record a 5-10 min selfie video, describe yourself in a few words (age, location, military background, technological background). Also, talk about the solution you submitted (try to explain how your app works in general and which bonuses you added). Think about this video as an interview.

GOOD LUCK!
