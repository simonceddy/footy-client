function PlayingFieldSVG({ playingField = {}, mult = 1 }) {
  const svgSize = 200 * mult;
  const l = playingField.xAxis * mult;
  const w = playingField.yAxis * mult;
  const fifty = 50 * mult;
  const cL = l / 10;
  const cW = w / 10;
  const mL = (svgSize - l) / 2;
  const mW = (svgSize - w) / 2;
  const csx = ((playingField.xAxis / 2) - 25) * mult;
  const csy = ((playingField.yAxis / 2) - 25) * mult;
  return (
    <svg width={svgSize} height={svgSize} viewBox={`0,0,${svgSize},${svgSize}`} style={{ width: '87%', height: '87%' }}>

      <g style={{ transform: `translate(${mL}px, ${mW}px)` }}>
        ${playingField.shape.toString(mult)}
        <ellipse
          stroke="black"
          style={{ fill: 'green' }}
          cx={playingField.shape.center.x * mult}
          cy={playingField.shape.center.y * mult}
          rx={playingField.shape.radius.x * mult}
          ry={playingField.shape.radius.y * mult}
        />
        <g id="scale-lines">
          <path style={{ stroke: 'red', strokeWidth: '0.2rem', fill: 'none' }} d={`M 0 0 L 0 20 M 0 1 L ${l} 1 M ${l} 0 L ${l} 20`} />
          <path style={{ stroke: 'red', strokeWidth: '0.2rem', fill: 'none' }} d={`M ${l} 0 L ${l - 10} 0 M ${l - 1} 0 L ${l - 1} ${w} M ${l} ${w} L ${l - 10} ${w}`} />
          <text
            x={l / 2}
            y="30"
            style={{
              fill: 'red',
              stroke: 'none',
              fontSize: '1rem',
              fontFamily: 'Arial, Helvetica, sans-serif',
              textAlign: 'center'
            }}
          >
            {playingField.xAxis} meters
          </text>
          <text
            x={l - (l / 5)}
            y={w / 2.5}
            style={{
              fill: 'red',
              stroke: 'none',
              fontSize: '1rem',
              fontFamily: 'Arial, Helvetica, sans-serif'
            }}
          >
            {playingField.yAxis} meters
          </text>
        </g>
        <g id="fifty-lines">
          <path
            style={{ stroke: 'black', fill: 'none' }}
            d={`M 0 0 C ${cL} ${cW / 2} ${fifty} ${cW * 2} ${fifty} ${w / 2} C ${fifty} ${w - (cW * 2)} ${cL} ${w - (cW / 2)} 0 ${w}`}
          />
          <path
            style={{ stroke: 'black', fill: 'none' }}
            d={`M ${l} 0 C ${l - cL} ${cW / 2} ${l - fifty} ${cW * 2} ${l - fifty} ${w / 2} C ${l - fifty} ${w - (cW * 2)} ${l - cL} ${w - (cW / 2)} ${l} ${w}`}
          />
        </g>
        <rect
          x={csx}
          y={csy}
          width={50 * mult}
          height={50 * mult}
          style={{ fill: 'none', stroke: 'black' }}
        />

        <ellipse
          cx={l / 2}
          cy={w / 2}
          rx={mult * 5}
          ry={mult * 5}
          style={{ fill: 'none', stroke: 'black' }}
        />
        <ellipse
          cx={l / 2}
          cy={w / 2}
          rx={mult * 1.5}
          ry={mult * 1.5}
          style={{ fill: 'none', stroke: 'black' }}
        />

        <g id="player-markers" />
      </g>
    </svg>
  );
}

export default PlayingFieldSVG;
