import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

type Props = {
  titleComponent: React.ReactNode;
  isModalOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  children?: React.ReactNode;
};

const CustomModal = ({
  titleComponent,
  isModalOpen,
  onClose,
  onAccept,
  children,
}: Props) => {
  const modalContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className='relative'>
      <div>
        <div
          style={{
            display: isModalOpen ? 'flex' : 'none',
            backdropFilter: 'blur(5px)',
          }}
          className='fixed w-screen h-screen bg-black/30 inset-0 top-0 justify-center items-center p-4'
        >
          <div
            ref={modalContainerRef}
            className='w-full h-min max-w-xl bg-clip-padding bg-opacity-20 border border-gray-400 rounded-md p-4'
          >
            <div>{titleComponent}</div>
            <hr />
            <div className='mt-2'>{children}</div>
            <div className='flex justify-between items-center mt-8'>
              <Button
                variant={'default'}
                onClick={onClose}
                className='px-4 py-2 '
              >
                Close
              </Button>
              <Button variant={'link'} onClick={onAccept} className='px-4 py-2'>
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
