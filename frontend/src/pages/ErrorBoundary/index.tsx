/* eslint-disable */
import React from "react";
// import { history } from '../../../../index'
import { Link } from "react-router-dom";

interface IErrorBoundaryProps {
  children: JSX.Element;
}

export default class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  any
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      // history.replace('/auth/500')

      // return <h1>Something went wrong.</h1>;
      return (
        <div className="container pl-5 pr-5 pt-5 pb-5 mb-auto  font-size-32">
          <div className="font-weight-bold mb-3">Server Error</div>
          <div className="text-gray-6 font-size-24">
            Oops, something unexpected just happened!
          </div>
          <div className="font-weight-bold font-size-70 mb-1">500 —</div>
          <Link to="/" className="btn btn-outline-primary width-100">
            Go Back
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
