const MESSAGES = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT"
};

export function showFormMsg(showForm) {
  return {
    type: MESSAGES.SHOW_FORM,
    showForm
  };
}

export function mealInputMsg(description) {
  return {
    type: MESSAGES.MEAL_INPUT,
    description
  };
}

export function caloriesInputMsg(calories) {
  return {
    type: MESSAGES.CALORIES_INPUT,
    calories
  };
}

function update(msg, model) {
  switch (msg.type) {
    case MESSAGES.SHOW_FORM: {
      const { showForm } = msg;
      return { ...model, showForm: showForm, description: "", calories: 0 };
    }
    case MESSAGES.MEAL_INPUT: {
      const { description } = msg;
      return { ...model, description };
    }
    case MESSAGES.CALORIES_INPUT: {
      const calories = parseInt(msg.calories) || 0;
      return { ...model, calories };
    }
  }
  return model;
}

export default update;
