import { useEffect, useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { LiaUserClockSolid } from 'react-icons/lia';
import { MdClose } from 'react-icons/md';
import '../styles/animations.css';
import { IoSettingsOutline, IoExitOutline } from 'react-icons/io5';
import CustomPopover from '../CustomPopOver';
import { Button } from '../ui/button';
import CustomModal from '../CustomModal';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token-appcenter');
    if (token) {
      console.log('Token found:', token);
      setIsLogged(true);
    }
  }, []);

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
    setIsLogged(false);
    window.location.reload();
  };

  return (
    <>
      <div className='relative flex flex-col h-screen'>
        <div className='flex justify-between p-2 flex-shrink-0'>
          {/* Header */}
          <div>
            {isLogged && (
              <div>
                <FiMenu size={30} onClick={handleToggleMenu} />
              </div>
            )}
          </div>
          <p className=' font-bold'>Apps Center</p>
          <div>
            {isLogged && (
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
          style={{
            width: '50vw',
            backdropFilter: 'blur(10px)',
            transform: isMenuOpen ? 'translateX(0)' : 'translateX(-120%)',
            transition: 'transform 0.3s ease-in-out',
          }}
          className='absolute
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
