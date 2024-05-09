function TeamColours({ colours = {}, className = 'w-20 h-20' }) {
  return (
    <div className={`${className} col justify-start items-center mx-auto`}>
      <span
        className={`${colours.colour3 ? 'h-1/3' : 'h-1/2'} w-full inline-block`}
        style={{
          backgroundColor: colours.colour1
        }}
      />
      <span
        className={`${colours.colour3 ? 'h-1/3' : 'h-1/2'} w-full inline-block`}
        style={{
          backgroundColor: colours.colour2
        }}
      />
      {colours.colour3 && (
      <span
        className="h-1/3 w-full inline-block"
        style={{
          backgroundColor: colours.colour3
        }}
      />
      )}
    </div>
  );
}

export default TeamColours;
