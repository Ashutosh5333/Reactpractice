// Higher Order Component
function withAuthorization(WrappedComponent, checkPermissions) {
    
    return function (props) {
      // You can also wrap it in useEffect for async permission checks.
      return checkPermissions(props) ? (
        <WrappedComponent {...props} />
      ) : (
        <p>Please login with appropriate role</p>
      );
    };
  }

  export default withAuthorization