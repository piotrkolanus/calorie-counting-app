import hh from "hyperscript-helpers";
import { h } from "virtual-dom";
import { showFormMsg, mealInputMsg, caloriesInputMsg } from "./Update";

const { pre, div, h1, form, fieldset, button, header, label, input } = hh(h);

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
      form({ className: "form-box" }, [
        fieldSet("Meal", description, e =>
          dispatch(mealInputMsg(e.target.value))
        ),
        fieldSet("Calories", calories || "", e =>
          dispatch(caloriesInputMsg(e.target.value))
        ),
        buttonSet(dispatch)
      ])
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
    pre(JSON.stringify(model, null, 2))
  ]);
}

export default view;
