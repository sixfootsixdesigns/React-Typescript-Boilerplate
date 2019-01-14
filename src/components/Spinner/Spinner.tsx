import React from 'react';
import classNames from 'classnames';
import './spinner.scss';

export interface SpinnerDisplayProps {
  text?: string;
  noOverlay?: boolean;
  className?: any;
}

class Spinner extends React.Component<SpinnerDisplayProps> {
  public static defaultProps = {
    text: '',
    noOverlay: false
  };

  public render() {
    const { text, noOverlay, className, ...rest } = this.props;

    const classes = classNames(
      'Spinner',
      noOverlay && 'Spinner--noOverlay',
      className
    );

    return (
      <div {...rest} className={classes}>
        <div className="Spinner-spinner">
          <svg viewBox="0 0 64 64">
            <circle transform="translate(32,32)" r="26" />
          </svg>
        </div>
        {text ? <div className="Spinner-content">{text}</div> : null}
      </div>
    );
  }
}

export default Spinner;
