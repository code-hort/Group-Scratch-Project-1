import React from 'react';

export default function Wheel(props) {
  React.useEffect(() => {
    console.log('useEffect ran');
    const root = document.querySelector(':root');
    root.style.setProperty('--random-num', `${props.randomNum + 1440}deg`);
  }, [props.randomNum]);

  const array = props.studentsArray.map((el) => {
    return el.username;
  });
  const colors = [
    'maroon',
    'red',
    'purple',
    'fuchsia',
    'blue',
    'navy',
    'teal',
    'aqua',
    'lime',
    'green',
    'olive',
    'yellow',
    'orange',
  ];
  const arcLength = 360 / array.length;

  const colorArray = array.map((el, i) => {
    const colorChosen = i % colors.length;
    const angle = arcLength * i;
    const skew = 360 / array.length - 90;
    let styling;
    let classBox;
    if (array.length > 2) {
      styling = {
        backgroundColor: colors[colorChosen],
        transform: `rotate(${angle}deg) skewY(${skew}deg)`,
      };
      classBox = 'box';
    } else if (array.length === 1) {
      styling = {
        backgroundColor: colors[colorChosen],
      };
      classBox = 'big-box';
    } else if (array.length === 2) {
      styling = {
        backgroundColor: colors[colorChosen],
      };
      classBox = 'twoBoxes';
    }
    if (array.length < 15) {
      return (
        <div style={styling} key={i} className={classBox}>
          <p id="remove-skew">{array[i]}</p>
        </div>
      );
    } else {
      return <div style={styling} key={i} className={classBox}></div>;
    }
  });

  return (
    <>
      <div className="arrow-down"></div>
      <div
        className={`wheel ${props.animationClass}`}
        onAnimationEnd={() => {
          // snaps wheel back
          setTimeout(() => {
            props.setAnimationClass('');
          }, 1500);
          // console.log(Math.floor((props.randomNum/360)*array.length))
          const reversed = array.reverse();
          console.log(
            reversed[Math.floor((props.randomNum / 360) * array.length)]
          );
          props.handleChooseParticpant(
            reversed[Math.floor((props.randomNum / 360) * array.length)]
          );
          props.setWheelChose(
            reversed[Math.floor((props.randomNum / 360) * array.length)]
          );
        }}
      >
        {colorArray}
      </div>
    </>
  );
}
