import hh from "hyperscript-helpers";
import { h } from "virtual-dom";

const { pre, div, h1, form, fieldset, button, header, label, input } = hh(h);

function fieldSet(labelText, inputValue) {
  return fieldset({ className: "form__fieldset" }, [
    label({ className: "form__label" }, labelText),
    input({ className: "form__input", type: "text", value: inputValue })
  ]);
}

function buttonSet(dispatch) {
  return div({ className: "form-button-box" }, [
    button({ className: "form-button-box__button", type: "submit" }, "Save"),
    button({ className: "form-button-box__button", type: "button" }, "Cancel")
  ]);
}

function formView(dispatch, model) {
  const { description, calories, showForm } = model;
  if (showForm) {
    return div({ className: "form-container" }, [
      form({ className: "form-box" }, [
        fieldSet("Meal", description),
        fieldSet("Calories", calories || ""),
        buttonSet(dispatch)
      ])
    ]);
  }

  return div({ className: "toggle-form" }, [
    button({ className: "toggle-form__button", type: "button" }, "Add meal")
  ]);
}

function view(dispatch, model) {
  return div({ className: "container" }, [
    header({ className: "header" }, [h1({}, "Calorie Counter")]),
    formView(dispatch, model)
  ]);
}

export default view;
