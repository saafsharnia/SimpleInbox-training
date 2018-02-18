export default function SearchReducer(state = {searchResult: [], error: false, loading: false, pageContent: '', searchFocused: false}, action) {
  switch (action.type) {
    case 'SearchLoading':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'SearchLoaded': //TODO bad action names
      return {
        searchResult: action.data,
        loading: false
      };
    case 'SearchErrorLoading':
      return {
        //TODO we need boolean `error` here, do not put everything inside searchResult!
        ...state,
        error: true,
        loading: false
      };
    case 'SearchFocused':
      return {
        ...state,
        searchFocused: true
      };
    case 'SearchUnfocused':
      return {
        ...state,
        searchFocused: false
      };
    // case 'ShowPage':
    //   return {
    //     ...state,
    //     pageContent: action.data
    //   };
    // case 'RemovePageContent':
    //   return {
    //     ...state,
    //     pageContent: ''
    //   };
    default:
      return state;
  }
}