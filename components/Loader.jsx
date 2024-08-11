const Loader = ({ type }) => {
  return (
    <div className="parent_loader">
      <div className={`loader ${type}`}>
        {type === "ball-grid-pulse" && (
          <>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Loader;
