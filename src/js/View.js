import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg
} from "./Update";

const {
  pre,
  div,
  h1,
  form,
  fieldset,
  button,
  header,
  label,
  input,
  table,
  thead,
  tr,
  th,
  td,
  tbody
} = hh(h);

function cell(tag, value) {
  return tag(value);
}

const tableHeader = thead([
  tr([th("", "Meal"), th("", "Calories"), th("", "")])
]);

// const tableHeader = thead([
//   tr([cell(th, "Meal"), cell(th, "Calories"), cell(th, "")])
// ]);

function mealRow(dispatch, meal) {
  console.log(meal.description);
  console.log(meal.calories);
  return tr({}, [td("", meal.description), td("", meal.calories), td("", "")]);
}
// function mealRow(dispatch, meal) {
//   console.log(meal.description);
//   console.log(meal.calories);
//   return tr({}, [
//     cell(td, meal.description),
//     cell(td, meal.calories),
//     cell(td, "")
//   ]);
// }

function totalRow(meals) {
  const total = meals.reduce((acc, obj) => acc + obj.calories, 0);
  console.log(meals);
  console.log(total);
  return tr({}, [td("", "Total:"), td("", total), td("", "")]);
}

function mealsBody(dispatch, meals) {
  const rows = meals.map(m => mealRow(dispatch, m));

  const rowsWithTotal = [...rows, totalRow(meals)];

  return tbody({}, rowsWithTotal);
}

function tableView(dispatch, meals) {
  if (meals.length === 0) {
    return div({ className: "no-content" }, "No meals to display...");
  }
  return table({}, [tableHeader, mealsBody(dispatch, meals)]);
}

function fieldSet(labelText, inputValue, oninput) {
  return fieldset({ className: "form__fieldset" }, [
    label({ className: "form__label" }, labelText),
    input({
      className: "form__input",
      type: "text",
      value: inputValue,
      oninput
    })
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "form-button-box" }, [
    button({ className: "form-button-box__button", type: "submit" }, "Save"),
    button(
      {
        className: "form-button-box__button",
        type: "button",
        onclick: () => dispatch(showFormMsg(false))
      },
      "Cancel"
    )
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return div({ className: "form-container" }, [
      form(
        {
          className: "form-box",
          onsubmit: e => {
            e.preventDefault();
            dispatch(saveMealMsg);
          }
        },
        [
          fieldSet("Meal", description, e =>
            dispatch(mealInputMsg(e.target.value))
          ),
          fieldSet("Calories", calories || "", e =>
            dispatch(caloriesInputMsg(e.target.value))
          ),
          buttonSet(dispatch)
        ]
      )
    ]);
  }

  return div({ className: "toggle-form" }, [
    button(
      {
        className: "toggle-form__button",
        onclick: () => dispatch(showFormMsg(true)),
        type: "button"
      },
      "Add meal"
    )
  ]);
}

function tableHeading() {
  return thead({}, [tr({}, [th({}, "Meals"), th({}, "Calories")])]);
}

function tableRow() {
  return tr({}, [td({}, "Dinner"), td({}, "380")]);
}

// function mealsTable(dispatch, model) {
//   return table({}, [tableHeading(), tbody({}, [tableRow()])]);
// }

function view(dispatch, model) {
  return div({ className: "container" }, [
    header({ className: "header" }, [h1({}, "Calorie Counter")]),
    formView(dispatch, model),
    tableView(dispatch, model.meals),
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
