import "./bootstrap-grid.css";

const Row = ({ children }) => {
  return <div className="row">{children}</div>;
};

const Col = ({ sm, md, xl, children }) => {
  // Construct the className string based on the props
  const className = `col-sm-${sm} col-md-${md} col-xl-${xl}`;

  return <div className={className}>{children}</div>;
};

const Container = ({ fluid, children }) => {
  // Determine the className based on the fluid prop
  const className = fluid ? `container-${fluid}` : `container`;

  return <div className={className}>{children}</div>;
};

export { Row, Col, Container };
