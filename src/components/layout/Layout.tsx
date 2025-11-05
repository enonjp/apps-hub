import { useEffect, useRef, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { LiaUserClockSolid } from 'react-icons/lia';
import { MdClose } from 'react-icons/md';
import '../styles/animations.css';
import { IoSettingsOutline, IoExitOutline } from 'react-icons/io5';
import CustomPopover from '../CustomPopOver';
import { Button } from '../ui/button';
import CustomModal from '../CustomModal';
import { useGlobalContext } from '@/context/GlobalContext';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, handleSetIsAuthenticated } = useGlobalContext();

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('token-appcenter');
    handleSetIsAuthenticated(false);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutsideMobileMenu = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutsideMobileMenu);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMobileMenu);
    };
  }, []);

  return (
    <>
      <div className='relative flex flex-col h-screen'>
        <div className='flex justify-between p-2 flex-shrink-0'>
          {/* Header */}
          <div>
            {isAuthenticated && (
              <div>
                <FiMenu size={30} onClick={handleToggleMenu} />
              </div>
            )}
          </div>
          <p className=' font-bold'>Apps Center</p>
          <div>
            {isAuthenticated && (
              <CustomPopover trigger={<FaRegUserCircle size={30} />}>
                <h4 className='py-2 font-bold'>User Account</h4>
                <hr />
                <div className=' flex flex-col gap-2 mt-2'>
                  <Button
                    variant={'link'}
                    className=' flex items-center p-1 w-full'
                  >
                    <IoSettingsOutline size={20} />
                    <span>Account Settings</span>
                  </Button>
                </div>
                <div className=' flex flex-col gap-2 mt-2'>
                  <Button
                    onClick={handleOpenModal}
                    variant={'destructive'}
                    className=' flex items-center p-1 w-full'
                  >
                    <IoExitOutline size={20} />
                    <span>Log Out</span>
                  </Button>
                </div>
              </CustomPopover>
            )}
          </div>
        </div>
        {/* Content */}
        <div className='flex-1 overflow-auto'>{children}</div>
        {/* Mobile Menu  */}
        <div
          ref={mobileMenuRef}
          style={{
            width: '50vw',
            backdropFilter: 'blur(10px)',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(-120%)',
            transition: 'transform 0.3s ease-in-out',
          }}
          className='absolute left-0 top-0 h-screen bg-clip-padding bg-opacity-20 border border-gray-400 rounded-md flex flex-col gap-4 p-4'
        >
          <div onClick={handleToggleMenu}>
            <MdClose size={30} />
          </div>
          <div className='flex gap-2 items-center'>
            <LiaUserClockSolid size={24} />
            <span className='ml-2'>Time Record</span>
          </div>
        </div>
        <CustomModal
          onAccept={handleLogout}
          onClose={handleCloseModal}
          isModalOpen={isModalOpen}
          titleComponent={
            <h4 className=' font-bold text-lg'>
              Are you sure you want to log out ?
            </h4>
          }
        >
          <p>Logging out will end your current session.</p>
        </CustomModal>
      </div>
    </>
  );
};

export default Layout;
