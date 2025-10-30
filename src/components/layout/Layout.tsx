import { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { LiaUserClockSolid } from 'react-icons/lia';
import { MdClose } from 'react-icons/md';
import '../styles/animations.css';

type Props = {
  children: React.ReactNode;
};

const isUserLogged = false;

const Layout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (!isUserLogged) {
    return (
      <div className='relative'>
        <div className='flex justify-between p-2'>
          <div>
            <FiMenu size={30} onClick={handleToggleMenu} />
          </div>
          <p className=' font-bold'>Apps Center</p>
        </div>
        <div>{children}</div>
        <div></div>
        <div
          style={{
            width: '50vw',
            backdropFilter: 'blur(10px)',
            animation: !isMenuOpen
              ? 'left-hide 0.3s forwards'
              : 'left-show 0.3s forwards',
          }}
          className=' absolute
         left-0 top-0 h-screen bg-clip-padding bg-opacity-20 border border-gray-400 rounded-md flex flex-col gap-4 p-4
        '
        >
          <div onClick={handleToggleMenu}>
            <MdClose size={30} />
          </div>
          <div className='flex gap-2 items-center'>
            <LiaUserClockSolid size={24} />
            <span className='ml-2'>Time Record</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='relative h-screen'>
        <div className='flex justify-between p-2 '>
          <div>
            <FiMenu size={30} />
          </div>
          <p className=' font-bold'>Apps Centers</p>
          <div>
            <FaRegUserCircle size={30} />
          </div>
        </div>
        <div className=' px-4'>{children}</div>
        <div></div>
        <div
          className='
         bg-red-400 w-40 left-0 top-0 h-screen
        '
        ></div>
      </div>
    );
  }
};

export default Layout;
