import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import {
  showFormMsg,
  mealInputMsg,
  caloriesInputMsg,
  saveMealMsg,
  deleteMealMsg,
  editMealMsg
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
  tbody,
  i
} = hh(h);

function cell(tag, value) {
  return tag(value);
}

const tableHeader = thead([
  tr([th("", "Meal"), th("", "Calories"), th("", "")])
]);

function mealRow(dispatch, meal) {
  return tr({}, [
    td("", meal.description),
    td("", meal.calories),
    td("", [
      i({
        className: "icon fa fa-trash-o",
        onclick: () => dispatch(deleteMealMsg(meal.id))
      }),
      i({
        className: "icon fa fa-pencil-square-o",
        onclick: () => dispatch(editMealMsg(meal.id))
      })
    ])
  ]);
}

function totalRow(meals) {
  const total = meals.reduce((acc, obj) => acc + obj.calories, 0);

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

function view(dispatch, model) {
  return div({ className: "container" }, [
    header({ className: "header" }, [h1({}, "Calorie Counter")]),
    formView(dispatch, model),
    tableView(dispatch, model.meals)
  ]);
}

export default view;
