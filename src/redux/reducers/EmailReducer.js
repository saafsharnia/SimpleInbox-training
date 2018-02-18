export default function ListEmailsReducer (state={loading: false, data: "", error: ""}, action) {
  switch (action.type) {
    case 'EmailsLoading':
      return {
        ...state,
        loading: true
      };
    case 'EmailsLoaded': //EMAILS_LOADED
      return {
        ...state,
        loading: false,
        data: action.data
      };
    case 'listEmailsErrorLoading': //EMAILS_LOADED
      return {
        ...state,
        loading: false,
        error: "Couldn't Load data from database. Please try again later"
      };
    default:
      return state;
  }
}