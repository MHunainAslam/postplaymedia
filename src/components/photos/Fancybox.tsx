import React, { useRef, useEffect, PropsWithChildren } from 'react';
import { Fancybox as NativeFancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { OptionsType } from '@fancyapps/ui/types/Fancybox/options';

interface Props {
  options?: Partial<OptionsType>;
  delegate?: string;
}

function Fancybox(props: PropsWithChildren<Props>) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const delegate = props.delegate || '[data-fancybox]';
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, options);

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, [props.delegate, props.options]);

  return (
    <div ref={containerRef}>
      {/* Render children passed to Fancybox */}
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child) && child.type === 'a') {
          return React.cloneElement(child, {
            // Adding the additional div inside the anchor tag
            children: [
              // Cloning the existing children of anchor tag
              ...React.Children.toArray(child.props.children),
              <div key={index}>Additional content here</div>,
            ],
          });
        }
        return child;
      })}
    </div>
  );
}

export default Fancybox;
