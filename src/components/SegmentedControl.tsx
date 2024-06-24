import React from 'react';
import { useRef, useState, useEffect } from 'react';
import "./styles/segmentedControl.css";

interface Segment {
    value: string;
    label: string;
}
  
interface SegmentedControlProps {
    name: string;
    segments: Segment[];
    callback: (value: string, index: number) => void;
    defaultIndex: number;
    controlRef: React.RefObject<HTMLDivElement>;
}

const SegmentedControl: React.FC<SegmentedControlProps>  = ({
    name,
    segments,
    callback,
    defaultIndex = 0,
    controlRef,
  }) => {
    const [activeIndex, setActiveIndex] = useState(defaultIndex);
    const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
    const componentReady = useRef(false);

    const onInputChange = (value, index) => {
        setActiveIndex(index);
        callback(value, index);
    }

    // Determine when the component is "ready"
    useEffect(() => {
        componentReady.current = true;
    }, []);

    useEffect(() => {
        const activeSegmentRef = segmentRefs.current[activeIndex];
        if (activeSegmentRef && controlRef.current) {
          const { offsetWidth, offsetLeft } = activeSegmentRef;
          const { style } = controlRef.current;
    
          style.setProperty('--highlight-width', `${offsetWidth}px`);
          style.setProperty('--highlight-x-pos', `${offsetLeft}px`);
        }
      }, [activeIndex, callback, segments]);
  

    return (
        <div className="controls-container" ref={controlRef}>
            <div className={`controls ${componentReady.current ? 'ready' : 'idle'}`}>
                {segments.map((item, i) => (
                <div
                key={item.value}
                className={`segment ${i === activeIndex ? 'active' : 'inactive'}`}
                ref={(el) => (segmentRefs.current[i] = el)}>
                    <input
                    type="radio"
                    value={item.value}
                    id={`${name}-${item.value}`}
                    name={name}
                    onChange={() => onInputChange(item.value, i)}
                    checked={i === activeIndex}
                    />
                    <label htmlFor={`${name}-${item.value}`}>
                    {item.label}
                    </label>
                </div>
                ))}
            </div>
        </div>
    );
  }

  export default SegmentedControl;