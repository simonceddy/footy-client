function PlayerName({
  player = {}, onClick, className, showNickname = false, asColumn = false, showNumber = false
}) {
  return (
    <span
      role="presentation"
      onClick={onClick ? () => onClick(player) : null}
      className={`group ${asColumn ? 'col' : 'row'} justify-start items-center whitespace-nowrap overflow-hidden text-ellipsis w-full p-1 mr-1 capitalize ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {showNumber && player.number && (
        <span className="border px-1 col justify-center items-center w-5 h-5 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white group-hover:bg-black group-hover:text-white dark:group-hover:text-black dark:group-hover:bg-white group-hover:border-white dark:group-hover:border-black mr-2">
          {player.number}
        </span>
      )}
      <span className="mr-1 group-hover:underline">
        {player.name?.firstName}
      </span>
      {showNickname && player.name?.nickname && (
        <span className="italic mr-1 whitespace-nowrap group-hover:underline">
          &quot;{player.name?.nickname}&quot;
        </span>
      )}
      <span className="group-hover:underline">
        {player.name?.surname}
      </span>
    </span>
  );
}

export default PlayerName;
