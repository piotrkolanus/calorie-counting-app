const MESSAGES = {
  SHOW_FORM: "SHOW_FORM",
  MEAL_INPUT: "MEAL_INPUT",
  CALORIES_INPUT: "CALORIES_INPUT",
  SAVE_MEAL: "SAVE_MEAL",
  DELETE_MEAL: "DELETE_MEAL",
  EDIT_MEAL: "EDIT_MEAL"
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

export function deleteMealMsg(id) {
  return {
    type: MESSAGES.DELETE_MEAL,
    id
  };
}

export function editMealMsg(editId) {
  return {
    type: MESSAGES.EDIT_MEAL,
    editId
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
      const { editId } = model;
      const updatedModel = editId !== null ? edit(msg, model) : add(msg, model);

      return updatedModel;
    }
    case MESSAGES.DELETE_MEAL: {
      const { id } = msg;

      const meals = model.meals.filter(meal => meal.id !== id);
      return { ...model, meals };
    }
    case MESSAGES.EDIT_MEAL: {
      const { editId } = msg;
      const meal = model.meals.find(meal => meal.id === editId);

      const { description, calories } = meal;

      return {
        ...model,
        editId,
        description,
        calories,
        showForm: true
      };
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

function edit(msg, model) {
  const { description, calories, editId } = model;
  const meals = model.meals.map(meal => {
    if (meal.id === editId) {
      return { ...meal, description, calories };
    }
    return meal;
  });

  return {
    ...model,
    meals,
    description: "",
    calories: 0,
    showForm: false,
    editId: null
  };
}

export default update;
