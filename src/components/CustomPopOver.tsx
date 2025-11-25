import { useEffect, useRef, useState } from 'react';

type Props = {
  trigger: React.ReactNode;
  children: React.ReactNode;
};

const CustomPopover = ({ trigger, children }: Props) => {
  const [open, setOpen] = useState(false);
  const popOverRef = useRef<HTMLDivElement>(null);

  const onPopperToggle = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popOverRef.current &&
        !popOverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <div>
      <div className='relative z-50' ref={popOverRef}>
        <div onClick={onPopperToggle}>{trigger}</div>
        <div
          style={{
            backdropFilter: 'blur(10px)',
            display: open ? 'block' : 'none',
          }}
          className='absolute
         right-0 top-full bg-clip-padding bg-opacity-20 border border-gray-400 rounded-md p-2
        '
        >
          {children}
        </div>
      </div>
      {/* Modal */}
    </div>
  );
};

export default CustomPopover;
