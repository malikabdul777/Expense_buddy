// React

// Thirdparty

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./TextWithEllipsis.module.css";

// Local enums

// Local constants

// Local Interfaces

const TextWithEllipsis = (props) => {
  const { maxLength, className } = props;

  if (String(props.children).length <= maxLength) {
    return <p className={className}>{props.children}</p>;
  }
  return (
    <p className={className}>{String(props.children).slice(0, maxLength)}...</p>
  );
};

export default TextWithEllipsis;
