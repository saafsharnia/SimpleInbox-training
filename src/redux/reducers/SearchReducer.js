export default function SearchReducer(state = {searchResult: [], error: false, loading: false, pageContent: '', searchFocused: false}, action) {
  switch (action.type) {
    case 'SearchLoading':
      return {
        ...state,
        error: false,
        loading: true
      };
    case 'SearchLoaded':
      return {
        ...state,
        searchResult: action.data,
        loading: false
      };
    case 'SearchErrorLoading':
      return {
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
    default:
      return state;
  }
}