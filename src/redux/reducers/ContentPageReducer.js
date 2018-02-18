export default function TermsAndPrivacyReducer (state={loading: false, data:{title: '', content: ''}, error: ''}, action) {
  switch (action.type) {
    case 'ContentLoading':
      return {
        ...state,
        loading: true
      };
    case 'ContentLoaded':
      return {
        ...state,
        loading: false,
        data: {
          content: action.data.content,
          title: action.data.title
        }
      };
    case 'ContentErrorLoading':
      return {
        ...state,
        loading: false,
        error: "Couldn't Load data from database. Please try again later"
      };
    default:
      return state;
  }
}