const ActionType = {
  SET_FILTER_CATEGORY: 'SET_FILTER_CATEGORY',
  CLEAR_FILTER_CATEGORY: 'CLEAR_FILTER_CATEGORY'
}

function setFilterCategoryActionCreator (category) {
  return {
    type: ActionType.SET_FILTER_CATEGORY,
    payload: {
      category
    }
  }
}

function clearFilterCategoryActionCreator () {
  return {
    type: ActionType.CLEAR_FILTER_CATEGORY
  }
}

export {
  ActionType,
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator
}
