const MESSAGES = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT",
  SAVE_MEAL: "SAVE_MEAL"
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

export const saveMealMsg = { type: MESSAGES.SAVE_MEAL };

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
    case MESSAGES.SAVE_MEAL: {
      return add(msg, model);
    }
  }
  return model;
}

function add(msg, model) {
  const { nextId, description, calories } = model;
  const meal = { id: nextId, description, calories };
  const meals = [...model.meals, meal];
  return {
    ...model,
    meals,
    nextId: nextId + 1,
    description: "",
    calories: 0,
    showForm: false
  };
}

export default update;
